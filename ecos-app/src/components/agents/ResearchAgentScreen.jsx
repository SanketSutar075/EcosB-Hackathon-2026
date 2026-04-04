// FILE: src/components/agents/ResearchAgentScreen.jsx

import { useState } from "react";

// ── Mock data matching ECOS Research Agent output format ──
const MOCK_PRODUCTS = [
  {
    id: 1,
    rank: 1,
    name: "Posture Corrector Pro",
    category: "Health & Wellness",
    emoji: "🦴",
    trendScore: 94,
    demandSignal: "Viral on TikTok — 180M+ views on #PostureFix",
    sellingPrice: 49,
    estimatedCOGS: 8,
    margin: 84,
    competitors: 12,
    adLongevity: "6+ months",
    sources: ["TikTok", "Amazon", "Reddit"],
    status: "approved",
    avatar: {
      name: "Office Worker",
      age: "28–45",
      pain: "Chronic neck & back pain from desk work",
      motivation: "Fear of long-term spinal damage",
    },
    painPoints: [
      "\"My neck hurts so bad after 8 hours at my desk\"",
      "\"I've tried everything — chiropractor costs a fortune\"",
      "\"I look hunched in every photo and I hate it\"",
    ],
    failedSolutions: ["Foam rollers", "Physio visits ($$$)", "YouTube stretches"],
    emotionalLanguage: ["\"fix my posture\"", "\"stop the pain\"", "\"feel confident again\""],
  },
  {
    id: 2,
    rank: 2,
    name: "Magnetic Phone Mount (Dashboard)",
    category: "Automotive",
    emoji: "🚗",
    trendScore: 87,
    demandSignal: "Steady Google Trends growth — 3× YoY",
    sellingPrice: 39,
    estimatedCOGS: 4,
    margin: 90,
    competitors: 28,
    adLongevity: "12+ months",
    sources: ["Amazon", "Google Trends", "Meta Ads"],
    status: "approved",
    avatar: {
      name: "Daily Commuter",
      age: "25–50",
      pain: "Phone falling off existing mounts while driving",
      motivation: "Safety + convenience",
    },
    painPoints: [
      "\"My phone keeps falling off while I'm navigating\"",
      "\"Existing mounts scratch my phone\"",
      "\"Cable management is a nightmare in my car\"",
    ],
    failedSolutions: ["Suction cup mounts", "Vent clip holders", "Dashboard sticky pads"],
    emotionalLanguage: ["\"just works\"", "\"finally a mount that stays\"", "\"clean setup\""],
  },
  {
    id: 3,
    rank: 3,
    name: "Foldable Laptop Stand",
    category: "Home Office",
    emoji: "💻",
    trendScore: 79,
    demandSignal: "Rising in Remote Work searches post-2023",
    sellingPrice: 35,
    estimatedCOGS: 6,
    margin: 83,
    competitors: 41,
    adLongevity: "8+ months",
    sources: ["Amazon", "Reddit", "TikTok"],
    status: "pending",
    avatar: {
      name: "Remote Worker / Student",
      age: "20–38",
      pain: "Neck strain from looking down at laptop all day",
      motivation: "Ergonomic setup on a budget",
    },
    painPoints: [
      "\"My neck is destroyed from looking down at my MacBook\"",
      "\"Expensive standing desks aren't an option for me\"",
      "\"I work from cafes — need something portable\"",
    ],
    failedSolutions: ["Book stacks", "Bulky adjustable stands", "External monitors"],
    emotionalLanguage: ["\"portable\"", "\"works anywhere\"", "\"saved my neck\""],
  },
  {
    id: 4,
    rank: 4,
    name: "LED Sunset Lamp",
    category: "Home Decor",
    emoji: "🌅",
    trendScore: 71,
    demandSignal: "TikTok aesthetic trend — cyclical but consistent",
    sellingPrice: 29,
    estimatedCOGS: 5,
    margin: 83,
    competitors: 55,
    adLongevity: "4+ months",
    sources: ["TikTok", "Instagram", "Etsy"],
    status: "rejected",
    rejectReason: "High competition (55+ active advertisers). Trend is cyclical — risk of saturation.",
    avatar: {
      name: "Young Aesthetic Creator",
      age: "16–28",
      pain: "Boring room / bad lighting for content",
      motivation: "Aesthetic upgrade + content creation",
    },
    painPoints: [
      "\"My room looks so boring on camera\"",
      "\"Harsh overhead lighting ruins my photos\"",
    ],
    failedSolutions: ["Ring lights", "String lights", "Regular lamps"],
    emotionalLanguage: ["\"vibe\"", "\"aesthetic\"", "\"golden hour\""],
  },
];

const STATUS_STYLE = {
  approved: { label: "Approved", color: "text-[#4ADE80]", bg: "bg-[#052E16]", border: "border-[#16A34A]", dot: "bg-[#4ADE80]" },
  pending:  { label: "Pending Review", color: "text-[#F59E0B]", bg: "bg-[#1C1200]", border: "border-[#92400E]", dot: "bg-[#F59E0B] animate-pulse" },
  rejected: { label: "Rejected", color: "text-[#F87171]", bg: "bg-[#2D0A0A]", border: "border-[#EF4444]", dot: "bg-[#EF4444]" },
};

const CHECKLIST_ITEMS = [
  "Laser-targeted avatar identified",
  "Urgent, painful problem confirmed",
  "Emotional impact mapped",
  "UMP (Unique Marketing Position) found",
  "UMS (Unique Marketing Solution) validated",
  "USPs documented",
  "Buying psychology triggers identified",
  "Customer testimonials / success stories found",
  "Failed solutions catalogued",
  "Market-specific knowledge applied",
];

function ScoreBar({ value, color = "#3B82F6" }) {
  return (
    <div className="h-1.5 w-full bg-[#0F172A] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  );
}

function ProductCard({ product, isSelected, onClick }) {
  const s = STATUS_STYLE[product.status];
  const marginColor = product.margin >= 70 ? "#4ADE80" : product.margin >= 50 ? "#F59E0B" : "#F87171";

  return (
    <div
      onClick={onClick}
      className={`
        rounded-2xl border p-4 cursor-pointer transition-all duration-200
        ${isSelected
          ? "bg-[#0F2650] border-[#3B82F6] ring-1 ring-[#3B82F6] ring-offset-1 ring-offset-[#020817]"
          : "bg-[#0A0F1A] border-[#1E293B] hover:border-[#334155]"
        }
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xl border ${isSelected ? "border-[#1E3A5F] bg-[#0C1F3D]" : "border-[#1E293B] bg-[#0F172A]"}`}>
            {product.emoji}
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[10px] font-bold text-[#334155] uppercase tracking-widest">#{product.rank}</span>
              <span className="text-[10px] text-[#334155]">·</span>
              <span className="text-[10px] text-[#475569]">{product.category}</span>
            </div>
            <h3 className="text-sm font-bold text-white leading-tight">{product.name}</h3>
          </div>
        </div>
        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[10px] font-bold ${s.bg} ${s.border} ${s.color} shrink-0`}>
          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
          {s.label}
        </div>
      </div>

      <p className="text-[11px] text-[#64748B] mb-3 leading-relaxed">{product.demandSignal}</p>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-lg px-2 py-1.5 text-center">
          <p className="text-xs font-bold text-white">${product.sellingPrice}</p>
          <p className="text-[9px] text-[#475569] uppercase tracking-wider">Price</p>
        </div>
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-lg px-2 py-1.5 text-center">
          <p className="text-xs font-bold" style={{ color: marginColor }}>{product.margin}%</p>
          <p className="text-[9px] text-[#475569] uppercase tracking-wider">Margin</p>
        </div>
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-lg px-2 py-1.5 text-center">
          <p className="text-xs font-bold text-white">{product.trendScore}</p>
          <p className="text-[9px] text-[#475569] uppercase tracking-wider">Trend</p>
        </div>
      </div>

      <ScoreBar value={product.trendScore} color={product.trendScore > 85 ? "#4ADE80" : product.trendScore > 70 ? "#F59E0B" : "#F87171"} />

      {product.status === "rejected" && product.rejectReason && (
        <p className="text-[10px] text-[#F87171] mt-2 leading-relaxed">⚠️ {product.rejectReason}</p>
      )}

      {isSelected && (
        <p className="text-[10px] text-[#3B82F6] mt-2 font-semibold">← Viewing research doc</p>
      )}
    </div>
  );
}

function ResearchDoc({ product, onApprove, onReject, onRetry }) {
  const [retryNote, setRetryNote] = useState("");
  const [showRetry, setShowRetry] = useState(false);
  const [checklistDone] = useState(CHECKLIST_ITEMS.map((_, i) => i < 8)); // 8/10 checked

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="bg-[#0A1628] border border-[#1E3A5F] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{product.emoji}</span>
            <div>
              <p className="text-[10px] text-[#3B82F6] font-bold uppercase tracking-widest mb-0.5">Research Document</p>
              <h2 className="text-xl font-bold text-white">{product.name}</h2>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">{product.trendScore}<span className="text-sm text-[#475569]">/100</span></p>
            <p className="text-[10px] text-[#475569] uppercase tracking-widest">Trend Score</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {product.sources.map(s => (
            <span key={s} className="text-[10px] bg-[#0F172A] border border-[#1E293B] text-[#64748B] px-2 py-1 rounded-md">{s}</span>
          ))}
        </div>
      </div>

      {/* Customer Avatar */}
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5">
        <p className="text-xs font-bold text-[#475569] uppercase tracking-widest mb-3">👤 Customer Avatar</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            ["Name", product.avatar.name],
            ["Age Range", product.avatar.age],
            ["Core Pain", product.avatar.pain],
            ["Motivation", product.avatar.motivation],
          ].map(([label, val]) => (
            <div key={label} className="bg-[#0A0F1A] border border-[#1E293B] rounded-xl p-3">
              <p className="text-[9px] text-[#334155] uppercase tracking-widest mb-1">{label}</p>
              <p className="text-xs text-white font-semibold leading-snug">{val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pain Points — verbatim */}
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5">
        <p className="text-xs font-bold text-[#475569] uppercase tracking-widest mb-3">💬 Verbatim Customer Language</p>
        <p className="text-[10px] text-[#334155] mb-3">Raw from Amazon reviews, Reddit & forums — never paraphrased</p>
        <div className="space-y-2">
          {product.painPoints.map((p, i) => (
            <div key={i} className="flex gap-3 items-start bg-[#0A0F1A] border border-[#1E293B] rounded-xl px-4 py-3">
              <span className="text-[#3B82F6] text-sm shrink-0">"</span>
              <p className="text-sm text-[#C4B5FD] italic leading-relaxed">{p.replace(/^"|"$/g, "")}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Failed Solutions */}
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5">
        <p className="text-xs font-bold text-[#475569] uppercase tracking-widest mb-3">❌ Failed Solutions (Competitors)</p>
        <div className="flex flex-wrap gap-2">
          {product.failedSolutions.map((s) => (
            <span key={s} className="text-xs text-[#F87171] bg-[#2D0A0A] border border-[#7F1D1D] px-3 py-1.5 rounded-lg">✕ {s}</span>
          ))}
        </div>
      </div>

      {/* Emotional Language */}
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5">
        <p className="text-xs font-bold text-[#475569] uppercase tracking-widest mb-3">🎯 High-Converting Emotional Language</p>
        <div className="flex flex-wrap gap-2">
          {product.emotionalLanguage.map((l) => (
            <span key={l} className="text-xs text-[#4ADE80] bg-[#052E16] border border-[#16A34A] px-3 py-1.5 rounded-lg font-mono">{l}</span>
          ))}
        </div>
      </div>

      {/* 10-Item Research Checklist */}
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-[#475569] uppercase tracking-widest">⭐ 10-Item Research Checklist</p>
          <span className="text-xs font-bold text-[#4ADE80]">{checklistDone.filter(Boolean).length}/10</span>
        </div>
        <div className="space-y-2">
          {CHECKLIST_ITEMS.map((item, i) => (
            <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${checklistDone[i] ? "bg-[#052E16]" : "bg-[#0A0F1A]"}`}>
              <span className={`text-sm shrink-0 ${checklistDone[i] ? "text-[#4ADE80]" : "text-[#334155]"}`}>
                {checklistDone[i] ? "✓" : "○"}
              </span>
              <span className={`text-xs ${checklistDone[i] ? "text-[#86EFAC]" : "text-[#475569]"}`}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Financials */}
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5">
        <p className="text-xs font-bold text-[#475569] uppercase tracking-widest mb-3">💰 Financial Snapshot</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            ["Selling Price", `$${product.sellingPrice}`, "text-white"],
            ["Est. COGS", `$${product.estimatedCOGS}`, "text-[#F59E0B]"],
            ["Gross Margin", `${product.margin}%`, "text-[#4ADE80]"],
            ["Active Competitors", product.competitors, "text-[#38BDF8]"],
            ["Ad Longevity", product.adLongevity, "text-white"],
            ["Trend Score", `${product.trendScore}/100`, "text-[#A78BFA]"],
          ].map(([label, val, color]) => (
            <div key={label} className="bg-[#0A0F1A] border border-[#1E293B] rounded-xl px-3 py-2.5">
              <p className="text-[9px] text-[#334155] uppercase tracking-widest mb-1">{label}</p>
              <p className={`text-sm font-bold ${color}`}>{val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="bg-[#0A1628] border border-[#1E3A5F] rounded-2xl p-5 space-y-3">
        <p className="text-xs font-bold text-[#475569] uppercase tracking-widest">🔍 Your Decision</p>
        <div className="flex gap-3">
          <button
            onClick={() => onApprove(product.id)}
            className="flex-1 py-3 rounded-xl text-sm font-bold bg-[#16A34A] hover:bg-[#15803D] text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            ✓ Approve & Send to Evaluation
          </button>
          <button
            onClick={() => onReject(product.id)}
            className="px-4 py-3 rounded-xl text-sm font-bold border border-[#EF4444] text-[#F87171] hover:bg-[#2D0A0A] transition-all"
          >
            Reject
          </button>
        </div>

        {/* Retry with feedback */}
        {!showRetry ? (
          <button
            onClick={() => setShowRetry(true)}
            className="w-full py-2.5 rounded-xl text-xs font-semibold text-[#64748B] border border-[#1E293B] hover:border-[#334155] hover:text-[#94A3B8] transition-all"
          >
            🔄 Retry Research with Feedback
          </button>
        ) : (
          <div className="space-y-2">
            <textarea
              value={retryNote}
              onChange={(e) => setRetryNote(e.target.value)}
              placeholder='e.g. "Focus more on the pain angle, find more Reddit threads, check AliExpress pricing"'
              rows={3}
              className="w-full bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-3 text-xs text-white placeholder-[#334155] focus:outline-none focus:border-[#3B82F6] resize-none transition-colors"
            />
            <div className="flex gap-2">
              <button
                onClick={() => { onRetry(product.id, retryNote); setShowRetry(false); setRetryNote(""); }}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-[#6366F1] hover:bg-[#4F46E5] text-white transition-all"
              >
                🔄 Re-run Research Agent
              </button>
              <button
                onClick={() => { setShowRetry(false); setRetryNote(""); }}
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

export default function ResearchAgentScreen({ onBack, onApproveAll, onProceed }) {
  const [selectedId, setSelectedId] = useState(1);
  const [productStatuses, setProductStatuses] = useState(
    Object.fromEntries(MOCK_PRODUCTS.map(p => [p.id, p.status]))
  );
  const [toast, setToast] = useState(null);

  const showToast = (msg, color = "#4ADE80") => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3000);
  };

  const handleApprove = (id) => {
    setProductStatuses(prev => ({ ...prev, [id]: "approved" }));
    showToast("✓ Product approved — sending to Evaluation Agent");
  };

  const handleReject = (id) => {
    setProductStatuses(prev => ({ ...prev, [id]: "rejected" }));
    showToast("✕ Product rejected", "#F87171");
  };

  const handleRetry = (id, note) => {
    showToast(`🔄 Re-running research with your feedback…`, "#A78BFA");
  };

  const approvedCount = Object.values(productStatuses).filter(s => s === "approved").length;
  const selectedProduct = MOCK_PRODUCTS.find(p => p.id === selectedId);

  // Merge live statuses into products
  const products = MOCK_PRODUCTS.map(p => ({ ...p, status: productStatuses[p.id] }));

  return (
    <div className="min-h-screen bg-[#020817] text-white font-['Sora',sans-serif]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');`}</style>

      {/* Toast */}
      {toast && (
        <div
          className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl text-sm font-semibold shadow-xl border transition-all"
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
            <span className="text-xs text-[#64748B]">Agent 1</span>
            <span className="text-[#334155] text-xs">›</span>
            <span className="text-xs text-white font-semibold">Research Agent</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#64748B]">{approvedCount} of {MOCK_PRODUCTS.length} approved</span>
            <button
              onClick={() => { if (onProceed) onProceed(); else if (onApproveAll) onApproveAll(); }}
              disabled={approvedCount === 0}
              className={`text-xs font-bold px-4 py-2 rounded-lg transition-all ${
                approvedCount > 0
                  ? "bg-[#16A34A] hover:bg-[#15803D] text-white hover:scale-105 active:scale-95"
                  : "bg-[#0F172A] text-[#334155] border border-[#1E293B] cursor-not-allowed"
              }`}
            >
              Send to Evaluation Agent →
            </button>
          </div>
        </div>
        <div className="h-[2px] bg-[#0F172A]">
          <div className="h-full bg-gradient-to-r from-[#3B82F6] to-[#6366F1] transition-all duration-700"
            style={{ width: `${(approvedCount / MOCK_PRODUCTS.length) * 100}%` }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Page header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-[#3B82F6] text-xs font-bold uppercase tracking-[0.2em] mb-2">
            <span className="w-5 h-px bg-[#3B82F6]" />
            Agent 1 · Checkpoint Review
          </div>
          <h1 className="text-2xl font-bold text-white">Research Agent Output</h1>
          <p className="text-xs text-[#64748B] mt-1">
            {MOCK_PRODUCTS.length} products found · Review each research document and approve products to send to the Evaluation Agent
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">

          {/* LEFT — Product shortlist */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold text-[#334155] uppercase tracking-widest px-1">Product Shortlist</p>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isSelected={selectedId === product.id}
                onClick={() => setSelectedId(product.id)}
              />
            ))}
          </div>

          {/* RIGHT — Research doc */}
          <div>
            <p className="text-[10px] font-bold text-[#334155] uppercase tracking-widest px-1 mb-3">
              Research Document — {selectedProduct?.name}
            </p>
            {selectedProduct && (
              <ResearchDoc
                product={{ ...selectedProduct, status: productStatuses[selectedProduct.id] }}
                onApprove={handleApprove}
                onReject={handleReject}
                onRetry={handleRetry}
              />
            )}
          </div>

        </div>
      </div>
    </div>
  );
}