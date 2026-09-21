// Asserts that every published bloom figure traces to a source with a URL, and
// that the ranges the site shows are exactly the spread its sources give.
//
//   node scripts/check-sources.mjs
//
// This one reads src/data/gelatin-bloom.json directly rather than dist/, so it
// can be run without a build. It exits 1 if any of the following is true:
//
//   - a sheet grade has fewer than 2 sources carrying a URL
//   - a grade's `range` is not the min/max of what its sources state
//   - a grade's `bloom` falls outside its own `range`
//   - a grade is marked `bloom_basis: "stated"` but a source disagrees
//   - a powder marked `confidence: "verified"` has no source with a URL

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const dataPath = fileURLToPath(new URL("../src/data/gelatin-bloom.json", import.meta.url));
const data = JSON.parse(await readFile(dataPath, "utf8"));

const MIN_SHEET_SOURCES = 2;

const sourceById = new Map(data.sources.map((s) => [s.id, s]));

const failures = [];
const fail = (msg) => failures.push(msg);

/**
 * The low and high ends a single stated figure contributes to a grade's range.
 * A bare number contributes itself twice; `[min, max]` contributes both ends;
 * `{ min }` ("230+") contributes a floor only, so it has no high end.
 */
function bounds(bloom) {
  if (typeof bloom === "number") return { lo: bloom, hi: bloom };
  if (Array.isArray(bloom)) return { lo: bloom[0], hi: bloom[1] };
  if (bloom && typeof bloom.min === "number") return { lo: bloom.min, hi: null };
  return null;
}

/** Whether a stated figure is consistent with the site's own bloom value. */
function agrees(bloom, siteBloom) {
  const b = bounds(bloom);
  if (!b) return true;
  if (b.hi === null) return siteBloom >= b.lo;
  return siteBloom >= b.lo && siteBloom <= b.hi;
}

function statedText(bloom) {
  if (typeof bloom === "number") return String(bloom);
  if (Array.isArray(bloom)) return `${bloom[0]}–${bloom[1]}`;
  if (bloom && typeof bloom.min === "number") return `${bloom.min}+`;
  return "";
}

// Every source a grade lists must exist, or the rest of the check is guesswork.
for (const entry of [...data.sheet_gelatin, ...data.powder_gelatin]) {
  for (const id of entry.sources || []) {
    if (!sourceById.has(id)) fail(`${entry.id}: unknown source id "${id}"`);
  }
}

const rows = [];

for (const grade of data.sheet_gelatin) {
  const listed = (grade.sources || []).map((id) => sourceById.get(id)).filter(Boolean);
  const withUrl = listed.filter((s) => s.url);

  if (withUrl.length < MIN_SHEET_SOURCES) {
    fail(
      `${grade.id}: ${withUrl.length} source(s) with a URL, needs at least ${MIN_SHEET_SOURCES}`,
    );
  }

  // The range is recomputed from what the sources actually say, so it cannot
  // drift away from them by hand-editing.
  const stated = listed
    .map((s) => s.values && s.values[grade.id] && s.values[grade.id].bloom)
    .filter((b) => b !== undefined);

  const los = [];
  const his = [];
  for (const b of stated) {
    const bnd = bounds(b);
    if (!bnd) continue;
    los.push(bnd.lo);
    if (bnd.hi !== null) his.push(bnd.hi);
  }

  if (los.length === 0) {
    fail(`${grade.id}: no source states a bloom figure`);
  } else {
    const computed = [Math.min(...los), Math.max(...(his.length ? his : los))];
    if (grade.range[0] !== computed[0] || grade.range[1] !== computed[1]) {
      fail(
        `${grade.id}: range is [${grade.range}] but its sources give [${computed}]`,
      );
    }
  }

  if (grade.bloom < grade.range[0] || grade.bloom > grade.range[1]) {
    fail(`${grade.id}: bloom ${grade.bloom} is outside its range [${grade.range}]`);
  }

  if (grade.bloom_basis === "stated") {
    for (const s of listed) {
      const v = s.values && s.values[grade.id];
      if (!v || v.bloom === undefined) continue;
      if (!agrees(v.bloom, grade.bloom)) {
        fail(
          `${grade.id}: marked "stated" at ${grade.bloom} but ${s.id} gives ${statedText(v.bloom)}`,
        );
      }
    }
  } else if (grade.bloom_basis === "midpoint") {
    if (!grade.bloom_note) fail(`${grade.id}: bloom_basis "midpoint" with no bloom_note`);
  } else {
    fail(`${grade.id}: bloom_basis must be "stated" or "midpoint", got "${grade.bloom_basis}"`);
  }

  rows.push({
    grade: grade.name,
    bloom: grade.bloom,
    range: grade.range[0] === grade.range[1] ? `${grade.range[0]}` : `${grade.range[0]}–${grade.range[1]}`,
    basis: grade.bloom_basis,
    sources: withUrl.length,
    stated: listed
      .map((s) => {
        const v = s.values && s.values[grade.id];
        return v && v.bloom !== undefined ? `${s.id}=${statedText(v.bloom)}` : null;
      })
      .filter(Boolean)
      .join(" "),
  });
}

for (const powder of data.powder_gelatin) {
  if (powder.confidence !== "verified") continue;
  const cited = (powder.sources || [])
    .map((id) => sourceById.get(id))
    .filter((s) => s && s.url && s.values && s.values[powder.id] !== undefined);
  if (cited.length === 0) {
    fail(`${powder.id}: confidence "verified" but no source with a URL states its bloom`);
  }
  rows.push({
    grade: powder.name,
    bloom: powder.bloom,
    range: powder.range ? `${powder.range[0]}–${powder.range[1]}` : "—",
    basis: powder.confidence,
    sources: cited.length,
    stated: cited.map((s) => `${s.id}=${statedText(s.values[powder.id].bloom)}`).join(" "),
  });
}

const cols = [
  ["Grade", "grade"],
  ["Bloom", "bloom"],
  ["Range", "range"],
  ["Basis", "basis"],
  ["Srcs", "sources"],
  ["What the sources state", "stated"],
];
const width = (key, label) =>
  Math.max(label.length, ...rows.map((r) => String(r[key]).length));
const widths = cols.map(([label, key]) => width(key, label));

console.log(cols.map(([label], i) => label.padEnd(widths[i])).join("  "));
console.log(widths.map((w) => "-".repeat(w)).join("  "));
for (const r of rows) {
  console.log(cols.map(([, key], i) => String(r[key]).padEnd(widths[i])).join("  "));
}

if (failures.length) {
  console.error(`\n${failures.length} problem(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log(`\nOK — ${data.sheet_gelatin.length} sheet grades and ${data.powder_gelatin.length} powders checked against ${data.sources.length} sources.`);
