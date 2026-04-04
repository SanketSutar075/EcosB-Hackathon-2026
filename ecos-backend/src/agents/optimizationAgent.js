// FILE: src/agents/optimizationAgent.js
// Agent 10 — Optimization Agent (Mock)

export async function runOptimizationAgent(config, context = {}) {
  const product = context.research?.products?.[0]?.name || "Posture Corrector Pro";
  const market  = config.market?.country || "United Kingdom";

  return {
    agentId:      "optimization",
    product,
    market,
    reportPeriod: "Week 1 (Days 1–7)",
    reportDate:   new Date().toISOString().split("T")[0],
    overallStatus:"✅ All KPIs above target — scaling recommended",
    intelligence: "Run A/B tests with one variable at a time, 80/20 traffic split. Never scale a losing ad set — pause anything with CPA > 2× target after £50 spend. ROAS is a lagging indicator; watch CPM, CTR, and Add-to-Cart rate as early signals.",

    kpis: [
      { label: "ROAS",                  value: "3.2x",   target: "2.5x",   status: "above", trend: "↑", note: "Pain angle driving 3.8x — pulling overall ROAS above target" },
      { label: "CTR (Ads)",             value: "3.8%",   target: "2.5%",   status: "above", trend: "↑", note: "Pain angle UGC creative at 4.9% CTR — standout performer"     },
      { label: "CPA",                   value: "£14.20", target: "£18.00", status: "above", trend: "↑", note: "Meta CPA 23% below target — room to scale budget"              },
      { label: "AOV",                   value: "£61",    target: "£49",    status: "above", trend: "↑", note: "Lumbar cushion upsell taking at 22% — AOV uplift on track"     },
      { label: "Checkout Conv. Rate",   value: "7.2%",   target: "5.0%",   status: "above", trend: "↑", note: "Social proof before Pay button is working — don't change checkout" },
      { label: "Advertorial CTR",       value: "4.2%",   target: "3.0%",   status: "above", trend: "→", note: "Stable. Pain angle headline outperforming result angle by 31%"  },
      { label: "Cart Abandon Rate",     value: "64%",    target: "<70%",   status: "above", trend: "↓", note: "Email sequence recovering 18% of abandoned carts — on target"   },
      { label: "Defect Rate",           value: "1.1%",   target: "<2.0%",  status: "above", trend: "→", note: "Supplier quality holding. QC inspection booked at unit 1,000"   },
      { label: "Email Open Rate (Avg)", value: "46%",    target: "35%",    status: "above", trend: "↑", note: "Checkout abandonment sequence averaging 49% open rate"           },
      { label: "Refund Rate",           value: "2.1%",   target: "<4.0%",  status: "above", trend: "↓", note: "Post-purchase nurture flow reducing refund intent significantly"  },
    ],

    abTests: [
      {
        id:       1,
        element:  "Headline (Advertorial Page)",
        variantA: "Pain angle: 'This Embarrassing Office Habit Is Destroying Your Spine'",
        variantB: "Aspirational angle: 'The Performance Upgrade Every WFH Professional Needs'",
        winner:   "A",
        lift:     "+12% advertorial CTR",
        status:   "complete",
        traffic:  "80/20 split — 1,240 sessions per variant",
        insight:  "Pain angle significantly outperforms aspiration for cold traffic. Aspiration angle may work better for retargeting warm audiences.",
      },
      {
        id:       2,
        element:  "CTA Button Copy (Product Page)",
        variantA: "\"Get Yours Now\"",
        variantB: "\"Fix My Posture Today\"",
        winner:   "B",
        lift:     "+8% add-to-cart rate",
        status:   "complete",
        traffic:  "80/20 split — 890 sessions per variant",
        insight:  "Outcome-focused CTA ('Fix My Posture') outperforms generic CTA ('Get Yours Now'). Update all CTAs across funnel to outcome language.",
      },
      {
        id:       3,
        element:  "Price Point",
        variantA: "£49 — standard pricing",
        variantB: "£39 + free next-day shipping (same net margin)",
        winner:   null,
        lift:     "Running — insufficient data",
        status:   "running",
        traffic:  "80/20 split — 420 sessions so far (need 800+ per variant)",
        insight:  "Early signal: Variant B shows 14% higher add-to-cart rate. Allow 72 more hours before calling winner.",
      },
    ],

    scalingRecommendations: [
      "📈 Increase Meta CBO budget by 20% (£150 → £180/day) — Pain Angle ad set is the clear winner at £11.20 CPA. Scale the winner now.",
      "🎯 Graduate Google Search from Manual CPC to Target CPA — 47 verified conversions recorded, algorithm ready to optimise.",
      "📋 Duplicate Pain Angle ad set with 2× budget — Meta's winning creative should be scaled before CPM inflation reduces efficiency.",
      "⛔ Pause bottom 2 ad sets on Meta — Interest targeting (Ergonomics) and Lookalike 3% showing CPA > £32 after £60 spend. Reallocate budget.",
      "✉️  Add Email 5 (qualitative research) to checkout abandonment — currently only 4 emails deployed. Deploy 5th email to capture objection data.",
      "🛒 A/B test bundle pre-selection — test 3-Pack pre-selected vs 1-Pack. 3-Pack pre-selection may increase AOV from £61 to £84.",
      "📊 Begin brand search campaign — 47 branded keyword searches recorded in week 1. Launch dedicated brand campaign at £10/day to capture free-intent traffic.",
    ],

    weeklyRevenueSummary: {
      totalAdSpend:   "£2,310",
      totalRevenue:   "£7,392",
      totalProfit:    "£3,218",
      grossROAS:      "3.2x",
      netMarginPct:   "43.5%",
      ordersPlaced:   151,
      avgOrderValue:  "£61",
      refundsIssued:  3,
      netRevenue:     "£7,245",
    },

    nextReportDate: (() => {
      const d = new Date();
      d.setDate(d.getDate() + 7);
      return d.toISOString().split("T")[0];
    })(),
  };
}