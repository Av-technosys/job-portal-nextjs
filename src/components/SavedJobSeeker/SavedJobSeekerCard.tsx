import React, { useMemo } from "react";
import { CommonObjectType } from "@/types";
import { Button, Stack, Typography, Avatar, TextWithIcon } from "../common";
import { SAVED_JOB_SEEKER_PAGE_COFIG } from "@/constants";
import { FmdGoodOutlinedIcon, TurnedInIcon, MoreVertIcon } from "@/assets";
import { colorStyles } from "@/styles";
import { getInitials } from "@/helper";

export default function SavedJobSeekerCard({ job }: { job: CommonObjectType }) {
  const { SAVE_JOBSEEKER_CARD } = SAVED_JOB_SEEKER_PAGE_COFIG;
  const {
    DESIGNATION,
    DEPARTMENT,
    APPLY_BUTTON,
    JOB_TYPE,
    LOCATION,
    IMAGE,
    APPLICATION_STATUS,
    EXPERIENCE_LEVEL,
  } = SAVE_JOBSEEKER_CARD;

  const jobSeekerDetails = useMemo(() => {
    return [
      {
        icon: <FmdGoodOutlinedIcon />,
        textProps: LOCATION(job) || { children: "N/A" },
      },
      {
        textProps: EXPERIENCE_LEVEL(job) || {
          children: "N/A",
        },
      },
    ];
  }, [LOCATION, EXPERIENCE_LEVEL, job]);

  return (
    <Stack
      stackProps={{
        className: " mt-5 border p-4 rounded-lg capitalize",
        direction: "row",
        justifyContent: "space-between",
        alignItems: "center",
        sx: {
          "&:hover": {
            borderColor: colorStyles.filterTagsTextColor,
          },
        },
      }}
    >
      <Stack
        stackProps={{
          direction: "row",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Avatar {...IMAGE(job).avatarProps}>
          {getInitials({ name: String(job?.company_name || "") })}
        </Avatar>

        <Stack
          stackProps={{
            direction: "column",
          }}
        >
          <Stack
            stackProps={{
              direction: "row",
            }}
          >
            <Typography {...DESIGNATION(job)} />

            <Stack
              stackProps={{
                className: "rounded-lg px-2 m-2",
                bgcolor: colorStyles.filterTagsBackgroundColor,
                color: colorStyles.filterTagsTextColor,
              }}
            >
              <Typography {...JOB_TYPE(job)} />
            </Stack>
          </Stack>
          <Stack>
            <Typography {...DEPARTMENT(job)} />
          </Stack>
          <Stack
            stackProps={{
              direction: "row",
              gap: 3,
              marginTop: 3,
            }}
          >
            {jobSeekerDetails.map((detail, index) => (
              <TextWithIcon
                key={`jobSeekerDetails-${index}`}
                icon={detail.icon}
                textProps={detail.textProps}
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
      <Typography {...APPLICATION_STATUS(job)} />
      <Stack
        stackProps={{
          className: "mr-2.5",
          direction: "row",
          gap: 3,
          alignItems: "center",
        }}
      >
        <TurnedInIcon />
        <Button {...APPLY_BUTTON} />
        <MoreVertIcon />
      </Stack>
    </Stack>
  );
}
