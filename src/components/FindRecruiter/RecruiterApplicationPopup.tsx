import {
  RECRUITER_APPLICATION_MODAL,
  RECRUITER_APPLICATION_PAGE_CONFIG,
} from "@/constants";
import { Avatar, Modal, Stack, Typography, IconButton } from "../common";
import { CommonObjectType, Job } from "@/types";
import { CancelOutlinedIcon } from "@/assets";
import { colorStyles } from "@/styles";
import { getInitials } from "@/helper";
import { RecruiterContactCard } from "..";
import RecruiterOverview from "./RecruiterOverview";
import { useGetCompanyProfileById } from "@/services";

interface RecruiterApplicationPopupProps {
  open: boolean;
  handleClose: VoidFunction;
  jobDetails: Job;
  recruiterDetails: CommonObjectType;
}

export default function RecruiterApplicationPopup({
  open,
  handleClose,
  recruiterDetails,
}: RecruiterApplicationPopupProps) {
  const { MODAL_STYLES } = RECRUITER_APPLICATION_MODAL;
  const { IMAGE, NAME, DESIGNATION } = RECRUITER_APPLICATION_PAGE_CONFIG;

  const userId =
    typeof recruiterDetails?.user === "object"
      ? (recruiterDetails?.user as { id?: string | number })?.id
      : recruiterDetails?.user;

  const companyProfileQuery = useGetCompanyProfileById({
    queryParams: {
      UserId: userId,
    },
  });

  const recruiter = companyProfileQuery?.data?.data || {};

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
                  <Typography {...DESIGNATION} />
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
              <RecruiterOverview recruiterId={userId} />
              {/* right Stack */}
              <Stack
                stackProps={{
                  className: "mt-4 md:mt-0",
                  gap: 3,
                }}
              >
                <RecruiterContactCard
                  recruiterEmail={recruiter.email}
                  recruiterAddress={{
                    address_line_1: recruiter.address_line_1,
                    address_line_2: recruiter.address_line_2,
                    city: recruiter.city,
                    state: recruiter.state,
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
        </>
      </Modal>
    </>
  );
}
