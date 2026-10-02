import type { CSSProperties } from "react";

type Option<T extends string | number> = { value: T; label: string };

export function SegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
  label,
}: {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}) {
  const style: CSSProperties = {
    gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))`,
  };

  return (
    <div
      role="group"
      aria-label={label}
      style={style}
      className="grid gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-1"
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.value)}
            className={`h-11 rounded-xl text-sm font-medium tracking-wide transition active:scale-95 ${
              active
                ? "border border-violet-300/30 bg-violet-500/20 text-white shadow-[0_0_16px_-4px_rgba(139,92,246,0.5)]"
                : "border border-transparent text-[#8d8a9e] hover:text-white"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
