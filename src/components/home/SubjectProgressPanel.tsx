import { useEffect, useState } from "react";
import { BookOpen, Bone, Dna, FlaskConical, HeartPulse, Microscope } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SubjectMeta } from "../../lib/subjects";

const ICONS: Record<string, LucideIcon> = {
  ANATOMY: Bone,
  PHYSIOLOGY: HeartPulse,
  BIOCHEMISTRY: FlaskConical,
  HISTOLOGY: Microscope,
  BIO: Dna,
};

function useCountUp(target: number, active: boolean, delay: number) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) {
      setN(0);
      return;
    }
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    let raf = 0;
    const start = performance.now() + delay;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / 1000));
      setN(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, delay]);
  return n;
}

function SubjectGauge({
  subject,
  pct,
  active,
  index,
}: {
  subject: SubjectMeta;
  pct: number | null;
  active: boolean;
  index: number;
}) {
  const Icon = ICONS[subject.code.trim().toUpperCase()] ?? BookOpen;
  const delay = 150 + index * 90;
  const loaded = pct !== null;
  const fill = active && loaded ? pct : 0;
  const value = useCountUp(pct ?? 0, active && loaded, delay);

  return (
    <li
      className={`min-w-0 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
        active ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
      style={{ transitionDelay: active ? `${index * 70}ms` : "0ms" }}
    >
      <div
        role="img"
        aria-label={`${subject.name}: ${loaded ? `${pct} percent` : "loading"}`}
        className="relative mx-auto aspect-square w-full max-w-[72px] overflow-hidden rounded-2xl border shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
        style={{
          borderColor: `${subject.accent}33`,
          background: `linear-gradient(180deg, ${subject.accent}24 0%, rgba(255,255,255,0.025) 100%)`,
        }}
      >
        <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
          <path
            d="M8 40A24 24 0 0 1 56 40"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M8 40A24 24 0 0 1 56 40"
            stroke={subject.accent}
            strokeWidth="4"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray={100}
            strokeDashoffset={100 - fill}
            className="transition-[stroke-dashoffset] duration-[1100ms] ease-out motion-reduce:transition-none"
            style={{
              transitionDelay: `${delay}ms`,
              opacity: fill > 0 ? 1 : 0,
              filter: `drop-shadow(0 0 3px ${subject.accent}b3)`,
            }}
          />
        </svg>
        <span
          className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2"
          style={{ color: subject.accent }}
        >
          <Icon className="size-4 sm:size-[18px]" strokeWidth={1.75} />
        </span>
        <span className="absolute inset-x-0 bottom-[8%] flex items-baseline justify-center text-[11px] font-medium leading-none text-white tabular-nums sm:text-xs">
          {loaded ? (
            <>
              {value}
              <span className="ml-px text-[8px] text-[#a6a3b8]">%</span>
            </>
          ) : (
            <span className="text-[#6f6c82]">–</span>
          )}
        </span>
      </div>
      <span className="mt-1.5 block truncate text-center text-[9px] font-light tracking-wide text-[#c9c5d9]/90 sm:text-[10.5px]">
        {subject.name}
      </span>
    </li>
  );
}

export function SubjectProgressPanel({
  subjects,
  progress,
  active,
}: {
  subjects: SubjectMeta[];
  progress: Record<string, number> | null;
  active: boolean;
}) {
  return (
    <div className="pt-4">
      <ul className="grid grid-cols-5 gap-1.5 rounded-2xl border border-white/10 bg-black/25 p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:gap-3 sm:p-3">
        {subjects.map((s, i) => (
          <SubjectGauge
            key={s.code}
            subject={s}
            pct={progress ? (progress[s.code.trim().toUpperCase()] ?? 0) : null}
            active={active}
            index={i}
          />
        ))}
      </ul>
    </div>
  );
}
