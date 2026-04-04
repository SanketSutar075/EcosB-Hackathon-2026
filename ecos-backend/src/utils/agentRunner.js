// FILE: src/utils/agentRunner.js
// Pipeline orchestrator — calls each agent mock in sequence

import { v4 as uuidv4 } from "uuid";

// ── Agent mock imports ───────────────────────────────────────────
import { runResearchAgent    } from "../agents/researchAgent.js";
import { runEvaluationAgent  } from "../agents/evaluationAgent.js";
import { runSourcingAgent    } from "../agents/sourcingAgent.js";
import { runContentAgent     } from "../agents/contentAgent.js";
import { runLandingAgent     } from "../agents/landingAgent.js";
import { runCreativeAgent    } from "../agents/creativeAgent.js";
import { runAdLaunchAgent    } from "../agents/adLaunchAgent.js";
import { runTrackingAgent    } from "../agents/trackingAgent.js";
import { runEmailAgent       } from "../agents/emailAgent.js";
import { runOptimizationAgent} from "../agents/optimizationAgent.js";

// ── Pipeline definition ─────────────────────────────────────────
const PIPELINE = [
  { id: "research",     label: "Research Agent",       fn: runResearchAgent,      checkpoint: true,  delay: [3000, 5000] },
  { id: "evaluation",  label: "Evaluation Agent",      fn: runEvaluationAgent,    checkpoint: true,  delay: [3000, 4500] },
  { id: "sourcing",    label: "Sourcing Agent",        fn: runSourcingAgent,      checkpoint: false, delay: [2000, 3500] },
  { id: "content",     label: "Content Agent",         fn: runContentAgent,       checkpoint: true,  delay: [4000, 6000] },
  { id: "landing",     label: "Landing Page Builder",  fn: runLandingAgent,       checkpoint: true,  delay: [2500, 4000] },
  { id: "creative",    label: "Creative Agent",        fn: runCreativeAgent,      checkpoint: true,  delay: [3000, 5000] },
  { id: "adlaunch",    label: "Ad Launch Agent",       fn: runAdLaunchAgent,      checkpoint: false, delay: [2000, 3000] },
  { id: "tracking",    label: "Tracking Agent",        fn: runTrackingAgent,      checkpoint: false, delay: [1500, 2500] },
  { id: "email",       label: "Email & LTV Agent",     fn: runEmailAgent,         checkpoint: true,  delay: [2500, 4000] },
  { id: "optimization",label: "Optimization Agent",    fn: runOptimizationAgent,  checkpoint: false, delay: [2000, 3500] },
];

// Helper — random delay within range to simulate real AI processing
const simulate = (min, max) =>
  new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * (max - min + 1)) + min));

/**
 * Run a single agent by ID
 */
export async function runSingleAgent(agentId, config, context = {}) {
  const agent = PIPELINE.find(a => a.id === agentId);
  if (!agent) {
    const err = new Error(`Unknown agent: "${agentId}". Valid IDs: ${PIPELINE.map(a=>a.id).join(", ")}`);
    err.status = 404;
    throw err;
  }

  const runId = uuidv4();
  const start = Date.now();

  console.log(`  🤖 [${runId.slice(0,8)}] ${agent.label} — simulating…`);
  await simulate(...agent.delay);

  const output   = await agent.fn(config, context);
  const duration = Date.now() - start;

  console.log(`  ✅ [${runId.slice(0,8)}] ${agent.label} — done in ${duration}ms`);

  return {
    runId,
    agentId,
    agentLabel: agent.label,
    checkpoint: agent.checkpoint,
    duration,
    output,
  };
}

/**
 * Run all 10 agents sequentially
 */
export async function runFullPipeline(config) {
  const pipelineId = uuidv4();
  const context    = {};
  const results    = {};

  console.log(`\n🚀 Pipeline [${pipelineId.slice(0,8)}] started — ${PIPELINE.length} agents`);

  for (const agent of PIPELINE) {
    try {
      await simulate(...agent.delay);
      const output         = await agent.fn(config, context);
      context[agent.id]    = output;
      results[agent.id]    = { status: "done", output };
      console.log(`  ✅ ${agent.label}`);
    } catch (err) {
      results[agent.id] = { status: "error", error: err.message };
      console.error(`  ❌ ${agent.label}: ${err.message}`);
      if (agent.checkpoint) {
        console.log("  ⛔ Pipeline halted at checkpoint failure.");
        break;
      }
    }
  }

  const doneCount = Object.values(results).filter(r => r.status === "done").length;
  console.log(`\n🏁 Pipeline [${pipelineId.slice(0,8)}] — ${doneCount}/${PIPELINE.length} agents completed\n`);

  return { pipelineId, agentsCompleted: doneCount, results };
}