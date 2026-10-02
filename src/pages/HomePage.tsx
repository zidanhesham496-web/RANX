import { AcademicProgress } from "../components/home/AcademicProgress";
import { HomeError } from "../components/home/HomeError";
import { HomeSkeleton } from "../components/home/HomeSkeleton";
import { SubjectsSection } from "../components/home/SubjectsSection";
import { UpcomingCard } from "../components/home/UpcomingCard";
import { useHomeData } from "../hooks/useHomeData";

export default function HomePage() {
  const { status, firstName, progress, subjects, upcoming } = useHomeData();
  if (status === "loading") return <HomeSkeleton />;
  if (status === "error") return <HomeError />;
  return (
    <div dir="ltr" className="space-y-7">
      <AcademicProgress value={progress} name={firstName} />
      <SubjectsSection subjects={subjects} />
      {upcoming && <UpcomingCard item={upcoming} />}
    </div>
  );
}
