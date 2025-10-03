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
import { useGetApplicantPersonalDetails } from "@/services/useGetApplicantPersonalDetails";

interface CandidateOverviewCardProps {
  candidateId: number | string | string[] | boolean;
}

function CandidateOverviewCard({ candidateId }: CandidateOverviewCardProps) {
  const {
    DOB_TEXT,
    DOB,
    NATIONALITY_TEXT,
    NATIONALITY,
    EXPERIECE_TEXT,
    EXPERIENCE,
    EDUCATION_TEXT,
  } = CANDIDATE_DETAILS_PAGE_CONFIG;

  const ApplicantPersonalDetails = useGetApplicantPersonalDetails({
    queryParams: {
      UserId: candidateId,
    },
  });

  const ApplicantFullData = ApplicantPersonalDetails?.data?.data;

  const candidateDetailOverview = useMemo(() => {
    return [
      {
        icon: <CakeIcon sx={{ color: colorStyles.filterTagsTextColor }} />,
        subTextProps: DOB_TEXT,
        textProps: DOB(ApplicantFullData?.data_of_birth),
      },
      {
        icon: <FlagIcon sx={{ color: colorStyles.filterTagsTextColor }} />,
        subTextProps: NATIONALITY_TEXT,
        textProps: NATIONALITY(ApplicantFullData?.country),
      },
      {
        icon: (
          <LayersOutlinedIcon sx={{ color: colorStyles.filterTagsTextColor }} />
        ),
        subTextProps: EXPERIECE_TEXT,
        textProps: EXPERIENCE(ApplicantFullData?.gender),
      },
      {
        icon: (
          <BusinessCenterOutlinedIcon
            sx={{ color: colorStyles.filterTagsTextColor }}
          />
        ),
        subTextProps: EDUCATION_TEXT,
        textProps: EXPERIENCE(ApplicantFullData?.phone_number),
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
        {/* {candidateDetailOverview.map((detail, index) => (
          <TextWithIcon
            key={`candidateDetailOverview-${index}`}
            icon={detail.icon}
            subTextProps={detail.subTextProps}
            textProps={detail.textProps}
          />
        ))} */}
      </Stack>
    </Stack>
  );
}

export default CandidateOverviewCard;
