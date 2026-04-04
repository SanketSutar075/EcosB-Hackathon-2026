// FILE: src/agents/sourcingAgent.js
// Agent 3 — Sourcing Agent (Mock)

export async function runSourcingAgent(config, context = {}) {
  const product = context.research?.products?.[0]?.name || "Posture Corrector Pro";

  return {
    agentId:  "sourcing",
    product,
    searchedPlatforms: ["Alibaba", "1688", "AliExpress", "Private Agent Network"],
    suppliers: [
      {
        id:          1,
        name:        "Shenzhen PostureTech Co., Ltd.",
        platform:    "Alibaba",
        unitCost:    5.20,
        moq:         100,
        shippingDays:"12–16",
        defectRate:  "1.2%",
        rating:      4.8,
        isVerified:  true,
        isRecommended: true,
        certifications: ["CE", "RoHS"],
        notes:       "Longest track record in category. QC reports available on request. Willing to customise packaging at 200+ units.",
        negotiationNote: "Quoted £5.20 at MOQ 100. Confirmed £4.10 at 500/month. Volume commitment in writing before placing first order.",
      },
      {
        id:          2,
        name:        "Guangzhou HealthGear International",
        platform:    "1688",
        unitCost:    4.80,
        moq:         200,
        shippingDays:"14–18",
        defectRate:  "2.1%",
        rating:      4.5,
        isVerified:  true,
        isRecommended: false,
        certifications: ["CE"],
        notes:       "Lower unit cost but higher MOQ and elevated defect rate. Agent negotiation required — 1688 direct requires Chinese business entity.",
        negotiationNote: "Use defect rate data (2.1% vs industry 1.0%) to negotiate £0.30/unit price reduction.",
      },
      {
        id:          3,
        name:        "AliExpress Direct — PostureShop Store",
        platform:    "AliExpress",
        unitCost:    6.90,
        moq:         1,
        shippingDays:"18–25",
        defectRate:  "3.4%",
        rating:      4.2,
        isVerified:  false,
        isRecommended: false,
        certifications: [],
        notes:       "High unit cost and longest shipping times. Only suitable for initial sample order to test product quality before committing to Alibaba.",
        negotiationNote: "Use only for samples. Do not scale through AliExpress.",
      },
    ],
    recommendedSupplier: "Shenzhen PostureTech Co., Ltd.",
    landedCostBreakdown: {
      unitCostFOB:       5.20,
      internationalShip: 1.10,
      ukCustomsDuty:     0.52,
      packagingBranding: 0.90,
      qualityInspection: 0.18,
      totalLandedCost:   7.90,
      sellingPrice:      49.00,
      grossMarginGBP:    41.10,
      grossMarginPct:    83.9,
    },
    scalingProjection: {
      units100PerMonth: { landedCost: 7.90, monthlySpend:  790  },
      units500PerMonth: { landedCost: 5.80, monthlySpend:  2900, annualSaving: 12600 },
      units1000PerMonth:{ landedCost: 4.60, monthlySpend:  4600, annualSaving: 39600 },
    },
    intelligenceNote: "Committing to 500 units/month unlocks a £1.40/unit COGs reduction. At 500 orders/day, a £2/unit reduction = £360,000/year in additional profit — the single highest-leverage action in the first 90 days.",
  };
}