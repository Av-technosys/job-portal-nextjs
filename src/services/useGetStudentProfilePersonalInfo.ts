import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { QueryConfig, SuccessResponseType } from "@/types";
import { api } from "@/helper";

export const getStudentProfilePersonalInfo = (): Promise<{
  data: SuccessResponseType;
}> => {
  return api.get(`${apiConstantsURL.profile.personalInfo}`);
};

export const getStudentProfilePersonalInfoQueryOptions = () => {
  return queryOptions({
    queryKey: ["user_student_personal_info_details"],
    queryFn: () => getStudentProfilePersonalInfo(),
  });
};

type UseStudentProfilePersonalInfoQueryOptions = {
  queryConfig?: QueryConfig<typeof getStudentProfilePersonalInfoQueryOptions>;
};

export const useGetStudentProfilePersonalInfo = ({
  queryConfig,
}: UseStudentProfilePersonalInfoQueryOptions = {}) => {
  return useQuery({
    ...getStudentProfilePersonalInfoQueryOptions(),
    ...queryConfig,
  });
};
