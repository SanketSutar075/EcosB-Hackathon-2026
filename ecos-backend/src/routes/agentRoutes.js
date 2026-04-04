// FILE: src/routes/agentRoutes.js
// All /api/agents/* endpoints

import { Router } from "express";
import { runSingleAgent, runFullPipeline } from "../utils/agentRunner.js";

const router = Router();

// ── GET /api/agents/health ──────────────────────────────────────
router.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "ECOS Agent service is running (mock mode)",
    ts:      new Date().toISOString(),
  });
});

// ── GET /api/agents/list ────────────────────────────────────────
router.get("/list", (_req, res) => {
  res.json({
    success: true,
    agents: [
      { id: "research",     number: 1,  name: "Research Agent",       checkpoint: true  },
      { id: "evaluation",  number: 2,  name: "Evaluation Agent",      checkpoint: true  },
      { id: "sourcing",    number: 3,  name: "Sourcing Agent",        checkpoint: false },
      { id: "content",     number: 4,  name: "Content Agent",         checkpoint: true  },
      { id: "landing",     number: 5,  name: "Landing Page Builder",  checkpoint: true  },
      { id: "creative",    number: 6,  name: "Creative Agent",        checkpoint: true  },
      { id: "adlaunch",    number: 7,  name: "Ad Launch Agent",       checkpoint: false },
      { id: "tracking",    number: 8,  name: "Tracking Agent",        checkpoint: false },
      { id: "email",       number: 9,  name: "Email & LTV Agent",     checkpoint: true  },
      { id: "optimization",number: 10, name: "Optimization Agent",    checkpoint: false },
    ],
  });
});

// ── POST /api/agents/run/:agentId ───────────────────────────────
// Run a single agent — body: { config, context }
router.post("/run/:agentId", async (req, res, next) => {
  try {
    const { agentId }               = req.params;
    const { config = {}, context = {} } = req.body;

    if (!config || Object.keys(config).length === 0) {
      return res.status(400).json({
        success: false,
        error:   "Request body must include a non-empty `config` object.",
      });
    }

    console.log(`\n▶  Running agent: \x1b[33m${agentId}\x1b[0m`);
    const result = await runSingleAgent(agentId, config, context);
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
});

// ── POST /api/agents/pipeline ───────────────────────────────────
// Run all 10 agents sequentially — body: { config }
router.post("/pipeline", async (req, res, next) => {
  try {
    const { config = {} } = req.body;

    if (!config || Object.keys(config).length === 0) {
      return res.status(400).json({
        success: false,
        error:   "Request body must include a non-empty `config` object.",
      });
    }

    console.log("\n▶  Starting full pipeline…");
    const result = await runFullPipeline(config);
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
});

export default router;