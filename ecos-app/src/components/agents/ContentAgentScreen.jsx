// FILE: src/components/agents/ContentAgentScreen.jsx

import { useState } from "react";

// ── Mock Content Agent output ──
const PRODUCT = {
  name: "Posture Corrector Pro",
  emoji: "🦴",
  market: "United Kingdom",
  language: "English",
  avatar: "Office Worker · 28–45",
};

const ADVERTORIAL = {
  headline: "This Embarrassing Office Habit Is Silently Destroying Your Spine — And Most People Don't Realise Until It's Too Late",
  lead: "If you spend more than 4 hours a day at a desk, there's a 73% chance your posture is already causing irreversible micro-damage to your cervical vertebrae. Most people ignore it until the pain becomes unbearable — then they spend thousands on physiotherapy, trying to undo years of neglect.",
  problem: "The modern office has created a silent epidemic. Hunched over laptops, craning necks toward screens, slumping into chairs — we've normalised positions that our spines were never designed to handle for 8+ hours a day. The result? Chronic neck pain. Tension headaches. Rounded shoulders that make you look 10 years older in every photo.",
  agitation: "And the solutions most people try? They fail. Foam rollers feel good for 10 minutes then do nothing. YouTube stretches require discipline most of us don't have after a full workday. Physiotherapy works — but at £80–£120 per session, how many sessions can you really afford? Meanwhile, the damage compounds. Every day you sit without correction is another day the problem gets worse.",
  solution: "The Posture Corrector Pro uses a patented biofeedback tension system — the moment your shoulders begin to round, the device provides gentle resistance that trains your postural muscles to hold correct alignment automatically. No apps. No reminders. No willpower. Just 20 minutes a day for 3 weeks, and your body remembers the correct position on its own.",
  proof: "In a 6-week study of 240 desk workers, 91% reported significant reduction in neck and shoulder pain. Average improvement in posture angle: 23°. Average reduction in tension headache frequency: 67%. Over 14,000 five-star reviews across Amazon UK and Trustpilot.",
  cta: "For the next 48 hours, we're offering the Posture Corrector Pro at our lowest ever UK price — with free next-day delivery and a 60-day no-questions-asked return guarantee. Your spine has already waited long enough.",
};

const AD_ANGLES = [
  {
    id: 1,
    type: "Pain Angle",
    hook_type: "pain",
    emoji: "😣",
    hookTypeLabel: "Pain Hook",
    pavs: true,
    buyerType: "Green (Harmony)",
    headline: "\"My neck was ruined after 3 years WFH. This fixed it in 3 weeks.\"",
    hook: "If your neck still hurts after a full night's sleep — your desk setup is destroying your spine.",
    problem: "8 hours hunched over a laptop. Every. Single. Day. Your cervical spine isn't built for this — and the damage is already happening.",
    agitate: "Physiotherapy costs £90/session. You'll need at least 12. That's over £1,000 to fix what a £39 device could have prevented.",
    validate: "14,000+ UK office workers have already made the switch — and 91% report less pain within 3 weeks.",
    solve: "The Posture Corrector Pro trains your muscles to hold alignment automatically. 20 minutes a day. No apps. No willpower.",
    cta: "Try it free for 60 days →",
    status: "approved",
  },
  {
    id: 2,
    type: "Result-Driven Angle",
    hook_type: "result",
    emoji: "✨",
    hookTypeLabel: "Result Hook",
    pavs: false,
    buyerType: "Blue (Analytical)",
    headline: "23° posture improvement in 3 weeks — backed by peer-reviewed research",
    hook: "What if fixing your posture was as automatic as brushing your teeth?",
    problem: "Most posture solutions require constant conscious effort — which means they fail the moment life gets busy.",
    agitate: "You've tried reminders. You've tried stretches. You start strong for 3 days, then forget. Meanwhile the problem worsens.",
    validate: "Clinical study: 240 participants. 91% pain reduction. 23° average posture improvement. 6-week trial.",
    solve: "Biofeedback tension technology creates muscle memory automatically. Once trained, your body holds alignment on its own — no device needed.",
    cta: "See the clinical data →",
    status: "approved",
  },
  {
    id: 3,
    type: "Aspiration Angle",
    hook_type: "audience",
    emoji: "🏆",
    hookTypeLabel: "Audience Call-out",
    pavs: true,
    buyerType: "Gold (Authority)",
    headline: "For the WFH professional who refuses to let their desk job ruin their health",
    hook: "You've optimised your workflow. Your monitor setup. Your calendar. But have you optimised the one thing that affects everything — your posture?",
    problem: "High performers obsess over productivity tools, morning routines, and supplements. Yet the one physical habit that directly impacts energy, confidence, and longevity gets ignored.",
    agitate: "Rounded shoulders signal low status in every meeting — Zoom or in-person. And the chronic pain drains cognitive resources you could be using elsewhere.",
    validate: "Elite athletes and surgeons use posture correction devices to maintain performance. Now the same technology is available for desk workers.",
    solve: "The Posture Corrector Pro is the performance tool your setup is missing. Wear it 20 minutes daily. Build the posture of someone who owns the room.",
    cta: "Upgrade your setup →",
    status: "pending",
  },
];

const HOOK_TYPES = ["pain", "result", "bold claim", "audience call-out", "pattern breaker"];

const BUYER_TYPES = [
  { type: "Blue", label: "Analytical", desc: "Data, proof, clinical studies", color: "text-[#38BDF8]", bg: "bg-[#0C2337]", border: "border-[#0369A1]" },
  { type: "Green", label: "Harmony", desc: "Community, testimonials, trust", color: "text-[#4ADE80]", bg: "bg-[#052E16]", border: "border-[#16A34A]" },
  { type: "Gold", label: "Authority", desc: "Expert validation, prestige", color: "text-[#F59E0B]", bg: "bg-[#1C1200]", border: "border-[#92400E]" },
  { type: "Orange", label: "Spontaneous", desc: "Excitement, FOMO, bold claims", color: "text-[#FB923C]", bg: "bg-[#1A0A00]", border: "border-[#C2410C]" },
];

const STATUS_STYLE = {
  approved: { label: "Approved", color: "text-[#4ADE80]", bg: "bg-[#052E16]", border: "border-[#16A34A]", dot: "bg-[#4ADE80]" },
  pending:  { label: "Pending",  color: "text-[#F59E0B]", bg: "bg-[#1C1200]", border: "border-[#92400E]", dot: "bg-[#F59E0B] animate-pulse" },
  rejected: { label: "Rejected", color: "text-[#F87171]", bg: "bg-[#2D0A0A]", border: "border-[#EF4444]", dot: "bg-[#EF4444]" },
};

// ── TAB: Advertorial ──
function AdvertorialTab({ status, onApprove, onReject, onRetry }) {
  const [showRetry, setShowRetry] = useState(false);
  const [retryNote, setRetryNote] = useState("");
  const s = STATUS_STYLE[status];

  const sections = [
    { label: "Headline", icon: "🎯", content: ADVERTORIAL.headline, isHeadline: true },
    { label: "Lead / Hook", icon: "🪝", content: ADVERTORIAL.lead },
    { label: "Problem", icon: "😖", content: ADVERTORIAL.problem },
    { label: "Agitation", icon: "🔥", content: ADVERTORIAL.agitation },
    { label: "Solution Introduction", icon: "💡", content: ADVERTORIAL.solution },
    { label: "Proof & Social Proof", icon: "📊", content: ADVERTORIAL.proof },
    { label: "Call to Action", icon: "⚡", content: ADVERTORIAL.cta },
  ];

  return (
    <div className="space-y-4">
      {/* Structure badge */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] text-[#475569] font-bold uppercase tracking-widest">8-Step Advertorial Structure:</span>
        {["Headline","Hook","Problem","Agitation","Solution","Proof","Presentation","CTA"].map((s, i) => (
          <span key={s} className="text-[9px] text-[#334155] bg-[#0F172A] border border-[#1E293B] px-2 py-0.5 rounded">
            {i + 1}. {s}
          </span>
        ))}
      </div>

      {/* Sections */}
      {sections.map(({ label, icon, content, isHeadline }) => (
        <div key={label} className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5">
          <p className="text-[10px] text-[#475569] font-bold uppercase tracking-widest mb-2">{icon} {label}</p>
          <p className={`leading-relaxed text-[#C4B5FD] ${isHeadline ? "text-base font-bold text-white" : "text-sm"}`}>
            {content}
          </p>
        </div>
      ))}

      {/* Actions */}
      <div className="bg-[#0A1628] border border-[#1E3A5F] rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-[#475569] uppercase tracking-widest">Your Decision — Advertorial</p>
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[10px] font-bold ${s.bg} ${s.border} ${s.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />{s.label}
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={onApprove} className="flex-1 py-3 rounded-xl text-sm font-bold bg-[#16A34A] hover:bg-[#15803D] text-white transition-all hover:scale-[1.02] active:scale-[0.98]">
            ✓ Approve Advertorial
          </button>
          <button onClick={onReject} className="px-4 py-3 rounded-xl text-sm font-bold border border-[#EF4444] text-[#F87171] hover:bg-[#2D0A0A] transition-all">
            Reject
          </button>
        </div>
        {!showRetry ? (
          <button onClick={() => setShowRetry(true)} className="w-full py-2.5 rounded-xl text-xs font-semibold text-[#64748B] border border-[#1E293B] hover:border-[#334155] hover:text-[#94A3B8] transition-all">
            🔄 Retry with Feedback
          </button>
        ) : (
          <div className="space-y-2">
            <textarea value={retryNote} onChange={e => setRetryNote(e.target.value)}
              placeholder='e.g. "Make the headline shorter, use a fear angle, add more UK-specific language"'
              rows={2}
              className="w-full bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-3 text-xs text-white placeholder-[#334155] focus:outline-none focus:border-[#3B82F6] resize-none"
            />
            <div className="flex gap-2">
              <button onClick={() => { onRetry(retryNote); setShowRetry(false); setRetryNote(""); }}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-[#6366F1] hover:bg-[#4F46E5] text-white transition-all">
                🔄 Re-run Content Agent
              </button>
              <button onClick={() => { setShowRetry(false); setRetryNote(""); }}
                className="px-4 py-2.5 rounded-xl text-xs text-[#64748B] border border-[#1E293B] hover:border-[#334155] transition-all">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── TAB: Ad Scripts ──
function AdScriptsTab({ angleStatuses, onApprove, onReject, onRetry }) {
  const [selectedAngle, setSelectedAngle] = useState(1);
  const [retryStates, setRetryStates] = useState({});
  const [retryNotes, setRetryNotes] = useState({});

  const angle = AD_ANGLES.find(a => a.id === selectedAngle);
  const s = STATUS_STYLE[angleStatuses[selectedAngle] || angle.status];

  return (
    <div className="space-y-4">
      {/* Angle selector */}
      <div className="grid grid-cols-3 gap-2">
        {AD_ANGLES.map(a => {
          const st = STATUS_STYLE[angleStatuses[a.id] || a.status];
          return (
            <button key={a.id} onClick={() => setSelectedAngle(a.id)}
              className={`flex flex-col items-start gap-1.5 rounded-xl p-3 border text-left transition-all duration-200 ${
                selectedAngle === a.id
                  ? "bg-[#0F2650] border-[#3B82F6] ring-1 ring-[#3B82F6] ring-offset-1 ring-offset-[#020817]"
                  : "bg-[#0A0F1A] border-[#1E293B] hover:border-[#334155]"
              }`}>
              <div className="flex items-center justify-between w-full">
                <span className="text-lg">{a.emoji}</span>
                <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded border text-[9px] font-bold ${st.bg} ${st.border} ${st.color}`}>
                  <span className={`w-1 h-1 rounded-full ${st.dot}`} />{st.label}
                </div>
              </div>
              <p className="text-xs font-bold text-white leading-tight">{a.type}</p>
              <span className="text-[9px] text-[#475569] bg-[#0F172A] border border-[#1E293B] px-1.5 py-0.5 rounded">{a.buyerType}</span>
            </button>
          );
        })}
      </div>

      {/* PAVS badge */}
      {angle.pavs && (
        <div className="flex items-center gap-2 bg-[#0C2337] border border-[#0369A1] rounded-xl px-4 py-2">
          <span className="text-[#38BDF8] text-xs font-bold">PAVS Framework Applied:</span>
          {["Problem", "Agitate", "Validate", "Solve"].map((step, i) => (
            <span key={step} className="flex items-center gap-1">
              <span className="text-[10px] text-[#38BDF8] font-bold bg-[#0F172A] border border-[#0369A1] px-2 py-0.5 rounded">
                {step}
              </span>
              {i < 3 && <span className="text-[#1E3A5F] text-xs">→</span>}
            </span>
          ))}
        </div>
      )}

      {/* Hook type */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-[10px] text-[#475569] uppercase tracking-widest font-bold">Hook Type:</span>
        {HOOK_TYPES.map(h => (
          <span key={h} className={`text-[10px] px-2 py-1 rounded-lg border font-semibold transition-all ${
            h === angle.hook_type
              ? "bg-[#1E3A5F] border-[#3B82F6] text-[#93C5FD]"
              : "bg-[#0F172A] border-[#1E293B] text-[#334155]"
          }`}>{h}</span>
        ))}
      </div>

      {/* Script sections */}
      <div className="bg-[#0A0F1A] border border-[#1E293B] rounded-2xl p-5 space-y-4">
        <div>
          <p className="text-[9px] text-[#475569] uppercase tracking-widest mb-1">Headline</p>
          <p className="text-base font-bold text-white leading-snug">{angle.headline}</p>
        </div>
        {[
          { label: "Hook", content: angle.hook, color: "text-[#C4B5FD]" },
          { label: "Problem (P)", content: angle.problem, color: "text-[#94A3B8]" },
          { label: "Agitate (A)", content: angle.agitate, color: "text-[#FCA5A5]" },
          { label: "Validate (V)", content: angle.validate, color: "text-[#86EFAC]" },
          { label: "Solve (S)", content: angle.solve, color: "text-[#93C5FD]" },
          { label: "CTA", content: angle.cta, color: "text-[#F59E0B]" },
        ].map(({ label, content, color }) => (
          <div key={label} className="border-t border-[#1E293B] pt-3">
            <p className="text-[9px] text-[#334155] uppercase tracking-widest mb-1">{label}</p>
            <p className={`text-sm leading-relaxed ${color}`}>{content}</p>
          </div>
        ))}
      </div>

      {/* Buyer type badge */}
      {(() => {
        const bt = BUYER_TYPES.find(b => angle.buyerType.includes(b.type));
        return bt ? (
          <div className={`flex items-start gap-3 rounded-xl p-4 border ${bt.bg} ${bt.border}`}>
            <span className="text-lg shrink-0">🧠</span>
            <div>
              <p className={`text-xs font-bold ${bt.color} mb-1`}>{bt.type} Buyer Type — {bt.label}</p>
              <p className="text-xs text-[#64748B] leading-relaxed">This script is optimised for {bt.desc.toLowerCase()}.</p>
            </div>
          </div>
        ) : null;
      })()}

      {/* Per-angle actions */}
      <div className="bg-[#0A1628] border border-[#1E3A5F] rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-[#475569] uppercase tracking-widest">Decision — {angle.type}</p>
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[10px] font-bold ${s.bg} ${s.border} ${s.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />{s.label}
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onApprove(angle.id)}
            className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-[#16A34A] hover:bg-[#15803D] text-white transition-all hover:scale-[1.02]">
            ✓ Approve Angle
          </button>
          <button onClick={() => onReject(angle.id)}
            className="px-4 py-2.5 rounded-xl text-xs font-bold border border-[#EF4444] text-[#F87171] hover:bg-[#2D0A0A] transition-all">
            Reject
          </button>
        </div>
        {!retryStates[angle.id] ? (
          <button onClick={() => setRetryStates(p => ({ ...p, [angle.id]: true }))}
            className="w-full py-2 rounded-xl text-xs font-semibold text-[#64748B] border border-[#1E293B] hover:border-[#334155] hover:text-[#94A3B8] transition-all">
            🔄 Retry This Angle with Feedback
          </button>
        ) : (
          <div className="space-y-2">
            <textarea
              value={retryNotes[angle.id] || ""}
              onChange={e => setRetryNotes(p => ({ ...p, [angle.id]: e.target.value }))}
              placeholder='e.g. "Try an aspiration angle instead of pain, warmer tone"'
              rows={2}
              className="w-full bg-[#0F172A] border border-[#334155] rounded-xl px-4 py-3 text-xs text-white placeholder-[#334155] focus:outline-none focus:border-[#3B82F6] resize-none"
            />
            <div className="flex gap-2">
              <button onClick={() => { onRetry(angle.id, retryNotes[angle.id]); setRetryStates(p => ({ ...p, [angle.id]: false })); }}
                className="flex-1 py-2 rounded-xl text-xs font-bold bg-[#6366F1] hover:bg-[#4F46E5] text-white transition-all">
                🔄 Re-run This Angle
              </button>
              <button onClick={() => setRetryStates(p => ({ ...p, [angle.id]: false }))}
                className="px-4 py-2 rounded-xl text-xs text-[#64748B] border border-[#1E293B] transition-all">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── TAB: Buyer Coverage ──
function BuyerCoverageTab() {
  return (
    <div className="space-y-4">
      <div className="bg-[#0A1628] border border-[#1E3A5F] rounded-2xl p-5">
        <p className="text-xs font-bold text-[#3B82F6] uppercase tracking-widest mb-1">4 Buyer Personality Types</p>
        <p className="text-xs text-[#64748B] leading-relaxed">
          Every ad angle is mapped to a buyer type. The full copy package must address all 4 to maximise conversion across audience segments.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {BUYER_TYPES.map(({ type, label, desc, color, bg, border }) => {
          const covered = AD_ANGLES.find(a => a.buyerType.includes(type));
          return (
            <div key={type} className={`rounded-2xl border p-5 ${bg} ${border}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-black ${color}`}>{type}</span>
                  <span className="text-xs text-[#64748B]">— {label}</span>
                </div>
                {covered
                  ? <span className="text-[10px] text-[#4ADE80] bg-[#052E16] border border-[#16A34A] px-2 py-0.5 rounded font-bold">✓ Covered</span>
                  : <span className="text-[10px] text-[#F87171] bg-[#2D0A0A] border border-[#EF4444] px-2 py-0.5 rounded font-bold">Missing</span>
                }
              </div>
              <p className="text-xs text-[#64748B] mb-2">Responds to: {desc}</p>
              {covered && (
                <p className="text-xs text-[#94A3B8] italic leading-relaxed">
                  "{covered.headline}"
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ──
export default function ContentAgentScreen({ onBack, onProceed }) {
  const [activeTab, setActiveTab] = useState("advertorial");
  const [advertorialStatus, setAdvertorialStatus] = useState("pending");
  const [angleStatuses, setAngleStatuses] = useState({ 1: "approved", 2: "approved", 3: "pending" });
  const [toast, setToast] = useState(null);

  const showToast = (msg, color = "#4ADE80") => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3000);
  };

  const approvedAngles = Object.values(angleStatuses).filter(s => s === "approved").length;
  const allDone = advertorialStatus === "approved" && approvedAngles >= 2;

  const TABS = [
    { id: "advertorial", label: "Advertorial", icon: "📄", badge: advertorialStatus === "approved" ? "✓" : null },
    { id: "adscripts",   label: "Ad Scripts",  icon: "🎬", badge: `${approvedAngles}/3` },
    { id: "coverage",    label: "Buyer Types",  icon: "🧠", badge: "4 types" },
  ];

  return (
    <div className="min-h-screen bg-[#020817] text-white font-['Sora',sans-serif]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');`}</style>

      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl text-sm font-semibold shadow-xl border transition-all duration-300"
          style={{ backgroundColor: "#0A0F1A", borderColor: toast.color, color: toast.color }}>
          {toast.msg}
        </div>
      )}

      {/* Navbar */}
      <div className="sticky top-0 z-40 bg-[#020817]/95 backdrop-blur-sm border-b border-[#0F172A]">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-[#475569] hover:text-white text-xs border border-[#1E293B] hover:border-[#334155] px-3 py-1.5 rounded-lg transition-all">
              ← Dashboard
            </button>
            <div className="h-4 w-px bg-[#1E293B]" />
            <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-widest">ECOS</span>
            <span className="text-[#334155] text-xs">›</span>
            <span className="text-xs text-[#64748B]">Agent 4</span>
            <span className="text-[#334155] text-xs">›</span>
            <span className="text-xs text-white font-semibold">Content Agent</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#64748B]">
              {advertorialStatus === "approved" ? "✓ Advertorial" : "○ Advertorial"} · {approvedAngles}/3 angles
            </span>
            <button
              disabled={!allDone}
              onClick={onProceed}
              className={`text-xs font-bold px-4 py-2 rounded-lg transition-all ${
                allDone
                  ? "bg-[#3B82F6] hover:bg-[#2563EB] text-white hover:scale-105 active:scale-95"
                  : "bg-[#0F172A] text-[#334155] border border-[#1E293B] cursor-not-allowed"
              }`}
            >
              Proceed to Landing Page Builder →
            </button>
          </div>
        </div>
        <div className="h-[2px] bg-[#0F172A]">
          <div className="h-full bg-gradient-to-r from-[#3B82F6] to-[#6366F1] transition-all duration-700"
            style={{ width: `${((advertorialStatus === "approved" ? 1 : 0) + approvedAngles) / 4 * 100}%` }} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-[#3B82F6] text-xs font-bold uppercase tracking-[0.2em] mb-2">
            <span className="w-5 h-px bg-[#3B82F6]" />
            Agent 4 · Checkpoint Review
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Content Agent Output</h1>
              <p className="text-xs text-[#64748B] mt-1">
                {PRODUCT.emoji} {PRODUCT.name} · {PRODUCT.market} · {PRODUCT.language}
              </p>
            </div>
            <div className="flex gap-2">
              {[
                { label: "Market", value: PRODUCT.market },
                { label: "Avatar", value: PRODUCT.avatar },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#0F172A] border border-[#1E293B] rounded-xl px-3 py-2 text-right">
                  <p className="text-[9px] text-[#334155] uppercase tracking-widest">{label}</p>
                  <p className="text-xs text-white font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-[#0F172A] pb-4">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-[#0F2650] border border-[#3B82F6] text-white"
                  : "bg-[#0F172A] border border-[#1E293B] text-[#64748B] hover:border-[#334155] hover:text-[#94A3B8]"
              }`}>
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  tab.badge === "✓"
                    ? "bg-[#052E16] text-[#4ADE80]"
                    : "bg-[#0F172A] border border-[#1E293B] text-[#475569]"
                }`}>{tab.badge}</span>
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "advertorial" && (
          <AdvertorialTab
            status={advertorialStatus}
            onApprove={() => { setAdvertorialStatus("approved"); showToast("✓ Advertorial approved"); }}
            onReject={() => { setAdvertorialStatus("rejected"); showToast("✕ Advertorial rejected", "#F87171"); }}
            onRetry={(note) => showToast("🔄 Re-running Content Agent with feedback…", "#A78BFA")}
          />
        )}

        {activeTab === "adscripts" && (
          <AdScriptsTab
            angleStatuses={angleStatuses}
            onApprove={(id) => { setAngleStatuses(p => ({ ...p, [id]: "approved" })); showToast(`✓ Angle ${id} approved`); }}
            onReject={(id) => { setAngleStatuses(p => ({ ...p, [id]: "rejected" })); showToast(`✕ Angle ${id} rejected`, "#F87171"); }}
            onRetry={(id, note) => showToast(`🔄 Re-running Angle ${id} with feedback…`, "#A78BFA")}
          />
        )}

        {activeTab === "coverage" && <BuyerCoverageTab />}

      </div>
    </div>
  );
}