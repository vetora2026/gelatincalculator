// Single source of truth for sheet <-> powder gelatin conversion.
//
// Bloom values and per-sheet weights are read from src/data/gelatin-bloom.json.
// Nothing in this file hardcodes a gelatin value; if the JSON is corrected,
// every consumer (the interactive converter and the static quantity pages)
// picks the correction up on the next build.

import data from "../data/gelatin-bloom.json";

export const LAST_VERIFIED = data.last_verified;

// The same date written out for prose ("21 September 2026"). Parsed as UTC so
// the day never shifts with the build machine's timezone.
export const LAST_VERIFIED_LONG = new Date(`${data.last_verified}T00:00:00Z`).toLocaleDateString(
  "en-GB",
  { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" },
);

export const GRADES = data.sheet_gelatin.map((g) => ({
  id: g.id,
  name: g.name,
  bloom: g.bloom,
  g: g.grams_per_sheet,
  range: g.range,
  basis: g.bloom_basis,
  basisNote: g.bloom_note || "",
  sources: g.sources || [],
}));

/**
 * A grade's range as prose. Silver's sources all give the same figure, so its
 * range is [160, 160]; printing that as "160–160" would read as a spread the
 * data does not have. One number in, one number out.
 */
export const formatRange = (range) =>
  range[0] === range[1] ? `${range[0]}` : `${range[0]}–${range[1]}`;

// The published references behind the bloom figures, in the order they should
// be listed. `values` records what each one said on the date it was accessed.
export const SOURCES = data.sources;

export const getSource = (id) => {
  const s = data.sources.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown source id: ${id}`);
  return s;
};

// Sources that state a figure for at least one sheet grade. These are the ones
// the grade comparison table has columns for.
export const SHEET_SOURCES = data.sources.filter((s) =>
  data.sheet_gelatin.some((g) => s.values && s.values[g.id]),
);

/**
 * One source's figure for one grade, as prose: a number, a range, or "230+"
 * for a minimum-only statement. Empty string when the source is silent.
 */
export function sourceBloomText(source, gradeId) {
  const v = source.values && source.values[gradeId];
  if (!v || v.bloom === undefined) return "";
  const b = v.bloom;
  if (Array.isArray(b)) return `${b[0]}–${b[1]}`;
  if (typeof b === "object") return `${b.min}+`;
  return `${b}`;
}

// Every bloom figure the site publishes, sheets and powders alike. The bloom
// range quoted in the prose is computed from these rather than typed.
const ALL_BLOOMS = [
  ...data.sheet_gelatin.flatMap((g) => [g.bloom, ...g.range]),
  ...data.powder_gelatin.flatMap((p) => [p.bloom, ...(p.range || [])]),
];
export const BLOOM_MIN = Math.min(...ALL_BLOOMS);
export const BLOOM_MAX = Math.max(...ALL_BLOOMS);

// The "unknown" bucket is a diagnostic fallback, not a product a reader can
// buy, so it is excluded from the powder pick-lists.
export const POWDERS = data.powder_gelatin
  .filter((p) => p.id !== "unknown")
  .map((p) => ({
    id: p.id,
    name: p.name,
    label: p.short_label || p.name,
    bloom: p.bloom,
    range: p.range,
    sources: p.sources || [],
  }));

export const DEFAULT_SHEET_GRADE = "gold";
export const DEFAULT_POWDER = "knox";

// Unit equivalences for powdered gelatin.
export const PACKET_GRAMS = 7;
export const TSP_GRAMS = 2.8;
export const TBSP_ML = 15;

/**
 * Cold liquid needed to bloom powdered gelatin, as a multiple of the powder's
 * own weight. The pages used to say "four to five times" and then quote cup
 * fractions that worked out at eight to eleven times; one constant keeps the
 * rule and the volumes in agreement.
 */
export const BLOOM_LIQUID_RATIO = 5;

/**
 * Bloom liquid for `powderGrams`, in ml, rounded to the nearest half
 * tablespoon. Rounding to the whole tablespoon collapsed adjacent sheet counts
 * onto the same figure (four and five sheets both read "3 tablespoons"); the
 * half-tablespoon step is fine enough for the ladder to move.
 */
export function bloomLiquidMl(powderGrams) {
  const step = TBSP_ML / 2;
  return Math.round((powderGrams * BLOOM_LIQUID_RATIO) / step) * step;
}

/** The same volume in tablespoons, which is how the prose states it. */
export const bloomLiquidTbsp = (powderGrams) => bloomLiquidMl(powderGrams) / TBSP_ML;

/**
 * The rendered phrase for a bloom-liquid volume, e.g. "2½ tablespoons
 * (37.5ml)". Halves are written as a fraction because that is how a cook reads
 * a tablespoon measure; the ml figure follows so the number stays checkable.
 */
export function bloomLiquidPhrase(powderGrams) {
  const ml = bloomLiquidMl(powderGrams);
  const tbsp = ml / TBSP_ML;
  const whole = Math.floor(tbsp);
  const half = tbsp - whole >= 0.5;
  const count = whole === 0 ? "½" : `${whole}${half ? "½" : ""}`;
  const word = tbsp <= 1 ? "tablespoon" : "tablespoons";
  return `${count} ${word} (${fmtShort(ml)}ml)`;
}

/**
 * Exponent applied to the bloom ratio when matching gel strength.
 * 0.5 = square-root rule (gel rigidity ~ concentration², so equal strength
 * scales mass by sqrt of the bloom ratio). 1 = the linear rule many consumer
 * calculators use. See /sheets-to-powder/#method.
 */
export const BLOOM_EXPONENT = 0.5;
export const bloomFactor = (fromBloom, toBloom) => Math.pow(fromBloom / toBloom, BLOOM_EXPONENT);

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
 * Mass is scaled by `bloomFactor` so the gelling power matches.
 */
export function sheetsToPowderGrams(count, gradeId, powderId = DEFAULT_POWDER) {
  const grade = getGrade(gradeId);
  const powder = getPowder(powderId);
  return count * grade.g * bloomFactor(grade.bloom, powder.bloom);
}

/** Powder equivalent, in grams, for a mass of sheet gelatin given in grams. */
export function sheetGramsToPowderGrams(grams, gradeId, powderId = DEFAULT_POWDER) {
  const grade = getGrade(gradeId);
  const powder = getPowder(powderId);
  return grams * bloomFactor(grade.bloom, powder.bloom);
}

/** Mass of sheet gelatin, in grams, equivalent to a mass of powder. */
export function powderGramsToSheetGrams(grams, gradeId = DEFAULT_SHEET_GRADE, powderId = DEFAULT_POWDER) {
  return grams * bloomFactor(getPowder(powderId).bloom, getGrade(gradeId).bloom);
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
  return (grams * bloomFactor(powder.bloom, grade.bloom)) / grade.g;
}

export const gramsToPackets = (grams) => grams / PACKET_GRAMS;
export const gramsToTsp = (grams) => grams / TSP_GRAMS;

/** Display helper: one decimal place, as used everywhere on the site. */
export const fmt1 = (n) => n.toFixed(1);
export const fmt2 = (n) => n.toFixed(2);

/** fmt1 without a trailing ".0", for prose where "2×" beats "2.0×". */
export const fmtShort = (n) => fmt1(n).replace(/\.0$/, "");

// Grams of ~225-bloom powder per US cup (240 ml). Anchor: Knox states one 7g
// envelope gels 2 cups (500 ml) — 3.5g per cup — which is the "standard" row.
export const SOFT_SET_G_PER_CUP = 2.4;       // ~1%  — spoonable, panna cotta
export const STANDARD_SET_G_PER_CUP = 3.5;   // ~1.5% — Knox's own guidance; unmoldable
export const FIRM_SET_G_PER_CUP = 4.8;       // ~2%  — clean-cutting, layered
export const VERY_FIRM_SET_G_PER_CUP = 7;    // ~3%  — one envelope per cup; gummies, aspic

/** Retained alias so existing importers keep resolving. */
export const MEDIUM_SET_G_PER_CUP = STANDARD_SET_G_PER_CUP;

/** How many cups of liquid a given mass of powder sets, at a chosen ratio. */
export function cupsSetBy(powderGrams, gPerCup = STANDARD_SET_G_PER_CUP) {
  return powderGrams / gPerCup;
}
