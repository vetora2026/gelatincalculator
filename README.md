# gelatincalculator.com

A utility site that helps home cooks (a) figure out the bloom strength of their gelatin and (b) convert pastry recipe quantities to match. Built as a static Astro + React + Tailwind site, deployed on Cloudflare Pages.

## Stack

- Astro (static output)
- React (for the interactive Diagnostic and Converter components)
- Tailwind CSS

## Local dev

```bash
npm install
npm run dev        # dev server, hot reload
npm run build      # production build → ./dist
npm run preview    # serve ./dist locally on port 4321
```

## Deployment target

Cloudflare Pages (to be configured in the next prompt). Domain `gelatincalculator.com` is registered on Cloudflare.

## Data verification policy

Bloom values live in `src/data/gelatin-bloom.json` with a `last_verified` date at the top of the file. Values must be re-verified every 6 months against their source. A cron job for this will be added in the deployment prompt.

## Content policy

- Only add brands with a verifiable bloom value (manufacturer spec sheet or multiple independent secondary sources).
- Label each entry with an honest confidence level: `verified` / `standard` / `typical` / `low`.
- Do not invent bloom values to pad the list.
