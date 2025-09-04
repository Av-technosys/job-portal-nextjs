import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { QueryConfig, SuccessResponseType } from "@/types";
import { api } from "@/helper";

export const getFindSubjectList = () => {
  return api.get(`${apiConstantsURL.assessment.getAllSubjects}`);
};

export const getSubjectsQueryOptions = () => {
  return queryOptions({
    queryKey: ["get_all_subjects"],
    queryFn: () => getFindSubjectList(),
  });
};

type UseSubjectsQueryOptions = {
  queryConfig?: QueryConfig<typeof getSubjectsQueryOptions>;
};

export const useGetSubjectList = ({
  queryConfig,
}: UseSubjectsQueryOptions = {}) => {
  return useQuery({
    ...getSubjectsQueryOptions(),
    ...queryConfig,
  });
};
