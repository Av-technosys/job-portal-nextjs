import React from "react";
import { LocationOnIcon, UploadFileIcon } from "@/assets";
import { Avatar, Link, Stack, TextWithIcon, Typography } from "../common";
import { JOBS_URL, TOP_COMPANY_CARD_CONFIG } from "@/constants";
import { CompanyCardProps } from "@/types";
import { useRouter } from "next/router";
const { COMPANY_LOGO, COMPANY_NAME, LOCATION, JOB_ROLE, JOB_DETAIL_LINK } =
  TOP_COMPANY_CARD_CONFIG;
function CompanyInfo({
  isAuthenticated,
  openForceLoginPopup,
  company,
}: CompanyCardProps) {
  const router = useRouter();
  return (
    <>
      <Avatar {...COMPANY_LOGO(company.logo, company.companyName)} />
      <Stack stackProps={{ direction: "column", gap: 1 }}>
        <Typography {...COMPANY_NAME(company.companyName)} />
        <TextWithIcon
          icon={<LocationOnIcon />}
          textProps={{
            ...LOCATION(company.location),
          }}
        />
        <TextWithIcon
          icon={<UploadFileIcon />}
          textProps={{
            ...JOB_ROLE(company.jobRole),
          }}
        />
        <Link
          {...JOB_DETAIL_LINK({
            onClick: () => {
              if (isAuthenticated) {
                router.push(JOBS_URL);
              } else {
                openForceLoginPopup();
              }
            },
          })}
        />
      </Stack>
    </>
  );
}

export default CompanyInfo;
