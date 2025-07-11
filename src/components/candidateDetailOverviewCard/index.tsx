import React, { useMemo } from "react";
import {
  CakeIcon,
  FlagIcon,
  LayersOutlinedIcon,
  BusinessCenterOutlinedIcon,
} from "@/assets";
import { colorStyles } from "@/styles";
import { CANDIDATE_DETAILS_PAGE_CONFIG } from "@/constants";
import { Stack, TextWithIcon } from "../common";
import { CommonObjectType } from "@/types";

interface CandidateOverviewCardProps {
  candidate: CommonObjectType;
}

function CandidateOverviewCard({ candidate }: CandidateOverviewCardProps) {
  const {
    DOB_TEXT,
    DOB,
    NATIONALITY_TEXT,
    NATIONALITY,
    EXPERIECE_TEXT,
    EXPERIENCE,
    EDUCATION_TEXT,
  } = CANDIDATE_DETAILS_PAGE_CONFIG;

  const candidateDetailOverview = useMemo(() => {
    return [
      {
        icon: <CakeIcon sx={{ color: colorStyles.filterTagsTextColor }} />,
        subTextProps: DOB_TEXT || { children: "N/A" },
        textProps: DOB(candidate) || { children: "N/A" },
      },
      {
        icon: <FlagIcon sx={{ color: colorStyles.filterTagsTextColor }} />,
        subTextProps: NATIONALITY_TEXT || { children: "N/A" },
        textProps: NATIONALITY(candidate) || { children: "N/A" },
      },
      {
        icon: (
          <LayersOutlinedIcon sx={{ color: colorStyles.filterTagsTextColor }} />
        ),
        subTextProps: EXPERIECE_TEXT || { children: "N/A" },
        textProps: EXPERIENCE(candidate) || { children: "N/A" },
      },
      {
        icon: (
          <BusinessCenterOutlinedIcon
            sx={{ color: colorStyles.filterTagsTextColor }}
          />
        ),
        subTextProps: EDUCATION_TEXT || { children: "N/A" },
        textProps: EXPERIENCE(candidate) || { children: "N/A" },
      },
    ];
  }, [
    EXPERIENCE,
    DOB_TEXT,
    DOB,
    NATIONALITY_TEXT,
    NATIONALITY,
    EXPERIECE_TEXT,
    EDUCATION_TEXT,
    candidate,
  ]);

  return (
    <Stack
      stackProps={{
        className: "p-4 border-2 rounded-md",
      }}
    >
      <Stack
        stackProps={{
          className: "grid grid-cols-2",
          gap: 2,
          alignItems: "center",
          direction: "column",
        }}
      >
        {candidateDetailOverview.map((detail, index) => (
          <TextWithIcon
            key={`candidateDetailOverview-${index}`}
            icon={detail.icon}
            subTextProps={detail.subTextProps}
            textProps={detail.textProps}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default CandidateOverviewCard;
