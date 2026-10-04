import { HomeError } from "../components/home/HomeError";
import { LogoutButton } from "../components/settings/LogoutButton";
import { ProfileCard } from "../components/settings/ProfileCard";
import { ProfileSections } from "../components/settings/ProfileSections";
import { useAuth } from "../context/AuthContext";

function Bar({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-violet-300/10 motion-reduce:animate-none ${className}`} />
  );
}

function ProfileSkeleton() {
  return (
    <div dir="ltr" aria-busy="true" aria-label="Loading" className="space-y-6">
      <div className="pt-10">
        <div className="relative flex flex-col items-center gap-2.5 rounded-3xl border border-violet-300/10 bg-[#0d0d18]/60 px-5 pt-14 pb-6">
          <div className="absolute top-0 left-1/2 size-20 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full border border-violet-300/10 bg-[#0d0d18] motion-reduce:animate-none" />
          <Bar className="h-5 w-32 rounded-md" />
          <Bar className="h-3 w-24 rounded-md" />
          <Bar className="h-3 w-28 rounded-md" />
        </div>
      </div>
      {[4, 3].map((rows) => (
        <div key={rows} className="space-y-2">
          <Bar className="h-3 w-20 rounded-md" />
          <Bar className={rows === 4 ? "h-[236px] rounded-2xl" : "h-[180px] rounded-2xl"} />
        </div>
      ))}
    </div>
  );
}

export default function ProfilePage() {
  const { profile, loading } = useAuth();

  if (loading) return <ProfileSkeleton />;
  if (!profile) return <HomeError />;

  return (
    <div dir="ltr" className="space-y-6">
      <ProfileCard id={profile.id} name={profile.name} username={profile.username} role={profile.role} />
      <ProfileSections username={profile.username} />
      <LogoutButton />
    </div>
  );
}
