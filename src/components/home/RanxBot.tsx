import { useEffect, useState } from "react";

const TIPS = [
  "محاضرة البايو كمستري مهمة متنساهاش 🧪",
  "ذاكرت الكومبرتيف ولا لسه؟",
  "خد بريك 5 دقايق واشرب مياه، دماغك محتاجة ترتاح 💧",
  "رجّع شوية في الهستولوجي، الصور بتتحفظ بالتكرار 🔬",
  "خطوة صغيرة كل يوم أحسن من مذاكرة ليلة الامتحان 💪",
  "الفيزيولوجي اتفهمها بالرسم مش بالحفظ بس ✏️",
  "راجع الأناتومي بسرعة قبل ما تنام 🌙",
  "سجّل أي حاجة صعبة وارجعلها بكرة 📝",
  "ركّز 25 دقيقة وموبايلك بعيد، وبعدها ارتاح 🎯",
  "تقدمك بيزيد، كمّل يا بطل 🚀",
  "ربط المعلومة بمثال بيخليها ما تتنساش ✨",
  "ذاكر السؤال قبل الاجابة، ده بيثبّت المعلومة 🧠",
];

const CSS = `
@keyframes ranx-bot-hop {
  0%, 55%, 100% { transform: translateY(0); }
  65% { transform: translateY(-7px); }
  75% { transform: translateY(0); }
  83% { transform: translateY(-3px); }
  90% { transform: translateY(0); }
}
@keyframes ranx-bot-blink {
  0%, 90%, 100% { transform: scaleY(1); }
  94% { transform: scaleY(0.08); }
}
@keyframes ranx-bot-glow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}
.ranx-bot { animation: ranx-bot-hop 4.5s ease-in-out infinite; }
.ranx-bot-eye { transform-box: fill-box; transform-origin: center; animation: ranx-bot-blink 4.5s ease-in-out infinite; }
.ranx-bot-ant { animation: ranx-bot-glow 2s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .ranx-bot, .ranx-bot-eye, .ranx-bot-ant { animation: none; }
}
`;

export function RanxBot() {
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let i = Math.floor(Math.random() * TIPS.length);
    let t: number;
    const hide = () => {
      setShow(false);
      i = (i + 1) % TIPS.length;
      t = window.setTimeout(reveal, 4000);
    };
    const reveal = () => {
      setIdx(i);
      setShow(true);
      t = window.setTimeout(hide, 5500);
    };
    t = window.setTimeout(reveal, 2000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="relative mt-3 h-12 w-12">
      <style>{CSS}</style>
      <svg viewBox="0 0 48 48" className="ranx-bot h-12 w-12" aria-label="RANX bot" role="img">
        <defs>
          <linearGradient id="ranx-bot-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c4b5fd" />
            <stop offset="100%" stopColor="#6d5bd0" />
          </linearGradient>
        </defs>
        <line x1="24" y1="10" x2="24" y2="5" stroke="#c4b5fd" strokeWidth="2" strokeLinecap="round" />
        <circle className="ranx-bot-ant" cx="24" cy="4" r="2.6" fill="#f0abfc" />
        <rect x="2" y="22" width="4" height="9" rx="2" fill="#8b5cf6" />
        <rect x="42" y="22" width="4" height="9" rx="2" fill="#8b5cf6" />
        <rect x="6" y="10" width="36" height="30" rx="12" fill="url(#ranx-bot-grad)" />
        <rect x="10" y="15" width="28" height="20" rx="9" fill="#0d0d18" fillOpacity="0.88" />
        <ellipse className="ranx-bot-eye" cx="18" cy="24" rx="3" ry="3.6" fill="#c4b5fd" />
        <ellipse className="ranx-bot-eye" cx="30" cy="24" rx="3" ry="3.6" fill="#c4b5fd" />
        <circle cx="14" cy="30" r="2" fill="#f0abfc" fillOpacity="0.35" />
        <circle cx="34" cy="30" r="2" fill="#f0abfc" fillOpacity="0.35" />
        <path d="M20 30 Q24 33.5 28 30" fill="none" stroke="#c4b5fd" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <div
        role="status"
        dir="rtl"
        className={
          "pointer-events-none absolute left-14 top-1/2 z-10 w-max max-w-[170px] -translate-y-1/2 rounded-2xl border border-violet-300/20 bg-[#1a1530]/95 px-3 py-2 text-right text-[12px] leading-relaxed text-violet-100 shadow-lg transition-all duration-500 " +
          (show ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0")
        }
      >
        <span className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-b border-l border-violet-300/20 bg-[#1a1530]" />
        {TIPS[idx]}
      </div>
    </div>
  );
}
