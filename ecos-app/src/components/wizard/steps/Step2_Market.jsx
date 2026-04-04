// FILE: src/components/wizard/steps/Step2_Market.jsx

import { useState, useEffect } from "react";

const MARKETS = [
  { country: "United States", code: "US", flag: "🇺🇸", language: "English", currency: "USD", symbol: "$" },
  { country: "United Kingdom", code: "GB", flag: "🇬🇧", language: "English", currency: "GBP", symbol: "£" },
  { country: "Germany", code: "DE", flag: "🇩🇪", language: "German", currency: "EUR", symbol: "€" },
  { country: "France", code: "FR", flag: "🇫🇷", language: "French", currency: "EUR", symbol: "€" },
  { country: "Netherlands", code: "NL", flag: "🇳🇱", language: "Dutch", currency: "EUR", symbol: "€" },
  { country: "Brazil", code: "BR", flag: "🇧🇷", language: "Portuguese", currency: "BRL", symbol: "R$" },
  { country: "Mexico", code: "MX", flag: "🇲🇽", language: "Spanish", currency: "MXN", symbol: "$" },
  { country: "Spain", code: "ES", flag: "🇪🇸", language: "Spanish", currency: "EUR", symbol: "€" },
  { country: "Italy", code: "IT", flag: "🇮🇹", language: "Italian", currency: "EUR", symbol: "€" },
  { country: "Australia", code: "AU", flag: "🇦🇺", language: "English", currency: "AUD", symbol: "$" },
  { country: "Canada", code: "CA", flag: "🇨🇦", language: "English", currency: "CAD", symbol: "$" },
  { country: "Japan", code: "JP", flag: "🇯🇵", language: "Japanese", currency: "JPY", symbol: "¥" },
];

const LANGUAGES = ["English","German","French","Dutch","Portuguese","Spanish","Italian","Japanese","Arabic","Hindi","Mandarin"];

const TRUST_NOTES = {
  US: "Credit cards dominant · Fast shipping expectations · Reviews-first buying behavior",
  GB: "PayPal & cards dominant · Next-day delivery standard · Trust badges important",
  DE: "Invoice payment preferred · High return rates · Data privacy sensitive",
  FR: "CB cards & PayPal · French-language legally preferred · Strong brand loyalty",
  NL: "iDEAL bank transfer dominant · English accepted · Sustainability matters",
  BR: "Boleto & Pix popular · Installment plans expected · Portuguese required",
  MX: "OXXO cash & cards · COD still common · WhatsApp customer service expected",
  ES: "Cards & PayPal · Spanish required · Long lunch hours affect support SLAs",
  IT: "Cards & PayPal · Italian preferred · Slower shipping tolerance",
  AU: "Cards & Afterpay BNPL · Fast domestic shipping expected · Reviews trusted",
  CA: "Cards dominant · Bilingual (EN/FR) may be needed · Similar to US behavior",
  JP: "Convenience store payment popular · Japanese required · Extreme quality expectations",
};

export default function Step2_Market({ marketData = {}, onMarketChange, onBack, onNext }) {
  const [selected, setSelected] = useState(marketData.country || null);
  const [language, setLanguage] = useState(marketData.language || "");
  const [languageOverride, setLanguageOverride] = useState(false);
  const [search, setSearch] = useState("");

  const market = MARKETS.find((m) => m.code === selected);

  useEffect(() => {
    if (market && !languageOverride) setLanguage(market.language);
  }, [market, languageOverride]);

  const filtered = MARKETS.filter((m) =>
    m.country.toLowerCase().includes(search.toLowerCase())
  );

  const isReady = !!selected && !!language;

  const handleSelect = (code) => {
    setSelected(code);
    setLanguageOverride(false);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setLanguageOverride(true);
  };

  const handleNext = () => {
    if (!isReady) return;
    const data = { country: selected, language, currency: market?.currency };
    onMarketChange?.(data);
    onNext?.(data);
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white flex items-center justify-center px-4 py-12 font-['Sora',sans-serif]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');`}</style>

      <div className="w-full max-w-2xl">

        <div className="mb-10">
          <div className="flex items-center gap-2 text-[#3B82F6] text-xs font-bold uppercase tracking-[0.2em] mb-3">
            <span className="w-5 h-px bg-[#3B82F6]" />
            Step 2 of 4
          </div>
          <h1 className="text-3xl font-bold text-white leading-tight">Market & Language</h1>
          <p className="text-[#64748B] mt-2 text-sm leading-relaxed">
            All store copy, ad creatives, and email flows will be generated for this market.
          </p>
        </div>

        <div className="relative mb-4">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569] text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search country…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0F172A] border border-[#1E293B] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-[#334155] focus:outline-none focus:border-[#3B82F6] transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-8">
          {filtered.map((m) => (
            <button
              key={m.code}
              onClick={() => handleSelect(m.code)}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 border ${
                selected === m.code
                  ? "bg-[#0F2650] border-[#3B82F6] shadow-lg shadow-blue-500/10"
                  : "bg-[#0F172A] border-[#1E293B] hover:border-[#334155] hover:bg-[#111827]"
              }`}
            >
              <span className="text-2xl leading-none">{m.flag}</span>
              <div className="min-w-0">
                <p className={`text-xs font-semibold truncate ${selected === m.code ? "text-white" : "text-[#94A3B8]"}`}>{m.country}</p>
                <p className="text-[10px] text-[#475569] truncate">{m.currency}</p>
              </div>
              {selected === m.code && <span className="ml-auto text-[#3B82F6] text-sm shrink-0">✓</span>}
            </button>
          ))}
        </div>

        {market && (
          <div className="mb-6 bg-[#0A1628] border border-[#1E3A5F] rounded-xl p-5 space-y-4">
            <p className="text-xs text-[#3B82F6] font-bold uppercase tracking-widest">Auto-detected for {market.country}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-[#475569] uppercase tracking-widest mb-1.5">Currency</label>
                <div className="flex items-center gap-2 bg-[#0F172A] border border-[#1E293B] rounded-lg px-3 py-2">
                  <span className="text-lg">{market.symbol}</span>
                  <span className="text-sm text-white font-semibold">{market.currency}</span>
                  <span className="ml-auto text-[10px] text-[#334155] italic">auto</span>
                </div>
              </div>
              <div>
                <label className="block text-[10px] text-[#475569] uppercase tracking-widest mb-1.5">
                  Language {languageOverride && <span className="text-[#F59E0B] ml-1 normal-case">(overridden)</span>}
                </label>
                <select
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="w-full bg-[#0F172A] border border-[#1E293B] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#3B82F6] transition-colors appearance-none cursor-pointer"
                >
                  {LANGUAGES.map((l) => <option key={l} value={l} className="bg-[#0F172A]">{l}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 items-start bg-[#060F1E] border border-[#1E293B] rounded-lg p-3">
              <span className="text-base">🧠</span>
              <p className="text-xs text-[#64748B] leading-relaxed">
                <span className="text-[#94A3B8] font-semibold">Market Intel: </span>{TRUST_NOTES[market.code]}
              </p>
            </div>
            {languageOverride && (
              <div className="flex gap-3 items-start bg-[#1C1200] border border-[#92400E] rounded-lg p-3">
                <span className="text-base">⚠️</span>
                <p className="text-xs text-[#D97706] leading-relaxed">
                  Language overridden. All agent outputs will be in <span className="font-semibold text-[#F59E0B]">{language}</span>.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={onBack}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#64748B] border border-[#1E293B] hover:border-[#334155] hover:text-[#94A3B8] transition-all duration-200 cursor-pointer"
          >
            ← Back
          </button>
          <button
            disabled={!isReady}
            onClick={handleNext}
            className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
              isReady
                ? "bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 cursor-pointer"
                : "bg-[#0F172A] text-[#334155] border border-[#1E293B] cursor-not-allowed"
            }`}
          >
            Continue to Niche & Preferences →
          </button>
        </div>

      </div>
    </div>
  );
}