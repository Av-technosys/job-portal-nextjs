import React, { useState } from "react";
import { useGetSavedJobSeeker, usePagination } from "@/services";
import {
  InfinitePagination,
  Skeleton,
  Stack,
  Typography,
  When,
} from "../common";
import { SAVED_JOB_SEEKER_PAGE_COFIG, PAGIANTION_LIMIT } from "@/constants";
import { SkeletonVariantEnum } from "@/types";
import SavedJobSeekerCard from "./SavedJobSeekerCard";
import FilterButton from "../JobFilter";

function SavedJobSeeker() {
  const { TITLE_COUNT, TITLE_HEADER } = SAVED_JOB_SEEKER_PAGE_COFIG;
  const [filterSearch, setFilterSearch] = useState<string>("");

  // apply filter job logic here
  const savedJobSeekerAPIData = useGetSavedJobSeeker({
    queryFnParams: {
      pageLimit: PAGIANTION_LIMIT,
    },
  });
  const { paginatedInfoData, hasMore, totalLength } = usePagination({
    paginatedAPIData: savedJobSeekerAPIData,
  });

  const handleFilterChange = (filterChange: string | null) => {
    setFilterSearch(filterChange);
  };

  return (
    <>
      <Stack
        stackProps={{
          direction: "row",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between", // Ensures space between text and dropdown
          width: "100%", // Ensures the stack spans the full width
        }}
      >
        <Stack
          stackProps={{
            direction: "row",
            gap: 1,
            alignItems: totalLength === 0 ? "center" : "baseline",
          }}
        >
          <When condition={totalLength !== 0}>
            <Typography {...TITLE_COUNT(totalLength)} />
          </When>
          <When condition={totalLength === 0}>
            <Skeleton variant={SkeletonVariantEnum.TEXT} />
          </When>
          <Typography {...TITLE_HEADER(totalLength)} />
        </Stack>
        <Stack
          stackProps={{ direction: "row", gap: 1, alignItems: "baseline" }}
        >
          <FilterButton handleFilterChange={handleFilterChange} />
        </Stack>
      </Stack>
      <InfinitePagination
        dataLength={paginatedInfoData?.length}
        next={savedJobSeekerAPIData?.fetchNextPage}
        hasMore={hasMore}
        isFetchingMore={savedJobSeekerAPIData?.isFetchingNextPage}
      >
        <Stack>
          {paginatedInfoData?.map((job) => (
            <SavedJobSeekerCard
              job={job}
              key={`savedJobSeekerCard-${job?.id}`}
            />
          ))}
        </Stack>
      </InfinitePagination>
    </>
  );
}
export default SavedJobSeeker;
