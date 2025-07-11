import React, { useMemo } from "react";
import { CommonObjectType } from "@/types";
import {
  Button,
  Stack,
  Typography,
  Avatar,
  TextWithIcon,
  When,
} from "../common";
import { LIST_JOB_PAGE_CONFIG } from "@/constants";
import {
  BusinessCenterOutlinedIcon,
  AccessTimeOutlinedIcon,
  FmdGoodOutlinedIcon,
  AccountBalanceWalletOutlinedIcon,
  BookmarkBorderIcon,
  TurnedInIcon,
} from "@/assets";
import { colorStyles } from "@/styles";
import { getInitials } from "@/helper";

export default function JobCard({
  job,
  handleSaveUnSave,
  showSaveUnSaveButton,
  handleJobDetailsClick,
}: {
  job: CommonObjectType;
  handleSaveUnSave: (job: CommonObjectType) => void;
  showSaveUnSaveButton: boolean;
  handleJobDetailsClick: (job: CommonObjectType) => void;
}) {
  const { JOB_LIST_CARD } = LIST_JOB_PAGE_CONFIG;
  const {
    DESIGNATION,
    COMPANY_NAME,
    APPLY_BUTTON,
    DEPARTMENT,
    JOB_TYPE,
    SALARY_RANGE,
    LOCATION,
    IMAGE,
    TIME_STAMP,
  } = JOB_LIST_CARD;

  const jobDetails = useMemo(() => {
    return [
      {
        icon: (
          <BusinessCenterOutlinedIcon
            sx={{ color: colorStyles.filterTagsTextColor }}
          />
        ),
        textProps: DEPARTMENT(job) || { children: "N/A" },
      },
      {
        icon: (
          <AccessTimeOutlinedIcon
            sx={{ color: colorStyles.filterTagsTextColor }}
          />
        ),
        textProps: JOB_TYPE(job) || { children: "N/A" },
      },
      {
        icon: (
          <AccountBalanceWalletOutlinedIcon
            sx={{ color: colorStyles.filterTagsTextColor }}
          />
        ),
        textProps: SALARY_RANGE(job) || { children: "N/A" },
      },
      {
        icon: (
          <FmdGoodOutlinedIcon
            sx={{ color: colorStyles.filterTagsTextColor }}
          />
        ),
        textProps: LOCATION(job) || { children: "N/A" },
      },
    ];
  }, [DEPARTMENT, JOB_TYPE, LOCATION, SALARY_RANGE, job]);

  return (
    <Stack
      stackProps={{
        className:
          " my-2 py-11 px-10 shadow-lg p-4 rounded-lg border hover:border capitalize",
        direction: "column",
        justifyContent: "space-between",
        alignItems: "center",
        sx: {
          borderColor: colorStyles.cardBorderColor,
          "&:hover": {
            borderColor: colorStyles.cardHoverBorderColor,
          },
        },
      }}
    >
      <Stack
        stackProps={{
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Stack
          stackProps={{
            direction: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Stack
            stackProps={{
              className: "rounded-lg p-1",
              bgcolor: colorStyles.filterTagsBackgroundColor,
              color: colorStyles.filterTagsTextColor,
            }}
          >
            <Typography {...TIME_STAMP(job)} />
          </Stack>

          {/* Save or Unsave Job */}
          <When condition={job?.id !== undefined && showSaveUnSaveButton}>
            <When condition={!job?.is_saved as boolean}>
              <BookmarkBorderIcon
                onClick={() => {
                  handleSaveUnSave(job);
                }}
                sx={{
                  cursor: "pointer",
                }}
              />
            </When>
            <When condition={job?.is_saved as boolean}>
              <TurnedInIcon
                onClick={() => {
                  handleSaveUnSave(job);
                }}
                sx={{
                  cursor: "pointer",
                }}
              />
            </When>
          </When>
        </Stack>

        <Stack
          stackProps={{
            className: "mt-6 ",
            direction: "row",
            gap: 1,
            alignItems: "center",
            width: "100%",
          }}
        >
          <Stack
            stackProps={{
              className: "border rounded-full",
            }}
          >
            <Avatar {...IMAGE(job).avatarProps}>
              {getInitials({ name: String(job?.company_name || "") })}
            </Avatar>
          </Stack>
          <Stack
            stackProps={{
              width: "100%",
            }}
          >
            <Typography {...DESIGNATION(job)} />
            <Typography {...COMPANY_NAME(job)} />
          </Stack>
        </Stack>

        <Stack
          stackProps={{
            className: "mt-6",
            direction: "row",
            gap: 3,
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          <Stack
            stackProps={{
              direction: "row",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            {jobDetails.map((detail, index) => (
              <TextWithIcon
                key={`jobDetails-${index}`}
                icon={detail.icon}
                textProps={detail.textProps}
              />
            ))}
          </Stack>

          {/* Apply Button */}
          <Stack
            stackProps={{
              marginTop: -1,
            }}
          >
            <Button
              {...APPLY_BUTTON}
              onClick={() => handleJobDetailsClick(job)}
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
