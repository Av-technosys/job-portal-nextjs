import React, { useCallback, useMemo, useState } from "react";
import {
  useDeleteSavedJob,
  useCreateSavedJob,
  useGetJobList,
  useNotification,
  usePagination,
  useCommonDetails,
  getInfiniteJobListQueryOptions,
} from "@/services";
import {
  Dropdown,
  InfinitePagination,
  Loader,
  Skeleton,
  Stack,
  Typography,
  When,
} from "../common";
import {
  JOB_DETAILS_URL,
  LIST_JOB_PAGE_CONFIG,
  PAGIANTION_LIMIT,
} from "@/constants";
import JobCard from "./JobCard";
import { SelectChangeEvent } from "@mui/material";
import {
  CommonObjectType,
  JobListSortEnum,
  SkeletonVariantEnum,
} from "@/types";
import FilterButton from "../JobFilter";
import BreadcrumbRibbon from "../Header/BreadcrumbRibbon";
import { useQueryClient } from "@tanstack/react-query";
import {
  getErrorMessageFromAPI,
  isLoggedInUserJobSeeker,
  isUserAuthenticated,
  mutateJobListQueryDataForSavedJobs,
} from "@/helper";
import { useRouter } from "next/router";
import { JobSearchBar, JobFilterSidebar } from "@/components";
function Jobs() {
  const {
    TITLE_COUNT,
    TITLE_HEADER,
    JOB_LISTING_SORT_DROPDOWN,
    JOB_LIST_CARD,
  } = LIST_JOB_PAGE_CONFIG;
  const { NOTIFICATION_CONFIG } = JOB_LIST_CARD;

  const [selectedSort, setSelectedSort] = useState<JobListSortEnum[]>([
    JobListSortEnum.CREATED_DATE_DESC,
  ]);

  const [filterSearch, setFilterSearch] = useState("");
  const [searchString, setSearchString] = useState("");

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const queryClient = useQueryClient();
  const router = useRouter();
  const { pathname } = useRouter();

  const { showNotification } = useNotification();
  const createSaveJobMutate = useCreateSavedJob();
  const deleteSaveJobMutate = useDeleteSavedJob();
  const { userType } = useCommonDetails();

  const handleSearchChange = useCallback((nextSearchString: string) => {
    setSearchString(nextSearchString);
  }, []);

  function onSaveUnSaveMutateSuccess({ job }: { job: CommonObjectType }) {
    const jobListingQueryKey = getInfiniteJobListQueryOptions({
      pageLimit: PAGIANTION_LIMIT,
      sort: selectedSort,
      search: searchString,
      filterSearch,
    }).queryKey;
    // Update the cache to reflect the changes on UI
    queryClient.setQueryData(jobListingQueryKey, (oldData) =>
      mutateJobListQueryDataForSavedJobs({ oldData, job })
    );
  }

  const onSaveClick = (job: CommonObjectType) => {
    createSaveJobMutate.mutate(
      { job: job.id as number },
      {
        onSuccess: () => {
          onSaveUnSaveMutateSuccess({ job });
          showNotification(NOTIFICATION_CONFIG.SUCCESS);
        },
        onError: (error) => {
          showNotification({
            ...getErrorMessageFromAPI(error),
          });
          console.error(error, "error");
        },
      }
    );
  };

  const onUnSaveClick = (job: CommonObjectType) => {
    deleteSaveJobMutate.mutate(Number(job.id), {
      onSuccess: () => {
        onSaveUnSaveMutateSuccess({ job });
        showNotification(NOTIFICATION_CONFIG.DELETE_SUCCESS);
      },
      onError: (error) => {
        showNotification({
          ...getErrorMessageFromAPI(error),
        });
        console.error(error, "error");
      },
    });
  };

  function handleSaveUnSave(job: CommonObjectType) {
    if (job && job?.id) {
      if (job?.is_saved) {
        onUnSaveClick(job);
      } else {
        onSaveClick(job);
      }
    }
  }

  function handleJobDetailsClick(job: CommonObjectType) {
    if (job?.id !== undefined) {
      router.push({
        pathname: `${JOB_DETAILS_URL}`,
        query: { id: job.id as number },
      });
    }
  }

  const showSaveUnSaveButton = useMemo(() => {
    // Hide Button When User is Not Logged In
    return (
      isUserAuthenticated() &&
      userType !== -1 &&
      isLoggedInUserJobSeeker({ userType })
    );
  }, [userType]);

  const handleSortChange = (event: SelectChangeEvent<unknown>) => {
    const newSort = event.target.value;
    setSelectedSort([newSort] as JobListSortEnum[]);
  };
  
  const handleFilterChange = useCallback((filterChange: string | null) => {
    setFilterSearch(filterChange || "");
  }, []);
  
  const jobInfoAPIData = useGetJobList({
    queryFnParams: {
      pageLimit: PAGIANTION_LIMIT,
      sort: selectedSort,
      filterSearch: filterSearch,
      search: searchString,
    },
  });

  const { paginatedInfoData, hasMore, totalLength } = usePagination({
    paginatedAPIData: jobInfoAPIData,
  });

  if (
  jobInfoAPIData.isLoading &&
  paginatedInfoData.length === 0
) {
  return (
    <Loader
      loaderProps={{
        open: true,
      }}
    />
  );
}

  return (
    <>
      <JobSearchBar onSearch={(searchObj) => {
        handleSearchChange(searchObj.skills.trim());
        
        let newFilter = filterSearch || "";
        newFilter = newFilter.replace(/&experience=[^&]*/g, '');
        newFilter = newFilter.replace(/&location=[^&]*/g, '');
        
        if (searchObj.experience) {
           newFilter += `&experience=${searchObj.experience}`;
        }
        if (searchObj.location) {
           newFilter += `&location=${searchObj.location}`;
        }
        
        if (newFilter !== filterSearch) {
          handleFilterChange(newFilter);
        }
      }} />

      <div className="max-w-[22rem] md:max-w-[45rem] lg:max-w-6xl mx-auto flex flex-col md:flex-row gap-6 mt-8 mb-12 w-full px-2 sm:px-4">
        <div className="hidden md:block w-full md:w-1/4">
          <JobFilterSidebar handleFilterChange={handleFilterChange} />
        </div>
        <div className="w-full md:w-3/4 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
            {/* Subtle "Updating" pill — shows only when re-fetching with existing data */}
            {jobInfoAPIData.isFetching && paginatedInfoData.length > 0 && (
              <div
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 w-fit"
                style={{ animation: "pulse 1.5s cubic-bezier(0.4,0,0.6,1) infinite" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                  style={{ animation: "ping 1s linear infinite", display: "inline-block" }}
                />
                Updating results…
              </div>
            )}

            {/* Job count - hidden on xs, visible on md+ */}
            <Stack
              stackProps={{
                direction: "row",
                gap: 1,
                alignItems: totalLength === 0 ? "center" : "baseline",
                sx: { display: { xs: "none", md: "flex" } },
              }}
            >
              <When condition={totalLength !== 0}>
                <Typography {...TITLE_COUNT(totalLength)} />
              </When>
              <When condition={totalLength === 0}>
                <Skeleton variant={SkeletonVariantEnum.TEXT} />
              </When>
              <Typography {...TITLE_HEADER(totalLength)} />
            </Stack>

            {/* Mobile: Filter button + Sort dropdown in a row */}
            <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto">
              <div className="block md:hidden flex-shrink-0">
                <FilterButton
                  isFilterOpen={isFilterOpen}
                  setIsFilterOpen={setIsFilterOpen}
                  handleFilterChange={handleFilterChange}
                />
              </div>
              <div className="flex items-center gap-2 flex-1 sm:flex-none min-w-0">
                <span className="text-xs font-semibold text-slate-600 shrink-0 whitespace-nowrap">
                  Sort by:
                </span>
                <div className="flex-1 min-w-0 max-w-[200px]">
                  <Dropdown
                    {...JOB_LISTING_SORT_DROPDOWN}
                    onChange={handleSortChange}
                    value={selectedSort?.[0]}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Job count visible on mobile */}
          <Stack
            stackProps={{
              direction: "row",
              gap: 1,
              alignItems: totalLength === 0 ? "center" : "baseline",
              sx: { display: { xs: "flex", md: "none" }, mt: "4px" },
            }}
          >
            <When condition={totalLength !== 0}>
              <Typography {...TITLE_COUNT(totalLength)} />
            </When>
            <When condition={totalLength === 0}>
              <Skeleton variant={SkeletonVariantEnum.TEXT} />
            </When>
            <Typography {...TITLE_HEADER(totalLength)} />
          </Stack>
          {jobInfoAPIData.isFetching && paginatedInfoData.length === 0 ? (
            <Loader loaderProps={{ open: true }} />
          ) : paginatedInfoData.length > 0 ? (
            <div className="relative">
              {/* Shimmer sweep bar — visible only during re-fetch */}
              {jobInfoAPIData.isFetching && (
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] z-10 overflow-hidden rounded-full"
                  style={{ background: "#e0e7ff" }}
                >
                  <div
                    className="h-full w-1/3 rounded-full"
                    style={{
                      background: "linear-gradient(90deg, transparent, #6366f1, transparent)",
                      animation: "shimmerSweep 1.2s ease-in-out infinite",
                    }}
                  />
                </div>
              )}
              <style>{`
                @keyframes shimmerSweep {
                  0%   { transform: translateX(-200%); }
                  100% { transform: translateX(500%); }
                }
              `}</style>
              <InfinitePagination
                dataLength={paginatedInfoData?.length}
                next={jobInfoAPIData?.fetchNextPage}
                hasMore={hasMore}
                isFetchingMore={jobInfoAPIData?.isFetchingNextPage}
              >
                <Stack
                  stackProps={{
                    sx: { opacity: jobInfoAPIData.isFetching ? 0.6 : 1, transition: "opacity 0.25s ease" },
                  }}
                >
                  {paginatedInfoData?.map((job) => (
                    <JobCard
                      job={job}
                      key={`jobs-${job?.id}-${job?.is_saved}`}
                      handleSaveUnSave={handleSaveUnSave}
                      showSaveUnSaveButton={showSaveUnSaveButton}
                      handleJobDetailsClick={handleJobDetailsClick}
                    />
                  ))}
                </Stack>
              </InfinitePagination>
            </div>
          ) : jobInfoAPIData.isFetched ? (
            <div className="text-xl font-bold">No Job Found</div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Jobs;
