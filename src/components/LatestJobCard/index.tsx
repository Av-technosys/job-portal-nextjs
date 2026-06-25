import React from "react";
import { Avatar, Stack, Typography } from "../common";
import { colorStyles } from "@/styles";
import { getInitials } from "@/helper";
import { JOB_DETAILS_URL, JOB_OPPPORTUNITY_PAGE_CONFIG } from "@/constants";
import {
  CommonObjectType,
  TypographyFontColor,
  TypographyFontSize,
  TypographyVariantEnum,
} from "@/types";
import { useRouter } from "next/router";
import { AccessTimeOutlinedIcon, ArrowForwardOutlinedIcon } from "@/assets";

interface LatestJobCardProps {
  job: CommonObjectType; // Replace with proper type
  index: number;
}

const LATEST_JOB_CARD_WIDTH = "300px";

function LatestJobCard({ job, index }: LatestJobCardProps) {
  const router = useRouter();
  const {
    DESIGNATION,
    JOB_TYPE,
    SALARY_RANGE,
    JOB_COUNT,
    COMPANY_NAME,
    IMAGE,
    POSTED_DATE,
  } = JOB_OPPPORTUNITY_PAGE_CONFIG;

  const handleJobDetailsClick = () => {
    const jobId = job?.id || job?.job_id;

    if (jobId !== undefined) {
      router.push({
        pathname: JOB_DETAILS_URL,
        query: { id: jobId as number },
      });
    }
  };

  return (
    <Stack
      key={index}
      stackProps={{
        direction: "column",
        width: LATEST_JOB_CARD_WIDTH,
        minHeight: "300px",
        className: "group shrink-0 cursor-pointer rounded-lg p-5",
        onClick: handleJobDetailsClick,
        onKeyDown: (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleJobDetailsClick();
          }
        },
        role: "button",
        tabIndex: 0,
        sx: {
          position: "relative",
          overflow: "hidden",
          background: colorStyles.white,
          border: "1px solid #E6EAF2",
          boxShadow: "none",
          transition:
            "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background:
              "linear-gradient(90deg, #0A65CC 0%, #22C55E 100%)",
          },
          "&:hover": {
            transform: "translateY(-4px)",
            borderColor: colorStyles.cardHoverBorderColor,
            boxShadow: "none",
          },
          "&:focus-visible": {
            outline: "3px solid rgba(0, 122, 255, 0.22)",
            outlineOffset: 3,
          },
          "&:hover .card-arrow": {
            transform: "translateX(3px)",
          },
        },
      }}
    >
      <Stack
        stackProps={{
          className: "w-full h-full",
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        <Stack
          stackProps={{
            gap: 2,
          }}
        >
          <Stack
            stackProps={{
              direction: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Typography {...DESIGNATION(job)} />
            <div
              className="job-type rounded-3xl px-3 py-1"
              style={{
                background: "#EEF6FF",
                border: "1px solid #CFE3FF",
                flexShrink: 0,
              }}
            >
              <Typography {...JOB_TYPE(job)} />
            </div>
          </Stack>

          <Stack
            stackProps={{
              gap: 0.75,
            }}
          >
            <Typography
              typographyProps={{
                children: "Annual compensation",
                variant: TypographyVariantEnum.CAPTION,
                sx: { letterSpacing: 0 },
              }}
              fontSize={TypographyFontSize.extraSmall}
              fontColor={TypographyFontColor.black5}
            />
            <Typography {...SALARY_RANGE(job)} />
          </Stack>
        </Stack>

        <Stack
          stackProps={{
            direction: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <AccessTimeOutlinedIcon sx={{ color: "#667085", fontSize: 18 }} />
          <Typography {...POSTED_DATE(job)} />
        </Stack>

        <Stack
          stackProps={{
            className: "pt-4",
            direction: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1.5,
            sx: {
              borderTop: "1px solid #EEF2F6",
            },
          }}
        >
          <Stack
            stackProps={{
              direction: "row",
              alignItems: "center",
              gap: 1.5,
              minWidth: 0,
            }}
          >
            <Avatar {...IMAGE(job).avatarProps}>
              {getInitials({
                name: String(job?.companyName || job?.company_name || ""),
              })}
            </Avatar>
            <Stack
              stackProps={{
                minWidth: 0,
              }}
            >
              <Typography {...COMPANY_NAME(job)} />
              <Typography {...JOB_COUNT(job)} />
            </Stack>
          </Stack>

          <Stack
            stackProps={{
              className: "card-arrow",
              alignItems: "center",
              justifyContent: "center",
              sx: {
                width: 34,
                height: 34,
                flexShrink: 0,
                borderRadius: "999px",
                color: "#0A65CC",
                backgroundColor: "#F0F7FF",
                transition: "transform 0.2s ease",
              },
            }}
          >
            <ArrowForwardOutlinedIcon sx={{ fontSize: 20 }} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default LatestJobCard;
