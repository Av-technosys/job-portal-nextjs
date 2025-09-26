import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { QueryConfig } from "@/types";
import { api } from "@/helper";

export interface getAssessmentQuestionQueryParams {
  assesment_session_id?: number | string | string[];
  subject_id?: number | string | string[];
}

export const getStudentAssessmentQuestions = ({
  assesment_session_id,
  subject_id,
}: getAssessmentQuestionQueryParams) => {
  return api.get(
    `${apiConstantsURL.assessment.getQuestionsBySubjectId}?assesment_session_id=${assesment_session_id}&subject_id=${subject_id}`
  );
};

export const getStudentAssessmentQuestionsQueryOptions = (
  queryParams: getAssessmentQuestionQueryParams
) => {
  const { assesment_session_id, subject_id } = queryParams;
  return queryOptions({
    queryKey: ["id", assesment_session_id, subject_id],
    queryFn: () =>
      getStudentAssessmentQuestions({ assesment_session_id, subject_id }),
  });
};

type UseStudentAssessmentQuestionsQueryOptions = {
  queryConfig?: QueryConfig<typeof getStudentAssessmentQuestionsQueryOptions>;
  queryParams: getAssessmentQuestionQueryParams;
};

export const useGetStudentAssessmentQuestions = (
  queryConfig: UseStudentAssessmentQuestionsQueryOptions
) => {
  return useQuery({
    ...getStudentAssessmentQuestionsQueryOptions(queryConfig.queryParams),
    ...queryConfig?.queryConfig,
  });
};
