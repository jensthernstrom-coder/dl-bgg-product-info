# DL BGG Product Info

En liten Shopify Theme App Extension för Dragon's Lair.

Målet är medvetet enkelt:

> Presentera befintlig BoardGameGeek-data på produktsidan snabbt, snyggt och responsivt.

Ingen databas, ingen Supabase, ingen egen adminpanel och ingen ny synklogik.

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
