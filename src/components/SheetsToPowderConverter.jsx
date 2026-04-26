import { useState } from "react";

const GRADES = [
  { id: "titanium", name: "Titanium", bloom: 115, g: 5.0 },
  { id: "bronze",   name: "Bronze",   bloom: 135, g: 3.3 },
  { id: "silver",   name: "Silver",   bloom: 160, g: 2.5 },
  { id: "gold",     name: "Gold",     bloom: 200, g: 2.0 },
  { id: "platinum", name: "Platinum", bloom: 240, g: 1.7 },
];

const POWDERS = [
  { id: "knox",    label: "Knox / US powder",          bloom: 225 },
  { id: "generic", label: "Generic US grocery powder", bloom: 215 },
  { id: "euro",    label: "European pastry powder",    bloom: 200 },
];

const inputCls =
  "w-full border border-stone-200 rounded-lg px-4 py-3 text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400";
const labelCls = "block text-sm font-medium text-stone-700 mb-1.5";

export default function SheetsToPowderConverter() {
  const [mode, setMode] = useState("sheets");

  const [sheetCount, setSheetCount]   = useState("");
  const [sheetGrade, setSheetGrade]   = useState("gold");
  const [powderTarget, setPowderTarget] = useState("knox");

  const [powderAmt, setPowderAmt]     = useState("");
  const [powderUnit, setPowderUnit]   = useState("grams");
  const [powderSrc, setPowderSrc]     = useState("knox");
  const [sheetTarget, setSheetTarget] = useState("gold");

  const grade   = GRADES.find(g => g.id === sheetGrade);
  const pTarget = POWDERS.find(p => p.id === powderTarget);
  const pSrc    = POWDERS.find(p => p.id === powderSrc);
  const gTarget = GRADES.find(g => g.id === sheetTarget);

  function getPowderGrams() {
    const n = parseFloat(sheetCount);
    if (!n || n <= 0) return null;
    return n * grade.g * (grade.bloom / pTarget.bloom);
  }

  function getSheetCount() {
    const n = parseFloat(powderAmt);
    if (!n || n <= 0) return null;
    let grams = n;
    if (powderUnit === "packets") grams = n * 7;
    if (powderUnit === "tsp")     grams = n * 2.8;
    return (grams * pSrc.bloom) / (gTarget.bloom * gTarget.g);
  }

  const powderResult = getPowderGrams();
  const sheetResult  = getSheetCount();

  return (
    <div className="border border-stone-200 rounded-2xl p-6 bg-stone-50/60 shadow-sm">
      <div className="flex gap-2 mb-6">
        {["sheets", "powder"].map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              mode === m
                ? "bg-amber-600 text-white"
                : "bg-white border border-stone-200 text-stone-700 hover:border-amber-400"
            }`}
          >
            {m === "sheets" ? "Sheets → Powder" : "Powder → Sheets"}
          </button>
        ))}
      </div>

      {mode === "sheets" ? (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Number of sheets</label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={sheetCount}
                onChange={e => setSheetCount(e.target.value)}
                placeholder="e.g. 3"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Sheet grade</label>
              <select
                value={sheetGrade}
                onChange={e => setSheetGrade(e.target.value)}
                className={inputCls}
              >
                {GRADES.map(g => (
                  <option key={g.id} value={g.id}>
                    {g.name} (~{g.bloom} bloom, ~{g.g}g/sheet)
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className={labelCls}>Target powder</label>
            <select
              value={powderTarget}
              onChange={e => setPowderTarget(e.target.value)}
              className={inputCls}
            >
              {POWDERS.map(p => (
                <option key={p.id} value={p.id}>
                  {p.label} (~{p.bloom} bloom)
                </option>
              ))}
            </select>
          </div>

          {powderResult !== null && (
            <div className="p-4 bg-white border border-amber-200 rounded-xl">
              <p className="text-xs text-stone-500 uppercase tracking-wide mb-1">Use this much powder</p>
              <p className="font-serif text-4xl text-stone-900">
                {powderResult.toFixed(1)}
                <span className="text-xl ml-1.5 text-stone-500">g</span>
              </p>
              <p className="text-sm text-stone-500 mt-1">
                ≈ {(powderResult / 7).toFixed(2)} Knox packets &nbsp;·&nbsp; ≈ {(powderResult / 2.8).toFixed(1)} tsp
              </p>
              <p className="text-xs text-stone-400 mt-2">
                Total gelatin in sheets: {(parseFloat(sheetCount) * grade.g).toFixed(1)}g at {grade.bloom} bloom.
                Bloom powder in cold water before heating.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Amount of powder</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={powderAmt}
                onChange={e => setPowderAmt(e.target.value)}
                placeholder="e.g. 7"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Unit</label>
              <select
                value={powderUnit}
                onChange={e => setPowderUnit(e.target.value)}
                className={inputCls}
              >
                <option value="grams">grams</option>
                <option value="packets">packets (7g each)</option>
                <option value="tsp">teaspoons</option>
              </select>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Powder bloom</label>
              <select
                value={powderSrc}
                onChange={e => setPowderSrc(e.target.value)}
                className={inputCls}
              >
                {POWDERS.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.label} (~{p.bloom} bloom)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Target sheet grade</label>
              <select
                value={sheetTarget}
                onChange={e => setSheetTarget(e.target.value)}
                className={inputCls}
              >
                {GRADES.map(g => (
                  <option key={g.id} value={g.id}>
                    {g.name} (~{g.bloom} bloom, ~{g.g}g/sheet)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {sheetResult !== null && (
            <div className="p-4 bg-white border border-amber-200 rounded-xl">
              <p className="text-xs text-stone-500 uppercase tracking-wide mb-1">Use this many sheets</p>
              <p className="font-serif text-4xl text-stone-900">
                {sheetResult.toFixed(1)}
                <span className="text-xl ml-1.5 text-stone-500">sheets</span>
              </p>
              <p className="text-sm text-stone-500 mt-1">
                Round to the nearest whole or half sheet for practical use
              </p>
              <p className="text-xs text-stone-400 mt-2">
                Equivalent mass: {(sheetResult * gTarget.g).toFixed(1)}g of {gTarget.name} sheets at {gTarget.bloom} bloom
              </p>
            </div>
          )}
        </div>
      )}

      <p className="text-xs text-stone-400 mt-5 pt-4 border-t border-stone-100 leading-relaxed">
        Sheet weights vary by manufacturer. Values use common European standard weights (titanium ~5g, bronze ~3.3g,
        silver ~2.5g, gold ~2g, platinum ~1.7g).{" "}
        <a href="/what-is-bloom-strength/" className="text-amber-700 underline underline-offset-4">
          What is bloom strength?
        </a>
      </p>
    </div>
  );
}
