import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseClient } from "./supabase";

const db = () => getSupabaseClient() as unknown as SupabaseClient;

export async function fetchCompletedTaskIds(userId: string): Promise<number[]> {
  const { data, error } = await db()
    .from("task_completions")
    .select("task_id")
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
  return (data ?? []).map((row: { task_id: number }) => row.task_id);
}

export async function setTaskCompleted(userId: string, taskId: number, completed: boolean) {
  if (completed) {
    const { error } = await db()
      .from("task_completions")
      .upsert({ user_id: userId, task_id: taskId });
    if (error) throw new Error(error.message);
  } else {
    const { error } = await db()
      .from("task_completions")
      .delete()
      .eq("user_id", userId)
      .eq("task_id", taskId);
    if (error) throw new Error(error.message);
  }
}
