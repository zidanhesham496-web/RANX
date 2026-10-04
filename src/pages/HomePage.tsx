import { AcademicProgress } from "../components/home/AcademicProgress";
import { HomeError } from "../components/home/HomeError";
import { HomeSkeleton } from "../components/home/HomeSkeleton";
import { UpcomingCard } from "../components/home/UpcomingCard";
import { useHomeData } from "../hooks/useHomeData";

export default function HomePage() {
  const { status, firstName, progress, tasksDone, tasksTotal, subjects, upcoming } = useHomeData();
  if (status === "loading") return <HomeSkeleton />;
  if (status === "error") return <HomeError />;
  return (
    <div dir="ltr" className="space-y-7">
      <AcademicProgress
        value={progress}
        name={firstName}
        subjects={subjects}
        done={tasksDone}
        total={tasksTotal}
      />
      {upcoming && <UpcomingCard item={upcoming} />}
    </div>
  );
}
