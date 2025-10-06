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
import { useGetCompanyProfileById } from "@/services";

export interface RecruiterContactCardProps {
  recruiterId: string | number | boolean;
}

function RecruiterContactCard({ recruiterId }: RecruiterContactCardProps) {
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

  const CompanyProfileById = useGetCompanyProfileById({
    queryParams: {
      UserId: recruiterId,
    },
  });

  const companyData = CompanyProfileById?.data?.data || {};

  const recruiterDetailContactInformation = useMemo(() => {
    return [
      {
        icon: <EmailIcon sx={{ color: colorStyles.filterTagsTextColor }} />,
        subTextProps: MAIL_TEXT,
        textProps: EMAIL(companyData?.email || undefined),
      },
      {
        icon: (
          <LocationOnIcon sx={{ color: colorStyles.filterTagsTextColor }} />
        ),
        subTextProps: LOCATION_TEXT,
        textProps: LOCATION(companyData),
      },
      // {
      //   icon: (
      //     <PhoneInTalkRoundedIcon
      //       sx={{ color: colorStyles.filterTagsTextColor }}
      //     />
      //   ),
      //   subTextProps: MOBILE_TEXT,
      //   textProps: MOBILE(recruiter),
      // },
      // {
      //   icon: <LinkedInIcon sx={{ color: colorStyles.filterTagsTextColor }} />,
      //   subTextProps: LINKED_IN_TEXT,
      //   textProps: LINKED_IN_URL(recruiter),
      // },
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
  ]);

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
