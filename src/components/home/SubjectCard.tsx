import type { SubjectMeta } from "../../lib/subjects";

export function SubjectCard({ subject }: { subject: SubjectMeta }) {
  const { abbr, name, accent } = subject;
  return (
    <li className="w-32 shrink-0 snap-start">
      <div className="rounded-2xl border border-violet-300/15 bg-[#0d0d18]/75 p-3.5 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-violet-300/30 active:scale-[0.98] motion-reduce:transition-none">
        <div
          className="grid h-11 w-11 place-items-center rounded-xl border text-[13px] font-semibold tracking-wide"
          style={{
            color: accent,
            borderColor: `${accent}55`,
            background: `${accent}1f`,
            boxShadow: `0 0 16px -4px ${accent}66`,
          }}
        >
          {abbr}
        </div>
        <p className="mt-3 truncate text-[13px] font-medium text-white">{name}</p>
      </div>
    </li>
  );
}
