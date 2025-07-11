import { APPLICATION_MODAL, CANDIDATE_DETAILS_PAGE_CONFIG } from "@/constants";
import { Avatar, Button, Modal, Stack, Typography } from "../common";
import { CommonObjectType, Job } from "@/types";
// import Messaging from "../Messaging";
import { CancelOutlinedIcon } from "@/assets";
import { getInitials } from "@/helper";
import { colorStyles } from "@/styles";
import SocialLinksCard from "../SocialLinksCard";
import CandidateContactCard from "../CandidateDetailContactIInfo";
import ResumeDownloadCard from "../ResumedownloadCard";
import { CandidateDetailOverviewCard } from "..";

interface ApplicationPopupProps {
  open: boolean;
  handleClose: VoidFunction;
  jobDetails: Job;
  candidateDetails: CommonObjectType;
}

const candidate = {
  id: 1,
  name: "Vishal Sir",
  email: "vishal.sir@example.com",
  phone: "+1234567890",
  date_of_birth: "06/09/2000",
  nationality: "india",
  experience: "5 years",
  education: "Bachelor's in Computer Science",
  resume_url: "https://example.com/resume.pdf",
  applied_date: "2024-01-20",
  status: "active" as "active" | "expired",
  skills: ["React", "TypeScript", "Node.js"],
  current_company: "Tech Corp",
  designation: "Senior Developer",
  salary: "$80,000",
  location: "New York",
  description:
    "I've been passionate about graphic design and digital art from an early ",
  cover_letter:
    "Respected Sir,I am willing to express my interest in the fourth grade instructional position that is currently available in the Fort Wayne Community School System learned of the opening trough a notice posted on Job Assured, IPFW's job database. I am confident that my academic background and curriculum development skills would be successfully utilized in this teaching position.",
};

export default function ApplicationPopup({
  open,
  handleClose,
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
              <CancelOutlinedIcon
                sx={{ color: colorStyles.filterTagsTextColor }}
              />
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
                  <Avatar {...IMAGE(candidate).avatarProps}>
                    {getInitials({ name: String(candidate?.name || "") })}
                  </Avatar>
                </Stack>
                <Stack
                  stackProps={{
                    gap: 1,
                  }}
                >
                  <Typography {...NAME(candidate)} />
                  <Typography {...DESIGNATION(candidate)} />
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
                <Typography {...BIOGRAPHY_TEXT} />
                <Typography {...BIOGRAPHY(candidate)} />
                <Typography {...COVER_LETTER_TEXT} />
                <Typography {...COVER_LETTER(candidate)} />
                <SocialLinksCard job={candidate} />
              </Stack>
              {/* right Stack */}
              <Stack
                stackProps={{
                  className: "mt-4 md:mt-0",
                  gap: 3,
                }}
              >
                <CandidateDetailOverviewCard candidate={candidate} />
                <ResumeDownloadCard candidate={candidate} />
                <CandidateContactCard candidate={candidate} />
              </Stack>
            </Stack>
          </Stack>
        </>
      </Modal>
    </>
  );
}
