# DL BGG Product Info

En liten Shopify Theme App Extension för Dragon's Lair.

Målet är medvetet enkelt:

> Presentera befintlig BoardGameGeek-data på produktsidan snabbt, snyggt och responsivt.

Ingen databas, ingen Supabase, ingen egen adminpanel och ingen ny synklogik.


## RPGGeek-stöd (i separat draft-PR)

Produktblocket växlar på `custom.bgg_source_type`: `rpgitem` / `rpgissue` visar RPG-specifik snabbfakta och en länk till `rpggeek.com`. Brädspelsvisningen och Theme Editor-inställningarna är oförändrade.

RPG-vyn visar rollspel, regelsystem, tärningar och boktyp som badges när respektive data finns. Accordionen kan visa genre, mekaniker, spelvärld, kampanjserie, designers, förlag och utgivningsår. Den visar aldrig spelare/speltid/komplexitet från gamla BGG-fält på en RPG-produkt.

Denna gren är **inte deployad**. Shopify-kopian `RPGGeek – Klon av livetema 30 okt` (theme ID `207641117020`) är opublicerad och innehåller redan detta app-block i den befintliga produktmallen. Shopify Theme App Extension måste få en ny appversion via CLI för att den uppdaterade RPG-vyn ska synas; en GitHub-commit ensam ändrar inte blocket i butikens temaförhandsgranskning.

### Säkert förhandsgranskningstest
- Använd produkt `Dungeons & Dragons: 2024 Player's Handbook` (RPGGeek `405473`), som har verifierade `custom.rpg_*`-metafält.
- Efter att en utvecklingsversion av app-blocket gjorts tillgänglig i Theme Editor, välj den opublicerade temakopian och förhandsgranska produktmallen.
- Bekräfta att RPG badges visas och att spelare, speltid och komplexitet inte visas.
- Kontrollera att ett brädspel fortfarande har samma badges och accordion som tidigare.

## RPG-förfining (2026-10-30)

- För D&D 5th Edition används den korta badge-texten `D&D 5e`, och `D&D 5E Game System` visas som `D&D 5E`. Originalnamnen behålls oförändrade i Shopify-metafält och visas fullständigt i den utfällbara RPG-informationen.
- Om RPG-namnet är samma som produktens titel (t.ex. `Community Radio`) visas primärgenre i första faktakortet för att undvika onödig upprepning.
- RPG-korten använder en responsiv grid som fördelar 1–4 kort över tillgänglig bredd. Detta påverkar **inte** brädspelens ordinarie fyrakortsgrid.
- RPG-detaljerna har luftigare rader och bättre radavstånd, samt mobilanpassad enkolumnslayout.
- Ingen automatisk ändring av lagrad RPGGeek-data eller BGG-fält sker i den här temauppdateringen.

## RPGGeek: originaltermer och språkversion (2026-10-30)

Rollspelsinformationen har **svenska rubriker** men visar RPGGeeks etablerade engelska originaltermer för genre och mekaniker. Det gör t.ex. `Comedy / Satire`, `Horror`, `Free-form` och `Skill Based` igenkännbara för rollspelare utan att de på något sätt antyder att själva boken är på engelska. Enkla förklarande parenteser kortas i den synliga mekaniklistan, men viktiga tärningsvarianter (`Dice (Primarily d6)`, `Dice (Percentile)` etc.) behålls. `Fantasy (High Fantasy)` och `Fantasy (Low Fantasy)` visas som `High Fantasy` respektive `Low Fantasy` på produktsidan.

- **Visning:** `custom.rpg_source_mechanics` och `custom.rpg_source_genre` läses om de finns, annars används `custom.rpg_mechanics` och `custom.rpg_genre` (för äldre produkter).
- **Shopify-filter:** `custom.rpg_mechanics` och `custom.rpg_genre` lämnas helt orörda av denna uppdatering. Det krävs alltså ingen omedelbar omsynk och dagens Search & Discovery-filter slutar inte fungera. En senare övergång till konsekventa engelska filtervärden ska göras samordnat för redan synkade produkter.
- **Boktyp:** Svensk, såsom `Grundregler` och `Äventyr`. Regelsystemens egna namn lämnas oförändrade.
- **Språkversion:** Ett separat, manuellt produktmetafält `custom.rpg_language` (i Shopify: **Rollspel – språk**) visar en rad `Språk: Engelska` eller `Språk: Svenska` **endast när personalen faktiskt har fyllt i värdet**. Det befintliga `custom.sprak` är en valfri kompatibilitetsfallback. Om båda saknas visas ingen språkuppgift. Inga språk härleds från BGG/RPGGeek, spelmekaniker, titlar eller produktspecifikationer.
- **Var:** Språkraden visas vid RPG-snabbfaktan, ovanför källhänvisningen. Brädspelens visning är oförändrad.
- **Verifiering:** Kontrollera `Blades In The Dark` (Crime, Low Fantasy, Occult, Steampunk och engelska mekaniknamn), `Community Radio` (Comedy / Satire, Horror, Weird / Surreal och Description Based, Free-form), en RPG-bok med manuellt språkfält och en utan språkfält. Kontrollera även att Search & Discovery-värdena och brädspelskort fortfarande är oförändrade.
- **Publicering:** Kör `npx shopify app deploy` från `dl-bgg-product-info` efter godkänt CI-byggtest, och kontrollera att appen heter **DL BGG Product Info**. Ingen synk av befintliga produkter krävs för enbart denna visningsändring.

## Vad version 1 visar

Direkt på produktsidan visas upp till fyra badges:

- Spelare
- BGG-betyg
- Komplexitet
- Speltid

Under dem visas:

- `Speldata från BoardGameGeek`
- Accordion: `Mer info från BoardGameGeek`

Accordionen visar endast kompletterande information, så huvudvärdena upprepas inte:

1. Rekommenderad ålder
2. Mekaniker
3. Tema
4. Designer
5. Utgivare
6. Utgivningsår
7. Länk till spelets sida på BoardGameGeek

Om ett metafält saknar data försvinner motsvarande rad eller badge automatiskt.

## Metafält som används

| Funktion | Shopify metafält |
| --- | --- |
| Min spelare | `custom.min_players` |
| Max spelare | `custom.max_players` |
| BGG-betyg | `custom.bgg_average_rating` |
| BGG weight | `custom.bgg_average_weight` |
| Min speltid | `custom.play_time_min_minutes` |
| Max speltid | `custom.play_time_max_minutes` |
| Rek. ålder | `custom.min_age` |
| Mekaniker | `custom.mechanics` |
| Tema | `custom.theme` |
| Designer | `custom.designers` |
| Utgivare | `custom.publishers` |
| Utgivningsår | `custom.year_published` |
| BGG-ID | `custom.bgg_id` |

Fält som `custom.best_player_count` och `custom.bgg_ratings_count` används inte i MVP:n.

## Färgprofiler och Theme Editor

Shopify stödjer för närvarande inte inställningstypen `color_scheme` inne i Theme App Blocks.

Därför gör blocket något enklare och säkrare:

- Standardläget **Använd temats färger** är på.
- Blocket ärver i första hand temats befintliga CSS-färgvariabler från den sektion där blocket placeras.
- Om temat saknar kompatibla variabler används neutrala fallback-färger.
- Du kan stänga av detta läge och välja egna färger i Theme Editor.

Det gör att blocket följer produktsektionens färgprofil utan att försöka duplicera temats färgsystem.

## Theme Editor-inställningar

Version 1 innehåller:

- Använd temats färger
- Egen bakgrundsfärg
- Egen textfärg
- Egen kantfärg
- Egen accentfärg
- Minsta badgehöjd
- Badge-padding
- Avstånd mellan badges
- Hörnradie
- Ikonstorlek
- Huvudtextens storlek
- Etikettens storlek
- Vertikalt mellanrum runt blocket
- Visa/dölj källraden
- Text för accordion-raden

Storleksreglagen har medvetet begränsade intervall så att layouten är svår att råka förstöra.

## Responsivitet

- Stor desktop: 4 badges i en rad
- Smalare skärmar: 2 × 2
- Ingen fast totalhöjd används
- Långa värden radbryts
- Saknade badges gör att grid-layouten fyller utrymmet automatiskt

## Installation / första testet

Projektet är gjort som en **extension-only Shopify-app**. Du behöver därför länka repot till en app i Shopify Dev Dashboard innan det kan deployas.

### 1. Lägg projektet i GitHub

Packa upp ZIP-filen lokalt och ladda upp **innehållet i mappen** till ett nytt GitHub-repository.

Viktigt: GitHub packar inte automatiskt upp en ZIP som du laddar upp som en vanlig fil.

### 2. Hämta repot lokalt

Öppna en terminal i projektmappen och kör:

```bash
npm install
```

### 3. Länka till Shopify

Kör:

```bash
npx shopify app config link
```

Välj en befintlig utvecklingsapp eller skapa/länka en ny app när Shopify CLI frågar.

Shopify skapar då appens `shopify.app.toml` i projektroten.

### 4. Testa mot utvecklingsbutiken

```bash
npx shopify app dev
```

Öppna preview-länken som Shopify CLI visar.

### 5. Lägg till blocket

I Theme Editor:

1. Öppna en produktmall för ett brädspel.
2. Lägg till ett app block.
3. Välj **DL – BGG spelinfo**.
4. Placera blocket direkt där ni vill ha snabbfaktan.
5. Justera Theme Editor-inställningarna vid behov.

### 6. Deploy

När testet ser bra ut:

```bash
npx shopify app deploy
```

Shopify skapar och releasar en ny appversion.

## Kontrollera särskilt i test

Testa gärna minst dessa produkter:

- Scythe, komplett BGG-data
- Ett spel utan BGG-betyg
- Ett spel utan complexity
- Ett spel där min/max speltid är samma
- Ett spel där min/max spelare är samma
- En produkt som inte är ett brädspel och saknar BGG-data
- Mobilvy runt 375 px
- Tablet/smal desktop
- Full desktop

För en produkt helt utan relevant BGG-data renderas blocket inte alls.

## Projektstruktur

```text
dl-bgg-product-info/
├─ README.md
├─ package.json
├─ .gitignore
└─ extensions/
   └─ dl-bgg-product-info/
      ├─ shopify.extension.toml
      ├─ assets/
      │  └─ dl-bgg-product-info.css
      └─ blocks/
         └─ bgg-product-info.liquid
```

## DL App Standard

Koden är uppdelad med tydliga `START` / `END`-markörer. Om vi senare behöver göra en manuell ändring kan hela namngivna block ersättas i stället för små osäkra kirurgiska ingrepp.
