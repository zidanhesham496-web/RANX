import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseClient } from "./supabase";
import type { TimetableEntry } from "../types/timetable";

const db = () => getSupabaseClient() as unknown as SupabaseClient;

export async function fetchTimetable(): Promise<TimetableEntry[]> {
  const { data, error } = await db()
    .from("timetable_entries")
    .select("id, day, start_time, end_time, title, kind, section, room")
    .order("start_time");
  if (error) throw new Error(error.message);
  return (data ?? []) as TimetableEntry[];
}

export async function fetchSection(userId: string): Promise<number | null> {
  const { data, error } = await db()
    .from("student_settings")
    .select("section")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data as { section: number | null } | null)?.section ?? null;
}

export async function saveSection(userId: string, section: number) {
  const { error } = await db()
    .from("student_settings")
    .upsert({ user_id: userId, section, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
}
