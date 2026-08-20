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

      {/* Minimal spinner */}
      <div
        className="fixed inset-0 z-[9998] flex items-center justify-center"
        style={{ pointerEvents: "none", position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    </>
  );
}

export default Loader;
