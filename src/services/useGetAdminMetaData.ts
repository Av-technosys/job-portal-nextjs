import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { QueryConfig, SuccessResponseType } from "@/types";
import { api } from "@/helper";

export const getAdminProfileMetaDataInfo = () => {
  return api.get(`${apiConstantsURL.profile.adminMetaDataInfo}`);
};

export const getAdminProfileMetaDataInfoQueryOptions = () => {
  return queryOptions({
    queryKey: ["admin_meta_data_info_details"],
    queryFn: () => getAdminProfileMetaDataInfo(),
  });
};

type UseAdminProfileMetaDataInfoQueryOptions = {
  queryConfig?: QueryConfig<typeof getAdminProfileMetaDataInfoQueryOptions>;
};

export const useGetAdminProfileMetaDataInfo = ({
  queryConfig,
}: UseAdminProfileMetaDataInfoQueryOptions = {}) => {
  return useQuery({
    ...getAdminProfileMetaDataInfoQueryOptions(),
    ...queryConfig,
  });
};
