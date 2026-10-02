export function RanxWordmark({ className = "h-7" }: { className?: string }) {
  return (
    <div className={`flex select-none items-center ${className}`} role="img" aria-label="RANX">
      <svg
        viewBox="0 0 560 120"
        className="h-full w-auto drop-shadow-[0_0_8px_rgba(139,92,246,0.45)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="rwSilver" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.55" stopColor="#e9e6f7" />
            <stop offset="1" stopColor="#b7b0da" />
          </linearGradient>
          <linearGradient id="rwViolet" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#9b7cff" />
            <stop offset="1" stopColor="#4a2cb5" />
          </linearGradient>
        </defs>
        <g fill="url(#rwSilver)" stroke="#7a5ad8" strokeWidth="2.5" strokeLinejoin="round">
          <path
            fillRule="evenodd"
            d="M36 10H108C128 10 138 24 138 42C138 58 128 70 112 73L140 110H104L80 78H52V110H14V32Z M52 36H98C105 36 107 40 107 45C107 50 104 54 98 54H52Z"
          />
          <path d="M150 110L190 10H226L268 110H230L208 52L188 110Z" />
          <path d="M290 110V10H326L354 62V10H392V110H356L328 58V110Z" />
        </g>
        <path
          d="M414 10H456L480 42L506 10H548L502 60L548 110H506L480 78L454 110H412L458 60Z"
          fill="url(#rwViolet)"
          stroke="#b9a4ff"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
