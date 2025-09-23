import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { QueryConfig } from "@/types";
import { api } from "@/helper";

export type getAssessmentAttemptsInfoQueryParams = {
  id: number | string | string[];
};

export const getAssessmentAttemptsInfo = ({
  id,
}: getAssessmentAttemptsInfoQueryParams) => {
  return api.get(`${apiConstantsURL.assessment.getAssessmentAttempts}${id}`);
};

export const getAssessmentAttemptsInfoQueryOptions = (
  queryParams: getAssessmentAttemptsInfoQueryParams
) => {
  const { id } = queryParams;

  return queryOptions({
    queryKey: ["assessment_attempts_full_details", id],
    queryFn: () => getAssessmentAttemptsInfo({ id }),
  });
};

type useGetAssessmentAttemptsInfoQueryOptions = {
  queryConfig?: QueryConfig<typeof getAssessmentAttemptsInfo>;
  queryParams: getAssessmentAttemptsInfoQueryParams;
};

export const useGetAssessmentAttemptsInfo = ({
  queryConfig,
  queryParams,
}: useGetAssessmentAttemptsInfoQueryOptions) => {
  return useQuery({
    ...getAssessmentAttemptsInfoQueryOptions(queryParams),
    ...queryConfig,
  });
};
