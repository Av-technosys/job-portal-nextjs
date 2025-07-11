import React, { useMemo, useRef } from "react";
import { IconButton, Stack, Tabs, Typography } from "../common";
import { LATEST_JOB_OPENINGS_CONFIG } from "@/constants";
import JobOpportunity from "../JobOpportunity";
import { ChevronLeftIcon, ChevronRightIcon } from "@/assets";
import { SwiperClass } from "swiper/react";

function LatestJobOpenings() {
  const { HEADER_TEXT_1, HEADER_TEXT_2 } = LATEST_JOB_OPENINGS_CONFIG;
  const sliderRef = useRef<SwiperClass | null>(null);

  const handleNext = () => {
    if (sliderRef?.current) {
      sliderRef.current?.slideNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef?.current) {
      sliderRef.current?.slidePrev();
    }
  };

  const tabItems = useMemo(() => {
    return [
      {
        label: "Product Management",
        value: "productmanagement",
        key: "productmanagement",
        children: (
          <JobOpportunity
            sliderRef={sliderRef}
            jobFilterKey={"Product Management"}
          />
        ),
      },
      {
        label: "Design",
        value: "design",
        key: "design",
        children: (
          <JobOpportunity sliderRef={sliderRef} jobFilterKey={"Design"} />
        ),
      },
      {
        label: "Development",
        value: "development",
        key: "development",
        children: (
          <JobOpportunity sliderRef={sliderRef} jobFilterKey={"Development"} />
        ),
      },
      {
        label: "Marketing",
        value: "marketing",
        key: "marketing",
        children: (
          <JobOpportunity sliderRef={sliderRef} jobFilterKey={"Marketing"} />
        ),
      },
      {
        label: "Customer Service",
        value: "customerservice",
        key: "customerservice",
        children: (
          <JobOpportunity
            sliderRef={sliderRef}
            jobFilterKey={"Customer Service"}
          />
        ),
      },
    ];
  }, []);

  return (
    <>
      <Stack
        stackProps={{
          width: "90vw",
          marginTop: "-96px",
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
          <Stack
            stackProps={{
              direction: "row",
            }}
          >
            <IconButton onClick={handlePrev}>
              <ChevronLeftIcon />
            </IconButton>
            <IconButton onClick={handleNext}>
              <ChevronRightIcon />
            </IconButton>
          </Stack>
        </Stack>

        <Stack
          stackProps={{
            direction: "row",
          }}
        >
          <Tabs
            items={tabItems}
            tabsProps={{
              defaultValue: tabItems?.[0].key,
              orientation: "vertical",
              sx: {
                width: "20vw",
                marginRight: "16px",
              },
            }}
          />
        </Stack>
      </Stack>
    </>
  );
}

export default LatestJobOpenings;
