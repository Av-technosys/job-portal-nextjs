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
        width: "300px",
        minHeight: "300px",
        className: "group cursor-pointer rounded-2xl p-6",
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
          border: "1px solid #E2E8F0",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02)",
          transition:
            "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background:
              "linear-gradient(90deg, #2563EB 0%, #4F46E5 50%, #10B981 100%)",
            transition: "opacity 0.3s ease",
          },
          "&:hover": {
            transform: "translateY(-6px)",
            borderColor: "#818CF8",
            boxShadow: "0 20px 25px -5px rgba(79, 70, 229, 0.1), 0 10px 10px -5px rgba(79, 70, 229, 0.04)",
          },
          "&:focus-visible": {
            outline: "3px solid rgba(79, 70, 229, 0.3)",
            outlineOffset: 3,
          },
          "&:hover .card-arrow": {
            transform: "translateX(4px) scale(1.08)",
            backgroundColor: "#4F46E5",
            color: "#FFFFFF",
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
              className="job-type rounded-full px-3 py-1 font-medium shadow-sm"
              style={{
                background: "#EEF2FF",
                border: "1px solid #C7D2FE",
                color: "#4338CA",
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
              className: "card-arrow shadow-sm",
              alignItems: "center",
              justifyContent: "center",
              sx: {
                width: 36,
                height: 36,
                flexShrink: 0,
                borderRadius: "999px",
                color: "#4F46E5",
                backgroundColor: "#EEF2FF",
                border: "1px solid #E0E7FF",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
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
