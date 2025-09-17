import React, { useEffect, useState } from "react";
import { Stack, Typography } from "../common";
import { TypographyVariantEnum } from "@/types";
import { colorStyles } from "@/styles";

type StopWatchHandlerProps = {
  getStopWatchTime: (time: number) => void;
};

const StopWatchHandler = ({ getStopWatchTime }: StopWatchHandlerProps) => {
  const MAX_TIME = 20 * 60;
  const [stopwatchTime, setStopwatchTime] = useState(MAX_TIME);

  useEffect(() => {
    let timeoutId: any;

    if (stopwatchTime > 0) {
      timeoutId = setTimeout(() => {
        setStopwatchTime((prev) => prev - 1);
      }, 1000);
    }

    return () => clearTimeout(timeoutId);
  }, [stopwatchTime]);

  getStopWatchTime(stopwatchTime);

  return (
    <>
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
            className: "text-center ",
          }}
        />
      </Stack>
    </>
  );
};

export default StopWatchHandler;
