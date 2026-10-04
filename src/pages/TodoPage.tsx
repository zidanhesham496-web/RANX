import { useEffect, useMemo, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { initialTasks } from "../data/todos";
import type { TodoFilter } from "../types/todo";
import { useAuth } from "../context/AuthContext";
import { fetchCompletedTaskIds, setTaskCompleted } from "../services/todoProgress";
import { TodoFilters } from "../components/todo/TodoFilters";
import { TodoList } from "../components/todo/TodoList";
import { TodoWeekFilter } from "../components/todo/TodoWeekFilter";

const GLASS =
  "rounded-3xl border border-violet-300/15 bg-[#0b0b16]/85 sm:bg-[#0b0b16]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_50px_-20px_rgba(0,0,0,0.9),0_0_40px_-20px_rgba(139,92,246,0.35)] sm:backdrop-blur-xl";

const WEEKS = Array.from(new Set(initialTasks.map((t) => t.week))).sort((a, b) => a - b);

export default function TodoPage() {
  const { session } = useAuth();
  const userId = session?.user.id;

  const [doneIds, setDoneIds] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<TodoFilter>("ALL");
  const [filterOpen, setFilterOpen] = useState(false);
  const [week, setWeek] = useState<number>(WEEKS[0] ?? 1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    let active = true;
    setLoading(true);
    fetchCompletedTaskIds(userId)
      .then((ids) => {
        if (!active) return;
        setDoneIds(new Set(ids));
        setError(null);
      })
      .catch(() => active && setError("Couldn't load your progress. Refresh the page and try again."))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [userId]);

  const tasks = useMemo(
    () =>
      initialTasks
        .filter((t) => t.week === week)
        .map((t) => ({ ...t, completed: doneIds.has(t.id) })),
    [doneIds, week],
  );

  const visible = useMemo(
    () => (filter === "ALL" ? tasks : tasks.filter((t) => t.type === filter)),
    [tasks, filter],
  );

  const toggleTask = async (id: number) => {
    if (!userId) return;
    const next = !doneIds.has(id);
    const apply = (value: boolean) =>
      setDoneIds((prev) => {
        const copy = new Set(prev);
        if (value) copy.add(id);
        else copy.delete(id);
        return copy;
      });

    apply(next);
    setError(null);
    try {
      await setTaskCompleted(userId, id, next);
    } catch {
      apply(!next);
      setError("Couldn't save your change. Check your connection and try again.");
    }
  };

  const done = tasks.filter((t) => t.completed).length;
  const percent = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
  const complete = tasks.length > 0 && done === tasks.length;

  return (
    <div className="flex h-[calc(100dvh-15rem)] min-h-[24rem] flex-col gap-3 sm:gap-4">
      <section aria-label="Week, progress and filters" className={`shrink-0 p-3 pb-1.5 sm:p-4 sm:pb-2 ${GLASS}`}>
        <TodoWeekFilter weeks={WEEKS} value={week} onChange={setWeek} />

        <div className="mt-3 border-t border-white/5 pt-3">
          <div className="flex items-end justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-semibold leading-none tabular-nums text-white">{done}</span>
              <span className="text-sm text-[#8d8a9e]">/ {tasks.length} done</span>
            </div>
            {complete ? (
              <span className="rx-pop flex items-center gap-1 text-sm font-semibold text-emerald-300">
                <Check size={16} strokeWidth={3} />
                All done
              </span>
            ) : (
              <span className="text-sm font-semibold tabular-nums text-violet-300">{percent}%</span>
            )}
          </div>

          <div
            role="progressbar"
            aria-label="Completed tasks"
            aria-valuemin={0}
            aria-valuemax={tasks.length}
            aria-valuenow={done}
            className="mt-2.5 flex h-2.5 gap-1"
          >
            {tasks.map((t, i) => (
              <span
                key={t.id}
                className={`h-full flex-1 rounded-full transition-all duration-500 ${
                  t.completed
                    ? complete
                      ? "bg-gradient-to-r from-emerald-400 to-emerald-300 shadow-[0_0_10px_-2px_rgba(52,211,153,0.7)]"
                      : "bg-gradient-to-r from-violet-500 to-violet-300 shadow-[0_0_10px_-2px_rgba(139,92,246,0.8)]"
                    : "bg-white/10"
                }`}
                style={{ transitionDelay: `${Math.min(i, 12) * 30}ms` }}
              />
            ))}
          </div>
        </div>

        <div
          className={`mt-3 grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
            filterOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div id="todo-type-filter" className="overflow-hidden" inert={!filterOpen}>
            <TodoFilters value={filter} onChange={setFilter} />
          </div>
        </div>

        <button
          type="button"
          aria-expanded={filterOpen}
          aria-controls="todo-type-filter"
          aria-label={filterOpen ? "Hide type filter" : "Show type filter"}
          onClick={() => setFilterOpen((v) => !v)}
          className={`mx-auto mt-0.5 flex h-7 min-w-16 items-center justify-center gap-1 rounded-full px-2 transition active:scale-95 ${
            filter !== "ALL" ? "text-violet-300" : "text-[#8d8a9e] hover:text-white"
          }`}
        >
          {!filterOpen && filter !== "ALL" && (
            <span className="text-[10px] font-semibold tracking-wider">{filter}</span>
          )}
          <ChevronDown size={16} className={`transition-transform duration-300 ${filterOpen ? "rotate-180" : ""}`} />
        </button>
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
        aria-label="Tasks"
        className={`min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 [scrollbar-color:rgba(167,139,250,0.35)_transparent] [scrollbar-width:thin] ${GLASS}`}
      >
        {loading ? (
          <div className="space-y-3" aria-busy="true">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-[72px] animate-pulse rounded-2xl border border-white/5 bg-white/[0.04]" />
            ))}
          </div>
        ) : (
          <TodoList tasks={visible} filter={filter} onToggle={toggleTask} />
        )}
      </section>
    </div>
  );
}
