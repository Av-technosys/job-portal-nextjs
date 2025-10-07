import React from "react";
import { RECRUITER_APPLICATION_PAGE_CONFIG } from "@/constants";
import { Stack, TextAndSubtextWithIcon, Typography } from "../common";
import { colorStyles } from "@/styles";
import { EmailIcon, LocationOnIcon } from "@/assets";

export interface RecruiterContactCardProps {
  recruiterId: string | number | boolean;
}

function RecruiterContactCard({ recruiterEmail, recruiterAddress }: any) {
  const { CONTACT_TEXT, MAIL_TEXT, EMAIL, LOCATION, LOCATION_TEXT } =
    RECRUITER_APPLICATION_PAGE_CONFIG;
  const recruiterDetailContactInformation = [
    {
      icon: <EmailIcon sx={{ color: colorStyles.filterTagsTextColor }} />,
      subTextProps: MAIL_TEXT,
      textProps: EMAIL(recruiterEmail),
    },
    {
      icon: <LocationOnIcon sx={{ color: colorStyles.filterTagsTextColor }} />,
      subTextProps: LOCATION_TEXT,
      textProps: LOCATION(recruiterAddress),
    },
  ];

  return (
    <Stack stackProps={{ className: "p-4 border-2 rounded-md" }}>
      <Typography {...CONTACT_TEXT} />
      <Stack stackProps={{ className: "mt-4", gap: 2 }}>
        {recruiterDetailContactInformation.map((detail, index) => (
          <TextAndSubtextWithIcon
            textWithIconProps={{ direction: "row" }}
            key={`recruiterDetailOverview-${index}`}
            icon={detail.icon}
            subTextProps={detail.subTextProps}
            textProps={detail.textProps}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default RecruiterContactCard;
