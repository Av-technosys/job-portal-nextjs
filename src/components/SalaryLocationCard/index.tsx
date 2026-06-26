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
        className: "border rounded-xl p-4 sm:p-5",
        borderColor: colorStyles.filterTagsBackgroundColor,
        gap: 3,
      }}
    >
      <Stack
        stackProps={{
          gap: 0.5,
          flex: 1,
          alignItems: "flex-start",
        }}
      >
        <Typography {...SALARY_TEXT()} />
        <Typography {...SALARY(job)} typographyProps={{ ...SALARY(job).typographyProps, sx: { color: colorStyles.green, fontWeight: "600", mt: 1 } }} />
        <Typography {...SALARY_YEAR_TEXT()} />
      </Stack>
      
      <Stack stackProps={{ width: "1px", bgcolor: colorStyles.filterTagsBackgroundColor, my: 1 }} />

      <Stack stackProps={{ gap: 0.5, flex: 1, alignItems: "flex-start" }}>
        <MapOutlinedIcon
          sx={{ fontSize: 24, color: colorStyles.filterTagsTextColor, mb: 0.5 }}
        />
        <Typography {...LOCATION_TEXT()} />
        <Typography {...LOCATION(job)} typographyProps={{ ...LOCATION(job).typographyProps, sx: { fontWeight: "500" } }} />
      </Stack>
    </Stack>
  );
}

export default SalaryLocationCard;
