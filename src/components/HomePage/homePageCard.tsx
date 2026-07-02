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
        className: "relative flex-shrink-0 w-[300px] h-[370px] overflow-visible rounded-2xl group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-200/60 bg-white",
      }}
    >
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <Avatar
          {...BACKGROUND_IMAGE(company.backgroundImage, company.companyName)}
        />
      </div>
      <Stack
        stackProps={{
          className:
            "absolute left-1/2 -translate-x-1/2 w-[275px] h-[165px] p-4 bottom-3 z-10 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:border-slate-300",
          direction: "row",
          gap: 3,
          sx: {
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
            borderRadius: "16px",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
          },
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
