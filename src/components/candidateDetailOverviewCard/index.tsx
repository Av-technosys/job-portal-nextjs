import React from "react";
import { CakeIcon, FlagIcon, Man2Icon, PhoneInTalkRoundedIcon } from "@/assets";
import { colorStyles } from "@/styles";
import { CANDIDATE_DETAILS_PAGE_CONFIG } from "@/constants";
import { Stack, TextWithIcon } from "../common";

function CandidateOverviewCard({ aplicantPersonalDetails }: any) {
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

  const ApplicantFullData = aplicantPersonalDetails;
  const genderValue = ApplicantFullData?.gender;

  const formattedGender =
    genderValue === 0
      ? "Male"
      : genderValue === 1
      ? "Female"
      : genderValue || "Not specified";

  const candidateDetailOverview = [
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
