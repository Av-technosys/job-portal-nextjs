import {
  JOB_DETAIL_PAGE_CONFIG,
  JOBS_URL,
  PAGIANTION_LIMIT,
} from "@/constants";
import {
  Avatar,
  Button,
  Loader,
  LoadingButton,
  Stack,
  Typography,
} from "../common";
import {
  getErrorMessageFromAPI,
  getInitials,
  mutateJobListQueryDataForAppliedJobs,
} from "@/helper";
import { colorStyles } from "@/styles";
import { useMemo } from "react";
import {
  getInfiniteSaveJobQueryOptions,
  useGetDetailedJobDetails,
  useJobApply,
  useNotification,
} from "@/services";
import { Job } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import SalaryLocationCard from "../SalaryLocationCard";
import JobOverviewCard from "../JobOverviewCard";
import SocialLinksCard from "../SocialLinksCard";

function JobDetail({ jobId }: { jobId: number }) {
  const jobDetailsAPIData = useGetDetailedJobDetails({
    queryParams: {
      jobId,
    },
  });
  const { showNotification } = useNotification();
  const jobApplyMutate = useJobApply();
  const queryClient = useQueryClient();
  const router = useRouter();

  const job = useMemo(() => {
    return jobDetailsAPIData?.data?.data as Job;
  }, [jobDetailsAPIData]);

  const {
    IMAGE,
    COMPANY_NAME,
    DESIGNATION,
    JOB_TYPE,
    APPLY_BUTTON,
    BACK_BUTTON,
    DESCRIPTION_TEXT,
    JOB_DESCRIPTION,
    NOTIFICATION_CONFIG,
  } = JOB_DETAIL_PAGE_CONFIG;

  function onJobApplyMutateSuccess() {
    const savedJobListingQueryKey = getInfiniteSaveJobQueryOptions({
      pageLimit: PAGIANTION_LIMIT,
    }).queryKey;

    // Update the cache to reflect the changes on UI
    queryClient.setQueryData(savedJobListingQueryKey, (oldData) =>
      mutateJobListQueryDataForAppliedJobs({
        oldData,
        job: {
          ...job,
          id: job.job_id as number,
        },
      })
    );

    queryClient.invalidateQueries({
      queryKey: ["job_list"],
    });
  }

  function onApplyClick() {
    jobApplyMutate.mutate(
      {
        data: {
          job: job.job_id as number,
        },
      },
      {
        onSuccess: () => {
          onJobApplyMutateSuccess();
          showNotification(NOTIFICATION_CONFIG.APPLIED);
          router.push(JOBS_URL);
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

  if (jobDetailsAPIData?.isLoading) {
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
      <Stack stackProps={{ gap: 4, className: "capitalize " }}>
        <Stack
          stackProps={{
            direction: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack
            stackProps={{ direction: "row", gap: 2, alignItems: "center" }}
          >
            <Avatar {...IMAGE(job).avatarProps}>
              {getInitials({ name: String(job?.company_name || "") })}
            </Avatar>
            <Stack
              stackProps={{
                className: "-mt-4 md:-mt-0",
              }}
            >
              <Typography {...DESIGNATION(job)} />
              <Stack
                stackProps={{
                  className: "pt-2 md:pt-0",
                  direction: "row",
                  gap: 1,
                }}
              >
                <Typography {...COMPANY_NAME(job)} />
                <Stack
                  stackProps={{
                    className: "rounded-sm px-2",
                    bgcolor: colorStyles.green,
                  }}
                >
                  <Typography {...JOB_TYPE(job)} />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            stackProps={{ direction: "row", alignItems: "center", gap: 2 }}
          >
            <Button onClick={() => router.back()} {...BACK_BUTTON} />
            <LoadingButton
              {...APPLY_BUTTON}
              onClick={onApplyClick}
              loading={jobApplyMutate.isPending}
            />
          </Stack>
        </Stack>

        {/* full Stack */}
        <Stack
          stackProps={{
            direction: { xs: "column", md: "row" },
            gap: 2,
            justifyContent: "space-between",
          }}
        >
          {/*Left Side Description Stack */}
          <Stack stackProps={{ width: { xs: "100%", md: "60%" } }}>
            <Stack>
              <Typography {...DESCRIPTION_TEXT()} />
              <Typography {...JOB_DESCRIPTION(job)} />
            </Stack>
          </Stack>
          {/* Right side logo and text Stack */}
          <Stack
            stackProps={{
              direction: "column",
              gap: 2,
              width: { xs: "100%", md: "40%" },
            }}
          >
            <SalaryLocationCard job={job} />
            <JobOverviewCard job={job} />
            {/* <SocialLinksCard job={job} /> */}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
export default JobDetail;
