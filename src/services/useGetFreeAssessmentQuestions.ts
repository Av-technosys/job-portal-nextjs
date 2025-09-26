import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { QueryConfig } from "@/types";
import { api } from "@/helper";

export interface getAssessmentQuestionQueryParams {
  subject_id?: number | string | string[];
}

export const getStudentAssessmentQuestions = ({
  subject_id,
}: getAssessmentQuestionQueryParams) => {
  return api.get(
    `${apiConstantsURL.assessment.getFreeQuestionsBySubjectId}?subject_id=${subject_id}`
  );
};

export const getStudentAssessmentQuestionsQueryOptions = (
  queryParams: getAssessmentQuestionQueryParams
) => {
  const { subject_id } = queryParams;
  return queryOptions({
    queryKey: ["id", subject_id],
    queryFn: () => getStudentAssessmentQuestions({ subject_id }),
  });
};

type UseStudentAssessmentQuestionsQueryOptions = {
  queryConfig?: QueryConfig<typeof getStudentAssessmentQuestionsQueryOptions>;
  queryParams: getAssessmentQuestionQueryParams;
};

export const useGetFreeAssessmentQuestions = (
  queryConfig: UseStudentAssessmentQuestionsQueryOptions
) => {
  return useQuery({
    ...getStudentAssessmentQuestionsQueryOptions(queryConfig.queryParams),
    ...queryConfig?.queryConfig,
  });
};
