// FILE: src/agents/creativeAgent.js
// Agent 6 — Creative Agent (Mock)

export async function runCreativeAgent(config, context = {}) {
  const product = context.research?.products?.[0]?.name || "Posture Corrector Pro";

  return {
    agentId: "creative",
    product,
    formula:      "Winner Ad Formula: Hook → Problem → Solutions → Benefits → Trust → CTA/Offer",
    testingRule:  "80/20: 80% extends proven patterns, 20% explores new concepts",
    intelligence: "90% of ad success comes from creative. One creative = one message. Apply 2x speed, 10-metre, 360p quality test before launch.",

    creatives: [
      {
        id:       1,
        angle:    "Pain Angle",
        hookType: "pain",
        emoji:    "😣",
        format:   "UGC Video · 30s",
        platform: "Meta + TikTok",
        status:   "approved",
        headline: "\"My neck was ruined after 3 years WFH. This fixed it in 3 weeks.\"",
        winnerAdScript: {
          hook:      "POV: your neck hurts so bad after 8 hours at a desk that you can't sleep. Sound familiar?",
          problem:   "Working from home has absolutely destroyed my posture. I'd wake up stiff, get headaches every afternoon, and I was starting to look genuinely hunched in photos.",
          solutions: "I tried foam rollers. Physio at £90 a session. YouTube stretches. Nothing worked long-term because nothing was actually retraining my muscles.",
          benefits:  "3 weeks with the Posture Corrector Pro and my neck pain is basically gone. I wear it 20 minutes in the morning and my body just... holds itself correctly now.",
          trust:     "14,000 five-star reviews on Amazon UK. 91% of users see improvement in under 3 weeks. 60-day money-back guarantee.",
          cta:       "Link in bio — they're running a limited 48-hour offer with free next-day delivery. Don't wait til the pain gets worse.",
        },
        qualityTests: {
          twoXSpeed:  { pass: true,  note: "Message clear at 2x — hook lands in first 2 seconds" },
          tenMetre:   { pass: true,  note: "Visual contrast sufficient — product clearly visible at distance" },
          threeSixtyP:{ pass: true,  note: "Text overlay readable at low resolution" },
        },
        emotionalMotivator: "Fear (spinal damage) + Relief (pain-free mornings)",
        buyerType:  "Green — Harmony (responds to shared community pain)",
      },
      {
        id:       2,
        angle:    "Result-Driven Angle",
        hookType: "result",
        emoji:    "📊",
        format:   "Static Image + Copy",
        platform: "Meta (Feed + Stories)",
        status:   "approved",
        headline: "23° posture improvement in 3 weeks — peer-reviewed data",
        winnerAdScript: {
          hook:      "Study: 240 desk workers. 6 weeks. 91% reported significant pain reduction.",
          problem:   "Conventional posture advice requires conscious effort 24/7 — which is why it never sticks.",
          solutions: "Biofeedback tension technology trains muscle memory automatically — no willpower needed.",
          benefits:  "23° average posture angle improvement. 67% reduction in tension headaches. Measurable results in 21 days.",
          trust:     "CE certified. Used by NHS physiotherapy patients. 14,000+ five-star UK reviews.",
          cta:       "See the full study — and get yours at today's lowest price →",
        },
        qualityTests: {
          twoXSpeed:  { pass: true,  note: "Static image — headline and stats readable instantly" },
          tenMetre:   { pass: true,  note: "High-contrast design: white text on dark background" },
          threeSixtyP:{ pass: true,  note: "Single focus image — no detail lost at low res" },
        },
        emotionalMotivator: "Aspiration (peak performance) + Authority (clinical validation)",
        buyerType:  "Blue — Analytical (responds to data and proof)",
      },
      {
        id:       3,
        angle:    "Aspiration Angle",
        hookType: "audience",
        emoji:    "🏆",
        format:   "VSL · 60s",
        platform: "Meta + YouTube Pre-roll",
        status:   "pending",
        headline: "For the WFH professional who refuses to let their desk job ruin their health",
        winnerAdScript: {
          hook:      "You've got the standing desk. The ergonomic chair. The monitor riser. But your posture is still letting you down.",
          problem:   "Because those tools don't fix the underlying problem — weak postural muscles that have forgotten how to hold correct alignment.",
          solutions: "The Posture Corrector Pro doesn't just remind you to sit up straight. It physically retrains your muscles to hold the correct position without thinking.",
          benefits:  "20 minutes a day. 3 weeks. Walk into any room with the posture of someone who's completely in control.",
          trust:     "Trusted by 14,000+ professionals across the UK. The performance upgrade your setup has been missing.",
          cta:       "Free delivery. 60-day guarantee. No risk. Link below.",
        },
        qualityTests: {
          twoXSpeed:  { pass: true,  note: "Core message deliverable at 2x — hook works without audio" },
          tenMetre:   { pass: false, note: "⚠️ Recommend increasing headline font size in thumbnail — text too small at distance" },
          threeSixtyP:{ pass: true,  note: "Clean visual composition holds at 360p" },
        },
        emotionalMotivator: "Aspiration (status + identity) + Belonging (WFH professional community)",
        buyerType:  "Gold — Authority (responds to prestige and identity)",
        actionRequired: "Revise thumbnail: increase headline font size by 40% before launch.",
      },
    ],

    emotionalMotivatorsMap: [
      { motivator: "Fear (health)",      covered: true,  angle: "Pain Angle"        },
      { motivator: "Aspiration",         covered: true,  angle: "Aspiration Angle"  },
      { motivator: "Belonging",          covered: true,  angle: "Pain Angle"        },
      { motivator: "Authority",          covered: true,  angle: "Result-Driven"     },
      { motivator: "Convenience",        covered: false, angle: null                },
      { motivator: "FOMO / Scarcity",    covered: false, angle: null                },
      { motivator: "Pride",              covered: true,  angle: "Aspiration Angle"  },
      { motivator: "Guilt",              covered: false, angle: null                },
      { motivator: "Safety",             covered: true,  angle: "Pain Angle"        },
      { motivator: "Self-improvement",   covered: true,  angle: "Result-Driven"     },
    ],
  };
}