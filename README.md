# ECOS — AI-Powered Product Launch Platform

> **neoBIM GmbH Hackathon 2026 · Team ECOS**  
> *From zero to live product — in one session.*

---

## 🚀 What is ECOS?

ECOS is a full-stack AI agentic system that automates the entire e-commerce product launch pipeline. Instead of spending 300+ hours and $15,000+ on agencies, operators configure ECOS once — and 10 specialized AI agents handle everything from market research to live ad campaigns.

**Built on IEEE research** — Human-in-the-Loop framework, confidence scoring, retry feedback loops, and inter-agent context passing.

---

## 🎯 Key Features

| Feature | Description |
|---------|-------------|
| **10 AI Agent Pipeline** | Research → Evaluate → Source → Content → Landing → Creative → Ads → Track → Email → Optimise |
| **Human-in-the-Loop** | 6 checkpoint agents pause for human review — approve or retry with feedback |
| **Confidence Scoring** | Every agent outputs 0–100% confidence score |
| **Retry with Feedback** | Reject any output, write a note, agent re-runs with your feedback |
| **Full Audit Trail** | Every decision, timestamp, retry note logged — JSON export |
| **ECOS Copilot** | Floating AI chatbot with full launch context |
| **1-Click Deploy** | 7-stage terminal simulation — Shopify, Meta, TikTok, Google, Klaviyo, GTM |
| **Post-Launch Monitor** | Live orders counter, conversion funnel, ad performance, Day 1 recommendations |
| **Revenue Chart** | Animated Revenue vs Ad Spend (Week 1) in Optimization Agent |

---

## 🏗️ Tech Stack

```
Frontend:   React 18 + Vite + Tailwind CSS + Recharts
Backend:    Node.js + Express (port 5000)
API:        REST — real HTTP calls from frontend to backend
Mode:       Mock/Stub — hyper-realistic hardcoded data (zero API cost)
```

---

## 📁 Project Structure

```
ecos-app/                     ← React Frontend (Vite)
├── src/
│   ├── components/
│   │   ├── wizard/           ← 4-step Setup Wizard
│   │   ├── dashboard/        ← Agent Dashboard + Audit Trail
│   │   ├── agents/           ← 10 Agent screens
│   │   ├── copilot/          ← ECOS Copilot chatbot
│   │   ├── charts/           ← Revenue Chart (Recharts)
│   │   ├── deploy/           ← Deploy Modal + Post-Launch Dashboard
│   │   └── audit/            ← Audit Trail
│   ├── services/
│   │   └── api.js            ← Centralized API service
│   └── store/
│       └── wizardStore.js    ← Wizard state management

ecos-backend/                 ← Node.js + Express Backend
├── src/
│   ├── server.js             ← Main Express server (port 5000)
│   ├── routes/
│   │   ├── agentRoutes.js    ← POST /api/agents/run/:agentId
│   │   └── wizardRoutes.js   ← POST /api/wizard/save
│   ├── utils/
│   │   └── agentRunner.js    ← Pipeline orchestrator
│   ├── agents/               ← 10 mock agent files
│   │   ├── researchAgent.js
│   │   ├── evaluationAgent.js
│   │   ├── sourcingAgent.js
│   │   ├── contentAgent.js
│   │   ├── landingAgent.js
│   │   ├── creativeAgent.js
│   │   ├── adLaunchAgent.js
│   │   ├── trackingAgent.js
│   │   ├── emailAgent.js
│   │   └── optimizationAgent.js
│   ├── config/
│   │   └── claude.js         ← Mock client (no API key needed)
│   └── middleware/
│       ├── errorHandler.js
│       └── requestLogger.js
```

---

## ⚙️ Setup & Run Instructions

### Prerequisites
- Node.js v18+ installed
- npm v9+ installed

### Step 1 — Clone / Download
```bash
# If using git
git clone <repo-url>

# Or unzip the downloaded file
```

### Step 2 — Install Backend Dependencies
```bash
cd ecos-backend
npm install
```

### Step 3 — Install Frontend Dependencies
```bash
cd ../ecos-app
npm install
```

### Step 4 — Run Backend
```bash
# Terminal 1
cd ecos-backend
npm run dev
```
Backend starts on `http://localhost:5000`

Expected output:
```
╔══════════════════════════════════════════╗
║     🚀  ECOS Backend  —  MOCK MODE        ║
║  URL  : http://localhost:5000              ║
║  Mode : Mock (no API key needed)           ║
╚══════════════════════════════════════════╝
```

### Step 5 — Run Frontend
```bash
# Terminal 2
cd ecos-app
npm run dev
```
Frontend starts on `http://localhost:5173`

### Step 6 — Open Browser
```
http://localhost:5173
```

---

## 🎬 Demo Walkthrough

### Full Flow (5 minutes)

1. **Setup Wizard** — Complete 4 steps:
   - Step 1: Connect platforms (all pre-connected)
   - Step 2: Select market (United Kingdom)
   - Step 3: Choose niche (Fitness), price range, margin, avatar
   - Step 4: Set exclusion rules → **"🚀 Launch Setup & Start Agents"**

2. **Agent Dashboard** — Click **"▶ Run All Agents"**
   - Agents run sequentially (3–5 second delay each — realistic simulation)
   - Checkpoint agents pause at "Needs Review"
   - Click **"👁 Review Output"** to see full agent screen
   - Click **"✓ Approve"** or **"🔄 Retry"** with feedback note

3. **Key Agent Screens to Show:**
   - 🔬 Research Agent → Posture Corrector Pro, verbatim customer quotes
   - ⚖️ Evaluation Agent → Strong Go, 3.2x ROAS, 6 Profit Levers
   - 📈 Optimization Agent → Animated Revenue Chart, A/B tests

4. **ECOS Copilot** → Click 🤖 bubble → Ask "What should I do next?"

5. **1-Click Deploy** → Terminal logs → "🚀 ALL SYSTEMS GO"

6. **Post-Launch Monitor** → Live orders counter, conversion funnel, Next Steps

7. **📋 Audit Trail** → Click "Audit" button → See all decisions logged

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/agents/health` | Health check |
| GET | `/api/agents/list` | List all 10 agents |
| POST | `/api/agents/run/:agentId` | Run a single agent |
| POST | `/api/agents/pipeline` | Run full pipeline |
| POST | `/api/wizard/save` | Save wizard config |
| GET | `/api/wizard/session/:id` | Get session by ID |

### Example API Call
```bash
curl -X POST http://localhost:5000/api/agents/run/research \
  -H "Content-Type: application/json" \
  -d '{
    "config": {
      "market": { "country": "United Kingdom", "currency": "GBP" },
      "niche": { "niche": "fitness", "priceMin": 29, "priceMax": 79, "margin": 30 },
      "exclusions": { "excluded": [] }
    }
  }'
```

---

## 📚 Research Foundation

Built on 6 peer-reviewed papers:

| Paper | Implementation in ECOS |
|-------|------------------------|
| IEEE ICA 2025 — Agentic AI Systems | Handoff & cueing patterns between 10 agents |
| HULA — Atlassian 2024 | 6 Human-in-the-Loop checkpoint agents |
| Self-Refine — 2024 | Retry with Feedback button |
| IEEE Survey 2025 — Agentic AI Mainstream | Market validation |
| SMMEs Study 2024 | Small business agentic AI patterns |
| IJCAI 2025 — LLM Feedback Mechanisms | Inter-agent context passing |

---

## 📦 Open Source Licenses

All dependencies use MIT License — unrestricted commercial use permitted:

| Package | License |
|---------|---------|
| React | MIT |
| Express | MIT |
| Recharts | MIT |
| Tailwind CSS | MIT |
| PptxGenJS | MIT |
| Vite | MIT |

---

## 👤 Team

**Team ECOS B** · neoBIM GmbH Hackathon 2026  
Agreement Reference: HACK-2026-001

---
