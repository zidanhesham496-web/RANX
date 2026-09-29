import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export const supabaseConfigurationError = (() => {
  if (!supabaseUrl || !supabaseAnonKey) {
    return "بيانات Supabase غير موجودة. انسخ .env.example إلى .env وأضف VITE_SUPABASE_URL وVITE_SUPABASE_ANON_KEY.";
  }

  try {
    const url = new URL(supabaseUrl);
    if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error();
  } catch {
    return "قيمة VITE_SUPABASE_URL ليست عنوان URL صالحًا.";
  }

  return null;
})();

export const isSupabaseConfigured = supabaseConfigurationError === null;

export function getSupabaseClient() {
  if (supabaseConfigurationError) throw new Error(supabaseConfigurationError);

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
  });
}