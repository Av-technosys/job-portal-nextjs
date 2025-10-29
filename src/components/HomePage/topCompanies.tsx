import React, { useState } from "react";
import { Stack, IconButton, Typography } from "../common";
import { TOP_COMPANY_CARD_CONFIG, COMPANIES_DATA_CONFIG } from "@/constants";
import HomePage from "./homePageCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@/assets";

// Define the Company type
type Company = {
  companyName: string;
  location: string;
  jobRole: string;
  logo: string;
  backgroundImage: string;
  jobDetailLink: string;
};

function TopCompanies({
  isAuthenticated,
  openForceLoginPopup,
}: {
  isAuthenticated: boolean;
  openForceLoginPopup: VoidFunction;
}) {
  const { HEADER_TEXT } = TOP_COMPANY_CARD_CONFIG;
  const [slideCount, setSlideCount] = useState(0);

  const handleSliderNext = () => {
    setSlideCount(
      (prev) => prev < COMPANIES_DATA_CONFIG.companies.length - 3 && prev + 1
    );
  };

  const handleSliderPrevious = () => {
    setSlideCount((prev) => prev > 0 && prev - 1);
  };

  return (
    <>
      <div
        className="p-3 "
        style={{
          width: "100%",
        }}
      >
        <Typography {...HEADER_TEXT()} />
        <div className="w-full flex items-center justify-end pr-10 md:pr-0">
          <Stack
            stackProps={{
              width: "10%",
              direction: "row",
            }}
          >
            <IconButton onClick={() => handleSliderPrevious()}>
              <ChevronLeftIcon />
            </IconButton>
            <IconButton onClick={() => handleSliderNext()}>
              <ChevronRightIcon />
            </IconButton>
          </Stack>
        </div>
        <Stack
          stackProps={{
            className: "mb-10",
            direction: "row",
            gap: 1,
          }}
        >
          <Stack
            stackProps={{
              direction: "row",
              alignItems: "center",
              justifyItems: "center",
              gap: 1,
              className:
                "max-w-[22rem] md:max-w-[45rem] lg:max-w-6xl mx-auto  p-2 overflow-hidden",
            }}
          >
            {COMPANIES_DATA_CONFIG.companies.map(
              (company: Company, index: number) => (
                <div
                  key={index}
                  className=" transition-transform duration-500"
                  style={{ transform: `translateX(-${slideCount * 100}%)` }}
                >
                  <HomePage
                    isAuthenticated={isAuthenticated}
                    openForceLoginPopup={openForceLoginPopup}
                    company={company}
                  />
                </div>
              )
            )}
          </Stack>
        </Stack>
      </div>
    </>
  );
}

export default TopCompanies;
