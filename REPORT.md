# 📌 Rättningsrapport – wie25s-the-restaurant-fantastic-four

## 🎯 Uppgiftens Krav:
Restaurangen
Grupper
Ni kommer att bli indelade i grupper om tre personer. Detta för att träna på att samarbeta och träna
på kommunikation.
Översikt
Ni skall skapa en sida för en restaurang. Denna sida kommer att presentera er restaurang, koncept,
inriktning, kontaktuppgifter m.m. Ni har fria händer att välja vad som skall presenteras. Men, den
stora saken för er att skapa är en bokningsfunktionalitet.
Ni behöver skapa en grafisk profil (ingenting som behöver redovisas) som visar att ni har en
genomtänkt design, färgpaletter och en grundlayout. Försök att få denna restaurang att bli så bra ni
kan göra den, både sett till kod men även hur resultatet ser ut i webbläsaren (eller telefonen).
Sidor
Följande sidor måste finnas med: Startsida, bokningssida och en kontaktsida. Om ni vill ha ytterligare
sidor går det bra att lägga till.
Beskrivning av bokningen
Utgå ifrån att restaurangen har 15 bord för sex personer vid varje bord. Restaurangen har två
sittningar varje kväll, en klockan 18:00 och en klockan 21:00. Detta innebär att samtliga bord bör gå
att boka två gånger per kväll.
Skapa utifrån detta en applikation där det går att söka fram information för ett givet datum eller
vecka. Användaren skall kunna välja en tid för den valda dagen. Samla in personuppgifter, upplys om
gdpr och se till att bokningen genomförs.
I ett adminläge bör bokningar kunna administreras (modifieras, tas bort, läggas till) för personalen
på restaurangen.
Teknisk beskrivning
Som frontend skall ni skapa ett react-projekt med typescript.
Det finns ett api som skall hjälpa er med denna uppgift: https://school-restaurant-
api.azurewebsites.net
För att få ytterligare hjälp finns det dokumentation för detta api tillgängligt på https://school-
restaurant-api.azurewebsites.net/api-doc
Att söka bord bör göras via ett formulär där användaren får ange antal personer (1-6) och önskat
datum. En sökning görs via ett API-anrop och ett resultat presenteras för användaren. Om det fanns
bord kvar så visas vilken/vilka tider som är tillgängliga. Om det inte finns bord kvar kommer en
varningstext upp och användaren får söka igen.
När användaren har valt tid kommer ytterligare ett formulär upp där användaren får skriva namn, e-
post och telefonnummer. Spara eller Avbryt där Spara skriver ner bokningen i db via ett API-anrop.
För adminläget är det ett enklare CRUD mot databasen och ett enklare gränssnitt som är nödvändigt.
Projektet skall finnas i ett git-repo och samtliga studenters commits skall finnas med.
Trello skall användas som verktyg för projektet. Det skall framgå vem som arbetat med vilken punkt.
• En fungerande applikation med samtliga sidor uppsatta med react router.
• Söksidan innehåller en textruta (eller valfri presentation) och en knapp för sökning (om det
behövs).
• Sökningen av lediga tider skall göras genom ett anrop till ett API.
• Resultatet från sökningen skall presenteras på ett genomtänkt sätt, kanske genom en
radioknappslista eller en rullgardinsmeny.
• Ett API-anrop skall göras för att spara bokningen i databasen.
• Administrationsgränssnittet finns med.
• Er applikation är responsiv.
• Koden skall vara genomtänkt och ha en tydlig struktur.
• Filstrukturen i projektet skall vara god.
• Formulären innehåller validering och felmeddelanden.
• Hantera avbokningar.
• Kunna redigera bokningar i administrationsgränssnittet.
• Använd css/scss för att skapa animationer vid t.ex. laddning och bokningar.
Ett litet tips så att ni kommer iväg rätt: Skapa en restaurang genom att anropa api:t. Innan detta är
gjort kan ni inte göra någonting med bokningsfunktionaliteten. Att skapa en restaurang är någonting
som ni bara behöver göra en gång.

Detta projekt kan bara få betyget G eller IG (Godkänt eller Inte Godkänt).
Godkänt innebär att ca 80% av kraven är uppfyllda.

## 🔍 ESLint-varningar:


## 🏆 **Betyg: G**
📌 **Motivering:** Projektet uppfyller helhetskravet för Godkänt (≈80%+) baserat på faktisk kod: det är ett Next.js/React + TypeScript-frontend med separata sidor för startsida (app/page.tsx), bokning (app/booking/page.tsx) och kontakt (app/contact/page.tsx). Bokningsflödet täcker kärnkraven: användaren kan söka lediga tider via API-anrop (getBookingsByRestaurant), se resultatet presenterat på ett tydligt sätt (radioknappar), fylla i kunduppgifter med validering och GDPR-checkbox, och skapa bokning via API (createBooking). Det finns även ett adminläge (app/admin/page.tsx + AdminPanel.tsx) som stödjer CRUD för bokningar (lista, skapa, uppdatera, ta bort) via createBooking/updateBooking/deleteBooking. Layouten är i huvudsak responsiv med Tailwind.

Samtidigt finns brister som hindrar ett högre omdöme: (1) kravet “Hantera avbokningar” är inte tydligt uppfyllt för kundflödet (endast admin kan radera bokningar), (2) kravet om CSS/SCSS-animationer vid laddning/bokning syns inte implementerat som faktiska loading/success-animationer (mest hover/transitions), (3) två komponentfiler är tomma (BookingSummary.tsx, TimeSelector.tsx) vilket tyder på ofärdigt/överblivet arbete, samt (4) viss duplicering (kontaktformulär på två ställen och duplicerad datumhjälpfunktion) som drar ned kodens underhållbarhet. Trots detta är huvudfunktionaliteten på plats och projektet når G-nivå.

💡 **Förbättringsförslag:**  
1) Implementera eller ta bort tomma komponenter: app/src/components/booking/BookingSummary.tsx och TimeSelector.tsx är tomma. Antingen bygg dem (t.ex. återanvändbar tidsväljare + bokningssammanfattning) eller rensa bort dem för att undvika “dead code”.

2) Lägg till avbokning för användare: för att uppfylla “Hantera avbokningar” i kundflödet, spara/visa boknings-ID (insertedId) efter createBooking och skapa en enkel avbokningsvy där användaren kan ange ID (eller få en länk i bekräftelsen) som anropar deleteBooking.

3) Riktiga CSS/SCSS-animationer kopplade till state: skapa t.ex. en spinner/skeleton med keyframes för isLoading i sökflödet och isSubmitting i kundformuläret, samt en kort success-animation när bokningen lyckas.

4) Minska duplicering (DRY): bryt ut kontaktformuläret som en gemensam komponent (t.ex. ContactForm) och återanvänd på startsida/kontaktsida. Gör även getTodayLocalIsoDate till en delad utility.

5) Förbättra robusthet i formulär: undvik non-null assertion (selectedSlot!) genom att tidigt returnera i submit-funktionen om slot saknas, så blir flödet tydligare och säkrare.

6) Admin-skapande av bokning: undvik hårdkodad kund (”Admin User”, example@example.com). Lägg till fält i admin-formuläret eller markera tydligt att det är en intern placeholder, annars riskerar ni skräpdata.

7) Tillgänglighet/UX: lägg till <label> för inputs, använd gärna fieldset/legend för radioknappar och koppla felmeddelanden med aria-describedby för bättre tillgänglighet.

8) Konsekvent stylingstrategi: ni blandar Tailwind och egen CSS. Det fungerar, men välj en tydligare linje (eller dokumentera varför ni blandar) för bättre långsiktig underhållbarhet.

Ni har byggt en fungerande helhet med ett tydligt bokningsflöde och ett admin-CRUD—bra jobbat. Med avbokningsflöde för kund, riktiga animationer och lite kodstädning/återanvändning är ni väldigt nära en riktigt polerad leverans.

## 👥 Gruppbidrag

| Deltagare | Antal commits | Commit % | Uppgiftskomplettering | Totalt bidrag |
| --------- | -------------- | -------- | ---------------------- | ------------- |
| rorotarver | 18 | 40% | 0.2 | 0.28 |
| Equilibrium | 14 | 31.1% | 0.2 | 0.24 |
| rorotarver | 10 | 22.2% | 0.2 | 0.21 |
| Ibbson | 2 | 4.4% | 0.2 | 0.14 |
| Your Name | 1 | 2.2% | 0.2 | 0.13 |


### 📊 Förklaring
- **Antal commits**: Antalet commits som personen har gjort
- **Commit %**: Procentuell andel av totala commits
- **Uppgiftskomplettering**: Poäng baserad på mappning av README-krav mot kodbidrag 
- **Totalt bidrag**: Viktad bedömning av personens totala bidrag (40% commits, 60% uppgiftskomplettering)
