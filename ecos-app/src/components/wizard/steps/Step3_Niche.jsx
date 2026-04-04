// FILE: src/components/wizard/steps/Step3_Niche.jsx

import { useState } from "react";

const NICHES = [
  { id: "home", label: "Home & Living", icon: "🏠", examples: "Storage, decor, kitchen tools" },
  { id: "pets", label: "Pet Products", icon: "🐾", examples: "Accessories, grooming, toys" },
  { id: "fitness", label: "Fitness & Sport", icon: "💪", examples: "Gear, wearables, recovery" },
  { id: "baby", label: "Baby & Kids", icon: "🍼", examples: "Safety, learning, comfort" },
  { id: "outdoor", label: "Outdoor & Travel", icon: "🏕️", examples: "Camping, luggage, gadgets" },
  { id: "tech", label: "Tech Accessories", icon: "🔌", examples: "Phone, desk, car gadgets" },
  { id: "fashion", label: "Fashion & Style", icon: "👗", examples: "Accessories, bags, jewellery" },
  { id: "auto", label: "Automotive", icon: "🚗", examples: "Car care, organizers, tools" },
  { id: "discover", label: "Let AI Discover", icon: "🤖", examples: "Research Agent picks the best niche" },
];

const AVATARS = [
  { id: "young_women", label: "Young Women (18–30)", icon: "👩" },
  { id: "parents", label: "Parents", icon: "👨‍👩‍👧" },
  { id: "men_30s", label: "Men (30–50)", icon: "👨" },
  { id: "seniors", label: "Seniors (55+)", icon: "🧓" },
  { id: "students", label: "Students", icon: "🎓" },
  { id: "professionals", label: "Professionals", icon: "💼" },
  { id: "ai_build", label: "Let Research Agent Build It", icon: "🤖" },
];

const formatPrice = (val) => (val ? `$${Number(val).toLocaleString()}` : "");

export default function Step3_Niche({ nicheData = {}, onNicheChange, onBack, onNext }) {
  const [niche, setNiche] = useState(nicheData.niche || "");
  const [customNiche, setCustomNiche] = useState(nicheData.customNiche || "");
  const [priceMin, setPriceMin] = useState(nicheData.priceMin || "");
  const [priceMax, setPriceMax] = useState(nicheData.priceMax || "");
  const [margin, setMargin] = useState(nicheData.margin || 30);
  const [avatar, setAvatar] = useState(nicheData.avatar || "");

  const isReady =
    niche !== "" &&
    priceMin !== "" &&
    priceMax !== "" &&
    Number(priceMax) >= Number(priceMin) &&
    avatar !== "";

  const handleNext = () => {
    if (!isReady) return;
    const data = { niche, customNiche, priceMin, priceMax, margin, avatar };
    onNicheChange?.(data);
    onNext?.(data);
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white flex items-center justify-center px-4 py-12 font-['Sora',sans-serif]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');`}</style>

      <div className="w-full max-w-2xl">

        <div className="mb-10">
          <div className="flex items-center gap-2 text-[#3B82F6] text-xs font-bold uppercase tracking-[0.2em] mb-3">
            <span className="w-5 h-px bg-[#3B82F6]" />
            Step 3 of 4
          </div>
          <h1 className="text-3xl font-bold text-white leading-tight">Niche & Product Preferences</h1>
          <p className="text-[#64748B] mt-2 text-sm leading-relaxed">
            This drives margin calculations, product scoring, and ad angles across all 10 agents.
          </p>
        </div>

        {/* Niche */}
        <div className="mb-8">
          <label className="block text-xs font-bold uppercase tracking-widest text-[#475569] mb-3">1 · Select Your Niche</label>
          <div className="grid grid-cols-3 gap-2.5">
            {NICHES.map((n) => (
              <button
                key={n.id}
                onClick={() => setNiche(n.id)}
                className={`flex flex-col items-start gap-1 rounded-xl p-3 text-left border transition-all duration-200 ${
                  niche === n.id ? "bg-[#0F2650] border-[#3B82F6] shadow-lg shadow-blue-500/10" : "bg-[#0F172A] border-[#1E293B] hover:border-[#334155]"
                } ${n.id === "discover" ? "col-span-3 flex-row items-center gap-3" : ""}`}
              >
                <span className="text-xl">{n.icon}</span>
                <div className="min-w-0">
                  <p className={`text-xs font-semibold ${niche === n.id ? "text-white" : "text-[#94A3B8]"}`}>{n.label}</p>
                  <p className="text-[10px] text-[#475569] leading-tight mt-0.5">{n.examples}</p>
                </div>
                {niche === n.id && <span className="ml-auto text-[#3B82F6] text-sm shrink-0">✓</span>}
              </button>
            ))}
          </div>
          {niche && niche !== "discover" && (
            <div className="mt-3">
              <input
                type="text"
                placeholder={`Optional: be more specific, e.g. "collapsible kitchen tools"`}
                value={customNiche}
                onChange={(e) => setCustomNiche(e.target.value)}
                className="w-full bg-[#0F172A] border border-[#1E293B] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#334155] focus:outline-none focus:border-[#3B82F6] transition-colors"
              />
            </div>
          )}
        </div>

        {/* Price */}
        <div className="mb-8">
          <label className="block text-xs font-bold uppercase tracking-widest text-[#475569] mb-3">2 · Selling Price Range</label>
          <div className="grid grid-cols-2 gap-3">
            {[["Minimum Price", priceMin, setPriceMin, "29"], ["Maximum Price", priceMax, setPriceMax, "79"]].map(([label, val, setter, ph]) => (
              <div key={label}>
                <label className="block text-[10px] text-[#475569] mb-1.5">{label}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569] text-sm font-semibold">$</span>
                  <input
                    type="number" min="1" placeholder={`e.g. ${ph}`} value={val}
                    onChange={(e) => setter(e.target.value)}
                    className="w-full bg-[#0F172A] border border-[#1E293B] rounded-xl pl-7 pr-4 py-2.5 text-sm text-white placeholder-[#334155] focus:outline-none focus:border-[#3B82F6] transition-colors"
                  />
                </div>
              </div>
            ))}
          </div>
          {priceMin && priceMax && Number(priceMax) < Number(priceMin) && (
            <p className="text-xs text-[#EF4444] mt-2 pl-1">⚠️ Maximum price can't be less than minimum price.</p>
          )}
          {priceMin && priceMax && Number(priceMax) >= Number(priceMin) && (
            <div className="mt-3 bg-[#0A1628] border border-[#1E3A5F] rounded-xl px-4 py-3 flex items-center justify-between">
              <span className="text-xs text-[#64748B]">Target price range</span>
              <span className="text-sm font-bold text-white">{formatPrice(priceMin)} – {formatPrice(priceMax)}</span>
            </div>
          )}
        </div>

        {/* Margin */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-xs font-bold uppercase tracking-widest text-[#475569]">3 · Minimum Acceptable Margin</label>
            <span className={`text-sm font-bold px-2 py-0.5 rounded-lg ${
              margin >= 40 ? "text-[#4ADE80] bg-[#052E16]" : margin >= 25 ? "text-[#F59E0B] bg-[#1C1200]" : "text-[#EF4444] bg-[#2D0A0A]"
            }`}>{margin}%</span>
          </div>
          <input type="range" min="10" max="70" step="5" value={margin}
            onChange={(e) => setMargin(Number(e.target.value))}
            className="w-full accent-[#3B82F6] cursor-pointer" />
          <div className="flex justify-between text-[10px] text-[#334155] mt-1">
            <span>10% — Risky</span><span>25% — Healthy</span><span>40%+ — Strong</span>
          </div>
        </div>

        {/* Avatar */}
        <div className="mb-8">
          <label className="block text-xs font-bold uppercase tracking-widest text-[#475569] mb-3">4 · Target Customer Avatar</label>
          <div className="grid grid-cols-2 gap-2.5">
            {AVATARS.map((a) => (
              <button key={a.id} onClick={() => setAvatar(a.id)}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left border transition-all duration-200 ${
                  avatar === a.id ? "bg-[#0F2650] border-[#3B82F6] shadow-lg shadow-blue-500/10" : "bg-[#0F172A] border-[#1E293B] hover:border-[#334155]"
                } ${a.id === "ai_build" ? "col-span-2" : ""}`}
              >
                <span className="text-xl">{a.icon}</span>
                <span className={`text-xs font-semibold ${avatar === a.id ? "text-white" : "text-[#94A3B8]"}`}>{a.label}</span>
                {avatar === a.id && <span className="ml-auto text-[#3B82F6] text-sm">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        {isReady && (
          <div className="mb-6 bg-[#052E16] border border-[#16A34A] rounded-xl p-4">
            <p className="text-xs text-[#4ADE80] font-bold uppercase tracking-widest mb-3">✓ Preferences Summary</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
              <div className="text-[#64748B]">Niche</div>
              <div className="text-white font-semibold capitalize">{niche === "discover" ? "AI Discovery" : (customNiche || NICHES.find(n => n.id === niche)?.label)}</div>
              <div className="text-[#64748B]">Price Range</div>
              <div className="text-white font-semibold">{formatPrice(priceMin)} – {formatPrice(priceMax)}</div>
              <div className="text-[#64748B]">Min Margin</div>
              <div className="text-white font-semibold">{margin}%</div>
              <div className="text-[#64748B]">Avatar</div>
              <div className="text-white font-semibold">{AVATARS.find(a => a.id === avatar)?.label}</div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button onClick={onBack} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#64748B] border border-[#1E293B] hover:border-[#334155] hover:text-[#94A3B8] transition-all duration-200 cursor-pointer">
            ← Back
          </button>
          <button disabled={!isReady} onClick={handleNext}
            className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
              isReady ? "bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 cursor-pointer" : "bg-[#0F172A] text-[#334155] border border-[#1E293B] cursor-not-allowed"
            }`}>
            Continue to Exclusion Rules →
          </button>
        </div>

      </div>
    </div>
  );
}