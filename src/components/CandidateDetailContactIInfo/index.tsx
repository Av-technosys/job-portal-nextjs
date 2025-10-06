import React, { useMemo } from "react";
import { CANDIDATE_DETAILS_PAGE_CONFIG } from "@/constants";
import { Stack, TextAndSubtextWithIcon, Typography } from "../common";
import { colorStyles } from "@/styles";
import { EmailIcon, FiberPinIcon, LocationOnIcon } from "@/assets";
import { CandidateOverviewCardProps } from "../candidateDetailOverviewCard";
import { useGetApplicantPersonalDetails } from "@/services/useGetApplicantPersonalDetails";

function CandidateContactCard({ candidateId }: CandidateOverviewCardProps) {
  const {
    CONTACT_TEXT,
    POSTAL_CODE,
    POSTAL_CODE_TEXT,
    MAIL_TEXT,
    EMAIL,
    LOCATION,
    ADDRESS_TEXT,
    ADDRESS,
    MOBILE,
    LOCATION_TEXT,
    MOBILE_TEXT,
  } = CANDIDATE_DETAILS_PAGE_CONFIG;

  const ApplicantPersonalDetails = useGetApplicantPersonalDetails({
    queryParams: {
      UserId: candidateId,
    },
  });

  const ApplicantFullData = ApplicantPersonalDetails?.data?.data;

  const candidateDetailContactInformation = useMemo(() => {
    return [
      {
        icon: <EmailIcon sx={{ color: colorStyles.filterTagsTextColor }} />,
        subTextProps: MAIL_TEXT,
        textProps: EMAIL(ApplicantFullData?.email),
      },
      {
        icon: (
          <LocationOnIcon sx={{ color: colorStyles.filterTagsTextColor }} />
        ),
        subTextProps: ADDRESS_TEXT,
        textProps: ADDRESS(ApplicantFullData?.address_line_1),
      },
      {
        icon: (
          <LocationOnIcon sx={{ color: colorStyles.filterTagsTextColor }} />
        ),
        subTextProps: LOCATION_TEXT,
        textProps: LOCATION(ApplicantFullData?.state, ApplicantFullData?.city),
      },
      {
        icon: <FiberPinIcon sx={{ color: colorStyles.filterTagsTextColor }} />,
        subTextProps: POSTAL_CODE_TEXT,
        textProps: POSTAL_CODE(ApplicantFullData?.postal_code),
      },
    ];
  }, [
    CONTACT_TEXT,
    POSTAL_CODE,
    POSTAL_CODE_TEXT,
    MAIL_TEXT,
    EMAIL,
    LOCATION,
    ADDRESS_TEXT,
    ADDRESS,
    MOBILE,
    LOCATION_TEXT,
    MOBILE_TEXT,
  ]);

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
