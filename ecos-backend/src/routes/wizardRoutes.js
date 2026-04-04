// FILE: src/routes/wizardRoutes.js

import { Router } from "express";

const router   = Router();
const sessions = new Map(); // in-memory store — no DB needed for MVP

// ── POST /api/wizard/save ────────────────────────────────────────
// Frontend sends completed wizard config here after "Launch" is clicked
router.post("/save", (req, res) => {
  const { config } = req.body;

  if (!config || typeof config !== "object") {
    return res.status(400).json({
      success: false,
      error:   "Request body must include a `config` object.",
    });
  }

  const sessionId = `session_${Date.now()}`;
  sessions.set(sessionId, {
    config,
    createdAt: new Date().toISOString(),
  });

  console.log(`\n✅ Wizard config saved → sessionId: ${sessionId}`);
  console.log(
    `   Market : ${config.market?.country || "—"} | Niche: ${config.niche?.niche || "—"}`
  );

  res.json({
    success:   true,
    sessionId,
    message:   "Setup config saved — agents are ready to run.",
  });
});

// ── GET /api/wizard/session/:sessionId ───────────────────────────
router.get("/session/:sessionId", (req, res) => {
  const session = sessions.get(req.params.sessionId);

  if (!session) {
    return res.status(404).json({
      success: false,
      error:   `Session not found: ${req.params.sessionId}`,
    });
  }

  res.json({ success: true, ...session });
});

// ── GET /api/wizard/sessions  (dev only) ─────────────────────────
router.get("/sessions", (req, res) => {
  if (process.env.NODE_ENV !== "development") {
    return res.status(403).json({ success: false, error: "Not available in production." });
  }

  const list = Array.from(sessions.entries()).map(([id, data]) => ({
    sessionId:  id,
    market:     data.config?.market?.country,
    niche:      data.config?.niche?.niche,
    createdAt:  data.createdAt,
  }));

  res.json({ success: true, count: list.length, sessions: list });
});

export default router;