interface Letter {
  d: string;
  evenodd?: boolean;
  accent?: boolean;
}

const LETTERS: Letter[] = [
  {
    d: "M14 10H108C128 10 138 24 138 42C138 58 128 70 112 73L140 110H104L80 78H52V110H14Z M52 36H98C105 36 107 40 107 45C107 50 104 54 98 54H52Z",
    evenodd: true,
  },
  { d: "M150 110L190 10H226L268 110H230L208 52L188 110Z" },
  { d: "M290 110V10H326L354 62V10H392V110H356L328 58V110Z" },
  {
    d: "M414 10H456L480 42L506 10H548L502 60L548 110H506L480 78L454 110H412L458 60Z",
    accent: true,
  },
];

export function RanxWordmark({ className = "h-7" }: { className?: string }) {
  const reduce =
    typeof window !== "undefined" &&
    !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className={`flex select-none items-center ${className}`} role="img" aria-label="RANX">
      <svg
        viewBox="0 0 560 120"
        className="h-full w-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <style>{`
          @keyframes rw-draw {
            from { stroke-dashoffset: 1; }
            to { stroke-dashoffset: 0; }
          }
          @keyframes rw-fill {
            from { fill-opacity: 0; }
            to { fill-opacity: 1; }
          }
          @keyframes rw-glow {
            0% { filter: drop-shadow(0 0 0 rgba(167,139,250,0)); }
            55% { filter: drop-shadow(0 0 5px rgba(167,139,250,0.85)); }
            100% { filter: drop-shadow(0 0 0 rgba(167,139,250,0)); }
          }
          .rw-l {
            stroke-dasharray: 1;
            animation:
              rw-draw 1.6s cubic-bezier(.4,0,.2,1) both,
              rw-fill 1.8s ease-out both,
              rw-glow 2.2s ease-out both;
          }
          @media (prefers-reduced-motion: reduce) { .rw-l { animation: none; } }
        `}</style>
        <defs>
          <linearGradient id="rwSilver" gradientUnits="userSpaceOnUse" x1="0" y1="10" x2="0" y2="110">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.55" stopColor="#e9e6f7" />
            <stop offset="1" stopColor="#b7b0da" />
          </linearGradient>
          <linearGradient id="rwViolet" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#9b7cff" />
            <stop offset="1" stopColor="#4a2cb5" />
          </linearGradient>
          <linearGradient
            id="rwSweep"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="560"
            y2="0"
            gradientTransform={reduce ? "translate(-560 0)" : undefined}
          >
            <stop offset="0" stopColor="#9d86f2" />
            <stop offset="0.42" stopColor="#9d86f2" />
            <stop offset="0.5" stopColor="#ffffff" />
            <stop offset="0.58" stopColor="#9d86f2" />
            <stop offset="1" stopColor="#9d86f2" />
            {!reduce && (
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                values="-560 0;560 0;560 0"
                keyTimes="0;0.6;1"
                dur="7s"
                begin="2.2s"
                repeatCount="indefinite"
              />
            )}
          </linearGradient>
        </defs>
        {LETTERS.map((l, i) => (
          <path
            key={i}
            className="rw-l"
            d={l.d}
            pathLength={1}
            fillRule={l.evenodd ? "evenodd" : "nonzero"}
            fill={l.accent ? "url(#rwViolet)" : "url(#rwSilver)"}
            fillOpacity={1}
            stroke="url(#rwSweep)"
            strokeWidth={3}
            strokeLinejoin="round"
            style={{
              animationDelay: `${i * 0.15}s, ${0.35 + i * 0.15}s, ${0.35 + i * 0.15}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
