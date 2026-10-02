import { RanxWordmark } from "./RanxWordmark";
import type { ReactNode } from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function DashboardShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  const { profile, signOut } = useAuth();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut();
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <main className="dashboard-page">
      <header className="dashboard-topbar">
        <a className="brand-mark" href="/" aria-label="RANX"><RanxWordmark className="h-7" /></a>
        <div className="topbar-user">
          <div className="avatar">{profile?.name.slice(0, 1).toUpperCase()}</div>
          <span>{profile?.username}</span>
          <button className="quiet-button" onClick={handleSignOut} disabled={signingOut}>
            {signingOut ? "جارٍ الخروج..." : "تسجيل الخروج"}
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </header>
      <section className="dashboard-content">
        <div className="dashboard-heading">
          <span className="eyebrow"><span className="status-dot" /> {eyebrow}</span>
          <h1>{title}</h1>
        </div>
        {children}
      </section>
      <footer className="dashboard-footer">RANX <span>·</span> مساحة رقمية أكثر وضوحًا</footer>
    </main>
  );
}