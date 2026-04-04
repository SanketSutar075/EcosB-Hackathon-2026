// FILE: src/components/audit/AuditTrail.jsx
// Complete audit trail — all agent decisions logged

import { useState } from "react";

const STATUS_COLORS = {
  approved: { bg: "bg-[#052E16]", border: "border-[#16A34A]", text: "text-[#4ADE80]",  icon: "✅" },
  done:     { bg: "bg-[#052E16]", border: "border-[#16A34A]", text: "text-[#4ADE80]",  icon: "✅" },
  review:   { bg: "bg-[#150D2E]", border: "border-[#6D28D9]", text: "text-[#A78BFA]",  icon: "👀" },
  retried:  { bg: "bg-[#1C1200]", border: "border-[#92400E]", text: "text-[#F59E0B]",  icon: "🔄" },
  error:    { bg: "bg-[#2D0A0A]", border: "border-[#EF4444]", text: "text-[#F87171]",  icon: "❌" },
  idle:     { bg: "bg-[#0F172A]", border: "border-[#1E293B]", text: "text-[#475569]",  icon: "⏸️" },
};

function ConfidenceBar({ score }) {
  const color = score >= 90 ? "bg-[#4ADE80]" : score >= 75 ? "bg-[#F59E0B]" : "bg-[#F87171]";
  const text  = score >= 90 ? "text-[#4ADE80]" : score >= 75 ? "text-[#F59E0B]" : "text-[#F87171]";
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 bg-[#0F172A] rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${score}%` }} />
      </div>
      <span className={`text-xs font-black ${text} w-12 text-right`}>{score}%</span>
    </div>
  );
}

export default function AuditTrail({ auditLog = [], config = {}, onBack }) {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState({});

  const toggle = (id) => setExpanded(p => ({ ...p, [id]: !p[id] }));

  const filtered = filter === "all" ? auditLog : auditLog.filter(e => e.status === filter);

  // Stats
  const totalAgents   = auditLog.length;
  const approvedCount = auditLog.filter(e => e.status === "approved" || e.status === "done").length;
  const retriedCount  = auditLog.filter(e => e.retryNote).length;
  const avgConfidence = totalAgents > 0
    ? Math.round(auditLog.reduce((a, e) => a + (e.confidence || 0), 0) / totalAgents)
    : 0;

  return (
    <div className="min-h-screen bg-[#020817] text-white font-['Sora',sans-serif]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=JetBrains+Mono:wght@400;700&display=swap');`}</style>

      {/* Navbar */}
      <div className="sticky top-0 z-40 bg-[#020817]/95 backdrop-blur-sm border-b border-[#0F172A]">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack}
              className="text-[#475569] hover:text-white text-xs border border-[#1E293B] px-3 py-1.5 rounded-lg transition-all cursor-pointer">
              ← Dashboard
            </button>
            <div className="h-4 w-px bg-[#1E293B]" />
            <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-widest">ECOS</span>
            <span className="text-[#334155] text-xs">›</span>
            <span className="text-xs text-white font-semibold">Audit Trail</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-[#475569] bg-[#0F172A] border border-[#1E293B] px-3 py-1.5 rounded-lg font-['JetBrains_Mono',monospace]">
              Session: {new Date().toLocaleDateString("en-GB")}
            </span>
            <button
              onClick={() => {
                const data = JSON.stringify(auditLog, null, 2);
                const blob = new Blob([data], { type: "application/json" });
                const url  = URL.createObjectURL(blob);
                const a    = document.createElement("a");
                a.href = url; a.download = "ecos-audit-trail.json"; a.click();
              }}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#1E293B] text-[#64748B] hover:border-[#3B82F6] hover:text-[#38BDF8] transition-all cursor-pointer"
            >
              ⬇ Export JSON
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-[#3B82F6] text-xs font-bold uppercase tracking-[0.2em] mb-2">
            <span className="w-5 h-px bg-[#3B82F6]" /> Complete Decision Log
          </div>
          <h1 className="text-2xl font-bold text-white">Agent Audit Trail</h1>
          <p className="text-xs text-[#64748B] mt-1">
            Every decision, confidence score, retry note, and timestamp — logged automatically.
          </p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Total Agents Run", value: totalAgents,    color: "text-[#38BDF8]" },
            { label: "Approved",         value: approvedCount,  color: "text-[#4ADE80]" },
            { label: "Retried",          value: retriedCount,   color: "text-[#F59E0B]" },
            { label: "Avg Confidence",   value: `${avgConfidence}%`, color: "text-[#A78BFA]" },
          ].map(s => (
            <div key={s.label} className="bg-[#0F172A] border border-[#1E293B] rounded-xl px-4 py-3 text-center">
              <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-[10px] text-[#475569] uppercase tracking-widest mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Config used */}
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-5 mb-6">
          <p className="text-[10px] font-bold text-[#475569] uppercase tracking-widest mb-3">⚙️ Launch Configuration</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              ["Market",    config?.market?.country   || "—"],
              ["Currency",  config?.market?.currency  || "—"],
              ["Niche",     config?.niche?.niche       || "—"],
              ["Min Margin",`${config?.niche?.margin  || "—"}%`],
              ["Price Min", `$${config?.niche?.priceMin || "—"}`],
              ["Price Max", `$${config?.niche?.priceMax || "—"}`],
              ["Avatar",    config?.niche?.avatar      || "—"],
              ["Language",  config?.market?.language   || "—"],
            ].map(([l, v]) => (
              <div key={l} className="bg-[#020817] border border-[#0F172A] rounded-lg px-3 py-2">
                <p className="text-[9px] text-[#334155] uppercase tracking-widest">{l}</p>
                <p className="text-xs font-bold text-white mt-0.5 capitalize">{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {["all", "approved", "done", "retried", "review", "error"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer capitalize ${
                filter === f
                  ? "bg-[#1E3A5F] text-[#38BDF8] border-[#0369A1]"
                  : "bg-[#0F172A] text-[#475569] border-[#1E293B] hover:border-[#334155]"
              }`}>
              {f === "all" ? `All (${auditLog.length})` : f}
            </button>
          ))}
        </div>

        {/* Empty state */}
        {auditLog.length === 0 && (
          <div className="text-center py-20 bg-[#0F172A] border border-[#1E293B] rounded-2xl">
            <p className="text-4xl mb-4">📋</p>
            <p className="text-sm font-bold text-white mb-2">No audit log yet</p>
            <p className="text-xs text-[#64748B]">
              Go back to Dashboard and run agents — every action will be logged here automatically.
            </p>
            <button onClick={onBack}
              className="mt-4 text-xs font-bold px-5 py-2.5 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-white transition-all cursor-pointer">
              ← Go Run Agents
            </button>
          </div>
        )}

        {/* Audit entries */}
        <div className="space-y-3">
          {filtered.map((entry, i) => {
            const st = STATUS_COLORS[entry.status] || STATUS_COLORS.idle;
            const isExpanded = expanded[entry.id];
            return (
              <div key={entry.id}
                className={`rounded-2xl border transition-all duration-200 ${st.bg} ${st.border}`}>

                {/* Entry header */}
                <div className="flex items-center gap-4 px-5 py-4 cursor-pointer" onClick={() => toggle(entry.id)}>

                  {/* Step number */}
                  <div className="w-7 h-7 rounded-full bg-[#0F172A] border border-[#1E293B] flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-black text-[#475569]">{entry.agentNumber}</span>
                  </div>

                  {/* Icon + Name */}
                  <span className="text-xl shrink-0">{entry.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-bold text-white">{entry.agentName}</p>
                      {entry.checkpoint && (
                        <span className="text-[9px] font-bold text-[#A78BFA] bg-[#150D2E] border border-[#6D28D9] px-1.5 py-0.5 rounded">
                          Checkpoint
                        </span>
                      )}
                      {entry.retryNote && (
                        <span className="text-[9px] font-bold text-[#F59E0B] bg-[#1C1200] border border-[#92400E] px-1.5 py-0.5 rounded">
                          🔄 Retried
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-[#64748B] mt-0.5 truncate">{entry.decision}</p>
                  </div>

                  {/* Confidence */}
                  <div className="w-28 shrink-0 hidden sm:block">
                    <ConfidenceBar score={entry.confidence} />
                  </div>

                  {/* Status */}
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] font-bold shrink-0 ${st.bg} ${st.border} ${st.text}`}>
                    <span>{st.icon}</span>
                    <span className="capitalize">{entry.status}</span>
                  </div>

                  {/* Timestamp */}
                  <span className="text-[10px] text-[#334155] font-['JetBrains_Mono',monospace] shrink-0 hidden md:block">
                    {entry.timestamp}
                  </span>

                  {/* Expand */}
                  <span className="text-[#334155] text-xs shrink-0">{isExpanded ? "▲" : "▼"}</span>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-[#0F172A] pt-4 space-y-3">

                    {/* Decision reason */}
                    <div className="bg-[#020817] border border-[#0F172A] rounded-xl px-4 py-3">
                      <p className="text-[9px] text-[#334155] uppercase tracking-widest mb-1">Decision Reason</p>
                      <p className="text-xs text-[#94A3B8] leading-relaxed">{entry.reason}</p>
                    </div>

                    {/* Retry note */}
                    {entry.retryNote && (
                      <div className="bg-[#1C1200] border border-[#92400E] rounded-xl px-4 py-3">
                        <p className="text-[9px] text-[#92400E] uppercase tracking-widest mb-1">🔄 Retry Feedback Note</p>
                        <p className="text-xs text-[#F59E0B] leading-relaxed">"{entry.retryNote}"</p>
                      </div>
                    )}

                    {/* Key outputs */}
                    {entry.keyOutputs && entry.keyOutputs.length > 0 && (
                      <div>
                        <p className="text-[9px] text-[#334155] uppercase tracking-widest mb-2">Key Outputs</p>
                        <div className="flex flex-wrap gap-2">
                          {entry.keyOutputs.map(o => (
                            <span key={o} className="text-[10px] text-[#64748B] bg-[#0F172A] border border-[#1E293B] px-2 py-1 rounded-lg">
                              {o}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Duration */}
                    {entry.duration && (
                      <p className="text-[10px] text-[#334155]">
                        ⏱ Completed in <span className="font-bold text-white">{(entry.duration / 1000).toFixed(1)}s</span>
                        {entry.approvedAt && <span> · ✓ Approved at <span className="font-bold text-[#4ADE80]">{entry.approvedAt}</span></span>}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Research-backed note */}
        <div className="mt-8 bg-[#0A1628] border border-[#1E3A5F] rounded-2xl p-5">
          <p className="text-[10px] font-bold text-[#38BDF8] uppercase tracking-widest mb-2">📚 Research-Backed Design</p>
          <p className="text-xs text-[#64748B] leading-relaxed">
            This audit trail implements the <span className="text-white font-semibold">Human-in-the-Loop (HITL)</span> framework from IEEE research — ensuring every agent decision is transparent, auditable, and overridable by the human operator.
            Confidence scoring follows the <span className="text-white font-semibold">HULA framework</span> (Atlassian, 2024) which showed significant reduction in development time when humans can review AI decisions at each stage.
          </p>
        </div>

      </div>
    </div>
  );
}