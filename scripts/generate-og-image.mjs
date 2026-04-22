import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));

const W = 1200;
const H = 630;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <style>
      .serif { font-family: 'DM Serif Display', 'Playfair Display', 'Didot', 'Bodoni MT', Georgia, serif; font-weight: 400; }
      .sans  { font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif; }
    </style>
  </defs>

  <rect width="${W}" height="${H}" fill="#ffffff"/>

  <!-- amber accent -->
  <rect x="56" y="56" width="120" height="3" fill="#d97706"/>

  <!-- domain top right -->
  <text x="${W - 56}" y="74" text-anchor="end"
        class="sans" font-size="22" fill="#78716c" font-weight="500">gelatincalculator.com</text>

  <!-- headline -->
  <text x="${W / 2}" y="260" text-anchor="middle"
        class="serif" font-size="128" fill="#1c1917">Know your gelatin.</text>

  <!-- Knox card -->
  <g transform="translate(230, 340)">
    <rect width="340" height="140" rx="16" ry="16" fill="#fafaf9" stroke="#e7e5e4" stroke-width="1"/>
    <text x="32" y="48" class="sans" font-size="20" fill="#57534e">Knox</text>
    <text x="32" y="112" class="serif" font-size="64" fill="#1c1917">~225</text>
    <text x="180" y="112" class="sans" font-size="22" fill="#78716c" font-weight="500">bloom</text>
  </g>

  <!-- Pastry card -->
  <g transform="translate(630, 340)">
    <rect width="340" height="140" rx="16" ry="16" fill="#fafaf9" stroke="#e7e5e4" stroke-width="1"/>
    <text x="32" y="48" class="sans" font-size="20" fill="#57534e">French pastry</text>
    <text x="32" y="112" class="serif" font-size="64" fill="#1c1917">~200</text>
    <text x="180" y="112" class="sans" font-size="22" fill="#78716c" font-weight="500">bloom</text>
  </g>

  <!-- footer line -->
  <text x="${W / 2}" y="582" text-anchor="middle"
        class="sans" font-size="20" fill="#78716c">Diagnose your gelatin's bloom. Convert any recipe.</text>
</svg>`;

const outPath = resolve(__dirname, "..", "public", "og-image.png");

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(outPath);

const { size } = await import("node:fs/promises").then((m) => m.stat(outPath));
console.log(`Wrote ${outPath} (${(size / 1024).toFixed(1)} KB)`);
