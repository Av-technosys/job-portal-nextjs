import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiConstantsURL } from "@/constants";
import { PaginationSuccessResponseType, QueryConfig } from "@/types";
import { api } from "@/helper";

type GetTopCompaniesParams = {
  page?: number;
  pageLimit?: number;
};

export const getTopCompanies = ({
  page = 1,
  pageLimit = 100,
}: GetTopCompaniesParams = {}): Promise<{
  data: PaginationSuccessResponseType;
}> => {
  return api.get(`${apiConstantsURL.profile.topCompanies}`, {
    params: { page, page_size: pageLimit },
  });
};

export const getTopCompaniesQueryOptions = (
  metaData: GetTopCompaniesParams = {}
) => {
  const { page = 1, pageLimit = 100 } = metaData;

  return queryOptions({
    queryKey: ["top_companies", page, pageLimit],
    queryFn: () => getTopCompanies({ page, pageLimit }),
  });
};

type UseGetTopCompanies = {
  queryConfig?: QueryConfig<typeof getTopCompaniesQueryOptions>;
  queryFnParams?: GetTopCompaniesParams;
};

export const useGetTopCompanies = (queryConfig?: UseGetTopCompanies) => {
  return useQuery({
    ...getTopCompaniesQueryOptions(queryConfig?.queryFnParams || {}),
    ...queryConfig?.queryConfig,
  });
};
