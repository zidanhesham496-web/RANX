export function RanxBot({ className = "size-28" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 70" className={className} fill="none" role="img" aria-label="RANX bot">
      <defs>
        <linearGradient id="rbHead" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b9a5ff" />
          <stop offset="1" stopColor="#6b45d6" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="65" rx="14" ry="3" fill="#8b5cf6" opacity="0.35" />
      <g className="rx-float">
        <line x1="32" y1="9" x2="32" y2="15" stroke="#c4b5fd" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="7" r="3" fill="#e9d5ff" />
        <rect x="9" y="25" width="5" height="11" rx="2.5" fill="#7c5ce0" />
        <rect x="50" y="25" width="5" height="11" rx="2.5" fill="#7c5ce0" />
        <rect x="14" y="14" width="36" height="31" rx="12" fill="url(#rbHead)" stroke="#d6c9ff" strokeOpacity="0.6" strokeWidth="1.5" />
        <rect x="19" y="20" width="26" height="19" rx="8" fill="#0d0a1f" />
        <path d="M23.5 30 Q27 25.5 30.5 30" stroke="#ddd6fe" strokeWidth="2.3" strokeLinecap="round" />
        <path d="M33.5 30 Q37 25.5 40.5 30" stroke="#ddd6fe" strokeWidth="2.3" strokeLinecap="round" />
        <path d="M28.5 34 Q32 37.5 35.5 34" stroke="#ddd6fe" strokeWidth="2" strokeLinecap="round" />
        <circle cx="22.5" cy="34.5" r="1.8" fill="#f0abfc" opacity="0.5" />
        <circle cx="41.5" cy="34.5" r="1.8" fill="#f0abfc" opacity="0.5" />
        <rect x="23" y="47" width="18" height="10" rx="5" fill="url(#rbHead)" stroke="#d6c9ff" strokeOpacity="0.5" strokeWidth="1.2" />
        <circle cx="32" cy="52" r="1.8" fill="#0d0a1f" />
      </g>
    </svg>
  );
}
