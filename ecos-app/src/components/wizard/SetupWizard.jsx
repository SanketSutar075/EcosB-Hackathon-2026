// FILE: src/components/wizard/SetupWizard.jsx

import { useState } from "react";
import { useWizardStore } from "../../store/wizardStore";
import Step1_Platforms   from "./steps/Step1_Platforms";
import Step2_Market      from "./steps/Step2_Market";
import Step3_Niche       from "./steps/Step3_Niche";
import Step4_Exclusions  from "./steps/Step4_Exclusions";
import AgentDashboard    from "../dashboard/AgentDashboard";
import { wizardAPI }     from "../../services/api";

const STEPS = [
  { number: 1, label: "Platforms"  },
  { number: 2, label: "Market"     },
  { number: 3, label: "Niche"      },
  { number: 4, label: "Exclusions" },
];

function WizardProgressBar({ currentStep }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#020817]/90 backdrop-blur-sm border-b border-[#0F172A]">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
        <span className="text-xs font-bold text-[#3B82F6] tracking-widest uppercase shrink-0">ECOS</span>
        <span className="text-[#1E293B] text-xs shrink-0">|</span>
        <div className="flex items-center gap-1 flex-1 overflow-x-auto">
          {STEPS.map((s, i) => {
            const done   = currentStep > s.number;
            const active = currentStep === s.number;
            return (
              <div key={s.number} className="flex items-center gap-1 shrink-0">
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all duration-300 ${
                  active ? "bg-[#1E3A5F] text-[#93C5FD] border border-[#3B82F6]" :
                  done   ? "bg-[#052E16] text-[#4ADE80] border border-[#16A34A]" :
                           "bg-[#0F172A] text-[#334155] border border-[#1E293B]"
                }`}>
                  <span>{done ? "✓" : s.number}</span>
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-4 h-px transition-colors duration-300 ${done ? "bg-[#16A34A]" : "bg-[#1E293B]"}`} />
                )}
              </div>
            );
          })}
        </div>
        <span className="text-[11px] text-[#334155] shrink-0">{currentStep} / {STEPS.length}</span>
      </div>
      <div className="h-[2px] bg-[#0F172A]">
        <div
          className="h-full bg-gradient-to-r from-[#3B82F6] to-[#6366F1] transition-all duration-500"
          style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default function SetupWizard() {
  const {
    wizard, goToStep,
    updateConnections, updateMarket, updateNiche, updateExclusions,
    getFinalConfig,
  } = useWizardStore();

  const [launched,     setLaunched]     = useState(false);
  const [finalConfig,  setFinalConfig]  = useState(null);
  const [sessionId,    setSessionId]    = useState(null);
  const [saving,       setSaving]       = useState(false);
  const [saveError,    setSaveError]    = useState(null);

  // ── Called when user clicks "Launch Setup & Start Agents" ───────
  const handleLaunch = async (exclusionData) => {
    updateExclusions(exclusionData);
    const config = getFinalConfig();

    setSaving(true);
    setSaveError(null);

    try {
      // ── POST to backend ──────────────────────────────────────────
      const response = await wizardAPI.save(config);
      console.log("✅ Wizard saved — sessionId:", response.sessionId);
      setSessionId(response.sessionId);
    } catch (err) {
      // Backend down? Log the error but still let the demo proceed
      console.warn("⚠️  Backend save failed (running in offline demo mode):", err.message);
      setSaveError(err.message);
    } finally {
      setSaving(false);
      setFinalConfig(config);
      setLaunched(true); // always transition to dashboard
    }
  };

  // ── Show Agent Dashboard once launched ─────────────────────────
  if (launched) {
    return (
      <AgentDashboard
        config={finalConfig}
        sessionId={sessionId}
        onBack={() => {
          setLaunched(false);
          goToStep(4);
        }}
      />
    );
  }

  return (
    <div className="font-['Sora',sans-serif]">
      <WizardProgressBar currentStep={wizard.step} />
      <div className="pt-14">

        {wizard.step === 1 && (
          <Step1_Platforms
            connections={wizard.connections}
            onConnectionChange={(id, val) => updateConnections(id, val)}
            onNext={() => goToStep(2)}
          />
        )}

        {wizard.step === 2 && (
          <Step2_Market
            marketData={wizard.market}
            onMarketChange={(data) => updateMarket(data)}
            onBack={() => goToStep(1)}
            onNext={(data) => { updateMarket(data); goToStep(3); }}
          />
        )}

        {wizard.step === 3 && (
          <Step3_Niche
            nicheData={wizard.niche}
            onNicheChange={(data) => updateNiche(data)}
            onBack={() => goToStep(2)}
            onNext={(data) => { updateNiche(data); goToStep(4); }}
          />
        )}

        {wizard.step === 4 && (
          <Step4_Exclusions
            exclusionData={wizard.exclusions}
            onBack={() => goToStep(3)}
            onFinish={(data) => handleLaunch(data)}
            saving={saving}
          />
        )}

      </div>

      {/* Backend status toast */}
      {saveError && (
        <div className="fixed bottom-4 right-4 z-50 bg-[#1C1200] border border-[#92400E] text-[#F59E0B] text-xs px-4 py-3 rounded-xl shadow-xl max-w-xs">
          ⚠️ Backend offline — running in demo mode
        </div>
      )}
      {saving && (
        <div className="fixed bottom-4 right-4 z-50 bg-[#0A1628] border border-[#1E3A5F] text-[#93C5FD] text-xs px-4 py-3 rounded-xl shadow-xl">
          ⏳ Saving config to backend…
        </div>
      )}
    </div>
  );
}