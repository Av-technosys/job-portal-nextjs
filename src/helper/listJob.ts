import { CommonObjectType, PaginationSuccessResponseType } from "@/types";

export function mutateJobListQueryDataForSavedJobs({
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
              item.id === job.id ? { ...item, is_saved: !item?.is_saved } : item
            ),
          },
        };
      }
      return page;
    }
  );

  return { ...oldData, pages: updatedPages };
}
