import React from "react";
import { Avatar, Stack, Typography, Divider } from "../common";
import { colorStyles } from "@/styles";
import { getInitials } from "@/helper";
import { JOB_OPPPORTUNITY_PAGE_CONFIG } from "@/constants";
import { CommonObjectType } from "@/types";

interface LatestJobCardProps {
  job: CommonObjectType; // Replace with proper type
  index: number;
}

function LatestJobCard({ job, index }: LatestJobCardProps) {
  const {
    DESIGNATION,
    JOB_TYPE,
    SALARY_RANGE,
    JOB_COUNT,
    EMPLOYEE_COUNT,
    COMPANY_NAME,
    IMAGE,
    POSTED_DATE,
  } = JOB_OPPPORTUNITY_PAGE_CONFIG;
  return (
    <Stack
      key={index}
      stackProps={{
        direction: "column",
        width: "300px",
        height: "350px",
        gap: 2,
        className: "cursor-pointer rounded-lg p-4",
        sx: {
          background: colorStyles.latestJobCardBackground,
          transition: "background 0.4s ease-in-out",
          "&:hover": {
            background: `linear-gradient(to bottom, ${colorStyles.latestJobCardGradientBackgroundTop}, ${colorStyles.latestJobCardGradientBackgroundBottom})`,
            ".MuiTypography-root": { color: colorStyles.white },
            ".job-type": {
              backgroundColor: `${colorStyles.latestJobCardJobTypeAfterHover} !important`,
            },
            ".job-count": {
              color: `${colorStyles.black} !important`,
            },
          },
        },
      }}
    >
      <Stack stackProps={{ gap: 3 }}>
        <Typography {...DESIGNATION(job)} />
        <div
          className="job-type pl-2 p-1 h-7 w-20 rounded-3xl"
          style={{
            background: colorStyles.latestJobCardJobTypeBeforeHover,
          }}
        >
          <Typography {...JOB_TYPE(job)} />
        </div>
        <Typography {...SALARY_RANGE(job)} />
        <Stack
          stackProps={{
            className: "mt-10",
            direction: "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Divider
            sx={{
              backgroundColor: colorStyles.white,
              height: 1.5,
              width: "60%",
              display: "flex",
              alignItems: "center",
            }}
          />
          <Typography {...POSTED_DATE(job)} />
        </Stack>
        <Stack
          stackProps={{
            className: "mt-8",
            direction: "row",
            gap: 2,
          }}
        >
          <Avatar {...IMAGE(job).avatarProps}>
            {getInitials({ name: String(job?.companyName || "") })}
          </Avatar>
          <Stack>
            <Typography {...COMPANY_NAME(job)} />
            <Typography {...EMPLOYEE_COUNT(job)} />
          </Stack>
          <Stack
            stackProps={{
              className: "h-7 w-16 pl-2 p-1 rounded-3xl",
              sx: {
                backgroundColor: colorStyles.white,
              },
            }}
          >
            <Typography {...JOB_COUNT(job)} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default LatestJobCard;
