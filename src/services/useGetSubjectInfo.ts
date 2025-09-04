import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { QueryConfig, SuccessResponseType } from "@/types";
import { api } from "@/helper";

export const getSubjectInfo = (): Promise<{
  data: SuccessResponseType;
}> => {
  return api.get(`${apiConstantsURL.assessment.subjectInfo}`);
};

export const getSubjectInfoQueryOptions = () => {
  return queryOptions({
    queryKey: ["subject_details"],
    queryFn: () => getSubjectInfo(),
  });
};

type UseSubjectInfoQueryOptions = {
  queryConfig?: QueryConfig<typeof getSubjectInfoQueryOptions>;
};

export const useGetSubjectInfo = ({
  queryConfig,
}: UseSubjectInfoQueryOptions = {}) => {
  return useQuery({
    ...getSubjectInfoQueryOptions(),
    ...queryConfig,
  });
};
