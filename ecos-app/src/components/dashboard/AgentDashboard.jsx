// FILE: src/components/dashboard/AgentDashboard.jsx
// Block 1 Update — Confidence Score + Retry with Feedback

import { useState, useCallback } from "react";
import { agentsAPI } from "../../services/api";
import DeployModal from "../deploy/DeployModal";
import PostLaunchDashboard from "../deploy/PostLaunchDashboard";
import AuditTrail from "../audit/AuditTrail";

import ResearchAgentScreen   from "../agents/ResearchAgentScreen";
import EvaluationAgentScreen from "../agents/EvaluationAgentScreen";
import ContentAgentScreen    from "../agents/ContentAgentScreen";
import {
  SourcingAgentScreen,
  LandingPageBuilderScreen,
  CreativeAgentScreen,
  AdLaunchAgentScreen,
  TrackingAgentScreen,
  EmailAgentScreen,
  OptimizationAgentScreen,
} from "../agents/RemainingAgentScreens";

// ─────────────────────────────────────────────────────────────────
// AGENTS CONFIG
// ─────────────────────────────────────────────────────────────────
const AGENTS = [
  { id: "research",     number: 1,  name: "Research Agent",       icon: "🔬", purpose: "Identify high-potential product opportunities through systematic market research.",          platforms: ["TikTok", "Amazon", "Google Trends", "Meta Ads Library"], output: "Ranked product list + research document",           checkpoint: true,  confidence: 94 },
  { id: "evaluation",  number: 2,  name: "Evaluation Agent",      icon: "⚖️", purpose: "Assess product viability using data-driven scoring.",                                       platforms: ["Search Volume", "Ad Library", "Margin Calculator"],      output: "Go / No-Go decision + viability score",            checkpoint: true,  confidence: 91 },
  { id: "sourcing",    number: 3,  name: "Sourcing Agent",        icon: "📦", purpose: "Find suppliers and calculate true landed costs.",                                            platforms: ["Alibaba", "AliExpress", "1688"],                          output: "Supplier comparison + landed cost estimate",       checkpoint: false, confidence: 88 },
  { id: "content",     number: 4,  name: "Content Agent",         icon: "✍️", purpose: "Create persuasive, research-driven marketing copy informed by what's already converting.", platforms: ["Advertorial", "Product Page", "Ad Scripts"],             output: "Advertorial + 3 ad angle scripts + product copy",  checkpoint: true,  confidence: 87 },
  { id: "landing",     number: 5,  name: "Landing Page Builder",  icon: "🏗️", purpose: "Build a Shopify store modeled on proven top-converting competitors.",                      platforms: ["Shopify"],                                               output: "Full store: homepage + funnel pages",               checkpoint: true,  confidence: 90 },
  { id: "creative",    number: 6,  name: "Creative Agent",        icon: "🎨", purpose: "Produce high-converting ad creatives using systematic testing methodology.",                platforms: ["Meta", "TikTok", "YouTube"],                             output: "3 ad creatives per angle (video + static)",        checkpoint: true,  confidence: 85 },
  { id: "adlaunch",    number: 7,  name: "Ad Launch Agent",       icon: "🚀", purpose: "Launch and manage paid campaigns across Meta, TikTok, and Google.",                        platforms: ["Meta Ads", "TikTok Ads", "Google Ads"],                  output: "Live campaigns across all platforms",               checkpoint: false, confidence: 92 },
  { id: "tracking",    number: 8,  name: "Tracking Agent",        icon: "📡", purpose: "Implement full tracking with accurate attribution.",                                        platforms: ["GTM", "Meta Pixel", "TikTok Pixel", "GA4"],              output: "Full attribution setup + event verification",      checkpoint: false, confidence: 96 },
  { id: "email",       number: 9,  name: "Email & LTV Agent",     icon: "📧", purpose: "Build the complete email flow architecture to maximize lifetime customer value.",           platforms: ["Klaviyo"],                                               output: "8 automated email flows live",                     checkpoint: true,  confidence: 89 },
  { id: "optimization",number: 10, name: "Optimization Agent",    icon: "📈", purpose: "Monitor performance, run systematic tests, and scale winners.",                            platforms: ["Meta", "TikTok", "Google", "Klaviyo"],                   output: "Weekly optimization report + scaling decisions",   checkpoint: false, confidence: 93 },
];

const PIPELINE_ORDER = AGENTS.map(a => a.id);

const STATUS_CONFIG = {
  idle:     { label: "Idle",         color: "text-[#475569]", bg: "bg-[#0F172A]", border: "border-[#1E293B]", dot: "bg-[#334155]"              },
  waiting:  { label: "Waiting",      color: "text-[#F59E0B]", bg: "bg-[#1C1200]", border: "border-[#92400E]", dot: "bg-[#F59E0B] animate-pulse" },
  running:  { label: "Running…",     color: "text-[#38BDF8]", bg: "bg-[#0C2337]", border: "border-[#0369A1]", dot: "bg-[#38BDF8] animate-ping"  },
  review:   { label: "Needs Review", color: "text-[#A78BFA]", bg: "bg-[#150D2E]", border: "border-[#6D28D9]", dot: "bg-[#A78BFA] animate-pulse" },
  retrying: { label: "Retrying…",    color: "text-[#F59E0B]", bg: "bg-[#1C1200]", border: "border-[#92400E]", dot: "bg-[#F59E0B] animate-ping"  },
  done:     { label: "Done ✓",       color: "text-[#4ADE80]", bg: "bg-[#052E16]", border: "border-[#16A34A]", dot: "bg-[#4ADE80]"               },
  approved: { label: "Approved ✓",   color: "text-[#4ADE80]", bg: "bg-[#052E16]", border: "border-[#16A34A]", dot: "bg-[#4ADE80]"               },
  error:    { label: "Error",        color: "text-[#F87171]", bg: "bg-[#2D0A0A]", border: "border-[#EF4444]", dot: "bg-[#EF4444]"               },
};

const INITIAL_STATUSES = Object.fromEntries(AGENTS.map(a => [a.id, "idle"]));

// ─────────────────────────────────────────────────────────────────
// Confidence Score Badge
// ─────────────────────────────────────────────────────────────────
function ConfidenceBadge({ score }) {
  const color = score >= 90 ? "text-[#4ADE80] border-[#16A34A] bg-[#052E16]"
              : score >= 75 ? "text-[#F59E0B] border-[#92400E] bg-[#1C1200]"
              :               "text-[#F87171] border-[#EF4444] bg-[#2D0A0A]";
  const label = score >= 90 ? "High" : score >= 75 ? "Medium" : "Low";
  return (
    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border text-[10px] font-bold ${color}`}>
      <span>🎯</span>
      <span>{score}% {label}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Retry Modal
// ─────────────────────────────────────────────────────────────────
function RetryModal({ agentName, onConfirm, onCancel }) {
  const [note, setNote] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-[#0F172A] border border-[#334155] rounded-2xl p-6 shadow-2xl"
        style={{ animation: "fadeIn 0.2s ease-out" }}>
        <style>{`@keyframes fadeIn { from{opacity:0;transform:scale(0.95)} to{opacity:1;transform:scale(1)} }`}</style>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔄</span>
          <div>
            <h3 className="text-sm font-bold text-white">Retry {agentName}</h3>
            <p className="text-[10px] text-[#64748B]">Agent will re-run with your feedback note</p>
          </div>
        </div>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder={`e.g. "Focus on UK market only" or "Increase minimum margin to 40%"`}
          rows={3}
          className="w-full bg-[#020817] border border-[#1E293B] rounded-xl px-4 py-3 text-xs text-white placeholder-[#334155] resize-none focus:outline-none focus:border-[#3B82F6] transition-colors mb-4"
        />
        <div className="flex gap-3">
          <button onClick={() => onConfirm(note)}
            className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-[#F59E0B] hover:bg-[#D97706] text-[#020817] transition-all active:scale-95 cursor-pointer">
            🔄 Retry with Feedback
          </button>
          <button onClick={onCancel}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#64748B] border border-[#1E293B] hover:border-[#334155] transition-all cursor-pointer">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Screen Router
// ─────────────────────────────────────────────────────────────────
function renderScreen(agentId, goBack, markApproved, liveData) {
  const props = {
    onBack:       goBack,
    onApproveAll: () => { markApproved(agentId); goBack(); },
    onProceed:    () => { markApproved(agentId); goBack(); },
    liveData,
  };
  switch (agentId) {
    case "research":     return <ResearchAgentScreen     {...props} />;
    case "evaluation":   return <EvaluationAgentScreen   {...props} />;
    case "sourcing":     return <SourcingAgentScreen      {...props} />;
    case "content":      return <ContentAgentScreen       {...props} />;
    case "landing":      return <LandingPageBuilderScreen {...props} />;
    case "creative":     return <CreativeAgentScreen      {...props} />;
    case "adlaunch":     return <AdLaunchAgentScreen      {...props} />;
    case "tracking":     return <TrackingAgentScreen      {...props} />;
    case "email":        return <EmailAgentScreen         {...props} />;
    case "optimization": return <OptimizationAgentScreen  {...props} />;
    default:             return null;
  }
}

// ─────────────────────────────────────────────────────────────────
// Agent Card
// ─────────────────────────────────────────────────────────────────
function AgentCard({ agent, status, duration, approvedAt, onOpenScreen, onApprove, onRetry }) {
  const s      = STATUS_CONFIG[status] ?? STATUS_CONFIG.idle;
  const isDone = status === "done" || status === "approved";

  return (
    <div className={`rounded-2xl border p-5 transition-all duration-300 ${s.bg} ${s.border} hover:brightness-110`}>

      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">{agent.icon}</span>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold text-[#334155] uppercase tracking-widest">Agent {agent.number}</span>
              {agent.checkpoint && (
                <span className="text-[9px] font-bold uppercase text-[#A78BFA] bg-[#150D2E] border border-[#6D28D9] px-1.5 py-0.5 rounded">
                  Checkpoint
                </span>
              )}
            </div>
            <h3 className="text-sm font-bold text-white mt-0.5">{agent.name}</h3>
          </div>
        </div>
        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[11px] font-semibold shrink-0 ${s.bg} ${s.border} ${s.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />
          {s.label}
        </div>
      </div>

      {/* Confidence badge — show when done/approved/review */}
      {(isDone || status === "review") && (
        <div className="mb-2">
          <ConfidenceBadge score={agent.confidence} />
        </div>
      )}

      {/* Timing */}
      {isDone && duration && (
        <p className="text-[10px] text-[#334155] mb-1">⏱ {(duration / 1000).toFixed(1)}s</p>
      )}

      {/* Approved timestamp */}
      {status === "approved" && approvedAt && (
        <p className="text-[10px] text-[#4ADE80] mb-1.5">✓ Approved at {approvedAt}</p>
      )}

      {/* Purpose */}
      <p className="text-xs text-[#64748B] leading-relaxed mb-3 line-clamp-2">{agent.purpose}</p>

      {/* Platforms */}
      <div className="flex flex-wrap gap-1 mb-3">
        {agent.platforms.slice(0, 3).map(p => (
          <span key={p} className="text-[10px] text-[#475569] bg-[#0F172A] border border-[#1E293B] px-2 py-0.5 rounded-md">{p}</span>
        ))}
        {agent.platforms.length > 3 && <span className="text-[10px] text-[#334155] px-1">+{agent.platforms.length - 3}</span>}
      </div>

      {/* Output */}
      <div className="flex items-start gap-2 bg-[#020817] border border-[#0F172A] rounded-lg px-3 py-2 mb-3">
        <span className="text-[10px] text-[#334155] shrink-0 mt-0.5">OUTPUT</span>
        <p className="text-[11px] text-[#64748B] leading-relaxed">{agent.output}</p>
      </div>

      {/* Running shimmer */}
      {(status === "running" || status === "retrying") && (
        <div className="w-full h-1 bg-[#0F172A] rounded-full overflow-hidden mb-3">
          <div className={`h-full rounded-full animate-pulse ${status === "retrying" ? "bg-[#F59E0B]" : "bg-[#3B82F6]"}`}
            style={{ width: "60%" }} />
        </div>
      )}

      {/* ── BUTTONS ── */}

      {/* Needs Review */}
      {status === "review" && (
        <div className="space-y-2">
          <button onClick={() => onOpenScreen(agent.id)}
            className="w-full text-xs font-bold py-2.5 rounded-xl bg-[#A78BFA] hover:bg-[#9061F9] text-[#0D0720] transition-all active:scale-95 cursor-pointer">
            👁 Review Output
          </button>
          <div className="flex gap-2">
            <button onClick={() => onApprove(agent.id)}
              className="flex-1 text-xs font-bold py-2 rounded-xl bg-[#052E16] border border-[#16A34A] text-[#4ADE80] hover:bg-[#16A34A] hover:text-white transition-all active:scale-95 cursor-pointer">
              ✓ Approve
            </button>
            <button onClick={() => onRetry(agent.id)}
              className="flex-1 text-xs font-bold py-2 rounded-xl bg-[#1C1200] border border-[#92400E] text-[#F59E0B] hover:bg-[#92400E] hover:text-white transition-all active:scale-95 cursor-pointer">
              🔄 Retry
            </button>
          </div>
        </div>
      )}

      {/* Done / Approved */}
      {isDone && (
        <div className="space-y-2">
          <button onClick={() => onOpenScreen(agent.id)}
            className="w-full text-xs font-bold py-2.5 rounded-xl border border-[#16A34A] text-[#4ADE80] hover:bg-[#052E16] transition-all active:scale-95 cursor-pointer">
            {status === "approved" ? "✓ Approved — View Output →" : "View Output →"}
          </button>
          {/* Retry even after done */}
          <button onClick={() => onRetry(agent.id)}
            className="w-full text-xs font-semibold py-1.5 rounded-xl border border-[#1E293B] text-[#475569] hover:border-[#92400E] hover:text-[#F59E0B] transition-all cursor-pointer">
            🔄 Retry with different feedback
          </button>
        </div>
      )}

      {/* Idle / Waiting */}
      {(status === "idle" || status === "waiting") && (
        <button onClick={() => onOpenScreen(agent.id)}
          className="w-full text-xs font-semibold py-2 rounded-xl border border-[#1E293B] text-[#475569] hover:border-[#334155] hover:text-[#64748B] transition-all cursor-pointer">
          Preview Screen
        </button>
      )}

      {/* Error */}
      {status === "error" && (
        <div className="space-y-2">
          <button onClick={() => onOpenScreen(agent.id)}
            className="w-full text-xs font-semibold py-2 rounded-xl bg-[#EF4444] hover:bg-[#DC2626] text-white transition-all active:scale-95 cursor-pointer">
            View Error
          </button>
          <button onClick={() => onRetry(agent.id)}
            className="w-full text-xs font-semibold py-2 rounded-xl border border-[#92400E] text-[#F59E0B] hover:bg-[#1C1200] transition-all cursor-pointer">
            🔄 Retry
          </button>
        </div>
      )}
    </div>
  );
}

function StatsPill({ label, value, color }) {
  return (
    <div className="flex flex-col items-center bg-[#0F172A] border border-[#1E293B] rounded-xl px-5 py-3 min-w-[90px]">
      <span className={`text-lg font-bold ${color}`}>{value}</span>
      <span className="text-[10px] text-[#475569] uppercase tracking-widest mt-0.5">{label}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN DASHBOARD
// ─────────────────────────────────────────────────────────────────
export default function AgentDashboard({ config = {}, sessionId, onBack }) {
  const [statuses,        setStatuses]        = useState(INITIAL_STATUSES);
  const [agentOutputs,    setAgentOutputs]    = useState({});
  const [agentDurations,  setAgentDurations]  = useState({});
  const [approvedAt,      setApprovedAt]      = useState({});
  const [retryNotes,      setRetryNotes]      = useState({});
  const [activeScreen,    setActiveScreen]    = useState(null);
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [apiError,        setApiError]        = useState(null);
  const [backendOnline,   setBackendOnline]   = useState(null);
  const [showDeploy,      setShowDeploy]      = useState(false);
  const [showPostLaunch,  setShowPostLaunch]  = useState(false);
  const [retryModal,      setRetryModal]      = useState(null); // agentId
  const [showAudit,       setShowAudit]       = useState(false);
  const [auditLog,        setAuditLog]        = useState([]);

  useState(() => {
    agentsAPI.health()
      .then(() => setBackendOnline(true))
      .catch(() => setBackendOnline(false));
  });

  // ── Approve ──────────────────────────────────────────────────
  const handleApprove = useCallback((agentId) => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setStatuses(prev => ({ ...prev, [agentId]: "approved" }));
    setApprovedAt(prev => ({ ...prev, [agentId]: time }));
    // Update audit log
    setAuditLog(prev => prev.map(e => e.id === agentId
      ? { ...e, status: "approved", decision: "Approved by human operator", approvedAt: time }
      : e
    ));
    const idx    = PIPELINE_ORDER.indexOf(agentId);
    const nextId = PIPELINE_ORDER[idx + 1];
    if (nextId) {
      setStatuses(prev => {
        if (prev[nextId] === "idle") return { ...prev, [nextId]: "waiting" };
        return prev;
      });
    }
  }, []);

  // ── Open retry modal ──────────────────────────────────────────
  const handleRetryClick = useCallback((agentId) => {
    setRetryModal(agentId);
  }, []);

  // ── Actually retry with note ──────────────────────────────────
  const handleRetryConfirm = useCallback(async (note) => {
    const agentId = retryModal;
    setRetryModal(null);
    setRetryNotes(prev => ({ ...prev, [agentId]: note }));
    setStatuses(prev => ({ ...prev, [agentId]: "retrying" }));
    // Log retry in audit
    setAuditLog(prev => prev.map(e => e.id === agentId
      ? { ...e, status: "retried", retryNote: note, decision: "Retried with human feedback" }
      : e
    ));
    setApiError(null);

    console.log(`🔄 Retrying ${agentId} with note: "${note}"`);

    // Small delay to show retrying state
    await new Promise(r => setTimeout(r, 800));

    try {
      // Pass the note in context so backend can use it
      const result = await agentsAPI.runAgent(agentId, config, { retryNote: note });
      const agent  = AGENTS.find(a => a.id === agentId);
      const nextStatus = agent?.checkpoint ? "review" : "done";
      setStatuses(p  => ({ ...p, [agentId]: nextStatus }));
      setAgentOutputs(p  => ({ ...p, [agentId]: result.output  }));
      setAgentDurations(p => ({ ...p, [agentId]: result.duration }));
    } catch (err) {
      setStatuses(p => ({ ...p, [agentId]: "error" }));
      setApiError(`Retry failed — ${agentId}: ${err.message}`);
    }
  }, [retryModal, config]);

  // ── Run single agent ──────────────────────────────────────────
  const runOneAgent = useCallback(async (agentId, context = {}) => {
    setStatuses(p => ({ ...p, [agentId]: "running" }));
    setApiError(null);
    try {
      const result     = await agentsAPI.runAgent(agentId, config, context);
      const agent      = AGENTS.find(a => a.id === agentId);
      const nextStatus = agent?.checkpoint ? "review" : "done";
      setStatuses(p    => ({ ...p, [agentId]: nextStatus }));
      setAgentOutputs(p  => ({ ...p, [agentId]: result.output   }));
      setAgentDurations(p => ({ ...p, [agentId]: result.duration }));
      // Log to audit trail
      const agentMeta = AGENTS.find(a => a.id === agentId);
      setAuditLog(prev => {
        const existing = prev.findIndex(e => e.id === agentId);
        const entry = {
          id:           agentId,
          agentNumber:  agentMeta?.number,
          agentName:    agentMeta?.name,
          icon:         agentMeta?.icon,
          checkpoint:   agentMeta?.checkpoint,
          confidence:   agentMeta?.confidence,
          status:       agent?.checkpoint ? "review" : "done",
          decision:     agent?.checkpoint ? "Output ready — awaiting human review" : "Auto-completed successfully",
          reason:       "Agent processed task and returned structured output with " + (agentMeta?.confidence || 0) + "% confidence score.",
          keyOutputs:   agentMeta?.output ? [agentMeta.output] : [],
          duration:     result.duration,
          timestamp:    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          retryNote:    null,
        };
        if (existing >= 0) {
          const updated = [...prev];
          updated[existing] = entry;
          return updated;
        }
        return [...prev, entry];
      });
      return result.output;
    } catch (err) {
      setStatuses(p => ({ ...p, [agentId]: "error" }));
      setApiError(`${agentId}: ${err.message}`);
      return null;
    }
  }, [config]);

  // ── Run all ───────────────────────────────────────────────────
  const handleRunAll = useCallback(async () => {
    if (pipelineRunning) return;
    setPipelineRunning(true);
    setApiError(null);
    setStatuses(prev => {
      const updated = { ...prev };
      for (const id of PIPELINE_ORDER) {
        if (prev[id] !== "approved") updated[id] = "idle";
      }
      return updated;
    });

    const context = {};
    for (const agentId of PIPELINE_ORDER) {
      const currentStatus = await new Promise(resolve => {
        setStatuses(prev => { resolve(prev[agentId]); return prev; });
      });
      if (currentStatus === "approved") {
        console.log(`⏭ Skipping ${agentId} — already approved`);
        continue;
      }
      const output = await runOneAgent(agentId, context);
      if (output) context[agentId] = output;
      await new Promise(r => setTimeout(r, 300));
    }
    setPipelineRunning(false);
  }, [pipelineRunning, runOneAgent]);

  // ── Route to agent screen ────────────────────────────────────
  if (showAudit) return <AuditTrail auditLog={auditLog} config={config} onBack={() => setShowAudit(false)} />;
  if (showPostLaunch) return <PostLaunchDashboard config={config} onBack={() => setShowPostLaunch(false)} />;

  if (activeScreen !== null) {
    return renderScreen(
      activeScreen,
      () => setActiveScreen(null),
      handleApprove,
      agentOutputs[activeScreen],
    );
  }

  // ── Counts ────────────────────────────────────────────────────
  const counts = {
    done:     Object.values(statuses).filter(s => s === "done"    ).length,
    approved: Object.values(statuses).filter(s => s === "approved").length,
    review:   Object.values(statuses).filter(s => s === "review"  ).length,
    running:  Object.values(statuses).filter(s => s === "running" || s === "retrying").length,
    idle:     Object.values(statuses).filter(s => s === "idle" || s === "waiting").length,
  };
  const totalDone = counts.done + counts.approved;
  const progress  = Math.round((totalDone / AGENTS.length) * 100);
  const allDone   = totalDone === AGENTS.length;

  return (
    <div className="min-h-screen bg-[#020817] text-white font-['Sora',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');
        .line-clamp-2 { display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden; }
      `}</style>

      {/* Retry Modal */}
      {retryModal && (
        <RetryModal
          agentName={AGENTS.find(a => a.id === retryModal)?.name}
          onConfirm={handleRetryConfirm}
          onCancel={() => setRetryModal(null)}
        />
      )}

      {/* Deploy Modal */}
      {showDeploy && (
        <DeployModal
          onClose={() => setShowDeploy(false)}
          onDone={() => { setShowDeploy(false); setShowPostLaunch(true); }}
        />
      )}

      {/* ── Navbar ── */}
      <div className="sticky top-0 z-40 bg-[#020817]/95 backdrop-blur-sm border-b border-[#0F172A]">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack}
              className="text-[#475569] hover:text-white text-xs border border-[#1E293B] px-3 py-1.5 rounded-lg transition-all cursor-pointer">
              ← Setup
            </button>
            <div className="h-4 w-px bg-[#1E293B]" />
            <span className="text-xs font-bold text-[#3B82F6] tracking-widest uppercase">ECOS</span>
            <span className="text-xs text-[#334155]">Agent Dashboard</span>
            {backendOnline === true  && <span className="text-[10px] text-[#4ADE80] bg-[#052E16] border border-[#16A34A] px-2 py-0.5 rounded-full">🟢 Backend Live</span>}
            {backendOnline === false && <span className="text-[10px] text-[#F87171] bg-[#2D0A0A] border border-[#EF4444] px-2 py-0.5 rounded-full">🔴 Backend Offline</span>}
          </div>
          <div className="flex items-center gap-3">
            {config?.market?.country && <span className="text-[10px] text-[#64748B] bg-[#0F172A] border border-[#1E293B] px-2 py-1 rounded-lg">🌍 {config.market.country}</span>}
            {config?.niche?.niche    && <span className="text-[10px] text-[#64748B] bg-[#0F172A] border border-[#1E293B] px-2 py-1 rounded-lg capitalize">🎯 {config.niche.niche === "discover" ? "AI Niche" : config.niche.niche}</span>}
            {sessionId               && <span className="text-[10px] text-[#334155] bg-[#0F172A] border border-[#1E293B] px-2 py-1 rounded-lg font-mono">{sessionId.slice(-8)}</span>}

            <button onClick={() => setShowAudit(true)}
              className="text-xs font-semibold px-3 py-2 rounded-lg border border-[#1E293B] text-[#64748B] hover:border-[#3B82F6] hover:text-[#38BDF8] transition-all cursor-pointer">
              📋 Audit
            </button>

            <button onClick={handleRunAll} disabled={pipelineRunning}
              className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all cursor-pointer ${
                pipelineRunning ? "bg-[#0F172A] text-[#334155] border border-[#1E293B] cursor-wait"
                                : "bg-[#3B82F6] hover:bg-[#2563EB] text-white hover:scale-105 active:scale-95"
              }`}>
              {pipelineRunning ? "⏳ Running…" : "▶ Run All Agents"}
            </button>

            <button onClick={() => setShowDeploy(true)}
              className={`text-xs font-bold px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                allDone ? "bg-gradient-to-r from-[#4ADE80] to-[#22C55E] text-[#020817] hover:scale-105 active:scale-95 shadow-lg shadow-green-500/20"
                        : "bg-[#0F172A] text-[#334155] border border-[#1E293B] hover:border-[#4ADE80] hover:text-[#4ADE80]"
              }`}>
              {allDone ? "🚀" : "🔒"} 1-Click Deploy
            </button>
          </div>
        </div>
        <div className="h-[2px] bg-[#0F172A]">
          <div className="h-full bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#A78BFA] transition-all duration-700"
            style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Error */}
        {apiError && (
          <div className="mb-4 flex items-center gap-3 bg-[#2D0A0A] border border-[#EF4444] rounded-xl px-5 py-3">
            <span>❌</span>
            <p className="text-xs text-[#FCA5A5]">{apiError}</p>
            <button onClick={() => setApiError(null)} className="ml-auto text-[#F87171] hover:text-white text-xs">✕</button>
          </div>
        )}

        {/* Retry notes log */}
        {Object.keys(retryNotes).length > 0 && (
          <div className="mb-4 bg-[#1C1200] border border-[#92400E] rounded-xl px-5 py-3">
            <p className="text-[10px] font-bold text-[#F59E0B] uppercase tracking-widest mb-2">🔄 Retry Notes</p>
            {Object.entries(retryNotes).map(([id, note]) => (
              <p key={id} className="text-xs text-[#D97706]">
                <span className="font-bold">{AGENTS.find(a => a.id === id)?.name}:</span> "{note}"
              </p>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-white">Agent Pipeline</h1>
            <p className="text-xs text-[#64748B] mt-1">{totalDone} of {AGENTS.length} agents complete · {progress}% workflow done</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <StatsPill label="Done"     value={counts.done}     color="text-[#4ADE80]" />
            <StatsPill label="Approved" value={counts.approved} color="text-[#38BDF8]" />
            <StatsPill label="Review"   value={counts.review}   color="text-[#A78BFA]" />
            <StatsPill label="Idle"     value={counts.idle}     color="text-[#475569]" />
          </div>
        </div>

        {/* Banners */}
        {counts.review > 0 && (
          <div className="mb-4 flex gap-3 items-center bg-[#150D2E] border border-[#6D28D9] rounded-xl px-5 py-3">
            <span className="text-lg">👀</span>
            <p className="text-sm text-[#C4B5FD]">
              <span className="font-bold text-[#A78BFA]">{counts.review} agent{counts.review > 1 ? "s" : ""}</span>{" "}
              need review. Click <strong>"👁 Review Output"</strong>, then <strong>"✓ Approve"</strong> or <strong>"🔄 Retry"</strong>.
            </p>
          </div>
        )}

        {allDone && (
          <div className="mb-6 flex gap-4 items-center bg-[#052E16] border border-[#16A34A] rounded-xl px-5 py-4">
            <span className="text-2xl">🎉</span>
            <div className="flex-1">
              <p className="text-sm font-bold text-[#4ADE80]">All 10 agents complete — product launch workflow finished!</p>
              <p className="text-xs text-[#86EFAC] mt-0.5">Click any agent to review output. Ready to deploy.</p>
            </div>
            <button onClick={() => setShowDeploy(true)}
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-[#4ADE80] to-[#22C55E] text-[#020817] hover:scale-105 active:scale-95 transition-all shrink-0 shadow-lg shadow-green-500/20">
              🚀 Deploy Now
            </button>
          </div>
        )}

        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {AGENTS.map(agent => (
            <AgentCard
              key={agent.id}
              agent={agent}
              status={statuses[agent.id]}
              duration={agentDurations[agent.id]}
              approvedAt={approvedAt[agent.id]}
              onOpenScreen={(id) => setActiveScreen(id)}
              onApprove={handleApprove}
              onRetry={handleRetryClick}
            />
          ))}
        </div>

        {/* Flow */}
        <div className="mt-10 bg-[#0A0F1A] border border-[#0F172A] rounded-2xl p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[#334155] mb-4">Agent Flow</p>
          <div className="flex items-center gap-1 flex-wrap">
            {AGENTS.map((agent, i) => {
              const s = STATUS_CONFIG[statuses[agent.id]] ?? STATUS_CONFIG.idle;
              return (
                <div key={agent.id} className="flex items-center gap-1">
                  <button onClick={() => setActiveScreen(agent.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold transition-all duration-300 hover:brightness-125 cursor-pointer ${s.bg} ${s.border} ${s.color}`}>
                    <span>{agent.icon}</span>
                    <span className="hidden sm:inline">{agent.name.replace(" Agent","").replace(" Builder","")}</span>
                    <span className="sm:hidden">{agent.number}</span>
                  </button>
                  {i < AGENTS.length - 1 && (
                    <span className={`text-xs transition-colors duration-300 ${
                      statuses[agent.id] === "done" || statuses[agent.id] === "approved" ? "text-[#16A34A]" : "text-[#1E293B]"
                    }`}>→</span>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-[#334155] mt-3">
            💡 Confidence scores shown on each agent after running. Use "🔄 Retry" to re-run with feedback.
          </p>
        </div>

        {/* Info cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: "🎯", title: "Confidence Scoring",  desc: "Each agent shows a confidence score (0–100). Green = High (90+), Yellow = Medium (75–89), Red = Low (<75)." },
            { icon: "🔄", title: "Retry with Feedback", desc: "Reject any output and re-run with specific notes. Agent incorporates your feedback in the next run."       },
            { icon: "✏️", title: "Review & Approve",    desc: "Click 'Review Output' to see full details, then 'Approve' to mark done or 'Retry' to improve."            },
          ].map(item => (
            <div key={item.title} className="bg-[#0F172A] border border-[#1E293B] rounded-xl p-4">
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="text-xs font-bold text-white mb-1">{item.title}</p>
              <p className="text-xs text-[#475569] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}