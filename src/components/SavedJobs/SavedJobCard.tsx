import React from "react";
import { CommonObjectType, JobStatusEnum } from "@/types";
import { Button, Stack, Typography, Avatar, When } from "../common";
import { SAVED_JOB_PAGE_COFIG } from "@/constants";
import {
  FmdGoodOutlinedIcon,
  CurrencyRupeeIcon,
  TurnedInIcon,
  EventIcon,
} from "@/assets";
import { colorStyles } from "@/styles";
import { getInitials } from "@/helper";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

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
  const { APPLY_BUTTON, IMAGE } = JOB_SAVE_CARD;

  const title: string = (job?.title as string) || (job?.role as string) || "";
  const companyName: string = (job?.company_name as string) || "";
  const jobType: string = (job?.job_type as string) || "";
  const salary: string = (job?.salary as string) || "";
  const location: string = (job?.location as string) || "";
  const daysRemaining = job?.days_remaining as number | undefined;
  const isExpired = job?.status === JobStatusEnum.EXPIRED;
  const isApplied = Boolean(job?.is_applied);

  // Accent color based on job status
  const accentColor = isExpired
    ? colorStyles.errorColor
    : isApplied
    ? colorStyles.green
    : colorStyles.filterTagsTextColor;

  const statusLabel = isExpired ? "Expired" : isApplied ? "Applied" : null;

  return (
    <Stack
      stackProps={{
        sx: {
          border: `1px solid ${colorStyles.borderGreyColor}`,
          borderLeft: `3px solid ${accentColor}`,
          borderRadius: "12px",
          p: { xs: 2, md: 2.5 },
          mb: 1.5,
          bgcolor: colorStyles.white,
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box",
          overflow: "hidden",
          boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
          transition: "box-shadow 0.2s, border-color 0.2s, transform 0.15s",
          "&:hover": {
            boxShadow: "0 6px 20px rgba(0,0,0,0.10)",
            transform: "translateY(-1px)",
          },
        },
      }}
    >
      {/* ── Top Row: Avatar · Info · Bookmark ── */}
      <Stack
        stackProps={{
          direction: "row",
          alignItems: "flex-start",
          gap: 1.5,
          sx: { width: "100%", minWidth: 0, overflow: "hidden" },
        }}
      >
        {/* Company Logo */}
        <Avatar
          {...IMAGE(job).avatarProps}
          sx={{
            width: { xs: 48, md: 54 },
            height: { xs: 48, md: 54 },
            borderRadius: "10px",
            flexShrink: 0,
            border: `1px solid ${colorStyles.borderGreyColor}`,
            bgcolor: colorStyles.lightBlue,
            fontSize: 16,
            fontWeight: 700,
            color: colorStyles.filterTagsTextColor,
          }}
        >
          {getInitials({ name: companyName })}
        </Avatar>

        {/* Text Info */}
        <Stack
          stackProps={{
            sx: { flex: 1, minWidth: 0, overflow: "hidden" },
          }}
        >
          {/* Job Title */}
          <Typography
            typographyProps={{
              children: title,
              sx: {
                fontWeight: 700,
                fontSize: { xs: 15, md: 17 },
                lineHeight: 1.35,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                color: "#18191c",
              },
            }}
          />

          {/* Company Name */}
          {companyName && (
            <Typography
              typographyProps={{
                children: companyName,
                sx: {
                  fontSize: 13,
                  color: colorStyles.listTitleTextColor,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  mt: 0.25,
                },
              }}
            />
          )}

          {/* Job Type Chip */}
          {jobType && (
            <Stack
              stackProps={{
                direction: "row",
                alignItems: "center",
                gap: 0.5,
                sx: { mt: 0.75 },
              }}
            >
              <WorkOutlineIcon
                sx={{ fontSize: 12, color: colorStyles.filterTagsTextColor }}
              />
              <Stack
                stackProps={{
                  sx: {
                    bgcolor: colorStyles.filterTagsBackgroundColor,
                    px: 1,
                    py: 0.2,
                    borderRadius: 99,
                    display: "inline-flex",
                    flexShrink: 0,
                  },
                }}
              >
                <Typography
                  typographyProps={{
                    children: jobType,
                    sx: {
                      fontSize: 12,
                      fontWeight: 700,
                      color: colorStyles.filterTagsTextColor,
                      whiteSpace: "nowrap",
                      textTransform: "capitalize",
                    },
                  }}
                />
              </Stack>

              {/* Status badge */}
              {statusLabel && (
                <Stack
                  stackProps={{
                    sx: {
                      bgcolor: `${accentColor}18`,
                      px: 1,
                      py: 0.2,
                      borderRadius: 99,
                      flexShrink: 0,
                    },
                  }}
                >
                  <Typography
                    typographyProps={{
                      children: statusLabel,
                      sx: {
                        fontSize: 12,
                        fontWeight: 700,
                        color: accentColor,
                        whiteSpace: "nowrap",
                      },
                    }}
                  />
                </Stack>
              )}
            </Stack>
          )}
        </Stack>

        {/* Bookmark Icon */}
        <When condition={job?.id !== undefined}>
          <Stack
            stackProps={{
              alignItems: "center",
              justifyContent: "center",
              sx: {
                width: 32,
                height: 32,
                borderRadius: "8px",
                cursor: "pointer",
                flexShrink: 0,
                bgcolor: `${colorStyles.filterTagsTextColor}12`,
                transition: "background 0.15s",
                "&:hover": {
                  bgcolor: `${colorStyles.filterTagsTextColor}25`,
                },
              },
            }}
          >
            <TurnedInIcon
              onClick={() => handleUnSaveClick(job)}
              sx={{
                fontSize: 18,
                color: colorStyles.filterTagsTextColor,
              }}
            />
          </Stack>
        </When>
      </Stack>

      {/* ── Divider ── */}
      <Stack
        stackProps={{
          sx: {
            height: "1px",
            bgcolor: colorStyles.borderGreyColor,
            my: 1.5,
            mx: -0.5,
          },
        }}
      />

      {/* ── Meta Info: Location · Salary · Days ── */}
      <Stack
        stackProps={{
          direction: "row",
          flexWrap: "wrap",
          gap: { xs: 1, md: 1.5 },
          sx: { minWidth: 0, width: "100%" },
        }}
      >
        {location && (
          <Stack
            stackProps={{
              direction: "row",
              alignItems: "center",
              gap: 0.5,
              sx: {
                bgcolor: colorStyles.listTitleBackgroundColor,
                px: 1,
                py: 0.4,
                borderRadius: "6px",
                minWidth: 0,
                maxWidth: "60%",
                overflow: "hidden",
              },
            }}
          >
            <FmdGoodOutlinedIcon
              sx={{ fontSize: 12, color: colorStyles.listTitleTextColor, flexShrink: 0 }}
            />
            <Typography
              typographyProps={{
                children: location,
                sx: {
                  fontSize: 12,
                  color: colorStyles.listTitleTextColor,
                  fontWeight: 500,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  minWidth: 0,
                },
              }}
            />
          </Stack>
        )}

        {salary && (
          <Stack
            stackProps={{
              direction: "row",
              alignItems: "center",
              gap: 0.4,
              sx: {
                bgcolor: colorStyles.savedJobsBackgroundColor,
                px: 1,
                py: 0.4,
                borderRadius: "6px",
                flexShrink: 0,
              },
            }}
          >
            <CurrencyRupeeIcon
              sx={{ fontSize: 12, color: "#b45309", flexShrink: 0 }}
            />
            <Typography
              typographyProps={{
                children: salary,
                sx: {
                  fontSize: 12,
                  color: "#b45309",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                },
              }}
            />
          </Stack>
        )}

        {!isExpired && daysRemaining !== undefined && (
          <Stack
            stackProps={{
              direction: "row",
              alignItems: "center",
              gap: 0.4,
              sx: {
                bgcolor: colorStyles.jobAlertsBackgroundColor,
                px: 1,
                py: 0.4,
                borderRadius: "6px",
                flexShrink: 0,
              },
            }}
          >
            <EventIcon
              sx={{ fontSize: 12, color: "#15803d", flexShrink: 0 }}
            />
            <Typography
              typographyProps={{
                children: `${daysRemaining} day${daysRemaining === 1 ? "" : "s"} left`,
                sx: {
                  fontSize: 12,
                  color: "#15803d",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                },
              }}
            />
          </Stack>
        )}
      </Stack>

      {/* ── Apply Button ── */}
      <Stack stackProps={{ sx: { mt: 1.5 } }}>
        <Button
          {...APPLY_BUTTON(job)}
          onClick={() => handleApplyClick(job)}
          buttonProps={{
            ...APPLY_BUTTON(job).buttonProps,
            fullWidth: true,
            sx: {
              height: 42,
              borderRadius: "8px",
              fontSize: 14,
              fontWeight: 600,
              textTransform: "none",
              letterSpacing: 0,
            },
          }}
        />
      </Stack>
    </Stack>
  );
}
