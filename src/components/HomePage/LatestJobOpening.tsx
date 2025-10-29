import React, { useMemo, useRef } from "react";
import { Stack, Tabs, Typography } from "../common";
import { LATEST_JOB_OPENINGS_CONFIG } from "@/constants";
import JobOpportunity from "../JobOpportunity";
import { SwiperClass } from "swiper/react";

function LatestJobOpenings() {
  const { HEADER_TEXT_1, HEADER_TEXT_2 } = LATEST_JOB_OPENINGS_CONFIG;

  const tabItems = useMemo(() => {
    return [
      {
        label: "Product Management",
        value: "productmanagement",
        key: "productmanagement",
        children: <JobOpportunity jobFilterKey={"Product Management"} />,
      },
      {
        label: "Design",
        value: "design",
        key: "design",
        children: <JobOpportunity jobFilterKey={"Design"} />,
      },
      {
        label: "Development",
        value: "development",
        key: "development",
        children: <JobOpportunity jobFilterKey={"Development"} />,
      },
      {
        label: "Marketing",
        value: "marketing",
        key: "marketing",
        children: <JobOpportunity jobFilterKey={"Marketing"} />,
      },
      {
        label: "Customer Service",
        value: "customerservice",
        key: "customerservice",
        children: <JobOpportunity jobFilterKey={"Customer Service"} />,
      },
    ];
  }, []);

  return (
    <>
      <Stack
        stackProps={{
          width: "100%",
          marginTop: "-40px",
        }}
      >
        <Stack
          stackProps={{
            marginLeft: 2,
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
            className:
              "max-w-[22rem] md:max-w-[45rem] lg:max-w-6xl mx-auto  p-2",
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
