import { Check, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Task, TaskType } from "../../types/todo";

const TYPE_LABEL: Record<TaskType, string> = {
  LEC: "LECTURE",
  SEC: "SECTION",
  ASS: "ASSIGNMENT",
};

export function TodoCard({
  task,
  onToggle,
}: {
  task: Task;
  onToggle: (id: number) => void;
}) {
  const navigate = useNavigate();
  const meta = task.number
    ? `${TYPE_LABEL[task.type]} • ${String(task.number).padStart(2, "0")}`
    : TYPE_LABEL[task.type];

  return (
    <li>
      <label
        className={`flex min-h-[72px] cursor-pointer items-center gap-4 rounded-2xl border px-4 py-3.5 transition ${
          task.completed
            ? "border-white/5 bg-white/[0.02] opacity-60"
            : "border-violet-300/15 bg-gradient-to-br from-white/[0.07] to-white/[0.02] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.8)] hover:border-violet-300/30"
        }`}
      >
        <input
          type="checkbox"
          className="peer sr-only"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span
          aria-hidden="true"
          className={`grid size-6 shrink-0 place-items-center rounded-lg border transition peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-violet-300 ${
            task.completed
              ? "border-violet-300/60 bg-violet-500/30 text-white"
              : "border-white/25 bg-white/[0.03]"
          }`}
        >
          {task.completed && <Check size={15} strokeWidth={3} />}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <span className="truncate text-xs font-semibold tracking-wider text-violet-300/90">
              {task.subject}
            </span>
            <span className="shrink-0 text-[11px] tracking-wider text-[#8d8a9e]">{meta}</span>
          </div>
          <p
            className={`mt-0.5 text-base font-medium leading-snug ${
              task.completed ? "text-[#8d8a9e] line-through decoration-white/25" : "text-white"
            }`}
          >
            {task.title}
          </p>
        </div>

        <button
          type="button"
          aria-label={`Open sources for ${task.title}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate(`/source?task=${task.id}`);
          }}
          className="grid size-10 shrink-0 place-items-center rounded-xl border border-violet-300/25 bg-violet-500/10 text-violet-200 transition hover:bg-violet-500/20 hover:text-white active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300"
        >
          <LogOut size={18} />
        </button>
      </label>
    </li>
  );
}
