// FILE: src/services/api.js
// Centralized API service — all backend calls go through here

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ── Generic fetch wrapper ────────────────────────────────────────
async function apiFetch(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  try {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
    return data;
  } catch (err) {
    console.error(`[API] ${options.method || "GET"} ${path} failed:`, err.message);
    throw err;
  }
}

// ── Wizard ───────────────────────────────────────────────────────
export const wizardAPI = {
  /** Send completed wizard config to backend — returns { sessionId } */
  save: (config) =>
    apiFetch("/api/wizard/save", {
      method: "POST",
      body:   JSON.stringify({ config }),
    }),
};

// ── Agents ───────────────────────────────────────────────────────
export const agentsAPI = {
  /** Health check */
  health: () => apiFetch("/api/agents/health"),

  /** Run a single agent — returns { agentId, output, duration, … } */
  runAgent: (agentId, config, context = {}) =>
    apiFetch(`/api/agents/run/${agentId}`, {
      method: "POST",
      body:   JSON.stringify({ config, context }),
    }),

  /** Run full pipeline — returns { pipelineId, results } */
  runPipeline: (config) =>
    apiFetch("/api/agents/pipeline", {
      method: "POST",
      body:   JSON.stringify({ config }),
    }),

  /** Get agent list */
  list: () => apiFetch("/api/agents/list"),
};