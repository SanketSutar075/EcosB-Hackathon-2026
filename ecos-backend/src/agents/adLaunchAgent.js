// FILE: src/agents/adLaunchAgent.js
// Agent 7 — Ad Launch Agent (Mock)

export async function runAdLaunchAgent(config, context = {}) {
  const product = context.research?.products?.[0]?.name || "Posture Corrector Pro";
  const market  = config.market?.country || "United Kingdom";

  return {
    agentId: "adlaunch",
    product,
    market,
    launchDate:    new Date().toISOString().split("T")[0],
    totalDailyBudget: "£355/day",
    intelligence:  "Start Google with Manual CPC, graduate to Target CPA/ROAS after 30+ conversions. Never include branded keywords in Pmax — keep in dedicated brand campaign to avoid inflated ROAS.",

    campaigns: [
      {
        platform:  "Meta",
        icon:      "📘",
        type:      "CBO Testing Campaign",
        structure: "3 ad sets · 1 creative per angle · Pain / Result / Aspiration",
        dailyBudget: "£150/day",
        status:    "live",
        details: {
          campaignObjective: "Conversions — Purchase",
          bidStrategy:       "Lowest Cost (auto)",
          audiences: [
            "Broad — UK, 25–55, all genders",
            "Interest: Back Pain, WFH, Ergonomics",
            "Lookalike 1% — UK purchasers (seed from Klaviyo)",
          ],
          scheduledRules: "Auto-pause ad sets with CPA > £35 after £50 spend",
        },
        intelligenceNote: "CBO lets Meta allocate budget to winning ad sets automatically. Test for 72 hours before making scaling decisions.",
      },
      {
        platform:  "TikTok",
        icon:      "🎵",
        type:      "Spark Ads — UGC Native",
        structure: "2 ad sets · Pain angle UGC · Platform-native creative format",
        dailyBudget: "£60/day",
        status:    "live",
        details: {
          campaignObjective: "Complete Payment",
          bidStrategy:       "Lowest Cost",
          audiences: [
            "UK — 22–45 — Office Workers interest cluster",
            "UK — Broad — Health & Wellness interest",
          ],
          creativeNote: "Using Spark Ads format — boosts existing organic-style posts for authenticity",
        },
        intelligenceNote: "YouTube creatives that win on Meta typically transfer well to TikTok. Test Meta winner first before producing net-new TikTok content.",
      },
      {
        platform:  "Google Search",
        icon:      "🔍",
        type:      "Branded + High-Intent Keywords",
        structure: "Separate branded campaign — branded KWs never in Pmax",
        dailyBudget: "£40/day",
        status:    "live",
        details: {
          bidStrategy:    "Manual CPC → Target CPA after 30 conversions",
          keywordGroups: [
            "Branded: [posture corrector pro], [posturecorrectorpro.co.uk]",
            "High intent: [buy posture corrector uk], [best posture brace 2024]",
            "Problem: [fix bad posture], [neck pain desk job remedy]",
          ],
          negativeKeywords: ["free", "DIY", "exercise", "stretches"],
        },
        intelligenceNote: "Manual CPC first — the algorithm needs 30+ conversions before automated bidding strategies become reliable.",
      },
      {
        platform:  "Google Pmax",
        icon:      "🎯",
        type:      "Performance Max",
        structure: "20+ images, 3 videos, 5+ headlines, all extensions enabled",
        dailyBudget: "£80/day",
        status:    "live",
        details: {
          assetGroupName: "Posture Pro — Main Asset Group",
          headlines:      ["Fix Your Posture in 3 Weeks", "14,000 Five-Star Reviews", "60-Day Money-Back Guarantee", "Free Next-Day UK Delivery", "The WFH Back Pain Solution"],
          descriptions:   ["Clinically tested posture corrector trusted by 14,000+ UK office workers.", "Train your muscles to hold correct alignment automatically — no effort required."],
          automatedRules: "Daily spend cap £80. Alert if CPA exceeds £30 for 3 consecutive days.",
        },
        intelligenceNote: "Pmax requires proper Google Merchant Center setup before launch — feed quality determines 60% of Shopping ad performance.",
      },
      {
        platform:  "YouTube",
        icon:      "▶️",
        type:      "Remarketing — In-Market Audiences",
        structure: "Repurposed winning Meta creatives · 15s + 30s cuts",
        dailyBudget: "£25/day",
        status:    "scheduled",
        scheduledFor: "Day 7 — after Meta data collected to inform audience targeting",
        details: {
          targetAudiences: [
            "Website visitors — last 30 days",
            "YouTube remarketing: viewed health content",
            "In-market: Back Pain Relief, Ergonomic Products",
          ],
          creativeFormat: "TrueView In-Stream — skippable after 5 seconds",
        },
        intelligenceNote: "Launch YouTube remarketing after 7 days of Meta data — use Meta's winning creative as YouTube pre-roll to avoid net-new production cost.",
      },
    ],

    retargetingSegments: [
      {
        segment:     "0–3 days",
        angle:       "\"Saved for You\"",
        platform:    "Meta + Google Display",
        copy:        "You were looking at the Posture Corrector Pro — it's still available with free delivery.",
        description: "Gentle reminder. No discount. Most high-intent customers convert at this stage.",
      },
      {
        segment:     "3–7 days",
        angle:       "\"Still Thinking?\"",
        platform:    "Meta + Email",
        copy:        "Still deciding? Here's what 14,000 customers said after 3 weeks...",
        description: "Social proof focus + mild urgency. Show review carousel creative.",
      },
      {
        segment:     "7–14 days",
        angle:       "\"Last Chance\"",
        platform:    "Meta + Email",
        copy:        "Your special price expires at midnight — 60-day guarantee, zero risk.",
        description: "Final urgency + incentive. 10% discount unlocked for persistent non-converters.",
      },
    ],

    budgetSummary: {
      meta:          "£150/day",
      tiktok:        "£60/day",
      googleSearch:  "£40/day",
      googlePmax:    "£80/day",
      youTube:       "£25/day (from day 7)",
      totalLaunchDay:"£330/day",
      totalWeek1:    "£2,310",
      projectedWeek1Revenue: "£7,392 (at 3.2x ROAS)",
    },
  };
}