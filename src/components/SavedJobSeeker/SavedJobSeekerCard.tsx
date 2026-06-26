import React from "react";
import { CommonObjectType } from "@/types";
import { colorStyles } from "@/styles";
import { getInitials } from "@/helper";
import { SAVED_JOB_SEEKER_PAGE_COFIG } from "@/constants";
import {
  FmdGoodOutlinedIcon,
  TurnedInIcon,
  AccessTimeOutlinedIcon,
} from "@/assets";
import { Avatar, Button, Stack, Typography } from "../common";

export default function SavedJobSeekerCard({
  job,
}: {
  job: CommonObjectType;
}) {
  const { SAVE_JOBSEEKER_CARD } = SAVED_JOB_SEEKER_PAGE_COFIG;
  const { DESIGNATION, DEPARTMENT, APPLY_BUTTON, JOB_TYPE, LOCATION, EXPERIENCE_LEVEL, IMAGE } =
    SAVE_JOBSEEKER_CARD;

  const title = DESIGNATION(job).typographyProps?.children as string;
  const department = DEPARTMENT(job).typographyProps?.children as string;
  const jobType = JOB_TYPE(job).typographyProps?.children as string;
  const location = LOCATION(job).typographyProps?.children as string;
  const timeStamp = EXPERIENCE_LEVEL(job).typographyProps?.children as string;

  return (
    <Stack
      stackProps={{
        sx: {
          mt: 2,
          border: `1px solid ${colorStyles.cardBorderColor}`,
          borderRadius: "12px",
          p: { xs: 1.5, md: 2.5 },
          bgcolor: "white",
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box",
          overflow: "hidden",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          transition: "box-shadow 0.2s, border-color 0.2s",
          "&:hover": {
            borderColor: colorStyles.filterTagsTextColor,
            boxShadow: "0 4px 12px rgba(0,0,0,0.09)",
          },
        },
      }}
    >
      {/* ── Row 1: Avatar  ·  Text block  ·  Bookmark ── */}
      <Stack
        stackProps={{
          direction: "row",
          alignItems: "flex-start",
          gap: 1.5,
          sx: { width: "100%", minWidth: 0, overflow: "hidden" },
        }}
      >
        {/* Avatar – fixed size, never shrinks */}
        <Avatar
          {...IMAGE(job).avatarProps}
          sx={{
            width: { xs: 44, md: 52 },
            height: { xs: 44, md: 52 },
            borderRadius: "10px",
            flexShrink: 0,
            border: `1px solid ${colorStyles.cardBorderColor}`,
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          {getInitials({ name: String(job?.company_name || "") })}
        </Avatar>

        {/* Text block – must be minWidth:0 to allow truncation */}
        <Stack
          stackProps={{
            sx: { minWidth: 0, flex: 1, overflow: "hidden" },
          }}
        >
          {/* Title */}
          <Typography
            typographyProps={{
              children: title,
              noWrap: true,
              sx: {
                fontWeight: 700,
                fontSize: { xs: 14, md: 15 },
                lineHeight: 1.3,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "100%",
              },
            }}
          />

          {/* Department / Role */}
          {department && (
            <Typography
              typographyProps={{
                children: department,
                noWrap: true,
                sx: {
                  fontSize: 12,
                  color: "text.secondary",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  mt: 0.25,
                },
              }}
            />
          )}

          {/* Job type chip */}
          {jobType && (
            <Stack
              stackProps={{
                direction: "row",
                sx: { mt: 0.75 },
              }}
            >
              <Stack
                stackProps={{
                  sx: {
                    bgcolor: colorStyles.filterTagsBackgroundColor,
                    px: 1,
                    py: 0.25,
                    borderRadius: 99,
                    display: "inline-flex",
                    flexShrink: 0,
                    maxWidth: "100%",
                  },
                }}
              >
                <Typography
                  typographyProps={{
                    children: jobType,
                    noWrap: true,
                    sx: {
                      fontSize: 11,
                      fontWeight: 600,
                      color: colorStyles.filterTagsTextColor,
                    },
                  }}
                />
              </Stack>
            </Stack>
          )}
        </Stack>

        {/* Bookmark – fixed, never shrinks */}
        <TurnedInIcon
          sx={{
            color: colorStyles.filterTagsTextColor,
            cursor: "pointer",
            flexShrink: 0,
            fontSize: 20,
            mt: 0.25,
          }}
        />
      </Stack>

      {/* ── Row 2: Location & Timestamp meta ── */}
      <Stack
        stackProps={{
          direction: "row",
          flexWrap: "wrap",
          gap: { xs: 1, md: 1.5 },
          sx: {
            mt: 1.25,
            overflow: "hidden",
            width: "100%",
            minWidth: 0,
          },
        }}
      >
        {location && (
          <Stack
            stackProps={{
              direction: "row",
              alignItems: "center",
              gap: 0.5,
              sx: { minWidth: 0, maxWidth: "100%", overflow: "hidden" },
            }}
          >
            <FmdGoodOutlinedIcon
              sx={{ fontSize: 13, color: "text.secondary", flexShrink: 0 }}
            />
            <Typography
              typographyProps={{
                children: location,
                noWrap: true,
                sx: {
                  fontSize: 12,
                  color: "text.secondary",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  minWidth: 0,
                },
              }}
            />
          </Stack>
        )}

        {timeStamp && (
          <Stack
            stackProps={{
              direction: "row",
              alignItems: "center",
              gap: 0.5,
              sx: { flexShrink: 0 },
            }}
          >
            <AccessTimeOutlinedIcon
              sx={{
                fontSize: 13,
                color: colorStyles.filterTagsTextColor,
                flexShrink: 0,
              }}
            />
            <Typography
              typographyProps={{
                children: timeStamp,
                noWrap: true,
                sx: {
                  fontSize: 12,
                  color: colorStyles.filterTagsTextColor,
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                },
              }}
            />
          </Stack>
        )}
      </Stack>

      {/* ── Row 3: Full-width action button ── */}
      <Stack stackProps={{ sx: { mt: 1.5 } }}>
        <Button
          {...APPLY_BUTTON}
          buttonProps={{
            ...APPLY_BUTTON.buttonProps,
            fullWidth: true,
            sx: {
              height: 40,
              borderRadius: "8px",
              fontSize: 13,
              fontWeight: 600,
              textTransform: "none",
            },
          }}
        />
      </Stack>
    </Stack>
  );
}
