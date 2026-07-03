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
          <Stack
            stackProps={{
              direction: "row",
              gap: 1,
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Stack
              stackProps={{
                direction: "row",
                gap: 1,
                alignItems: totalLength === 0 ? "center" : "baseline",
                visibility: { xs: "hidden", md: "visible" },
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
            <Stack
              stackProps={{ direction: "row", gap: 1, alignItems: "center" }}
            >
              <div className="block md:hidden">
                <FilterButton
                  isFilterOpen={isFilterOpen}
                  setIsFilterOpen={setIsFilterOpen}
                  handleFilterChange={handleFilterChange}
                />
              </div>
              <span className="text-xs font-semibold text-slate-600 shrink-0 self-center">
                Sort by:
              </span>
              <Dropdown
                {...JOB_LISTING_SORT_DROPDOWN}
                onChange={handleSortChange}
                value={selectedSort?.[0]}
              />
            </Stack>
          </Stack>
          <Stack
            stackProps={{
              direction: "row",
              gap: 1,
              alignItems: totalLength === 0 ? "center" : "baseline",
              visibility: { xs: "visible", md: "hidden" },
              justifyItems: "flex-end",
              mt: "10px",
              className: "w-full",
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
          {paginatedInfoData[0] != undefined ? (
            <InfinitePagination
              dataLength={paginatedInfoData?.length}
              next={jobInfoAPIData?.fetchNextPage}
              hasMore={hasMore}
              isFetchingMore={jobInfoAPIData?.isFetchingNextPage}
            >
              <Stack>
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
          ) : (
            <div className="text-xl font-bold">No Job Found</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Jobs;
