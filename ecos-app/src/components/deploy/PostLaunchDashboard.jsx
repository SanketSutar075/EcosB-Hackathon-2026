// FILE: src/components/deploy/PostLaunchDashboard.jsx
// Shown after 1-Click Deploy completes — live product dashboard simulation

import { useState, useEffect } from "react";

// ── Animated counter hook ────────────────────────────────────────
function useCounter(target, duration = 1500, prefix = "", suffix = "") {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setValue(target); clearInterval(timer); }
      else setValue(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return `${prefix}${value.toLocaleString()}${suffix}`;
}

// ── Live feed item ───────────────────────────────────────────────
function LiveFeedItem({ icon, text, time, color = "text-[#4ADE80]" }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-[#0F172A] last:border-0">
      <span className="text-base shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-semibold ${color}`}>{text}</p>
        <p className="text-[10px] text-[#334155] mt-0.5">{time}</p>
      </div>
    </div>
  );
}

// ── Platform status card ─────────────────────────────────────────
function PlatformCard({ icon, name, status, metric, metricLabel, color }) {
  return (
    <div className="bg-[#052E16] border border-[#16A34A] rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <span className="text-xs font-bold text-white">{name}</span>
        </div>
        <span className="text-[9px] font-bold text-[#4ADE80] bg-[#052E16] border border-[#16A34A] px-2 py-0.5 rounded-full">
          🟢 {status}
        </span>
      </div>
      <p className={`text-2xl font-black ${color}`}>{metric}</p>
      <p className="text-[10px] text-[#475569] mt-0.5">{metricLabel}</p>
    </div>
  );
}

// ── KPI tile ─────────────────────────────────────────────────────
function KpiTile({ label, value, sub, trend, color }) {
  return (
    <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl px-4 py-3 text-center">
      <p className={`text-2xl font-black ${color}`}>{value}</p>
      <p className="text-[10px] text-[#475569] uppercase tracking-widest mt-0.5">{label}</p>
      {sub && <p className="text-[10px] text-[#334155] mt-1">{sub}</p>}
      {trend && <p className="text-[10px] text-[#4ADE80] mt-1">{trend}</p>}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────
export default function PostLaunchDashboard({ config = {}, onBack }) {
  const [tab,        setTab]        = useState("overview");
  const [liveOrders, setLiveOrders] = useState(3);
  const [elapsed,    setElapsed]    = useState(0);

  // Simulate live orders coming in
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveOrders(p => p + Math.floor(Math.random() * 2));
      setElapsed(p => p + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const revenue  = useCounter(312,  1800, "£");
  const sessions = useCounter(847,  1600, "", "");
  const roas     = useCounter(32,   1400, "", "x").replace("x", ".2x");

  const product = config?.niche?.niche || "Posture Corrector Pro";
  const market  = config?.market?.country || "United Kingdom";

  return (
    <div className="min-h-screen bg-[#020817] text-white font-['Sora',sans-serif]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=JetBrains+Mono:wght@400;700&display=swap');`}</style>

      {/* ── Navbar ── */}
      <div className="sticky top-0 z-40 bg-[#020817]/95 backdrop-blur-sm border-b border-[#0F172A]">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack}
              className="text-[#475569] hover:text-white text-xs border border-[#1E293B] px-3 py-1.5 rounded-lg transition-all cursor-pointer">
              ← Dashboard
            </button>
            <div className="h-4 w-px bg-[#1E293B]" />
            <span className="text-xs font-bold text-[#3B82F6] tracking-widest uppercase">ECOS</span>
            <span className="text-xs text-[#334155]">Post-Launch Monitor</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Live pulse */}
            <div className="flex items-center gap-2 bg-[#052E16] border border-[#16A34A] px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
              <span className="text-[11px] font-bold text-[#4ADE80]">LIVE — Day 1</span>
            </div>
            <span className="text-[10px] text-[#475569] bg-[#0F172A] border border-[#1E293B] px-3 py-1.5 rounded-lg">
              🌍 {market}
            </span>
            {/* Live orders counter */}
            <div className="flex items-center gap-2 bg-[#0A1628] border border-[#1E3A5F] px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-ping" />
              <span className="text-[11px] font-bold text-[#38BDF8]">{liveOrders} orders live</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Hero banner */}
        <div className="mb-8 bg-gradient-to-r from-[#052E16] via-[#0A1628] to-[#150D2E] border border-[#16A34A] rounded-2xl px-6 py-5">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🚀</span>
                <span className="text-xs font-bold text-[#4ADE80] uppercase tracking-widest">Product Launch Live</span>
              </div>
              <h1 className="text-2xl font-black text-white">
                {product === "discover" ? "Your Product" : product} is LIVE
              </h1>
              <p className="text-xs text-[#64748B] mt-1">
                All systems deployed · Shopify ✓ · Meta ✓ · TikTok ✓ · Google ✓ · Klaviyo ✓ · GTM ✓
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#334155] font-mono">Launch timestamp</p>
              <p className="text-sm font-bold text-[#4ADE80] font-['JetBrains_Mono',monospace]">
                {new Date().toLocaleString("en-GB", { day:"2-digit", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" })}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-[#0F172A] pb-3">
          {[
            { id: "overview",   label: "📊 Overview"      },
            { id: "platforms",  label: "🌐 Platforms"     },
            { id: "feed",       label: "⚡ Live Feed"     },
            { id: "nextSteps",  label: "🎯 Next Steps"    },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all cursor-pointer ${
                tab === t.id
                  ? "bg-[#1E3A5F] text-[#38BDF8] border border-[#0369A1]"
                  : "text-[#475569] hover:text-white border border-transparent"
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── TAB: OVERVIEW ── */}
        {tab === "overview" && (
          <div className="space-y-6">
            {/* KPI row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <KpiTile label="Revenue (Day 1)"  value={revenue}    color="text-[#4ADE80]"  trend="↑ above target" />
              <KpiTile label="Sessions"         value={sessions}   color="text-[#38BDF8]"  trend="↑ from paid ads" />
              <KpiTile label="ROAS"             value="3.2x"       color="text-[#A78BFA]"  sub="Target: 2.5x" />
              <KpiTile label="Live Orders"      value={String(liveOrders)} color="text-[#F59E0B]" trend="↑ growing" />
            </div>

            {/* Funnel */}
            <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5">
              <p className="text-[10px] font-bold text-[#475569] uppercase tracking-widest mb-4">📈 Live Conversion Funnel</p>
              <div className="space-y-3">
                {[
                  { label: "Ad Clicks",        value: "847",  pct: 100, color: "bg-[#3B82F6]"  },
                  { label: "Advertorial Read",  value: "356",  pct: 42,  color: "bg-[#6366F1]"  },
                  { label: "Offer Page View",   value: "184",  pct: 22,  color: "bg-[#A78BFA]"  },
                  { label: "Add to Cart",       value: "61",   pct: 7.2, color: "bg-[#F59E0B]"  },
                  { label: "Purchase",          value: String(liveOrders), pct: (liveOrders/847*100).toFixed(1), color: "bg-[#4ADE80]" },
                ].map(f => (
                  <div key={f.label} className="flex items-center gap-3">
                    <span className="text-xs text-[#475569] w-36 shrink-0">{f.label}</span>
                    <div className="flex-1 bg-[#0A0F1A] rounded-full h-2 overflow-hidden">
                      <div className={`h-full ${f.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${f.pct}%` }} />
                    </div>
                    <span className="text-xs font-bold text-white w-10 text-right shrink-0">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ad performance */}
            <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5">
              <p className="text-[10px] font-bold text-[#475569] uppercase tracking-widest mb-4">🎯 Ad Creative Performance</p>
              <div className="space-y-3">
                {[
                  { name: "Pain Angle — UGC Video",     ctr: "4.9%", cpa: "£11.20", spend: "£87",  status: "🏆 Winner",   color: "text-[#4ADE80]" },
                  { name: "Result-Driven — Static",     ctr: "3.2%", cpa: "£16.40", spend: "£52",  status: "✅ Running",   color: "text-[#38BDF8]" },
                  { name: "Aspiration — VSL",           ctr: "1.8%", cpa: "£28.10", spend: "£28",  status: "⚠️ Monitor",  color: "text-[#F59E0B]" },
                ].map(a => (
                  <div key={a.name} className="flex items-center gap-4 bg-[#0A0F1A] border border-[#1E293B] rounded-xl px-4 py-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white truncate">{a.name}</p>
                    </div>
                    <div className="flex gap-4 shrink-0 text-center">
                      {[["CTR", a.ctr, "text-[#4ADE80]"], ["CPA", a.cpa, "text-[#F59E0B]"], ["Spend", a.spend, "text-white"]].map(([l, v, c]) => (
                        <div key={l}>
                          <p className={`text-xs font-bold ${c}`}>{v}</p>
                          <p className="text-[9px] text-[#334155]">{l}</p>
                        </div>
                      ))}
                    </div>
                    <span className={`text-[10px] font-bold ${a.color} shrink-0`}>{a.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: PLATFORMS ── */}
        {tab === "platforms" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <PlatformCard icon="🛒" name="Shopify Store"          status="Live"      metric="£312"   metricLabel="Revenue today"          color="text-[#4ADE80]" />
              <PlatformCard icon="📘" name="Meta Ads"               status="Running"   metric="3.8%"   metricLabel="Average CTR"            color="text-[#38BDF8]" />
              <PlatformCard icon="🎵" name="TikTok Ads"             status="Running"   metric="£60"    metricLabel="Daily budget active"    color="text-[#A78BFA]" />
              <PlatformCard icon="🔍" name="Google Search"          status="Running"   metric="£40"    metricLabel="Daily budget active"    color="text-[#F59E0B]" />
              <PlatformCard icon="📧" name="Klaviyo"                status="Active"    metric="8"      metricLabel="Flows live"             color="text-[#4ADE80]" />
              <PlatformCard icon="🏷️" name="Google Tag Manager"     status="Tracking"  metric="~99%"   metricLabel="Attribution accuracy"   color="text-[#4ADE80]" />
            </div>

            <div className="bg-[#0A1628] border border-[#1E3A5F] rounded-2xl p-4">
              <p className="text-xs text-[#93C5FD]">
                💡 <span className="font-bold">All 6 platforms verified and live.</span> GTM + CAPI setup ensures ~99% tracking accuracy. Klaviyo checkout abandonment sequence will start recovering carts within 2 hours of first abandoned session.
              </p>
            </div>
          </div>
        )}

        {/* ── TAB: LIVE FEED ── */}
        {tab === "feed" && (
          <div className="space-y-4">
            <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
                <p className="text-[10px] font-bold text-[#475569] uppercase tracking-widest">⚡ Live Activity Feed</p>
              </div>
              <div className="space-y-0">
                <LiveFeedItem icon="🛒" text="New order — Posture Corrector Pro × 1 — London, UK" time="Just now" color="text-[#4ADE80]" />
                <LiveFeedItem icon="📧" text="Checkout abandonment email sent — visitor from Meta ad" time="2 min ago" color="text-[#38BDF8]" />
                <LiveFeedItem icon="📘" text="Meta Pain Angle creative — 47 clicks, £0.89 CPC" time="4 min ago" color="text-[#A78BFA]" />
                <LiveFeedItem icon="🛒" text="New order — Posture Corrector Pro + Lumbar Cushion bundle" time="6 min ago" color="text-[#4ADE80]" />
                <LiveFeedItem icon="⭐" text="AOV uplift — Lumbar Cushion upsell accepted — £78 order" time="8 min ago" color="text-[#F59E0B]" />
                <LiveFeedItem icon="🔍" text="Google Search — branded keyword triggered — £0.12 CPC" time="11 min ago" color="text-[#38BDF8]" />
                <LiveFeedItem icon="🎵" text="TikTok Spark Ad — 1,240 impressions — 3.1% CTR" time="14 min ago" color="text-[#A78BFA]" />
                <LiveFeedItem icon="📦" text="Shopify — order fulfilled — Royal Mail tracking generated" time="18 min ago" color="text-[#4ADE80]" />
                <LiveFeedItem icon="📧" text="Welcome email sent to new subscriber from advertorial" time="22 min ago" color="text-[#38BDF8]" />
                <LiveFeedItem icon="🛒" text="New order — Posture Corrector Pro × 2 (gift)" time="25 min ago" color="text-[#4ADE80]" />
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: NEXT STEPS ── */}
        {tab === "nextSteps" && (
          <div className="space-y-4">
            <div className="bg-[#052E16] border border-[#16A34A] rounded-2xl p-5">
              <p className="text-xs font-bold text-[#4ADE80] uppercase tracking-widest mb-4">🎯 Optimization Agent — Day 1 Recommendations</p>
              <div className="space-y-3">
                {[
                  { priority: "P1", action: "Scale Pain Angle Meta budget +20%",              reason: "4.9% CTR — 2× benchmark. Act before CPM rises.", color: "text-[#4ADE80]", bg: "bg-[#052E16] border-[#16A34A]" },
                  { priority: "P2", action: "Monitor Aspiration VSL — pause if CPA > £30",    reason: "Currently £28.10 CPA — marginal. Watch next 24hrs.", color: "text-[#F59E0B]", bg: "bg-[#1C1200] border-[#92400E]" },
                  { priority: "P3", action: "Check Klaviyo cart abandonment flow firing",     reason: "First abandoned sessions expected in next 2 hours.",  color: "text-[#38BDF8]", bg: "bg-[#0A1628] border-[#1E3A5F]" },
                  { priority: "P4", action: "Review Google Search impression share tomorrow", reason: "Manual CPC — needs 30 conversions before Target CPA.", color: "text-[#A78BFA]", bg: "bg-[#150D2E] border-[#6D28D9]" },
                ].map(s => (
                  <div key={s.priority} className={`flex items-start gap-4 ${s.bg} border rounded-xl px-4 py-3`}>
                    <span className={`text-[10px] font-black ${s.color} shrink-0 mt-0.5 w-6`}>{s.priority}</span>
                    <div>
                      <p className="text-xs font-bold text-white">{s.action}</p>
                      <p className="text-[10px] text-[#64748B] mt-0.5">{s.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: "📅", title: "Day 3 Check-in",  desc: "Review Meta learning phase exit. Scale winning ad sets. Check TikTok pacing." },
                { icon: "📅", title: "Day 7 Report",    desc: "Optimization Agent full report. A/B test results. ROAS trend analysis." },
                { icon: "📅", title: "Day 30 Review",   desc: "COGs renegotiation with supplier. Brand search campaign launch. LTV analysis." },
              ].map(item => (
                <div key={item.title} className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-4">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <p className="text-xs font-bold text-white mb-1">{item.title}</p>
                  <p className="text-[10px] text-[#475569] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#0A1628] border border-[#1E3A5F] rounded-2xl p-4 flex gap-3">
              <span className="text-lg shrink-0">🤖</span>
              <p className="text-xs text-[#93C5FD] leading-relaxed">
                <span className="font-bold text-white">ECOS Optimization Agent</span> is now running continuously. It will monitor your ROAS, creative performance, and email flows every 24 hours and surface recommendations automatically. Next full report: <span className="font-bold text-[#38BDF8]">Day 7</span>.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}