import { apiConstantsURL } from "@/constants";
import { api } from "@/helper";
import { QueryConfig } from "@/types";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getOverallDataJobSeeker = () => {
  return api.get(`${apiConstantsURL.jobs.overallJobSeekerRecruiterData}`);
};

type UseGetOverallData = {
  queryConfig?: QueryConfig<typeof getOverallDataJobSeeker>;
};

export const getOverallDataJobSeekerQueryOptions = () => {
  return queryOptions({
    queryKey: ["overallDataJobSeekerRecuiter"],
    queryFn: getOverallDataJobSeeker,
  });
};

export const useGetOverAllJobSeekerRecruiterDetails = (
  queryConfig?: UseGetOverallData
) => {
  return useQuery({
    ...getOverallDataJobSeekerQueryOptions(),
    ...queryConfig,
  });
};
