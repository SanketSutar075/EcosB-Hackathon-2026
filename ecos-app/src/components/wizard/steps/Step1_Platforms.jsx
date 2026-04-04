// FILE: src/components/wizard/steps/Step1_Platforms.jsx

import { useMemo } from "react";
import PlatformCard from "../ui/PlatformCard";

const PLATFORMS = [
  { id: "shopify", name: "Shopify", icon: "🛍️", description: "Store creation, product upload & checkout", required: true },
  { id: "meta", name: "Meta Business Suite", icon: "📘", description: "Ad account, Pixel & Conversions API", required: true },
  { id: "tiktok", name: "TikTok Ads Manager", icon: "🎵", description: "Ad account, Pixel & server-side events", required: true },
  { id: "google", name: "Google Ads & Merchant Center", icon: "🔍", description: "Search, Shopping, PMax, YouTube & Display", required: true },
  { id: "klaviyo", name: "Klaviyo", icon: "📧", description: "Email automation & flow platform", required: true },
  { id: "gtm", name: "Google Tag Manager", icon: "🏷️", description: "Conversion tracking & event management", required: true },
  { id: "alibaba", name: "Alibaba / 1688", icon: "📦", description: "Automated supplier sourcing API", required: false },
];

export default function Step1_Platforms({ connections = {}, onConnectionChange, onNext }) {
  const requiredTotal = PLATFORMS.filter((p) => p.required).length;

  const requiredConnected = useMemo(
    () => PLATFORMS.filter((p) => p.required && connections[p.id]).length,
    [connections]
  );

  const allRequiredDone = requiredConnected === requiredTotal;

  const handleConnect = (id) => async () => {
    onConnectionChange?.(id, true);
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white flex items-center justify-center px-4 py-12 font-['Sora',sans-serif]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');`}</style>

      <div className="w-full max-w-2xl">

        <div className="mb-10">
          <div className="flex items-center gap-2 text-[#3B82F6] text-xs font-bold uppercase tracking-[0.2em] mb-3">
            <span className="w-5 h-px bg-[#3B82F6]" />
            Step 1 of 4
          </div>
          <h1 className="text-3xl font-bold text-white leading-tight">Connect Your Platforms</h1>
          <p className="text-[#64748B] mt-2 text-sm leading-relaxed">
            Connect all required platforms before agents can operate autonomously. This is a one-time setup.
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-[#475569]">
            {requiredConnected} of {requiredTotal} required platforms connected
          </span>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            allRequiredDone ? "bg-[#052E16] text-[#4ADE80]" : "bg-[#0F172A] text-[#64748B]"
          }`}>
            {allRequiredDone ? "✓ Ready to continue" : "Waiting…"}
          </span>
        </div>

        <div className="h-1 w-full bg-[#0F172A] rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#3B82F6] to-[#6366F1] rounded-full transition-all duration-500"
            style={{ width: `${(requiredConnected / requiredTotal) * 100}%` }}
          />
        </div>

        <div className="flex flex-col gap-3">
          {PLATFORMS.map((platform) => (
            <PlatformCard
              key={platform.id}
              name={platform.name}
              icon={platform.icon}
              description={platform.description}
              required={platform.required}
              onConnect={handleConnect(platform.id)}
            />
          ))}
        </div>

        <div className="mt-6 flex gap-3 items-start bg-[#0F1A2E] border border-[#1E3A5F] rounded-xl p-4">
          <span className="text-lg">🔗</span>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Agents will <span className="text-white font-semibold">not start</span> until all required platforms are connected and verified.
          </p>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            disabled={!allRequiredDone}
            onClick={() => { if (allRequiredDone) onNext?.(); }}
            className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
              allRequiredDone
                ? "bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 cursor-pointer"
                : "bg-[#0F172A] text-[#334155] border border-[#1E293B] cursor-not-allowed"
            }`}
          >
            Continue to Market & Language →
          </button>
        </div>

      </div>
    </div>
  );
}