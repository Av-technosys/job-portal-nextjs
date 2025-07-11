import {
  CommonAllDataType,
  CommonObjectType,
  JOB_STATUS_LABELS,
  JobStatusEnum,
  PaginationSuccessResponseType,
} from "@/types";

export function mutateSavedJobListQueryDataForSavedJobs({
  oldData,
  job,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  oldData?: any;
  job: CommonObjectType;
}) {
  const updatedPages = oldData?.pages?.map(
    (page: { data: PaginationSuccessResponseType }) => {
      if (page.data.current_page === (job?.pageIndex as number)) {
        return {
          ...page,
          data: {
            ...page.data,
            data: (page.data.data as CommonObjectType[]).filter(
              (item) => item.id !== job.id
            ),
            total_count: page.data.total_count - 1,
          },
        };
      }
      return page;
    }
  );

  return { ...oldData, pages: updatedPages };
}

export function mutateJobListQueryDataForAppliedJobs({
  oldData,
  job,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  oldData?: any;
  job: CommonObjectType;
}) {
  const updatedPages = oldData?.pages?.map(
    (page: { data: PaginationSuccessResponseType }) => {
      if (page.data.current_page === (job?.pageIndex as number)) {
        return {
          ...page,
          data: {
            ...page.data,
            data: (page.data.data as CommonObjectType[]).map((item) =>
              item.id === job.id ? { ...item, is_applied: true } : item
            ),
          },
        };
      }
      return page;
    }
  );

  return { ...oldData, pages: updatedPages };
}
export const getJobStatusButtonText = (
  isApplied: CommonAllDataType,
  isExpired: boolean
): string => {
  if (isExpired) {
    return "Expired";
  } else if (isApplied) {
    return "Applied";
  } else {
    return "Apply Now";
  }
};

export const isJobEligibleForSubmission = (job: CommonObjectType): boolean => {
  return (
    job?.id !== undefined &&
    !job?.is_applied &&
    job?.status === JobStatusEnum.ACTIVE
  );
};

export const getStatusProps = (job_status?: JobStatusEnum) => {
  const color = JOB_STATUS_LABELS[job_status as JobStatusEnum] || "inherit";
  const label =
    job_status === JobStatusEnum.ACTIVE
      ? "Active"
      : job_status === JobStatusEnum.EXPIRED
      ? "Expired"
      : "Unknown";

  return { color, label };
};
