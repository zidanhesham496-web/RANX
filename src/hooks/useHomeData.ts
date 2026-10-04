import { useAuth } from "../context/AuthContext";
import { getSubjectMeta, type SubjectMeta } from "../lib/subjects";
import type { UpcomingItem } from "../components/home/UpcomingCard";
import { useTodoProgress } from "./useTodoProgress";

export type HomeStatus = "loading" | "ready" | "error";

const SUBJECT_CODES = ["ANATOMY", "PHYSIOLOGY", "BIOCHEMISTRY", "HISTOLOGY", "BIO"];

export interface HomeData {
  status: HomeStatus;
  firstName: string;
  username: string;
  progress: number | null;
  tasksDone: number;
  tasksTotal: number;
  subjects: SubjectMeta[];
  upcoming: UpcomingItem | null;
}

export function useHomeData(): HomeData {
  const { profile, loading: authLoading } = useAuth();
  const todo = useTodoProgress();

  const status: HomeStatus = authLoading || todo.loading ? "loading" : profile ? "ready" : "error";

  return {
    status,
    firstName: profile?.name?.trim().split(/\s+/)[0] ?? "",
    username: profile?.username ?? "",
    progress: todo.error ? null : todo.overall.percent,
    tasksDone: todo.overall.done,
    tasksTotal: todo.overall.total,
    subjects: SUBJECT_CODES.map(getSubjectMeta),
    upcoming: null, // TEMP: no data source yet
  };
}
