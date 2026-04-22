import { useState, useEffect } from "react";

const RECIPE_PRESETS = [
  { label: "Silver (160)", value: 160 },
  { label: "Gold (200)", value: 200 },
  { label: "Knox equivalent (225)", value: 225 },
  { label: "Platinum (240)", value: 240 },
  { label: "Custom", value: "custom" },
];

export default function Converter({ userBloom: initialUserBloom, diagnosedName }) {
  const [userBloom, setUserBloom] = useState(initialUserBloom ?? "");
  const [recipePreset, setRecipePreset] = useState("200");
  const [recipeBloom, setRecipeBloom] = useState(200);
  const [recipeAmount, setRecipeAmount] = useState("");

  useEffect(() => {
    if (initialUserBloom != null) setUserBloom(initialUserBloom);
  }, [initialUserBloom]);

  const handlePreset = (e) => {
    const v = e.target.value;
    setRecipePreset(v);
    if (v !== "custom") setRecipeBloom(Number(v));
  };

  const userB = Number(userBloom);
  const recB = Number(recipeBloom);
  const amt = Number(recipeAmount);

  const ready = userB > 0 && recB > 0 && amt > 0;
  const adjusted = ready ? amt * (recB / userB) : null;
  const adjRounded = adjusted != null ? Math.round(adjusted * 10) / 10 : null;

  let note = null;
  if (ready && adjusted != null) {
    const pctDiff = Math.abs(adjusted - amt) / amt;
    if (pctDiff <= 0.05) {
      note = "Your gelatin is close enough to the recipe's requirement that you can use the original amount without adjusting.";
    } else if (adjusted > amt) {
      note = "Your gelatin is weaker than the recipe calls for, so you need more of it.";
    } else {
      note = "Your gelatin is stronger than the recipe calls for, so you need less of it.";
    }
  }

  const displayName = diagnosedName || "your";

  return (
    <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm">
      <h3 className="font-serif text-2xl text-stone-900 mb-1">Convert the recipe</h3>
      <p className="text-sm text-stone-600 mb-6">
        Enter what the recipe calls for, and we'll adjust the amount to match your gelatin.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <label className="block">
          <span className="block text-sm font-medium text-stone-700 mb-1.5">
            Your gelatin's bloom
          </span>
          <input
            type="number"
            inputMode="numeric"
            min="1"
            value={userBloom}
            onChange={(e) => setUserBloom(e.target.value)}
            className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-stone-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition"
            placeholder="e.g. 225"
          />
        </label>

        <label className="block">
          <span className="block text-sm font-medium text-stone-700 mb-1.5">
            Recipe calls for (bloom)
          </span>
          <div className="flex gap-2">
            <select
              value={recipePreset}
              onChange={handlePreset}
              className="rounded-lg border border-stone-300 px-2 py-2.5 text-stone-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition"
            >
              {RECIPE_PRESETS.map((p) => (
                <option key={p.label} value={String(p.value)}>
                  {p.label}
                </option>
              ))}
            </select>
            <input
              type="number"
              inputMode="numeric"
              min="1"
              value={recipeBloom}
              onChange={(e) => {
                setRecipeBloom(e.target.value);
                setRecipePreset("custom");
              }}
              className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-stone-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition"
            />
          </div>
        </label>

        <label className="block sm:col-span-2">
          <span className="block text-sm font-medium text-stone-700 mb-1.5">
            Recipe amount (grams)
          </span>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="0.1"
            value={recipeAmount}
            onChange={(e) => setRecipeAmount(e.target.value)}
            className="w-full rounded-lg border border-stone-300 px-3 py-2.5 text-stone-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition"
            placeholder="e.g. 6"
          />
        </label>
      </div>

      {ready && (
        <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 p-5">
          <div className="text-sm uppercase tracking-wide text-amber-800 font-semibold mb-2">
            Adjusted amount
          </div>
          <div className="font-serif text-5xl text-stone-900 mb-3">
            {adjRounded.toFixed(1)}
            <span className="text-2xl text-stone-600 ml-2">g</span>
          </div>
          <p className="text-stone-800">
            Use <strong>{adjRounded.toFixed(1)} grams</strong> of {displayName}{" "}
            gelatin to match the recipe's {recB} bloom requirement.
          </p>
          {note && <p className="mt-2 text-sm text-stone-600 italic">{note}</p>}
        </div>
      )}

      {!ready && (
        <p className="mt-6 text-sm text-stone-500">
          Fill in all three values to see the adjusted amount.
        </p>
      )}
    </div>
  );
}
