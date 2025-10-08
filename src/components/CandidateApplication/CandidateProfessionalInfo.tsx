import React from "react";
import { CANDIDATE_DETAILS_PAGE_CONFIG } from "@/constants";
import { Stack, TextAndSubtextWithIcon, Typography } from "../common";
import { colorStyles } from "@/styles";
import {
  CurrencyRupeeIcon,
  DateRangeIcon,
  NotificationImportantIcon,
} from "@/assets";
import { useGetApplicantDetails } from "@/services/useGetApplicantDetails";
import { CandidateOverviewCardProps } from "./CandidateAcademicInfo";

function CandidateProfessionalCard({
  candidateId,
}: CandidateOverviewCardProps) {
  const {
    COVER_LETTER_TEXT,
    COVER_LETTER,
    PROFESSIONAL_TEXT,
    SKILLS_TEXT,
    CURRENT_SALARY,
    CURRENT_SALARY_TEXT,
    EXPECTED_SALARY,
    EXPECTED_SALARY_TEXT,
    NOTICE_PERIOD,
    NOTICE_PERIOD_TEXT,
    START_DATE,
    START_DATE_TEXT,
    END_DATE,
    END_DATE_TEXT,
  } = CANDIDATE_DETAILS_PAGE_CONFIG;

  const ApplicantFullDetails = useGetApplicantDetails({
    queryParams: {
      UserId: candidateId,
    },
  });

  const ApplicantFullData = ApplicantFullDetails?.data?.data;
  const ApplicantSkills = ApplicantFullData?.skill_sets;
  const ApplicantCoverLater = ApplicantFullData?.cover_letter;

  const candidateProfessionalInformation = [
    {
      icon: (
        <CurrencyRupeeIcon sx={{ color: colorStyles.filterTagsTextColor }} />
      ),
      subTextProps: CURRENT_SALARY_TEXT,
      textProps: CURRENT_SALARY(ApplicantFullData?.current_salary),
    },
    {
      icon: (
        <CurrencyRupeeIcon sx={{ color: colorStyles.filterTagsTextColor }} />
      ),
      subTextProps: EXPECTED_SALARY_TEXT,
      textProps: EXPECTED_SALARY(ApplicantFullData?.expected_salary),
    },
    {
      icon: (
        <NotificationImportantIcon
          sx={{ color: colorStyles.filterTagsTextColor }}
        />
      ),
      subTextProps: NOTICE_PERIOD_TEXT,
      textProps: NOTICE_PERIOD(ApplicantFullData?.notice_period),
    },
    {
      icon: <DateRangeIcon sx={{ color: colorStyles.filterTagsTextColor }} />,
      subTextProps: START_DATE_TEXT,
      textProps: START_DATE(ApplicantFullData?.start_date),
    },
    {
      icon: <DateRangeIcon sx={{ color: colorStyles.filterTagsTextColor }} />,
      subTextProps: END_DATE_TEXT,
      textProps: END_DATE(ApplicantFullData?.end_date),
    },
  ];

  return (
    <>
      <Stack stackProps={{ className: "p-4 border-2 rounded-md" }}>
        <Typography {...PROFESSIONAL_TEXT} />
        <Stack stackProps={{ className: "mt-4", gap: 2 }}>
          {candidateProfessionalInformation?.map((detail, index) => (
            <TextAndSubtextWithIcon
              textWithIconProps={{ direction: "row" }}
              key={`candidateDetailOverview-${index}`}
              icon={detail.icon}
              subTextProps={detail.subTextProps}
              textProps={detail.textProps}
            />
          ))}
          <Typography {...SKILLS_TEXT} />
          <Stack
            stackProps={{ direction: "row", spacing: 1, flexWrap: "wrap" }}
          >
            {ApplicantSkills?.map((skill: any, index: number) => (
              <span key={index}>{skill?.skill_name},</span>
            ))}
          </Stack>
        </Stack>
      </Stack>
      <Typography {...COVER_LETTER_TEXT} />
      <Typography {...COVER_LETTER(ApplicantCoverLater)} />
    </>
  );
}

export default CandidateProfessionalCard;
