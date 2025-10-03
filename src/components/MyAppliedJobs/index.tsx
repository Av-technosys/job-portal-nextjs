import React from "react";
import { useGetAppliedJobList, usePagination } from "@/services";
import { InfinitePagination, Stack, Typography, When } from "../common";
import { APPLIED_JOB_PAGE_CONFIG } from "@/constants";
import AppliedJobCard from "./AppliedJobCard";
import EmptyAppliedJobs from "../EmptyStates/EmptyAppliedJobs";

function AppliedJobs() {
  const { TITLE_COUNT, TITLE_HEADER } = APPLIED_JOB_PAGE_CONFIG;
  // const { TITLE_BAR_CONFIG } = APPLIED_JOB_PAGE_CONFIG;
  // const { JOB, JOB_TYPE, APPLIED_DATE, ACTION } = TITLE_BAR_CONFIG;
  const jobInfoAPIData = useGetAppliedJobList();
  const { paginatedInfoData, hasMore, totalLength } = usePagination({
    paginatedAPIData: jobInfoAPIData,
  });

  return (
    <>
      <Stack
        stackProps={{
          direction: "row",
          gap: 1,
          alignItems: "baseline",
          paddingBottom: 5,
        }}
      >
        <Stack>
          <When condition={totalLength !== 0}>
            <>
              <Typography {...TITLE_COUNT(totalLength)} />
              <Typography {...TITLE_HEADER(totalLength)} />
            </>
            {/* <Stack
          stackProps={{
            className: "mb-3.5",
            direction: "row",
            justifyContent: "space-around",
            bgcolor: colorStyles.listTitleBackgroundColor,
          }}
        >
          <Typography {...JOB()} />
          <Typography {...JOB_TYPE()} />
          <Typography {...APPLIED_DATE()} />
          <Typography {...ACTION()} />
        </Stack> */}
          </When>
        </Stack>
      </Stack>
      <When condition={totalLength > 0}>
        <InfinitePagination
          dataLength={paginatedInfoData?.length}
          next={jobInfoAPIData?.fetchNextPage}
          hasMore={hasMore}
          isFetchingMore={jobInfoAPIData?.isFetchingNextPage}
        >
          <Stack>
            {paginatedInfoData?.map((job) => (
              <AppliedJobCard job={job} key={`appliedJobCard-${job?.id}`} />
            ))}
          </Stack>
        </InfinitePagination>
      </When>
      <When condition={totalLength === 0}>
        <EmptyAppliedJobs />
      </When>
    </>
  );
}

export default AppliedJobs;
