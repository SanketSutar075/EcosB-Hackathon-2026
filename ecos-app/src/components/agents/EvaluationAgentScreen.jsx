// FILE: src/components/agents/EvaluationAgentScreen.jsx

import { useState } from "react";

// ── Mock evaluation data for products passed from Research Agent ──
const MOCK_EVALUATIONS = [
  {
    id: 1,
    name: "Posture Corrector Pro",
    emoji: "🦴",
    category: "Health & Wellness",
    viabilityScore: 91,
    decision: "go",
    verdict: "Strong Go",
    sellingPrice: 49,
    cogs: 8,
    landedCost: 11,
    grossMargin: 78,
    estimatedCAC: 18,
    estimatedAOV: 67,
    breakEvenROAS: 1.4,
    projectedROAS: 3.2,
    riskLevel: "low",
    certFlags: [],
    umsStrength: "strong",
    umsNote: "Clear mechanism: realigns spine via biofeedback tension. Believable, demonstrable on video.",
    emotionalCoverage: ["Fear (spinal damage)", "Aspiration (confident posture)", "Belonging (WFH community)"],
    demandScore: 94,
    competitionScore: 72,
    marginScore: 88,
    riskScore: 95,
    profitLevers: [
      { lever: "Price Optimisation Headroom", score: 85, note: "Could test $59–$69 with perceived premium positioning" },
      { lever: "COGs Reduction Potential", score: 78, note: "$8 → $5.50 realistic at 300+ units/month with agent negotiation" },
      { lever: "AOV Uplift (Bundles + Upsells)", score: 90, note: "Lumbar cushion bundle +$29 post-purchase upsell viable" },
      { lever: "Defect Rate Risk", score: 82, note: "Low defect category; QC inspection recommended at 1,000 units" },
      { lever: "Retargeting Recovery", score: 88, note: "High abandonment intent signal — 5-email sequence should recover 15–20%" },
      { lever: "Brand Search Value", score: 71, note: "Search brand term ads viable after month 2 of awareness spend" },
    ],
  },
  {
    id: 2,
    name: "Magnetic Phone Mount",
    emoji: "🚗",
    category: "Automotive",
    viabilityScore: 76,
    decision: "go",
    verdict: "Conditional Go",
    sellingPrice: 39,
    cogs: 4,
    landedCost: 6,
    grossMargin: 85,
    estimatedCAC: 14,
    estimatedAOV: 39,
    breakEvenROAS: 1.6,
    projectedROAS: 2.5,
    riskLevel: "medium",
    certFlags: ["CE marking may be required in EU markets"],
    umsStrength: "moderate",
    umsNote: "Mechanism exists (N52 magnet grip) but many competitors claim same thing. Needs creative differentiation.",
    emotionalCoverage: ["Safety (distracted driving)", "Convenience (one-hand mount)"],
    demandScore: 87,
    competitionScore: 48,
    marginScore: 92,
    riskScore: 65,
    profitLevers: [
      { lever: "Price Optimisation Headroom", score: 60, note: "Market anchored at $29–$39. Testing $49 with bundle may dilute conversion." },
      { lever: "COGs Reduction Potential", score: 90, note: "$4 → $2.50 at scale — already near floor for quality. Negotiate packaging." },
      { lever: "AOV Uplift (Bundles + Upsells)", score: 72, note: "Car organiser bundle or phone charging cable upsell feasible" },
      { lever: "Defect Rate Risk", score: 55, note: "Magnet strength complaints in 1-star reviews. Strict QC needed." },
      { lever: "Retargeting Recovery", score: 80, note: "Price point makes retargeting ROI-positive above 50% recovery rate" },
      { lever: "Brand Search Value", score: 44, note: "Highly generic category — brand search unlikely to develop without strong hook" },
    ],
  },
  {
    id: 3,
    name: "Foldable Laptop Stand",
    emoji: "💻",
    category: "Home Office",
    viabilityScore: 58,
    decision: "nogo",
    verdict: "No-Go",
    sellingPrice: 35,
    cogs: 6,
    landedCost: 9,
    grossMargin: 74,
    estimatedCAC: 22,
    estimatedAOV: 35,
    breakEvenROAS: 2.1,
    projectedROAS: 1.8,
    riskLevel: "high",
    certFlags: [],
    umsStrength: "weak",
    umsNote: "No believable UMS found. 41+ advertisers running nearly identical 'ergonomic' angle with no differentiation.",
    emotionalCoverage: ["Aspiration (clean setup)"],
    demandScore: 79,
    competitionScore: 31,
    marginScore: 74,
    riskScore: 50,
    profitLevers: [
      { lever: "Price Optimisation Headroom", score: 35, note: "Race to bottom in this category. $35 already above average Amazon price." },
      { lever: "COGs Reduction Potential", score: 68, note: "Some room but market compression limits benefit" },
      { lever: "AOV Uplift (Bundles + Upsells)", score: 50, note: "Mouse pad bundle possible but low incremental value" },
      { lever: "Defect Rate Risk", score: 60, note: "Hinge quality complaints common at this price point" },
      { lever: "Retargeting Recovery", score: 55, note: "Projected ROAS below break-even makes retargeting marginal" },
      { lever: "Brand Search Value", score: 30, note: "Commodity product — no brand search opportunity" },
    ],
  },
];

const DECISION_STYLE = {
  go:   { label: "GO",    color: "text-[#4ADE80]", bg: "bg-[#052E16]", border: "border-[#16A34A]", glow: "shadow-green-500/20"  },
  nogo: { label: "NO-GO", color: "text-[#F87171]", bg: "bg-[#2D0A0A]", border: "border-[#EF4444]", glow: "shadow-red-500/20"   },
};

const RISK_STYLE = {
  low:    { label: "Low Risk",    color: "text-[#4ADE80]", bg: "bg-[#052E16]",  border: "border-[#16A34A]"  },
  medium: { label: "Medium Risk", color: "text-[#F59E0B]", bg: "bg-[#1C1200]",  border: "border-[#92400E]"  },
  high:   { label: "High Risk",   color: "text-[#F87171]", bg: "bg-[#2D0A0A]",  border: "border-[#EF4444]"  },
};

const UMS_STYLE = {
  strong:   { label: "Strong UMS",   color: "text-[#4ADE80]" },
  moderate: { label: "Moderate UMS", color: "text-[#F59E0B]" },
  weak:     { label: "Weak UMS",     color: "text-[#F87171]" },
};

function ScoreRing({ score, size = 80, decision }) {
  const color = decision === "go"
    ? score >= 80 ? "#4ADE80" : "#F59E0B"
    : "#F87171";
  const r = (size / 2) - 8;
  const circumference = 2 * Math.PI * r;
  const dash = (score / 100) * circumference;

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1E293B" strokeWidth="6" />
      <circle
        cx={size/2} cy={size/2} r={r} fill="none"
        stroke={color} strokeWidth="6"
        strokeDasharray={`${dash} ${circumference}`}
        strokeLinecap="round"
        style={{ transition: "stroke-dasharray 1s ease" }}
      />
      <text x={size/2} y={size/2} textAnchor="middle" dominantBaseline="middle"
        fill="white" fontSize="16" fontWeight="bold" className="rotate-90"
        transform={`rotate(90, ${size/2}, ${size/2})`}
      >
        {score}
      </text>
    </svg>
  );
}

function MiniBar({ value, color }) {
  return (
    <div className="h-1.5 flex-1 bg-[#0F172A] rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${value}%`, backgroundColor: color }} />
    </div>
  );
}

function ProductTab({ product, isSelected, onClick }) {
  const d = DECISION_STYLE[product.decision];
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left border transition-all duration-200 w-full ${
        isSelected
          ? `${d.bg} ${d.border} ring-1 ${d.border} ring-offset-1 ring-offset-[#020817]`
          : "bg-[#0A0F1A] border-[#1E293B] hover:border-[#334155]"
      }`}
    >
      <span className="text-xl shrink-0">{product.emoji}</span>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-white truncate">{product.name}</p>
        <p className="text-[10px] text-[#475569]">{product.category}</p>
      </div>
      <div className={`text-[10px] font-black px-2 py-1 rounded-lg border ${d.bg} ${d.border} ${d.color} shrink-0`}>
        {d.label}
      </div>
    </button>
  );
}

function EvalDetail({ product, onConfirm, onOverride }) {
  const d = DECISION_STYLE[product.decision];
  const r = RISK_STYLE[product.riskLevel];
  const u = UMS_STYLE[product.umsStrength];
  const [overrideNote, setOverrideNote] = useState("");
  const [showOverride, setShowOverride] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const scoreColors = {
    demandScore:     "#38BDF8",
    competitionScore:"#A78BFA",
    marginScore:     "#4ADE80",
    riskScore:       "#F59E0B",
  };

  const profitLeverColor = (score) =>
    score >= 75 ? "#4ADE80" : score >= 55 ? "#F59E0B" : "#F87171";

  return (
    <div className="space-y-5">

      {/* Decision Header */}
      <div className={`rounded-2xl border p-6 shadow-xl ${d.bg} ${d.border} ${d.glow}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <ScoreRing score={product.viabilityScore} size={88} decision={product.decision} />
            <div>
              <p className="text-[10px] text-[#475569] uppercase tracking-widest mb-1">Viability Score</p>
              <div className={`text-3xl font-black tracking-tight ${d.color}`}>{product.verdict}</div>
              <p className="text-xs text-[#64748B] mt-1">{product.name} · {product.category}</p>
            </div>
          </div>
          <div className="text-right space-y-2">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold ${r.bg} ${r.border} ${r.color}`}>
              {product.riskLevel === "low" ? "🟢" : product.riskLevel === "medium" ? "🟡" : "🔴"} {r.label}
            </div>
            <div className="block">
              <span className={`text-xs font-bold ${u.color}`}>{u.label}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Score Pillars */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Market Demand",  key: "demandScore",      icon: "📈", color: scoreColors.demandScore },
          { label: "Competition",    key: "competitionScore", icon: "⚔️", color: scoreColors.competitionScore },
          { label: "Margin Health",  key: "marginScore",      icon: "💰", color: scoreColors.marginScore },
          { label: "Risk Score",     key: "riskScore",        icon: "🛡️", color: scoreColors.riskScore },
        ].map(({ label, key, icon, color }) => (
          <div key={key} className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#475569] font-semibold">{icon} {label}</span>
              <span className="text-sm font-black" style={{ color }}>{product[key]}</span>
            </div>
            <MiniBar value={product[key]} color={color} />
          </div>
        ))}
      </div>

      {/* Financials */}
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5">
        <p className="text-xs font-bold text-[#475569] uppercase tracking-widest mb-4">💰 Financial Projection</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            ["Selling Price",    `$${product.sellingPrice}`, "text-white"],
            ["Landed COGS",      `$${product.landedCost}`,   "text-[#F59E0B]"],
            ["Gross Margin",     `${product.grossMargin}%`,  "text-[#4ADE80]"],
            ["Est. CAC",         `$${product.estimatedCAC}`, "text-[#38BDF8]"],
            ["Est. AOV",         `$${product.estimatedAOV}`, "text-white"],
            ["Break-even ROAS",  `${product.breakEvenROAS}x`,"text-[#A78BFA]"],
            ["Projected ROAS",   `${product.projectedROAS}x`,
              product.projectedROAS >= product.breakEvenROAS ? "text-[#4ADE80]" : "text-[#F87171]"],
          ].map(([label, val, color]) => (
            <div key={label} className="bg-[#0A0F1A] border border-[#1E293B] rounded-xl px-3 py-2.5">
              <p className="text-[9px] text-[#334155] uppercase tracking-widest mb-1">{label}</p>
              <p className={`text-sm font-bold ${color}`}>{val}</p>
            </div>
          ))}
        </div>

        {/* ROAS verdict */}
        <div className={`mt-3 flex gap-2 items-start rounded-xl px-4 py-3 border ${
          product.projectedROAS >= product.breakEvenROAS
            ? "bg-[#052E16] border-[#16A34A]" : "bg-[#2D0A0A] border-[#EF4444]"
        }`}>
          <span>{product.projectedROAS >= product.breakEvenROAS ? "✅" : "⚠️"}</span>
          <p className="text-xs leading-relaxed" style={{ color: product.projectedROAS >= product.breakEvenROAS ? "#86EFAC" : "#FCA5A5" }}>
            Projected ROAS ({product.projectedROAS}x) is{" "}
            {product.projectedROAS >= product.breakEvenROAS ? "above" : "below"} break-even ({product.breakEvenROAS}x).{" "}
            {product.projectedROAS >= product.breakEvenROAS
              ? "Campaign is financially viable to launch."
              : "Campaign likely unprofitable without margin improvement or AOV increase."}
          </p>
        </div>
      </div>

      {/* UMS Assessment */}
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-[#475569] uppercase tracking-widest">🎯 UMS Assessment</p>
          <span className={`text-xs font-bold ${u.color}`}>{u.label}</span>
        </div>
        <p className="text-sm text-[#94A3B8] leading-relaxed">{product.umsNote}</p>
      </div>

      {/* Cert flags */}
      {product.certFlags.length > 0 && (
        <div className="bg-[#1C1200] border border-[#92400E] rounded-2xl p-4 flex gap-3 items-start">
          <span className="text-lg shrink-0">⚠️</span>
          <div>
            <p className="text-xs font-bold text-[#F59E0B] mb-2 uppercase tracking-widest">Certification Flags</p>
            {product.certFlags.map((f, i) => (
              <p key={i} className="text-xs text-[#D97706] leading-relaxed">• {f}</p>
            ))}
          </div>
        </div>
      )}

      {/* Emotional Motivators */}
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5">
        <p className="text-xs font-bold text-[#475569] uppercase tracking-widest mb-3">🧠 Emotional Motivator Coverage</p>
        <div className="flex flex-wrap gap-2">
          {product.emotionalCoverage.map((e) => (
            <span key={e} className="text-xs text-[#A78BFA] bg-[#150D2E] border border-[#6D28D9] px-3 py-1.5 rounded-lg">
              {e}
            </span>
          ))}
        </div>
        {product.emotionalCoverage.length < 3 && (
          <p className="text-[11px] text-[#F59E0B] mt-2">
            ⚠️ Only {product.emotionalCoverage.length} emotional angle{product.emotionalCoverage.length > 1 ? "s" : ""} found — harder to sustain multiple ad creatives.
          </p>
        )}
      </div>

      {/* 6 Profit Levers */}
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5">
        <p className="text-xs font-bold text-[#475569] uppercase tracking-widest mb-4">⭐ 6 Profit Levers Analysis</p>
        <div className="space-y-4">
          {product.profitLevers.map((lever, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-[#94A3B8] font-semibold">{lever.lever}</span>
                <span className="text-xs font-black" style={{ color: profitLeverColor(lever.score) }}>
                  {lever.score}/100
                </span>
              </div>
              <div className="h-1.5 w-full bg-[#0A0F1A] rounded-full overflow-hidden mb-1.5">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${lever.score}%`, backgroundColor: profitLeverColor(lever.score) }}
                />
              </div>
              <p className="text-[10px] text-[#475569] leading-relaxed">{lever.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Decision Actions */}
      <div className="bg-[#0A1628] border border-[#1E3A5F] rounded-2xl p-5 space-y-3">
        <p className="text-xs font-bold text-[#475569] uppercase tracking-widest">
          ✅ Confirm Decision — {product.name}
        </p>

        {confirmed ? (
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${d.bg} ${d.border}`}>
            <span className="text-lg">{product.decision === "go" ? "✅" : "❌"}</span>
            <p className={`text-sm font-bold ${d.color}`}>
              Decision confirmed: {product.verdict} — {product.decision === "go" ? "Proceeding to Sourcing Agent" : "Product removed from pipeline"}
            </p>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => { setConfirmed(true); onConfirm(product.id, product.decision); }}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] ${
                product.decision === "go"
                  ? "bg-[#16A34A] hover:bg-[#15803D] text-white"
                  : "bg-[#EF4444] hover:bg-[#DC2626] text-white"
              }`}
            >
              {product.decision === "go" ? "✓ Confirm GO — Proceed to Sourcing" : "✕ Confirm NO-GO — Remove Product"}
            </button>
            <button
              onClick={() => setShowOverride(!showOverride)}
              className="px-4 py-3 rounded-xl text-xs font-semibold text-[#64748B] border border-[#1E293B] hover:border-[#334155] hover:text-[#94A3B8] transition-all"
            >
              Override
            </button>
          </div>
        )}

        {showOverride && !confirmed && (
          <div className="space-y-2">
            <textarea
              value={overrideNote}
              onChange={(e) => setOverrideNote(e.target.value)}
              placeholder='Override reason, e.g. "I know this niche — proceed despite low UMS score"'
              rows={2}
              className="w-full bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-3 text-xs text-white placeholder-[#334155] focus:outline-none focus:border-[#3B82F6] resize-none transition-colors"
            />
            <div className="flex gap-2">
              <button
                onClick={() => { setConfirmed(true); onOverride(product.id, overrideNote); setShowOverride(false); }}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-[#6366F1] hover:bg-[#4F46E5] text-white transition-all"
              >
                Override & Proceed
              </button>
              <button
                onClick={() => { setShowOverride(false); setOverrideNote(""); }}
                className="px-4 py-2.5 rounded-xl text-xs text-[#64748B] border border-[#1E293B] hover:border-[#334155] transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default function EvaluationAgentScreen({ onBack, onProceed }) {
  const [selectedId, setSelectedId] = useState(1);
  const [decisions, setDecisions] = useState({});
  const [toast, setToast] = useState(null);

  const showToast = (msg, color = "#4ADE80") => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3000);
  };

  const handleConfirm = (id, decision) => {
    setDecisions((prev) => ({ ...prev, [id]: decision }));
    showToast(
      decision === "go"
        ? "✓ GO confirmed — product moves to Sourcing Agent"
        : "✕ NO-GO confirmed — product removed from pipeline",
      decision === "go" ? "#4ADE80" : "#F87171"
    );
  };

  const handleOverride = (id, note) => {
    setDecisions((prev) => ({ ...prev, [id]: "go" }));
    showToast("🔄 Override applied — proceeding despite agent recommendation", "#A78BFA");
  };

  const confirmedCount = Object.keys(decisions).length;
  const goCount = Object.values(decisions).filter(d => d === "go").length;
  const selectedProduct = MOCK_EVALUATIONS.find(p => p.id === selectedId);

  return (
    <div className="min-h-screen bg-[#020817] text-white font-['Sora',sans-serif]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');`}</style>

      {/* Toast */}
      {toast && (
        <div
          className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl text-sm font-semibold shadow-xl border transition-all duration-300"
          style={{ backgroundColor: "#0A0F1A", borderColor: toast.color, color: toast.color }}
        >
          {toast.msg}
        </div>
      )}

      {/* Navbar */}
      <div className="sticky top-0 z-40 bg-[#020817]/95 backdrop-blur-sm border-b border-[#0F172A]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-[#475569] hover:text-white text-xs border border-[#1E293B] hover:border-[#334155] px-3 py-1.5 rounded-lg transition-all">
              ← Dashboard
            </button>
            <div className="h-4 w-px bg-[#1E293B]" />
            <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-widest">ECOS</span>
            <span className="text-[#334155] text-xs">›</span>
            <span className="text-xs text-[#64748B]">Agent 2</span>
            <span className="text-[#334155] text-xs">›</span>
            <span className="text-xs text-white font-semibold">Evaluation Agent</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#64748B]">
              {confirmedCount}/{MOCK_EVALUATIONS.length} confirmed · {goCount} GO
            </span>
            <button
              disabled={goCount === 0}
              onClick={onProceed}
              className={`text-xs font-bold px-4 py-2 rounded-lg transition-all ${
                goCount > 0
                  ? "bg-[#16A34A] hover:bg-[#15803D] text-white hover:scale-105 active:scale-95"
                  : "bg-[#0F172A] text-[#334155] border border-[#1E293B] cursor-not-allowed"
              }`}
            >
              Proceed to Sourcing Agent →
            </button>
          </div>
        </div>
        <div className="h-[2px] bg-[#0F172A]">
          <div
            className="h-full bg-gradient-to-r from-[#3B82F6] to-[#6366F1] transition-all duration-700"
            style={{ width: `${(confirmedCount / MOCK_EVALUATIONS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-[#3B82F6] text-xs font-bold uppercase tracking-[0.2em] mb-2">
            <span className="w-5 h-px bg-[#3B82F6]" />
            Agent 2 · Checkpoint Review
          </div>
          <h1 className="text-2xl font-bold text-white">Evaluation Agent Output</h1>
          <p className="text-xs text-[#64748B] mt-1">
            {MOCK_EVALUATIONS.length} products evaluated · Review Go/No-Go decisions and confirm to proceed
          </p>
        </div>

        {/* Summary bar */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: "GO",     value: MOCK_EVALUATIONS.filter(p => p.decision === "go").length,   color: "text-[#4ADE80]", bg: "bg-[#052E16]",  border: "border-[#16A34A]" },
            { label: "NO-GO",  value: MOCK_EVALUATIONS.filter(p => p.decision === "nogo").length, color: "text-[#F87171]", bg: "bg-[#2D0A0A]",  border: "border-[#EF4444]" },
            { label: "Avg Score", value: Math.round(MOCK_EVALUATIONS.reduce((a, p) => a + p.viabilityScore, 0) / MOCK_EVALUATIONS.length), color: "text-[#A78BFA]", bg: "bg-[#150D2E]", border: "border-[#6D28D9]" },
          ].map(({ label, value, color, bg, border }) => (
            <div key={label} className={`${bg} ${border} border rounded-xl px-4 py-3 flex items-center justify-between`}>
              <span className="text-xs text-[#475569] font-semibold uppercase tracking-widest">{label}</span>
              <span className={`text-xl font-black ${color}`}>{value}</span>
            </div>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">

          {/* LEFT — Product tabs */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-[#334155] uppercase tracking-widest px-1 mb-3">Evaluated Products</p>
            {MOCK_EVALUATIONS.map((product) => (
              <ProductTab
                key={product.id}
                product={product}
                isSelected={selectedId === product.id}
                onClick={() => setSelectedId(product.id)}
              />
            ))}
          </div>

          {/* RIGHT — Eval detail */}
          <div>
            <p className="text-[10px] font-bold text-[#334155] uppercase tracking-widest px-1 mb-3">
              Evaluation Report — {selectedProduct?.name}
            </p>
            {selectedProduct && (
              <EvalDetail
                product={selectedProduct}
                onConfirm={handleConfirm}
                onOverride={handleOverride}
              />
            )}
          </div>

        </div>
      </div>
    </div>
  );
}