import React, { useMemo } from "react";
import {
  CakeIcon,
  FlagIcon,
  BusinessCenterOutlinedIcon,
  Man2Icon,
  PhoneInTalkRoundedIcon,
} from "@/assets";
import { colorStyles } from "@/styles";
import { CANDIDATE_DETAILS_PAGE_CONFIG } from "@/constants";
import { Stack, TextWithIcon } from "../common";
import { useGetApplicantPersonalDetails } from "@/services/useGetApplicantPersonalDetails";

export interface CandidateOverviewCardProps {
  candidateId: number | string | string[] | boolean;
}

function CandidateOverviewCard({ candidateId }: CandidateOverviewCardProps) {
  const {
    DOB_TEXT,
    DOB,
    NATIONALITY_TEXT,
    NATIONALITY,
    GENDER_TEXT,
    GENDER,
    MOBILE_TEXT,
    MOBILE,
  } = CANDIDATE_DETAILS_PAGE_CONFIG;

  const ApplicantPersonalDetails = useGetApplicantPersonalDetails({
    queryParams: {
      UserId: candidateId,
    },
  });

  const ApplicantFullData = ApplicantPersonalDetails?.data?.data;

  const candidateDetailOverview = useMemo(() => {
    const genderValue = ApplicantFullData?.gender;
    let formattedGender =
      genderValue === 0
        ? "Male"
        : genderValue === 1
        ? "Female"
        : genderValue || "Not specified";
    return [
      {
        icon: <CakeIcon sx={{ color: colorStyles.filterTagsTextColor }} />,
        subTextProps: DOB_TEXT,
        textProps: DOB(ApplicantFullData?.date_of_birth),
      },
      {
        icon: <FlagIcon sx={{ color: colorStyles.filterTagsTextColor }} />,
        subTextProps: NATIONALITY_TEXT,
        textProps: NATIONALITY(ApplicantFullData?.country),
      },
      {
        icon: <Man2Icon sx={{ color: colorStyles.filterTagsTextColor }} />,
        subTextProps: GENDER_TEXT,
        textProps: GENDER(formattedGender),
      },
      {
        icon: (
          <PhoneInTalkRoundedIcon
            sx={{ color: colorStyles.filterTagsTextColor }}
          />
        ),
        subTextProps: MOBILE_TEXT,
        textProps: MOBILE(ApplicantFullData?.phone_number),
      },
    ];
  }, [
    DOB_TEXT,
    DOB,
    NATIONALITY_TEXT,
    NATIONALITY,
    GENDER_TEXT,
    GENDER,
    MOBILE_TEXT,
    MOBILE,
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
          direction: { xs: "column", sm: "row" },
        }}
      >
        {candidateDetailOverview?.map((detail, index) => (
          <TextWithIcon
            key={`candidateDetailOverview-${index}`}
            icon={detail?.icon}
            subTextProps={detail?.subTextProps}
            textProps={detail?.textProps}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default CandidateOverviewCard;
