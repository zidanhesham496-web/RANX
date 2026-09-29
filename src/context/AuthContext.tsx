import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabaseClient, isSupabaseConfigured } from "../services/supabase";
import type { Profile } from "../types/database";

interface SignUpInput {
  name: string;
  phone_number: string;
  username: string;
  password: string;
}

interface AuthContextValue {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (input: SignUpInput) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const authEmailForUsername = (username: string) =>
  `${username.trim().toLowerCase()}@auth.ranx.invalid`;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    let mounted = true;
    const client = getSupabaseClient();

    const hydrate = async (nextSession: Session | null) => {
      if (!mounted) return;
      setLoading(true);
      setSession(nextSession);
      if (!nextSession) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const { data, error } = await client
        .from("profiles")
        .select("id, name, phone_number, username, role, created_at")
        .eq("id", nextSession.user.id)
        .maybeSingle();

      if (!mounted) return;
      setProfile(error ? null : (data as Profile | null));
      setLoading(false);
    };

    void client.auth.getSession().then(({ data }) => hydrate(data.session));
    const { data } = client.auth.onAuthStateChange((_event, nextSession) => {
      window.setTimeout(() => void hydrate(nextSession), 0);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (username: string, password: string) => {
    const client = getSupabaseClient();
    const { error } = await client.auth.signInWithPassword({
      email: authEmailForUsername(username),
      password,
    });

    if (error) {
      console.error("Supabase sign-in failed", {
        name: error.name,
        message: error.message,
        status: error.status,
        code: error.code,
      });
      throw new Error(error.message);
    }
  };

  const signUp = async (input: SignUpInput) => {
    const client = getSupabaseClient();
    const username = input.username.trim().toLowerCase();
    const { data, error } = await client.auth.signUp({
      email: authEmailForUsername(username),
      password: input.password,
      options: {
        data: {
          name: input.name.trim(),
          phone_number: input.phone_number.trim(),
          username,
        },
      },
    });

    if (error) {
      console.error("Supabase auth.signUp failed", {
        name: error.name,
        message: error.message,
        status: error.status,
        code: error.code,
      });
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error("لم يُرجع Supabase مستخدمًا بعد التسجيل.");
    }
    if (!data.session) {
      throw new Error(
        "أُنشئ مستخدم Auth، لكن لا توجد جلسة لإضافة الملف الشخصي. عطّل تأكيد البريد الإلكتروني في إعدادات Supabase Auth؛ عناوين تسجيل RANX داخلية وغير قابلة لاستقبال البريد.",
      );
    }

    const { data: createdProfile, error: profileError } = await client
      .from("profiles")
      .insert({
        id: data.user.id,
        name: input.name.trim(),
        phone_number: input.phone_number.trim(),
        username,
      })
      .select("id, name, phone_number, username, role, created_at")
      .single();

    if (profileError) {
      console.error("Supabase profiles insert failed", {
        code: profileError.code,
        message: profileError.message,
        details: profileError.details,
        hint: profileError.hint,
      });
      throw new Error(profileError.message);
    }

    setSession(data.session);
    setProfile(createdProfile as Profile);
  };

  const signOut = async () => {
    const { error } = await getSupabaseClient().auth.signOut();
    if (error) throw new Error("تعذر تسجيل الخروج. حاول مرة أخرى.");
  };

  return (
    <AuthContext.Provider value={{ session, profile, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}