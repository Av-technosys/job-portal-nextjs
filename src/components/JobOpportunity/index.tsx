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
const LATEST_JOB_CARD_SKELETONS = Array.from({ length: 4 });

function LatestJobCardSkeleton() {
  return (
    <Stack
      stackProps={{
        direction: "column",
        width: "300px",
        minHeight: "300px",
        className: "rounded-2xl p-6",
        sx: {
          position: "relative",
          overflow: "hidden",
          background: "#FFFFFF",
          border: "1px solid #E2E8F0",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02)",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #E2E8F0 0%, #CBD5E1 50%, #E2E8F0 100%)",
          },
        },
      }}
    >
      <Stack
        stackProps={{
          className: "w-full h-full",
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        <Stack
          stackProps={{
            gap: 2,
          }}
        >
          <Stack
            stackProps={{
              direction: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Stack
              stackProps={{
                width: "100%",
                gap: 1,
              }}
            >
              <Skeleton
                variant={SkeletonVariantEnum.TEXT}
                width="82%"
                height={26}
              />
              <Skeleton
                variant={SkeletonVariantEnum.TEXT}
                width="58%"
                height={22}
              />
            </Stack>
            <Skeleton
              variant={SkeletonVariantEnum.RECTANGULAR}
              width={78}
              height={28}
              sx={{ borderRadius: "999px", flexShrink: 0 }}
            />
          </Stack>

          <Stack
            stackProps={{
              gap: 0.75,
            }}
          >
            <Skeleton variant={SkeletonVariantEnum.TEXT} width="44%" height={16} />
            <Skeleton variant={SkeletonVariantEnum.TEXT} width="68%" height={24} />
          </Stack>
        </Stack>

        <Stack
          stackProps={{
            direction: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Skeleton
            variant={SkeletonVariantEnum.CIRCULAR}
            width={18}
            height={18}
            sx={{ flexShrink: 0 }}
          />
          <Skeleton variant={SkeletonVariantEnum.TEXT} width="42%" height={18} />
        </Stack>

        <Stack
          stackProps={{
            className: "pt-4",
            direction: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1.5,
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
              minWidth: 0,
              width: "100%",
            }}
          >
            <Skeleton
              variant={SkeletonVariantEnum.CIRCULAR}
              width={40}
              height={40}
              sx={{ flexShrink: 0 }}
            />
            <Stack
              stackProps={{
                gap: 0.5,
                width: "100%",
              }}
            >
              <Skeleton
                variant={SkeletonVariantEnum.TEXT}
                width="62%"
                height={18}
              />
              <Skeleton
                variant={SkeletonVariantEnum.TEXT}
                width="42%"
                height={16}
              />
            </Stack>
          </Stack>
          <Skeleton
            variant={SkeletonVariantEnum.CIRCULAR}
            width={36}
            height={36}
            sx={{ flexShrink: 0 }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}

interface JobOpportunityProps {
  jobRoleFilters?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      filterSearch: jobRoleFilters
        .map((role) => `&category=${encodeURIComponent(role)}`)
        .join(""),
    },
  });

  const fallbackJobInfoAPIData = useGetJobList({
    queryFnParams: {
      pageLimit: MAX_LATEST_JOBS,
      sort: [JobListSortEnum.CREATED_DATE_DESC],
      enabled: hasCategoryFilter,
    },
  });

  const { paginatedInfoData: categoryJobs } = usePagination({
    paginatedAPIData: jobInfoAPIData,
  });

  const { paginatedInfoData: fallbackJobs } = usePagination({
    paginatedAPIData: fallbackJobInfoAPIData,
  });

  const categoryLatestJobs = useMemo(() => {
    return (categoryJobs as CommonObjectType[])
      .filter(Boolean)
      .filter((job) =>
        hasCategoryFilter
          ? jobRoleFilters.includes(String(job?.role || ""))
          : true
      )
      .slice(0, MAX_LATEST_JOBS);
  }, [categoryJobs, hasCategoryFilter, jobRoleFilters]);

  const fallbackLatestJobs = useMemo(() => {
    return (fallbackJobs as CommonObjectType[])
      .filter(Boolean)
      .slice(0, MAX_LATEST_JOBS);
  }, [fallbackJobs]);

  const latestJobs = useMemo(() => {
    if (!hasCategoryFilter) {
      return categoryLatestJobs;
    }

    const selectedJobIds = new Set(
      categoryLatestJobs.map((job) => String(job?.id || job?.job_id || ""))
    );

    const topUpJobs = fallbackLatestJobs.filter((job) => {
      const jobId = String(job?.id || job?.job_id || "");

      if (!jobId || selectedJobIds.has(jobId)) {
        return false;
      }

      selectedJobIds.add(jobId);
      return true;
    });

    return [...categoryLatestJobs, ...topUpJobs].slice(0, MAX_LATEST_JOBS);
  }, [categoryLatestJobs, fallbackLatestJobs, hasCategoryFilter]);

  const isLoading =
    jobInfoAPIData.isLoading ||
    (hasCategoryFilter &&
      categoryLatestJobs.length < MAX_LATEST_JOBS &&
      fallbackJobInfoAPIData.isLoading);

  const handleSliderNext = () => {
    setSlideCount((prev) => (prev < latestJobs.length - 3 ? prev + 1 : prev));
  };

  const handleSliderPrevious = () => {
    setSlideCount((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <>
      <When condition={latestJobs.length > 3}>
        <div className="w-full flex items-center justify-end pr-10 md:pr-0 mb-4">
          <Stack
            stackProps={{
              direction: "row",
              gap: 1.5,
            }}
          >
            <IconButton
              onClick={() => handleSliderPrevious()}
              className="bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200 rounded-full shadow-md hover:shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 w-10 h-10 flex items-center justify-center"
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              onClick={() => handleSliderNext()}
              className="bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200 rounded-full shadow-md hover:shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 w-10 h-10 flex items-center justify-center"
            >
              <ChevronRightIcon />
            </IconButton>
          </Stack>
        </div>
      </When>
      <div className="w-full overflow-x-auto md:overflow-visible py-8 -my-8">
        <div className="flex flex-row gap-3 md:gap-2 pb-2 md:pb-0 min-w-0">
          <When condition={isLoading}>
            {LATEST_JOB_CARD_SKELETONS.map((_, index) => (
              <LatestJobCardSkeleton key={`latest-job-skeleton-${index}`} />
            ))}
          </When>
          <When condition={!isLoading && latestJobs.length === 0}>
            <Typography
              typographyProps={{
                children: "No jobs found",
                variant: TypographyVariantEnum.BODY2,
              }}
              fontSize={TypographyFontSize.small}
              fontColor={TypographyFontColor.grey}
            />
          </When>
          <When condition={!isLoading && latestJobs.length > 0}>
            {latestJobs.map((job, jobIndex) => (
              <div
                key={String(job?.id || jobIndex)}
                className="transition-transform duration-500 flex-shrink-0"
                style={{ transform: `translateX(-${slideCount * 100}%)` }}
              >
                <LatestJobCard job={job} index={jobIndex} />
              </div>
            ))}
          </When>
        </div>
      </div>
    </>
  );
}

export default JobOpportunity;
