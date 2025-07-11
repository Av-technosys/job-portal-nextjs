import {
  RECRUITER_APPLICATION_MODAL,
  RECRUITER_APPLICATION_PAGE_CONFIG,
} from "@/constants";
import { Avatar, Modal, Stack, Typography } from "../common";
import { CommonObjectType, Job } from "@/types";
// import Messaging from "../Messaging";
import { CancelOutlinedIcon } from "@/assets";
import { colorStyles } from "@/styles";
import { getInitials } from "@/helper";
import SocialLinksCard from "../SocialLinksCard";
import { RecruiterContactCard } from "..";

interface RecruiterApplicationPopupProps {
  open: boolean;
  handleClose: VoidFunction;
  jobDetails: Job;
  recruiterDetails: CommonObjectType;
}

const recruiter = {
  id: 1,
  name: "Vishal Sir",
  email: "vishal.sir@example.com",
  phone: "+1234567890",
  linked_in_url: "https://www.linkedin.com/in",
  designation: "Senior Developer",
  location: "New York",
  overview:
    "I've been passionate about graphic design and digital art from an early ",
  carrer_experience:
    "Respected Sir,I am willing to express my interest in the fourth grade instructional position that is currently available in the Fort Wayne Community School System learned of the opening trough a notice posted on Job Assured, IPFW's job database. I am confident that my academic background and curriculum development skills would be successfully utilized in this teaching position.",
  skills:
    "Respected Sir,I am willing to express my interest in the fourth grade instructional position that is currently available in the Fort Wayne Community School System learned of the opening trough a notice posted on Job Assured, IPFW's job database. I am confident that my academic background and curriculum development skills would be successfully utilized in this teaching position.",
};
export default function RecruiterApplicationPopup({
  open,
  handleClose,
}: RecruiterApplicationPopupProps) {
  const { MODAL_STYLES } = RECRUITER_APPLICATION_MODAL;
  const {
    IMAGE,
    NAME,
    DESIGNATION,
    PROFESSIONAL_OVERVIEW_TEXT,
    PROFESSIONAL_OVERVIEW,
    CARRER_TEXT,
    CARRER_EXPERIENCE,
    SKILLS_TEXT,
    SKILLS,
  } = RECRUITER_APPLICATION_PAGE_CONFIG;

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <>
          <Stack stackProps={{ width: "80%", sx: MODAL_STYLES }}>
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
                  <Avatar {...IMAGE(recruiter).avatarProps}>
                    {getInitials({ name: String(recruiter?.name || "") })}
                  </Avatar>
                </Stack>
                <Stack
                  stackProps={{
                    gap: 1,
                  }}
                >
                  <Typography {...NAME(recruiter)} />
                  <Typography {...DESIGNATION(recruiter)} />
                </Stack>
              </Stack>
            </Stack>
            {/* main Stack */}
            <Stack
              stackProps={{
                className: "mt-2",
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
                <Typography {...PROFESSIONAL_OVERVIEW_TEXT} />
                <Typography {...PROFESSIONAL_OVERVIEW(recruiter)} />
                <Typography {...CARRER_TEXT} />
                <Typography {...CARRER_EXPERIENCE(recruiter)} />
                <Typography {...SKILLS_TEXT} />
                <Typography {...SKILLS(recruiter)} />
                <SocialLinksCard job={recruiter} />
              </Stack>
              {/* right Stack */}
              <Stack
                stackProps={{
                  className: "mt-4 md:mt-0",
                  gap: 3,
                }}
              >
                <RecruiterContactCard recruiter={recruiter} />
              </Stack>
            </Stack>
          </Stack>
        </>
      </Modal>
    </>
  );
}
