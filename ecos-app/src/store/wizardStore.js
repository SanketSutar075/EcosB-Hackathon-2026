// FILE: src/store/wizardStore.js

import { useState } from "react";

export const initialWizardState = {
  step: 1,
  connections: {},
  market: { country: null, language: "", currency: "" },
  niche: { niche: "", customNiche: "", priceMin: "", priceMax: "", margin: 30, avatar: "" },
  exclusions: { excluded: [], keywords: [] },
};

export function useWizardStore() {
  const [wizard, setWizard] = useState(initialWizardState);

  const goToStep = (stepNumber) =>
    setWizard((prev) => ({ ...prev, step: stepNumber }));

  const updateConnections = (platformId, isConnected) =>
    setWizard((prev) => ({
      ...prev,
      connections: { ...prev.connections, [platformId]: isConnected },
    }));

  const updateMarket = (marketData) =>
    setWizard((prev) => ({ ...prev, market: { ...prev.market, ...marketData } }));

  const updateNiche = (nicheData) =>
    setWizard((prev) => ({ ...prev, niche: { ...prev.niche, ...nicheData } }));

  const updateExclusions = (exclusionData) =>
    setWizard((prev) => ({ ...prev, exclusions: { ...prev.exclusions, ...exclusionData } }));

  const resetWizard = () => setWizard(initialWizardState);

  const getFinalConfig = () => ({
    connections: wizard.connections,
    market: wizard.market,
    niche: wizard.niche,
    exclusions: wizard.exclusions,
    createdAt: new Date().toISOString(),
  });

  return {
    wizard,
    goToStep,
    updateConnections,
    updateMarket,
    updateNiche,
    updateExclusions,
    resetWizard,
    getFinalConfig,
  };
}