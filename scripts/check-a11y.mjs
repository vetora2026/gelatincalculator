#!/usr/bin/env node
/**
 * check-a11y.mjs — axe-core audit of every built page at mobile width.
 *
 * Starts `astro preview`, walks every URL in dist/sitemap-0.xml at 375px, and
 * runs axe with the wcag2a / wcag2aa / wcag22aa tag sets. wcag22aa is what
 * brings in `target-size`, the 24x24 tap-target rule.
 *
 * Not part of `npm run build` or `npm run check`: it needs a running server.
 * Run it after any colour or layout change — see CLAUDE.md.
 *
 * Exit code is the number of pages with violations (0 = clean, capped at 100).
 */
import { readFileSync, existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";

const PORT = Number(process.env.A11Y_PORT || 4325);
const WIDTH = 375;
const HEIGHT = 812;
const TAGS = ["wcag2a", "wcag2aa", "wcag22aa"];
const SITEMAP = "dist/sitemap-0.xml";

if (!existsSync(SITEMAP)) {
  console.error(`${SITEMAP} not found — run \`npm run build\` first.`);
  process.exit(1);
}

const paths = [...readFileSync(SITEMAP, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => new URL(m[1]).pathname)
  .sort();

if (paths.length === 0) {
  console.error("No <loc> entries in the sitemap.");
  process.exit(1);
}

const server = spawn(
  process.platform === "win32" ? "npx.cmd" : "npx",
  ["astro", "preview", "--port", String(PORT)],
  { stdio: "ignore", shell: process.platform === "win32" }
);

const shutdown = () => {
  try {
    server.kill();
  } catch {}
};
process.on("exit", shutdown);
process.on("SIGINT", () => {
  shutdown();
  process.exit(130);
});

const base = `http://localhost:${PORT}`;

async function waitForServer(timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(base + "/");
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`astro preview did not come up on ${base}`);
}

await waitForServer();

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: WIDTH, height: HEIGHT },
});

// The AdSense script is third-party and not ours to fix; blocking it keeps the
// audit about our own markup and keeps runs deterministic offline.
await context.route("**://*.googlesyndication.com/**", (route) => route.abort());
await context.route("**://*.doubleclick.net/**", (route) => route.abort());

const page = await context.newPage();
const totals = new Map();
let pagesWithViolations = 0;

console.log(`axe ${TAGS.join(", ")} — ${paths.length} pages at ${WIDTH}px\n`);

for (const path of paths) {
  await page.goto(base + path, { waitUntil: "networkidle" });
  const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze();

  if (violations.length === 0) {
    console.log(`  ok    ${path}`);
    continue;
  }

  pagesWithViolations++;
  console.log(`  FAIL  ${path}`);
  for (const v of violations) {
    totals.set(v.id, (totals.get(v.id) || 0) + v.nodes.length);
    console.log(`          ${v.id} (${v.impact}) — ${v.nodes.length} node(s)`);
    for (const node of v.nodes.slice(0, 5)) {
      console.log(`            ${node.target.join(" ")}`);
      const detail = (node.any[0] || node.all[0] || node.none[0])?.message;
      if (detail) console.log(`              ${detail.replace(/\s+/g, " ").trim()}`);
    }
    if (v.nodes.length > 5) {
      console.log(`            ...and ${v.nodes.length - 5} more`);
    }
  }
}

console.log(`\nViolations by rule (node count across all pages):`);
if (totals.size === 0) {
  console.log("  none");
} else {
  for (const [rule, count] of [...totals].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(count).padStart(4)}  ${rule}`);
  }
}
console.log(
  `\n${paths.length} pages checked, ${pagesWithViolations} with violations.`
);

await browser.close();
shutdown();
process.exit(Math.min(pagesWithViolations, 100));
