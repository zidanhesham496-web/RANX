import type { TodoFilter } from "../../types/todo";

const FILTERS: TodoFilter[] = ["ALL", "LEC", "SEC", "ASS"];

export function TodoFilters({
  value,
  onChange,
}: {
  value: TodoFilter;
  onChange: (filter: TodoFilter) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Filter tasks"
      className="grid grid-cols-4 gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-1"
    >
      {FILTERS.map((f) => {
        const active = f === value;
        return (
          <button
            key={f}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(f)}
            className={`h-11 rounded-xl text-sm font-medium tracking-wide transition active:scale-95 ${
              active
                ? "border border-violet-300/30 bg-violet-500/20 text-white shadow-[0_0_16px_-4px_rgba(139,92,246,0.5)]"
                : "border border-transparent text-[#8d8a9e] hover:text-white"
            }`}
          >
            {f}
          </button>
        );
      })}
    </div>
  );
}
