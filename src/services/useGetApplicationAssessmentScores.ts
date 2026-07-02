import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { QueryConfig } from "@/types";
import { api } from "@/helper";

export type GetApplicationAssessmentScoresParams = {
  applicationId?: number | string | string[] | boolean;
};

export const getApplicationAssessmentScores = ({
  applicationId,
}: GetApplicationAssessmentScoresParams) => {
  return api.get(
    `${apiConstantsURL.jobs.applicationAssessmentScores}${applicationId}/`
  );
};

export const getApplicationAssessmentScoresQueryOptions = ({
  applicationId,
}: GetApplicationAssessmentScoresParams) => {
  return queryOptions({
    queryKey: ["application_assessment_scores", applicationId],
    queryFn: () => getApplicationAssessmentScores({ applicationId }),
    enabled: Boolean(applicationId),
  });
};

type UseApplicationAssessmentScoresOptions = {
  queryConfig?: QueryConfig<typeof getApplicationAssessmentScores>;
  queryParams: GetApplicationAssessmentScoresParams;
};

export const useGetApplicationAssessmentScores = ({
  queryConfig,
  queryParams,
}: UseApplicationAssessmentScoresOptions) => {
  return useQuery({
    ...getApplicationAssessmentScoresQueryOptions(queryParams),
    ...queryConfig,
  });
};
