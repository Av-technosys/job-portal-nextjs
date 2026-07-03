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

      {/* Modern, minimal floating pill spinner */}
      <div
        className="fixed inset-0 z-[9998] flex items-center justify-center"
        style={{ pointerEvents: "none", position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div 
          className="flex items-center justify-center px-5 py-3.5 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "14px 20px", borderRadius: "9999px", background: "#ffffff", boxShadow: "0 8px 30px rgba(0,0,0,0.08)", border: "1px solid #f1f5f9" }}
        >
          <svg 
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" 
            style={{ width: "20px", height: "20px", marginRight: "12px", marginLeft: "-4px", color: "#2563eb", flexShrink: 0, animation: "spin 1s linear infinite" }}
            width="20" 
            height="20" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-sm font-semibold text-slate-600 tracking-wide" style={{ fontSize: "14px", fontWeight: 600, color: "#475569" }}>Processing...</span>
        </div>
      </div>
    </>
  );
}

export default Loader;
