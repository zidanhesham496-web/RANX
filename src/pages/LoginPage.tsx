import React, { useState } from "react";
import { AuthCard } from "../components/auth/AuthCard";
import { ParticleBackground } from "../components/ParticleBackground";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { signIn, signUp } = useAuth();
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (authMode === "signup") {
        await signUp({
          name: formData.name,
          phone_number: formData.phone,
          username: formData.username,
          password: formData.password,
        });
      } else {
        await signIn(formData.username, formData.password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMode = () => {
    setError(null);
    setAuthMode((prev) => (prev === "login" ? "signup" : "login"));
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#05070c] p-4 font-sans text-slate-100">
      <ParticleBackground />
      <div className="pointer-events-none absolute left-1/2 top-1/4 z-0 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-purple-900/15 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 z-0 h-[350px] w-[350px] rounded-full bg-indigo-900/10 blur-[110px]" />
      <AuthCard
        mode={authMode}
        onSubmit={handleSubmit}
        onToggleMode={handleToggleMode}
        loading={loading}
        error={error}
        formData={formData}
        onChange={handleChange}
      />
    </div>
  );
}
