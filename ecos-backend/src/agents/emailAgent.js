// FILE: src/agents/emailAgent.js
// Agent 9 — Email & LTV Agent (Mock)

export async function runEmailAgent(config, context = {}) {
  const product = context.research?.products?.[0]?.name || "Posture Corrector Pro";
  const market  = config.market?.country || "United Kingdom";

  return {
    agentId:      "email",
    product,
    market,
    platform:     "Klaviyo",
    intelligence: "Email is the highest-ROI channel — you own the list, no algorithm can tax your reach. Average cart abandonment is 70%. The 5-email checkout abandonment sequence systematically recovers that revenue. Never discount in Email 1 — many customers convert from a reminder alone.",
    totalFlows:   8,
    totalEmails:  22,

    flows: [
      {
        name:     "Welcome Series",
        icon:     "👋",
        emails:   3,
        trigger:  "New subscriber (lead magnet opt-in or checkout signup)",
        status:   "live",
        avgOpenRate: "52%",
        note:     "Brand story + posture education + first-purchase incentive. Builds trust before the ask.",
        emailSummary: [
          "Email 1 (Day 0): Welcome + brand story — who we are and why we built this",
          "Email 2 (Day 2): The posture crisis — educational content builds authority",
          "Email 3 (Day 4): 10% off first order — time-limited incentive",
        ],
      },
      {
        name:     "Browse Abandonment",
        icon:     "👀",
        emails:   2,
        trigger:  "Viewed product page — no add to cart within 1 hour",
        status:   "live",
        avgOpenRate: "38%",
        note:     "Soft reminder with no discount. Show product + top review. Many convert without incentive.",
        emailSummary: [
          "Email 1 (1hr after view): 'Still thinking about your posture?' — product highlight",
          "Email 2 (24hrs after view): Customer story testimonial — social proof nudge",
        ],
      },
      {
        name:     "Cart Abandonment",
        icon:     "🛒",
        emails:   3,
        trigger:  "Added to cart — no checkout initiated within 2 hours",
        status:   "live",
        avgOpenRate: "44%",
        note:     "Social proof → urgency → incentive. Three-email arc before checkout abandonment sequence kicks in.",
        emailSummary: [
          "Email 1 (2hrs):  'You left something behind' — cart reminder, no discount",
          "Email 2 (24hrs): Social proof focus — review carousel + 14,000 customers",
          "Email 3 (48hrs): 10% off unlock — 'Your cart expires in 24 hours'",
        ],
      },
      {
        name:     "Checkout Abandonment",
        icon:     "💳",
        emails:   5,
        trigger:  "Reached checkout — no purchase within 1 hour",
        status:   "live",
        avgOpenRate: "49%",
        note:     "5-email sequence — never discount in Email 1. 70% average cart abandonment rate means this single flow can recover 15–20% of lost revenue.",
        emailSummary: [
          "Email 1 (1hr):   'Complete your order' — simple reminder, no discount",
          "Email 2 (6hrs):  Social proof + mild urgency — '14,000 people made this decision'",
          "Email 3 (24hrs): 10% incentive unlock — 'A small gift to help you decide'",
          "Email 4 (48hrs): Final urgency — 'Your reserved price expires tonight'",
          "Email 5 (72hrs): Qualitative research — 'What stopped you?' — builds trust + insight",
        ],
      },
      {
        name:     "Instant Upsell",
        icon:     "⚡",
        emails:   1,
        trigger:  "Purchase confirmed — fires within 15 minutes of order",
        status:   "live",
        avgOpenRate: "61%",
        note:     "Lumbar support cushion offer — 22% take rate. Sent while purchase excitement is highest.",
        emailSummary: [
          "Email 1 (15min post-purchase): 'Complete your ergonomic setup' — Lumbar Cushion upsell at £29",
        ],
      },
      {
        name:     "Post-Purchase Nurture",
        icon:     "📦",
        emails:   4,
        trigger:  "Purchase confirmed — day 1 onwards",
        status:   "live",
        avgOpenRate: "46%",
        note:     "Usage education, expectation-setting, refund reduction. Most refunds happen in the first 7 days — this flow cuts refund rate by addressing doubts proactively.",
        emailSummary: [
          "Email 1 (Day 1):  Order confirmed + what to expect in the first week",
          "Email 2 (Day 3):  How to wear the device correctly — video tutorial link",
          "Email 3 (Day 7):  Week 1 check-in + community encouragement",
          "Email 4 (Day 21): Results check-in — request a review, offer referral discount",
        ],
      },
      {
        name:     "Winback",
        icon:     "🔄",
        emails:   3,
        trigger:  "No purchase or engagement in 90 days",
        status:   "live",
        avgOpenRate: "22%",
        note:     "Re-engagement with new offer. Opens with curiosity subject line — avoids mention of discount until Email 3.",
        emailSummary: [
          "Email 1 (Day 0):  'We miss you' — curiosity subject, no offer",
          "Email 2 (Day 3):  New product update or social proof since they left",
          "Email 3 (Day 7):  Final winback offer — 15% off, expires in 48 hours",
        ],
      },
      {
        name:     "Sunset",
        icon:     "🌅",
        emails:   1,
        trigger:  "No engagement in 180+ days",
        status:   "live",
        avgOpenRate: "14%",
        note:     "List hygiene — suppress unresponsive contacts. Protects sender reputation and deliverability score.",
        emailSummary: [
          "Email 1: 'Should we stay in touch?' — confirm opt-in or auto-unsubscribe. Cleans list, protects domain health.",
        ],
      },
    ],

    checkoutAbandonmentSequence: [
      { num: 1, subject: "You left something in your cart…",              angle: "Reminder",  openRate: "54%", note: "No discount. Many customers convert from a simple reminder alone." },
      { num: 2, subject: "14,000 people can't be wrong",                  angle: "Proof",     openRate: "48%", note: "Lead with social proof + mild urgency. No discount yet." },
      { num: 3, subject: "Here's 10% off — just for you",                 angle: "Incentive", openRate: "51%", note: "Unlock the discount. Time-limited 48hr expiry." },
      { num: 4, subject: "Your offer expires at midnight tonight",         angle: "Urgency",   openRate: "43%", note: "Final urgency push. Emphasise the guarantee — zero risk." },
      { num: 5, subject: "Quick question — what stopped you deciding?",    angle: "Research",  openRate: "39%", note: "Qualitative insight email. Non-purchasers who reply give invaluable objection data." },
    ],

    listHealthSettings: {
      suppressAfterDays:     180,
      doubleOptIn:           true,
      bounceHandling:        "Auto-suppress after 1 hard bounce",
      unsubscribeHandling:   "Instant global suppression",
      gdprCompliant:         true,
      klaviyoSenderScore:    94,
    },
  };
}