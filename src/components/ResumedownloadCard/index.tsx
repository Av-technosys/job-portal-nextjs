import React from "react";
import { AccountBalanceWalletOutlinedIcon } from "@/assets";
import { CANDIDATE_DETAILS_PAGE_CONFIG } from "@/constants";
import { Stack, Typography } from "../common";
import { useGetApplicantDetails } from "@/services/useGetApplicantDetails";
import { CandidateOverviewCardProps } from "../CandidateApplication/CandidateAcademicInfo";
import Link from "next/link";

function ResumeDownloadCard({ candidateId }: CandidateOverviewCardProps) {
  const { DOWNLOAD_RESUME_TEXT, RESUME } = CANDIDATE_DETAILS_PAGE_CONFIG;

  const ApplicantDetails = useGetApplicantDetails({
    queryParams: {
      UserId: candidateId,
    },
  });

  const resumeFiles = ApplicantDetails?.data?.data?.files;

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
        <Stack stackProps={{ className: "p-3 border-2 border-dashed" }}>
          {resumeFiles?.map((file: any, index: number) => {
            return (
              <Link
                target="_blank"
                href={`https://av-job-portal.s3.amazonaws.com/${file?.file}`}
              >
                <Typography key={index} {...RESUME(file?.file)} />
              </Link>
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ResumeDownloadCard;
