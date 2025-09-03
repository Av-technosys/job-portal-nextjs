import React, { useMemo } from "react";
import { CANDIDATE_DETAILS_PAGE_CONFIG } from "@/constants";
import { Stack, TextAndSubtextWithIcon, Typography } from "../common";
import { colorStyles } from "@/styles";
import { EmailIcon, LocationOnIcon, PhoneInTalkRoundedIcon } from "@/assets";

interface CandidateContactCardProps {
  candidate: {
    email?: string;
    location?: string;
    phone?: string;
  };
}

function CandidateContactCard({ candidate }: CandidateContactCardProps) {
  const {
    CONTACT_TEXT,
    MAIL_TEXT,
    EMAIL,
    LOCATION,
    MOBILE,
    LOCATION_TEXT,
    MOBILE_TEXT,
  } = CANDIDATE_DETAILS_PAGE_CONFIG;

  const candidateDetailContactInformation = useMemo(() => {
    return [
      {
        icon: <EmailIcon sx={{ color: colorStyles.filterTagsTextColor }} />,
        subTextProps: MAIL_TEXT,
        textProps: EMAIL(candidate),
      },
      {
        icon: (
          <LocationOnIcon sx={{ color: colorStyles.filterTagsTextColor }} />
        ),
        subTextProps: LOCATION_TEXT,
        textProps: LOCATION(candidate),
      },
      {
        icon: (
          <PhoneInTalkRoundedIcon
            sx={{ color: colorStyles.filterTagsTextColor }}
          />
        ),
        subTextProps: MOBILE_TEXT,
        textProps: MOBILE(candidate),
      },
    ];
  }, [
    MAIL_TEXT,
    EMAIL,
    ,
    LOCATION_TEXT,
    LOCATION,
    MOBILE_TEXT,
    MOBILE,
    candidate,
  ]);

  return (
    <Stack stackProps={{ className: "p-4 border-2 rounded-md" }}>
      <Typography {...CONTACT_TEXT} />
      <Stack stackProps={{ className: "mt-4", gap: 2 }}>
        {/* {candidateDetailContactInformation.map((detail, index) => (
          <TextAndSubtextWithIcon
            textWithIconProps={{ direction: "row" }}
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

export default CandidateContactCard;
