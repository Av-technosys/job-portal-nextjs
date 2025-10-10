import React, { useMemo, useState } from "react";
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

  const [searchedData, setSearchedData] = useState(null);

  const queryClient = useQueryClient();
  const router = useRouter();
  const { pathname } = useRouter();

  const { showNotification } = useNotification();
  const createSaveJobMutate = useCreateSavedJob();
  const deleteSaveJobMutate = useDeleteSavedJob();
  const { userType } = useCommonDetails();

  function showSearchedData(data: any) {
    setSearchedData(data?.apiData?.data?.pages[0]?.data?.data);
  }

  function onSaveUnSaveMutateSuccess({ job }: { job: CommonObjectType }) {
    const jobListingQueryKey = getInfiniteJobListQueryOptions({
      pageLimit: PAGIANTION_LIMIT,
      sort: selectedSort,
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
  const jobInfoAPIData = useGetJobList({
    queryFnParams: {
      pageLimit: PAGIANTION_LIMIT,
      sort: selectedSort,
    },
  });

  const { paginatedInfoData, hasMore, totalLength } = usePagination({
    paginatedAPIData: jobInfoAPIData,
  });

  return (
    <>
      <BreadcrumbRibbon
        showSearchedData={showSearchedData}
        pathname={pathname}
      />
      <Stack
        stackProps={{
          direction: "row",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between", // Ensures space between text and dropdown
          width: "100%", // Ensures the stack spans the full width
        }}
      >
        <Stack
          stackProps={{
            direction: "row",
            gap: 1,
            alignItems: totalLength === 0 ? "center" : "baseline",
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
          stackProps={{ direction: "row", gap: 1, alignItems: "baseline" }}
        >
          <FilterButton />
          <Dropdown
            {...JOB_LISTING_SORT_DROPDOWN}
            onChange={handleSortChange}
            value={selectedSort?.[0]}
          />
        </Stack>
      </Stack>
      <InfinitePagination
        dataLength={paginatedInfoData?.length}
        next={jobInfoAPIData?.fetchNextPage}
        hasMore={hasMore}
        isFetchingMore={jobInfoAPIData?.isFetchingNextPage}
      >
        <Stack>
          {Array.isArray(searchedData) && searchedData.length > 0
            ? searchedData?.map((job) => (
                <JobCard
                  job={job}
                  key={`jobs-${job?.id}-${job?.is_saved}`}
                  handleSaveUnSave={handleSaveUnSave}
                  showSaveUnSaveButton={showSaveUnSaveButton}
                  handleJobDetailsClick={handleJobDetailsClick}
                />
              ))
            : paginatedInfoData?.map((job) => (
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
    </>
  );
}
export default Jobs;
