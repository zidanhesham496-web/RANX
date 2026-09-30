import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { AuthShell } from "../components/AuthShell";
import { FormField } from "../components/FormField";
import { useAuth } from "../context/AuthContext";
import { isSupabaseConfigured, supabaseConfigurationError } from "../services/supabase";

export default function SignUpPage() {
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signUp({
        name: name.trim(),
        phone_number: phoneNumber.trim(),
        username: username.trim().toLowerCase(),
        password,
      });
      setSuccess(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "تعذر إنشاء الحساب.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell title="أنشئ مساحتك" description="خطوات قليلة، ومساحتك جاهزة لك.">
      {success ? (
        <div className="success-panel" role="status">
          <span className="success-icon">✓</span>
          <h2>حسابك جاهز</h2>
          <p>تم إنشاء حسابك بنجاح. يمكنك الآن تسجيل الدخول باستخدام اسم المستخدم.</p>
          <Link className="primary-button button-link" to="/login">الانتقال إلى تسجيل الدخول <span aria-hidden="true">←</span></Link>
        </div>
      ) : (
        <>
          {!isSupabaseConfigured && <p className="notice notice-info" role="status">{supabaseConfigurationError}</p>}
          <form className="auth-form signup-form" onSubmit={handleSubmit}>
            <FormField
              id="name"
              label="الاسم الكامل"
              placeholder="---"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              maxLength={80}
            />
            <FormField
              id="phone-number"
              label="رقم الهاتف"
              type="tel"
              placeholder="---"
              autoComplete="tel"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              required
              minLength={7}
              maxLength={24}
            />
            <FormField
              id="new-username"
              label="اسم المستخدم"
              placeholder="---"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              minLength={3}
              maxLength={24}
              pattern="[A-Za-z0-9_]+"
              hint="3 إلى 24 حرفًا أو رقمًا أو شرطة سفلية."
            />
            <FormField
              id="new-password"
              label="كلمة المرور"
              type="password"
              placeholder="---"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={10}
            />
            {error && <p className="notice notice-error" role="alert">{error}</p>}
            <button className="primary-button" type="submit" disabled={submitting}>
              {submitting ? "جارٍ إنشاء الحساب..." : "إنشاء الحساب"}
              {!submitting && <span aria-hidden="true">←</span>}
            </button>
          </form>
          <p className="auth-switch">لديك حساب بالفعل؟ <Link to="/login">سجّل الدخول</Link></p>
        </>
      )}
    </AuthShell>
  );
}