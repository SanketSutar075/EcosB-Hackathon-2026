// FILE: src/agents/trackingAgent.js
// Agent 8 — Tracking Agent (Mock)

export async function runTrackingAgent(config, context = {}) {
  return {
    agentId: "tracking",
    platform: "Shopify + GTM + All Ad Platforms",
    intelligence: "GTM + next-step-button setup pushes Meta tracking accuracy from ~85% toward 99%. Always use Facebook Analytics tab (not Events tab) for funnel optimisation decisions — they show different data.",

    trackingStack: [
      {
        platform:    "Meta Pixel + Conversions API (CAPI)",
        icon:        "📘",
        status:      "installed",
        accuracy:    "~85% baseline → ~99% with GTM enhancement",
        method:      "Browser pixel + server-side CAPI deduplication",
        events: [
          { event: "ViewContent",       fired: true,  value: false, note: "Fires on product page load"            },
          { event: "AddToCart",         fired: true,  value: false, note: "Fires on add-to-cart button click"     },
          { event: "InitiateCheckout",  fired: true,  value: false, note: "Fires on checkout page load"           },
          { event: "Purchase",          fired: true,  value: true,  note: "Fires with order value — server-side"  },
        ],
        note: "CAPI passes Purchase events server-side for iOS 14.5+ users who block browser tracking. Critical for accurate ROAS reporting.",
      },
      {
        platform:    "TikTok Pixel + Server-Side Events (SSE)",
        icon:        "🎵",
        status:      "installed",
        accuracy:    "~82%",
        method:      "Browser pixel + TikTok Events API server-side",
        events: [
          { event: "ViewContent", fired: true,  value: false },
          { event: "AddToCart",   fired: true,  value: false },
          { event: "Purchase",    fired: true,  value: true,  note: "Server-side deduplication enabled" },
        ],
        note: "TikTok server-side events essential for UK audience — high iOS usage among 25–45 demographic.",
      },
      {
        platform:    "Google Tag Manager (GTM)",
        icon:        "🏷️",
        status:      "installed",
        accuracy:    "~99%",
        method:      "dataLayer push on every conversion event + next-step-button trigger",
        events: [
          { event: "purchase",           fired: true, note: "GA4 + Google Ads conversion"   },
          { event: "add_to_cart",        fired: true, note: "GA4 enhanced ecommerce"        },
          { event: "begin_checkout",     fired: true, note: "GA4 funnel step"               },
          { event: "view_item",          fired: true, note: "GA4 product view"              },
          { event: "next_step_button",   fired: true, note: "Boosts Meta accuracy to ~99%"  },
        ],
        note: "Next-step-button trigger fires a server-side CAPI event every time user advances through checkout — pushes Meta baseline accuracy from 85% toward 99%.",
      },
      {
        platform:    "Google Merchant Center",
        icon:        "🛒",
        status:      "installed",
        accuracy:    "Feed quality: 94%",
        method:      "Shopify Google & YouTube app — automatic feed sync",
        feedStatus: {
          totalProducts:   1,
          approved:        1,
          disapproved:     0,
          feedQualityScore:"94%",
          note:            "Feed quality score of 94% — 60% of Pmax Shopping performance determined by feed quality. Title and description optimised with target keywords.",
        },
      },
      {
        platform:    "Funnel Analytics (Separate from Ad Platforms)",
        icon:        "📊",
        status:      "installed",
        accuracy:    "100% — server-side, not affected by ad blockers",
        method:      "Shopify Analytics + custom GTM dataLayer funnel events",
        funnelSteps: [
          { step: "Ad Click",                 metricName: "Sessions from Paid",  note: "Source: Shopify Analytics" },
          { step: "Funnel Entry (Advertorial)",metricName: "Advertorial Sessions",note: "GTM page_type = advertorial" },
          { step: "Advertorial CTR",           metricName: "Click to Offer Page", note: "GTM CTA click event"       },
          { step: "Offer Page CTR",            metricName: "Add to Cart Rate",    note: "GTM add_to_cart"           },
          { step: "Checkout Conversion",       metricName: "Purchase Rate",       note: "Shopify checkout complete"  },
        ],
        note: "Facebook Events tab and Analytics tab show different data — always use Analytics tab for funnel optimisation decisions, not Events tab.",
      },
    ],

    verificationStatus: {
      metaTestEvents:    "All 4 events verified in Meta Events Manager test tool",
      tiktokTestEvents:  "All 3 events verified in TikTok Events Manager",
      gtmPreview:        "All tags firing correctly in GTM Preview mode",
      googleAdsConv:     "Conversion action verified — test transaction processed",
      shopifyAnalytics:  "Funnel report showing correct step-by-step data",
    },

    summary: "Full attribution stack installed and verified. No manual action required. Optimization Agent will monitor accuracy drift weekly and alert if any event stops firing.",
  };
}