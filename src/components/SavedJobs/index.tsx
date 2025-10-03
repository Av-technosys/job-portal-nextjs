import React from "react";
import {
  getInfiniteSaveJobQueryOptions,
  useDeleteSavedJob,
  useGetSaveJob,
  useJobApply,
  useNotification,
  usePagination,
} from "@/services";
import { InfinitePagination, Stack, Typography, When, Loader } from "../common";
import { SAVED_JOB_PAGE_COFIG, PAGIANTION_LIMIT } from "@/constants";
import SavedJobCard from "./SavedJobCard";
import { CommonObjectType } from "@/types";
import {
  getErrorMessageFromAPI,
  isJobEligibleForSubmission,
  mutateJobListQueryDataForAppliedJobs,
  mutateSavedJobListQueryDataForSavedJobs,
} from "@/helper";
import { useQueryClient } from "@tanstack/react-query";
import EmptySavedJobs from "../EmptyStates/EmptySavedjob";

function SavedJobs() {
  const { TITLE_COUNT, TITLE_HEADER, JOB_SAVE_CARD } = SAVED_JOB_PAGE_COFIG;
  const { NOTIFICATION_CONFIG } = JOB_SAVE_CARD;
  const { showNotification } = useNotification();
  const jobApplyMutate = useJobApply();
  const deleteSavedJobMutate = useDeleteSavedJob();
  const queryClient = useQueryClient();

  function onUnSaveMutateSuccess({ job }: { job: CommonObjectType }) {
    const savedJobListingQueryKey = getInfiniteSaveJobQueryOptions({
      pageLimit: PAGIANTION_LIMIT,
    }).queryKey;

    // Update the cache to reflect the changes on UI
    queryClient.setQueryData(savedJobListingQueryKey, (oldData) =>
      mutateSavedJobListQueryDataForSavedJobs({ oldData, job })
    );
  }

  function onJobApplyMutateSuccess({ job }: { job: CommonObjectType }) {
    const savedJobListingQueryKey = getInfiniteSaveJobQueryOptions({
      pageLimit: PAGIANTION_LIMIT,
    }).queryKey;

    // Update the cache to reflect the changes on UI
    queryClient.setQueryData(savedJobListingQueryKey, (oldData) =>
      mutateJobListQueryDataForAppliedJobs({ oldData, job })
    );
  }

  function onApplyClick(job: CommonObjectType) {
    if (isJobEligibleForSubmission(job)) {
      jobApplyMutate.mutate(
        {
          data: {
            job: job.id as number,
          },
        },
        {
          onSuccess: () => {
            onJobApplyMutateSuccess({ job });
            showNotification(NOTIFICATION_CONFIG.APPLIED);
          },
          onError: (error) => {
            showNotification({
              ...getErrorMessageFromAPI(error),
            });
            console.error(error, "error");
          },
        }
      );
    }
  }

  const onUnSaveClick = (job: CommonObjectType) => {
    if (job?.id !== undefined) {
      deleteSavedJobMutate.mutate(job?.id as number, {
        onSuccess: () => {
          onUnSaveMutateSuccess({ job });
          showNotification(NOTIFICATION_CONFIG.DELETE_SUCCESS);
        },
        onError: (error) => {
          showNotification({
            ...getErrorMessageFromAPI(error),
          });
          console.error(error, "error");
        },
      });
    }
  };

  const jobSaveAPIData = useGetSaveJob({
    queryFnParams: {
      pageLimit: PAGIANTION_LIMIT,
    },
  });

  const { paginatedInfoData, hasMore, totalLength } = usePagination({
    paginatedAPIData: jobSaveAPIData,
  });

  return (
    <>
      <When condition={jobSaveAPIData?.isLoading || jobSaveAPIData?.isFetching}>
        <Loader loaderProps={{ open: true }} />
      </When>
      <Stack
        stackProps={{
          direction: "row",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between", // Ensures space between text and dropdown
          width: "100%", // Ensures the stack spans the full width
          paddingBottom: 5,
        }}
      >
        <Stack
          stackProps={{
            direction: "row",
            gap: 1,
            alignItems: "baseline",
          }}
        >
          <When condition={totalLength !== 0}>
            <>
              <Typography {...TITLE_COUNT(totalLength)} />
              <Typography {...TITLE_HEADER(totalLength)} />
            </>
          </When>
        </Stack>
      </Stack>
      <When condition={totalLength > 0}>
        <InfinitePagination
          dataLength={paginatedInfoData?.length}
          next={jobSaveAPIData?.fetchNextPage}
          hasMore={hasMore}
          isFetchingMore={jobSaveAPIData?.isFetchingNextPage}
        >
          <Stack>
            {paginatedInfoData?.map((job) => (
              <SavedJobCard
                job={job}
                key={`savedJobCard-${job?.id}-${job?.status}`}
                handleApplyClick={onApplyClick}
                handleUnSaveClick={onUnSaveClick}
              />
            ))}
          </Stack>
        </InfinitePagination>
      </When>

      <When condition={jobSaveAPIData?.isFetched && totalLength === 0}>
        <EmptySavedJobs />
      </When>
    </>
  );
}
export default SavedJobs;
