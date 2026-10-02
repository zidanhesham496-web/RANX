import { useEffect, useMemo, useState } from "react";
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
    () => initialTasks
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

  return (
    <div className="flex h-[calc(100dvh-15rem)] min-h-[24rem] flex-col gap-4">
      <section aria-label="Week" className={`shrink-0 p-3 ${GLASS}`}>
        <TodoWeekFilter weeks={WEEKS} value={week} onChange={setWeek} />
      </section>

      <section aria-label="Progress and filters" className={`shrink-0 space-y-4 p-4 ${GLASS}`}>
        <div>
          <p className="mb-1.5 text-sm text-[#c9c5d9]">
            {done} of {tasks.length} completed
          </p>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            className="h-1.5 overflow-hidden rounded-full bg-white/10"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-300 transition-all duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
        <TodoFilters value={filter} onChange={setFilter} />
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
