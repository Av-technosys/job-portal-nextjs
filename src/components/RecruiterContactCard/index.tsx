import React, { useMemo } from "react";
import { RECRUITER_APPLICATION_PAGE_CONFIG } from "@/constants";
import { Stack, TextAndSubtextWithIcon, Typography } from "../common";
import { colorStyles } from "@/styles";
import {
  EmailIcon,
  LinkedInIcon,
  LocationOnIcon,
  PhoneInTalkRoundedIcon,
} from "@/assets";

interface RecruiterContactCardProps {
  recruiter: {
    email?: string;
    location?: string;
    phone?: string;
    linkedin?: string;
  };
}

function RecruiterContactCard({ recruiter }: RecruiterContactCardProps) {
  const {
    CONTACT_TEXT,
    MAIL_TEXT,
    EMAIL,
    LOCATION,
    MOBILE,
    LOCATION_TEXT,
    MOBILE_TEXT,
    LINKED_IN_TEXT,
    LINKED_IN_URL,
  } = RECRUITER_APPLICATION_PAGE_CONFIG;

  const recruiterDetailContactInformation = useMemo(() => {
    return [
      {
        icon: <EmailIcon sx={{ color: colorStyles.filterTagsTextColor }} />,
        subTextProps: MAIL_TEXT || {
          children: "N/A",
        },
        textProps: EMAIL(recruiter) || { children: "N/A" },
      },
      {
        icon: (
          <LocationOnIcon sx={{ color: colorStyles.filterTagsTextColor }} />
        ),
        subTextProps: LOCATION_TEXT || {
          children: "N/A",
        },
        textProps: LOCATION(recruiter) || { children: "N/A" },
      },
      {
        icon: (
          <PhoneInTalkRoundedIcon
            sx={{ color: colorStyles.filterTagsTextColor }}
          />
        ),
        subTextProps: MOBILE_TEXT || {
          children: "N/A",
        },
        textProps: MOBILE(recruiter) || { children: "N/A" },
      },
      {
        icon: <LinkedInIcon sx={{ color: colorStyles.filterTagsTextColor }} />,
        subTextProps: LINKED_IN_TEXT || {
          children: "N/A",
        },
        textProps: LINKED_IN_URL(recruiter) || { children: "N/A" },
      },
    ];
  }, [
    MAIL_TEXT,
    EMAIL,
    LINKED_IN_TEXT,
    LINKED_IN_URL,
    LOCATION_TEXT,
    LOCATION,
    MOBILE_TEXT,
    MOBILE,
    recruiter,
  ]);

  return (
    <Stack stackProps={{ className: "p-4 border-2 rounded-md" }}>
      <Typography {...CONTACT_TEXT} />
      <Stack stackProps={{ className: "mt-4", gap: 2 }}>
        {/* {recruiterDetailContactInformation.map((detail, index) => (
          <TextAndSubtextWithIcon
            textWithIconProps={{ direction: "row" }}
            key={`recruiterDetailOverview-${index}`}
            icon={detail.icon}
            subTextProps={detail.subTextProps}
            textProps={detail.textProps}
          />
        ))} */}
      </Stack>
    </Stack>
  );
}

export default RecruiterContactCard;
