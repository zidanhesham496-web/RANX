export type EntryKind = "LEC" | "SEC" | "ACT";

export interface TimetableEntry {
  id: number;
  day: number;
  start_time: string;
  end_time: string;
  title: string;
  kind: EntryKind;
  section: number | null;
  room: string | null;
}
