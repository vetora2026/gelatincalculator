// Walks dist/**/index.html and reports the meta that search results are built
// from: title, description and canonical. Run after `npm run build`.
//
//   node scripts/check-meta.mjs
//
// Exits 1 if a title exceeds 62 characters or a description exceeds 155, so it
// can be wired into CI later without changing the output format.

import { readdir, readFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");

const TITLE_MAX = 62;
const DESC_MAX = 155;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name === "index.html") out.push(full);
  }
  return out;
}

const pick = (html, re) => {
  const m = html.match(re);
  return m ? m[1].trim() : null;
};

const decode = (s) =>
  s === null
    ? null
    : s
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");

const files = (await walk(dist)).sort();
let failures = 0;

for (const file of files) {
  const html = await readFile(file, "utf8");
  const url = "/" + relative(dist, file).split(sep).slice(0, -1).join("/");
  const title = decode(pick(html, /<title>([\s\S]*?)<\/title>/));
  const description = decode(pick(html, /<meta name="description" content="([\s\S]*?)"\s*\/?>/));
  const canonical = pick(html, /<link rel="canonical" href="([\s\S]*?)"\s*\/?>/);

  const tLen = title ? [...title].length : 0;
  const dLen = description ? [...description].length : 0;
  if (tLen > TITLE_MAX || dLen > DESC_MAX) failures++;

  console.log(`${url === "/" ? "/" : url + "/"}`);
  console.log(`  title  [${String(tLen).padStart(3)}]${tLen > TITLE_MAX ? " OVER" : ""}  ${title}`);
  console.log(`  desc   [${String(dLen).padStart(3)}]${dLen > DESC_MAX ? " OVER" : ""}  ${description}`);
  console.log(`  canon         ${canonical}`);
  console.log("");
}

console.log(`${files.length} pages checked, ${failures} over length.`);
process.exit(failures === 0 ? 0 : 1);
