import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import type { SubjectMeta } from "../../lib/subjects";
import { useSubjectProgress } from "../../hooks/useSubjectProgress";
import { RanxBot } from "./RanxBot";
import { SubjectProgressPanel } from "./SubjectProgressPanel";

interface AcademicProgressProps {
  value: number | null;
  name?: string;
  username?: string;
  subjects?: SubjectMeta[];
  done?: number;
  total?: number;
}

const clamp = (n: number) => Math.min(100, Math.max(0, Math.round(n)));

function useAnimatedNumber(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  const current = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      current.current = target;
      setValue(target);
      return;
    }
    const from = current.current;
    const start = performance.now();
    let id = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = from + (target - from) * eased;
      current.current = v;
      setValue(v);
      if (t < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [target, duration]);

  return value;
}

export function AcademicProgress({ value, name, subjects = [], done = 0, total = 0 }: AcademicProgressProps) {
  const target = value === null ? 0 : clamp(value);
  const shown = useAnimatedNumber(target);
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const progress = useSubjectProgress(open);
  const hasSubjects = subjects.length > 0;
  const complete = value !== null && target >= 100;

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
        @keyframes rx-breathe {
          0%, 100% { opacity: 0.45; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes rx-ring-spin { to { transform: rotate(360deg); } }
        .rx-breathe { animation: rx-breathe 3.6s ease-in-out infinite; }
        .rx-ring-spin { animation: rx-ring-spin 36s linear infinite; transform-origin: 66px 66px; }
        @media (prefers-reduced-motion: reduce) {
          .rx-nudge, .rx-breathe, .rx-ring-spin { animation: none; }
        }
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
          <div
            aria-hidden="true"
            className={`rx-breathe pointer-events-none absolute -inset-3 rounded-full ${
              complete
                ? "bg-[radial-gradient(circle,rgba(52,211,153,0.35)_0%,transparent_68%)]"
                : "bg-[radial-gradient(circle,rgba(139,92,246,0.38)_0%,transparent_68%)]"
            }`}
          />
          <svg viewBox="0 0 132 132" className="relative h-full w-full -rotate-90">
            <defs>
              <linearGradient id="ranx-ring-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#c4b5fd" />
                <stop offset="55%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
              <linearGradient id="ranx-ring-done" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6ee7b7" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            <circle cx="66" cy="66" r="63" fill="none" stroke="rgba(221,214,255,0.07)" strokeWidth="1" />
            <circle cx="66" cy="66" r="50" fill="none" stroke="rgba(221,214,255,0.08)" strokeWidth="9" />
            <circle
              className="rx-ring-spin"
              cx="66"
              cy="66"
              r="38"
              fill="none"
              stroke="rgba(196,181,253,0.25)"
              strokeWidth="1"
              strokeDasharray="2 6"
            />
            {shown > 0.2 && (
              <>
                <circle
                  cx="66"
                  cy="66"
                  r="50"
                  fill="none"
                  stroke={complete ? "rgba(52,211,153,0.22)" : "rgba(139,92,246,0.22)"}
                  strokeWidth="16"
                  strokeLinecap="round"
                  pathLength={100}
                  strokeDasharray={100}
                  strokeDashoffset={100 - shown}
                />
                <circle
                  cx="66"
                  cy="66"
                  r="50"
                  fill="none"
                  stroke={complete ? "url(#ranx-ring-done)" : "url(#ranx-ring-grad)"}
                  strokeWidth="9"
                  strokeLinecap="round"
                  pathLength={100}
                  strokeDasharray={100}
                  strokeDashoffset={100 - shown}
                />
                <g style={{ transform: `rotate(${shown * 3.6}deg)`, transformOrigin: "66px 66px" }}>
                  <circle cx="116" cy="66" r="7" fill={complete ? "rgba(110,231,183,0.35)" : "rgba(196,181,253,0.35)"} />
                  <circle cx="116" cy="66" r="3.4" fill="#ffffff" />
                </g>
              </>
            )}
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center">
              <p className="flex items-baseline gap-0.5">
                <span className="text-[34px] font-semibold leading-none tracking-tight text-white tabular-nums">
                  {value === null ? "—" : Math.round(shown)}
                </span>
                {value !== null && <span className="text-sm text-[#8d8a9e]">%</span>}
              </p>
              {value !== null &&
                (complete ? (
                  <span className="mt-1 flex items-center gap-0.5 text-[10px] font-semibold text-emerald-300">
                    <Check size={11} strokeWidth={3} />
                    All done
                  </span>
                ) : (
                  total > 0 && (
                    <span className="mt-1 text-[10px] tabular-nums text-[#8d8a9e]">
                      {done}/{total} tasks
                    </span>
                  )
                ))}
            </div>
          </div>
        </div>

        <div className="relative min-w-0 self-start">
          <p className="text-xl font-medium leading-none text-[#b8b5c9]">Hello</p>
          <h2 className="mt-1 truncate text-3xl font-semibold uppercase leading-tight text-white">{name}</h2>
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
