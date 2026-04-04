// FILE: src/server.js
// ECOS Backend — Main Express Server (Mock Mode — no API key required)

import "dotenv/config";
import express from "express";
import cors    from "cors";
import helmet  from "helmet";
import morgan  from "morgan";

import agentRoutes  from "./routes/agentRoutes.js";
import wizardRoutes from "./routes/wizardRoutes.js";
import { errorHandler  } from "./middleware/errorHandler.js";
import { requestLogger } from "./middleware/requestLogger.js";

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Security ────────────────────────────────────────────────────
app.use(helmet());

// ── Body parsing ────────────────────────────────────────────────
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

// ── CORS — allow Vite dev server on port 5173 ───────────────────
app.use(
  cors({
    origin:      process.env.FRONTEND_URL || "http://localhost:5173",
    methods:     ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ── Logging ─────────────────────────────────────────────────────
app.use(morgan("dev"));
app.use(requestLogger);

// ── API Routes ──────────────────────────────────────────────────
app.use("/api/agents", agentRoutes);
app.use("/api/wizard", wizardRoutes);

// ── Root — API directory ────────────────────────────────────────
app.get("/", (_req, res) => {
  res.json({
    name:    "ECOS Backend API",
    version: "1.0.0-mock",
    status:  "✅ running",
    mode:    "MOCK — hyper-realistic simulation, no API key required",
    endpoints: {
      health:      "GET  /api/agents/health",
      agentList:   "GET  /api/agents/list",
      runAgent:    "POST /api/agents/run/:agentId",
      fullPipeline:"POST /api/agents/pipeline",
      saveWizard:  "POST /api/wizard/save",
      getSessions: "GET  /api/wizard/sessions  (dev only)",
    },
  });
});

// ── 404 ─────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error:   `Route not found: ${req.method} ${req.path}`,
  });
});

// ── Global error handler ────────────────────────────────────────
app.use(errorHandler);

// ── Start ────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log("\n\x1b[36m╔══════════════════════════════════════════╗\x1b[0m");
  console.log("\x1b[36m║     🚀  ECOS Backend  —  MOCK MODE        ║\x1b[0m");
  console.log("\x1b[36m╠══════════════════════════════════════════╣\x1b[0m");
  console.log(`\x1b[36m║\x1b[0m  URL  : \x1b[32mhttp://localhost:${PORT}\x1b[0m              \x1b[36m║\x1b[0m`);
  console.log(`\x1b[36m║\x1b[0m  Mode : \x1b[33mMock (no API key needed)\x1b[0m       \x1b[36m║\x1b[0m`);
  console.log("\x1b[36m╚══════════════════════════════════════════╝\x1b[0m\n");
});

export default app;