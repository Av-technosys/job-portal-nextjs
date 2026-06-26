import React, { useMemo, useRef, useState } from "react";
import { Stack, IconButton, Typography, Skeleton, When } from "../common";
import { TOP_COMPANY_CARD_CONFIG } from "@/constants";
import HomePage from "./homePageCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@/assets";
import { useGetTopCompanies } from "@/services";
import {
  CommonObjectType,
  SkeletonVariantEnum,
  TypographyVariantEnum,
} from "@/types";

// Define the Company type
type Company = {
  companyName: string;
  location: string;
  jobRole: string;
  logo: string;
  backgroundImage: string;
  jobDetailLink: string;
  postedJobsCount?: number;
};

const MAX_TOP_COMPANIES = 6;
const COMPANY_CARD_SKELETONS = Array.from({ length: 3 });
const CARD_WIDTH = 300;
const CARD_GAP = 8;

function TopCompanyCardSkeleton() {
  return (
    <Stack
      stackProps={{
        className: "relative flex-shrink-0 w-[300px] h-[370px] overflow-hidden rounded-lg",
        sx: {
          background: "#F8FAFC",
          border: "1px solid #E6EAF2",
        },
      }}
    >
      <Skeleton
        variant={SkeletonVariantEnum.RECTANGULAR}
        width="100%"
        height={286}
      />
      <Stack
        stackProps={{
          className:
            "absolute left-1/2 shadow-lg -translate-x-1/2 w-72 h-40 p-4 bottom-4",
          bgcolor: "white",
          direction: "row",
          borderRadius: 2,
          gap: 2,
        }}
      >
        <Skeleton
          variant={SkeletonVariantEnum.RECTANGULAR}
          width={32}
          height={32}
        />
        <Stack
          stackProps={{
            gap: 1,
            width: "100%",
          }}
        >
          <Skeleton variant={SkeletonVariantEnum.TEXT} width="72%" height={26} />
          <Skeleton variant={SkeletonVariantEnum.TEXT} width="88%" height={20} />
          <Skeleton variant={SkeletonVariantEnum.TEXT} width="62%" height={20} />
          <Skeleton variant={SkeletonVariantEnum.TEXT} width="48%" height={22} />
        </Stack>
      </Stack>
    </Stack>
  );
}

function TopCompanies({
  isAuthenticated,
  openForceLoginPopup,
}: {
  isAuthenticated: boolean;
  openForceLoginPopup: VoidFunction;
}) {
  const { HEADER_TEXT } = TOP_COMPANY_CARD_CONFIG;
  const scrollRef = useRef<HTMLDivElement>(null);
  const topCompaniesAPIData = useGetTopCompanies({
    queryFnParams: {
      pageLimit: 100,
    },
  });

  const topCompanies = useMemo(() => {
    const companies =
      (topCompaniesAPIData.data?.data?.data as CommonObjectType[]) || [];

    return companies
      .map((company) => {
        const postedJobsCount = Number(company?.posted_jobs_count || 0);
        const companyName = String(company?.company_name || "Company");
        const city = String(company?.city || "");
        const country = String(company?.country || "");
        const location = [city, country].filter(Boolean).join(", ");

        return {
          companyName,
          location: location || "Location not available",
          jobRole: `${postedJobsCount} ${
            postedJobsCount === 1 ? "job" : "jobs"
          } posted`,
          logo: String(company?.company_profile_image || ""),
          backgroundImage: String(company?.company_profile_image || ""),
          jobDetailLink: "",
          postedJobsCount,
        };
      })
      .sort((a, b) => (b.postedJobsCount || 0) - (a.postedJobsCount || 0))
      .slice(0, MAX_TOP_COMPANIES);
  }, [topCompaniesAPIData.data]);

  const cardStep = CARD_WIDTH + CARD_GAP * 4; // approx 316

  const handleSliderNext = () => {
    scrollRef.current?.scrollBy({ left: cardStep, behavior: "smooth" });
  };

  const handleSliderPrevious = () => {
    scrollRef.current?.scrollBy({ left: -cardStep, behavior: "smooth" });
  };

  const showNavButtons = topCompanies.length > 1;

  return (
    <>
      {/* Centred wrapper using plain div so mx-auto works */}
      <div
        style={{
          maxWidth: "1152px",
          margin: "0 auto",
          padding: "0 16px",
          width: "100%",
          minWidth: 0,
        }}
      >
        <Typography {...HEADER_TEXT()} />

        {/* Nav buttons — only on desktop when >3 cards */}
        <div className="hidden md:flex w-full items-center justify-end">
          <When condition={showNavButtons && topCompanies.length > 3}>
            <Stack stackProps={{ direction: "row" }}>
              <IconButton onClick={() => handleSliderPrevious()}>
                <ChevronLeftIcon />
              </IconButton>
              <IconButton onClick={() => handleSliderNext()}>
                <ChevronRightIcon />
              </IconButton>
            </Stack>
          </When>
        </div>

        {/* Scrollable row — native scroll on mobile */}
        <div
          ref={scrollRef}
          className="mb-10 py-2"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: CARD_GAP * 4,
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingBottom: 8,
          }}
        >
          <When condition={topCompaniesAPIData.isLoading}>
            {COMPANY_CARD_SKELETONS.map((_, index) => (
              <div
                key={`top-company-skeleton-${index}`}
                style={{ scrollSnapAlign: "start", flexShrink: 0 }}
              >
                <TopCompanyCardSkeleton />
              </div>
            ))}
          </When>
          <When condition={!topCompaniesAPIData.isLoading && topCompanies.length === 0}>
            <Typography
              typographyProps={{
                children: "No companies found",
                variant: TypographyVariantEnum.BODY2,
              }}
            />
          </When>
          <When condition={!topCompaniesAPIData.isLoading && topCompanies.length > 0}>
            {topCompanies.map((company: Company, index: number) => (
              <div
                key={index}
                style={{ scrollSnapAlign: "start", flexShrink: 0 }}
              >
                <HomePage
                  isAuthenticated={isAuthenticated}
                  openForceLoginPopup={openForceLoginPopup}
                  company={company}
                />
              </div>
            ))}
          </When>
        </div>
      </div>
    </>
  );
}

export default TopCompanies;
