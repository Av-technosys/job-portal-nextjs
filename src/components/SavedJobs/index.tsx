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
import {
  LOCAL_STORAGE_KEY,
  PAGIANTION_LIMIT,
  PROFILE_URL,
  SAVED_JOB_PAGE_COFIG,
} from "@/constants";
import SavedJobCard from "./SavedJobCard";
import { CommonObjectType, UserType } from "@/types";
import {
  getErrorMessageFromAPI,
  getItem,
  isJobEligibleForSubmission,
  mutateJobListQueryDataForAppliedJobs,
  mutateSavedJobListQueryDataForSavedJobs,
} from "@/helper";
import { useQueryClient } from "@tanstack/react-query";
import EmptySavedJobs from "../EmptyStates/EmptySavedjob";
import { useRouter } from "next/router";

const RECRUITER_APPLY_RESTRICTED_MESSAGE =
  "Recruiters can't apply for jobs. Please use a job seeker account.";

function SavedJobs() {
  const { TITLE_COUNT, TITLE_HEADER, JOB_SAVE_CARD } = SAVED_JOB_PAGE_COFIG;
  const { NOTIFICATION_CONFIG } = JOB_SAVE_CARD;
  const { showNotification } = useNotification();
  const jobApplyMutate = useJobApply();
  const deleteSavedJobMutate = useDeleteSavedJob();
  const queryClient = useQueryClient();
  const router = useRouter();

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
    if (getItem(LOCAL_STORAGE_KEY.CURRENT_USER_TYPE) === UserType.RECUITER_TYPE) {
      showNotification({
        message: RECRUITER_APPLY_RESTRICTED_MESSAGE,
      });
      return;
    }

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
            const errorMessage = getErrorMessageFromAPI(error);
            showNotification({
              ...errorMessage,
            });
            if (
              errorMessage.message.includes(
                "Complete your profile before applying for jobs."
              )
            ) {
              router.push(PROFILE_URL);
            }
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
          alignItems: "baseline",
          mb: 1,
        }}
      >
        <When condition={totalLength !== 0}>
          <>
            <Typography {...TITLE_COUNT(totalLength)} />
            <Typography {...TITLE_HEADER(totalLength)} />
          </>
        </When>
      </Stack>
      <When condition={totalLength > 0}>
        <InfinitePagination
          dataLength={paginatedInfoData?.length}
          next={jobSaveAPIData?.fetchNextPage}
          hasMore={hasMore}
          isFetchingMore={jobSaveAPIData?.isFetchingNextPage}
        >
          <Stack
            stackProps={{
              sx: {
                width: "100%",
                maxWidth: "100%",
                overflowX: "hidden",
                boxSizing: "border-box",
              },
            }}
          >
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
