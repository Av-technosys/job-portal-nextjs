import { APPLICATION_MODAL, CANDIDATE_DETAILS_PAGE_CONFIG } from "@/constants";
import {
  Avatar,
  Button,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "../common";
import { CommonObjectType, Job } from "@/types";
// import Messaging from "../Messaging";
import { CancelOutlinedIcon } from "@/assets";
import { getInitials } from "@/helper";
import { colorStyles } from "@/styles";
import SocialLinksCard from "../SocialLinksCard";
import CandidateContactCard from "../CandidateDetailContactIInfo";
import ResumeDownloadCard from "../ResumedownloadCard";
import { CandidateDetailOverviewCard } from "..";
import { useGetApplicantDetails } from "@/services/useGetApplicantDetails";
import { useGetApplicantPersonalDetails } from "@/services/useGetApplicantPersonalDetails";

interface ApplicationPopupProps {
  open: boolean;
  handleClose: VoidFunction;
  jobDetails: Job;
  candidateDetails: CommonObjectType;
}

// const candidate = {
//   id: 1,
//   name: "Vishal Sir",
//   email: "vishal.sir@example.com",
//   phone: "+1234567890",
//   date_of_birth: "06/09/2000",
//   nationality: "india",
//   experience: "5 years",
//   education: "Bachelor's in Computer Science",
//   resume_url: "https://example.com/resume.pdf",
//   applied_date: "2024-01-20",
//   status: "active" as "active" | "expired",
//   skills: ["React", "TypeScript", "Node.js"],
//   current_company: "Tech Corp",
//   designation: "Senior Developer",
//   salary: "$80,000",
//   location: "New York",
//   description:
//     "I've been passionate about graphic design and digital art from an early ",
//   cover_letter:
//     "Respected Sir,I am willing to express my interest in the fourth grade instructional position that is currently available in the Fort Wayne Community School System learned of the opening trough a notice posted on Job Assured, IPFW's job database. I am confident that my academic background and curriculum development skills would be successfully utilized in this teaching position.",
// };

export default function ApplicationPopup({
  open,
  handleClose,
  candidateDetails,
}: // jobDetails,
// candidateDetails,
ApplicationPopupProps) {
  const { MODAL_STYLES } = APPLICATION_MODAL;
  const {
    IMAGE,
    NAME,
    DESIGNATION,
    NOT_SHORTLISTED_BUTTON,
    SAVE_FOR_LATER_BUTTON,
    SCEHDULE_INTERVIEW_BUTTON,
    BIOGRAPHY_TEXT,
    BIOGRAPHY,
    COVER_LETTER_TEXT,
    COVER_LETTER,
  } = CANDIDATE_DETAILS_PAGE_CONFIG;

  const userId =
    typeof candidateDetails?.user === "object"
      ? (candidateDetails?.user as { id?: string | number })?.id
      : candidateDetails?.user;

  const ApplicantDetails = useGetApplicantDetails({
    queryParams: {
      UserId: userId,
    },
  });

  console.log("applicanttttt", ApplicantDetails?.data?.data);

  const ApplicantPersonalDetails = useGetApplicantPersonalDetails({
    queryParams: {
      UserId: userId,
    },
  });

  console.log("applicantPersonalDetails", ApplicantPersonalDetails?.data?.data);

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
                    {...IMAGE(ApplicantPersonalDetails?.data?.data).avatarProps}
                  >
                    {getInitials({
                      name: String(
                        ApplicantPersonalDetails.data?.data?.first_name || ""
                      ),
                    })}
                  </Avatar>
                </Stack>
                <Stack
                  stackProps={{
                    gap: 1,
                  }}
                >
                  <Typography {...NAME(ApplicantPersonalDetails?.data?.data)} />
                  <Typography
                    {...DESIGNATION(ApplicantPersonalDetails?.data?.data)}
                  />
                </Stack>
              </Stack>
              <Stack
                stackProps={{
                  className: "mt-2",
                  gap: 2,
                  direction: { xs: "column", md: "row" },
                }}
              >
                <Button {...NOT_SHORTLISTED_BUTTON} />
                <Button {...SAVE_FOR_LATER_BUTTON} />
                <Button {...SCEHDULE_INTERVIEW_BUTTON} />
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
                {/* <Typography {...BIOGRAPHY_TEXT} />
                <Typography {...BIOGRAPHY(candidate)} /> */}
                <Typography {...COVER_LETTER_TEXT} />
                <Typography
                  {...COVER_LETTER(ApplicantDetails?.data?.data?.cover_letter)}
                />

                <SocialLinksCard userId={userId} />
              </Stack>
              {/* right Stack */}
              <Stack
                stackProps={{
                  className: "mt-4 md:mt-0",
                  gap: 3,
                }}
              >
                <CandidateDetailOverviewCard candidateId={userId} />
                {/* <ResumeDownloadCard candidate={candidate} />
                <CandidateContactCard candidate={candidate} /> */}
              </Stack>
            </Stack>
          </Stack>
        </>
      </Modal>
    </>
  );
}
