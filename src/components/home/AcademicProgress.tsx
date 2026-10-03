import { useEffect, useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { SubjectMeta } from "../../lib/subjects";
import { useSubjectProgress } from "../../hooks/useSubjectProgress";
import { RanxBot } from "./RanxBot";
import { SubjectProgressPanel } from "./SubjectProgressPanel";

interface AcademicProgressProps {
  value: number | null;
  name?: string;
  username?: string;
  subjects?: SubjectMeta[];
}

const clamp = (n: number) => Math.min(100, Math.max(0, Math.round(n)));

export function AcademicProgress({ value, name, subjects = [] }: AcademicProgressProps) {
  const target = value === null ? 0 : clamp(value);
  const [shown, setShown] = useState(0);
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const progress = useSubjectProgress(open);
  const hasSubjects = subjects.length > 0;

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setShown(target));
    return () => window.cancelAnimationFrame(id);
  }, [target]);

  return (
    <section
      aria-label="Academic progress"
      className="relative -mt-5 overflow-hidden rounded-b-3xl rounded-t-none border border-t-0 border-violet-300/15 bg-[#0d0d18]/75 px-5 pb-1 pt-4 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.9)] backdrop-blur-md"
    >
      <style>{`
        @keyframes rx-nudge {
          0%, 68%, 100% { transform: translateY(0); }
          80% { transform: translateY(3px); }
          92% { transform: translateY(0); }
        }
        .rx-nudge { display: inline-grid; animation: rx-nudge 3.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .rx-nudge { animation: none; } }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 -left-12 h-44 w-44 rounded-full bg-violet-500/15 blur-3xl"
      />

      <div className="relative flex flex-row-reverse items-center justify-between gap-5">
        <div
          role="img"
          aria-label={value === null ? "Progress unavailable" : `${target} percent`}
          className="relative h-[132px] w-[132px] shrink-0 self-center"
        >
          <svg viewBox="0 0 132 132" className="h-full w-full -rotate-90">
            <defs>
              <linearGradient id="ranx-ring-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#c4b5fd" />
                <stop offset="100%" stopColor="#6d5bd0" />
              </linearGradient>
            </defs>
            <circle cx="66" cy="66" r="63" fill="none" stroke="rgba(221,214,255,0.07)" strokeWidth="1" />
            <circle cx="66" cy="66" r="50" fill="none" stroke="rgba(221,214,255,0.08)" strokeWidth="9" />
            <circle
              cx="66"
              cy="66"
              r="38"
              fill="none"
              stroke="rgba(196,181,253,0.2)"
              strokeWidth="1"
              strokeDasharray="2 6"
            />
            <circle
              cx="66"
              cy="66"
              r="50"
              fill="none"
              stroke="url(#ranx-ring-grad)"
              strokeWidth="9"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray={100}
              strokeDashoffset={100 - shown}
              className="transition-[stroke-dashoffset] duration-[1200ms] ease-out motion-reduce:transition-none"
              style={{
                opacity: shown > 0 ? 1 : 0,
                filter: "drop-shadow(0 0 6px rgba(139,92,246,0.55))",
              }}
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <p className="flex items-baseline gap-0.5">
              <span className="text-[34px] font-semibold leading-none tracking-tight text-white tabular-nums">
                {value === null ? "—" : target}
              </span>
              {value !== null && <span className="text-sm text-[#8d8a9e]">%</span>}
            </p>
          </div>
        </div>

        <div className="relative min-w-0 self-start">
          <p className="text-xl font-medium leading-none text-[#b8b5c9]">Hello</p>
          <h2 className="mt-1 truncate text-3xl font-semibold uppercase leading-tight text-white">
            {name}
          </h2>
          <RanxBot />
        </div>
      </div>

      {hasSubjects && (
        <>
          <div
            id={panelId}
            aria-hidden={!open}
            className={`relative grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
              open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="min-h-0 overflow-hidden">
              <SubjectProgressPanel subjects={subjects} progress={progress} active={open} />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Hide subjects progress" : "Show subjects progress"}
            className="relative mx-auto mt-1 flex h-9 w-16 items-center justify-center rounded-full text-[#9d99b3] outline-none transition hover:text-white focus-visible:ring-2 focus-visible:ring-violet-400/60 active:scale-90"
          >
            <span className={open ? "inline-grid" : "rx-nudge"}>
              <ChevronDown
                className={`size-5 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
                  open ? "rotate-180" : ""
                }`}
                strokeWidth={2.25}
              />
            </span>
          </button>
        </>
      )}
    </section>
  );
}
