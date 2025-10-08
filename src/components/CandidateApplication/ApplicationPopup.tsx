import {
  APPLICATION_MODAL,
  CANDIDATE_DETAILS_PAGE_CONFIG,
  CANDIDATE_NOTIFICATION_CONFIG,
} from "@/constants";
import {
  Avatar,
  Button,
  IconButton,
  Loader,
  Modal,
  Stack,
  Typography,
} from "../common";
import { CommonObjectType, Job } from "@/types";
// import Messaging from "../Messaging";
import { CancelOutlinedIcon } from "@/assets";
import { getErrorMessageFromAPI, getInitials } from "@/helper";
import { colorStyles } from "@/styles";
import SocialLinksCard from "../SocialLinksCard";
import CandidateContactCard from "../CandidateDetailContactIInfo";
import ResumeDownloadCard from "../ResumedownloadCard";
import { CandidateDetailOverviewCard } from "..";
import { useGetApplicantPersonalDetails } from "@/services/useGetApplicantPersonalDetails";
import CandidateAcademicCard from "./CandidateAcademicInfo";
import CandidateProfessionalCard from "./CandidateProfessionalInfo";
import { useGetApplicantDetails } from "@/services/useGetApplicantDetails";
import { useNotification, useUpdateCandidateStatus } from "@/services";
import { useRouter } from "next/router";

interface ApplicationPopupProps {
  open: boolean;
  handleClose: VoidFunction;
  jobDetails: Job;
  candidateDetails: CommonObjectType;
}

export default function ApplicationPopup({
  open,
  handleClose,
  candidateDetails,
}: // jobDetails,
// candidateDetails,
ApplicationPopupProps) {
  const { MODAL_STYLES } = APPLICATION_MODAL;
  const { IMAGE, NAME, NOT_SHORTLISTED_BUTTON, SCEHDULE_INTERVIEW_BUTTON } =
    CANDIDATE_DETAILS_PAGE_CONFIG;

  const router = useRouter();
  const { id } = router.query;

  const userId =
    typeof candidateDetails?.user === "object"
      ? (candidateDetails?.user as { id?: string | number })?.id
      : candidateDetails?.user;

  const ApplicantFullData = useGetApplicantPersonalDetails({
    queryParams: {
      UserId: userId,
    },
  });

  const aplicantPersonalDetails = ApplicantFullData?.data?.data;

  const updateCandidateStatusMutate = useUpdateCandidateStatus();
  const { showNotification } = useNotification();

  function updateCandidateStatus(candidateId: number, status: number) {
    updateCandidateStatusMutate.mutate(
      {
        student_id: candidateId,
        job_id: Number(id),
        status: status,
      },
      {
        onSuccess: () => {
          showNotification(CANDIDATE_NOTIFICATION_CONFIG.SUCCESS);
        },
        onError: (error) => {
          showNotification({
            ...getErrorMessageFromAPI(error),
          });
          console.error(error, "error");
        },
      }
    );
  }

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <>
          <Stack
            stackProps={{
              width: "80%",
              sx: MODAL_STYLES,
            }}
          >
            <Stack
              stackProps={{
                alignItems: "end",
              }}
            >
              <IconButton onClick={handleClose}>
                <CancelOutlinedIcon
                  sx={{ color: colorStyles.filterTagsTextColor }}
                />
              </IconButton>
            </Stack>
            <Stack
              stackProps={{
                direction: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Stack
                stackProps={{
                  direction: "row",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Stack>
                  <Avatar
                    {...IMAGE(aplicantPersonalDetails?.profile_picture)
                      .avatarProps}
                  >
                    {getInitials({
                      name: String(aplicantPersonalDetails?.first_name || ""),
                    })}
                  </Avatar>
                </Stack>
                <Stack
                  stackProps={{
                    gap: 1,
                  }}
                >
                  <Typography {...NAME(aplicantPersonalDetails?.first_name)} />
                </Stack>
              </Stack>
              <Stack
                stackProps={{
                  className: "mt-2",
                  gap: 2,
                  direction: { xs: "column", md: "row" },
                }}
              >
                <Button
                  onClick={() =>
                    updateCandidateStatus(aplicantPersonalDetails?.id, 5)
                  }
                  {...NOT_SHORTLISTED_BUTTON}
                />
                <Button
                  onClick={() =>
                    updateCandidateStatus(aplicantPersonalDetails?.id, 4)
                  }
                  {...SCEHDULE_INTERVIEW_BUTTON}
                />
              </Stack>
            </Stack>
            {/* main Stack */}
            <Stack
              stackProps={{
                className: "mt-10",
                direction: { xs: "column", md: "row" },
                justifyContent: "space-between",
              }}
            >
              {/* left Stack */}
              <Stack
                stackProps={{
                  width: { xs: "100%", md: "50%" },
                  gap: 2,
                }}
              >
                <CandidateAcademicCard candidateId={userId} />
                <CandidateProfessionalCard candidateId={userId} />
                <SocialLinksCard userId={userId} />
              </Stack>
              {/* right Stack */}
              <Stack
                stackProps={{
                  className: "mt-4 md:mt-0",
                  gap: 3,
                }}
              >
                <CandidateDetailOverviewCard
                  aplicantPersonalDetails={aplicantPersonalDetails}
                />
                <ResumeDownloadCard candidateId={userId} />
                <CandidateContactCard
                  aplicantPersonalDetails={aplicantPersonalDetails}
                />
              </Stack>
            </Stack>
          </Stack>
        </>
      </Modal>
    </>
  );
}
