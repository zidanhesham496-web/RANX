import type { ReactNode } from "react";

function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const SHAPES: ReactNode[] = [
  <>
    <circle cx="32" cy="32" r="24" />
    <circle cx="32" cy="32" r="16" />
    <circle cx="32" cy="32" r="8" />
  </>,
  <>
    <polygon points="32,8 52.8,20 52.8,44 32,56 11.2,44 11.2,20" />
    <polygon points="32,20 42.4,26 42.4,38 32,44 21.6,38 21.6,26" />
  </>,
  <>
    <polygon points="32,8 54,46 10,46" />
    <polygon points="32,56 10,18 54,18" />
  </>,
  <>
    <polygon points="32,8 56,32 32,56 8,32" />
    <polygon points="32,20 44,32 32,44 20,32" />
  </>,
  <>
    {[16, 32, 48].flatMap((x) =>
      [16, 32, 48].map((y) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="currentColor" stroke="none" />
      )),
    )}
  </>,
  <>
    <circle cx="32" cy="32" r="5" fill="currentColor" stroke="none" />
    <ellipse cx="32" cy="32" rx="24" ry="10" />
    <ellipse cx="32" cy="32" rx="24" ry="10" transform="rotate(60 32 32)" />
    <ellipse cx="32" cy="32" rx="24" ry="10" transform="rotate(120 32 32)" />
  </>,
  <>
    <rect x="12" y="12" width="40" height="40" />
    <rect x="18" y="18" width="28" height="28" transform="rotate(45 32 32)" />
    <rect x="25" y="25" width="14" height="14" />
  </>,
  <>
    <path d="M14 14 L32 26 L50 14" />
    <path d="M14 28 L32 40 L50 28" />
    <path d="M14 42 L32 54 L50 42" />
  </>,
  <>
    <rect x="14" y="14" width="36" height="36" />
    <rect x="14" y="14" width="36" height="36" transform="rotate(45 32 32)" />
    <circle cx="32" cy="32" r="4" fill="currentColor" stroke="none" />
  </>,
  <>
    <path d="M8 44 Q32 4 56 44" />
    <path d="M8 20 Q32 60 56 20" />
    <circle cx="32" cy="32" r="3" fill="currentColor" stroke="none" />
  </>,
];

export function GeometricAvatar({ seed, size = 46 }: { seed: string; size?: number }) {
  const h = hash(seed);
  const shape = h % SHAPES.length;
  const rotation = (Math.floor(h / SHAPES.length) % 8) * 45;

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
      className="text-violet-200"
    >
      <g transform={`rotate(${rotation} 32 32)`}>{SHAPES[shape]}</g>
    </svg>
  );
}
