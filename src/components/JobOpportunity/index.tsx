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
const LATEST_JOB_CARD_SKELETONS = Array.from({ length: 3 });

function LatestJobCardSkeleton() {
  return (
    <Stack
      stackProps={{
        direction: "column",
        width: "300px",
        minHeight: "360px",
        className: "rounded-lg p-5",
        justifyContent: "space-between",
        sx: {
          position: "relative",
          overflow: "hidden",
          background: "#FFFFFF",
          border: "1px solid #E6EAF2",
          boxShadow: "none",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "#E6EAF2",
          },
        },
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
              height={28}
            />
            <Skeleton
              variant={SkeletonVariantEnum.TEXT}
              width="58%"
              height={24}
            />
          </Stack>
          <Skeleton
            variant={SkeletonVariantEnum.RECTANGULAR}
            width={78}
            height={30}
          />
        </Stack>

        <Stack
          stackProps={{
            gap: 0.75,
          }}
        >
          <Skeleton variant={SkeletonVariantEnum.TEXT} width="44%" height={18} />
          <Skeleton variant={SkeletonVariantEnum.TEXT} width="68%" height={28} />
        </Stack>
      </Stack>

      <Skeleton variant={SkeletonVariantEnum.TEXT} width="42%" height={22} />

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
            width: "100%",
          }}
        >
          <Skeleton
            variant={SkeletonVariantEnum.CIRCULAR}
            width={40}
            height={40}
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
              height={20}
            />
            <Skeleton
              variant={SkeletonVariantEnum.TEXT}
              width="42%"
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
      </When>
      <Stack
        stackProps={{
          direction: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 1,
          className: "w-full max-w-6xl mb-8 overflow-hidden py-2",
        }}
      >
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
              className=" transition-transform duration-500"
              style={{ transform: `translateX(-${slideCount * 100}%)` }}
            >
              <LatestJobCard job={job} index={jobIndex} />
            </div>
          ))}
        </When>
      </Stack>
    </>
  );
}

export default JobOpportunity;
