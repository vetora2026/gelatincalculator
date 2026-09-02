# GEL003 - Content Audit, gelatincalculator.com

**Date:** 2026-09-02  
**Type:** Read-only audit. No page, component, config, or data file was modified.  
**Trigger:** Second Google AdSense rejection for "Low value content" on 2026-08-26.

## Method

All measurements are taken from the **rendered HTML in `dist/`**, not from source templates, so what is counted is what a reviewer's browser actually receives. The build in `dist/` was verified fresh: no file under `src/`, `public/`, or `astro.config.mjs` has a modification time newer than `dist/index.html`, and `git status` was clean at the start and end of this audit.

Body text = the contents of each page's single `<main>` element, with `<script>`, `<style>`, HTML comments, and the in-`main` breadcrumb `<nav>` removed. Site header, top nav, and footer are excluded from every count because they are identical on all 18 pages.

Where a statement is inference rather than measurement it is marked **[INFERENCE]**.

## 1. Page inventory

18 routes are published. This matches `dist/sitemap-0.xml` exactly - **no mismatch**: no built page is missing from the sitemap, and no sitemap entry lacks a built page.

| # | URL path | Source file | Generation |
|---|---|---|---|
| 1 | `/` | `src/pages/index.astro` | Static |
| 2 | `/1-gelatin-sheet-to-powder/` | `src/pages/[slug].astro + src/data/quantity-page-content.js` | Dynamic - `getStaticPaths()` over `COUNT_PAGES` |
| 3 | `/2-gelatin-sheets-to-powder/` | `src/pages/[slug].astro + src/data/quantity-page-content.js` | Dynamic - `getStaticPaths()` over `COUNT_PAGES` |
| 4 | `/3-gelatin-sheets-to-powder/` | `src/pages/[slug].astro + src/data/quantity-page-content.js` | Dynamic - `getStaticPaths()` over `COUNT_PAGES` |
| 5 | `/4-gelatin-sheets-to-powder/` | `src/pages/[slug].astro + src/data/quantity-page-content.js` | Dynamic - `getStaticPaths()` over `COUNT_PAGES` |
| 6 | `/5-gelatin-sheets-to-powder/` | `src/pages/[slug].astro + src/data/quantity-page-content.js` | Dynamic - `getStaticPaths()` over `COUNT_PAGES` |
| 7 | `/6-gelatin-sheets-to-powder/` | `src/pages/[slug].astro + src/data/quantity-page-content.js` | Dynamic - `getStaticPaths()` over `COUNT_PAGES` |
| 8 | `/about/` | `src/pages/about.astro` | Static |
| 9 | `/articles/` | `src/pages/articles/index.astro` | Static |
| 10 | `/gelatin-grams-sheets-to-powder/` | `src/pages/gelatin-grams-sheets-to-powder/index.astro` | Static |
| 11 | `/gelatin-powder-to-sheets/` | `src/pages/gelatin-powder-to-sheets/index.astro` | Static |
| 12 | `/gelatin-sheets-vs-powder/` | `src/pages/gelatin-sheets-vs-powder/index.astro` | Static |
| 13 | `/how-much-gelatin-per-cup-of-liquid/` | `src/pages/how-much-gelatin-per-cup-of-liquid/index.astro` | Static |
| 14 | `/privacy/` | `src/pages/privacy.astro` | Static |
| 15 | `/sheets-to-powder/` | `src/pages/sheets-to-powder/index.astro` | Static |
| 16 | `/terms/` | `src/pages/terms.astro` | Static |
| 17 | `/what-is-bloom-strength/` | `src/pages/what-is-bloom-strength/index.astro` | Static |
| 18 | `/what-is-gelatin-bloom-strength/` | `src/pages/what-is-gelatin-bloom-strength/index.astro` | Static |

The six sheet-count pages are generated from one template, `src/pages/[slug].astro`, driven by the `COUNT_PAGES` array in `src/data/quantity-page-content.js`. The other 12 are hand-authored `.astro` files.

## 2. Word count per page

Three columns are broken out rather than two, because the distinction the brief asks for (prose vs. form labels) turned out to be less important on this site than the distinction between **prose** and **table data**. Only two pages carry a calculator at all.

- **Prose** - running explanatory text, headings, FAQ answers.
- **Table** - text inside `<table>` elements (conversion charts; mostly numbers and grade names).
- **Calculator UI** - text inside the hydrated React island (`<astro-island>`) plus any standalone `<button>` / `<label>` / `<select>` / `<option>`.

Ascending by total body words.

| URL path | Total body | Prose | Table | Calculator UI |
|---|---:|---:|---:|---:|
| `/articles/` | 212 | 212 | 0 | 0 |
| `/terms/` | 249 | 249 | 0 | 0 |
| `/about/` | 313 | 313 | 0 | 0 |
| `/privacy/` | 324 | 324 | 0 | 0 |
| `/sheets-to-powder/` | 687 | 610 | 0 | 77 |
| `/how-much-gelatin-per-cup-of-liquid/` | 750 | 694 | 56 | 0 |
| `/what-is-bloom-strength/` | 766 | 739 | 27 | 0 |
| `/` | 780 | 739 | 0 | 41 |
| `/gelatin-sheets-vs-powder/` | 792 | 711 | 81 | 0 |
| `/what-is-gelatin-bloom-strength/` | 822 | 774 | 48 | 0 |
| `/3-gelatin-sheets-to-powder/` | 867 | 778 | 89 | 0 |
| `/6-gelatin-sheets-to-powder/` | 869 | 780 | 89 | 0 |
| `/4-gelatin-sheets-to-powder/` | 872 | 783 | 89 | 0 |
| `/2-gelatin-sheets-to-powder/` | 887 | 798 | 89 | 0 |
| `/5-gelatin-sheets-to-powder/` | 899 | 810 | 89 | 0 |
| `/gelatin-powder-to-sheets/` | 933 | 802 | 131 | 0 |
| `/1-gelatin-sheet-to-powder/` | 944 | 855 | 89 | 0 |
| `/gelatin-grams-sheets-to-powder/` | 1023 | 884 | 139 | 0 |

**Site total:** 12,989 body words across 18 pages (mean 721).

Notes on the numbers:

- The two calculator pages (`/` and `/sheets-to-powder/`) render their React components server-side (`<astro-island>` present, not `client:only`), so their UI text is in the served HTML and visible to a crawler that does not execute JavaScript. Neither page is "a form with no content": `/` is 739 prose words around 41 words of UI, and `/sheets-to-powder/` is 610 prose words around 77 words of UI.
- **No page on the site is a bare calculator.** The thinnest pages are the trust and hub pages, not the tool pages.

## 3. Similarity analysis of the quantity pages

**Method:** `difflib.SequenceMatcher(...).ratio()` computed over the lowercase word-token sequence of each page's body text (punctuation and numbers stripped, `autojunk=False`). This is order-sensitive, so it measures shared *passages*, not merely shared vocabulary. 1.000 = identical, 0.000 = nothing in common.

### 3.1 Pairwise similarity matrix - the six sheet-count pages

| | **1** | **2** | **3** | **4** | **5** | **6** |
|---|---:|---:|---:|---:|---:|---:|
| **1** | - | 0.386 | 0.416 | 0.410 | 0.415 | 0.394 |
| **2** | 0.405 | - | 0.390 | 0.407 | 0.399 | 0.384 |
| **3** | 0.418 | 0.406 | - | 0.419 | 0.416 | 0.404 |
| **4** | 0.387 | 0.401 | 0.406 | - | 0.403 | 0.378 |
| **5** | 0.411 | 0.410 | 0.399 | 0.384 | - | 0.384 |
| **6** | 0.393 | 0.383 | 0.396 | 0.413 | 0.391 | - |

- **Highest:** 0.419 - `/3-gelatin-sheets-to-powder/` vs `/4-gelatin-sheets-to-powder/`
- **Lowest:** 0.378 - `/4-gelatin-sheets-to-powder/` vs `/6-gelatin-sheets-to-powder/`
- **Mean across all 15 pairs:** 0.400
- **Spread:** 0.041 - the pages are uniformly distinct from one another; there is no cluster of near-identical siblings.

For calibration: templated doorway pages that differ only in a substituted number typically score above 0.90 on this measure. These score 0.40. **[MEASURED FACT]** The six pages are not spun duplicates.

### 3.2 Blocks identical across all six pages

13 sentence-level blocks appear verbatim on all six pages. Every one of them is boilerplate from the shared template - table captions, cross-link labels, and related-reference card text. **None is explanatory body copy.**

- Gold-grade sheets (200 bloom, 2g each) converted to Knox / US powder at 225 bloom.
- Other grades are in the table below.
- Sheet weight and bloom strength both change with grade.
- Bloom values and their confidence levels are listed in the site's bloom strength reference .
- Grams of sheet gelatin to powder .
- Going the other direction?
- Powder to sheets .
- Any other quantity The calculator takes half-sheet steps, all five grades, and three powder bloom values, and returns the figure in grams, packets and teaspoons.
- Related references What Is Gelatin Bloom Strength?
- The measurement behind every number on this page.
- Gelatin Sheets vs Powder Handling, clarity, and blooming differences between the two formats.
- How Much Gelatin Per Cup of Liquid?
- Ratios by texture, once you know the weight you are working with.

Word cost of this shared boilerplate: roughly 130 of ~870 body words per page (~14%).

### 3.3 Unique-content ratio

A sentence counts as unique if it appears on exactly one of the six pages.

| Page | Body words | Words in unique sentences | Unique ratio |
|---|---:|---:|---:|
| `/1-gelatin-sheet-to-powder/` | 927 | 797 | **0.860** |
| `/2-gelatin-sheets-to-powder/` | 867 | 737 | **0.850** |
| `/3-gelatin-sheets-to-powder/` | 844 | 714 | **0.846** |
| `/4-gelatin-sheets-to-powder/` | 859 | 729 | **0.849** |
| `/5-gelatin-sheets-to-powder/` | 869 | 739 | **0.850** |
| `/6-gelatin-sheets-to-powder/` | 845 | 715 | **0.846** |

**Aggregate: 0.850** - roughly 85% of every sheet-count page is text that appears nowhere else in the set. **[MEASURED FACT]**

A second, stricter cut - distinct *words* (not sentences) occurring on one of the six pages and on none of the other five - gives 57-80 distinct terms per page, confirming the pages discuss genuinely different material. Examples: `/1-` has *jeweller, resolution, stabiliser, tropical*; `/3-` has *envelope, bavarois, rubbery, fridge*; `/6-` has *doubling, tripling, geometry, unmould*.

### 3.4 Sentences unique to a single page

Listed in full below, per the brief.

#### `/1-gelatin-sheet-to-powder/` - 39 unique sentences

- 1 Gelatin Sheet to Powder 1 gelatin sheet = 1.8 grams of powdered gelatin.
- A single sheet is the quantity most often written into small recipes — a two-serving panna cotta, a thin fruit glaze, the stabiliser in a cup of whipped cream.
- It is also the quantity where the grade of the sheet matters most in proportional terms, because there is no second or third sheet to average the difference out.
- One gold sheet carries 2.0g of gelatin at 200 bloom.
- One titanium sheet carries 5.0g at 115 bloom.
- Those are the same sheet count and roughly 2.5× the mass.
- 1 sheet in powder, by sheet grade Powder quantities in grams.
- Sheet grade Bloom 1 sheet weigh Knox / US powder 225 bloom Generic US grocery powder 215 bloom European pastry powder 200 bloom Titanium 115 5.0g 2.6g 2.7g 2.9g Bronze 135 3.3g 2.0g 2.1g 2.2g Silver 160 2.5g 1.8g 1.9g 2.0g Gold 200 2.0g 1.8g 1.9g 2.0g Platinum 240 1.7g 1.8g 1.9g 2.0g Sheet weights are common European standard weights and vary by manufacturer.
- Why the grades give different numbers Sheet gelatin is manufactured to a use-case rather than to a weight.
- Each sheet, whatever its grade, is cut so that one sheet sets about the same volume of liquid as one sheet of any other grade.
- Bloom strength measures gelling power per gram, so a sheet made from a high-bloom stock needs less material to reach that target and a sheet made from low-bloom stock needs more.
- The weight per sheet therefore moves in the opposite direction to the bloom number: platinum sheets are the lightest on the scale and titanium the heaviest.
- Powder is not made to that convention.
- It is sold by weight at a single bloom value, so converting a sheet count into a powder weight means recovering the mass the sheet actually held and then rescaling it for the powder's gelling power.
- Measuring the powder equivalent At one sheet, the powder equivalent lands below the resolution of most kitchen scales.
- A scale that reads in whole grams will round a sub-two-gram figure by a quarter of its own value, which is enough to move a set from yielding to firm.
- A 0.1g jeweller's scale removes the problem; a measuring spoon is the practical alternative, since level teaspoons of powder run about 2.8g each.
- The blooming step also differs by format.
- Sheets are softened in a bowl of cold water, lifted out, and squeezed — the water that clings to them is discarded and does not enter the recipe.
- Powder is sprinkled over a measured cold liquid and left to hydrate, and that liquid stays in the recipe.
- If you are substituting powder for a single sheet, take the bloom liquid out of the recipe's own cold ingredients rather than adding it on top.
- One practical note about rounding at this scale.
- Recipes that call for one sheet are usually not tuned to a tenth of a gram, and the honest reading of a single-sheet conversion is a range rather than a point.
- If the figure in the table sits between two teaspoon marks, err toward the smaller measure: an under-set dessert can be re-melted and corrected, an over-set one cannot.
- Other sheet counts Sheets (gold) Powder (225 bloom) Level teaspoons 1 1.8g 0.6 this page 2 3.6g 1.3 2 sheets 3 5.3g 1.9 3 sheets 4 7.1g 2.5 4 sheets 5 8.9g 3.2 5 sheets 6 10.7g 3.8 6 sheets Working from a weight instead of a count?
- Open the sheets-to-powder calculator Frequently asked questions My recipe says one leaf of gelatin — is that the same as one sheet?
- Yes.
- Leaf and sheet are the same product under two names, and recipes use the terms interchangeably.
- What the wording does not tell you is the grade, which is the variable that actually changes the answer — across the grades in the table above, one sheet ranges from 1.7g to 5.0g of gelatin.
- If the recipe is from a professional pastry source it is most often gold.
- Can I use a scale that only reads whole grams?
- It will get you close but not precisely.
- At one sheet the powder equivalent is roughly 1.8g, and a whole-gram scale can only offer you the integers on either side of that.
- For a single serving of something forgiving that is usually fine.
- For a mirror glaze or a mousse that has to hold an edge, measure by teaspoon or use a 0.1g scale instead.
- Does one sheet always set the same amount of liquid?
- Approximately, and that is the whole point of the grading system — sheets are cut so a count translates across grades.
- At the medium-set ratio the site uses elsewhere, the powder equivalent of one gold sheet sets on the order of 0.3 cup of liquid.
- Acidity, alcohol, sugar and fresh tropical fruit all pull against that, so treat it as a starting figure.

#### `/2-gelatin-sheets-to-powder/` - 35 unique sentences

- 2 Gelatin Sheets to Powder 2 gelatin sheets = 3.6 grams of powdered gelatin.
- Two sheets is the working quantity for a small mousse, a single loaf-tin terrine, or a batch of panna cotta for four.
- It is also the point where a substitution error stops being invisible.
- A recipe built on two platinum sheets and made instead with two titanium sheets receives 10.0g of gelatin where it expected 3.4g — the count is identical and the mass is not.
- 2 sheets in powder, by sheet grade Powder quantities in grams.
- Sheet grade Bloom 2 sheets weigh Knox / US powder 225 bloom Generic US grocery powder 215 bloom European pastry powder 200 bloom Titanium 115 10.0g 5.1g 5.3g 5.8g Bronze 135 6.6g 4.0g 4.1g 4.5g Silver 160 5.0g 3.6g 3.7g 4.0g Gold 200 4.0g 3.6g 3.7g 4.0g Platinum 240 3.4g 3.6g 3.8g 4.1g Sheet weights are common European standard weights and vary by manufacturer.
- Why the grades give different numbers The grade names describe bloom strength, not size, but they end up describing size as a consequence.
- Manufacturers cut each grade so a single sheet does a consistent job: set roughly the same volume of liquid, whichever box you opened.
- Because bloom is a measure of gelling power per gram, a stronger stock reaches that job with less material.
- Platinum sheets are accordingly light, gold slightly heavier, silver heavier again, and titanium the heaviest of the common grades.
- When you convert two sheets into powder, both halves of that relationship have to be undone — first the mass those two sheets actually contained, then an adjustment for the fact that your powder gels at a different strength per gram than the sheets did.
- Measuring the powder equivalent Two sheets converts to a powder quantity that most digital kitchen scales can read, though not always well at the bottom of their range.
- Many scales are least accurate in their first five grams, so if yours has a tare-and-add habit of jumping, add the powder to an already-loaded bowl rather than to an empty one.
- By volume, level teaspoons of powder run about 2.8g.
- Blooming differs between the two formats and the difference matters more as the quantity grows.
- Squeezed sheets bring almost no water into the recipe.
- Powder must be hydrated in a cold liquid first, and that liquid becomes part of the finished volume — use roughly four to five times the powder's weight in cold liquid, taken from the recipe rather than added to it, and give it five minutes before heating.
- A second consideration at this quantity is whether to split grades.
- It is tempting to make up two sheets from one of each grade you happen to have in the drawer.
- That works arithmetically if you convert by weight, which is what the table above does, but it does not work by count — one platinum plus one titanium is not the same as two of either.
- Convert each grade separately, add the powder figures, and measure the total.
- Other sheet counts Sheets (gold) Powder (225 bloom) Level teaspoons 1 1.8g 0.6 1 sheet 2 3.6g 1.3 this page 3 5.3g 1.9 3 sheets 4 7.1g 2.5 4 sheets 5 8.9g 3.2 5 sheets 6 10.7g 3.8 6 sheets Working from a weight instead of a count?
- Open the sheets-to-powder calculator Frequently asked questions Can I use one sheet of a stronger grade instead of two of a weaker one?
- No — not on a count basis.
- Two titanium sheets hold 10.0g of gelatin at 115 bloom, while a single platinum sheet holds 1.7g at 240 bloom.
- The grading convention makes one sheet interchangeable with one sheet, not one with two.
- If you are short on sheets, convert to powder using the table and measure the difference by weight.
- Do I bloom the powder in extra water, or in the recipe's liquid?
- In the recipe's liquid, subtracted rather than added.
- Sheets are squeezed dry before they go in, so a sheet-based recipe has no allowance for bloom water.
- For the 3.6g of powder that two gold sheets convert to, plan on a few tablespoons of cold liquid and take it from the milk, cream, juice or water the recipe already lists.
- What if my sheets are torn or I only have a half sheet?
- Weigh them.
- Torn sheets are still gelatin, and the conversion in the table is driven by mass and bloom rather than by intact rectangles.
- The site's main converter accepts half-sheet steps if you would rather work in counts, but a scale is more reliable than counting fragments.

#### `/3-gelatin-sheets-to-powder/` - 37 unique sentences

- 3 Gelatin Sheets to Powder 3 gelatin sheets = 5.3 grams of powdered gelatin.
- Three sheets is the quantity that sits closest to the packet most American kitchens buy.
- A Knox envelope holds 7g of powder; three gold sheets convert to 5.3g of that same powder.
- That near-match is why so many recipes are written as though the two are interchangeable, and why the substitution usually works well enough that nobody investigates the gap.
- 3 sheets in powder, by sheet grade Powder quantities in grams.
- Sheet grade Bloom 3 sheets weigh Knox / US powder 225 bloom Generic US grocery powder 215 bloom European pastry powder 200 bloom Titanium 115 15.0g 7.7g 8.0g 8.6g Bronze 135 9.9g 5.9g 6.2g 6.7g Silver 160 7.5g 5.3g 5.6g 6.0g Gold 200 6.0g 5.3g 5.6g 6.0g Platinum 240 5.1g 5.4g 5.7g 6.1g Sheet weights are common European standard weights and vary by manufacturer.
- Why the grades give different numbers What makes the grades diverge is the job a sheet is built to do.
- A sheet is portioned so that one of them sets a predictable volume of liquid, which means the manufacturer is targeting gelling power per sheet rather than grams per sheet.
- Bloom strength is gelling power per gram.
- Hold the first constant and the second dictates the weight: high-bloom platinum sheets are cut small, low-bloom titanium sheets are cut large, and gold and silver fall between.
- Powder does not follow that convention at all — it is sold by mass at whatever bloom the manufacturer produces.
- Converting three sheets to powder therefore means asking what mass those three sheets carried, and then what mass of your powder gels equivalently.
- Measuring the powder equivalent Three sheets converts to a powder weight comfortably inside the accurate range of a 1g kitchen scale, which makes this the first count where weighing is straightforward rather than fiddly.
- By volume the figure works out near 1.9 level teaspoons, since a level teaspoon of powder is about 2.8g.
- Spoon measurement of gelatin is more variable than it looks: the granules pack differently depending on whether the powder was scooped or spooned into the measure, and a heaped teaspoon can carry half again as much as a level one.
- The blooming step differs by format.
- Sheets soak in a bowl of cold water and are wrung out before use, contributing no liquid.
- Powder is showered over a cold liquid drawn from the recipe, left to swell into a solid gel, and then melted into the warm base.
- Because three sheets sits so close to a full packet, this is the quantity where people are most likely to skip the conversion entirely and tip in the envelope.
- Whether that is acceptable depends on the recipe's tolerance rather than on the size of the discrepancy.
- A jelly or a set cream absorbs a small excess without complaint.
- A bavarois or an aerated mousse that has to stay tender at fridge temperature will read the difference as a rubbery edge.
- Other sheet counts Sheets (gold) Powder (225 bloom) Level teaspoons 1 1.8g 0.6 1 sheet 2 3.6g 1.3 2 sheets 3 5.3g 1.9 this page 4 7.1g 2.5 4 sheets 5 8.9g 3.2 5 sheets 6 10.7g 3.8 6 sheets Working from a weight instead of a count?
- Open the sheets-to-powder calculator Frequently asked questions Is three sheets the same as one packet of Knox?
- Close, but not identical.
- One packet is 7g at 225 bloom.
- Three gold sheets convert to 5.3g of that powder, so the packet runs slightly ahead.
- Three silver sheets convert to 5.3g, which runs ahead of the packet in the other direction.
- Which way the error falls depends entirely on the grade you started from.
- My recipe is European and lists grams, not sheets.
- Which figure do I use?
- If the recipe lists grams of gelatin without naming a format, it is most often referring to sheet gelatin at a stated or implied grade — gold in most professional pastry writing.
- Use the gram-based conversion on the grams page rather than this count-based one, since it starts from the weight the recipe gives you.
- Does the water the sheets soaked in count toward the recipe?
- No.
- Sheets are lifted from their soaking bowl and squeezed, and the residual water is negligible against 6.0g of gelatin.
- Powder is the opposite case — its bloom liquid stays in the finished dish, so subtract it from the recipe's cold ingredients when you substitute.

#### `/4-gelatin-sheets-to-powder/` - 39 unique sentences

- 4 Gelatin Sheets to Powder 4 gelatin sheets = 7.1 grams of powdered gelatin.
- Four sheets is a full-recipe quantity: a charlotte, a family-sized mousse, a tray of pâte de fruit, a bavarois built on a litre of base.
- At this size the difference between grades has become a difference you can weigh.
- Four gold sheets hold 8.0g of gelatin.
- Four bronze sheets hold 13.2g.
- Both are four sheets.
- 4 sheets in powder, by sheet grade Powder quantities in grams.
- Sheet grade Bloom 4 sheets weigh Knox / US powder 225 bloom Generic US grocery powder 215 bloom European pastry powder 200 bloom Titanium 115 20.0g 10.2g 10.7g 11.5g Bronze 135 13.2g 7.9g 8.3g 8.9g Silver 160 10.0g 7.1g 7.4g 8.0g Gold 200 8.0g 7.1g 7.4g 8.0g Platinum 240 6.8g 7.3g 7.6g 8.2g Sheet weights are common European standard weights and vary by manufacturer.
- Why the grades give different numbers The grades exist so that a recipe can specify a sheet count and remain portable between kitchens.
- To make that work, each grade is cut to a weight that delivers roughly the same gelling contribution per sheet — which means the sheet weight has to compensate for the bloom strength.
- Platinum stock gels hardest per gram, so platinum sheets are cut lightest.
- Titanium gels softest per gram, so titanium sheets are cut heaviest.
- Silver, gold and bronze occupy the middle in the order their bloom values suggest.
- Powder carries no such convention; a gram of Knox is a gram of Knox.
- A sheet-to-powder conversion is therefore two operations at once: recover the mass, then rescale it for the powder's own bloom value.
- Measuring the powder equivalent A four-sheet conversion produces a powder quantity in the range where scale and spoon start to disagree noticeably.
- Weighed, the figure in the table is exact.
- Spooned, it is roughly 2.5 level teaspoons, and each of those teaspoons carries its own packing error — the same spoon can hold noticeably different amounts depending on whether the powder was scooped from the tub or spooned into the measure and levelled.
- Blooming also scales.
- Four sheets' worth of powder wants something on the order of a quarter cup of cold liquid to hydrate properly, which is enough volume that it must come out of the recipe rather than be added to it.
- Sheets, by contrast, are squeezed and add nothing.
- Give the powder a full five minutes to swell before it meets heat; under-hydrated granules melt into strings rather than dissolving.
- One thing worth checking before you convert is whether the recipe's four sheets were ever weighed by its author.
- Recipes that travel — reprinted in a magazine, translated, adapted for a blog — often keep the sheet count and lose the grade.
- If the source is a professional pastry text the safe assumption is gold; if it is a home-cooking source from the UK or Australia, silver is at least as likely.
- The table above shows both figures so the assumption stays visible rather than buried in the arithmetic.
- Other sheet counts Sheets (gold) Powder (225 bloom) Level teaspoons 1 1.8g 0.6 1 sheet 2 3.6g 1.3 2 sheets 3 5.3g 1.9 3 sheets 4 7.1g 2.5 this page 5 8.9g 3.2 5 sheets 6 10.7g 3.8 6 sheets Working from a weight instead of a count?
- Open the sheets-to-powder calculator Frequently asked questions The recipe doesn't say which grade.
- What should I assume?
- Gold is the most common grade in professional pastry writing and is the default the site's calculator uses.
- It is an assumption, not a certainty — across the grades in the table above, four sheets ranges from 7.3g to 10.2g of powder.
- If the recipe's origin points elsewhere, the table lets you swap the assumption without redoing the arithmetic.
- Can I substitute powder for sheets in a mirror glaze?
- Yes, and the weight conversion holds, but the clarity may not.
- Sheet gelatin is generally the cleaner-dissolving of the two formats, and a glaze shows every undissolved granule.
- If you are using the 7.1g of powder that four gold sheets convert to, bloom it fully, melt it gently, and strain the finished glaze before you pour.
- How much liquid will four sheets set?
- At the medium-set ratio used on the site's per-cup reference , the powder equivalent of four gold sheets covers roughly 1.0 cups of a water-based liquid.
- Dairy, sugar, acid and alcohol all shift that figure, so it is a starting point for a test batch rather than a specification.

#### `/5-gelatin-sheets-to-powder/` - 36 unique sentences

- 5 Gelatin Sheets to Powder 5 gelatin sheets = 8.9 grams of powdered gelatin.
- Five sheets appears in recipes sized for a full mould or a party tray — a large charlotte, a set cheesecake that has to survive being cut, a batch of marshmallow.
- Five is also the count where the phrase "5 grams of gelatin" starts colliding with "5 sheets of gelatin" in search results, and the two are not remotely the same quantity.
- Five gold sheets hold 10.0g of gelatin, not five.
- 5 sheets in powder, by sheet grade Powder quantities in grams.
- Sheet grade Bloom 5 sheets weigh Knox / US powder 225 bloom Generic US grocery powder 215 bloom European pastry powder 200 bloom Titanium 115 25.0g 12.8g 13.4g 14.4g Bronze 135 16.5g 9.9g 10.4g 11.1g Silver 160 12.5g 8.9g 9.3g 10.0g Gold 200 10.0g 8.9g 9.3g 10.0g Platinum 240 8.5g 9.1g 9.5g 10.2g Sheet weights are common European standard weights and vary by manufacturer.
- Why the grades give different numbers Sheets are cut to a job rather than to a weight, and that single fact accounts for the whole table.
- The job is: one sheet should set about the same amount of liquid regardless of which grade you bought.
- Bloom strength is a measure of how much gelling power a gram of that gelatin delivers, so a high-bloom stock hits the target with less material and a low-bloom stock needs more.
- Sheet weight consequently runs inverse to bloom — platinum lightest, titanium heaviest, with silver and gold between.
- Powdered gelatin sidesteps the convention entirely by being sold as loose granules at a published or inferred bloom value.
- Converting five sheets means recovering the mass those particular sheets held, then adjusting that mass for the difference in gelling power between the sheet stock and your powder.
- Measuring the powder equivalent At five sheets, weighing is the only method that stays honest.
- The powder equivalent works out around 3.2 level teaspoons, and spoon error compounds across that many measures — five slightly heaped teaspoons can overshoot a weighed portion by a meaningful margin.
- If you only have a spoon, level each one with a straight edge rather than the side of the tub.
- The blooming step is also where a quantity this size behaves differently from the sheet version.
- Sheets go into a large bowl of cold water, soften in five minutes, and are squeezed.
- Powder at this weight needs a genuine volume of cold liquid — roughly a third of a cup — and it needs that liquid to be cold at the moment of contact, or the outer granules gel and seal the dry ones inside.
- The other thing that changes at five sheets is how much a rounding decision costs.
- A tenth of a gram on a one-sheet conversion is noise.
- Five times the quantity means five times the absolute error from the same proportional mistake, and a set that is meaningfully firmer than intended.
- If the recipe matters, weigh to a tenth of a gram, and use the grade row that matches what is actually in your drawer rather than the one you assume the author used.
- Other sheet counts Sheets (gold) Powder (225 bloom) Level teaspoons 1 1.8g 0.6 1 sheet 2 3.6g 1.3 2 sheets 3 5.3g 1.9 3 sheets 4 7.1g 2.5 4 sheets 5 8.9g 3.2 this page 6 10.7g 3.8 6 sheets Working from a weight instead of a count?
- Open the sheets-to-powder calculator Frequently asked questions Is 5 sheets of gelatin the same as 5 grams of gelatin?
- No, and the gap is large.
- Five gold sheets hold 10.0g of gelatin — several times the mass of a 5g quantity.
- If your recipe specifies grams rather than a sheet count, use the gram-based conversion instead, which starts from the weight rather than the count.
- Can I measure this with a teaspoon instead of a scale?
- You can, with a caveat.
- The conversion works out to roughly 3.2 level teaspoons of powder, but teaspoon measurement of gelatin varies by how the granules pack.
- At five sheets the accumulated error is larger than at one or two, so if the dish has to unmould cleanly, weigh it.
- Does the conversion change if the base is hot when I add the gelatin?
- The conversion does not, but the handling does.
- The 8.9g of powder that five gold sheets convert to must be bloomed in cold liquid first and then melted into the warm base — powder added directly to a hot mixture clumps.
- Squeezed sheets can go straight into a warm base because they are already hydrated.
- Neither format should be boiled; sustained high heat degrades gelling power.

#### `/6-gelatin-sheets-to-powder/` - 36 unique sentences

- 6 Gelatin Sheets to Powder 6 gelatin sheets = 10.7 grams of powdered gelatin.
- Six sheets is batch territory — a terrine to slice, a sheet tray of jelly, a mousse scaled for a service rather than a dinner.
- Quantities this size are usually the result of multiplying a smaller recipe, which is where a second number becomes worth watching.
- Six gold sheets convert to 10.7g of powder; that is close to 1.5 standard packets, a unit that does not divide evenly and so tends to get rounded.
- 6 sheets in powder, by sheet grade Powder quantities in grams.
- Sheet grade Bloom 6 sheets weigh Knox / US powder 225 bloom Generic US grocery powder 215 bloom European pastry powder 200 bloom Titanium 115 30.0g 15.3g 16.0g 17.3g Bronze 135 19.8g 11.9g 12.4g 13.4g Silver 160 15.0g 10.7g 11.2g 12.0g Gold 200 12.0g 10.7g 11.2g 12.0g Platinum 240 10.2g 10.9g 11.4g 12.2g Sheet weights are common European standard weights and vary by manufacturer.
- Why the grades give different numbers Every grade of sheet is manufactured toward the same outcome: one sheet sets roughly one sheet's worth of liquid, whichever box it came from.
- Bloom strength measures gelling power per gram, so the only way to hold the per-sheet outcome constant across grades is to vary how many grams go into each sheet.
- Platinum, the strongest common grade, is cut lightest.
- Titanium, the softest, is cut heaviest.
- Powder is outside this system — it comes as loose granules sold by weight at one bloom value.
- That is why a sheet-count conversion cannot be a single multiplier.
- The mass has to be recovered from the count and the grade, and then rescaled against the powder's own bloom before the two are comparable.
- Measuring the powder equivalent Six sheets converts to a powder weight where a kitchen scale is unambiguously the right tool — it is well inside the accurate range of even a cheap one, and the spoon equivalent has grown to roughly 3.8 level teaspoons, which is too many to level reliably.
- Blooming at this scale needs planning rather than improvisation.
- The powder wants something approaching half a cup of cold liquid, and it needs room to swell without the granules touching each other on the way down — sprinkle it across the surface rather than dropping it in one place.
- Sheets, by comparison, need a bowl large enough that six of them do not stick to one another while they soften, and a firm squeeze before they go in.
- Scaling is the failure mode specific to this quantity.
- Gelatin scales linearly with the volume of liquid it has to set, so doubling a recipe does mean doubling the gelatin — but it does not mean doubling the setting time or the mould depth, and a deeper set takes longer to chill through and reads firmer at the centre.
- If you arrived at six sheets by tripling a two-sheet recipe, chill a small test portion at the original depth before committing the batch.
- The conversion in the table is the easy part; the geometry is not.
- Other sheet counts Sheets (gold) Powder (225 bloom) Level teaspoons 1 1.8g 0.6 1 sheet 2 3.6g 1.3 2 sheets 3 5.3g 1.9 3 sheets 4 7.1g 2.5 4 sheets 5 8.9g 3.2 5 sheets 6 10.7g 3.8 this page Working from a weight instead of a count?
- Open the sheets-to-powder calculator Frequently asked questions I'm scaling a recipe up.
- Does gelatin scale linearly?
- Against liquid volume, yes — three times the base needs about three times the gelatin.
- What does not scale is the set's behaviour in a deeper mould, which chills more slowly and can read firmer at the centre.
- The 10.7g figure for six gold sheets is the arithmetic; a test portion at the finished depth is the check.
- Six sheets is more than one packet.
- How do I handle the remainder?
- Weigh rather than count packets.
- Six gold sheets convert to 10.7g, which is about 1.5 envelopes at 7g each — a fraction that rounding will distort in either direction.
- Open the packets you need, weigh the total, and keep the remainder sealed.
- Can I make up six sheets from mixed grades?
- Yes, if you convert each grade separately and add the powder weights.
- What you cannot do is treat six mixed sheets as six of any one grade — across the table above, six sheets ranges from 10.9g to 15.3g of powder depending on grade.
- Convert per grade, then total.

### 3.5 The other two quantity pages

`/gelatin-grams-sheets-to-powder/` (1,023 words) and `/gelatin-powder-to-sheets/` (933 words) are the two longest pages on the site. Their similarity to each other is 0.168, and to `/sheets-to-powder/` is 0.088 and 0.058 respectively. They are not duplicates of anything.

## 4. Duplicate and out-of-spec metadata

| URL path | Title chars | Desc chars |
|---|---:|---:|
| `/` | 82 | 189 |
| `/1-gelatin-sheet-to-powder/` | 45 | 135 |
| `/2-gelatin-sheets-to-powder/` | 46 | 136 |
| `/3-gelatin-sheets-to-powder/` | 46 | 136 |
| `/4-gelatin-sheets-to-powder/` | 46 | 136 |
| `/5-gelatin-sheets-to-powder/` | 46 | 136 |
| `/6-gelatin-sheets-to-powder/` | 47 | 137 |
| `/about/` | 29 | 134 |
| `/articles/` | 50 | 122 |
| `/gelatin-grams-sheets-to-powder/` | 46 | 137 |
| `/gelatin-powder-to-sheets/` | 46 | 143 |
| `/gelatin-sheets-vs-powder/` | 72 | 139 |
| `/how-much-gelatin-per-cup-of-liquid/` | 77 | 149 |
| `/privacy/` | 38 | 95 |
| `/sheets-to-powder/` | 53 | 143 |
| `/terms/` | 42 | 54 |
| `/what-is-bloom-strength/` | 61 | 159 |
| `/what-is-gelatin-bloom-strength/` | 80 | 159 |

- **Duplicate `<title>`:** **none**
- **Missing `<title>`:** **none** - all 18 pages have one
- **Duplicate meta description:** **none**
- **Missing meta description:** **none** - all 18 pages have one

**Titles over 60 characters (5):**

| URL path | Chars | Title |
|---|---:|---|
| `/` | 82 | Gelatin Bloom Calculator — Knox, Gold Sheet, Silver & More | gelatincalculator.com |
| `/gelatin-sheets-vs-powder/` | 72 | Gelatin Sheets vs Powder: What's the Difference? | gelatincalculator.com |
| `/how-much-gelatin-per-cup-of-liquid/` | 77 | How Much Gelatin Per Cup of Liquid? (Reference Table) | gelatincalculator.com |
| `/what-is-bloom-strength/` | 61 | What Is Gelatin Bloom Strength? (Simple Guide for Home Cooks) |
| `/what-is-gelatin-bloom-strength/` | 80 | What Is Gelatin Bloom Strength? Explained for Home Cooks | gelatincalculator.com |

All five overflow because of the appended `| gelatincalculator.com` suffix or a parenthetical. This is a SERP-truncation cosmetic issue, not a content-quality signal. **[INFERENCE]** Unlikely to bear on the AdSense decision.

**Descriptions over 160 characters (1):**

- `/` - 189 chars: "Convert gelatin amounts between bloom strengths. Covers Knox (~225), gold (~200), silver (~160), platinum (~240), and more. Free diagnostic tool for home bakers working from pastry recipes."

### 4.1 Duplicate H1 / topic collision - the one real metadata finding

Two pages carry the **identical `<h1>`: "What Is Gelatin Bloom Strength?"**

| URL path | Title | Body words | Inbound body links |
|---|---|---:|---:|
| `/what-is-bloom-strength/` | What Is Gelatin Bloom Strength? (Simple Guide for Home Cooks) | 766 | 4 |
| `/what-is-gelatin-bloom-strength/` | What Is Gelatin Bloom Strength? Explained for Home Cooks | gelatincalculator.com | 822 | 14 |

Their body-text similarity is only **0.189** (difflib) - so they are *not* duplicated prose - but their shared vocabulary is **0.441** (Jaccard over distinct terms) and they answer the same question under the same heading. `/what-is-bloom-strength/` has the weakest internal linking on the site (4 inbound body links vs. 14 for its twin). **[INFERENCE]** This reads as a superseded page that was never retired or redirected; it is the clearest "why does this exist" page on the site.

## 5. Single-source-of-truth verification

`src/lib/gelatin-conversion.js` exists and reads every bloom value and per-sheet weight from `src/data/gelatin-bloom.json`. It hardcodes no gelatin value. Current data (`last_verified: 2026-04-22`):

| Sheet grade | Bloom | g/sheet | Confidence |
|---|---:|---:|---|
| titanium | 115 | 5.0 | standard |
| bronze | 135 | 3.3 | standard |
| silver | 160 | 2.5 | standard |
| gold | 200 | 2.0 | standard |
| platinum | 240 | 1.7 | standard |

| Powder | Bloom | Confidence |
|---|---:|---|
| knox | 225 | verified |
| us-grocery-generic | 215 | typical |
| european-powder | 200 | typical |
| unknown | 215 | low |

**Importers of the module (4):** `src/components/SheetsToPowderConverter.jsx`, `src/pages/[slug].astro`, `src/pages/gelatin-grams-sheets-to-powder/index.astro`, `src/pages/gelatin-powder-to-sheets/index.astro`.

### 5.1 Verdict: GEL002 held for the pages it covered, and only those

A numeric-literal scan was run across all page templates and components. Tailwind colour utilities (`stone-200`, `amber-200`, and so on) and the `th`/`td` class constants were stripped first, or the scan is pure noise. Results:

| File | Hardcoded conversion literals | Status |
|---|---:|---|
| `src/data/quantity-page-content.js` | 0 | **Clean** - all 8 GEL002 pages' prose interpolates `v.*` values from the module. Zero literals. |
| `src/pages/[slug].astro` | 0 | **Clean** - every number derived via `sheetsToPowderGrams()` / `sheetMass()` / `fmt1()`. |
| `src/pages/gelatin-grams-sheets-to-powder/index.astro` | 1 | Clean - the only literal is `GRAM_ROWS` (L22), a row-label list, not a conversion output. |
| `src/pages/gelatin-powder-to-sheets/index.astro` | 0 | **Clean**. |
| `src/pages/gelatin-sheets-vs-powder/index.astro` | 21 | **Hardcoded** - pre-GEL002 page. |
| `src/pages/what-is-bloom-strength/index.astro` | 31 | **Hardcoded** - pre-GEL002 page. |
| `src/pages/what-is-gelatin-bloom-strength/index.astro` | 21 | **Hardcoded** - pre-GEL002 page. |
| `src/pages/sheets-to-powder/index.astro` | 20 | **Hardcoded** - pre-GEL002 page. |
| `src/pages/index.astro` | 6 | **Hardcoded** - bloom values in prose and meta description. |
| `src/pages/how-much-gelatin-per-cup-of-liquid/index.astro` | 7 | **Hardcoded** - bloom ranges in prose and table headers. |
| `src/components/Converter.jsx` | 7 | **Hardcoded** - preset list 160/200/225/240 defined inline, independent of the JSON. |
| `src/components/TwoLegos.astro` | 2 | **Hardcoded** - hero stat cards show `~225` and `~200` as literals. |
| `src/components/Diagnostic.jsx` | 1 | **Hardcoded** - "gold (200 bloom)" in prose. |
| `src/components/SheetsToPowderConverter.jsx` | 0 | **Clean** - imports the module; the one literal is an input placeholder. |

**Highest-risk instances - a computed conversion *result* written as a literal:**

| File | Line | Literal | Text |
|---|---:|---|---|
| `src/pages/sheets-to-powder/index.astro` | 112 | `5.3g` | `6 x (200 / 225) = 5.3g Knox` |
| `src/pages/sheets-to-powder/index.astro` | 122 | `3.9` | `7 x (225 / 160) / 2.5 = ~3.9 silver sheets` |
| `src/pages/sheets-to-powder/index.astro` | 132 | `8.9g` | `10 x (200 / 225) = 8.9g Knox` |
| `src/pages/gelatin-sheets-vs-powder/index.astro` | 201 | `5.3g` | `6 x (200 / 225) = 5.3g of Knox` |
| `src/pages/what-is-gelatin-bloom-strength/index.astro` | 174-175 | `5.3g`, `7.5g` | worked examples |
| `src/pages/gelatin-sheets-vs-powder/index.astro` | 86 | `1.7 g` | stat card |

These currently agree with the JSON, so **nothing on the site is factually wrong today**. The exposure is that a correction to `gelatin-bloom.json` at the next 6-month re-verification would silently update the eight GEL002 pages and leave these six older pages stating the old figures - the site would then contradict itself. `src/components/Converter.jsx` is the sharpest case: its bloom preset list is a second, independent copy of data the JSON already holds.

**Recommendation (not implemented):** migrate the six pre-GEL002 pages and `Converter.jsx` / `TwoLegos.astro` onto `gelatin-conversion.js`. This is a correctness and maintenance fix, not an AdSense fix.

## 6. Trust and policy pages

| Page | URL | Present | Body words |
|---|---|---|---:|
| Privacy Policy | `/privacy/` | Yes | 324 |
| Terms | `/terms/` | Yes | 249 |
| About | `/about/` | Yes | 313 |
| **Contact** | - | **No dedicated page** | - |

There is **no `/contact/` route**. Contact information exists only as an inline `mailto:` inside the Privacy page's closing paragraph and on the About page. **[INFERENCE]** AdSense reviewers commonly look for a discoverable contact route; an email buried at the foot of the privacy policy is weaker than a linked Contact page. This is a gap worth closing.

### 6.1 Advertising and cookie disclosure - present

The Privacy Policy **does** disclose third-party advertising and cookie use. Verbatim:

> **Advertising**
>
> This site is being reviewed by Google AdSense. The AdSense JavaScript snippet (`pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`) is loaded on every page so Google can review the site for approval. Once approved, ads will be served automatically by Google's Auto Ads system.
>
> When ads are served, Google may use cookies and similar technologies to: Serve ads based on a user's prior visits to this site or other sites; Personalize advertising based on browsing behavior; Measure ad performance and prevent fraud.
>
> You can opt out of personalized advertising by visiting Google's Ads Settings. You can learn more about how Google uses data when you use partner sites or apps at `policies.google.com/technologies/partner-sites`.
>
> We do not control which specific ads are shown and we do not have access to individual user browsing data through AdSense.

This satisfies the standard AdSense disclosure requirement. **[MEASURED FACT]** The disclosure is not missing.

**However - an internal contradiction.** Earlier in the same document, under "What we collect":

> We do not use localStorage, sessionStorage, cookies, or any form of client-side tracking.

The Advertising section then states that Google may set cookies. As written, the policy asserts both that the site sets no cookies and that its advertising partner does. **[INFERENCE]** A reviewer reading the policy top-to-bottom encounters a flat contradiction on the one subject AdSense cares most about. **Recommendation (not implemented):** scope the first sentence to first-party cookies - for example "we set no cookies of our own" - so the two sections stop conflicting.

### 6.2 `mailto:` obfuscation - correct

| Page | mailto present | Wrapped in `<!--email_off-->` |
|---|---|---|
| `/about/` | `mailto:contact@gelatincalculator.com` | **Yes** |
| `/privacy/` | `mailto:contact@gelatincalculator.com` | **Yes** |

Both occurrences of `contact@gelatincalculator.com` are wrapped in `<!--email_off-->` ... `<!--/email_off-->`, which suppresses Cloudflare's email obfuscation. The addresses arrive at a reviewer as plain, clickable `mailto:` links. **[MEASURED FACT]** This is correct and needs no change.

## 7. Internal linking and orphans

Two inbound counts are reported. *All* counts every internal link including the header nav and footer (which appear on all 18 pages). *Body-only* counts links inside `<main>` - editorial links, the ones that signal a page belongs to the site's structure.

| URL path | Inbound (all) | Inbound (body only) | Outbound |
|---|---:|---:|---:|
| `/about/` | 17 | 0 | 4 |
| `/privacy/` | 17 | 0 | 4 |
| `/terms/` | 17 | 0 | 4 |
| `/articles/` | 17 | 1 | 9 |
| `/what-is-bloom-strength/` | 4 | 4 | 9 |
| `/` | 17 | 5 | 17 |
| `/1-gelatin-sheet-to-powder/` | 10 | 10 | 16 |
| `/2-gelatin-sheets-to-powder/` | 10 | 10 | 16 |
| `/3-gelatin-sheets-to-powder/` | 10 | 10 | 16 |
| `/4-gelatin-sheets-to-powder/` | 10 | 10 | 16 |
| `/5-gelatin-sheets-to-powder/` | 10 | 10 | 16 |
| `/6-gelatin-sheets-to-powder/` | 10 | 10 | 16 |
| `/gelatin-grams-sheets-to-powder/` | 10 | 10 | 16 |
| `/gelatin-powder-to-sheets/` | 10 | 10 | 16 |
| `/sheets-to-powder/` | 13 | 13 | 17 |
| `/gelatin-sheets-vs-powder/` | 14 | 14 | 17 |
| `/how-much-gelatin-per-cup-of-liquid/` | 14 | 14 | 7 |
| `/what-is-gelatin-bloom-strength/` | 14 | 14 | 8 |

- **Orphans (zero inbound links of any kind): none.** Every page is reachable from every other page via the header nav or footer. **[MEASURED FACT]**
- **Pages reachable only from the sitemap: none.**
- **Pages with zero editorial (in-body) inbound links: `/about/`, `/privacy/`, `/terms/`.** These are linked from the site-wide nav and footer only, which is normal and expected for trust pages.
- **Weakest editorially linked content page: `/what-is-bloom-strength/`, 4 inbound body links** - well below the site median. This reinforces section 4.1: it is the page the rest of the site has quietly stopped pointing at.
- The eight quantity pages are densely interlinked (10 inbound, 16 outbound each) via the "Other sheet counts" table, which is a genuine navigational aid rather than a link farm - each row carries a distinct computed value.

## 8. Index directives

**`public/robots.txt`** - verbatim:

```
User-agent: *
Allow: /

Sitemap: https://gelatincalculator.com/sitemap-index.xml
```

**Per-page directives:**

- `noindex`: **none** on any of the 18 pages.
- `nofollow`: **none**.
- `<meta name="robots">`: **absent from all 18 pages**, so all default to index,follow.
- `<link rel="canonical">`: **present on all 18 pages**, each self-referential and absolute, and each matching its own sitemap entry exactly (trailing slash included). No cross-canonicals, no conflicts.

Nothing is blocking crawling or indexing. **[MEASURED FACT]**

**AdSense wiring:** the `adsbygoogle.js` snippet (`client=ca-pub-5806594895991752`) is present on **18 of 18 pages**, and `public/ads.txt` contains a matching single line (`google.com, pub-5806594895991752, DIRECT, f08c47fec0942fa0`). The mechanical setup is correct.

## 9. Summary of findings

### What the evidence does *not* support

Three hypotheses for the rejection were tested and are contradicted by measurement:

1. **"The 8 quantity pages are spun duplicates."** Mean pairwise similarity 0.400, max 0.419. Roughly 85% of each page is text found nowhere else in the set. Shared boilerplate is about 10% of each page and is entirely template furniture. These are the *strongest* pages on the site by word count.
2. **"Pages are thin calculators with no content."** No page is a bare tool. The two calculator pages carry 739 and 610 words of prose respectively, server-rendered.
3. **"Advertising disclosure is missing."** It is present, specific, and names Google, cookies, personalisation, and the opt-out.

### Measured issues, ranked

| # | Finding | Evidence | Severity |
|---|---|---|---|
| 1 | The four thinnest pages are trust and hub pages: `/articles/` 212, `/terms/` 249, `/about/` 313, `/privacy/` 324 words | Sec. 2 | **High** - [INFERENCE] the likeliest "low value" trigger |
| 2 | No dedicated Contact page; email only inline in About and Privacy | Sec. 6 | **High** |
| 3 | Duplicate H1 across `/what-is-bloom-strength/` and `/what-is-gelatin-bloom-strength/`; the former has the weakest inbound linking on the site | Sec. 4.1, 7 | **Medium** |
| 4 | Privacy Policy contradicts itself on cookies | Sec. 6.1 | **Medium** |
| 5 | Six pre-GEL002 pages plus `Converter.jsx` hardcode bloom values and five computed conversion results | Sec. 5 | **Medium** - maintenance risk, not an AdSense issue |
| 6 | Five titles over 60 chars, one description over 160 chars | Sec. 4 | **Low** - cosmetic |

### Interpretation

**[INFERENCE - this is judgement, not measurement.]** The eight GEL002 quantity pages are not the problem; they are the site's best work. `/articles/` at 212 words is a bare link list, and it is the single page most likely to read as "low value" to a reviewer sampling the site. Combined with a 249-word Terms page, a 313-word About, and no Contact route, the site's *non-tool* surface is where the thinness lives.

AdSense gives no page-level detail, so this cannot be confirmed. It is the hypothesis the evidence best supports, and it is cheap to act on: `/articles/` and the trust pages can be expanded without touching a single ranking page.

### Recommendations - none implemented, per the read-only constraint

1. Expand `/articles/` from a link list into an annotated index, or remove it from the nav.
2. Add a `/contact/` page and link it from the footer.
3. Resolve the `/what-is-bloom-strength/` duplicate - 301 to its twin, or differentiate it.
4. Fix the Privacy Policy cookie contradiction (section 6.1).
5. Expand `/terms/` and `/about/`.
6. Migrate pre-GEL002 pages onto `gelatin-conversion.js` before the next data re-verification.

---

*Audit performed 2026-09-02 against the `dist/` build (verified current with `src/`) at commit `b1c21c7`. No file under `src/`, `public/`, or any site source directory was created, modified, or deleted.*
