import React from "react";
import { Avatar, Stack } from "../common";
import { TOP_COMPANY_CARD_CONFIG } from "@/constants";
import { CompanyCardProps } from "@/types";
import CompanyInfo from "./companyInfo";

function CompanyCard({
  isAuthenticated,
  openForceLoginPopup,
  company,
}: CompanyCardProps) {
  const { BACKGROUND_IMAGE } = TOP_COMPANY_CARD_CONFIG;

  return (
    <Stack
      stackProps={{
        className: "relative flex-shrink-0 w-[300px] h-[370px] overflow-hidden",
      }}
    >
      <Avatar
        {...BACKGROUND_IMAGE(company.backgroundImage, company.companyName)}
      />
      <Stack
        stackProps={{
          className:
            "absolute left-1/2 shadow-lg -translate-x-1/2 w-72 h-40 p-4 bottom-4",
          bgcolor: "white",
          direction: "row",
          borderRadius: 2,
          gap: 4,
        }}
      >
        <CompanyInfo
          company={company}
          isAuthenticated={isAuthenticated}
          openForceLoginPopup={openForceLoginPopup}
        />
      </Stack>
    </Stack>
  );
}

export default CompanyCard;
