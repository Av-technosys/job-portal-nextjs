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
      <When condition={totalLength !== 0}>
        <Stack
          stackProps={{
            direction: "row",
            gap: 1,
            alignItems: "baseline",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Stack
            stackProps={{
              direction: "row",
              gap: 1,
              alignItems: "baseline",
            }}
          >
            <Typography {...TITLE_COUNT(totalLength)} />
            <Typography {...TITLE_HEADER(totalLength)} />
          </Stack>

          <Dropdown
            {...CANDIDATE_SEARCH_LISTING_SORT_DROPDOWN}
            onChange={handleSortChange}
            value={selectedSort?.[0]}
          />
        </Stack>
      </When>
      <InfinitePagination
        dataLength={paginatedInfoData?.length}
        next={candidateSearchAPIData?.fetchNextPage}
        hasMore={hasMore}
        isFetchingMore={candidateSearchAPIData?.isFetchingNextPage}
      >
        <Stack>
          {paginatedInfoData?.map((candidate) => (
            <CandidateSearchCard
              candidate={candidate}
              key={`candidateSearch-${candidate?.id}`}
            />
          ))}
        </Stack>
      </InfinitePagination>
    </>
  );
}

export default CandidateSearchJobs;
