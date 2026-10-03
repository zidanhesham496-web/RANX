import { Fragment, useCallback, useEffect, useState } from "react";
import { Apple, BookOpen, Bone, CalendarDays, Egg, FlaskConical, HeartPulse, MapPin, Users } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { fetchSection, fetchTimetable, saveSection } from "../services/timetable";
import type { EntryKind, TimetableEntry } from "../types/timetable";
import { EmptyState } from "../components/EmptyState";
import { RanxBot } from "../components/RanxBot";

type IconType = typeof Bone;

// Day numbers follow JS getDay(): 0 = Sunday ... 6 = Saturday. Chips run Saturday to Friday.
const DAY_ORDER = [6, 0, 1, 2, 3, 4, 5];
const HOLIDAYS = [5, 6];
const SHORT = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const FULL = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const GLASS =
  "rounded-3xl border border-violet-300/15 bg-[#0b0b16]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_50px_-20px_rgba(0,0,0,0.9),0_0_40px_-20px_rgba(139,92,246,0.35)] backdrop-blur-xl";

const BADGE: Record<EntryKind, string> = {
  LEC: "border-violet-300/30 bg-violet-500/15 text-violet-200",
  SEC: "border-sky-300/25 bg-sky-500/10 text-sky-200",
  ACT: "border-white/15 bg-white/5 text-[#c9c5d9]",
};

interface Subject {
  code: string;
  Icon: IconType;
  tile: string;
  text: string;
  bar: string;
}

const SUBJECTS: Record<string, Subject> = {
  ANA: { code: "ANA", Icon: Bone, tile: "border-violet-300/30 bg-violet-500/15", text: "text-violet-200", bar: "bg-violet-400" },
  PHY: { code: "PHY", Icon: HeartPulse, tile: "border-sky-300/30 bg-sky-500/15", text: "text-sky-200", bar: "bg-sky-400" },
  BCH: { code: "BIO", Icon: FlaskConical, tile: "border-cyan-300/30 bg-cyan-500/15", text: "text-cyan-200", bar: "bg-cyan-400" },
  POU: { code: "ANP", Icon: Egg, tile: "border-amber-300/30 bg-amber-500/15", text: "text-amber-200", bar: "bg-amber-400" },
  NUT: { code: "NUT", Icon: Apple, tile: "border-emerald-300/30 bg-emerald-500/15", text: "text-emerald-200", bar: "bg-emerald-400" },
  OPT: { code: "OPT", Icon: BookOpen, tile: "border-fuchsia-300/30 bg-fuchsia-500/15", text: "text-fuchsia-200", bar: "bg-fuchsia-400" },
  ACT: { code: "ACT", Icon: Users, tile: "border-white/20 bg-white/10", text: "text-[#c9c5d9]", bar: "bg-slate-300" },
};

const MATCHERS: [RegExp, string][] = [
  [/فسيولوج|physio/i, "PHY"],
  [/كيمياء|bioch/i, "BCH"],
  [/تشريح|anat/i, "ANA"],
  [/دواجن|أرانب|poultry/i, "POU"],
  [/تغذية|nutri/i, "NUT"],
  [/اختيار|optional/i, "OPT"],
];

const subjectOf = (e: TimetableEntry): Subject => {
  if (e.kind === "ACT") return SUBJECTS.ACT;
  const hit = MATCHERS.find(([re]) => re.test(e.title));
  return hit ? SUBJECTS[hit[1]] : SUBJECTS.ACT;
};

const toMin = (t: string) => {
  const [h, m] = t.split(":");
  return Number(h) * 60 + Number(m);
};
const hhmm = (t: string) => t.slice(0, 5);
const durText = (mins: number) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h > 0) return m > 0 ? `${h}h ${m}m` : `${h}h`;
  return `${m}m`;
};

function SubjectTile({ s }: { s: Subject }) {
  const { Icon } = s;
  return (
    <div
      className={`flex h-[3.75rem] w-12 shrink-0 flex-col items-center justify-center gap-1.5 rounded-xl border ${s.tile} ${s.text}`}
    >
      <span className="text-[10px] font-bold leading-none tracking-wider">{s.code}</span>
      <Icon size={20} strokeWidth={1.7} />
    </div>
  );
}

export default function TablesPage() {
  const { session } = useAuth();
  const userId = session?.user.id;

  const [entries, setEntries] = useState<TimetableEntry[]>([]);
  const [section, setSection] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState(() => new Date());
  const [selectedDay, setSelectedDay] = useState(() => new Date().getDay());

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

  // Dates of the current Saturday-to-Friday week
  const base = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  base.setDate(base.getDate() - ((base.getDay() + 1) % 7));
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
  const totalMin = dayEntries.reduce((sum, e) => sum + toMin(e.end_time) - toMin(e.start_time), 0);
  const isHoliday = HOLIDAYS.includes(selectedDay);

  const findNext = () => {
    for (let off = 0; off < 7; off++) {
      const day = (todayDay + off) % 7;
      const list = visibleFor(day).filter((e) => off > 0 || toMin(e.start_time) > nowMin);
      if (list.length > 0) {
        const entry = list[0];
        const label =
          off === 0
            ? `in ${durText(toMin(entry.start_time) - nowMin)}`
            : off === 1
              ? `tomorrow ${hhmm(entry.start_time)}`
              : `${SHORT[day]} ${hhmm(entry.start_time)}`;
        return { entry, label };
      }
    }
    return null;
  };
  const next = loading ? null : findNext();
  const nextSubject = next ? subjectOf(next.entry) : null;

  return (
    <div className="flex h-[calc(100dvh-15rem)] min-h-[24rem] flex-col gap-4">
      <section aria-label="Days and section" className={`shrink-0 space-y-3 p-4 ${GLASS}`}>
        <div
          role="group"
          aria-label="Day"
          className="grid grid-cols-7 gap-1 rounded-2xl border border-white/10 bg-white/[0.03] p-1"
        >
          {DAY_ORDER.map((d, i) => {
            const active = d === selectedDay;
            const off = HOLIDAYS.includes(d);
            return (
              <button
                key={d}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedDay(d)}
                className={`relative flex h-14 flex-col items-center justify-center rounded-xl text-[10px] transition active:scale-95 ${
                  active
                    ? "border border-violet-300/30 bg-violet-500/20 text-white shadow-[0_0_16px_-4px_rgba(139,92,246,0.5)]"
                    : `border border-transparent hover:text-white ${off ? "text-[#8d8a9e]/60" : "text-[#8d8a9e]"}`
                }`}
              >
                <span>{SHORT[d]}</span>
                <span className="text-base font-semibold leading-tight">{weekDates[i]}</span>
                {d === todayDay && <span className="absolute bottom-1 size-1 rounded-full bg-violet-300" />}
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

      <section aria-label="Schedule" className={`flex min-h-0 flex-1 flex-col ${GLASS}`}>
        <h1 className="sr-only">{FULL[selectedDay]}</h1>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain p-3 [scrollbar-color:rgba(167,139,250,0.35)_transparent] [scrollbar-width:thin]">
          {!loading && section === null && !isHoliday && (
            <p className="mb-3 px-1 text-xs text-violet-300/90">
              Pick your section above to see your section classes.
            </p>
          )}

          {loading ? (
            <div className="space-y-3" aria-busy="true">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-[92px] animate-pulse rounded-2xl border border-white/5 bg-white/[0.04]" />
              ))}
            </div>
          ) : dayEntries.length === 0 ? (
            isHoliday ? (
              <div className="my-auto flex flex-col items-center py-6">
                <RanxBot className="size-28" />
                <div key={selectedDay} className="rx-pop flex flex-col items-center">
                  <span className="rx-dot mt-1 size-1.5 rounded-full bg-violet-300/80" />
                  <span
                    className="rx-dot mt-1.5 size-2.5 rounded-full bg-violet-300/80"
                    style={{ animationDelay: "0.25s" }}
                  />
                  <div
                    dir="rtl"
                    className="mt-2 max-w-[17rem] rounded-3xl border border-violet-300/30 bg-[#1a1433] px-5 py-3 text-center text-[15px] font-medium leading-relaxed text-violet-100 shadow-[0_0_30px_-10px_rgba(139,92,246,0.6)]"
                  >
                    النهاردة اجازة مفيش محاضرات
                  </div>
                </div>
              </div>
            ) : (
              <EmptyState
                icon={<CalendarDays size={26} strokeWidth={1.6} />}
                title="No classes"
                description="Nothing scheduled for this day."
              />
            )
          ) : (
            <ul key={selectedDay} className="space-y-3">
              {dayEntries.map((e, i) => {
                const s = subjectOf(e);
                const live = e.id === liveId;
                const past = isToday && toMin(e.end_time) <= nowMin;
                const len = toMin(e.end_time) - toMin(e.start_time);
                const pct = live ? Math.round(((nowMin - toMin(e.start_time)) / len) * 100) : 0;
                const left = toMin(e.end_time) - nowMin;
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
                    <li className="rx-rise" style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}>
                      <div
                        className={`rounded-2xl border p-3 transition ${
                          live
                            ? "border-violet-300/50 bg-violet-500/15 shadow-[0_0_24px_-8px_rgba(139,92,246,0.6)]"
                            : "border-violet-300/15 bg-gradient-to-br from-white/[0.07] to-white/[0.02]"
                        } ${past ? "opacity-55" : ""}`}
                      >
                        <div className="flex items-center gap-3">
                          <SubjectTile s={s} />

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold tracking-wider ${BADGE[e.kind]}`}
                              >
                                {e.kind}
                              </span>
                              <span className="text-[11px] text-[#8d8a9e]">{durText(len)}</span>
                              {live && (
                                <span className="text-[11px] font-semibold tracking-wider text-violet-200">NOW</span>
                              )}
                            </div>
                            <p dir="auto" className="mt-1 text-left text-[13px] leading-snug text-white/60">
                              {e.title}
                            </p>
                            {e.room && (
                              <p className="mt-1 flex items-center gap-1 text-xs text-[#8d8a9e]">
                                <MapPin size={12} className="shrink-0" />
                                <span dir="auto">{e.room}</span>
                              </p>
                            )}
                          </div>

                          <div
                            className={`relative ml-auto flex shrink-0 flex-col items-end overflow-hidden rounded-xl border px-2.5 py-1.5 tabular-nums ${s.tile} ${
                              live ? "rx-livepulse" : "rx-slide"
                            }`}
                            style={live ? undefined : { animationDelay: `${Math.min(i, 8) * 60 + 120}ms` }}
                          >
                            {live && (
                              <span aria-hidden="true" className="rx-shimmer pointer-events-none absolute inset-0" />
                            )}
                            <span className={`relative text-sm font-semibold leading-none ${s.text}`}>
                              {hhmm(e.start_time)}
                            </span>
                            <span className="relative my-1.5 h-px w-full bg-white/15" />
                            <span className="relative text-xs leading-none text-[#8d8a9e]">
                              {hhmm(e.end_time)}
                            </span>
                          </div>
                        </div>

                        {live && (
                          <div className="mt-3">
                            <div className="h-1 overflow-hidden rounded-full bg-white/10">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${s.bar}`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <p className="mt-1 text-[11px] text-[#8d8a9e]">ends in {durText(left)}</p>
                          </div>
                        )}
                      </div>
                    </li>
                  </Fragment>
                );
              })}
            </ul>
          )}
        </div>

        {!loading && dayEntries.length > 0 && (
          <div key={`summary-${selectedDay}`} className="shrink-0 border-t border-white/5 px-4 pb-3 pt-3">
            <p className="rx-rise flex items-center gap-2 text-sm font-medium text-violet-200">
              <span className="rx-dot size-1.5 rounded-full bg-violet-300" />
              {dayEntries.length} {dayEntries.length === 1 ? "class" : "classes"} · {durText(totalMin)}
            </p>
            <div className="mt-2 flex h-1.5 gap-0.5 overflow-hidden rounded-full" aria-hidden="true">
              {dayEntries.map((e, i) => (
                <span
                  key={e.id}
                  className={`rx-grow h-full rounded-full ${subjectOf(e).bar}`}
                  style={{
                    flex: toMin(e.end_time) - toMin(e.start_time),
                    animationDelay: `${i * 70}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {next && nextSubject && (
        <section aria-label="Next class" className={`flex shrink-0 items-center gap-3 px-4 py-3 ${GLASS}`}>
          <SubjectTile s={nextSubject} />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-[#8d8a9e]">Next up</p>
            <p dir="auto" className="truncate text-left text-[13px] text-white/60">
              {next.entry.title}
            </p>
          </div>
          <span className="shrink-0 text-sm font-medium text-violet-300">{next.label}</span>
        </section>
      )}
    </div>
  );
}
