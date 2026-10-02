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
      className="fixed left-1/2 z-40 w-[min(92vw,26rem)] -translate-x-1/2 rounded-full border border-violet-300/15 bg-[#0d0d18]/75 p-1.5 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.9),0_0_30px_-12px_rgba(139,92,246,0.35)] backdrop-blur-xl"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <ul className="grid grid-cols-5 gap-1">
        {ITEMS.map(({ to, label, Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              aria-label={label}
              className={({ isActive }) =>
                `grid h-12 place-items-center rounded-full transition active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 ${
                  isActive
                    ? "bg-violet-500/20 text-white shadow-[0_0_18px_rgba(139,92,246,0.35)] ring-1 ring-violet-300/30"
                    : "text-[#8d8a9e] hover:text-white"
                }`
              }
            >
              <Icon size={22} strokeWidth={1.8} />
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
