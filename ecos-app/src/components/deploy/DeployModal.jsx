// FILE: src/components/deploy/DeployModal.jsx
// 1-Click Deploy Simulation — live terminal log scrolling

import { useState, useEffect, useRef } from "react";

const DEPLOY_STAGES = [
  {
    label:    "Initialising ECOS Deploy",
    duration: 600,
    logs: [
      { delay: 0,   text: "› ECOS Deploy v1.0.0 initialised",                        type: "info"    },
      { delay: 200, text: "› Reading wizard config… session_1775043415018",           type: "info"    },
      { delay: 400, text: "✓ Config validated — market: UK · niche: Health & Wellness", type: "success" },
    ],
  },
  {
    label:    "Shopify Store",
    duration: 2200,
    logs: [
      { delay: 0,    text: "› Connecting to Shopify Admin API…",                      type: "info"    },
      { delay: 400,  text: "✓ Authenticated — store: posturepro-uk.myshopify.com",    type: "success" },
      { delay: 700,  text: "› Uploading product: Posture Corrector Pro…",             type: "info"    },
      { delay: 1100, text: "✓ Product live — SKU: PCP-001 · Price: £49.00",          type: "success" },
      { delay: 1400, text: "› Publishing 3-layer funnel pages…",                      type: "info"    },
      { delay: 1800, text: "✓ Advertorial → Sales Page → Checkout published",         type: "success" },
      { delay: 2000, text: "✓ Post-purchase upsell (Lumbar Cushion £29) configured",  type: "success" },
    ],
  },
  {
    label:    "Klaviyo Email Flows",
    duration: 1800,
    logs: [
      { delay: 0,    text: "› Connecting to Klaviyo API…",                             type: "info"    },
      { delay: 300,  text: "✓ Authenticated — list: ECOS-UK-LAUNCH",                  type: "success" },
      { delay: 600,  text: "› Pushing 8 automated flows (22 emails)…",               type: "info"    },
      { delay: 900,  text: "✓ Welcome Series (3 emails) → LIVE",                      type: "success" },
      { delay: 1100, text: "✓ Checkout Abandonment (5 emails) → LIVE",               type: "success" },
      { delay: 1300, text: "✓ Post-Purchase Nurture (4 emails) → LIVE",               type: "success" },
      { delay: 1550, text: "✓ All 8 flows active — 0 errors",                         type: "success" },
    ],
  },
  {
    label:    "Meta Campaigns",
    duration: 2000,
    logs: [
      { delay: 0,    text: "› Connecting to Meta Business Suite…",                    type: "info"    },
      { delay: 350,  text: "✓ Authenticated — Ad Account: act_208419374",            type: "success" },
      { delay: 600,  text: "› Creating CBO campaign: ECOS — UK — Posture Pro…",      type: "info"    },
      { delay: 950,  text: "✓ Campaign created — Budget: £150/day",                  type: "success" },
      { delay: 1150, text: "› Uploading 3 ad creatives (Pain / Result / Aspiration)…", type: "info"  },
      { delay: 1500, text: "✓ Creatives approved by Meta review — 0 rejected",        type: "success" },
      { delay: 1750, text: "⚡ Publishing Meta Campaigns… SUCCESS",                   type: "success" },
    ],
  },
  {
    label:    "TikTok & Google Ads",
    duration: 1800,
    logs: [
      { delay: 0,    text: "› Connecting to TikTok Ads Manager…",                    type: "info"    },
      { delay: 350,  text: "✓ TikTok Spark Ads campaign live — £60/day",             type: "success" },
      { delay: 650,  text: "› Connecting to Google Ads…",                             type: "info"    },
      { delay: 900,  text: "✓ Google Search (Brand + High-Intent) → LIVE",           type: "success" },
      { delay: 1150, text: "✓ Google Pmax (20 assets) → LIVE — Budget: £80/day",     type: "success" },
      { delay: 1500, text: "✓ YouTube Remarketing → Scheduled Day 7",                type: "warning" },
    ],
  },
  {
    label:    "Tracking & Attribution",
    duration: 1400,
    logs: [
      { delay: 0,    text: "› Installing Meta Pixel + CAPI…",                         type: "info"    },
      { delay: 300,  text: "✓ Meta Pixel verified — accuracy: ~85% → ~99% (GTM+)",   type: "success" },
      { delay: 550,  text: "✓ TikTok Pixel + SSE installed",                         type: "success" },
      { delay: 750,  text: "✓ GTM configured — all conversion events firing",         type: "success" },
      { delay: 1000, text: "✓ Google Merchant Center feed quality: 94%",              type: "success" },
      { delay: 1250, text: "✓ Full attribution stack verified — 0 errors",            type: "success" },
    ],
  },
  {
    label:    "Final Checks",
    duration: 1200,
    logs: [
      { delay: 0,    text: "› Running pre-launch checklist…",                         type: "info"    },
      { delay: 250,  text: "✓ Checkout conversion rate: 68.4% — optimised",          type: "success" },
      { delay: 500,  text: "✓ Social proof before payment button — confirmed",        type: "success" },
      { delay: 700,  text: "✓ 60-day guarantee badge — visible",                     type: "success" },
      { delay: 900,  text: "✓ GDPR compliance — double opt-in active",               type: "success" },
      { delay: 1100, text: "🚀 ALL SYSTEMS GO — Product launch LIVE",                type: "launch"  },
    ],
  },
];

const LOG_COLORS = {
  info:    "text-[#64748B]",
  success: "text-[#4ADE80]",
  warning: "text-[#F59E0B]",
  error:   "text-[#F87171]",
  launch:  "text-[#A78BFA] font-bold",
};

const LOG_PREFIX = {
  info:    "",
  success: "",
  warning: "",
  error:   "[ERROR] ",
  launch:  "",
};

export default function DeployModal({ onClose, onDone }) {
  const [logs,         setLogs]         = useState([]);
  const [stageIdx,     setStageIdx]     = useState(0);
  const [done,         setDone]         = useState(false);
  const [stageLabel,   setStageLabel]   = useState("Initialising…");
  const [progress,     setProgress]     = useState(0);
  const bottomRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Run deploy sequence
  useEffect(() => {
    let totalOffset = 0;
    const allTimers = [];
    const totalDuration = DEPLOY_STAGES.reduce((a, s) => a + s.duration, 0);

    DEPLOY_STAGES.forEach((stage, si) => {
      // Update stage label
      const t0 = setTimeout(() => {
        setStageIdx(si);
        setStageLabel(stage.label);
      }, totalOffset);
      allTimers.push(t0);

      // Queue log lines
      stage.logs.forEach(log => {
        const t = setTimeout(() => {
          const elapsed = totalOffset + log.delay;
          setProgress(Math.min(99, Math.round((elapsed / totalDuration) * 100)));
          setLogs(p => [...p, {
            id:   `${si}-${log.delay}-${Math.random()}`,
            text: log.text,
            type: log.type,
            ts:   new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          }]);
        }, totalOffset + log.delay);
        allTimers.push(t);
      });

      totalOffset += stage.duration;
    });

    // Final done
    const tDone = setTimeout(() => {
      setProgress(100);
      setDone(true);
    }, totalOffset + 200);
    allTimers.push(tDone);

    return () => allTimers.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 font-['Sora',sans-serif]"
      onClick={(e) => e.target === e.currentTarget && done && onClose()}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=JetBrains+Mono:wght@400;700&display=swap');`}</style>

      <div className="w-full max-w-2xl bg-[#0A0A0F] border border-[#1E293B] rounded-2xl overflow-hidden shadow-2xl shadow-black/80"
        style={{ animation: "fadeIn 0.2s ease-out" }}>
        <style>{`@keyframes fadeIn { from{opacity:0;transform:scale(0.96)} to{opacity:1;transform:scale(1)} }`}</style>

        {/* Terminal titlebar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#0F0F1A] border-b border-[#1E293B]">
          <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
          <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
          <div className="w-3 h-3 rounded-full bg-[#4ADE80]" />
          <span className="ml-3 text-[11px] text-[#475569] font-['JetBrains_Mono',monospace]">
            ecos-deploy — {stageLabel}
          </span>
          <div className="ml-auto flex items-center gap-2">
            {!done && (
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-ping" />
                <span className="text-[10px] text-[#3B82F6]">Deploying…</span>
              </div>
            )}
            {done && (
              <span className="text-[10px] text-[#4ADE80] font-bold">✓ Deploy Complete</span>
            )}
          </div>
        </div>

        {/* Stage progress */}
        <div className="px-4 py-2 bg-[#0F172A] border-b border-[#1E293B]">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex gap-1">
              {DEPLOY_STAGES.map((s, i) => (
                <div key={s.label}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i < stageIdx  ? "bg-[#4ADE80]" :
                    i === stageIdx ? "bg-[#3B82F6] animate-pulse" :
                                    "bg-[#1E293B]"
                  }`}
                  style={{ width: `${100 / DEPLOY_STAGES.length}%` }}
                />
              ))}
            </div>
            <span className="text-[10px] text-[#475569] font-['JetBrains_Mono',monospace] ml-3 shrink-0">
              {progress}%
            </span>
          </div>
          <div className="flex gap-3 overflow-x-auto">
            {DEPLOY_STAGES.map((s, i) => (
              <span key={s.label} className={`text-[9px] shrink-0 font-semibold ${
                i < stageIdx  ? "text-[#4ADE80]" :
                i === stageIdx ? "text-[#3B82F6]" :
                                "text-[#334155]"
              }`}>
                {i < stageIdx ? "✓ " : i === stageIdx ? "› " : "○ "}{s.label}
              </span>
            ))}
          </div>
        </div>

        {/* Terminal logs */}
        <div className="h-[320px] overflow-y-auto px-4 py-3 bg-[#030308] font-['JetBrains_Mono',monospace]">
          {logs.map(log => (
            <div key={log.id} className="flex gap-3 text-[11px] leading-relaxed mb-0.5">
              <span className="text-[#1E293B] shrink-0 select-none">{log.ts}</span>
              <span className={LOG_COLORS[log.type]}>
                {LOG_PREFIX[log.type]}{log.text}
              </span>
            </div>
          ))}
          {!done && (
            <div className="flex gap-1 items-center mt-1">
              <span className="text-[#3B82F6] text-xs animate-pulse">█</span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Footer */}
        <div className="px-5 py-4 bg-[#0F0F1A] border-t border-[#1E293B] flex items-center justify-between">
          {!done ? (
            <p className="text-xs text-[#475569]">
              ⏳ Deploying stage {stageIdx + 1} of {DEPLOY_STAGES.length} — do not close this window
            </p>
          ) : (
            <div className="flex items-center gap-3 flex-1">
              <div className="flex-1">
                <p className="text-sm font-bold text-[#4ADE80]">🚀 Product Launch Complete — All Systems Live!</p>
                <p className="text-[10px] text-[#64748B] mt-0.5">
                  Shopify ✓ · Klaviyo ✓ · Meta ✓ · TikTok ✓ · Google ✓ · GTM ✓
                </p>
              </div>
              <button onClick={() => { if (onDone) onDone(); else onClose(); }}
                className="px-5 py-2.5 rounded-xl text-sm font-bold bg-[#4ADE80] hover:bg-[#22C55E] text-[#020817] transition-all hover:scale-105 active:scale-95 shrink-0">
                View Launch Report →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}