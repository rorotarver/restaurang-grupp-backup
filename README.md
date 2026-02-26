# Fantastic Four Restaurant

Skolprojekt i Next.js + TypeScript för restaurang med bokningsflöde och admin-CRUD mot School Restaurant API.

## Sidor

- `/` Startsida
- `/booking` Bokningssida
- `/contact` Kontaktsida
- `/admin` Admin (CRUD)

## Teknisk översikt

- Framework: Next.js (App Router)
- Språk: TypeScript
- Styling: global CSS + Tailwind utility classes
- API: `https://school-restaurant-api.azurewebsites.net`

## Miljövariabler

Skapa filen `.env.local` i projektroten:

```env
NEXT_PUBLIC_RESTAURANT_ID=DIN_RESTAURANG_ID
```

`NEXT_PUBLIC_RESTAURANT_ID` används i bokning/admin för att hämta och skriva bokningar mot rätt restaurang.

## Kom igång

```bash
npm install
npm run dev
```

Öppna `http://localhost:3000`.

## Bokningsflöde

- Sökning kan göras på **datum eller vecka**.
- Användaren väljer antal gäster (1–6).
- Lediga sittningar beräknas för 18:00 och 21:00 (max 15 bord per sittning).
- Användaren fyller kunduppgifter och måste godkänna GDPR för att kunna slutföra bokning.

## Adminflöde

- Lista alla bokningar för vald restaurang
- Skapa ny bokning
- Redigera bokning
- Ta bort/avboka bokning
- Sortering på datum/tid (närmast först/senast först)

## Snabb test-check

1. Gå till `/booking`
2. Sök datum/vecka och välj en ledig tid
3. Slutför bokning
4. Gå till `/admin` och verifiera att bokningen syns
5. Testa redigering och borttagning
