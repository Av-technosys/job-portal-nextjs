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
    EXPERIENCE_TIME,
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
        textProps: DEPARTMENT(job),
      },
      {
        icon: (
          <AccessTimeOutlinedIcon
            sx={{ color: colorStyles.filterTagsTextColor }}
          />
        ),
        textProps: JOB_TYPE(job),
      },
      {
        icon: (
          <AccountBalanceWalletOutlinedIcon
            sx={{ color: colorStyles.filterTagsTextColor }}
          />
        ),
        textProps: SALARY_RANGE(job),
      },
      {
        icon: (
          <FmdGoodOutlinedIcon
            sx={{ color: colorStyles.filterTagsTextColor }}
          />
        ),
        textProps: LOCATION(job),
      },
    ];
  }, [DEPARTMENT, JOB_TYPE, LOCATION, SALARY_RANGE, job]);

  return (
    <Stack
      stackProps={{
        className:
          "my-3 py-6 px-6 shadow-md rounded-2xl border bg-white capitalize transition-all duration-300 group hover:shadow-2xl hover:-translate-y-1.5",
        direction: "column",
        justifyContent: "space-between",
        alignItems: "center",
        sx: {
          borderColor: "#E2E8F0",
          "&:hover": {
            borderColor: "#818CF8",
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
        {/* Card Header */}
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
            <When condition={!(job?.is_saved as boolean)}>
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

        {/* Company & Job Info */}
        <Stack
          stackProps={{
            className: "mt-3",
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
            <Typography {...EXPERIENCE_TIME(job)} />
          </Stack>
        </Stack>

        {/* Footer Actions */}
        <Stack
          stackProps={{
            className: "mt-3",
            direction: "row",
            gap: 2,
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          <Stack
            stackProps={{
              direction: "row",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            {jobDetails.map((detail, index) => (
              <div
                key={`jobDetails-${index}`}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-slate-700 font-medium text-xs shadow-2xs group-hover:bg-indigo-50/50 group-hover:border-indigo-200/60 transition-colors"
              >
                <TextWithIcon
                  icon={detail.icon}
                  textProps={detail.textProps}
                />
              </div>
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