import React, { useMemo, useState } from "react";
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
  const [slideCount, setSlideCount] = useState(0);
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

  const handleSliderNext = () => {
    setSlideCount((prev) => (prev < topCompanies.length - 3 ? prev + 1 : prev));
  };

  const handleSliderPrevious = () => {
    setSlideCount((prev) => prev > 0 && prev - 1);
  };

  return (
    <>
      <div
        className="p-3 max-w-[22rem] md:max-w-[45rem] lg:max-w-6xl mx-auto"
        style={{
          width: "100%",
        }}
      >
        <Typography {...HEADER_TEXT()} />
        <div className="w-full flex items-center justify-end pr-10 md:pr-0">
          <When condition={topCompanies.length > 3}>
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
          </When>
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
              justifyContent: "flex-start",
              gap: 1,
              className: "w-full overflow-hidden py-2",
            }}
          >
            <When condition={topCompaniesAPIData.isLoading}>
              {COMPANY_CARD_SKELETONS.map((_, index) => (
                <TopCompanyCardSkeleton key={`top-company-skeleton-${index}`} />
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
                  className=" transition-transform duration-500"
                  style={{ transform: `translateX(-${slideCount * 100}%)` }}
                >
                  <HomePage
                    isAuthenticated={isAuthenticated}
                    openForceLoginPopup={openForceLoginPopup}
                    company={company}
                  />
                </div>
              ))}
            </When>
          </Stack>
        </Stack>
      </div>
    </>
  );
}

export default TopCompanies;
