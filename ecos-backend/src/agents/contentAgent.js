// FILE: src/agents/contentAgent.js
// Agent 4 — Content Agent (Mock)

export async function runContentAgent(config, context = {}) {
  const product = context.research?.products?.[0]?.name || "Posture Corrector Pro";
  const market  = config.market?.country   || "United Kingdom";
  const lang    = config.market?.language  || "English";
  const avatar  = context.research?.products?.[0]?.avatar?.name || "Office Worker · 28–45";

  return {
    agentId: "content",
    product,
    market,
    language: lang,
    avatar,
    frameworksApplied: ["8-Step Advertorial Structure", "PAVS Framework", "4 Buyer Types", "Winner Ad Formula"],

    advertorial: {
      headline:     "This Embarrassing Office Habit Is Silently Destroying Your Spine — And Most People Don't Realise Until It's Too Late",
      lead:         "If you spend more than 4 hours a day at a desk, there's a 73% chance your posture is already causing irreversible micro-damage to your cervical vertebrae. Most people ignore it until the pain becomes unbearable — then they spend thousands on physiotherapy, trying to undo years of neglect.",
      problem:      "The modern office has created a silent epidemic. Hunched over laptops, craning necks toward screens, slumping into chairs — we've normalised positions that our spines were never designed to handle for 8+ hours a day. The result? Chronic neck pain. Tension headaches. Rounded shoulders that make you look 10 years older in every photo.",
      agitation:    "And the solutions most people try? They fail. Foam rollers feel good for 10 minutes then do nothing. YouTube stretches require discipline most of us don't have after a full workday. Physiotherapy works — but at £80–£120 per session, how many sessions can you really afford? Meanwhile, the damage compounds. Every day you sit without correction is another day the problem gets worse.",
      solution:     "The Posture Corrector Pro uses a patented biofeedback tension system — the moment your shoulders begin to round, the device provides gentle resistance that trains your postural muscles to hold correct alignment automatically. No apps. No reminders. No willpower. Just 20 minutes a day for 3 weeks, and your body remembers the correct position on its own.",
      proof:        "In a 6-week study of 240 desk workers, 91% reported significant reduction in neck and shoulder pain. Average improvement in posture angle: 23°. Average reduction in tension headache frequency: 67%. Over 14,000 five-star reviews across Amazon UK and Trustpilot. NHS physiotherapists recommend postural correction devices as the first step before manual treatment.",
      productPresentation: "The Posture Corrector Pro is built from medical-grade neoprene, fully adjustable to all body types, and designed to be worn discreetly under clothing. It comes with a 60-day posture improvement guarantee — if you don't see measurable improvement in 8 weeks, we return every penny. No questions, no forms, no hassle.",
      cta:          "For the next 48 hours, we're offering the Posture Corrector Pro at our lowest ever UK price — with free next-day Royal Mail delivery and a 60-day no-questions-asked return guarantee. Your spine has already waited long enough. Fix it today.",
    },

    adAngles: [
      {
        id:           1,
        type:         "Pain Angle",
        hookType:     "pain",
        buyerType:    "Green (Harmony)",
        pavs:         true,
        headline:     "\"My neck was ruined after 3 years WFH. This fixed it in 3 weeks.\"",
        hook:         "If your neck still hurts after a full night's sleep — your desk setup is destroying your spine.",
        problem:      "8 hours hunched over a laptop. Every. Single. Day. Your cervical spine isn't built for this — and the damage is already happening.",
        agitate:      "Physiotherapy costs £90/session. You'll need at least 12. That's over £1,000 to fix what a £49 device could have prevented.",
        validate:     "14,000+ UK office workers have already made the switch — and 91% report less pain within 3 weeks.",
        solve:        "The Posture Corrector Pro trains your muscles to hold alignment automatically. 20 minutes a day. No apps. No willpower.",
        cta:          "Try it free for 60 days →",
        status:       "approved",
      },
      {
        id:           2,
        type:         "Result-Driven Angle",
        hookType:     "result",
        buyerType:    "Blue (Analytical)",
        pavs:         true,
        headline:     "23° posture improvement in 3 weeks — backed by peer-reviewed research",
        hook:         "What if fixing your posture was as automatic as brushing your teeth?",
        problem:      "Most posture solutions require constant conscious effort — which means they fail the moment life gets busy.",
        agitate:      "You've tried reminders. You've tried stretches. You start strong for 3 days, then forget. Meanwhile the damage worsens.",
        validate:     "Clinical study: 240 participants. 91% pain reduction. 23° average posture improvement. 6-week controlled trial.",
        solve:        "Biofeedback tension technology creates muscle memory automatically. Once trained, your body holds alignment on its own — no device needed.",
        cta:          "See the clinical data →",
        status:       "approved",
      },
      {
        id:           3,
        type:         "Aspiration Angle",
        hookType:     "audience",
        buyerType:    "Gold (Authority)",
        pavs:         true,
        headline:     "For the WFH professional who refuses to let their desk job ruin their health",
        hook:         "You've optimised your workflow. Your monitor setup. Your calendar. But have you optimised the one thing that affects everything — your posture?",
        problem:      "High performers obsess over productivity tools, morning routines, and supplements. Yet the one physical habit that directly impacts energy, confidence, and longevity gets ignored.",
        agitate:      "Rounded shoulders signal low status in every meeting — Zoom or in-person. And the chronic pain drains cognitive resources you could be using elsewhere.",
        validate:     "Elite athletes and surgeons use posture correction devices to maintain performance under sustained load. The same technology is now available for desk workers.",
        solve:        "The Posture Corrector Pro is the performance tool your setup is missing. Wear it 20 minutes daily. Build the posture of someone who owns the room.",
        cta:          "Upgrade your setup →",
        status:       "pending",
      },
    ],

    buyerTypeCoverage: [
      { type: "Blue",   label: "Analytical", responds: "Data, clinical proof, statistics",     covered: true,  coveredBy: "Result-Driven Angle" },
      { type: "Green",  label: "Harmony",    responds: "Community, testimonials, shared pain", covered: true,  coveredBy: "Pain Angle" },
      { type: "Gold",   label: "Authority",  responds: "Expert validation, prestige, identity",covered: true,  coveredBy: "Aspiration Angle" },
      { type: "Orange", label: "Spontaneous",responds: "Excitement, FOMO, bold claims",       covered: false, coveredBy: null },
    ],

    productPageElements: [
      "Hero headline using verbatim customer language",
      "Problem-agitate section above the fold",
      "3-step 'how it works' with mechanism explanation",
      "Social proof block: 14,000+ reviews, star rating",
      "Clinical study callout: 23° improvement, 6-week trial",
      "Video demonstration: product in use",
      "Bundle options with savings highlighted",
      "FAQ section addressing top 3 objections",
      "60-day money-back guarantee badge",
      "Trust signals: NHS mention, CE certified, UK shipping",
      "Scarcity element: limited-time pricing",
      "CTA button: above fold + below proof section",
      "Exit-intent popup with first-order discount",
      "Mobile-optimised layout: single column, large CTA",
      "Sticky add-to-cart bar on scroll",
    ],
  };
}