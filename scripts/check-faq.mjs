// Asserts that every FAQPage JSON-LD block in dist/ says exactly what the
// page's visible FAQ says. Google treats a schema answer that is not on the
// page as a policy violation, and a paraphrase is also just a second copy to
// keep in sync by hand. Run after `npm run build`.
//
//   node scripts/check-faq.mjs
//
// Exits 1 if any page's schema and visible text disagree after whitespace
// normalisation, or if a schema question has no matching visible heading.

import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name === "index.html") out.push(full);
  }
  return out;
}

const ENTITIES = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&nbsp;": " ",
};

// Strip markup, decode the entities Astro emits, collapse whitespace. Tags
// are removed without substituting a space, matching the stripTags() the
// pages use to build the schema — otherwise an inline link inside an answer
// reads as a difference when the words are identical.
const norm = (s) => {
  let out = s.replace(/<[^>]+>/g, "");
  for (const [entity, char] of Object.entries(ENTITIES)) out = out.split(entity).join(char);
  return out.replace(/\s+/g, " ").trim();
};

const files = await walk(dist);
let pages = 0;
let matched = 0;
const failures = [];

for (const file of files) {
  const html = await readFile(file, "utf8");
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  const faq = blocks.map((m) => JSON.parse(m[1])).find((b) => b["@type"] === "FAQPage");
  if (!faq) continue;
  pages++;

  const path =
    "/" + file.slice(dist.length + 1).split(/[/\\]/).join("/").replace(/index\.html$/, "");

  // Visible FAQ: each <h3> question and the <p> that immediately follows it.
  const visible = new Map();
  for (const m of html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/g)) {
    visible.set(norm(m[1]), norm(m[2]));
  }

  const problems = [];
  for (const entry of faq.mainEntity) {
    const question = norm(entry.name);
    const schemaAnswer = norm(entry.acceptedAnswer.text);
    if (!visible.has(question)) {
      problems.push(`question not on the page: "${question}"`);
      continue;
    }
    if (visible.get(question) !== schemaAnswer) {
      problems.push(
        `answer differs for "${question}"\n      schema: ${schemaAnswer.slice(0, 120)}\n     visible: ${visible.get(question).slice(0, 120)}`,
      );
    }
  }

  if (problems.length) failures.push(`${path}\n  - ${problems.join("\n  - ")}`);
  else matched++;
}

console.log(`FAQ JSON-LD matches visible FAQ: ${matched}/${pages} pages`);
if (failures.length) {
  console.log("\n" + failures.join("\n"));
  process.exit(1);
}
