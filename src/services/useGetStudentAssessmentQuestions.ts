import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { QueryConfig, SuccessResponseType } from "@/types";
import { api } from "@/helper";

export const getStudentAssessmentQuestions = () => {
  return api.get(`${apiConstantsURL.assessment.getQuestionsBySubjectId}2`); //abhi subject id custom lagai hui hai...
};

export const getStudentAssessmentQuestionsQueryOptions = () => {
  return queryOptions({
    queryKey: ["student_assessment_questions"],
    queryFn: () => getStudentAssessmentQuestions(),
  });
};

type UseStudentAssessmentQuestionsQueryOptions = {
  queryConfig?: QueryConfig<typeof getStudentAssessmentQuestionsQueryOptions>;
};

export const useGetStudentAssessmentQuestions = ({
  queryConfig,
}: UseStudentAssessmentQuestionsQueryOptions = {}) => {
  return useQuery({
    ...getStudentAssessmentQuestionsQueryOptions(),
    ...queryConfig,
  });
};
