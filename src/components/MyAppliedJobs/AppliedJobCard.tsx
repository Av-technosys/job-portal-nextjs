import { CommonObjectType } from "@/types";
import {
  Avatar,
  Button,
  Divider,
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

export default function AppliedJobCard({ job }: { job: CommonObjectType }) {
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const { APPLIED_JOB_CARD } = APPLIED_JOB_PAGE_CONFIG;
  const {
    DESIGNATION,
    IMAGE,
    JOB_TYPE,
    TIME_STAMP,
    VIEW_DETAILS_BUTTON,
  } = APPLIED_JOB_CARD;

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
    const jobDetailsId = getJobDetailsId();
    const parsedJobDetailsId = Number(jobDetailsId);

    if (!Number.isNaN(parsedJobDetailsId)) {
      setSelectedJobId(parsedJobDetailsId);
    }
  }

  return (
    <>
      <Stack
        stackProps={{
          className: "my-2 mb-2 p-2 border hover:border capitalize",
          direction: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 2,
          sx: {
            borderColor: colorStyles.cardBorderColor,
            "&:hover": {
              borderColor: colorStyles.filterTagsTextColor,
            },
          },
        }}
      >
        <Stack stackProps={{ direction: "row", gap: 2 }}>
          <Stack stackProps={{}}>
            <Avatar {...IMAGE(job).avatarProps}>
              {getInitials({ name: String(job?.company_name || "") })}
            </Avatar>
          </Stack>
          <Stack
            stackProps={{
              direction: "column",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Typography {...DESIGNATION(job)} />
          </Stack>
        </Stack>
        <Stack>
          <Typography {...JOB_TYPE(job)} />
        </Stack>
        <Stack>
          <Typography {...TIME_STAMP(job)} />
        </Stack>
        <Stack
          stackProps={{
            marginRight: 10,
          }}
        >
          <Button {...VIEW_DETAILS_BUTTON} onClick={handleViewDetailsClick} />
        </Stack>
        {/* Only show messaging when job is posted by logged in user 28 */}
        <When condition={job?.user === 28}>
          <Messaging applicationId={job?.applicationId as number} />
        </When>
      </Stack>
      <Divider />
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
            },
          }}
        >
          <Stack
            stackProps={{
              alignItems: "end",
            }}
          >
            <IconButton onClick={() => setSelectedJobId(null)}>
              <CancelOutlinedIcon
                sx={{ color: colorStyles.filterTagsTextColor }}
              />
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
