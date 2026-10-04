import { ChevronDown, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface SettingsRowProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  trailing?: ReactNode;
  onClick?: () => void;
  soon?: boolean;
  expanded?: boolean;
  children?: ReactNode;
}

const BASE = "flex min-h-[56px] w-full items-center gap-3.5 px-4 py-2.5";

export function SettingsRow({
  icon: Icon,
  title,
  subtitle,
  trailing,
  onClick,
  soon,
  expanded = false,
  children,
}: SettingsRowProps) {
  const interactive = Boolean(onClick) && !soon;
  const expandable = children !== undefined;
  const body = (
    <>
      <Icon size={20} strokeWidth={1.7} className="shrink-0 text-violet-300/80" />
      <span className="min-w-0 flex-1 text-left">
        <span className="block truncate text-[14px] font-medium text-white">{title}</span>
        {subtitle && (
          <span className="mt-0.5 block truncate text-[12px] text-[#8d8a9e]">{subtitle}</span>
        )}
      </span>
      {soon ? (
        <span className="rounded-full border border-violet-300/15 px-2 py-0.5 text-[10px] font-medium tracking-wide text-[#8d8a9e] uppercase">
          Soon
        </span>
      ) : (
        (trailing ??
        (interactive && (
          <ChevronDown
            size={18}
            className={`text-[#8d8a9e] transition-transform duration-300 motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`}
          />
        )))
      )}
    </>
  );

  return (
    <li>
      {interactive ? (
        <button
          type="button"
          onClick={onClick}
          aria-expanded={expandable ? expanded : undefined}
          className={`${BASE} transition hover:bg-white/[0.03] active:bg-white/[0.05] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-300`}
        >
          {body}
        </button>
      ) : (
        <div aria-disabled={soon || undefined} className={`${BASE} ${soon ? "opacity-60" : ""}`}>
          {body}
        </div>
      )}
      {expandable && (
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        >
          <div className="overflow-hidden">
            <div inert={!expanded} className="px-4 pt-1 pb-4">
              {children}
            </div>
          </div>
        </div>
      )}
    </li>
  );
}
