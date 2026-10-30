import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const liquid = readFileSync(
  new URL("../extensions/dl-bgg-product-info/blocks/bgg-product-info.liquid", import.meta.url),
  "utf8",
);

test("RPG original labels are preferred without changing stored Search & Discovery filters", () => {
  assert.match(liquid, /metafields\.custom\.rpg_source_mechanics\.value/);
  assert.match(liquid, /metafields\.custom\.rpg_source_genre\.value/);
  assert.match(liquid, /if dl_rpg_source_mechanics != blank/);
  assert.match(liquid, /if dl_rpg_source_genre != blank/);
  assert.match(liquid, /for mechanic in dl_rpg_display_mechanics/);
  assert.match(liquid, /for genre in dl_rpg_display_genre/);
  assert.match(liquid, /unless mechanic contains 'Dice \('/);
});

test("language is shown only when staff entered it for the product", () => {
  assert.match(liquid, /metafields\.custom\.rpg_language\.value/);
  assert.match(liquid, /metafields\.custom\.sprak\.value/);
  assert.match(liquid, /if dl_rpg_language != blank/);
  assert.match(liquid, /Språk:<\/strong>/);
});

test("existing BGG storefront mode and separate RPG system links remain present", () => {
  assert.match(liquid, /dl_geek_source == 'rpg'/);
  assert.match(liquid, /data-dl-display-mode/);
  assert.match(liquid, /Se rollspelet på RPGGeek/);
  assert.match(liquid, /aria-label="Spelfakta från BoardGameGeek"/);
});
