import React from "react";
import { AccountBalanceWalletOutlinedIcon } from "@/assets";
import { CANDIDATE_DETAILS_PAGE_CONFIG } from "@/constants";
import { Stack, Typography } from "../common";
import { CandidateOverviewCardProps } from "../candidateDetailOverviewCard";
import { useGetApplicantDetails } from "@/services/useGetApplicantDetails";

function ResumeDownloadCard({ candidateId }: CandidateOverviewCardProps) {
  const { DOWNLOAD_RESUME_TEXT, NAME } = CANDIDATE_DETAILS_PAGE_CONFIG;

  const ApplicantDetails = useGetApplicantDetails({
    queryParams: {
      UserId: candidateId,
    },
  });

  const resumeFile = ApplicantDetails?.data?.data?.institution_name; // resume file isme hai

  return (
    <Stack
      stackProps={{
        className: "p-4 border-2 rounded-md",
      }}
    >
      <Typography {...DOWNLOAD_RESUME_TEXT} />
      <Stack
        stackProps={{
          direction: "row",
          gap: 3,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <AccountBalanceWalletOutlinedIcon />
        {/* <Stack stackProps={{ className: "p-3 border-2 border-dashed" }}>
          <Typography {...NAME(resumeFile)} />
        </Stack> */}
      </Stack>
    </Stack>
  );
}

export default ResumeDownloadCard;
