import { RanxLogo } from "../components/RanxLogo";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthShell } from "../components/AuthShell";
import { FormField } from "../components/FormField";
import { useAuth } from "../context/AuthContext";
import { isSupabaseConfigured, supabaseConfigurationError } from "../services/supabase";

export default function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signIn(username.trim(), password);
      navigate("/", { replace: true });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "تعذر تسجيل الدخول.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell title="مرحبًا بعودتك" description="سجّل الدخول إلى مساحتك في .">
      <RanxLogo />
      {!isSupabaseConfigured && <p className="notice notice-info" role="status">{supabaseConfigurationError}</p>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <FormField
          id="username"
          label="اسم المستخدم"
          placeholder="---"
          autoComplete="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          minLength={3}
        />
        <FormField
          id="password"
          label="كلمة المرور"
          type="password"
          placeholder="---"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {error && <p className="notice notice-error" role="alert">{error}</p>}
        <button className="primary-button" type="submit" disabled={submitting}>
          {submitting ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
          {!submitting && <span aria-hidden="true">←</span>}
        </button>
      </form>
      <p className="auth-switch">مستخدم جديد؟ <Link to="/signup">أنشئ حسابًا</Link></p>
    </AuthShell>
  );
}