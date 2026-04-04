// FILE: src/agents/evaluationAgent.js
// Agent 2 — Evaluation Agent (Mock)
// Returns Go/No-Go decisions with viability scores and 6 Profit Lever breakdowns

export async function runEvaluationAgent(config, context = {}) {
  const { niche = {}, market = {} } = config;

  // Pull product names from Research Agent output if available
  const researchProducts = context.research?.products || [];
  const p1 = researchProducts[0]?.name || "Posture Corrector Pro";
  const p2 = researchProducts[1]?.name || "Magnetic Phone Mount";
  const p3 = researchProducts[2]?.name || "Foldable Laptop Stand";

  return {
    agentId: "evaluation",
    evaluatedFor: market.country || "United Kingdom",
    minimumMarginThreshold: niche.margin || 30,
    targetPriceRange: { min: niche.priceMin || 29, max: niche.priceMax || 79 },
    evaluationFramework: "6 Profit Levers + UMS Assessment + ROAS Projection",
    evaluations: [
      // ── Product 1 — Strong Go ──────────────────────────────────
      {
        productName:    p1,
        productEmoji:   "🦴",
        viabilityScore: 91,
        decision:       "go",
        verdict:        "Strong Go",
        riskLevel:      "low",
        certFlags:      [],
        umsStrength:    "strong",
        umsNote:        "Clear, demonstrable mechanism — biofeedback tension system realigns spine passively. Believable on video, unique from all competitor claims. Customer can immediately understand WHY it works differently.",
        emotionalCoverage: [
          "Fear (irreversible spinal damage)",
          "Aspiration (confident upright posture)",
          "Belonging (WFH community — we all suffer this)",
          "Safety (NHS back pain statistics credibility)",
        ],
        pillars: {
          marketDemand:  94,
          competition:   72,
          marginHealth:  88,
          riskScore:     95,
        },
        financials: {
          sellingPrice:     49,
          landedCost:       11,
          grossMargin:      78,
          estimatedCAC:     18,
          estimatedAOV:     67,
          breakEvenROAS:    1.4,
          projectedROAS:    3.2,
          monthlyRevenueAt100Orders:  4900,
          monthlyProfitAt100Orders:   3367,
        },
        roasVerdict: "Projected ROAS (3.2x) is well above break-even (1.4x). Campaign is financially viable to launch immediately.",
        profitLevers: [
          {
            lever:  "Price Optimisation Headroom",
            score:  85,
            note:   "Market tolerates £49–£69 with premium positioning. A/B test £59 with 'clinically validated' framing — could increase revenue per visitor by 20% without volume loss.",
          },
          {
            lever:  "COGs Reduction Potential",
            score:  78,
            note:   "Current COGS £8. Committing to 300 units/month unlocks £5.50 supplier price — saving £750/month. At 500 units/day: £2/unit reduction = £360K/year.",
          },
          {
            lever:  "AOV Uplift (Bundles + Upsells)",
            score:  90,
            note:   "Lumbar support cushion post-purchase upsell at £29 — projected 22% take rate based on avatar pain profile. Increases AOV from £49 to £67 without additional ad spend.",
          },
          {
            lever:  "Defect Rate Risk",
            score:  82,
            note:   "Low defect category (elastic + plastic). Supplier defect history: 1.2%. QC inspection recommended at 1,000+ units. Risk remains low with proper supplier vetting.",
          },
          {
            lever:  "Retargeting Recovery",
            score:  88,
            note:   "High purchase intent — customers research for 3–7 days. 5-email checkout abandonment sequence + Facebook retargeting (0–14 days) should recover 15–20% of abandoned carts.",
          },
          {
            lever:  "Brand Search Value",
            score:  71,
            note:   "Brand search campaigns viable after month 2 of awareness spend. Branded keywords at £0.08–£0.15 CPC vs category keywords at £0.80+. Strong long-term margin driver.",
          },
        ],
      },

      // ── Product 2 — Conditional Go ─────────────────────────────
      {
        productName:    p2,
        productEmoji:   "🚗",
        viabilityScore: 76,
        decision:       "go",
        verdict:        "Conditional Go",
        riskLevel:      "medium",
        certFlags:      [
          "CE marking may be required for electromagnetic compatibility in EU/UK markets",
          "Verify magnet strength compliance with UK road safety guidelines before scaling",
        ],
        umsStrength:    "moderate",
        umsNote:        "N52 magnet mechanism exists and is demonstrable. However, 28 competitors claim the same 'super strong magnet' angle. Creative differentiation is essential — focus on the PROBLEM (phone falling mid-navigation) not the magnet spec.",
        emotionalCoverage: [
          "Safety (distracted driving fear)",
          "Convenience (one-handed mounting)",
          "Aesthetic (clean dashboard pride)",
        ],
        pillars: {
          marketDemand:  87,
          competition:   48,
          marginHealth:  92,
          riskScore:     65,
        },
        financials: {
          sellingPrice:     39,
          landedCost:       6,
          grossMargin:      85,
          estimatedCAC:     14,
          estimatedAOV:     39,
          breakEvenROAS:    1.6,
          projectedROAS:    2.5,
          monthlyRevenueAt100Orders:  3900,
          monthlyProfitAt100Orders:   3315,
        },
        roasVerdict: "Projected ROAS (2.5x) is above break-even (1.6x). Viable but thinner than Product 1. Creative quality will determine profitability.",
        profitLevers: [
          {
            lever:  "Price Optimisation Headroom",
            score:  60,
            note:   "Market is anchored at £29–£39. Testing £49 with a bundle (charging cable included) may unlock higher AOV without volume loss — test first, don't assume.",
          },
          {
            lever:  "COGs Reduction Potential",
            score:  90,
            note:   "Current COGS £4. Floor price approximately £2.50 at scale. Negotiate packaging cost reduction — custom box adds perceived value at minimal cost increase.",
          },
          {
            lever:  "AOV Uplift (Bundles + Upsells)",
            score:  72,
            note:   "Car organiser (£19) or USB-C charging cable bundle — estimated 18% take rate. Moderate AOV uplift potential.",
          },
          {
            lever:  "Defect Rate Risk",
            score:  55,
            note:   "Magnet delamination complaints found in 1-star reviews across 3 competitor SKUs. Strict QC protocol required. Request QC report from supplier before committing to volume.",
          },
          {
            lever:  "Retargeting Recovery",
            score:  80,
            note:   "Low price point makes retargeting ROI-positive above 50% of target recovery rate. Facebook 3-day window is the sweet spot for this category.",
          },
          {
            lever:  "Brand Search Value",
            score:  44,
            note:   "Highly commoditised category. Brand search unlikely to develop without a distinctive product story. Focus budget on acquisition not brand for first 90 days.",
          },
        ],
      },

      // ── Product 3 — No-Go ──────────────────────────────────────
      {
        productName:    p3,
        productEmoji:   "💻",
        viabilityScore: 58,
        decision:       "nogo",
        verdict:        "No-Go",
        riskLevel:      "high",
        certFlags:      [],
        umsStrength:    "weak",
        umsNote:        "No believable Unique Marketing Solution identified. 41 advertisers are running nearly identical 'ergonomic desk setup' angles with no meaningful creative differentiation. Without a UMS, any creative will bleed margin competing head-on with established players.",
        emotionalCoverage: [
          "Aspiration (clean desk aesthetic)",
        ],
        noGoReason:     "Projected ROAS (1.8x) falls below break-even (2.1x) at current ad costs. 41 active advertisers have driven CPMs up 34% YoY. No UMS means no creative edge. COGs too high relative to price point to absorb CAC. Recommend avoiding unless a genuinely differentiated angle is identified.",
        pillars: {
          marketDemand:  79,
          competition:   31,
          marginHealth:  74,
          riskScore:     50,
        },
        financials: {
          sellingPrice:     35,
          landedCost:       9,
          grossMargin:      74,
          estimatedCAC:     22,
          estimatedAOV:     35,
          breakEvenROAS:    2.1,
          projectedROAS:    1.8,
          monthlyRevenueAt100Orders:  3500,
          monthlyProfitAt100Orders:   1300,
        },
        roasVerdict: "⚠️ Projected ROAS (1.8x) is BELOW break-even (2.1x). Launching would result in net loss on ad spend.",
        profitLevers: [
          {
            lever:  "Price Optimisation Headroom",
            score:  35,
            note:   "Race to the bottom. Amazon average selling price has dropped 18% in 12 months. Testing higher prices likely to collapse conversion rate.",
          },
          {
            lever:  "COGs Reduction Potential",
            score:  68,
            note:   "Some room at scale but market price compression limits the benefit. Not enough to overcome the CAC problem.",
          },
          {
            lever:  "AOV Uplift (Bundles + Upsells)",
            score:  50,
            note:   "Mouse pad bundle possible but low incremental value. Customers in this category are price-sensitive.",
          },
          {
            lever:  "Defect Rate Risk",
            score:  60,
            note:   "Hinge quality complaints common across 6 competitor SKUs at this price point. Quality risk manageable but not negligible.",
          },
          {
            lever:  "Retargeting Recovery",
            score:  55,
            note:   "Below-breakeven ROAS makes retargeting marginal. Would only be viable if cold traffic ROAS improved significantly first.",
          },
          {
            lever:  "Brand Search Value",
            score:  30,
            note:   "Pure commodity — no brand search opportunity without substantial and sustained brand investment.",
          },
        ],
      },
    ],
    recommendation: `Proceed with \x22${p1}\x22 as primary product — Strong Go with 3.2x projected ROAS and clear UMS. \x22${p2}\x22 as secondary test — monitor creative performance in week 1. Do not launch \x22${p3}\x22.`,
  };
}