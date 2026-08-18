// Single source of truth for sheet <-> powder gelatin conversion.
//
// Bloom values and per-sheet weights are read from src/data/gelatin-bloom.json.
// Nothing in this file hardcodes a gelatin value; if the JSON is corrected,
// every consumer (the interactive converter and the static quantity pages)
// picks the correction up on the next build.

import data from "../data/gelatin-bloom.json";

export const LAST_VERIFIED = data.last_verified;

export const GRADES = data.sheet_gelatin.map((g) => ({
  id: g.id,
  name: g.name,
  bloom: g.bloom,
  g: g.grams_per_sheet,
}));

// The "unknown" bucket is a diagnostic fallback, not a product a reader can
// buy, so it is excluded from the powder pick-lists.
export const POWDERS = data.powder_gelatin
  .filter((p) => p.id !== "unknown")
  .map((p) => ({
    id: p.id,
    name: p.name,
    label: p.short_label || p.name,
    bloom: p.bloom,
  }));

export const DEFAULT_SHEET_GRADE = "gold";
export const DEFAULT_POWDER = "knox";

// Unit equivalences for powdered gelatin.
export const PACKET_GRAMS = 7;
export const TSP_GRAMS = 2.8;

export function getGrade(id) {
  const grade = GRADES.find((g) => g.id === id);
  if (!grade) throw new Error(`Unknown sheet grade: ${id}`);
  return grade;
}

export function getPowder(id) {
  const powder = POWDERS.find((p) => p.id === id);
  if (!powder) throw new Error(`Unknown powder: ${id}`);
  return powder;
}

/** Grams of gelatin contained in `count` sheets of a given grade. */
export function sheetMass(count, gradeId) {
  return count * getGrade(gradeId).g;
}

/**
 * Powder equivalent, in grams, for `count` sheets of `gradeId`.
 * Mass is scaled by the bloom ratio so the gelling power matches.
 */
export function sheetsToPowderGrams(count, gradeId, powderId = DEFAULT_POWDER) {
  const grade = getGrade(gradeId);
  const powder = getPowder(powderId);
  return count * grade.g * (grade.bloom / powder.bloom);
}

/** Powder equivalent, in grams, for a mass of sheet gelatin given in grams. */
export function sheetGramsToPowderGrams(grams, gradeId, powderId = DEFAULT_POWDER) {
  const grade = getGrade(gradeId);
  const powder = getPowder(powderId);
  return grams * (grade.bloom / powder.bloom);
}

/** Mass of sheet gelatin, in grams, equivalent to a mass of powder. */
export function powderGramsToSheetGrams(grams, gradeId = DEFAULT_SHEET_GRADE, powderId = DEFAULT_POWDER) {
  return (grams * getPowder(powderId).bloom) / getGrade(gradeId).bloom;
}

/** Convert a powder quantity in grams / packets / teaspoons into grams. */
export function powderToGrams(amount, unit = "grams") {
  if (unit === "packets") return amount * PACKET_GRAMS;
  if (unit === "tsp") return amount * TSP_GRAMS;
  return amount;
}

/** Number of sheets of `gradeId` equivalent to a powder quantity. */
export function powderToSheets(amount, unit, powderId = DEFAULT_POWDER, gradeId = DEFAULT_SHEET_GRADE) {
  const grams = powderToGrams(amount, unit);
  const powder = getPowder(powderId);
  const grade = getGrade(gradeId);
  return (grams * powder.bloom) / (grade.bloom * grade.g);
}

export const gramsToPackets = (grams) => grams / PACKET_GRAMS;
export const gramsToTsp = (grams) => grams / TSP_GRAMS;

/** Display helper: one decimal place, as used everywhere on the site. */
export const fmt1 = (n) => n.toFixed(1);
export const fmt2 = (n) => n.toFixed(2);

// Liquid-setting reference ratios, taken from the site's existing
// /how-much-gelatin-per-cup-of-liquid/ page so the two stay in step.
// Both are grams of ~200-225 bloom powder per US cup (240ml) of liquid.
export const MEDIUM_SET_G_PER_CUP = 7;
export const SOFT_SET_G_PER_CUP = 4.7;

/** How many cups of liquid a given mass of powder sets, at a chosen ratio. */
export function cupsSetBy(powderGrams, gPerCup = MEDIUM_SET_G_PER_CUP) {
  return powderGrams / gPerCup;
}
