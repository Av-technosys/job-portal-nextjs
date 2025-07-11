import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { QueryConfig, SuccessResponseType } from "@/types";
import { api } from "@/helper";

export const getStudentProfileGeneralInfo = (): Promise<{
  data: SuccessResponseType;
}> => {
  return api.get(`${apiConstantsURL.profile.generalInfo}`);
};

export const getStudentProfileGeneralInfoQueryOptions = () => {
  return queryOptions({
    queryKey: ["user_student_general_info_details"],
    queryFn: () => getStudentProfileGeneralInfo(),
  });
};

type UseStudentProfileGeneralInfoQueryOptions = {
  queryConfig?: QueryConfig<typeof getStudentProfileGeneralInfoQueryOptions>;
};

export const useGetStudentProfileGeneralInfo = ({
  queryConfig,
}: UseStudentProfileGeneralInfoQueryOptions = {}) => {
  return useQuery({
    ...getStudentProfileGeneralInfoQueryOptions(),
    ...queryConfig,
  });
};
