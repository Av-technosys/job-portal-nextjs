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
      {/* Plain div wrapper so mx-auto centering works correctly */}
      <div
        style={{
          maxWidth: "1152px",
          margin: "0 auto",
          width: "100%",
          minWidth: 0,
          marginTop: "-10px",
          padding: "0 12px",
        }}
      >
        <Stack
          stackProps={{
            px: 0,
            marginBottom: 2,
            direction: "row",
            justifyContent: "space-between",
          }}
        >
          <Stack
            stackProps={{
              direction: { xs: "column", md: "row" },
              gap: { xs: 0, md: 1 },
            }}
          >
            <Typography {...HEADER_TEXT_1()} />
            <Typography {...HEADER_TEXT_2()} />
          </Stack>
        </Stack>

        <Stack
          stackProps={{
            width: "100%",
          }}
        >
          <Tabs
            items={tabItems}
            tabsProps={{
              defaultValue: tabItems?.[0].key,
              orientation: "horizontal",
              sx: {
                width: "100%",
              },
            }}
          />
        </Stack>
      </div>
    </>
  );
}

export default LatestJobOpenings;
