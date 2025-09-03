import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { QueryConfig, SuccessResponseType } from "@/types";
import { api } from "@/helper";

export const getQuestionInfo = (): Promise<{
  data: SuccessResponseType;
}> => {
  return api.get(`${apiConstantsURL.assessment.questionInfo}`);
};

export const getQuestionInfoQueryOptions = () => {
  return queryOptions({
    queryKey: ["question_details"],
    queryFn: () => getQuestionInfo(),
  });
};

type UseQuestionInfoQueryOptions = {
  queryConfig?: QueryConfig<typeof getQuestionInfoQueryOptions>;
};

export const useGetQuestionInfo = ({
  queryConfig,
}: UseQuestionInfoQueryOptions = {}) => {
  return useQuery({
    ...getQuestionInfoQueryOptions(),
    ...queryConfig,
  });
};
