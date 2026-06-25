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
          marginTop: { xs: "-10px", md: "-40px" },
          className: "max-w-[22rem] md:max-w-[45rem] lg:max-w-6xl mx-auto",
        }}
      >
        <Stack
          stackProps={{
            px: 2,
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
              },
            }}
          />
        </Stack>
      </Stack>
    </>
  );
}

export default LatestJobOpenings;
