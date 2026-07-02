import { LoaderProps } from "@/types";
import { useEffect, useState } from "react";

function Loader({ loaderProps }: LoaderProps) {
  const { open } = loaderProps ?? {};
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!open) {
      setProgress(0);
      return;
    }

    setProgress(10);
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setProgress(30), 100));
    timers.push(setTimeout(() => setProgress(60), 400));
    timers.push(setTimeout(() => setProgress(80), 900));
    timers.push(setTimeout(() => setProgress(95), 1800));

    return () => timers.forEach(clearTimeout);
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Top progress bar */}
      <div
        className="fixed top-0 left-0 right-0 z-[9999] h-[3px]"
        style={{ pointerEvents: "none" }}
      >
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 transition-all duration-500 ease-out rounded-r-full shadow-[0_0_8px_2px_rgba(99,102,241,0.5)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Floating spinner card — no dark overlay */}
      <div
        className="fixed inset-0 z-[9998] flex items-center justify-center"
        style={{ pointerEvents: "none" }}
      >
        <div className="flex flex-col items-center gap-3 px-8 py-5 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/70 shadow-xl shadow-indigo-100/40">
          {/* Spinning ring */}
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-full border-[3px] border-indigo-100" />
            <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-indigo-500 border-r-blue-500 animate-spin" />
            {/* Inner dot */}
            <div className="absolute inset-[10px] rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 opacity-90" />
          </div>
          <span className="text-xs font-semibold tracking-widest uppercase text-slate-400 select-none">
            Loading…
          </span>
        </div>
      </div>
    </>
  );
}

export default Loader;
