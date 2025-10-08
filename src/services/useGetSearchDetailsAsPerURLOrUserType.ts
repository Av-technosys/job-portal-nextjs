import { useMemo, useCallback } from "react";
import {
  JOBS_URL,
  PAGIANTION_SEARCH_LIMIT,
  RECRUITER_URL,
  SEARCH_BAR_HEADER_CONFIG,
} from "@/constants";
import { useGetJobList } from "./useGetJobList";
import { useGetFindRecruiterList } from "./useGetFindRecruiter";
import { useGetCandidateSearchList } from "./useGetCandidateSearchList";
import { usePagination } from "./usePagination";
import { CommonObjectType, InfinteQueryResultType } from "@/types";
import { useCommonDetails } from "./useCommonDetails";
import { isLoggedInUserJobSeeker, isLoggedInUserRecruiter } from "@/helper";
import { useRouter } from "next/router";

export const useGetSearchDetailsAsPerURLOrUserType = ({
  searchString = "",
}: {
  searchString: string;
}) => {
  const { pathname } = useRouter();
  const { userType } = useCommonDetails();
  const { jobSearch, recruiterSearch, candidateSearch } =
    SEARCH_BAR_HEADER_CONFIG;

  const {
    isJobSearchEnabled,
    isRecruiterSearchEnabled,
    isCandidateSearchEnabled,
  } = useMemo(() => {
    return {
      isJobSearchEnabled:
        pathname === JOBS_URL ||
        (userType === -1 ? false : isLoggedInUserJobSeeker({ userType })),
      isRecruiterSearchEnabled: pathname === RECRUITER_URL,
      isCandidateSearchEnabled:
        userType === -1 ? false : isLoggedInUserRecruiter({ userType }),
    };
  }, [pathname, userType]);

  const jobListAPIData = useGetJobList({
    queryFnParams: {
      pageLimit: PAGIANTION_SEARCH_LIMIT,
      enabled: isJobSearchEnabled && searchString?.length > 2,
      search: searchString,
    },
  });

  const recruiterListAPIData = useGetFindRecruiterList({
    queryFnParams: {
      pageLimit: PAGIANTION_SEARCH_LIMIT,
      enabled: isRecruiterSearchEnabled && searchString?.length > 2,
      search: searchString,
    },
  });

  console.log(
    "Searched-Recruiter data",
    recruiterListAPIData?.data?.pages[0]?.data?.data
  );
  console.log("search-String", searchString);

  const candidateListAPIData = useGetCandidateSearchList({
    queryFnParams: {
      pageLimit: PAGIANTION_SEARCH_LIMIT,
      enabled: isCandidateSearchEnabled && searchString?.length > 2,
      search: searchString,
    },
  });
  // console.log("Searched-Candidate data", candidateListAPIData?.data);

  const getSearchBarDetails = useCallback(
    (
      isJobSearchEnabled: boolean,
      isRecruiterSearchEnabled: boolean,
      isCandidateSearchEnabled: boolean
    ) => {
      const searchDetails = {
        apiData: {} as InfinteQueryResultType,
        searchProps: {} as CommonObjectType,
      };

      if (isRecruiterSearchEnabled) {
        searchDetails.apiData = recruiterListAPIData;
        searchDetails.searchProps = recruiterSearch.searchTextConfig;
      } else if (isJobSearchEnabled) {
        searchDetails.apiData = jobListAPIData;
        searchDetails.searchProps = jobSearch.searchTextConfig;
      } else if (isCandidateSearchEnabled) {
        searchDetails.apiData = candidateListAPIData;
        searchDetails.searchProps = candidateSearch.searchTextConfig;
      } else {
        console.error("No search enabled for this route");
      }

      return searchDetails;
    },
    [
      jobListAPIData,
      jobSearch.searchTextConfig,
      recruiterListAPIData,
      recruiterSearch.searchTextConfig,
      candidateListAPIData,
      candidateSearch.searchTextConfig,
    ]
  );

  const searchDetails = useMemo(() => {
    return getSearchBarDetails(
      isJobSearchEnabled,
      isRecruiterSearchEnabled,
      isCandidateSearchEnabled
    );
  }, [
    getSearchBarDetails,
    isJobSearchEnabled,
    isRecruiterSearchEnabled,
    isCandidateSearchEnabled,
  ]);

  const { paginatedInfoData } = usePagination({
    paginatedAPIData: searchDetails.apiData,
  });

  const searchOptions = useMemo(() => {
    function getTitle(data: CommonObjectType) {
      let keyArr: string[] = [];
      if (isJobSearchEnabled) {
        keyArr = jobSearch.searchMappingKey;
      } else if (isRecruiterSearchEnabled) {
        keyArr = recruiterSearch.searchMappingKey;
      } else if (isCandidateSearchEnabled) {
        keyArr = candidateSearch.searchMappingKey;
      }
      return {
        key: `${data.id}-search`,
        title: keyArr?.map((key) => data[key]).join(", "),
      };
    }

    return (
      paginatedInfoData.map((data) => {
        return getTitle(data);
      }) || null
    );
  }, [
    paginatedInfoData,
    isJobSearchEnabled,
    isRecruiterSearchEnabled,
    isCandidateSearchEnabled,
    jobSearch.searchMappingKey,
    recruiterSearch.searchMappingKey,
    candidateSearch.searchMappingKey,
  ]);

  return { ...searchDetails, searchOptions };
};
