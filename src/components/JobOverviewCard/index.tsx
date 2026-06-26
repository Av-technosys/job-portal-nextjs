import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { Stack, Typography, TextWithIcon } from "../common";
import { colorStyles } from "@/styles";
import { JOB_DETAIL_PAGE_CONFIG } from "@/constants";
import {
  AccountBalanceWalletOutlinedIcon,
  BusinessCenterOutlinedIcon,
  CalendarTodayOutlinedIcon,
  LayersOutlinedIcon,
  TimerOutlinedIcon,
} from "@/assets";
import { JobOverviewCardProps } from "@/types";

function JobOverviewCard({ job }: JobOverviewCardProps) {
  const {
    JOB_OVERVIEW_TEXT,
    POSTED_DATE,
    JOB_POSTED_TEXT,
    JOB_EXPIRE_TEXT,
    JOB_LEVEL_TEXT,
    EXPERIENCE_TEXT,
    EDUCATION_TEXT,
    JOB_EXPIRE,
    JOB_LEVEL,
    EXPERIENCE,
    EDUCATION,
  } = JOB_DETAIL_PAGE_CONFIG;

  const jobOverview = useMemo(() => {
    return [
      {
        icon: (
          <CalendarTodayOutlinedIcon
            sx={{ color: colorStyles.filterTagsTextColor }}
          />
        ),
        subTextProps: JOB_POSTED_TEXT(),
        textProps: POSTED_DATE(job),
      },
      {
        icon: (
          <TimerOutlinedIcon sx={{ color: colorStyles.filterTagsTextColor }} />
        ),
        subTextProps: JOB_EXPIRE_TEXT(),
        textProps: JOB_EXPIRE(job),
      },
      {
        icon: (
          <LayersOutlinedIcon sx={{ color: colorStyles.filterTagsTextColor }} />
        ),
        subTextProps: JOB_LEVEL_TEXT(),
        textProps: JOB_LEVEL(job),
      },
      {
        icon: (
          <AccountBalanceWalletOutlinedIcon
            sx={{ color: colorStyles.filterTagsTextColor }}
          />
        ),
        subTextProps: EXPERIENCE_TEXT(),
        textProps: EXPERIENCE(job),
      },
      {
        icon: (
          <BusinessCenterOutlinedIcon
            sx={{ color: colorStyles.filterTagsTextColor }}
          />
        ),
        subTextProps: EDUCATION_TEXT(),
        textProps: EDUCATION(job),
      },
    ];
  }, [
    EDUCATION,
    EXPERIENCE,
    JOB_EXPIRE,
    JOB_LEVEL,
    JOB_POSTED_TEXT,
    POSTED_DATE,
    JOB_EXPIRE_TEXT,
    JOB_LEVEL_TEXT,
    EXPERIENCE_TEXT,
    EDUCATION_TEXT,
    job,
  ]);

  return (
    <Stack
      stackProps={{
        className: "border rounded-xl p-4 sm:p-5",
        borderColor: colorStyles.filterTagsBackgroundColor,
        gap: 3,
      }}
    >
      <Typography {...JOB_OVERVIEW_TEXT()} />
      <Stack
        stackProps={{
          className: "grid grid-cols-1 gap-y-4 gap-x-2",
        }}
      >
        {jobOverview.map((detail, index) => (
          <Stack key={index} stackProps={{ direction: "row", gap: 2, alignItems: "flex-start" }}>
            <Stack stackProps={{ mt: 0.5 }}>
              {detail.icon}
            </Stack>
            <Stack stackProps={{ gap: 0.5 }}>
              <Typography {...detail.subTextProps} />
              <Box sx={{ fontWeight: "500", color: "#172033", "& .MuiTypography-root": { color: "inherit", fontWeight: "inherit" } }}>
                <Typography {...detail.textProps} />
              </Box>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

export default JobOverviewCard;
