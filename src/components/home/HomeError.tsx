export function HomeError() {
  return (
    <div
      dir="ltr"
      role="alert"
      className="mt-3 rounded-2xl border border-violet-300/15 bg-[#0d0d18]/75 p-5 text-center backdrop-blur-md"
    >
      <p className="text-sm font-medium text-white">Couldn't load your data</p>
      <p className="mt-1 text-[13px] text-[#8d8a9e]">Check your connection and try again.</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-4 h-10 rounded-full border border-violet-300/20 bg-violet-500/15 px-5 text-[13px] font-medium text-white transition hover:bg-violet-500/25 active:scale-95"
      >
        Retry
      </button>
    </div>
  );
}
