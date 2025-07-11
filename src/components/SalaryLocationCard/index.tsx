import React from "react";
import { Stack, Typography } from "../common";
import { MapOutlinedIcon } from "@/assets";
import { colorStyles } from "@/styles";
import { SalaryLocationCardProps } from "@/types";
import { JOB_DETAIL_PAGE_CONFIG } from "@/constants";

function SalaryLocationCard({ job }: SalaryLocationCardProps) {
  const { SALARY_TEXT, SALARY, SALARY_YEAR_TEXT, LOCATION_TEXT, LOCATION } =
    JOB_DETAIL_PAGE_CONFIG;

  return (
    <Stack
      stackProps={{
        direction: "row",
        className: "border-2 rounded-lg p-4",
        borderColor: colorStyles.filterTagsBackgroundColor,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Stack
        stackProps={{
          gap: 1,
          width: "fullwidth",
          alignItems: "center",
        }}
      >
        <Typography {...SALARY_TEXT()} />
        <Stack>
          <Typography {...SALARY(job)} />
        </Stack>
        <Typography {...SALARY_YEAR_TEXT()} />
      </Stack>
      <Stack stackProps={{ gap: 1, alignItems: "center" }}>
        <MapOutlinedIcon
          sx={{ fontSize: 38, color: colorStyles.filterTagsTextColor }}
        />
        <Typography {...LOCATION_TEXT()} />
        <Typography {...LOCATION(job)} />
      </Stack>
    </Stack>
  );
}

export default SalaryLocationCard;
