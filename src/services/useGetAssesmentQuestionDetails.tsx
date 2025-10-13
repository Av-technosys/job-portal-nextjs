import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { QueryConfig } from "@/types";
import { api } from "@/helper";

export interface AssessmentQuestionQueryParams {
  id: number;
}

export const getAssesmentQuestionDetails = ({ id }: { id: number }) => {
  return api.get(`${apiConstantsURL.assessment.getQuestionById}${id}/`);
};

export const getAssesmentQuestionDetailsQueryOptions = (
  queryParams: AssessmentQuestionQueryParams
) => {
  const { id } = queryParams;
  return queryOptions({
    queryKey: ["id", id],
    queryFn: () => getAssesmentQuestionDetails({ id }),
    enabled: !!id,
  });
};

type UseDetailedJobDetailsQueryOptions = {
  queryConfig?: QueryConfig<typeof getAssesmentQuestionDetailsQueryOptions>;
  queryParams: AssessmentQuestionQueryParams;
};

export const useGetAssesmentQuestionDetails = (
  queryConfig: UseDetailedJobDetailsQueryOptions
) => {
  return useQuery({
    ...getAssesmentQuestionDetailsQueryOptions(queryConfig.queryParams),
    ...queryConfig?.queryConfig,
  });
};
