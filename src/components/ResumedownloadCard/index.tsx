import React from "react";
import { AccountBalanceWalletOutlinedIcon } from "@/assets";
import { CANDIDATE_DETAILS_PAGE_CONFIG } from "@/constants";
import { Stack, Typography } from "../common";

interface ResumeDownloadCardProps {
  candidate: {
    name: string;
  };
}

function ResumeDownloadCard({ candidate }: ResumeDownloadCardProps) {
  const { DOWNLOAD_RESUME_TEXT, NAME } = CANDIDATE_DETAILS_PAGE_CONFIG;

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
          <Typography {...NAME(candidate)} />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ResumeDownloadCard;
