import React, { useMemo, useState } from "react";
import { IconButton, Skeleton, Stack, Typography, When } from "../common";
import LatestJobCard from "../LatestJobCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@/assets";
import { useGetJobList, usePagination } from "@/services";
import {
  CommonObjectType,
  JobListSortEnum,
  SkeletonVariantEnum,
  TypographyFontColor,
  TypographyFontSize,
  TypographyVariantEnum,
} from "@/types";

const MAX_LATEST_JOBS = 6;
const EMPTY_JOB_ROLE_FILTERS: string[] = [];
const LATEST_JOB_CARD_WIDTH = "300px";
const LATEST_JOB_CARD_MIN_HEIGHT = "300px";
const LATEST_JOB_CARD_GAP = 16;
const LATEST_JOB_CARD_SKELETONS = Array.from({ length: 4 });

function LatestJobCardSkeleton() {
  return (
    <Stack
      stackProps={{
        direction: "column",
        width: LATEST_JOB_CARD_WIDTH,
        minHeight: LATEST_JOB_CARD_MIN_HEIGHT,
        className: "rounded-lg p-5 shrink-0",
        justifyContent: "space-between",
        sx: {
          background: "#FFFFFF",
          border: "1px solid #E6EAF2",
        },
      }}
    >
      <Stack stackProps={{ gap: 2 }}>
        <Stack
          stackProps={{
            direction: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <Stack stackProps={{ gap: 1, width: "100%" }}>
            <Skeleton
              variant={SkeletonVariantEnum.TEXT}
              width="80%"
              height={28}
            />
            <Skeleton
              variant={SkeletonVariantEnum.TEXT}
              width="60%"
              height={22}
            />
          </Stack>
          <Skeleton
            variant={SkeletonVariantEnum.RECTANGULAR}
            width={70}
            height={30}
          />
        </Stack>

        <Stack stackProps={{ gap: 1 }}>
          <Skeleton
            variant={SkeletonVariantEnum.TEXT}
            width="45%"
            height={18}
          />
          <Skeleton
            variant={SkeletonVariantEnum.TEXT}
            width="70%"
            height={24}
          />
        </Stack>
      </Stack>

      <Skeleton variant={SkeletonVariantEnum.TEXT} width="40%" height={22} />

      <Stack
        stackProps={{
          direction: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1.5,
          className: "pt-4",
          sx: {
            borderTop: "1px solid #EEF2F6",
          },
        }}
      >
        <Stack
          stackProps={{
            direction: "row",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Skeleton
            variant={SkeletonVariantEnum.CIRCULAR}
            width={40}
            height={40}
          />
          <Stack stackProps={{ gap: 0.5 }}>
            <Skeleton
              variant={SkeletonVariantEnum.TEXT}
              width={100}
              height={20}
            />
            <Skeleton
              variant={SkeletonVariantEnum.TEXT}
              width={70}
              height={18}
            />
          </Stack>
        </Stack>

        <Skeleton
          variant={SkeletonVariantEnum.CIRCULAR}
          width={34}
          height={34}
        />
      </Stack>
    </Stack>
  );
}

interface JobOpportunityProps {
  jobRoleFilters?: string[];
}

function JobOpportunity({
  jobRoleFilters = EMPTY_JOB_ROLE_FILTERS,
}: JobOpportunityProps) {
  const [slideCount, setSlideCount] = useState(0);
  const hasCategoryFilter = jobRoleFilters.length > 0;

  const jobInfoAPIData = useGetJobList({
    queryFnParams: {
      pageLimit: MAX_LATEST_JOBS,
      sort: [JobListSortEnum.CREATED_DATE_DESC],
      filterSearch: hasCategoryFilter
        ? jobRoleFilters
            .map((role) => `&category=${encodeURIComponent(role)}`)
            .join("")
        : "",
    },
  });

  const { paginatedInfoData: jobs } = usePagination({
    paginatedAPIData: jobInfoAPIData,
  });

  const latestJobs = useMemo(() => {
    return (jobs as CommonObjectType[])
      .filter(Boolean)
      .filter((job) =>
        hasCategoryFilter ? jobRoleFilters.includes(String(job?.role || "")) : true
      )
      .slice(0, MAX_LATEST_JOBS);
  }, [jobs, hasCategoryFilter, jobRoleFilters]);

  const isLoading = jobInfoAPIData.isLoading;
  const showSlider = latestJobs.length > 3;

  const handleSliderNext = () => {
    setSlideCount((prev) => (prev < latestJobs.length - 3 ? prev + 1 : prev));
  };

  const handleSliderPrevious = () => {
    setSlideCount((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const cardStep = parseInt(LATEST_JOB_CARD_WIDTH, 10) + LATEST_JOB_CARD_GAP;

  return (
    <div className="w-full">
      <div className="w-full flex min-h-12 justify-end pr-10 md:pr-0">
        <When condition={showSlider}>
          <Stack stackProps={{ direction: "row", width: "10%" }}>
            <IconButton onClick={handleSliderPrevious}>
              <ChevronLeftIcon />
            </IconButton>
            <IconButton onClick={handleSliderNext}>
              <ChevronRightIcon />
            </IconButton>
          </Stack>
        </When>
      </div>

      <div className="w-full mb-8 overflow-hidden py-2">
        <When condition={isLoading}>
          <div
            style={{
              display: "grid",
              gridAutoFlow: "column",
              gridAutoColumns: LATEST_JOB_CARD_WIDTH,
              justifyContent: "start",
              columnGap: LATEST_JOB_CARD_GAP,
              width: "100%",
            }}
          >
            {LATEST_JOB_CARD_SKELETONS.map((_, index) => (
              <LatestJobCardSkeleton key={`latest-job-skeleton-${index}`} />
            ))}
          </div>
        </When>

        <When condition={!isLoading && latestJobs.length === 0}>
          <Typography
            typographyProps={{
              children: hasCategoryFilter
                ? "No jobs in this category"
                : "No jobs found",
              variant: TypographyVariantEnum.BODY2,
              className: "w-full",
            }}
            fontSize={TypographyFontSize.small}
            fontColor={TypographyFontColor.grey}
          />
        </When>

        <When condition={!isLoading && latestJobs.length > 0}>
          <div
            className="transition-transform duration-500"
            style={{
              display: "grid",
              gridAutoFlow: "column",
              gridAutoColumns: LATEST_JOB_CARD_WIDTH,
              justifyContent: "start",
              columnGap: LATEST_JOB_CARD_GAP,
              width: "100%",
              transform: showSlider
                ? `translateX(-${slideCount * cardStep}px)`
                : "translateX(0)",
            }}
          >
            {latestJobs.map((job, index) => (
              <div key={String(job?.id || index)} className="shrink-0">
                <LatestJobCard job={job} index={index} />
              </div>
            ))}
          </div>
        </When>
      </div>
    </div>
  );
}

export default JobOpportunity;
