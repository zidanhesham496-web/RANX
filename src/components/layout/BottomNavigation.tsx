import { NavLink } from "react-router-dom";
import { CalendarDays, FileText, Home, ListChecks, User } from "lucide-react";

const ITEMS = [
  { to: "/home", label: "Home", Icon: Home },
  { to: "/todo", label: "To-Do", Icon: ListChecks },
  { to: "/source", label: "Source", Icon: FileText },
  { to: "/tables", label: "Tables", Icon: CalendarDays },
  { to: "/profile", label: "Profile", Icon: User },
];

export function BottomNavigation() {
  return (
    <nav
      aria-label="Main"
      className="fixed left-1/2 z-40 w-[min(92vw,26rem)] -translate-x-1/2 rounded-full border border-violet-300/15 bg-[#0d0d18]/75 p-1.5 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.9),0_0_30px_-12px_rgba(139,92,246,0.35)] backdrop-blur-md"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <ul className="grid grid-cols-5 gap-1">
        {ITEMS.map(({ to, label, Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              aria-label={label}
              className={({ isActive }) =>
                `group relative flex h-14 flex-col items-center justify-center rounded-full outline-none transition-colors duration-300 active:scale-95 focus-visible:ring-2 focus-visible:ring-violet-300 ${
                  isActive ? "text-white" : "text-[#8d8a9e] hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 rounded-full bg-violet-500/20 ring-1 ring-violet-300/30 transition-opacity duration-500 ${
                      isActive ? "rx-nav-ring opacity-100" : "opacity-0"
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-1 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.55)_0%,transparent_70%)] transition-opacity duration-500 ${
                      isActive ? "rx-nav-glow opacity-100" : "opacity-0"
                    }`}
                  />
                  <span
                    className={`relative grid place-items-center transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
                      isActive ? "-translate-y-1.5 scale-110" : ""
                    }`}
                  >
                    <Icon
                      size={22}
                      strokeWidth={1.8}
                      className={isActive ? "drop-shadow-[0_0_8px_rgba(196,181,253,0.9)]" : ""}
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute bottom-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-violet-200 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
                      isActive ? "translate-y-0 opacity-90" : "translate-y-1 opacity-0"
                    }`}
                  >
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
