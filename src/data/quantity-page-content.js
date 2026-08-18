// Prose for the sheet-count conversion pages.
//
// Numbers are NOT stored here. Anything numeric arrives through the `v`
// context object, which is built in the page template from
// src/lib/gelatin-conversion.js. Each entry's prose is written specifically
// for its quantity — these pages are not one paragraph with a swapped numeral.

export const COUNT_PAGES = [
  {
    count: 1,
    slug: "1-gelatin-sheet-to-powder",
    noun: "sheet",
    nounPlural: "sheet",
    h1: "1 Gelatin Sheet to Powder",
    lede: (v) => `A single sheet is the quantity most often written into small recipes — a two-serving panna cotta, a thin fruit glaze, the stabiliser in a cup of whipped cream. It is also the quantity where the grade of the sheet matters most in proportional terms, because there is no second or third sheet to average the difference out. One gold sheet carries ${v.goldMass}g of gelatin at ${v.goldBloom} bloom. One titanium sheet carries ${v.titaniumMass}g at ${v.titaniumBloom} bloom. Those are the same sheet count and roughly ${v.titaniumOverGold}× the mass.`,
    gradesProse: `Sheet gelatin is manufactured to a use-case rather than to a weight. Each sheet, whatever its grade, is cut so that one sheet sets about the same volume of liquid as one sheet of any other grade. Bloom strength measures gelling power per gram, so a sheet made from a high-bloom stock needs less material to reach that target and a sheet made from low-bloom stock needs more. The weight per sheet therefore moves in the opposite direction to the bloom number: platinum sheets are the lightest on the scale and titanium the heaviest. Powder is not made to that convention. It is sold by weight at a single bloom value, so converting a sheet count into a powder weight means recovering the mass the sheet actually held and then rescaling it for the powder's gelling power.`,
    measuring: (v) => `At one sheet, the powder equivalent lands below the resolution of most kitchen scales. A scale that reads in whole grams will round a sub-two-gram figure by a quarter of its own value, which is enough to move a set from yielding to firm. A 0.1g jeweller's scale removes the problem; a measuring spoon is the practical alternative, since level teaspoons of powder run about ${v.tspG}g each. The blooming step also differs by format. Sheets are softened in a bowl of cold water, lifted out, and squeezed — the water that clings to them is discarded and does not enter the recipe. Powder is sprinkled over a measured cold liquid and left to hydrate, and that liquid stays in the recipe. If you are substituting powder for a single sheet, take the bloom liquid out of the recipe's own cold ingredients rather than adding it on top.`,
    extra: `One practical note about rounding at this scale. Recipes that call for one sheet are usually not tuned to a tenth of a gram, and the honest reading of a single-sheet conversion is a range rather than a point. If the figure in the table sits between two teaspoon marks, err toward the smaller measure: an under-set dessert can be re-melted and corrected, an over-set one cannot.`,
    faqs: (v) => [
      {
        q: "My recipe says one leaf of gelatin — is that the same as one sheet?",
        a: `Yes. Leaf and sheet are the same product under two names, and recipes use the terms interchangeably. What the wording does not tell you is the grade, which is the variable that actually changes the answer — across the grades in the table above, one sheet ranges from ${v.platinumMass}g to ${v.titaniumMass}g of gelatin. If the recipe is from a professional pastry source it is most often gold.`,
      },
      {
        q: "Can I use a scale that only reads whole grams?",
        a: `It will get you close but not precisely. At one sheet the powder equivalent is roughly ${v.gold}g, and a whole-gram scale can only offer you the integers on either side of that. For a single serving of something forgiving that is usually fine. For a mirror glaze or a mousse that has to hold an edge, measure by teaspoon or use a 0.1g scale instead.`,
      },
      {
        q: "Does one sheet always set the same amount of liquid?",
        a: `Approximately, and that is the whole point of the grading system — sheets are cut so a count translates across grades. At the medium-set ratio the site uses elsewhere, the powder equivalent of one gold sheet sets on the order of ${v.goldCups} cup of liquid. Acidity, alcohol, sugar and fresh tropical fruit all pull against that, so treat it as a starting figure.`,
      },
    ],
  },

  {
    count: 2,
    slug: "2-gelatin-sheets-to-powder",
    noun: "sheets",
    nounPlural: "sheets",
    h1: "2 Gelatin Sheets to Powder",
    lede: (v) => `Two sheets is the working quantity for a small mousse, a single loaf-tin terrine, or a batch of panna cotta for four. It is also the point where a substitution error stops being invisible. A recipe built on two platinum sheets and made instead with two titanium sheets receives ${v.titaniumMass}g of gelatin where it expected ${v.platinumMass}g — the count is identical and the mass is not.`,
    gradesProse: `The grade names describe bloom strength, not size, but they end up describing size as a consequence. Manufacturers cut each grade so a single sheet does a consistent job: set roughly the same volume of liquid, whichever box you opened. Because bloom is a measure of gelling power per gram, a stronger stock reaches that job with less material. Platinum sheets are accordingly light, gold slightly heavier, silver heavier again, and titanium the heaviest of the common grades. When you convert two sheets into powder, both halves of that relationship have to be undone — first the mass those two sheets actually contained, then an adjustment for the fact that your powder gels at a different strength per gram than the sheets did.`,
    measuring: (v) => `Two sheets converts to a powder quantity that most digital kitchen scales can read, though not always well at the bottom of their range. Many scales are least accurate in their first five grams, so if yours has a tare-and-add habit of jumping, add the powder to an already-loaded bowl rather than to an empty one. By volume, level teaspoons of powder run about ${v.tspG}g. Blooming differs between the two formats and the difference matters more as the quantity grows. Squeezed sheets bring almost no water into the recipe. Powder must be hydrated in a cold liquid first, and that liquid becomes part of the finished volume — use roughly four to five times the powder's weight in cold liquid, taken from the recipe rather than added to it, and give it five minutes before heating.`,
    extra: `A second consideration at this quantity is whether to split grades. It is tempting to make up two sheets from one of each grade you happen to have in the drawer. That works arithmetically if you convert by weight, which is what the table above does, but it does not work by count — one platinum plus one titanium is not the same as two of either. Convert each grade separately, add the powder figures, and measure the total.`,
    faqs: (v) => [
      {
        q: "Can I use one sheet of a stronger grade instead of two of a weaker one?",
        a: `No — not on a count basis. Two titanium sheets hold ${v.titaniumMass}g of gelatin at ${v.titaniumBloom} bloom, while a single platinum sheet holds ${v.oneSheet.platinum}g at ${v.platinumBloom} bloom. The grading convention makes one sheet interchangeable with one sheet, not one with two. If you are short on sheets, convert to powder using the table and measure the difference by weight.`,
      },
      {
        q: "Do I bloom the powder in extra water, or in the recipe's liquid?",
        a: `In the recipe's liquid, subtracted rather than added. Sheets are squeezed dry before they go in, so a sheet-based recipe has no allowance for bloom water. For the ${v.gold}g of powder that two gold sheets convert to, plan on a few tablespoons of cold liquid and take it from the milk, cream, juice or water the recipe already lists.`,
      },
      {
        q: "What if my sheets are torn or I only have a half sheet?",
        a: `Weigh them. Torn sheets are still gelatin, and the conversion in the table is driven by mass and bloom rather than by intact rectangles. The site's <a href="/sheets-to-powder/" class="text-amber-700 underline underline-offset-4">main converter</a> accepts half-sheet steps if you would rather work in counts, but a scale is more reliable than counting fragments.`,
      },
    ],
  },

  {
    count: 3,
    slug: "3-gelatin-sheets-to-powder",
    noun: "sheets",
    nounPlural: "sheets",
    h1: "3 Gelatin Sheets to Powder",
    lede: (v) => `Three sheets is the quantity that sits closest to the packet most American kitchens buy. A Knox envelope holds ${v.packetGrams}g of powder; three gold sheets convert to ${v.gold}g of that same powder. That near-match is why so many recipes are written as though the two are interchangeable, and why the substitution usually works well enough that nobody investigates the gap.`,
    gradesProse: `What makes the grades diverge is the job a sheet is built to do. A sheet is portioned so that one of them sets a predictable volume of liquid, which means the manufacturer is targeting gelling power per sheet rather than grams per sheet. Bloom strength is gelling power per gram. Hold the first constant and the second dictates the weight: high-bloom platinum sheets are cut small, low-bloom titanium sheets are cut large, and gold and silver fall between. Powder does not follow that convention at all — it is sold by mass at whatever bloom the manufacturer produces. Converting three sheets to powder therefore means asking what mass those three sheets carried, and then what mass of your powder gels equivalently.`,
    measuring: (v) => `Three sheets converts to a powder weight comfortably inside the accurate range of a 1g kitchen scale, which makes this the first count where weighing is straightforward rather than fiddly. By volume the figure works out near ${v.tspApprox} level teaspoons, since a level teaspoon of powder is about ${v.tspG}g. Spoon measurement of gelatin is more variable than it looks: the granules pack differently depending on whether the powder was scooped or spooned into the measure, and a heaped teaspoon can carry half again as much as a level one. The blooming step differs by format. Sheets soak in a bowl of cold water and are wrung out before use, contributing no liquid. Powder is showered over a cold liquid drawn from the recipe, left to swell into a solid gel, and then melted into the warm base.`,
    extra: `Because three sheets sits so close to a full packet, this is the quantity where people are most likely to skip the conversion entirely and tip in the envelope. Whether that is acceptable depends on the recipe's tolerance rather than on the size of the discrepancy. A jelly or a set cream absorbs a small excess without complaint. A bavarois or an aerated mousse that has to stay tender at fridge temperature will read the difference as a rubbery edge.`,
    faqs: (v) => [
      {
        q: "Is three sheets the same as one packet of Knox?",
        a: `Close, but not identical. One packet is ${v.packetGrams}g at ${v.knoxBloom} bloom. Three gold sheets convert to ${v.gold}g of that powder, so the packet runs slightly ahead. Three silver sheets convert to ${v.silver}g, which runs ahead of the packet in the other direction. Which way the error falls depends entirely on the grade you started from.`,
      },
      {
        q: "My recipe is European and lists grams, not sheets. Which figure do I use?",
        a: `If the recipe lists grams of gelatin without naming a format, it is most often referring to sheet gelatin at a stated or implied grade — gold in most professional pastry writing. Use the gram-based conversion on the <a href="/gelatin-grams-sheets-to-powder/" class="text-amber-700 underline underline-offset-4">grams page</a> rather than this count-based one, since it starts from the weight the recipe gives you.`,
      },
      {
        q: "Does the water the sheets soaked in count toward the recipe?",
        a: `No. Sheets are lifted from their soaking bowl and squeezed, and the residual water is negligible against ${v.goldMass}g of gelatin. Powder is the opposite case — its bloom liquid stays in the finished dish, so subtract it from the recipe's cold ingredients when you substitute.`,
      },
    ],
  },

  {
    count: 4,
    slug: "4-gelatin-sheets-to-powder",
    noun: "sheets",
    nounPlural: "sheets",
    h1: "4 Gelatin Sheets to Powder",
    lede: (v) => `Four sheets is a full-recipe quantity: a charlotte, a family-sized mousse, a tray of pâte de fruit, a bavarois built on a litre of base. At this size the difference between grades has become a difference you can weigh. Four gold sheets hold ${v.goldMass}g of gelatin. Four bronze sheets hold ${v.bronzeMass}g. Both are four sheets.`,
    gradesProse: `The grades exist so that a recipe can specify a sheet count and remain portable between kitchens. To make that work, each grade is cut to a weight that delivers roughly the same gelling contribution per sheet — which means the sheet weight has to compensate for the bloom strength. Platinum stock gels hardest per gram, so platinum sheets are cut lightest. Titanium gels softest per gram, so titanium sheets are cut heaviest. Silver, gold and bronze occupy the middle in the order their bloom values suggest. Powder carries no such convention; a gram of Knox is a gram of Knox. A sheet-to-powder conversion is therefore two operations at once: recover the mass, then rescale it for the powder's own bloom value.`,
    measuring: (v) => `A four-sheet conversion produces a powder quantity in the range where scale and spoon start to disagree noticeably. Weighed, the figure in the table is exact. Spooned, it is roughly ${v.tspApprox} level teaspoons, and each of those teaspoons carries its own packing error — the same spoon can hold noticeably different amounts depending on whether the powder was scooped from the tub or spooned into the measure and levelled. Blooming also scales. Four sheets' worth of powder wants something on the order of a quarter cup of cold liquid to hydrate properly, which is enough volume that it must come out of the recipe rather than be added to it. Sheets, by contrast, are squeezed and add nothing. Give the powder a full five minutes to swell before it meets heat; under-hydrated granules melt into strings rather than dissolving.`,
    extra: `One thing worth checking before you convert is whether the recipe's four sheets were ever weighed by its author. Recipes that travel — reprinted in a magazine, translated, adapted for a blog — often keep the sheet count and lose the grade. If the source is a professional pastry text the safe assumption is gold; if it is a home-cooking source from the UK or Australia, silver is at least as likely. The table above shows both figures so the assumption stays visible rather than buried in the arithmetic.`,
    faqs: (v) => [
      {
        q: "The recipe doesn't say which grade. What should I assume?",
        a: `Gold is the most common grade in professional pastry writing and is the default the site's calculator uses. It is an assumption, not a certainty — across the grades in the table above, four sheets ranges from ${v.platinum}g to ${v.titanium}g of powder. If the recipe's origin points elsewhere, the table lets you swap the assumption without redoing the arithmetic.`,
      },
      {
        q: "Can I substitute powder for sheets in a mirror glaze?",
        a: `Yes, and the weight conversion holds, but the clarity may not. Sheet gelatin is generally the cleaner-dissolving of the two formats, and a glaze shows every undissolved granule. If you are using the ${v.gold}g of powder that four gold sheets convert to, bloom it fully, melt it gently, and strain the finished glaze before you pour.`,
      },
      {
        q: "How much liquid will four sheets set?",
        a: `At the medium-set ratio used on the site's <a href="/how-much-gelatin-per-cup-of-liquid/" class="text-amber-700 underline underline-offset-4">per-cup reference</a>, the powder equivalent of four gold sheets covers roughly ${v.goldCups} cups of a water-based liquid. Dairy, sugar, acid and alcohol all shift that figure, so it is a starting point for a test batch rather than a specification.`,
      },
    ],
  },

  {
    count: 5,
    slug: "5-gelatin-sheets-to-powder",
    noun: "sheets",
    nounPlural: "sheets",
    h1: "5 Gelatin Sheets to Powder",
    lede: (v) => `Five sheets appears in recipes sized for a full mould or a party tray — a large charlotte, a set cheesecake that has to survive being cut, a batch of marshmallow. Five is also the count where the phrase "5 grams of gelatin" starts colliding with "5 sheets of gelatin" in search results, and the two are not remotely the same quantity. Five gold sheets hold ${v.goldMass}g of gelatin, not five.`,
    gradesProse: `Sheets are cut to a job rather than to a weight, and that single fact accounts for the whole table. The job is: one sheet should set about the same amount of liquid regardless of which grade you bought. Bloom strength is a measure of how much gelling power a gram of that gelatin delivers, so a high-bloom stock hits the target with less material and a low-bloom stock needs more. Sheet weight consequently runs inverse to bloom — platinum lightest, titanium heaviest, with silver and gold between. Powdered gelatin sidesteps the convention entirely by being sold as loose granules at a published or inferred bloom value. Converting five sheets means recovering the mass those particular sheets held, then adjusting that mass for the difference in gelling power between the sheet stock and your powder.`,
    measuring: (v) => `At five sheets, weighing is the only method that stays honest. The powder equivalent works out around ${v.tspApprox} level teaspoons, and spoon error compounds across that many measures — five slightly heaped teaspoons can overshoot a weighed portion by a meaningful margin. If you only have a spoon, level each one with a straight edge rather than the side of the tub. The blooming step is also where a quantity this size behaves differently from the sheet version. Sheets go into a large bowl of cold water, soften in five minutes, and are squeezed. Powder at this weight needs a genuine volume of cold liquid — roughly a third of a cup — and it needs that liquid to be cold at the moment of contact, or the outer granules gel and seal the dry ones inside.`,
    extra: `The other thing that changes at five sheets is how much a rounding decision costs. A tenth of a gram on a one-sheet conversion is noise. Five times the quantity means five times the absolute error from the same proportional mistake, and a set that is meaningfully firmer than intended. If the recipe matters, weigh to a tenth of a gram, and use the grade row that matches what is actually in your drawer rather than the one you assume the author used.`,
    faqs: (v) => [
      {
        q: "Is 5 sheets of gelatin the same as 5 grams of gelatin?",
        a: `No, and the gap is large. Five gold sheets hold ${v.goldMass}g of gelatin — several times the mass of a 5g quantity. If your recipe specifies grams rather than a sheet count, use the <a href="/gelatin-grams-sheets-to-powder/" class="text-amber-700 underline underline-offset-4">gram-based conversion</a> instead, which starts from the weight rather than the count.`,
      },
      {
        q: "Can I measure this with a teaspoon instead of a scale?",
        a: `You can, with a caveat. The conversion works out to roughly ${v.tspApprox} level teaspoons of powder, but teaspoon measurement of gelatin varies by how the granules pack. At five sheets the accumulated error is larger than at one or two, so if the dish has to unmould cleanly, weigh it.`,
      },
      {
        q: "Does the conversion change if the base is hot when I add the gelatin?",
        a: `The conversion does not, but the handling does. The ${v.gold}g of powder that five gold sheets convert to must be bloomed in cold liquid first and then melted into the warm base — powder added directly to a hot mixture clumps. Squeezed sheets can go straight into a warm base because they are already hydrated. Neither format should be boiled; sustained high heat degrades gelling power.`,
      },
    ],
  },

  {
    count: 6,
    slug: "6-gelatin-sheets-to-powder",
    noun: "sheets",
    nounPlural: "sheets",
    h1: "6 Gelatin Sheets to Powder",
    lede: (v) => `Six sheets is batch territory — a terrine to slice, a sheet tray of jelly, a mousse scaled for a service rather than a dinner. Quantities this size are usually the result of multiplying a smaller recipe, which is where a second number becomes worth watching. Six gold sheets convert to ${v.gold}g of powder; that is close to ${v.packets} standard packets, a unit that does not divide evenly and so tends to get rounded.`,
    gradesProse: `Every grade of sheet is manufactured toward the same outcome: one sheet sets roughly one sheet's worth of liquid, whichever box it came from. Bloom strength measures gelling power per gram, so the only way to hold the per-sheet outcome constant across grades is to vary how many grams go into each sheet. Platinum, the strongest common grade, is cut lightest. Titanium, the softest, is cut heaviest. Powder is outside this system — it comes as loose granules sold by weight at one bloom value. That is why a sheet-count conversion cannot be a single multiplier. The mass has to be recovered from the count and the grade, and then rescaled against the powder's own bloom before the two are comparable.`,
    measuring: (v) => `Six sheets converts to a powder weight where a kitchen scale is unambiguously the right tool — it is well inside the accurate range of even a cheap one, and the spoon equivalent has grown to roughly ${v.tspApprox} level teaspoons, which is too many to level reliably. Blooming at this scale needs planning rather than improvisation. The powder wants something approaching half a cup of cold liquid, and it needs room to swell without the granules touching each other on the way down — sprinkle it across the surface rather than dropping it in one place. Sheets, by comparison, need a bowl large enough that six of them do not stick to one another while they soften, and a firm squeeze before they go in.`,
    extra: `Scaling is the failure mode specific to this quantity. Gelatin scales linearly with the volume of liquid it has to set, so doubling a recipe does mean doubling the gelatin — but it does not mean doubling the setting time or the mould depth, and a deeper set takes longer to chill through and reads firmer at the centre. If you arrived at six sheets by tripling a two-sheet recipe, chill a small test portion at the original depth before committing the batch. The conversion in the table is the easy part; the geometry is not.`,
    faqs: (v) => [
      {
        q: "I'm scaling a recipe up. Does gelatin scale linearly?",
        a: `Against liquid volume, yes — three times the base needs about three times the gelatin. What does not scale is the set's behaviour in a deeper mould, which chills more slowly and can read firmer at the centre. The ${v.gold}g figure for six gold sheets is the arithmetic; a test portion at the finished depth is the check.`,
      },
      {
        q: "Six sheets is more than one packet. How do I handle the remainder?",
        a: `Weigh rather than count packets. Six gold sheets convert to ${v.gold}g, which is about ${v.packets} envelopes at ${v.packetGrams}g each — a fraction that rounding will distort in either direction. Open the packets you need, weigh the total, and keep the remainder sealed.`,
      },
      {
        q: "Can I make up six sheets from mixed grades?",
        a: `Yes, if you convert each grade separately and add the powder weights. What you cannot do is treat six mixed sheets as six of any one grade — across the table above, six sheets ranges from ${v.platinum}g to ${v.titanium}g of powder depending on grade. Convert per grade, then total.`,
      },
    ],
  },
];
