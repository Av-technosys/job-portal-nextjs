import React from "react";
import { CANDIDATE_DETAILS_PAGE_CONFIG } from "@/constants";
import { Stack, TextAndSubtextWithIcon, Typography } from "../common";
import { colorStyles } from "@/styles";
import { EmailIcon, FiberPinIcon, LocationOnIcon } from "@/assets";

function CandidateContactCard({ aplicantPersonalDetails }: any) {
  const {
    CONTACT_TEXT,
    POSTAL_CODE,
    POSTAL_CODE_TEXT,
    MAIL_TEXT,
    EMAIL,
    LOCATION,
    ADDRESS_TEXT,
    ADDRESS,
    LOCATION_TEXT,
  } = CANDIDATE_DETAILS_PAGE_CONFIG;

  const ApplicantFullData = aplicantPersonalDetails;

  const candidateDetailContactInformation = [
    {
      icon: <EmailIcon sx={{ color: colorStyles.filterTagsTextColor }} />,
      subTextProps: MAIL_TEXT,
      textProps: EMAIL(ApplicantFullData?.email),
    },
    {
      icon: <LocationOnIcon sx={{ color: colorStyles.filterTagsTextColor }} />,
      subTextProps: ADDRESS_TEXT,
      textProps: ADDRESS(ApplicantFullData?.address_line_1),
    },
    {
      icon: <LocationOnIcon sx={{ color: colorStyles.filterTagsTextColor }} />,
      subTextProps: LOCATION_TEXT,
      textProps: LOCATION(ApplicantFullData?.state, ApplicantFullData?.city),
    },
    {
      icon: <FiberPinIcon sx={{ color: colorStyles.filterTagsTextColor }} />,
      subTextProps: POSTAL_CODE_TEXT,
      textProps: POSTAL_CODE(ApplicantFullData?.postal_code),
    },
  ];

  return (
    <Stack stackProps={{ className: "p-4 border-2 rounded-md" }}>
      <Typography {...CONTACT_TEXT} />
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
  );
}

export default CandidateContactCard;
