import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { QueryConfig } from "@/types";
import { api } from "@/helper";

type GetContactDetailsParams = {
  search?: string;
  sort?: string[];
};

export const getContactDetails = ({
  search,
  sort,
}: GetContactDetailsParams = {}) => {
  return api.get(`${apiConstantsURL.authentication.allContactDetails}`, {
    params: { search, sort },
  });
};

export const getContactDetailsQueryOptions = (
  params: GetContactDetailsParams = {}
) => {
  return queryOptions({
    queryKey: ["contact_details", params.search, params.sort],
    queryFn: () => getContactDetails(params),
  });
};

type UseContactDetailsQueryOptions = {
  queryConfig?: QueryConfig<typeof getContactDetailsQueryOptions>;
  queryFnParams?: GetContactDetailsParams;
};

export const useGetContactDetails = ({
  queryConfig,
  queryFnParams,
}: UseContactDetailsQueryOptions = {}) => {
  return useQuery({
    ...getContactDetailsQueryOptions(queryFnParams),
    ...queryConfig,
  });
};
