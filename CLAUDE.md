# CLAUDE.md — gelatincalculator.com

## What this is

Utility site #1 in the portfolio. A free tool that helps home cooks diagnose the bloom strength of their gelatin and convert recipe quantities to match. The differentiating insight: most competing calculators assume the user already knows their bloom value; this one starts with a diagnostic step.

## Status

- **Local build:** complete (v1)
- **Deployed:** not yet — deployment to Cloudflare Pages will be handled in a follow-up prompt
- **AdSense:** not applied yet — will apply after the site is live and has some content/traffic
- **6-month data re-verification cron:** not set up yet — will be added with deployment

## Stack decisions

- **Astro** with `output: "static"` — this is a fully static site; no server runtime needed.
- **React** integration — used only for the two interactive components (`Diagnostic.jsx`, `Converter.jsx`). Everything else is plain Astro.
- **Tailwind** via the official Astro integration — no custom CSS framework.
- **Cloudflare Pages** is the deployment target. Chosen because the domain is already on Cloudflare and Pages has a generous free tier.
- **No backend, no database, no localStorage, no analytics, no newsletter.** These are intentional v1 constraints.

## Data policy

Bloom values live in `src/data/gelatin-bloom.json`. Rules:

1. **Only add a brand/grade if you can verify its bloom value.** Sources must be a manufacturer spec sheet, a published cookbook, or multiple independent secondary references.
2. **Confidence levels must be honest:**
   - `verified` — value confirmed by at least two independent sources (e.g., Knox at 225).
   - `standard` — value is an industry convention with a known range (e.g., sheet gelatin grades).
   - `typical` — value is a reasonable estimate for a category, not a specific brand.
   - `low` — fallback/"I don't know" bucket.
3. **Do not invent bloom values** to pad the list. If we can't verify it, we don't publish it.
4. **The `last_verified` date at the top of the file must be updated** whenever values are re-checked (planned cadence: every 6 months).

## Tone and voice

Diagnostic and explanatory, not promotional. No stock marketing phrases. The site's credibility comes from being honest about what's verified and what's estimated — this is the single most important brand decision.

## Known open items (punch list)

- [ ] Deploy to Cloudflare Pages (next prompt)
- [ ] Set up 6-month re-verification cron/reminder
- [ ] Apply for Google AdSense after launch
- [ ] Configure email forwarding for `contact@gelatincalculator.com`
- [ ] Brand lookup table intentionally small in v1 — expand only with verified additions

## File structure notes

- `src/components/Diagnostic.jsx` is the state machine (3 steps). It renders `Converter.jsx` inline once a bloom is resolved.
- `src/components/Converter.jsx` can also be used standalone; it accepts `userBloom` and `diagnosedName` props.
- `src/components/TwoLegos.astro` is the hero data-point visual — two stat cards with no connecting copy.
- `src/data/gelatin-bloom.json` is the single source of truth for bloom values.

## Gotchas

- The converter's default recipe bloom is 200 (gold) because that's the most common target in professional pastry recipes. Changing this default silently changes conversion output for users who don't touch the preset — do so deliberately.
- The diagnostic's "I don't know" paths all resolve to 215 bloom (the middle of the US grocery powder range). This is a deliberate "safe middle" fallback.

## Known Version Pins

- `@astrojs/sitemap` pinned at 3.2.1 — version 3.7.x crashes with Astro 4.16 ("Cannot read properties of undefined (reading 'reduce')"). When Astro is eventually upgraded past 4.x, re-upgrade sitemap to the then-current version.

## Deployment

- **Target:** Cloudflare Pages
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node version:** 20 or newer
- **Custom domain:** `gelatincalculator.com` (registered on Cloudflare)
- **Email forwarding:** `contact@gelatincalculator.com` → user's personal inbox, via Cloudflare Email Routing
