interface GreetingSectionProps {
  name: string;
  username: string;
}

function getPeriod(date = new Date()): string {
  const h = date.getHours();
  if (h < 5) return "Good evening";
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export function GreetingSection({ name, username }: GreetingSectionProps) {
  return (
    <header className="animate-[rise-in_.55s_ease-out_both] motion-reduce:animate-none">
      <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-violet-300/80 uppercase">
        <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.8)]" />
        {getPeriod()}
      </p>
      <h1 className="text-[32px] leading-tight font-semibold tracking-tight">
        <span className="text-[#8d8a9e]">Hello,</span>{" "}
        <span className="text-white uppercase">{name || "there"}</span>
      </h1>
      {username && <p className="mt-1.5 text-[13px] text-[#8d8a9e]">@{username}</p>}
    </header>
  );
}
