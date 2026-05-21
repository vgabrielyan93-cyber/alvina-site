# Alvina.am starter

## Run locally

```powershell
npm install
npm run dev
```

Open `http://localhost:4321`.

## Add or edit an apartment

Each listing has its own text folder:

```text
src/content/listings/a131/
  name.txt
  location.txt
  subtitle.txt
  about.txt
  options.txt
  price-phone.txt
  amenities.txt
  status.txt
  last-updated.txt
```

Photos go here:

```text
public/images/a131/
  hero.jpg
  1.jpg
  2.jpg
  3.jpg
```

The website automatically creates the page:

```text
/listing/a131
```

## Text file examples

`name.txt`

```text
Cozy Mountain View Apartment in Alvina Complex
```

`options.txt`

```text
31,1,4
```

Meaning: area m², rooms, guests.

`price-phone.txt`

```text
35000,+37455518847
```

Meaning: price AMD per day, phone number. The same number is used for call, WhatsApp and Telegram.

`amenities.txt`

```text
Mountain view
Balcony
Smart TV
Washing machine
Kitchen
```

## Add a second apartment

Copy:

```text
src/content/listings/a131
```

Rename to:

```text
src/content/listings/a132
```

Then create matching photo folder:

```text
public/images/a132
```
