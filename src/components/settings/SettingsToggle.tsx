import type { LucideIcon } from "lucide-react";

interface SettingsToggleProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}

export function SettingsToggle({ icon: Icon, title, subtitle, checked, onChange }: SettingsToggleProps) {
  return (
    <li>
      <div className="flex min-h-[56px] items-center gap-3.5 px-4 py-2.5">
        <Icon size={20} strokeWidth={1.7} className="shrink-0 text-violet-300/80" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-medium text-white">{title}</span>
          {subtitle && (
            <span className="mt-0.5 block truncate text-[12px] text-[#8d8a9e]">{subtitle}</span>
          )}
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-label={title}
          onClick={() => onChange(!checked)}
          className={`relative h-7 w-12 shrink-0 rounded-full border transition-colors duration-200 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 ${
            checked ? "border-violet-300/40 bg-violet-500/60" : "border-white/10 bg-white/10"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 size-[22px] rounded-full bg-white shadow transition-transform duration-200 motion-reduce:transition-none ${
              checked ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </li>
  );
}
