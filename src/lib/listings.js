import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const contentDir = path.join(rootDir, 'src', 'content', 'listings');
const publicImagesDir = path.join(rootDir, 'public', 'images');

function readText(filePath, fallback = '') {
  try {
    return fs.readFileSync(filePath, 'utf8').trim();
  } catch {
    return fallback;
  }
}

function readLines(filePath) {
  return readText(filePath)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function sortImages(files) {
  return files.sort((a, b) => {
    if (a.toLowerCase() === 'hero.jpg' || a.toLowerCase() === 'hero.jpeg' || a.toLowerCase() === 'hero.png' || a.toLowerCase() === 'hero.webp') return -1;
    if (b.toLowerCase() === 'hero.jpg' || b.toLowerCase() === 'hero.jpeg' || b.toLowerCase() === 'hero.png' || b.toLowerCase() === 'hero.webp') return 1;
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
  });
}

function getPhotos(id) {
  const folder = path.join(publicImagesDir, id);
  try {
    const images = sortImages(
      fs
        .readdirSync(folder)
        .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
    );
    return images.map((file) => `/images/${id}/${file}`);
  } catch {
    return [];
  }
}

function formatPrice(value) {
  const trimmed = String(value || '').trim();
  if (!trimmed) return 'Price on request';
  if (/AMD|֏|day|night/i.test(trimmed)) return trimmed;
  const number = Number(trimmed.replace(/[^0-9]/g, ''));
  if (!Number.isNaN(number) && number > 0) return `${number.toLocaleString('en-US')} AMD / day`;
  return trimmed;
}

function loadListing(id) {
  const folder = path.join(contentDir, id);
  const [area = '', rooms = '', guests = ''] = readText(path.join(folder, 'options.txt')).split(',').map((x) => x.trim());
  const [price = '', phone = ''] = readText(path.join(folder, 'price-phone.txt')).split(',').map((x) => x.trim());
  const amenities = readLines(path.join(folder, 'amenities.txt'));
  const photos = getPhotos(id);
  const title = readText(path.join(folder, 'name.txt'), id);

  return {
    id,
    title,
    subtitle: readText(path.join(folder, 'subtitle.txt'), `${area || ''}${area ? ' m² ' : ''}apartment in Armenia`).trim(),
    location: readText(path.join(folder, 'location.txt'), 'Armenia'),
    area: area ? `${area} m²` : '—',
    rooms: rooms ? `${rooms} room${rooms === '1' ? '' : 's'}` : '—',
    guests: guests ? `Up to ${guests} guest${guests === '1' ? '' : 's'}` : '—',
    price: formatPrice(price),
    status: readText(path.join(folder, 'status.txt'), 'Available'),
    hero: photos[0] || '/images/placeholder.jpg',
    photos,
    description: readText(path.join(folder, 'about.txt'), ''),
    amenities,
    phone,
    whatsapp: phone,
    telegram: phone,
    videoUrl: readText(path.join(folder, 'video.txt'), ''),
    lastUpdated: readText(path.join(folder, 'last-updated.txt'), new Date().toISOString().slice(0, 10)),
  };
}

export function getListings() {
  try {
    return fs
      .readdirSync(contentDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => loadListing(entry.name));
  } catch {
    return [];
  }
}

export function getListingById(id) {
  return getListings().find((listing) => listing.id === id);
}
