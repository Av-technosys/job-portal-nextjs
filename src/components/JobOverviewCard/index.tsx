import React, { useMemo } from "react";
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
        className: "border-2 rounded-lg p-4",
        borderColor: colorStyles.filterTagsBackgroundColor,
        gap: 3,
      }}
    >
      <Typography {...JOB_OVERVIEW_TEXT()} />
      <Stack
        stackProps={{
          className: "grid grid-cols-3",
          gap: 2,
          alignItems: "center",
          direction: "column",
        }}
      >
        {jobOverview.map((detail, index) => (
          <TextWithIcon
            key={index}
            icon={detail.icon}
            subTextProps={detail.subTextProps}
            textProps={detail.textProps}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default JobOverviewCard;
