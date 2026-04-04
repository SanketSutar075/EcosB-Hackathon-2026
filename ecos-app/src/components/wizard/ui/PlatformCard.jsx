// FILE: src/components/wizard/ui/PlatformCard.jsx

import { useState } from "react";

const STATUS = {
  idle: {
    label: "Connect",
    style: "bg-[#0F172A] border border-[#1E293B] text-[#94A3B8] hover:border-[#3B82F6] hover:text-white",
    dot: "bg-[#1E293B]",
  },
  connecting: {
    label: "Connecting…",
    style: "bg-[#1E3A5F] border border-[#3B82F6] text-[#93C5FD] cursor-wait",
    dot: "bg-[#3B82F6] animate-pulse",
  },
  connected: {
    label: "Connected ✓",
    style: "bg-[#052E16] border border-[#16A34A] text-[#4ADE80]",
    dot: "bg-[#16A34A]",
  },
  error: {
    label: "Retry",
    style: "bg-[#2D0A0A] border border-[#EF4444] text-[#FCA5A5] hover:border-[#F87171]",
    dot: "bg-[#EF4444] animate-ping",
  },
};

export default function PlatformCard({ name, description, icon, required = true, onConnect }) {
  const [status, setStatus] = useState("idle");

  const handleConnect = async () => {
    if (status === "connected") return;
    setStatus("connecting");
    try {
      await new Promise((r) => setTimeout(r, 1400));
      await onConnect?.();
      setStatus("connected");
    } catch {
      setStatus("error");
    }
  };

  const s = STATUS[status];

  return (
    <div
      className={`relative flex items-center gap-4 rounded-xl p-4 transition-all duration-300 ${s.style} ${
        status === "idle" || status === "error" ? "cursor-pointer" : ""
      }`}
      onClick={status === "idle" || status === "error" ? handleConnect : undefined}
    >
      <span className={`absolute top-3 right-3 w-2 h-2 rounded-full ${s.dot} transition-colors duration-300`} />

      <div className="w-10 h-10 rounded-lg bg-[#0F172A] border border-[#1E293B] flex items-center justify-center text-xl shrink-0">
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white truncate">{name}</span>
          {required && (
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#F59E0B] bg-[#1C1200] border border-[#92400E] px-1.5 py-0.5 rounded">
              Required
            </span>
          )}
        </div>
        <p className="text-xs text-[#64748B] mt-0.5 truncate">{description}</p>
      </div>

      <button
        className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 ${
          status === "connected" ? "text-[#4ADE80] cursor-default" : "hover:scale-105 active:scale-95"
        }`}
        disabled={status === "connecting" || status === "connected"}
        onClick={(e) => { e.stopPropagation(); handleConnect(); }}
      >
        {s.label}
      </button>
    </div>
  );
}