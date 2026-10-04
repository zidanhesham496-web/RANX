import type { UserRole } from "../../types/database";
import { GeometricAvatar } from "./GeometricAvatar";

interface ProfileCardProps {
  id: string;
  name: string;
  username: string;
  role: UserRole;
}

export function ProfileCard({ id, name, username, role }: ProfileCardProps) {
  return (
    <section aria-label="Profile" className="pt-10">
      <div className="relative rounded-3xl border border-violet-300/15 bg-[#0d0d18]/75 px-5 pt-14 pb-6 text-center shadow-[0_12px_40px_-12px_rgba(0,0,0,0.9)] backdrop-blur-md">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-violet-500/25 blur-xl"
          />
          <div className="relative grid size-20 place-items-center rounded-full border border-violet-300/30 bg-gradient-to-b from-[#1a1033] to-[#0d071a]">
            <GeometricAvatar seed={id} />
          </div>
        </div>
        <h1 className="text-xl font-semibold tracking-wide text-white uppercase">{name}</h1>
        <p className="mt-1 text-[13px] text-violet-300/90">@{username}</p>
        <p className="mt-0.5 text-[12px] text-[#8d8a9e]">
          {role === "admin" ? "Administrator" : "University Student"}
        </p>
      </div>
    </section>
  );
}
