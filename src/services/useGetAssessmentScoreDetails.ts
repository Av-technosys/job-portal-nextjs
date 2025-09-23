import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { QueryConfig } from "@/types";
import { api } from "@/helper";

export type getAssessmentScoreInfoQueryParams = {
  id: number | string | string[];
};

export const getAssessmentScoreInfo = ({
  id,
}: getAssessmentScoreInfoQueryParams) => {
  return api.get(`${apiConstantsURL.assessment.getAssessmentResult}${id}`);
};

export const getAssessmentScoreInfoQueryOptions = (
  queryParams: getAssessmentScoreInfoQueryParams
) => {
  const { id } = queryParams;

  return queryOptions({
    queryKey: ["assessment_score_full_details", id],
    queryFn: () => getAssessmentScoreInfo({ id }),
  });
};

type useGetAssessmentScoreInfoQueryOptions = {
  queryConfig?: QueryConfig<typeof getAssessmentScoreInfo>;
  queryParams: getAssessmentScoreInfoQueryParams;
};

export const useGetAssessmentScoreInfo = ({
  queryConfig,
  queryParams,
}: useGetAssessmentScoreInfoQueryOptions) => {
  return useQuery({
    ...getAssessmentScoreInfoQueryOptions(queryParams),
    ...queryConfig,
  });
};
