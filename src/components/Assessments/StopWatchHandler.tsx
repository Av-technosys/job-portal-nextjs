import React, { useEffect, useState } from "react";

type StopWatchHandlerProps = {
  getStopWatchTime: (time: number) => void;
  maxTime?: number; // optional for fallback
  isLoading?: boolean;
};

const StopWatchHandler = ({
  getStopWatchTime,
  maxTime,
  isLoading = false,
}: StopWatchHandlerProps) => {
  const [stopwatchTime, setStopwatchTime] = useState<number | null>(null);

  // ✅ Initialize time only after loading finishes
  useEffect(() => {
    if (!isLoading && maxTime) {
      setStopwatchTime(maxTime * 60);
    }
  }, [isLoading, maxTime]);

  // ✅ Start countdown only when stopwatchTime is set and not loading
  useEffect(() => {
    if (isLoading || stopwatchTime === null || stopwatchTime <= 0) return;

    const timeoutId = setTimeout(() => {
      setStopwatchTime((prev) => (prev ? prev - 1 : prev));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [stopwatchTime, isLoading]);

  // ✅ Pass current time up
  useEffect(() => {
    if (stopwatchTime !== null) getStopWatchTime(stopwatchTime);
  }, [stopwatchTime, getStopWatchTime]);

  // ⏳ Show loading UI while waiting for questions
  if (isLoading || stopwatchTime === null) {
    return (
      <span className="font-mono font-semibold text-slate-400 text-sm animate-pulse">
        Loading...
      </span>
    );
  }

  // 🕒 Timer display
  return (
    <span className="font-mono font-bold text-slate-800 tracking-wide text-base">
      Time left: {String(Math.floor(stopwatchTime / 60)).padStart(2, "0")}:{String(stopwatchTime % 60).padStart(2, "0")}
    </span>
  );
};

export default StopWatchHandler;
