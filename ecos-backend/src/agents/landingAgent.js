// FILE: src/agents/landingAgent.js
// Agent 5 — Landing Page Builder Agent (Mock)

export async function runLandingAgent(config, context = {}) {
  const product = context.research?.products?.[0]?.name || "Posture Corrector Pro";
  const market  = config.market?.country || "United Kingdom";

  return {
    agentId: "landing",
    product,
    market,
    platform:    "Shopify",
    builtFrom:   "Competitor analysis of 14 top-converting stores in the posture/health niche",
    intelligence: "Built bottom-up: Checkout fixed first → Offer Page → Advertorial. A broken checkout wastes every optimisation above it.",

    funnelLayers: [
      {
        layer:          "Layer 1 · Advertorial",
        icon:           "📰",
        url:            "/blogs/health/posture-secrets",
        status:         "built",
        conversionRate: "4.2%",
        description:    "Warm traffic page — story-driven, educational, no hard sell. Mirrors the advertorial copy from Content Agent. CTA leads to Sales Page.",
        keyElements: [
          "No Shopify header/nav — distraction-free read",
          "Progress bar to encourage scroll",
          "In-article CTA at 60% scroll depth",
          "Social proof callouts inline with story",
          "Mobile reading time: estimated 4 minutes",
        ],
      },
      {
        layer:          "Layer 2 · Sales / Offer Page",
        icon:           "🛒",
        url:            "/products/posture-corrector-pro",
        status:         "built",
        conversionRate: "11.8%",
        description:    "Present the product, overcome objections, present the offer. All 15 elements of successful sales text applied.",
        keyElements: [
          "Hero: before/after posture comparison image",
          "Mechanism explanation: biofeedback tension system",
          "Social proof: 14,000 reviews, average 4.8 stars",
          "Bundle selector: Single / 2-Pack / Family Pack",
          "Objection crusher FAQ: 3 top objections answered",
          "60-day guarantee with badge",
          "Sticky CTA bar on mobile",
        ],
      },
      {
        layer:          "Layer 3 · Checkout",
        icon:           "💳",
        url:            "/checkout",
        status:         "built",
        conversionRate: "68.4%",
        description:    "Minimal friction, social proof before payment button, pre-selected best-value bundle.",
        keyElements: [
          "Progress indicator: 3 steps (Cart → Details → Payment)",
          "Trust badges inline with payment form",
          "Social proof block directly above Pay button",
          "Pre-selected: 2-Pack (best value, highest margin)",
          "Minimal fields: name, email, address, card",
          "Express checkout: Shop Pay, Apple Pay, Google Pay",
          "Visible returns & shipping policy",
        ],
      },
    ],

    checkoutOptimisationChecklist: [
      { item: "Social proof directly before payment button",       done: true  },
      { item: "Pre-selected best-value bundle (2-Pack)",           done: true  },
      { item: "Trust badges: SSL, 60-day guarantee, free returns", done: true  },
      { item: "Visible shipping & return policy inline",           done: true  },
      { item: "Minimal form fields (5 fields total)",              done: true  },
      { item: "Progress indicator (3 steps)",                      done: true  },
      { item: "Post-purchase upsell — Lumbar Support Cushion",     done: true  },
    ],

    postPurchaseUpsell: {
      product:       "Lumbar Support Cushion",
      price:         29,
      timing:        "Immediately after purchase confirmation — before order summary",
      projectedTakeRate: "22%",
      aovImpact:     "Increases AOV from £49 to £67 (37% uplift) with zero additional ad spend",
      copyHook:      "\"Customers who bought the Posture Corrector Pro also added this to complete their ergonomic setup...\"",
    },

    homepageSections: [
      "Hero banner: headline + subheadline + CTA + trust badges",
      "Social proof bar: review count + star rating + press logos",
      "Problem section: 3 pain points with icons",
      "Product feature section: mechanism + benefits",
      "Before/after gallery",
      "Review carousel: 6 real customer reviews",
      "Bundle/pricing section",
      "60-day guarantee block",
      "Brand story: why we built this",
      "Final CTA with urgency element",
    ],

    seoMetadata: {
      title:       "Posture Corrector Pro | Fix Back & Neck Pain From Home | Free UK Delivery",
      description: "Clinically tested posture corrector used by 14,000+ UK office workers. Fix chronic neck and back pain in 3 weeks. 60-day money-back guarantee. Free next-day delivery.",
      targetKeywords: ["posture corrector UK", "back pain office worker", "neck pain WFH fix", "posture brace adults"],
    },
  };
}