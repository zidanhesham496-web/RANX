import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ParticleBackground } from "../ParticleBackground";
import { AppHeader } from "./AppHeader";
import { AppFooter } from "./AppFooter";
import { BottomNavigation } from "./BottomNavigation";

export function AuthenticatedLayout() {
  return (
    <div dir="ltr" className="relative flex min-h-dvh flex-col overflow-x-hidden bg-[#09090f] text-[#f1eff7]">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <ParticleBackground />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(74,48,124,0.35),transparent_45%),radial-gradient(ellipse_at_92%_90%,rgba(113,65,206,0.14),transparent_40%)]"
      />
      <AppHeader />
      <main className="relative mx-auto w-full max-w-2xl flex-1 px-5 pt-5">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <div className="relative pb-24 pt-6">
        <AppFooter />
      </div>
      <BottomNavigation />
    </div>
  );
}
