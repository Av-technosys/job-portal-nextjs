import React, { useMemo } from "react";
import { Stack, Tabs, Typography } from "../common";
import { LATEST_JOB_OPENINGS_CONFIG } from "@/constants";
import JobOpportunity from "../JobOpportunity";

const LATEST_JOB_CATEGORIES = [
  {
    label: "All",
    value: "all",
    key: "all",
  },
  {
    label: "Product Management",
    value: "productmanagement",
    key: "productmanagement",
    roles: ["product-manager"],
  },
  {
    label: "Design",
    value: "design",
    key: "design",
    roles: ["ux-designer"],
  },
  {
    label: "Development",
    value: "development",
    key: "development",
    roles: ["software-engineer", "data-scientist"],
  },
  {
    label: "Marketing",
    value: "marketing",
    key: "marketing",
    roles: ["marketing-manager"],
  },
  {
    label: "Customer Service",
    value: "customerservice",
    key: "customerservice",
    roles: ["customer-service"],
  },
];

function LatestJobOpenings() {
  const { HEADER_TEXT_1, HEADER_TEXT_2 } = LATEST_JOB_OPENINGS_CONFIG;

  const tabItems = useMemo(() => {
    return LATEST_JOB_CATEGORIES.map((category) => ({
      ...category,
      children: <JobOpportunity jobRoleFilters={category.roles} />,
    }));
  }, []);

  return (
    <>
      <Stack
        stackProps={{
          width: "100%",
          marginTop: "-30px",
          className: "max-w-[22rem] md:max-w-[45rem] lg:max-w-6xl mx-auto relative z-20",
        }}
      >
        <Stack
          stackProps={{
            marginLeft: 2,
            marginBottom: 3,
            direction: "row",
            justifyContent: "space-between",
            className: "max-w-[22rem] md:max-w-[45rem] lg:max-w-6xl",
          }}
        >
          <Stack
            stackProps={{
              direction: { xs: "column", md: "row" },
              gap: { xs: 0.5, md: 1.5 },
              alignItems: { xs: "flex-start", md: "baseline" },
            }}
          >
            <Typography {...HEADER_TEXT_1()} />
            <Typography {...HEADER_TEXT_2()} />
          </Stack>
        </Stack>

        <Stack
          stackProps={{
            className:
              "max-w-[22rem] md:max-w-[45rem] lg:max-w-6xl mx-auto p-2",
          }}
        >
          <Tabs
            items={tabItems}
            tabsProps={{
              defaultValue: tabItems?.[0].key,
              orientation: "horizontal",
              sx: {
                width: "100%",
                "& .MuiTabs-flexContainer": {
                  gap: "10px",
                  flexWrap: "wrap",
                },
                "& .MuiTab-root": {
                  borderRadius: "999px",
                  padding: "8px 20px",
                  minHeight: "40px",
                  fontWeight: 600,
                  color: "#64748B",
                  backgroundColor: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "#EEF2FF",
                    borderColor: "#C7D2FE",
                    color: "#4F46E5",
                  },
                  "&.Mui-selected": {
                    color: "#FFFFFF",
                    backgroundColor: "#4F46E5",
                    borderColor: "#4F46E5",
                    boxShadow: "0 4px 12px rgba(79, 70, 229, 0.25)",
                  },
                },
                "& .MuiTabs-indicator": {
                  display: "none",
                },
              },
            }}
          />
        </Stack>
      </Stack>
    </>
  );
}

export default LatestJobOpenings;
