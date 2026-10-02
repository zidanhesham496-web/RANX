import type { SubjectMeta } from "../../lib/subjects";

const GLASS =
  "rounded-3xl border border-violet-300/15 bg-[#0b0b16]/85 sm:bg-[#0b0b16]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_50px_-20px_rgba(0,0,0,0.9),0_0_40px_-20px_rgba(139,92,246,0.35)] sm:backdrop-blur-xl";

export function SubjectsSection({ subjects }: { subjects: SubjectMeta[] }) {
  return (
    <section aria-label="Registered subjects">
      {subjects.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-violet-300/15 px-4 py-6 text-center text-[13px] text-[#8d8a9e]">
          No subjects registered yet
        </p>
      ) : (
        <ul
          className={`flex max-h-[19rem] flex-col gap-3 overflow-y-auto overscroll-contain p-3 [scrollbar-color:rgba(167,139,250,0.35)_transparent] [scrollbar-width:thin] ${GLASS}`}
        >
          {subjects.map((s) => (
            <li
              key={s.code}
              className="flex h-[72px] shrink-0 items-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.09] to-white/[0.03] px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_8px_20px_-10px_rgba(0,0,0,0.8)]"
            >
              <span
                className="grid size-11 shrink-0 place-items-center rounded-xl border text-xs font-semibold"
                style={{
                  color: s.accent,
                  borderColor: `${s.accent}55`,
                  background: `${s.accent}1a`,
                }}
              >
                {s.abbr}
              </span>
              <span className="min-w-0 flex-1 truncate text-lg font-medium text-white">
                {s.name}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
