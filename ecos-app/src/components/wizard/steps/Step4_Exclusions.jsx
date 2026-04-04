// FILE: src/components/wizard/steps/Step4_Exclusions.jsx

import { useState } from "react";

const PRESET_EXCLUSIONS = [
  { id: "cosmetics", label: "Cosmetics & Skincare", icon: "💄", description: "Creams, serums, moisturizers, makeup", reason: "Requires safety testing & labelling compliance" },
  { id: "supplements", label: "Supplements & Nutraceuticals", icon: "💊", description: "Vitamins, protein, herbal products", reason: "FDA / EFSA health claims regulation" },
  { id: "medical", label: "Medical Devices & Health", icon: "🩺", description: "Braces, monitors, therapy devices", reason: "CE / FDA Class II–III certification needed" },
  { id: "electronics", label: "Electronics (CE / FCC)", icon: "🔌", description: "Gadgets requiring radio / emissions cert", reason: "CE marking or FCC ID mandatory" },
  { id: "food", label: "Food & Consumables", icon: "🍎", description: "Edibles, beverages, cooking ingredients", reason: "Complex food safety & import regulations" },
  { id: "children_toys", label: "Children's Toys (EN71)", icon: "🧸", description: "Toys for under 14s", reason: "EN71 / ASTM F963 safety certification" },
  { id: "weapons", label: "Weapons & Restricted Items", icon: "🔫", description: "Knives, airsoft, self-defence tools", reason: "Restricted or prohibited in most ad platforms" },
  { id: "animals", label: "Live Animals & Plants", icon: "🌿", description: "Seeds, cuttings, live organisms", reason: "Customs / CITES / phytosanitary restrictions" },
];

export default function Step4_Exclusions({ exclusionData = {}, onBack, onFinish }) {
  const [excluded, setExcluded] = useState(exclusionData.excluded || []);
  const [keywords, setKeywords] = useState(exclusionData.keywords || []);
  const [keywordInput, setKeywordInput] = useState("");

  const toggle = (id) => setExcluded((prev) => prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]);

  const addKeyword = () => {
    const trimmed = keywordInput.trim().toLowerCase();
    if (trimmed && !keywords.includes(trimmed)) setKeywords((prev) => [...prev, trimmed]);
    setKeywordInput("");
  };

  const removeKeyword = (kw) => setKeywords((prev) => prev.filter((k) => k !== kw));

  const handleKeyDown = (e) => { if (e.key === "Enter") { e.preventDefault(); addKeyword(); } };

  const totalExclusions = excluded.length + keywords.length;

  return (
    <div className="min-h-screen bg-[#020817] text-white flex items-center justify-center px-4 py-12 font-['Sora',sans-serif]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');`}</style>

      <div className="w-full max-w-2xl">

        <div className="mb-10">
          <div className="flex items-center gap-2 text-[#3B82F6] text-xs font-bold uppercase tracking-[0.2em] mb-3">
            <span className="w-5 h-px bg-[#3B82F6]" />
            Step 4 of 4
          </div>
          <h1 className="text-3xl font-bold text-white leading-tight">Product Exclusion Rules</h1>
          <p className="text-[#64748B] mt-2 text-sm leading-relaxed">
            Agents will automatically reject any product matching these rules — even if it scores high on all other metrics.
          </p>
        </div>

        <div className="flex gap-3 items-start bg-[#1C1200] border border-[#92400E] rounded-xl p-4 mb-8">
          <span className="text-lg shrink-0">⚠️</span>
          <p className="text-xs text-[#D97706] leading-relaxed">
            Skipping exclusions for regulated categories can result in ad account bans, customs seizures, or legal liability in your target market.
          </p>
        </div>

        {/* Presets */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold uppercase tracking-widest text-[#475569]">1 · Category Exclusions</label>
            {excluded.length > 0 && (
              <button onClick={() => setExcluded([])} className="text-[10px] text-[#475569] hover:text-[#EF4444] transition-colors cursor-pointer">
                Clear all
              </button>
            )}
          </div>
          <div className="flex flex-col gap-2.5">
            {PRESET_EXCLUSIONS.map((item) => {
              const active = excluded.includes(item.id);
              return (
                <button key={item.id} onClick={() => toggle(item.id)}
                  className={`flex items-center gap-4 rounded-xl px-4 py-3.5 text-left border transition-all duration-200 cursor-pointer ${
                    active ? "bg-[#2D0A0A] border-[#EF4444] shadow-sm shadow-red-500/10" : "bg-[#0F172A] border-[#1E293B] hover:border-[#334155]"
                  }`}
                >
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold ${active ? "text-[#FCA5A5]" : "text-[#94A3B8]"}`}>{item.label}</p>
                    <p className="text-[11px] text-[#475569] mt-0.5 truncate">{item.description}</p>
                  </div>
                  <span className={`shrink-0 text-[10px] px-2 py-1 rounded-lg border hidden sm:block ${
                    active ? "text-[#F87171] border-[#7F1D1D] bg-[#3D0A0A]" : "text-[#334155] border-[#1E293B] bg-[#0A0F1A]"
                  }`}>{item.reason}</span>
                  <div className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    active ? "bg-[#EF4444] border-[#EF4444]" : "bg-transparent border-[#334155]"
                  }`}>
                    {active && <span className="text-white text-[10px] font-bold">✕</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Keywords */}
        <div className="mb-8">
          <label className="block text-xs font-bold uppercase tracking-widest text-[#475569] mb-3">2 · Custom Exclusion Keywords</label>
          <p className="text-xs text-[#475569] mb-3 leading-relaxed">
            Any product containing these words will be automatically rejected by the agents.
          </p>
          <div className="flex gap-2">
            <input
              type="text" value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='e.g. "razor", "CBD", "alcohol"'
              className="flex-1 bg-[#0F172A] border border-[#1E293B] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#334155] focus:outline-none focus:border-[#3B82F6] transition-colors"
            />
            <button onClick={addKeyword} disabled={!keywordInput.trim()}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                keywordInput.trim() ? "bg-[#1E293B] text-white hover:bg-[#334155] active:scale-95 cursor-pointer" : "bg-[#0A0F1A] text-[#334155] cursor-not-allowed"
              }`}>
              + Add
            </button>
          </div>
          {keywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {keywords.map((kw) => (
                <span key={kw} className="flex items-center gap-1.5 bg-[#2D0A0A] border border-[#7F1D1D] text-[#FCA5A5] text-xs px-3 py-1.5 rounded-full">
                  🚫 {kw}
                  <button onClick={() => removeKeyword(kw)} className="text-[#F87171] hover:text-white transition-colors ml-1 font-bold cursor-pointer">×</button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        <div className={`mb-8 rounded-xl p-4 border transition-all duration-300 ${
          totalExclusions > 0 ? "bg-[#0A1628] border-[#1E3A5F]" : "bg-[#0F172A] border-[#1E293B]"
        }`}>
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#475569] font-semibold uppercase tracking-widest">Active Exclusion Rules</p>
            <span className={`text-sm font-bold px-2.5 py-1 rounded-lg ${totalExclusions > 0 ? "bg-[#2D0A0A] text-[#EF4444]" : "bg-[#0F172A] text-[#334155]"}`}>
              {totalExclusions} rule{totalExclusions !== 1 ? "s" : ""}
            </span>
          </div>
          {totalExclusions > 0 ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {excluded.map((id) => {
                const item = PRESET_EXCLUSIONS.find((p) => p.id === id);
                return <span key={id} className="text-[11px] bg-[#1A0808] border border-[#7F1D1D] text-[#F87171] px-2 py-1 rounded-lg">{item?.icon} {item?.label}</span>;
              })}
              {keywords.map((kw) => (
                <span key={kw} className="text-[11px] bg-[#1A0808] border border-[#7F1D1D] text-[#F87171] px-2 py-1 rounded-lg">🚫 {kw}</span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#334155] mt-2">No exclusions set. Agents will consider all product categories.</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button onClick={onBack} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#64748B] border border-[#1E293B] hover:border-[#334155] hover:text-[#94A3B8] transition-all duration-200 cursor-pointer">
            ← Back
          </button>
          <button
            onClick={() => onFinish?.({ excluded, keywords })}
            className="px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#3B82F6] to-[#6366F1] hover:from-[#2563EB] hover:to-[#4F46E5] text-white shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            🚀 Launch Setup & Start Agents
          </button>
        </div>

      </div>
    </div>
  );
}