import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const liquid = readFileSync(
  new URL("../extensions/dl-bgg-product-info/blocks/bgg-product-info.liquid", import.meta.url),
  "utf8",
);

const boardgame = liquid.split('aria-label="Spelfakta från BoardGameGeek">')[1]
  .split("{%- if block.settings.show_source -%}")[0];
const boardgameMore = liquid.split('{%- if dl_has_more -%}')[1]
  .split("{%- endif -%}\n    {%- endif -%}")[0];

test("boardgame quick facts are players, age, playtime and BGG rating", () => {
  assert.ok(boardgame, "boardgame badge section is present");
  const conditions = [...boardgame.matchAll(/\{%- if (dl_[\w]+)(?: != blank)? -%\}/g)]
    .map((match) => match[1]);
  assert.deepEqual(conditions, ["dl_has_players", "dl_min_age", "dl_has_time", "dl_rating"]);
  assert.match(boardgame, /\{\{ dl_min_age \}\}\+/);
  assert.match(boardgame, /<span class="dl-bgg-info__label">ålder<\/span>/);
  assert.doesNotMatch(boardgame, /dl_weight|komplexitet/i);
});

test("complexity is in expanded BGG info and recommended age is not repeated", () => {
  assert.match(boardgameMore, /if dl_weight != blank/);
  assert.match(boardgameMore, /Komplexitet<\/dt>/);
  assert.match(boardgameMore, /\{\{ dl_weight_text \}\} \/ 5/);
  assert.doesNotMatch(boardgameMore, /Rekommenderad ålder|if dl_min_age/);
});

test("only available boardgame facts control badges and expanded info", () => {
  assert.match(liquid, /if dl_has_players or dl_rating != blank or dl_min_age != blank or dl_has_time/);
  assert.match(liquid, /if dl_weight != blank or dl_mechanics != blank or dl_theme != blank/);
  assert.match(liquid, /\{%- if dl_has_badges -%\}/);
  assert.match(liquid, /\{%- if dl_has_more -%\}/);
});

test("RPG-specific display stays separate from boardgame badges", () => {
  assert.match(liquid, /\{%- if dl_is_rpg -%\}/);
  assert.match(liquid, /aria-label="Rollspelsfakta från RPGGeek"/);
  assert.match(liquid, /data-dl-display-mode/);
});

test("expanded facts show synced BGG Tools complexity label in parentheses", () => {
  assert.ok(liquid.includes("assign dl_complexity_label = product.metafields.custom.bgg_complexity.value"));
  assert.ok(boardgameMore.includes("{{ dl_weight_text }} / 5{% if dl_complexity_label != blank %} ({{ dl_complexity_label | escape }}){% endif %}"));
});

test("theme list is joined as human-readable text rather than raw JSON", () => {
  assert.ok(boardgameMore.includes("{{ dl_theme | join: ' · ' | escape }}"));
  assert.ok(!boardgameMore.includes("{{ dl_theme | escape }}"));
  assert.ok(boardgameMore.includes("{{ dl_mechanics | join: ' · ' | escape }}"));
});
