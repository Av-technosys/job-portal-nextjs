import React, { useMemo } from "react";
import { CommonObjectType, JobStatusEnum } from "@/types";
import {
  Button,
  Stack,
  Typography,
  Avatar,
  TextWithIcon,
  When,
  Divider,
} from "../common";
import { SAVED_JOB_PAGE_COFIG } from "@/constants";
import {
  FmdGoodOutlinedIcon,
  CurrencyRupeeIcon,
  TurnedInIcon,
  EventIcon,
} from "@/assets";
import { colorStyles } from "@/styles";
import { getInitials } from "@/helper";

export default function SavedJobCard({
  job,
  handleApplyClick,
  handleUnSaveClick,
}: {
  job: CommonObjectType;
  handleApplyClick: (job: CommonObjectType) => void;
  handleUnSaveClick: (job: CommonObjectType) => void;
}) {
  const { JOB_SAVE_CARD } = SAVED_JOB_PAGE_COFIG;
  const {
    DESIGNATION,
    APPLY_BUTTON,
    JOB_TYPE,
    SALARY_RANGE,
    LOCATION,
    EXPIRY,
    IMAGE,
  } = JOB_SAVE_CARD;

  const jobDetails = useMemo(() => {
    return [
      {
        icon: (
          <FmdGoodOutlinedIcon
            sx={{ color: colorStyles.listTitleTextColor, fontSize: "medium" }}
          />
        ),
        textProps: LOCATION(job) || { typographyProps: { children: "N/A" } },
      },
      {
        icon: (
          <CurrencyRupeeIcon
            sx={{ color: colorStyles.listTitleTextColor, fontSize: "medium" }}
          />
        ),
        textProps: SALARY_RANGE(job) || {
          typographyProps: { children: "N/A" },
        },
      },
      {
        ...(job?.status !== JobStatusEnum.EXPIRED && {
          icon: (
            <EventIcon
              sx={{ color: colorStyles.listTitleTextColor, fontSize: "medium" }}
            />
          ),
          textProps: EXPIRY(job) || { typographyProps: { children: "N/A" } },
        }),
      },
    ];
  }, [LOCATION, SALARY_RANGE, EXPIRY, job]);

  return (
    <>
      <Stack
        stackProps={{
          className:
            " mt-5 my-1  p-1 border border-white  rounded-lg  hover:border mb-3 capitalize",
          direction: "row",
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
            direction: "row",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Stack
            stackProps={{
              className: "border rounded-lg",
            }}
          >
            <Avatar {...IMAGE(job).avatarProps}>
              {getInitials({ name: String(job?.company_name || "") })}
            </Avatar>
          </Stack>
          <Stack
            stackProps={{
              direction: "column",
              gap: 2,
            }}
          >
            <Stack
              stackProps={{
                direction: "row",
                gap: 1,
              }}
            >
              <Typography {...DESIGNATION(job)} />
              <Stack
                stackProps={{
                  className: "rounded-lg px-2 ",
                  bgcolor: colorStyles.filterTagsBackgroundColor,
                  color: colorStyles.filterTagsTextColor,
                }}
              >
                <Typography {...JOB_TYPE(job)} />
              </Stack>
            </Stack>
            <Stack
              stackProps={{
                direction: "row",
                gap: 3,
              }}
            >
              {jobDetails.map((detail, index) => (
                <TextWithIcon
                  key={`jobDeatils-${index}`}
                  icon={detail.icon}
                  textProps={detail.textProps}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>
        <Stack
          stackProps={{
            className: "mr-7",
            direction: "row",
            gap: 3,
            alignItems: "center",
          }}
        >
          <When condition={job?.id !== undefined}>
            <TurnedInIcon
              onClick={() => {
                handleUnSaveClick(job);
              }}
              sx={{
                cursor: "pointer",
              }}
            />
          </When>
          <Button
            {...APPLY_BUTTON(job)}
            onClick={() => handleApplyClick(job)}
          />
        </Stack>
      </Stack>
      <Divider />
    </>
  );
}
