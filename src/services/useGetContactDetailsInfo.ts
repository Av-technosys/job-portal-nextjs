import { useQuery, queryOptions } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { QueryConfig } from "@/types";
import { api } from "@/helper";

export const getContactDetails = () => {
  return api.get(`${apiConstantsURL.authentication.allContactDetails}`);
};

export const getContactDetailsQueryOptions = () => {
  return queryOptions({
    queryKey: ["contact_details"],
    queryFn: () => getContactDetails(),
  });
};

type UseContactDetailsQueryOptions = {
  queryConfig?: QueryConfig<typeof getContactDetailsQueryOptions>;
};

export const useGetContactDetails = ({
  queryConfig,
}: UseContactDetailsQueryOptions = {}) => {
  return useQuery({
    ...getContactDetailsQueryOptions(),
    ...queryConfig,
  });
};
