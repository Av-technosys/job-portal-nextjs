import React from "react";
import { Stack, Carousel, CarouselCard } from "../common";
import { TOP_COMPANY_CARD_CONFIG, COMPANIES_DATA_CONFIG } from "@/constants";
import HomePage from "./homePageCard";

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

  return (
    <>
      <div
        className="ml-4"
        style={{
          width: "90vw",
        }}
      >
        <Carousel titleProps={HEADER_TEXT()}>
          <Stack
            stackProps={{
              className: "mb-10",
              direction: "row",
              gap: 1,
            }}
          >
            {COMPANIES_DATA_CONFIG.companies.map(
              (company: Company, index: number) => (
                <CarouselCard
                  key={`topCompanyCarouselCard-${company?.companyName}-${index}`}
                >
                  <HomePage
                    isAuthenticated={isAuthenticated}
                    openForceLoginPopup={openForceLoginPopup}
                    company={company}
                  />
                </CarouselCard>
              )
            )}
          </Stack>
        </Carousel>
      </div>
    </>
  );
}

export default TopCompanies;
