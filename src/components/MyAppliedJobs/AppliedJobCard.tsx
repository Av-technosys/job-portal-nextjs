import { CommonObjectType } from "@/types";
import {
  Avatar,
  Button,
  IconButton,
  Modal,
  Stack,
  Typography,
  When,
} from "../common";
import { APPLIED_JOB_PAGE_CONFIG } from "@/constants";
import Messaging from "../Messaging";
import { getInitials } from "@/helper";
import { colorStyles } from "@/styles";
import { useState } from "react";
import { CancelOutlinedIcon } from "@/assets";
import JobDetail from "../JobDetail";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

// Maps application_status numbers to { label, bg, color }
const STATUS_STYLE: Record<number, { label: string; bg: string; color: string }> = {
  0: { label: "Submitted",  bg: "#f1f2f4",    color: "#767f8c" },
  1: { label: "Received",   bg: "#e8f4ff",    color: "#007aff" },
  2: { label: "In Review",  bg: "#fff4e1",    color: "#b45309" },
  3: { label: "Shortlisted",bg: "#e6fae6",    color: "#15803d" },
  4: { label: "Interviewed",bg: "#ede9fe",    color: "#7c3aed" },
  5: { label: "Rejected",   bg: "#fde8e8",    color: "#e05151" },
  6: { label: "On Hold",    bg: "#f1f2f4",    color: "#767f8c" },
  7: { label: "Offered",    bg: "#e6fae6",    color: "#15803d" },
  8: { label: "Hired",      bg: "#e6fae6",    color: "#15803d" },
};

export default function AppliedJobCard({ job }: { job: CommonObjectType }) {
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const { APPLIED_JOB_CARD } = APPLIED_JOB_PAGE_CONFIG;
  const { IMAGE, VIEW_DETAILS_BUTTON } = APPLIED_JOB_CARD;

  // Extract raw values directly from job object
  const title: string =
    (job?.title as string) || (job?.role as string) || "";
  const companyName: string = (job?.company_name as string) || "";
  const jobType: string = (job?.job_type as string) || "";
  const appliedDate: string = (() => {
    const raw = job?.created_date?.toString() ?? "";
    if (!raw) return "";
    const d = new Date(raw);
    return isNaN(d.getTime())
      ? raw
      : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  })();

  const statusCode = Number(job?.application_status ?? 0);
  const statusInfo = STATUS_STYLE[statusCode] ?? STATUS_STYLE[0];
  const statusLabel =
    String(job?.application_status_label || "") || statusInfo.label;

  // Left accent matches status color
  const accentColor = statusInfo.color;

  function getJobDetailsId() {
    const nestedJob =
      typeof job?.job === "object" && job.job !== null
        ? (job.job as CommonObjectType)
        : {};
    const nestedJobDetails =
      typeof job?.job_details === "object" && job.job_details !== null
        ? (job.job_details as CommonObjectType)
        : {};
    return (
      job?.job_id ||
      nestedJob?.id ||
      nestedJob?.job_id ||
      nestedJobDetails?.id ||
      nestedJobDetails?.job_id ||
      job?.id
    );
  }

  function handleViewDetailsClick() {
    const id = Number(getJobDetailsId());
    if (!isNaN(id)) setSelectedJobId(id);
  }

  return (
    <>
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
        {/* ── Top Row: Avatar · Info ── */}
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

            {/* Job Type chip + Status badge */}
            <Stack
              stackProps={{
                direction: "row",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 0.75,
                sx: { mt: 0.75 },
              }}
            >
              {jobType && (
                <Stack
                  stackProps={{
                    direction: "row",
                    alignItems: "center",
                    gap: 0.5,
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
                </Stack>
              )}

              {/* Application status badge */}
              <Stack
                stackProps={{
                  sx: {
                    bgcolor: statusInfo.bg,
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
                      color: statusInfo.color,
                      whiteSpace: "nowrap",
                    },
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
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

        {/* ── Meta Row: Applied date + messaging ── */}
        <Stack
          stackProps={{
            direction: "row",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
            sx: { minWidth: 0, width: "100%" },
          }}
        >
          {/* Applied date */}
          {appliedDate && (
            <Stack
              stackProps={{
                direction: "row",
                alignItems: "center",
                gap: 0.5,
                sx: {
                  bgcolor: colorStyles.appliedJobsBackgroundColor,
                  px: 1,
                  py: 0.4,
                  borderRadius: "6px",
                  flexShrink: 0,
                },
              }}
            >
              <AccessTimeOutlinedIcon
                sx={{ fontSize: 12, color: colorStyles.filterTagsTextColor, flexShrink: 0 }}
              />
              <Typography
                typographyProps={{
                  children: `Applied ${appliedDate}`,
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

          {/* Messaging icon — only when applicable */}
          <When condition={job?.user === 28}>
            <Messaging applicationId={job?.applicationId as number} />
          </When>
        </Stack>

        {/* ── View Details Button ── */}
        <Stack stackProps={{ sx: { mt: 1.5 } }}>
          <Button
            {...VIEW_DETAILS_BUTTON}
            buttonProps={{
              ...VIEW_DETAILS_BUTTON.buttonProps,
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
            onClick={handleViewDetailsClick}
          />
        </Stack>
      </Stack>

      {/* ── Job Detail Modal ── */}
      <Modal open={selectedJobId !== null} onClose={() => setSelectedJobId(null)}>
        <Stack
          stackProps={{
            sx: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: { xs: 2, md: 4 },
              width: { xs: "92%", md: "80%" },
              maxHeight: "85vh",
              overflow: "auto",
              borderRadius: "12px",
            },
          }}
        >
          <Stack stackProps={{ alignItems: "end" }}>
            <IconButton onClick={() => setSelectedJobId(null)}>
              <CancelOutlinedIcon sx={{ color: colorStyles.filterTagsTextColor }} />
            </IconButton>
          </Stack>
          {selectedJobId !== null && (
            <JobDetail jobId={selectedJobId} hideApplyButton />
          )}
        </Stack>
      </Modal>
    </>
  );
}
