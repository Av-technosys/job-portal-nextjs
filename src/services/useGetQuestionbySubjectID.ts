import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { apiConstantsURL, PAGIANTION_LIMIT } from "@/constants";
import {
  JobListSortEnum,
  PaginationSuccessResponseType,
  QueryConfig,
} from "@/types";
import { api } from "@/helper";

export type GetQuestionBySubjectIdQueryParams = {
  subjectId: number;
  page?: number;
  pageLimit?: number;
  search?: string;
  enabled?: boolean;
  sort?: JobListSortEnum[];
};

export const getQuestionBySubjectId = ({
  page = 1,
  pageLimit = PAGIANTION_LIMIT,
  search,
  sort,
  subjectId,
}: GetQuestionBySubjectIdQueryParams): Promise<{
  data: PaginationSuccessResponseType;
}> => {
  return api.get(
    `${apiConstantsURL.assessment.getQuestionBySubjectId}${subjectId}`,
    {
      params: {
        page,
        page_size: pageLimit,
        sort,
        search,
      },
    }
  );
};

export const getQuestionBySubjectIdQueryOptions = (
  queryParams: GetQuestionBySubjectIdQueryParams
) => {
  const { subjectId, pageLimit, search = "", sort, enabled } = queryParams;
  return infiniteQueryOptions({
    queryKey: ["question_by_subject_id", subjectId, search, sort, pageLimit],
    queryFn: ({ pageParam = 1 }) => {
      return getQuestionBySubjectId({
        page: pageParam as number,
        pageLimit,
        search,
        sort,
        subjectId,
      });
    },
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      return lastPageParam + 1;
    },
    enabled: !!subjectId && (enabled ?? true),
    initialPageParam: 1,
  });
};

type UseGetQuestionBySubjectIdQueryOptions = {
  queryConfig?: QueryConfig<typeof getQuestionBySubjectId>;
  queryParams: GetQuestionBySubjectIdQueryParams;
};

export const useGetQuestionBySubjectId = (
  queryConfig: UseGetQuestionBySubjectIdQueryOptions
) => {
  return useInfiniteQuery({
    ...getQuestionBySubjectIdQueryOptions(queryConfig?.queryParams),
    ...queryConfig?.queryConfig,
  });
};
