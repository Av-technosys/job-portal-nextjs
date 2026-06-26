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
  const handleFilterChange = (filterChange: string | null) => {
    setFilterSearch(filterChange);
  };
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
      <BreadcrumbRibbon
        isFilterOpen={isFilterOpen}
        onSearchChange={handleSearchChange}
        pathname={pathname}
      />
      <Stack
        stackProps={{
          direction: { xs: "column", md: "row" },
          gap: { xs: 2, md: 1 },
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Stack
          stackProps={{
            direction: "row",
            gap: 1,
            alignItems: totalLength === 0 ? "center" : "baseline",
            flexWrap: "wrap",
          }}
        >
          <When condition={totalLength !== 0}>
            <Typography 
              {...TITLE_COUNT(totalLength)} 
              typographyProps={{ ...TITLE_COUNT(totalLength).typographyProps, sx: { fontSize: { xs: 24, md: 28 }, fontWeight: 700 } }} 
            />
          </When>
          <When condition={totalLength === 0}>
            <Skeleton variant={SkeletonVariantEnum.TEXT} />
          </When>
          <Typography 
            {...TITLE_HEADER(totalLength)} 
            typographyProps={{ ...TITLE_HEADER(totalLength).typographyProps, sx: { fontSize: { xs: 18, md: 22 }, color: "#566276" } }} 
          />
        </Stack>
        
        <Stack
          stackProps={{ 
            direction: "row", 
            gap: 1.5, 
            alignItems: "center",
            width: { xs: "100%", md: "auto" },
            justifyContent: { xs: "space-between", md: "flex-end" }
          }}
        >
          <FilterButton
            isFilterOpen={isFilterOpen}
            setIsFilterOpen={setIsFilterOpen}
            handleFilterChange={handleFilterChange}
          />
          <Dropdown
            {...JOB_LISTING_SORT_DROPDOWN}
            onChange={handleSortChange}
            value={selectedSort?.[0]}
            selectProps={{
              ...JOB_LISTING_SORT_DROPDOWN.selectProps,
              sx: { height: "40px", borderRadius: 2, ...(JOB_LISTING_SORT_DROPDOWN.selectProps as any)?.sx }
            }}
          />
        </Stack>
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
    </>
  );
}

export default Jobs;
