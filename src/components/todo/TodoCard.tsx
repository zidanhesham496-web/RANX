import { Apple, BookOpen, Bone, Check, Dna, Egg, FlaskConical, HeartPulse, LogOut, Microscope } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Task, TaskType } from "../../types/todo";

type IconType = typeof Bone;

const KIND: Record<TaskType, { badge: string; stripe: string; done: string }> = {
  LEC: {
    badge: "border-violet-300/30 bg-violet-500/15 text-violet-200",
    stripe: "bg-gradient-to-b from-violet-400 to-violet-600",
    done: "from-violet-500 to-violet-400",
  },
  SEC: {
    badge: "border-sky-300/30 bg-sky-500/15 text-sky-200",
    stripe: "bg-gradient-to-b from-sky-300 to-sky-500",
    done: "from-sky-500 to-sky-400",
  },
  ASS: {
    badge: "border-amber-300/30 bg-amber-500/15 text-amber-200",
    stripe: "bg-gradient-to-b from-amber-300 to-amber-500",
    done: "from-amber-500 to-amber-400",
  },
};

const KIND_SHORT: Record<TaskType, string> = { LEC: "LEC", SEC: "SEC", ASS: "ASS" };

interface SubjectLook {
  Icon: IconType;
  tile: string;
  text: string;
}

const LOOKS: [RegExp, SubjectLook][] = [
  [/anat/i, { Icon: Bone, tile: "border-violet-300/30 bg-violet-500/15", text: "text-violet-200" }],
  [/physio/i, { Icon: HeartPulse, tile: "border-sky-300/30 bg-sky-500/15", text: "text-sky-200" }],
  [/bioch/i, { Icon: FlaskConical, tile: "border-cyan-300/30 bg-cyan-500/15", text: "text-cyan-200" }],
  [/histo/i, { Icon: Microscope, tile: "border-pink-300/30 bg-pink-500/15", text: "text-pink-200" }],
  [/^bio/i, { Icon: Dna, tile: "border-emerald-300/30 bg-emerald-500/15", text: "text-emerald-200" }],
  [/nutri/i, { Icon: Apple, tile: "border-lime-300/30 bg-lime-500/15", text: "text-lime-200" }],
  [/poult|anp/i, { Icon: Egg, tile: "border-amber-300/30 bg-amber-500/15", text: "text-amber-200" }],
];
const FALLBACK: SubjectLook = {
  Icon: BookOpen,
  tile: "border-white/20 bg-white/10",
  text: "text-[#c9c5d9]",
};
const lookOf = (subject: string) => LOOKS.find(([re]) => re.test(subject))?.[1] ?? FALLBACK;

export function TodoCard({
  task,
  onToggle,
}: {
  task: Task;
  onToggle: (id: number) => void;
}) {
  const navigate = useNavigate();
  const kind = KIND[task.type];
  const look = lookOf(task.subject);
  const { Icon } = look;
  const badge = task.number
    ? `${KIND_SHORT[task.type]} ${String(task.number).padStart(2, "0")}`
    : KIND_SHORT[task.type];

  return (
    <li>
      <label
        className={`group relative flex min-h-[76px] cursor-pointer items-center gap-3 overflow-hidden rounded-2xl border py-3 pl-5 pr-3 transition duration-200 active:scale-[0.985] ${
          task.completed
            ? "border-white/5 bg-white/[0.02]"
            : "border-violet-300/15 bg-gradient-to-br from-white/[0.08] to-white/[0.02] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.8)] hover:border-violet-300/30"
        }`}
      >
        <span
          aria-hidden="true"
          className={`absolute inset-y-0 left-0 w-1 ${kind.stripe} ${task.completed ? "opacity-30" : "opacity-90"}`}
        />

        <input
          type="checkbox"
          className="peer sr-only"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span
          aria-hidden="true"
          className={`grid size-7 shrink-0 place-items-center rounded-full border transition peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-violet-300 ${
            task.completed
              ? `rx-check border-transparent bg-gradient-to-br ${kind.done} text-white shadow-[0_0_14px_-2px_rgba(139,92,246,0.7)]`
              : "border-white/25 bg-white/[0.03] group-hover:border-violet-300/50"
          }`}
        >
          {task.completed && <Check size={16} strokeWidth={3} />}
        </span>

        <span
          aria-hidden="true"
          className={`grid size-10 shrink-0 place-items-center rounded-xl border ${look.tile} ${look.text} ${
            task.completed ? "opacity-50" : ""
          }`}
        >
          <Icon size={19} strokeWidth={1.7} />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className={`truncate text-[11px] font-semibold tracking-wider ${
                task.completed ? "text-violet-300/50" : "text-violet-300/90"
              }`}
            >
              {task.subject}
            </span>
            <span
              className={`shrink-0 rounded-md border px-1.5 py-px text-[9px] font-semibold tracking-wider ${kind.badge} ${
                task.completed ? "opacity-50" : ""
              }`}
            >
              {badge}
            </span>
          </div>
          <p
            className={`mt-0.5 text-[15px] font-medium leading-snug ${
              task.completed ? "text-[#8d8a9e] line-through decoration-white/20" : "text-white"
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
          className={`grid size-10 shrink-0 place-items-center rounded-xl border border-violet-300/20 bg-violet-500/10 text-violet-200 transition hover:bg-violet-500/20 hover:text-white active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 ${
            task.completed ? "opacity-60" : ""
          }`}
        >
          <LogOut size={17} />
        </button>
      </label>
    </li>
  );
}
