export function RanxLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="grid min-h-dvh place-items-center bg-[#09090f] text-[#f1eff7]"
    >
      <div className="flex flex-col items-center gap-3">
        <svg viewBox="0 0 64 70" className="size-24" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="rlHead" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#a78bfa" />
              <stop offset="1" stopColor="#5b34c9" />
            </linearGradient>
          </defs>
          <ellipse className="ranx-shadow" cx="32" cy="64" rx="14" ry="3" fill="#8b5cf6" opacity="0.5" />
          <g className="ranx-bot">
            <line x1="32" y1="9" x2="32" y2="16" stroke="#c4b5fd" strokeWidth="2" strokeLinecap="round" />
            <circle className="ranx-antenna" cx="32" cy="7" r="3" fill="#e9d5ff" />
            <rect x="10" y="26" width="4" height="10" rx="2" fill="#7c5ce0" />
            <rect x="50" y="26" width="4" height="10" rx="2" fill="#7c5ce0" />
            <rect x="14" y="16" width="36" height="28" rx="11" fill="url(#rlHead)" stroke="#c4b5fd" strokeOpacity="0.6" strokeWidth="1.5" />
            <rect x="19" y="23" width="26" height="14" rx="7" fill="#0b0b16" />
            <ellipse className="ranx-eye" cx="27" cy="30" rx="2.8" ry="3" fill="#ddd6fe" />
            <ellipse className="ranx-eye" cx="37" cy="30" rx="2.8" ry="3" fill="#ddd6fe" />
            <rect x="23" y="46" width="18" height="10" rx="5" fill="url(#rlHead)" stroke="#c4b5fd" strokeOpacity="0.5" strokeWidth="1.2" />
            <circle cx="32" cy="51" r="1.8" fill="#0b0b16" />
          </g>
        </svg>
        <p className="text-lg font-semibold tracking-wide text-[#c9c5d9]">
          Ranxing
          <span className="ranx-dot" style={{ animationDelay: "0s" }}>.</span>
          <span className="ranx-dot" style={{ animationDelay: "0.2s" }}>.</span>
          <span className="ranx-dot" style={{ animationDelay: "0.4s" }}>.</span>
        </p>
      </div>
    </div>
  );
}
