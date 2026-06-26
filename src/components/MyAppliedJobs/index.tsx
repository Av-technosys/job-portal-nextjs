import React from "react";
import { useGetAppliedJobList, usePagination } from "@/services";
import {
  InfinitePagination,
  Loader,
  Skeleton,
  Stack,
  Typography,
  When,
} from "../common";
import { APPLIED_JOB_PAGE_CONFIG } from "@/constants";
import { SkeletonVariantEnum } from "@/types";
import AppliedJobCard from "./AppliedJobCard";
import EmptyAppliedJobs from "../EmptyStates/EmptyAppliedJobs";

function AppliedJobs() {
  const { TITLE_COUNT, TITLE_HEADER } = APPLIED_JOB_PAGE_CONFIG;
  const jobInfoAPIData = useGetAppliedJobList();
  const { paginatedInfoData, hasMore, totalLength } = usePagination({
    paginatedAPIData: jobInfoAPIData,
  });

  return (
    <>
      <When condition={jobInfoAPIData?.isLoading || jobInfoAPIData?.isFetching}>
        <Loader loaderProps={{ open: true }} />
      </When>

      {/* Page header */}
      <Stack
        stackProps={{
          direction: "row",
          alignItems: "baseline",
          gap: 1,
          mb: 2,
        }}
      >
        <When condition={totalLength !== 0}>
          <Typography {...TITLE_COUNT(totalLength)} />
          <Typography {...TITLE_HEADER(totalLength)} />
        </When>
        <When condition={totalLength === 0 && !jobInfoAPIData?.isFetched}>
          <Skeleton variant={SkeletonVariantEnum.TEXT} width={120} />
        </When>
      </Stack>

      <When condition={totalLength > 0}>
        <InfinitePagination
          dataLength={paginatedInfoData?.length}
          next={jobInfoAPIData?.fetchNextPage}
          hasMore={hasMore}
          isFetchingMore={jobInfoAPIData?.isFetchingNextPage}
        >
          <Stack
            stackProps={{
              sx: { width: "100%", maxWidth: "100%", overflowX: "hidden" },
            }}
          >
            {paginatedInfoData?.map((job) => (
              <AppliedJobCard job={job} key={`appliedJobCard-${job?.id}`} />
            ))}
          </Stack>
        </InfinitePagination>
      </When>
      <When condition={jobInfoAPIData?.isFetched && totalLength === 0}>
        <EmptyAppliedJobs />
      </When>
    </>
  );
}

export default AppliedJobs;
