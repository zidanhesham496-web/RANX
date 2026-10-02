import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getSubjectMeta, type SubjectMeta } from "../lib/subjects";
import type { UpcomingItem } from "../components/home/UpcomingCard";

export type HomeStatus = "loading" | "ready" | "error";

// TEMP MOCK: replace with Supabase queries when real data exists.
const MOCK_PROGRESS = 38;
const MOCK_SUBJECT_CODES = ["ANATOMY", "PHYSIOLOGY", "BIOCHEMISTRY", "HISTOLOGY", "BIO"];

export interface HomeData {
  status: HomeStatus;
  firstName: string;
  username: string;
  progress: number | null;
  subjects: SubjectMeta[];
  upcoming: UpcomingItem | null;
}

export function useHomeData(): HomeData {
  const { profile, loading: authLoading } = useAuth();
  const [mockReady, setMockReady] = useState(false);

  // TEMP MOCK: short delay so the loading skeleton is visible. Remove with the mock.
  useEffect(() => {
    const t = window.setTimeout(() => setMockReady(true), 350);
    return () => window.clearTimeout(t);
  }, []);

  const status: HomeStatus = authLoading || !mockReady ? "loading" : profile ? "ready" : "error";

  return {
    status,
    firstName: profile?.name?.trim().split(/\s+/)[0] ?? "",
    username: profile?.username ?? "",
    progress: MOCK_PROGRESS,
    subjects: MOCK_SUBJECT_CODES.map(getSubjectMeta),
    upcoming: null, // TEMP: no data source yet
  };
}
