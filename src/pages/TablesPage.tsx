import { Fragment, useCallback, useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { fetchSection, fetchTimetable, saveSection } from "../services/timetable";
import type { EntryKind, TimetableEntry } from "../types/timetable";
import { EmptyState } from "../components/EmptyState";

// Day numbers in the table follow JS getDay(): 0 = Sunday ... 6 = Saturday.
// Chips run Saturday to Thursday.
const DAY_ORDER = [6, 0, 1, 2, 3, 4];
const SHORT = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const FULL = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const GLASS =
  "rounded-3xl border border-violet-300/15 bg-[#0b0b16]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_50px_-20px_rgba(0,0,0,0.9),0_0_40px_-20px_rgba(139,92,246,0.35)] backdrop-blur-xl";

const BADGE: Record<EntryKind, string> = {
  LEC: "border-violet-300/30 bg-violet-500/15 text-violet-200",
  SEC: "border-sky-300/25 bg-sky-500/10 text-sky-200",
  ACT: "border-white/15 bg-white/5 text-[#c9c5d9]",
};

const toMin = (t: string) => {
  const [h, m] = t.split(":");
  return Number(h) * 60 + Number(m);
};
const hhmm = (t: string) => t.slice(0, 5);
const untilText = (mins: number) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

export default function TablesPage() {
  const { session } = useAuth();
  const userId = session?.user.id;

  const [entries, setEntries] = useState<TimetableEntry[]>([]);
  const [section, setSection] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState(() => new Date());
  const [selectedDay, setSelectedDay] = useState(() => {
    const d = new Date().getDay();
    return DAY_ORDER.includes(d) ? d : 6;
  });

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!userId) return;
    let active = true;
    setLoading(true);
    Promise.all([fetchTimetable(), fetchSection(userId)])
      .then(([rows, sec]) => {
        if (!active) return;
        setEntries(rows);
        setSection(sec);
        setError(null);
      })
      .catch(() => active && setError("Couldn't load the timetable. Refresh the page and try again."))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [userId]);

  const chooseSection = async (value: number) => {
    if (!userId) return;
    const previous = section;
    setSection(value);
    setError(null);
    try {
      await saveSection(userId, value);
    } catch {
      setSection(previous);
      setError("Couldn't save your section. Check your connection and try again.");
    }
  };

  const visibleFor = useCallback(
    (day: number) =>
      entries
        .filter((e) => e.day === day && (e.kind !== "SEC" || (section !== null && e.section === section)))
        .sort((a, b) => toMin(a.start_time) - toMin(b.start_time)),
    [entries, section],
  );

  const todayDay = now.getDay();
  const nowMin = now.getHours() * 60 + now.getMinutes();

  // Dates of the current Saturday-to-Thursday week (on Friday: the coming one)
  const base = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  base.setDate(base.getDate() - (base.getDay() === 5 ? -1 : (base.getDay() + 1) % 7));
  const weekDates = DAY_ORDER.map((_, i) => {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    return d.getDate();
  });

  const dayEntries = visibleFor(selectedDay);
  const isToday = selectedDay === todayDay;
  const liveId = isToday
    ? dayEntries.find((e) => toMin(e.start_time) <= nowMin && nowMin < toMin(e.end_time))?.id
    : undefined;
  const markerIndex =
    isToday && liveId === undefined ? dayEntries.findIndex((e) => toMin(e.start_time) > nowMin) : -1;

  const findNext = () => {
    for (let off = 0; off < 7; off++) {
      const day = (todayDay + off) % 7;
      const list = visibleFor(day).filter((e) => off > 0 || toMin(e.start_time) > nowMin);
      if (list.length > 0) {
        const entry = list[0];
        const label =
          off === 0
            ? `in ${untilText(toMin(entry.start_time) - nowMin)}`
            : off === 1
              ? `tomorrow ${hhmm(entry.start_time)}`
              : `${SHORT[day]} ${hhmm(entry.start_time)}`;
        return { entry, label };
      }
    }
    return null;
  };
  const next = loading ? null : findNext();

  return (
    <div className="flex h-[calc(100dvh-15rem)] min-h-[24rem] flex-col gap-4">
      <section aria-label="Days and section" className={`shrink-0 space-y-3 p-4 ${GLASS}`}>
        <div
          role="group"
          aria-label="Day"
          className="grid grid-cols-6 gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-1"
        >
          {DAY_ORDER.map((d, i) => {
            const active = d === selectedDay;
            return (
              <button
                key={d}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedDay(d)}
                className={`relative flex h-14 flex-col items-center justify-center rounded-xl text-[11px] tracking-wide transition active:scale-95 ${
                  active
                    ? "border border-violet-300/30 bg-violet-500/20 text-white shadow-[0_0_16px_-4px_rgba(139,92,246,0.5)]"
                    : "border border-transparent text-[#8d8a9e] hover:text-white"
                }`}
              >
                <span>{SHORT[d]}</span>
                <span className="text-base font-semibold leading-tight">{weekDates[i]}</span>
                {d === todayDay && (
                  <span className="absolute bottom-1 size-1 rounded-full bg-violet-300" />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[#8d8a9e]">Section</span>
          <div
            role="group"
            aria-label="Section"
            className="grid flex-1 grid-cols-5 gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-1"
          >
            {[1, 2, 3, 4, 5].map((n) => {
              const active = n === section;
              return (
                <button
                  key={n}
                  type="button"
                  aria-pressed={active}
                  onClick={() => chooseSection(n)}
                  className={`h-9 rounded-xl text-sm font-medium transition active:scale-95 ${
                    active
                      ? "border border-violet-300/30 bg-violet-500/20 text-white"
                      : "border border-transparent text-[#8d8a9e] hover:text-white"
                  }`}
                >
                  {n}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {error && (
        <p
          role="alert"
          className="shrink-0 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-300"
        >
          {error}
        </p>
      )}

      <section
        aria-label="Schedule"
        className={`min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 [scrollbar-color:rgba(167,139,250,0.35)_transparent] [scrollbar-width:thin] ${GLASS}`}
      >
        <div className="mb-3 flex items-baseline justify-between px-1">
          <h1 className="text-base font-semibold text-white">{FULL[selectedDay]}</h1>
          <span className="text-xs text-[#8d8a9e]">
            {dayEntries.length} {dayEntries.length === 1 ? "class" : "classes"}
          </span>
        </div>

        {!loading && section === null && (
          <p className="mb-3 px-1 text-xs text-violet-300/90">
            Pick your section above to see your section classes.
          </p>
        )}

        {loading ? (
          <div className="space-y-3" aria-busy="true">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-[84px] animate-pulse rounded-2xl border border-white/5 bg-white/[0.04]" />
            ))}
          </div>
        ) : dayEntries.length === 0 ? (
          <EmptyState
            icon={<CalendarDays size={26} strokeWidth={1.6} />}
            title="No classes"
            description="Nothing scheduled for this day."
          />
        ) : (
          <ul className="space-y-3">
            {dayEntries.map((e, i) => {
              const live = e.id === liveId;
              return (
                <Fragment key={e.id}>
                  {i === markerIndex && (
                    <li
                      aria-hidden="true"
                      className="flex items-center gap-2 text-[11px] font-semibold tracking-wider text-violet-300"
                    >
                      <span>NOW {now.toTimeString().slice(0, 5)}</span>
                      <span className="h-px flex-1 bg-violet-400/40" />
                    </li>
                  )}
                  <li className="flex items-stretch gap-3">
                    <div className="w-12 shrink-0 pt-3 text-right text-xs leading-5 text-[#8d8a9e]">
                      <p className="font-semibold text-[#c9c5d9]">{hhmm(e.start_time)}</p>
                      <p>{hhmm(e.end_time)}</p>
                    </div>
                    <div
                      className={`min-w-0 flex-1 rounded-2xl border px-4 py-3 ${
                        live
                          ? "border-violet-300/50 bg-violet-500/15 shadow-[0_0_24px_-8px_rgba(139,92,246,0.6)]"
                          : "border-violet-300/15 bg-gradient-to-br from-white/[0.07] to-white/[0.02]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold tracking-wider ${BADGE[e.kind]}`}
                        >
                          {e.kind}
                        </span>
                        {live && (
                          <span className="text-[11px] font-semibold tracking-wider text-violet-200">NOW</span>
                        )}
                      </div>
                      <p dir="auto" className="mt-1 text-left text-base font-medium leading-snug text-white">
                        {e.title}
                      </p>
                      {e.room && (
                        <p dir="auto" className="mt-0.5 text-left text-sm text-[#8d8a9e]">
                          {e.room}
                        </p>
                      )}
                    </div>
                  </li>
                </Fragment>
              );
            })}
          </ul>
        )}
      </section>

      {next && (
        <section
          aria-label="Next class"
          className={`flex shrink-0 items-center justify-between gap-3 px-4 py-3 ${GLASS}`}
        >
          <div className="min-w-0">
            <p className="text-xs text-[#8d8a9e]">Next up</p>
            <p dir="auto" className="truncate text-left text-base font-medium text-white">
              {next.entry.title}
            </p>
          </div>
          <span className="shrink-0 text-sm font-medium text-violet-300">{next.label}</span>
        </section>
      )}
    </div>
  );
}
