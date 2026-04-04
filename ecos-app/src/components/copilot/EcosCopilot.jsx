// FILE: src/components/copilot/EcosCopilot.jsx
// ECOS AI Copilot — floating chatbot with smart e-commerce insights

import { useState, useRef, useEffect } from "react";

// ── Smart response engine ────────────────────────────────────────
const INTENT_MAP = [
  {
    keywords: ["roas", "return", "spend", "roi"],
    responses: [
      "📊 Based on your current setup, your projected ROAS is **3.2x** — well above the 2.5x break-even. The Pain Angle creative is driving the strongest return at 3.8x. I'd recommend scaling that ad set by 20% before touching anything else.",
      "📈 ROAS is a lagging indicator. Watch CPM, CTR, and Add-to-Cart rate as early signals in the first 48 hours. If CTR drops below 2%, the creative needs work — not the budget.",
    ],
  },
  {
    keywords: ["product", "niche", "research", "find"],
    responses: [
      "🔬 I analysed 14,000 Amazon reviews to surface the Posture Corrector Pro angle. The verbatim quote *'My neck hurts so bad after 8 hours at my desk'* appeared in 847 reviews — that's your headline, word for word.",
      "🎯 The 10-Item Research Checklist confirmed 9/10 for Posture Corrector Pro. The only unchecked item: market-specific UK regulatory knowledge. I flagged this for the Evaluation Agent automatically.",
    ],
  },
  {
    keywords: ["email", "klaviyo", "flow", "abandon"],
    responses: [
      "📧 Your 5-email checkout abandonment sequence is live. Industry average recovery rate is 5–8%. Based on your £49 price point and current traffic, I'm projecting **£1,200–£1,800/month** recovered from abandoned checkouts alone.",
      "✉️ Critical rule: never discount in Email 1. 34% of abandoners convert from a simple reminder. Save the 10% discount for Email 3 — you'll recover the same customers while preserving margin on the ones who would have bought anyway.",
    ],
  },
  {
    keywords: ["ad", "meta", "tiktok", "creative", "campaign"],
    responses: [
      "🎨 Your Pain Angle UGC video is at 4.9% CTR — that's exceptional. The benchmark for Meta health products is 2.1%. Don't touch it. Duplicate the ad set and increase budget by 20% while the algorithm is warm.",
      "🎬 The Winner Ad Formula: Hook → Problem → Solutions → Benefits → Trust → CTA. Your Pain Angle nails all 6. The Aspiration angle is failing the 10-metre test — thumbnail text is too small. Fix that before launch.",
    ],
  },
  {
    keywords: ["supplier", "cogs", "source", "cost", "margin"],
    responses: [
      "📦 Shenzhen PostureTech is your recommended supplier at £5.20/unit. Committing to 500 units/month unlocks £4.10 — that's a **£1.10/unit saving**. At 500 orders/day, this compounds to £360,000/year in additional profit.",
      "💰 Your landed cost breakdown: £5.20 unit + £1.10 shipping + £0.90 packaging = **£7.20 total**. At £49 selling price, that's 85.3% gross margin before ad spend. You have significant CAC headroom.",
    ],
  },
  {
    keywords: ["optimis", "scale", "grow", "next"],
    responses: [
      "📈 Week 1 recommendations in priority order: (1) Scale Pain Angle Meta budget +20%, (2) Graduate Google Search to Target CPA — you have 47 conversions, the algorithm is ready, (3) Deploy Email 5 in the abandonment sequence, (4) Pause bottom 2 ad sets draining budget.",
      "🚀 Your checkout conversion rate is 7.2% vs industry average of 3.1%. That's a **132% outperformance** — almost entirely attributable to placing social proof directly before the payment button. Don't touch the checkout.",
    ],
  },
  {
    keywords: ["track", "pixel", "gtm", "attribution"],
    responses: [
      "📡 Your GTM + next-step-button setup is pushing Meta tracking accuracy toward 99%. This means your ROAS data is reliable — most accounts at this stage are flying blind at 60–70% accuracy.",
      "🏷️ Critical note: Facebook Events tab and Analytics tab show different data. Always use the Analytics tab for funnel optimisation decisions. The Events tab overcounts due to deduplication differences.",
    ],
  },
  {
    keywords: ["hello", "hi", "hey", "start", "help", "what"],
    responses: [
      "👋 Hi! I'm the ECOS Copilot — I have full context on your product launch. I've analysed 14,000+ reviews, run your Evaluation scores, and tracked your Week 1 performance. Ask me about your ROAS, best ad angles, email flows, supplier margins, or what to do next.",
      "🤖 Hello! I'm running on the ECOS intelligence layer. I know your product (Posture Corrector Pro), your market (UK), and your current performance (3.2x ROAS, 7.2% checkout rate). What would you like to optimise first?",
    ],
  },
];

const FALLBACK_RESPONSES = [
  "🧠 Based on your ECOS data: your Posture Corrector Pro launch is performing in the top 8% of health products I've analysed. The biggest lever right now is scaling your Pain Angle Meta creative — it's at 4.9% CTR with a £11.20 CPA.",
  "💡 I cross-referenced your setup against 340+ product launches in this niche. Your 3-layer funnel conversion (4.2% → 11.8% → 68.4%) is exceptional. Most operators see 50% dropout at the advertorial stage — you're retaining 4.2% through to checkout.",
  "📊 Quick insight: your AOV of £61 is 24% above your base price of £49 — that's the Lumbar Cushion upsell working at a 22% take rate. At scale, this upsell alone could generate £15,000/month in incremental revenue at zero extra ad spend.",
  "🎯 Your 10-Item Research Checklist scored 9/10. The missing item is UK market-specific regulatory knowledge for health products. I'd recommend adding a brief 'CE marked, no medical claims' disclaimer to your advertorial before scaling above £500/day.",
];

function getResponse(input) {
  const lower = input.toLowerCase();
  for (const intent of INTENT_MAP) {
    if (intent.keywords.some(kw => lower.includes(kw))) {
      return intent.responses[Math.floor(Math.random() * intent.responses.length)];
    }
  }
  return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
}

// ── Message bubble ───────────────────────────────────────────────
function Bubble({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex gap-2 ${isUser ? "flex-row-reverse" : "flex-row"} items-end`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#6366F1] flex items-center justify-center text-xs shrink-0 mb-0.5">
          🤖
        </div>
      )}
      <div className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
        isUser
          ? "bg-[#3B82F6] text-white rounded-br-sm"
          : "bg-[#0F172A] border border-[#1E293B] text-[#E2E8F0] rounded-bl-sm"
      }`}>
        {msg.text.split("**").map((part, i) =>
          i % 2 === 1
            ? <strong key={i} className="font-bold text-white">{part}</strong>
            : <span key={i}>{part}</span>
        )}
        <div className={`text-[9px] mt-1 ${isUser ? "text-blue-200" : "text-[#475569]"}`}>
          {msg.time}
        </div>
      </div>
    </div>
  );
}

// ── Typing indicator ─────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex gap-2 items-end">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#6366F1] flex items-center justify-center text-xs shrink-0">
        🤖
      </div>
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1 items-center">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

const now = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const INITIAL_MESSAGES = [
  {
    id: 1,
    role: "bot",
    text: "👋 Hi! I'm the **ECOS Copilot** — your AI launch strategist. I have full context on your product, market, and agent outputs. Ask me anything about your launch.",
    time: now(),
  },
  {
    id: 2,
    role: "bot",
    text: "💡 Quick win: your Pain Angle creative is at **4.9% CTR** — 2× the industry benchmark. I'd scale that ad set by 20% today.",
    time: now(),
  },
];

const SUGGESTED = [
  "What should I do next?",
  "How's my ROAS looking?",
  "Best supplier option?",
  "Scale my campaigns",
];

export default function EcosCopilot() {
  const [open,     setOpen]     = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input,    setInput]    = useState("");
  const [typing,   setTyping]   = useState(false);
  const [pulse,    setPulse]    = useState(true);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  // Stop pulsing after first open
  useEffect(() => { if (open) setPulse(false); }, [open]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  const sendMessage = (text) => {
    const userText = text || input.trim();
    if (!userText) return;
    setInput("");

    const userMsg = { id: Date.now(), role: "user", text: userText, time: now() };
    setMessages(p => [...p, userMsg]);
    setTyping(true);

    // Simulate thinking delay 1.2–2.2s
    const delay = 1200 + Math.random() * 1000;
    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        role: "bot",
        text: getResponse(userText),
        time: now(),
      };
      setMessages(p => [...p, botMsg]);
      setTyping(false);
    }, delay);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <>
      {/* ── Floating bubble ── */}
      <button
        onClick={() => setOpen(p => !p)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#6366F1] shadow-2xl shadow-blue-500/40 flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        title="ECOS Copilot"
      >
        {open ? "✕" : "🤖"}
        {/* Pulse ring */}
        {pulse && !open && (
          <span className="absolute inset-0 rounded-full bg-[#3B82F6] opacity-40 animate-ping" />
        )}
        {/* Unread dot */}
        {!open && (
          <span className="absolute top-1 right-1 w-3 h-3 bg-[#4ADE80] rounded-full border-2 border-[#020817]" />
        )}
      </button>

      {/* ── Chat panel ── */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] h-[520px] flex flex-col rounded-2xl border border-[#1E293B] bg-[#020817] shadow-2xl shadow-black/60 overflow-hidden font-['Sora',sans-serif]"
          style={{ animation: "slideUp 0.25s ease-out" }}>
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap');
            @keyframes slideUp { from { opacity:0; transform:translateY(16px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
          `}</style>

          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[#0F172A] bg-gradient-to-r from-[#0F172A] to-[#0A1628] shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#6366F1] flex items-center justify-center text-lg shrink-0">
              🤖
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white">ECOS Copilot</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                <span className="text-[10px] text-[#4ADE80]">Online — launch context loaded</span>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-[#475569] hover:text-white transition-colors text-lg leading-none">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin">
            {messages.map(msg => <Bubble key={msg.id} msg={msg} />)}
            {typing && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* Suggested prompts */}
          {messages.length <= 3 && !typing && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {SUGGESTED.map(s => (
                <button key={s} onClick={() => sendMessage(s)}
                  className="text-[10px] text-[#3B82F6] border border-[#1E3A5F] bg-[#0A1628] hover:bg-[#0F2650] px-2.5 py-1 rounded-full transition-all">
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-3 pb-3 shrink-0 border-t border-[#0F172A] pt-3">
            <div className="flex gap-2 items-end bg-[#0F172A] border border-[#1E293B] rounded-xl px-3 py-2 focus-within:border-[#3B82F6] transition-colors">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about your launch…"
                rows={1}
                className="flex-1 bg-transparent text-xs text-white placeholder-[#334155] resize-none focus:outline-none leading-relaxed"
                style={{ maxHeight: "80px" }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || typing}
                className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                  input.trim() && !typing
                    ? "bg-[#3B82F6] hover:bg-[#2563EB] text-white"
                    : "bg-[#1E293B] text-[#334155]"
                }`}
              >
                ↑
              </button>
            </div>
            <p className="text-[9px] text-[#1E293B] text-center mt-1.5">ECOS AI · Powered by launch intelligence</p>
          </div>
        </div>
      )}
    </>
  );
}