import { useState } from "react";
import {
  GRADES,
  POWDERS,
  DEFAULT_SHEET_GRADE,
  DEFAULT_POWDER,
  PACKET_GRAMS,
  getGrade,
  getPowder,
  sheetsToPowderGrams,
  powderToSheets,
  gramsToPackets,
  gramsToTsp,
} from "../lib/gelatin-conversion.js";

const inputCls =
  "w-full border border-stone-200 rounded-lg px-4 py-3 text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400";
const labelCls = "block text-sm font-medium text-stone-700 mb-1.5";

export default function SheetsToPowderConverter() {
  const [mode, setMode] = useState("sheets");

  const [sheetCount, setSheetCount]   = useState("");
  const [sheetGrade, setSheetGrade]   = useState(DEFAULT_SHEET_GRADE);
  const [powderTarget, setPowderTarget] = useState(DEFAULT_POWDER);

  const [powderAmt, setPowderAmt]     = useState("");
  const [powderUnit, setPowderUnit]   = useState("grams");
  const [powderSrc, setPowderSrc]     = useState(DEFAULT_POWDER);
  const [sheetTarget, setSheetTarget] = useState(DEFAULT_SHEET_GRADE);

  const grade   = getGrade(sheetGrade);
  const pTarget = getPowder(powderTarget);
  const pSrc    = getPowder(powderSrc);
  const gTarget = getGrade(sheetTarget);

  function getPowderGrams() {
    const n = parseFloat(sheetCount);
    if (!n || n <= 0) return null;
    return sheetsToPowderGrams(n, sheetGrade, powderTarget);
  }

  function getSheetCount() {
    const n = parseFloat(powderAmt);
    if (!n || n <= 0) return null;
    return powderToSheets(n, powderUnit, powderSrc, sheetTarget);
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
            className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors ${
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
                ≈ {gramsToPackets(powderResult).toFixed(2)} Knox packets &nbsp;·&nbsp; ≈ {gramsToTsp(powderResult).toFixed(1)} tsp
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
                <option value="packets">packets ({PACKET_GRAMS}g each)</option>
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
        Sheet weights vary by manufacturer. Values use common European standard weights (
        {GRADES.map((g, i) => `${i ? ", " : ""}${g.name.toLowerCase()} ~${g.g}g`).join("")}).{" "}
        <a href="/what-is-bloom-strength/" className="text-amber-700 underline underline-offset-4">
          What is bloom strength?
        </a>
      </p>
    </div>
  );
}
