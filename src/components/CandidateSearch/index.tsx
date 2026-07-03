import React, { useState } from "react";
import { useGetCandidateSearchList, usePagination } from "@/services";
import {
  Dropdown,
  InfinitePagination,
  Stack,
  Typography,
  When,
} from "../common";
import { CANDIDATE_SEARCH_PAGE_CONFIG, PAGIANTION_LIMIT } from "@/constants";
import CandidateSearchCard from "./CandidateCard";
import CandidateSearchBar from "../CandidateSearchBar";
import { CandidateSearchListSortEnum } from "@/types";
import { SelectChangeEvent } from "@mui/material";

function CandidateSearchJobs() {
  const { TITLE_COUNT, TITLE_HEADER, CANDIDATE_SEARCH_LISTING_SORT_DROPDOWN } =
    CANDIDATE_SEARCH_PAGE_CONFIG;

  const [selectedSort, setSelectedSort] = useState<
    CandidateSearchListSortEnum[]
  >([CandidateSearchListSortEnum.CREATED_DATE_ASC]);

  const handleSortChange = (event: SelectChangeEvent<unknown>) => {
    const newSort = event.target.value;
    setSelectedSort([newSort] as CandidateSearchListSortEnum[]);
  };

  const candidateSearchAPIData = useGetCandidateSearchList({
    queryFnParams: {
      pageLimit: PAGIANTION_LIMIT,
      sort: selectedSort,
    },
  });
  const { paginatedInfoData, hasMore, totalLength } = usePagination({
    paginatedAPIData: candidateSearchAPIData,
  });

  return (
    <>
      <CandidateSearchBar />
      <div className="max-w-[22rem] md:max-w-[45rem] lg:max-w-6xl mx-auto w-full px-2 sm:px-4 mt-8 mb-12">
        <When condition={totalLength !== 0}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 w-full">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-indigo-600 shrink-0"></span>
                <div className="flex items-baseline gap-1.5 font-bold text-slate-900 text-xl">
                  <Typography {...TITLE_COUNT(totalLength)} />
                  <Typography {...TITLE_HEADER(totalLength)} />
                </div>
              </div>
              <p className="text-sm font-medium text-slate-600 pl-5.5">
                Connect with <span className="text-indigo-600 font-semibold">verified candidates</span> and explore new talent opportunities.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="text-xs font-semibold text-slate-600 shrink-0 self-center">
                Sort by:
              </span>
              <Dropdown
                {...CANDIDATE_SEARCH_LISTING_SORT_DROPDOWN}
                onChange={handleSortChange}
                value={selectedSort?.[0]}
              />
            </div>
          </div>
        </When>
        <InfinitePagination
          dataLength={paginatedInfoData?.length}
          next={candidateSearchAPIData?.fetchNextPage}
          hasMore={hasMore}
          isFetchingMore={candidateSearchAPIData?.isFetchingNextPage}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4 w-full">
            {paginatedInfoData?.map((candidate) => (
              <CandidateSearchCard
                candidate={candidate}
                key={`candidateSearch-${candidate?.id}`}
              />
            ))}
          </div>
        </InfinitePagination>
      </div>
    </>
  );
}

export default CandidateSearchJobs;
