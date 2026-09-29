import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { AuthNetwork } from "./AuthNetwork";

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="auth-page">
      <div className="auth-atmosphere" aria-hidden="true">
        <AuthNetwork />
      </div>
      <div className="auth-content">
        <Link className="auth-brand" to="/" aria-label="RANX، الصفحة الرئيسية">
          <span className="auth-infinity" aria-hidden="true">∞</span>
          <span className="auth-wordmark">RANX</span>
        </Link>
        <section className="auth-panel">
          <div className="auth-heading">
            {eyebrow && <span className="eyebrow"><span className="status-dot" /> {eyebrow}</span>}
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          {children}
        </section>
      </div>
      <div className="auth-footer"><span>made by</span><strong>ZIDAN</strong></div>
    </main>
  );
}