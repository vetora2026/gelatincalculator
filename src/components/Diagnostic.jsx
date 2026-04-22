import { useState } from "react";
import data from "../data/gelatin-bloom.json";
import Converter from "./Converter.jsx";

const CONFIDENCE_LABELS = {
  verified: { label: "Confirmed", classes: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  standard: { label: "Industry standard", classes: "bg-sky-100 text-sky-800 border-sky-200" },
  typical: { label: "Typical estimate", classes: "bg-amber-100 text-amber-800 border-amber-200" },
  low: { label: "Rough estimate", classes: "bg-stone-100 text-stone-700 border-stone-200" },
};

function Card({ children, onClick, active }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left w-full rounded-xl border p-5 transition-all duration-150 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
        active
          ? "border-amber-500 bg-amber-50"
          : "border-stone-200 bg-white hover:border-amber-300"
      }`}
    >
      {children}
    </button>
  );
}

export default function Diagnostic() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(null); // "sheet" | "powder"
  const [selected, setSelected] = useState(null);
  const [showSheetHelp, setShowSheetHelp] = useState(false);

  const reset = () => {
    setStep(1);
    setForm(null);
    setSelected(null);
    setShowSheetHelp(false);
  };

  const pickForm = (kind) => {
    setForm(kind);
    setStep(2);
    setSelected(null);
    setShowSheetHelp(false);
  };

  const pickItem = (item) => {
    setSelected(item);
    setStep(3);
  };

  return (
    <section
      id="tool"
      className="mx-auto max-w-3xl rounded-3xl border border-stone-200 bg-stone-50/60 p-6 sm:p-10 shadow-sm"
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-amber-700 font-semibold mb-2">
            Step {Math.min(step, 3)} of 3
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900">
            {step === 1 && "What gelatin do you have?"}
            {step === 2 && form === "sheet" && "What color or grade?"}
            {step === 2 && form === "powder" && "Which brand?"}
            {step === 3 && "Your gelatin's bloom strength"}
          </h2>
        </div>
        {step > 1 && (
          <button
            type="button"
            onClick={reset}
            className="shrink-0 text-sm text-stone-500 hover:text-amber-700 underline underline-offset-4"
          >
            Start over
          </button>
        )}
      </div>

      {step === 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card onClick={() => pickForm("sheet")}>
            <div className="font-serif text-2xl text-stone-900 mb-1">
              Sheet / leaf gelatin
            </div>
            <div className="text-sm text-stone-600">
              Thin, translucent sheets — usually sold by color (titanium, bronze, silver, gold, platinum).
            </div>
          </Card>
          <Card onClick={() => pickForm("powder")}>
            <div className="font-serif text-2xl text-stone-900 mb-1">
              Powder / granulated gelatin
            </div>
            <div className="text-sm text-stone-600">
              Fine granules sold in packets or jars. Knox is the most common US brand.
            </div>
          </Card>
        </div>
      )}

      {step === 2 && form === "sheet" && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.sheet_gelatin.map((item) => (
              <Card key={item.id} onClick={() => pickItem(item)}>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-serif text-xl text-stone-900">
                    {item.name}
                  </span>
                  <span className="text-amber-700 font-semibold">
                    {item.bloom}
                  </span>
                </div>
                <div className="text-xs text-stone-500 mb-1.5">
                  bloom (range {item.range[0]}–{item.range[1]})
                </div>
                <div className="text-sm text-stone-600">{item.notes}</div>
              </Card>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowSheetHelp((v) => !v)}
            className="w-full rounded-xl border border-dashed border-stone-300 bg-white p-4 text-left hover:border-amber-400 transition"
          >
            <div className="font-medium text-stone-800">
              I don't know the color — help me figure it out
            </div>
            {showSheetHelp && (
              <div className="mt-3 text-sm text-stone-600 space-y-2">
                <p>
                  Most sheet gelatin packages print a color name (titanium,
                  bronze, silver, gold, or platinum) somewhere on the box or
                  wrapper. If you bought it at a regular grocery store in the
                  US, it's most likely <strong>silver</strong> or{" "}
                  <strong>gold</strong>.
                </p>
                <p>
                  Check the packaging for a color name. If you truly can't find
                  one, picking <strong>gold (200 bloom)</strong> is the safest
                  middle-ground choice — it's what most professional pastry
                  recipes assume.
                </p>
              </div>
            )}
          </button>
        </div>
      )}

      {step === 2 && form === "powder" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.powder_gelatin.map((item) => (
            <Card key={item.id} onClick={() => pickItem(item)}>
              <div className="flex items-baseline justify-between mb-1 gap-2">
                <span className="font-serif text-xl text-stone-900">
                  {item.name}
                </span>
                <span className="text-amber-700 font-semibold whitespace-nowrap">
                  {item.bloom}
                </span>
              </div>
              <div className="text-xs text-stone-500 mb-1.5">bloom</div>
              <div className="text-sm text-stone-600">{item.notes}</div>
            </Card>
          ))}
        </div>
      )}

      {step === 3 && selected && (
        <div>
          <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/40 border border-amber-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
              <div>
                <div className="text-sm uppercase tracking-widest text-amber-800 font-semibold mb-1">
                  {selected.name}
                </div>
                <div className="font-serif text-6xl sm:text-7xl text-stone-900 leading-none">
                  {selected.bloom}
                </div>
                <div className="text-stone-600 mt-1 text-sm">bloom strength</div>
              </div>
              <span
                className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${
                  CONFIDENCE_LABELS[selected.confidence]?.classes ||
                  "bg-stone-100 text-stone-700 border-stone-200"
                }`}
              >
                {CONFIDENCE_LABELS[selected.confidence]?.label || selected.confidence}
              </span>
            </div>
            <p className="text-stone-700 leading-relaxed">{selected.notes}</p>
          </div>

          <Converter
            userBloom={selected.bloom}
            diagnosedName={selected.name}
          />
        </div>
      )}
    </section>
  );
}
