// FILE: src/components/agents/RemainingAgentScreens.jsx
// Contains: Sourcing, Landing Page, Creative, Ad Launch, Tracking, Email & LTV, Optimization

import { useState } from "react";
import RevenueChart from "../charts/RevenueChart"; // ← RevenueChart import

// ── Shared components ──────────────────────────────────────────────
function NavBar({ agentNum, agentName, onBack, rightContent }) {
  return (
    <div className="sticky top-0 z-40 bg-[#020817]/95 backdrop-blur-sm border-b border-[#0F172A]">
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-[#475569] hover:text-white text-xs border border-[#1E293B] hover:border-[#334155] px-3 py-1.5 rounded-lg transition-all">← Dashboard</button>
          <div className="h-4 w-px bg-[#1E293B]" />
          <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-widest">ECOS</span>
          <span className="text-[#334155] text-xs">›</span>
          <span className="text-xs text-[#64748B]">Agent {agentNum}</span>
          <span className="text-[#334155] text-xs">›</span>
          <span className="text-xs text-white font-semibold">{agentName}</span>
        </div>
        {rightContent}
      </div>
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5">
      <p className="text-[10px] font-bold text-[#475569] uppercase tracking-widest mb-4">{title}</p>
      {children}
    </div>
  );
}

function ApproveBar({ onApprove, onBack, proceedLabel, disabled = false }) {
  const [done, setDone] = useState(false);
  return done ? (
    <div className="flex items-center gap-3 bg-[#052E16] border border-[#16A34A] rounded-2xl px-5 py-4">
      <span className="text-xl">✅</span>
      <p className="text-sm font-bold text-[#4ADE80]">Approved — proceeding to next agent</p>
    </div>
  ) : (
    <div className="bg-[#0A1628] border border-[#1E3A5F] rounded-2xl p-5 flex gap-3">
      <button onClick={() => { setDone(true); onApprove?.(); }}
        className="flex-1 py-3 rounded-xl text-sm font-bold bg-[#16A34A] hover:bg-[#15803D] text-white transition-all hover:scale-[1.02] active:scale-[0.98]">
        ✓ Approve & {proceedLabel}
      </button>
      <button className="px-4 py-3 rounded-xl text-sm text-[#64748B] border border-[#1E293B] hover:border-[#334155] transition-all">
        🔄 Retry
      </button>
      <button className="px-4 py-3 rounded-xl text-sm text-[#64748B] border border-[#1E293B] hover:border-[#334155] transition-all">
        ✏️ Edit
      </button>
    </div>
  );
}

function StatGrid({ items }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {items.map(([label, value, color]) => (
        <div key={label} className="bg-[#0A0F1A] border border-[#1E293B] rounded-xl px-3 py-2.5">
          <p className="text-[9px] text-[#334155] uppercase tracking-widest mb-1">{label}</p>
          <p className={`text-sm font-bold ${color || "text-white"}`}>{value}</p>
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// AGENT 3 — SOURCING
// ══════════════════════════════════════════════════════════════════
const SUPPLIERS = [
  { id: 1, name: "Shenzhen PostureTech Co.", platform: "Alibaba",    unitCost: 5.20, moq: 100, shippingDays: "12–16", defectRate: "1.2%", rating: 4.8, verified: true,  recommended: true  },
  { id: 2, name: "Guangzhou HealthGear Ltd", platform: "1688",       unitCost: 4.80, moq: 200, shippingDays: "14–18", defectRate: "2.1%", rating: 4.5, verified: true,  recommended: false },
  { id: 3, name: "AliExpress Direct",        platform: "AliExpress", unitCost: 6.90, moq: 1,   shippingDays: "18–25", defectRate: "3.4%", rating: 4.2, verified: false, recommended: false },
];

export function SourcingAgentScreen({ onBack, onProceed }) {
  const [selected, setSelected] = useState(1);
  const supplier   = SUPPLIERS.find(s => s.id === selected);
  const landedCost = (supplier.unitCost + 1.8 + 0.9).toFixed(2);
  const margin     = (((49 - landedCost) / 49) * 100).toFixed(0);

  return (
    <div className="min-h-screen bg-[#020817] text-white font-['Sora',sans-serif]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');`}</style>
      <NavBar agentNum={3} agentName="Sourcing Agent" onBack={onBack} />

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-[#3B82F6] text-xs font-bold uppercase tracking-[0.2em] mb-2">
            <span className="w-5 h-px bg-[#3B82F6]" /> Agent 3 · Auto
          </div>
          <h1 className="text-2xl font-bold text-white">Sourcing Agent Output</h1>
          <p className="text-xs text-[#64748B] mt-1">🦴 Posture Corrector Pro · {SUPPLIERS.length} suppliers found & compared</p>
        </div>

        <SectionCard title="📦 Supplier Comparison">
          <div className="space-y-3">
            {SUPPLIERS.map(s => (
              <div key={s.id} onClick={() => setSelected(s.id)}
                className={`flex items-center gap-4 rounded-xl p-4 border cursor-pointer transition-all duration-200 ${
                  selected === s.id ? "bg-[#0F2650] border-[#3B82F6]" : "bg-[#0A0F1A] border-[#1E293B] hover:border-[#334155]"
                }`}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-white">{s.name}</span>
                    {s.recommended && <span className="text-[9px] font-bold text-[#4ADE80] bg-[#052E16] border border-[#16A34A] px-1.5 py-0.5 rounded">⭐ Recommended</span>}
                    {s.verified    && <span className="text-[9px] text-[#38BDF8] bg-[#0C2337] border border-[#0369A1] px-1.5 py-0.5 rounded">Verified</span>}
                  </div>
                  <span className="text-[10px] text-[#475569]">{s.platform}</span>
                </div>
                <div className="grid grid-cols-4 gap-4 shrink-0">
                  {[["Unit Cost", `$${s.unitCost}`, "text-[#F59E0B]"], ["MOQ", s.moq, "text-white"], ["Ship", s.shippingDays, "text-white"], ["Defect", s.defectRate, s.defectRate > "2%" ? "text-[#F87171]" : "text-[#4ADE80]"]].map(([l, v, c]) => (
                    <div key={l} className="text-center">
                      <p className={`text-xs font-bold ${c}`}>{v}</p>
                      <p className="text-[9px] text-[#334155]">{l}</p>
                    </div>
                  ))}
                </div>
                {selected === s.id && <span className="text-[#3B82F6] text-sm shrink-0">✓</span>}
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="💰 Landed Cost Breakdown — Selected Supplier">
          <StatGrid items={[
            ["Unit Cost (FOB)", `$${supplier.unitCost}`, "text-[#F59E0B]"],
            ["Shipping (DDP)",  "$1.80",                 "text-white"      ],
            ["Packaging",       "$0.90",                 "text-white"      ],
            ["Total Landed",    `$${landedCost}`,        "text-[#F87171]"  ],
            ["Selling Price",   "$49.00",                "text-white"      ],
            ["Gross Margin",    `${margin}%`,            "text-[#4ADE80]"  ],
          ]} />
          <div className="mt-4 bg-[#052E16] border border-[#16A34A] rounded-xl px-4 py-3">
            <p className="text-xs text-[#86EFAC]">💡 COGs negotiation opportunity: committing to 500 units/month could reduce unit cost to ~$3.80 — saving <span className="font-bold text-[#4ADE80]">$360K/year</span> at scale.</p>
          </div>
        </SectionCard>

        <ApproveBar onApprove={onProceed} proceedLabel="Proceed to Content Agent" />
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// AGENT 5 — LANDING PAGE BUILDER
// ══════════════════════════════════════════════════════════════════
const FUNNEL_LAYERS = [
  { id: "advertorial", label: "Layer 1 · Advertorial",       icon: "📰", desc: "Warm traffic page — story-driven, educational, no hard sell", status: "built", ctr: "4.2%"  },
  { id: "sales",       label: "Layer 2 · Sales / Offer Page",icon: "🛒", desc: "Present the product, overcome objections, present the offer",   status: "built", ctr: "11.8%" },
  { id: "checkout",    label: "Layer 3 · Checkout",          icon: "💳", desc: "Minimal friction, trust badges, social proof before payment",    status: "built", ctr: "68.4%" },
];

const CHECKOUT_ELEMENTS = [
  ["✅", "Social proof directly before payment button"],
  ["✅", "Pre-selected best-value bundle (3-pack)"],
  ["✅", "Trust badges (SSL, 60-day guarantee, free returns)"],
  ["✅", "Visible shipping & return policy inline"],
  ["✅", "Minimal form fields (name, email, card, address)"],
  ["✅", "Progress indicator (3 steps)"],
  ["✅", "Post-purchase upsell — Lumbar Cushion +£29"],
];

export function LandingPageBuilderScreen({ onBack, onProceed }) {
  const [activeLayer, setActiveLayer] = useState("advertorial");

  return (
    <div className="min-h-screen bg-[#020817] text-white font-['Sora',sans-serif]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');`}</style>
      <NavBar agentNum={5} agentName="Landing Page Builder" onBack={onBack} />

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-[#3B82F6] text-xs font-bold uppercase tracking-[0.2em] mb-2">
            <span className="w-5 h-px bg-[#3B82F6]" /> Agent 5 · Checkpoint
          </div>
          <h1 className="text-2xl font-bold text-white">Landing Page Builder Output</h1>
          <p className="text-xs text-[#64748B] mt-1">🦴 Posture Corrector Pro · 3-layer funnel built on Shopify</p>
        </div>

        <SectionCard title="🏗️ 3-Layer Funnel Architecture">
          <div className="space-y-3 mb-4">
            {FUNNEL_LAYERS.map((l, i) => (
              <div key={l.id}>
                <div onClick={() => setActiveLayer(l.id)}
                  className={`flex items-center gap-4 rounded-xl p-4 border cursor-pointer transition-all ${
                    activeLayer === l.id ? "bg-[#0F2650] border-[#3B82F6]" : "bg-[#0A0F1A] border-[#1E293B] hover:border-[#334155]"
                  }`}>
                  <span className="text-2xl">{l.icon}</span>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-white">{l.label}</p>
                    <p className="text-[10px] text-[#64748B] mt-0.5">{l.desc}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-[#4ADE80]">{l.ctr}</p>
                    <p className="text-[9px] text-[#475569]">Conv. Rate</p>
                  </div>
                  <span className="text-[10px] text-[#4ADE80] bg-[#052E16] border border-[#16A34A] px-2 py-1 rounded shrink-0">✓ Built</span>
                </div>
                {i < FUNNEL_LAYERS.length - 1 && (
                  <div className="flex justify-center py-1">
                    <span className="text-[#334155] text-sm">↓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="💳 Checkout Optimisation Checklist">
          <div className="space-y-2">
            {CHECKOUT_ELEMENTS.map(([icon, text]) => (
              <div key={text} className="flex items-center gap-3 bg-[#052E16] border border-[#16A34A] rounded-lg px-4 py-2.5">
                <span className="text-sm shrink-0">{icon}</span>
                <p className="text-xs text-[#86EFAC]">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-[#0A1628] border border-[#1E3A5F] rounded-xl px-4 py-3">
            <p className="text-xs text-[#93C5FD]">💡 Built bottom-up: Checkout optimised first → Offer Page → Advertorial. A broken checkout wastes every click above it.</p>
          </div>
        </SectionCard>

        <ApproveBar onApprove={onProceed} proceedLabel="Proceed to Creative Agent" />
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// AGENT 6 — CREATIVE
// ══════════════════════════════════════════════════════════════════
const CREATIVES = [
  { id: 1, angle: "Pain Angle",    hook: "pain",     format: "UGC Video · 30s",       platform: "Meta + TikTok",   headline: "\"My neck was ruined after 3 years WFH\"",                       thumb: "😣", status: "approved", tests: ["2x speed ✓", "10-metre ✓", "360p ✓"] },
  { id: 2, angle: "Result-Driven", hook: "result",   format: "Static Image + Copy",   platform: "Meta",            headline: "23° posture improvement — clinical proof",                       thumb: "📊", status: "approved", tests: ["2x speed ✓", "10-metre ✓", "360p ✓"] },
  { id: 3, angle: "Aspiration",    hook: "audience", format: "VSL · 60s",             platform: "Meta + YouTube",  headline: "For the WFH pro who refuses to let their desk ruin their health", thumb: "🏆", status: "pending",  tests: ["2x speed ✓", "10-metre ✗", "360p ✓"] },
];

export function CreativeAgentScreen({ onBack, onProceed }) {
  const [selected, setSelected] = useState(1);
  const creative = CREATIVES.find(c => c.id === selected);
  const approved = CREATIVES.filter(c => c.status === "approved").length;

  return (
    <div className="min-h-screen bg-[#020817] text-white font-['Sora',sans-serif]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');`}</style>
      <NavBar agentNum={6} agentName="Creative Agent" onBack={onBack}
        rightContent={<span className="text-xs text-[#64748B]">{approved}/3 creatives approved</span>} />

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-[#3B82F6] text-xs font-bold uppercase tracking-[0.2em] mb-2">
            <span className="w-5 h-px bg-[#3B82F6]" /> Agent 6 · Checkpoint
          </div>
          <h1 className="text-2xl font-bold text-white">Creative Agent Output</h1>
          <p className="text-xs text-[#64748B] mt-1">3 creatives · 3 angles · Winner Ad Formula applied</p>
        </div>

        <div className="flex items-center gap-2 bg-[#0C2337] border border-[#0369A1] rounded-xl px-4 py-3 flex-wrap">
          <span className="text-xs text-[#38BDF8] font-bold">Winner Ad Formula:</span>
          {["Hook", "Problem", "Solutions", "Benefits", "Trust", "CTA/Offer"].map((s, i, arr) => (
            <span key={s} className="flex items-center gap-1">
              <span className="text-[10px] text-[#38BDF8] bg-[#0F172A] border border-[#0369A1] px-2 py-0.5 rounded">{s}</span>
              {i < arr.length - 1 && <span className="text-[#1E3A5F] text-xs">→</span>}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
          <div className="space-y-2">
            {CREATIVES.map(c => {
              const st = c.status === "approved"
                ? { color: "text-[#4ADE80]", bg: "bg-[#052E16]",  border: "border-[#16A34A]", dot: "bg-[#4ADE80]"              }
                : { color: "text-[#F59E0B]", bg: "bg-[#1C1200]",  border: "border-[#92400E]", dot: "bg-[#F59E0B] animate-pulse" };
              return (
                <button key={c.id} onClick={() => setSelected(c.id)}
                  className={`w-full flex items-center gap-3 rounded-xl p-3 border text-left transition-all ${
                    selected === c.id ? "bg-[#0F2650] border-[#3B82F6]" : "bg-[#0A0F1A] border-[#1E293B] hover:border-[#334155]"
                  }`}>
                  <span className="text-2xl">{c.thumb}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white truncate">{c.angle}</p>
                    <p className="text-[10px] text-[#475569]">{c.format}</p>
                  </div>
                  <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded border text-[9px] font-bold ${st.bg} ${st.border} ${st.color} shrink-0`}>
                    <span className={`w-1 h-1 rounded-full ${st.dot}`} />{c.status}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="space-y-4">
            <div className="bg-[#0A0F1A] border border-[#1E293B] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-[#475569] mb-1">{creative.angle} · {creative.format}</p>
                  <p className="text-base font-bold text-white leading-snug">{creative.headline}</p>
                </div>
                <span className="text-4xl">{creative.thumb}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] text-[#64748B] bg-[#0F172A] border border-[#1E293B] px-2 py-1 rounded">{creative.platform}</span>
                <span className="text-[10px] text-[#64748B] bg-[#0F172A] border border-[#1E293B] px-2 py-1 rounded">Hook: {creative.hook}</span>
              </div>
            </div>

            <SectionCard title="🧪 Quality Tests (2x Speed · 10-Metre · 360p)">
              <div className="grid grid-cols-3 gap-3">
                {creative.tests.map(t => {
                  const pass = t.includes("✓");
                  return (
                    <div key={t} className={`rounded-xl px-3 py-3 border text-center ${pass ? "bg-[#052E16] border-[#16A34A]" : "bg-[#2D0A0A] border-[#EF4444]"}`}>
                      <p className={`text-lg font-bold ${pass ? "text-[#4ADE80]" : "text-[#F87171]"}`}>{pass ? "✓" : "✗"}</p>
                      <p className={`text-[10px] ${pass ? "text-[#86EFAC]" : "text-[#FCA5A5]"}`}>{t.replace(" ✓", "").replace(" ✗", "")}</p>
                    </div>
                  );
                })}
              </div>
              {creative.tests.some(t => t.includes("✗")) && (
                <div className="mt-3 bg-[#1C1200] border border-[#92400E] rounded-xl px-4 py-3">
                  <p className="text-xs text-[#D97706]">⚠️ Failed 10-metre test — recommend increasing headline font size before launch.</p>
                </div>
              )}
            </SectionCard>

            <ApproveBar onApprove={onProceed} proceedLabel="Proceed to Ad Launch" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// AGENT 7 — AD LAUNCH
// ══════════════════════════════════════════════════════════════════
const CAMPAIGNS = [
  { platform: "Meta",          icon: "📘", type: "CBO Testing",          structure: "3 ad sets · 3 angles · £50/day",             budget: "£150/day", status: "live",      note: "Manual CPC → Target CPA after 30 conversions"       },
  { platform: "TikTok",        icon: "🎵", type: "Spark Ads",            structure: "2 ad sets · UGC formats · £30/day",           budget: "£60/day",  status: "live",      note: "Platform-native creative formats only"              },
  { platform: "Google Search", icon: "🔍", type: "Brand + Converting KWs",structure: "Branded campaign separate from Pmax",        budget: "£40/day",  status: "live",      note: "Manual CPC — never mix branded in Pmax"             },
  { platform: "Google Pmax",   icon: "🎯", type: "Performance Max",      structure: "20+ images, 3 videos, 5+ headlines",          budget: "£80/day",  status: "live",      note: "Auto budget rules set to prevent overspend"         },
  { platform: "YouTube",       icon: "▶️", type: "Remarketing",          structure: "Repurposed Meta winners · In-market audiences",budget: "£25/day",  status: "scheduled", note: "Launch after 7 days Meta data collected"            },
];

const RETARGETING = [
  { days: "0–3 days",   angle: "\"Saved for You\"",   desc: "Gentle reminder, no discount"    },
  { days: "3–7 days",   angle: "\"Still Thinking?\"", desc: "Social proof + mild urgency"     },
  { days: "7–14 days",  angle: "\"Last Chance\"",     desc: "Final urgency + incentive"       },
];

export function AdLaunchAgentScreen({ onBack, onProceed }) {
  const totalBudget = CAMPAIGNS.filter(c => c.status === "live").reduce((a, c) => a + parseInt(c.budget), 0);

  return (
    <div className="min-h-screen bg-[#020817] text-white font-['Sora',sans-serif]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');`}</style>
      <NavBar agentNum={7} agentName="Ad Launch Agent" onBack={onBack} />

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-[#3B82F6] text-xs font-bold uppercase tracking-[0.2em] mb-2">
            <span className="w-5 h-px bg-[#3B82F6]" /> Agent 7 · Auto
          </div>
          <h1 className="text-2xl font-bold text-white">Ad Launch Agent Output</h1>
          <p className="text-xs text-[#64748B] mt-1">5 campaigns across Meta, TikTok & Google · £{totalBudget}/day total</p>
        </div>

        <SectionCard title="🚀 Campaign Structure">
          <div className="space-y-3">
            {CAMPAIGNS.map(c => (
              <div key={c.platform} className={`flex items-start gap-4 rounded-xl p-4 border ${
                c.status === "live" ? "bg-[#052E16] border-[#16A34A]" : "bg-[#0F172A] border-[#1E293B]"
              }`}>
                <span className="text-2xl shrink-0">{c.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-bold text-white">{c.platform}</p>
                    <span className="text-[9px] text-[#334155]">·</span>
                    <p className="text-xs text-[#64748B]">{c.type}</p>
                    <span className={`ml-auto text-[9px] font-bold px-2 py-0.5 rounded border ${
                      c.status === "live"
                        ? "text-[#4ADE80] bg-[#052E16] border-[#16A34A]"
                        : "text-[#F59E0B] bg-[#1C1200] border-[#92400E]"
                    }`}>{c.status === "live" ? "🟢 Live" : "⏳ Scheduled"}</span>
                  </div>
                  <p className="text-[10px] text-[#64748B] mb-1">{c.structure}</p>
                  <p className="text-[10px] text-[#475569] italic">{c.note}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-[#F59E0B]">{c.budget}</p>
                  <p className="text-[9px] text-[#334155]">daily</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="🔄 Time-Segmented Retargeting">
          <div className="space-y-2">
            {RETARGETING.map(r => (
              <div key={r.days} className="flex items-center gap-4 bg-[#0A0F1A] border border-[#1E293B] rounded-xl px-4 py-3">
                <span className="text-xs font-bold text-[#A78BFA] shrink-0 w-20">{r.days}</span>
                <span className="text-sm font-bold text-white">{r.angle}</span>
                <span className="text-xs text-[#64748B]">— {r.desc}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <div className="bg-[#0A1628] border border-[#1E3A5F] rounded-2xl p-4 flex gap-3 items-start">
          <span>✅</span>
          <p className="text-xs text-[#93C5FD]">All campaigns launched. No action required — this agent runs autonomously. Optimization Agent will monitor ROAS and scale winners after day 3.</p>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// AGENT 8 — TRACKING
// ══════════════════════════════════════════════════════════════════
const TRACKING_ITEMS = [
  { platform: "Meta Pixel + CAPI",       icon: "📘", accuracy: "~85%",                    status: "installed", events: ["ViewContent", "AddToCart", "InitiateCheckout", "Purchase"]            },
  { platform: "TikTok Pixel + SSE",      icon: "🎵", accuracy: "~82%",                    status: "installed", events: ["ViewContent", "AddToCart", "Purchase"]                               },
  { platform: "Google Tag Manager",      icon: "🏷️", accuracy: "~99%",                    status: "installed", events: ["All events via GTM dataLayer"]                                       },
  { platform: "Google Merchant Center",  icon: "🛒", accuracy: "Feed quality: 94%",        status: "installed", events: ["Product feed synced to Shopify"]                                     },
  { platform: "Funnel Analytics",        icon: "📊", accuracy: "Separate from ad platforms",status: "installed", events: ["Ad Click → Funnel → Advertorial CTR → Offer CTR → Checkout Conv."] },
];

export function TrackingAgentScreen({ onBack, onProceed }) {
  return (
    <div className="min-h-screen bg-[#020817] text-white font-['Sora',sans-serif]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');`}</style>
      <NavBar agentNum={8} agentName="Tracking Agent" onBack={onBack} />

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-[#3B82F6] text-xs font-bold uppercase tracking-[0.2em] mb-2">
            <span className="w-5 h-px bg-[#3B82F6]" /> Agent 8 · Auto
          </div>
          <h1 className="text-2xl font-bold text-white">Tracking Agent Output</h1>
          <p className="text-xs text-[#64748B] mt-1">Full attribution stack installed · 5 platforms tracked</p>
        </div>

        <SectionCard title="📡 Tracking Stack">
          <div className="space-y-3">
            {TRACKING_ITEMS.map(t => (
              <div key={t.platform} className="flex items-start gap-4 bg-[#052E16] border border-[#16A34A] rounded-xl p-4">
                <span className="text-2xl shrink-0">{t.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-bold text-white">{t.platform}</p>
                    <span className="text-[9px] text-[#4ADE80] bg-[#052E16] border border-[#16A34A] px-2 py-0.5 rounded font-bold">✓ Installed</span>
                    <span className="ml-auto text-xs font-bold text-[#4ADE80]">{t.accuracy}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {t.events.map(e => (
                      <span key={e} className="text-[9px] text-[#475569] bg-[#0F172A] border border-[#1E293B] px-2 py-0.5 rounded">{e}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <div className="bg-[#0A1628] border border-[#1E3A5F] rounded-2xl p-4 flex gap-3">
          <span>💡</span>
          <p className="text-xs text-[#93C5FD] leading-relaxed">GTM + next-step-button setup pushes Meta tracking accuracy from ~85% toward 99%. Always use Analytics tab for funnel optimisation decisions.</p>
        </div>
        <div className="bg-[#0A1628] border border-[#1E3A5F] rounded-2xl p-4 flex gap-3 items-start">
          <span>✅</span>
          <p className="text-xs text-[#93C5FD]">All tracking installed and verified. No action required — this agent runs autonomously.</p>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// AGENT 9 — EMAIL & LTV
// ══════════════════════════════════════════════════════════════════
const EMAIL_FLOWS = [
  { name: "Welcome Series",        icon: "👋", emails: 3, trigger: "New subscriber",               status: "live", note: "Brand story + first-purchase incentive"          },
  { name: "Browse Abandonment",    icon: "👀", emails: 2, trigger: "Viewed product, no cart",      status: "live", note: "Soft reminder, no discount"                      },
  { name: "Cart Abandonment",      icon: "🛒", emails: 3, trigger: "Added to cart, no checkout",   status: "live", note: "Social proof → urgency → incentive"              },
  { name: "Checkout Abandonment",  icon: "💳", emails: 5, trigger: "Started checkout, no purchase",status: "live", note: "5-email sequence — never discount in Email 1"    },
  { name: "Instant Upsell",        icon: "⚡", emails: 1, trigger: "Post-purchase (0–30 min)",     status: "live", note: "Lumbar cushion bundle offer"                     },
  { name: "Post-Purchase Nurture", icon: "📦", emails: 4, trigger: "7 days post-purchase",         status: "live", note: "Usage education, reduce refunds"                 },
  { name: "Winback",               icon: "🔄", emails: 3, trigger: "90 days inactive",             status: "live", note: "Re-engagement with new offer"                   },
  { name: "Sunset",                icon: "🌅", emails: 1, trigger: "180 days inactive",            status: "live", note: "List hygiene — suppress unresponsive contacts"   },
];

const ABANDONMENT_SEQUENCE = [
  { num: 1, subject: "You left something behind…",           note: "Reminder only — no discount. Most convert here.", angle: "Reminder"  },
  { num: 2, subject: "14,000 people can't be wrong",         note: "Social proof + mild urgency",                     angle: "Proof"     },
  { num: 3, subject: "Here's 10% off — just for you",        note: "Small discount incentive",                        angle: "Incentive" },
  { num: 4, subject: "Last chance — offer expires tonight",   note: "Final urgency",                                   angle: "Urgency"   },
  { num: 5, subject: "Quick question — what stopped you?",    note: "Qualitative research email — builds trust",       angle: "Research"  },
];

export function EmailAgentScreen({ onBack, onProceed }) {
  return (
    <div className="min-h-screen bg-[#020817] text-white font-['Sora',sans-serif]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');`}</style>
      <NavBar agentNum={9} agentName="Email & LTV Agent" onBack={onBack} />

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-[#3B82F6] text-xs font-bold uppercase tracking-[0.2em] mb-2">
            <span className="w-5 h-px bg-[#3B82F6]" /> Agent 9 · Checkpoint
          </div>
          <h1 className="text-2xl font-bold text-white">Email & LTV Agent Output</h1>
          <p className="text-xs text-[#64748B] mt-1">8 automated Klaviyo flows · {EMAIL_FLOWS.reduce((a, f) => a + f.emails, 0)} emails total</p>
        </div>

        <SectionCard title="📧 8 Automated Flows">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {EMAIL_FLOWS.map(f => (
              <div key={f.name} className="flex items-start gap-3 bg-[#052E16] border border-[#16A34A] rounded-xl p-3">
                <span className="text-xl shrink-0">{f.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-xs font-bold text-white">{f.name}</p>
                    <span className="text-[9px] text-[#4ADE80] font-bold ml-2 shrink-0">{f.emails} email{f.emails > 1 ? "s" : ""}</span>
                  </div>
                  <p className="text-[9px] text-[#475569] mb-1">Trigger: {f.trigger}</p>
                  <p className="text-[10px] text-[#64748B] leading-snug">{f.note}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="💳 5-Email Checkout Abandonment Sequence">
          <div className="space-y-2">
            {ABANDONMENT_SEQUENCE.map(e => (
              <div key={e.num} className="flex items-center gap-4 bg-[#0A0F1A] border border-[#1E293B] rounded-xl px-4 py-3">
                <span className="text-xs font-black text-[#3B82F6] w-5 shrink-0">{e.num}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">{e.subject}</p>
                  <p className="text-[10px] text-[#64748B]">{e.note}</p>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded border shrink-0 ${
                  e.angle === "Reminder"  ? "text-[#38BDF8] bg-[#0C2337] border-[#0369A1]"  :
                  e.angle === "Proof"     ? "text-[#A78BFA] bg-[#150D2E] border-[#6D28D9]"  :
                  e.angle === "Incentive" ? "text-[#4ADE80] bg-[#052E16] border-[#16A34A]"  :
                  e.angle === "Urgency"   ? "text-[#F87171] bg-[#2D0A0A] border-[#EF4444]"  :
                                            "text-[#F59E0B] bg-[#1C1200] border-[#92400E]"
                }`}>{e.angle}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 bg-[#0A1628] border border-[#1E3A5F] rounded-xl px-4 py-3">
            <p className="text-xs text-[#93C5FD]">💡 Average cart abandonment is 70%. This 5-email sequence systematically recovers that revenue. Never discount in Email 1 — many customers convert from a simple reminder alone.</p>
          </div>
        </SectionCard>

        <ApproveBar onApprove={onProceed} proceedLabel="Proceed to Optimization" />
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// AGENT 10 — OPTIMIZATION  (RevenueChart added here ✅)
// ══════════════════════════════════════════════════════════════════
const KPI_DATA = [
  { label: "ROAS",                value: "3.2x",   target: "2.5x", trend: "↑" },
  { label: "CTR (Ads)",           value: "3.8%",   target: "2.5%", trend: "↑" },
  { label: "CPA",                 value: "£14.20", target: "£18",  trend: "↑" },
  { label: "AOV",                 value: "£61",    target: "£49",  trend: "↑" },
  { label: "Checkout Conv. Rate", value: "7.2%",   target: "5%",   trend: "↑" },
  { label: "Advertorial CTR",     value: "4.2%",   target: "3%",   trend: "→" },
  { label: "Cart Abandon Rate",   value: "64%",    target: "<70%", trend: "↓" },
  { label: "Defect Rate",         value: "1.1%",   target: "<2%",  trend: "→" },
];

const AB_TESTS = [
  { element: "Headline (Advertorial)", variant_a: "Original pain angle",   variant_b: "Aspirational angle",   winner: "A",  lift: "+12% CTR", status: "complete" },
  { element: "CTA Button Copy",        variant_a: "\"Get Yours Now\"",     variant_b: "\"Fix My Posture\"",   winner: "B",  lift: "+8% conv.", status: "complete" },
  { element: "Price Point",            variant_a: "£49",                    variant_b: "£39 + free shipping", winner: null, lift: "Running",   status: "running"  },
];

export function OptimizationAgentScreen({ onBack }) {
  return (
    <div className="min-h-screen bg-[#020817] text-white font-['Sora',sans-serif]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');`}</style>
      <NavBar agentNum={10} agentName="Optimization Agent" onBack={onBack} />

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-[#3B82F6] text-xs font-bold uppercase tracking-[0.2em] mb-2">
            <span className="w-5 h-px bg-[#3B82F6]" /> Agent 10 · Continuous
          </div>
          <h1 className="text-2xl font-bold text-white">Optimization Agent — Week 1 Report</h1>
          <p className="text-xs text-[#64748B] mt-1">🦴 Posture Corrector Pro · All KPIs above target · Scaling recommended</p>
        </div>

        {/* KPI Dashboard */}
        <SectionCard title="📈 KPI Dashboard">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {KPI_DATA.map(k => (
              <div key={k.label} className="bg-[#052E16] border border-[#16A34A] rounded-xl px-3 py-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[9px] text-[#475569] uppercase tracking-widest">{k.label}</p>
                  <span className="text-[10px] text-[#4ADE80]">{k.trend}</span>
                </div>
                <p className="text-lg font-black text-[#4ADE80]">{k.value}</p>
                <p className="text-[9px] text-[#334155]">Target: {k.target}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── Revenue Chart ── ADDED HERE ✅ */}
        <RevenueChart />

        {/* A/B Tests */}
        <SectionCard title="🧪 A/B Tests — 1 Variable at a Time · 80/20 Split">
          <div className="space-y-3">
            {AB_TESTS.map(t => (
              <div key={t.element} className={`rounded-xl border p-4 ${t.status === "running" ? "bg-[#0C2337] border-[#0369A1]" : "bg-[#0A0F1A] border-[#1E293B]"}`}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold text-white">{t.element}</p>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                    t.status === "running"
                      ? "text-[#38BDF8] bg-[#0C2337] border-[#0369A1]"
                      : "text-[#4ADE80] bg-[#052E16] border-[#16A34A]"
                  }`}>{t.status === "running" ? "🔵 Running" : "✓ Complete"}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[["A", t.variant_a], ["B", t.variant_b]].map(([v, label]) => (
                    <div key={v} className={`rounded-lg px-3 py-2 border ${t.winner === v ? "bg-[#052E16] border-[#16A34A]" : "bg-[#0F172A] border-[#1E293B]"}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] text-[#475569] font-bold">Variant {v}</span>
                        {t.winner === v && <span className="text-[9px] text-[#4ADE80] font-bold">Winner {t.lift}</span>}
                      </div>
                      <p className="text-xs text-white mt-1">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Scaling recommendations */}
        <div className="bg-[#052E16] border border-[#16A34A] rounded-2xl p-5">
          <p className="text-xs font-bold text-[#4ADE80] uppercase tracking-widest mb-3">🚀 Scaling Recommendation</p>
          <div className="space-y-2">
            {[
              "Increase Meta CBO budget by 20% — Pain Angle is the clear winner at 3.8% CTR",
              "Graduate Google Search from Manual CPC to Target CPA — 47 conversions recorded",
              "Scale winning creative (Variant A) — duplicate ad set with 2× budget",
              "Suppress bottom 20% of ad sets draining budget without conversions",
            ].map(r => (
              <div key={r} className="flex gap-2 items-start">
                <span className="text-[#4ADE80] text-xs shrink-0 mt-0.5">→</span>
                <p className="text-xs text-[#86EFAC] leading-relaxed">{r}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0A1628] border border-[#1E3A5F] rounded-2xl p-4 flex gap-3 items-center">
          <span>🔄</span>
          <p className="text-xs text-[#93C5FD]">Optimization Agent runs continuously. Next report in 7 days. No action required unless you want to override a scaling decision.</p>
        </div>
      </div>
    </div>
  );
}