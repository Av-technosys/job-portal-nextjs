import React from "react";
import { CANDIDATE_DETAILS_PAGE_CONFIG } from "@/constants";
import { Stack, TextAndSubtextWithIcon, Typography } from "../common";
import { colorStyles } from "@/styles";
import {
  CardMembershipIcon,
  EngineeringIcon,
  EqualizerIcon,
  SchoolIcon,
} from "@/assets";
import { useGetApplicantDetails } from "@/services/useGetApplicantDetails";

export interface CandidateOverviewCardProps {
  candidateId: number | string | string[] | boolean;
}

function CandidateAcademicCard({ candidateId }: CandidateOverviewCardProps) {
  const {
    ACADEMIC_TEXT,
    INSTITUTION_NAME,
    QUALIFICATION_STATUS,
    QUALIFICATION_TYPE,
    APPLICANT_SCORE,
    QUALIFICATION_STATUS_TEXT,
    QUALIFICATION_TYPE_TEXT,
    APPLICANT_SCORE_TEXT,
    INSTITUTION_NAME_TEXT,
  } = CANDIDATE_DETAILS_PAGE_CONFIG;

  const ApplicantFullDetails = useGetApplicantDetails({
    queryParams: {
      UserId: candidateId,
    },
  });

  const aplicantFullData = ApplicantFullDetails?.data?.data;

  const candidateDetailContactInformation = [
    {
      icon: <SchoolIcon sx={{ color: colorStyles.filterTagsTextColor }} />,
      subTextProps: INSTITUTION_NAME_TEXT,
      textProps: INSTITUTION_NAME(aplicantFullData?.institution_name),
    },
    {
      icon: <EqualizerIcon sx={{ color: colorStyles.filterTagsTextColor }} />,
      subTextProps: QUALIFICATION_STATUS_TEXT,
      textProps: QUALIFICATION_STATUS(aplicantFullData?.qualification_status),
    },
    {
      icon: <EngineeringIcon sx={{ color: colorStyles.filterTagsTextColor }} />,
      subTextProps: QUALIFICATION_TYPE_TEXT,
      textProps: QUALIFICATION_TYPE(aplicantFullData?.qualification_type),
    },
    {
      icon: (
        <CardMembershipIcon sx={{ color: colorStyles.filterTagsTextColor }} />
      ),
      subTextProps: APPLICANT_SCORE_TEXT,
      textProps: APPLICANT_SCORE(aplicantFullData?.score),
    },
  ];

  return (
    <>
      <Stack stackProps={{ className: "p-4 border-2 rounded-md" }}>
        <Typography {...ACADEMIC_TEXT} />
        <Stack stackProps={{ className: "mt-4", gap: 2 }}>
          {candidateDetailContactInformation.map((detail, index) => (
            <TextAndSubtextWithIcon
              textWithIconProps={{ direction: "row" }}
              key={`candidateDetailOverview-${index}`}
              icon={detail.icon}
              subTextProps={detail.subTextProps}
              textProps={detail.textProps}
            />
          ))}
        </Stack>
      </Stack>
    </>
  );
}

export default CandidateAcademicCard;
