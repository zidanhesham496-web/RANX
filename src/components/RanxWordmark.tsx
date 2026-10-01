export function RanxWordmark({ className = "h-7" }: { className?: string }) {
  return (
    <div className={`flex select-none items-center ${className}`}>
<svg
                viewBox="0 0 232 65"
                className="h-full w-auto drop-shadow-[0_8px_25px_rgba(0,0,0,0.9)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="ranSilverMetal" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="30%" stopColor="#E2E8F0" />
                    <stop offset="70%" stopColor="#94A3B8" />
                    <stop offset="100%" stopColor="#475569" />
                  </linearGradient>

                  <linearGradient id="ranTopHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.2" />
                  </linearGradient>

                  <linearGradient id="xFacetTopLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F472B6" />
                    <stop offset="50%" stopColor="#C084FC" />
                    <stop offset="100%" stopColor="#7E22CE" />
                  </linearGradient>

                  <linearGradient id="xFacetTopRight" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#E879F9" />
                    <stop offset="50%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#581C87" />
                  </linearGradient>

                  <linearGradient id="xFacetBottomLeft" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#A855F7" />
                    <stop offset="60%" stopColor="#6B21A8" />
                    <stop offset="100%" stopColor="#3B0764" />
                  </linearGradient>

                  <linearGradient id="xFacetBottomRight" x1="100%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#7E22CE" />
                    <stop offset="70%" stopColor="#4C1D95" />
                    <stop offset="100%" stopColor="#1E1B4B" />
                  </linearGradient>

                  <filter id="xGlow3D" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#c084fc" floodOpacity="0.8" />
                  </filter>
                </defs>

                <g fill="url(#ranSilverMetal)" stroke="#0f172a" strokeWidth="0.8" strokeLinejoin="round">
                  <path d="M 10 55 V 10 H 38 C 48 10 54 17 52 27 C 50 34 44 37 36 37 L 54 55 H 39 L 26 37 H 22 V 55 H 10 Z M 22 19 V 28 H 36 C 40 28 42 26 42 23.5 C 42 21 40 19 36 19 H 22 Z" fillRule="evenodd" />
                  <path d="M 66 55 L 82 10 H 94 L 110 55 H 96 L 88 28 L 80 55 H 66 Z" />
                  <path d="M 122 55 V 10 H 134 L 154 42 V 10 H 166 V 55 H 154 L 134 23 V 55 H 122 Z" />
                </g>

                <path d="M 10 10 H 38" stroke="url(#ranTopHighlight)" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 82 10 H 94" stroke="url(#ranTopHighlight)" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 122 10 H 134" stroke="url(#ranTopHighlight)" strokeWidth="1.5" strokeLinecap="round" />

                <g filter="url(#xGlow3D)">
                  <polygon points="178,10 190,10 200,32.5 192,32.5" fill="url(#xFacetTopLeft)" stroke="#f0abfc" strokeWidth="0.3" />
                  <polygon points="178,10 192,32.5 200,32.5" fill="url(#xFacetBottomLeft)" stroke="#c084fc" strokeWidth="0.3" />
                  <polygon points="210,10 222,10 208,32.5 200,32.5" fill="url(#xFacetTopRight)" stroke="#f472b6" strokeWidth="0.3" />
                  <polygon points="222,10 208,32.5 200,32.5" fill="url(#xFacetBottomRight)" stroke="#7e22ce" strokeWidth="0.3" />
                  <polygon points="222,55 210,55 200,32.5 208,32.5" fill="url(#xFacetTopRight)" stroke="#a855f7" strokeWidth="0.3" />
                  <polygon points="222,55 208,32.5 200,32.5" fill="url(#xFacetBottomRight)" stroke="#3b0764" strokeWidth="0.3" />
                  <polygon points="178,55 190,55 192,32.5 200,32.5" fill="url(#xFacetTopLeft)" stroke="#c084fc" strokeWidth="0.3" />
                  <polygon points="178,55 192,32.5 200,32.5" fill="url(#xFacetBottomLeft)" stroke="#581c87" strokeWidth="0.3" />
                  <polygon points="200,28.5 204.5,32.5 200,36.5 195.5,32.5" fill="#FFFFFF" opacity="0.85" />
                </g>
              </svg>
    </div>
  );
}
