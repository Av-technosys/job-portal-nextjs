import React, { useEffect, useState } from "react";
import { Stack, Typography } from "../common";
import { TypographyVariantEnum } from "@/types";
import { colorStyles } from "@/styles";

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
      console.log("✅ Timer started with backend time:", maxTime, "minutes");
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
      <Stack
        stackProps={{
          alignItems: "center",
          justifyContent: "center",
          sx: {
            width: "100%",
            padding: "10px 10px",
            backgroundColor: colorStyles.latestJobCardBackground,
          },
        }}
      >
        <Typography
          typographyProps={{
            children: "Loading questions...",
            variant: TypographyVariantEnum.H6,
            color: "text.secondary",
            className: "text-center",
          }}
        />
      </Stack>
    );
  }

  // 🕒 Timer display
  return (
    <Stack
      stackProps={{
        alignItems: "end",
        sx: {
          width: "100%",
          padding: "10px 10px",
          backgroundColor: colorStyles.latestJobCardBackground,
        },
      }}
    >
      <Typography
        typographyProps={{
          children: `Time left: ${String(
            Math.floor(stopwatchTime / 60)
          ).padStart(2, "0")}:${String(stopwatchTime % 60).padStart(2, "0")}`,
          variant: TypographyVariantEnum.H5,
          color: "text.secondary",
          className: "text-center",
        }}
      />
    </Stack>
  );
};

export default StopWatchHandler;
