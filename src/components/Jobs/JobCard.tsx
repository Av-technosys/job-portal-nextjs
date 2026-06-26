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
          "my-3 p-5 sm:p-6 shadow-sm rounded-2xl border bg-white capitalize transition-all duration-300",
        direction: "column",
        justifyContent: "space-between",
        alignItems: "center",
        sx: {
          borderColor: colorStyles.cardBorderColor,
          "&:hover": {
            borderColor: "transparent",
            boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
            transform: "translateY(-3px)",
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
              className: "rounded-full px-3 py-1 text-sm font-medium",
              bgcolor: "#E7F0FF",
              color: "#0B63CE",
            }}
          >
            <Typography {...TIME_STAMP(job)} typographyProps={{ ...TIME_STAMP(job).typographyProps, sx: { fontSize: 13, fontWeight: 600 } }} />
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
                  color: "#687589",
                  "&:hover": { color: "#172033" }
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
                  color: "#0B63CE"
                }}
              />
            </When>
          </When>
        </Stack>

        {/* Company & Job Info */}
        <Stack
          stackProps={{
            className: "mt-5",
            direction: "row",
            gap: 2.5,
            alignItems: "center",
            width: "100%",
          }}
        >
          <Stack
            stackProps={{
              className: "border rounded-full shadow-sm p-0.5 bg-white",
            }}
          >
            <Avatar {...IMAGE(job).avatarProps}>
              {getInitials({ name: String(job?.company_name || "") })}
            </Avatar>
          </Stack>

          <Stack stackProps={{ width: "100%", gap: 0.5 }}>
            <Typography {...DESIGNATION(job)} typographyProps={{ ...DESIGNATION(job).typographyProps, sx: { fontWeight: 700, fontSize: 18, color: "#172033" } }} />
            <Typography {...COMPANY_NAME(job)} typographyProps={{ ...COMPANY_NAME(job).typographyProps, sx: { color: "#566276", fontWeight: 500 } }} />
            <Typography {...EXPERIENCE_TIME(job)} typographyProps={{ ...EXPERIENCE_TIME(job).typographyProps, sx: { color: "#687589", fontSize: 14 } }} />
          </Stack>
        </Stack>

        {/* Footer Actions */}
        <Stack
          stackProps={{
            className: "mt-6",
            direction: { xs: "column", sm: "row" },
            gap: { xs: 3, sm: 2 },
            alignItems: { xs: "flex-start", sm: "flex-end" },
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Stack
            stackProps={{
              direction: "row",
              gap: 2,
              flexWrap: "wrap",
              width: { xs: "100%", sm: "auto" }
            }}
          >
            {jobDetails.map((detail, index) => (
              <Stack key={`jobDetails-${index}`} stackProps={{ direction: "row", gap: 1, alignItems: "center" }}>
                <Stack stackProps={{ sx: { "& svg": { fontSize: 20 } } }}>
                  {detail.icon}
                </Stack>
                <Typography {...detail.textProps} typographyProps={{ ...detail.textProps?.typographyProps, sx: { color: "#566276", fontSize: 14, fontWeight: 500 } }} />
              </Stack>
            ))}
          </Stack>

          {/* Apply Button */}
          <Stack stackProps={{ width: { xs: "100%", sm: "auto" } }}>
            <Button
              {...APPLY_BUTTON}
              buttonProps={{
                ...APPLY_BUTTON.buttonProps,
                sx: { width: { xs: "100%", sm: "auto" }, minWidth: 120 }
              }}
              onClick={() => handleJobDetailsClick(job)}
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}