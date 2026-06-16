import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiConstantsURL, LOCAL_STORAGE_KEY } from "@/constants";
import { QueryConfig, SuccessResponseType } from "@/types";
import { api, getItem } from "@/helper";

export const getStudentProfileAdditionalInfo = (): Promise<{
  data: SuccessResponseType;
}> => {
  return api.get(`${apiConstantsURL.profile.additionalInfo}`);
};

export const getStudentProfileAdditionalInfoQueryOptions = () => {
  return queryOptions({
    queryKey: [
      "user_student_additional_info_details",
      getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN),
    ],
    queryFn: () => getStudentProfileAdditionalInfo(),
  });
};

type UseStudentProfileAdditionalInfoQueryOptions = {
  queryConfig?: QueryConfig<typeof getStudentProfileAdditionalInfoQueryOptions>;
};

export const useGetStudentProfileAdditionalInfo = ({
  queryConfig,
}: UseStudentProfileAdditionalInfoQueryOptions = {}) => {
  return useQuery({
    ...getStudentProfileAdditionalInfoQueryOptions(),
    ...queryConfig,
  });
};
