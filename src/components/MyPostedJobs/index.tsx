import React from "react";
import { useGetPostedJobList, usePagination } from "@/services";
import { InfinitePagination, Stack, Typography, When } from "../common";
import { CANDIATE_APPLICATIONS_URL, POSTED_JOB_PAGE_CONFIG } from "@/constants";
import PostedJobCard from "./PostedJobCard";
// import { colorStyles } from "@/styles";
import { useRouter } from "next/router";
import { CommonObjectType } from "@/types";
import EmptyPostedJobs from "../EmptyStates/EmptyPostedJob";

function PostedJobs() {
  const { TITLE_COUNT, TITLE_HEADER } = POSTED_JOB_PAGE_CONFIG;
  // const { TITLE_BAR_CONFIG } = POSTED_JOB_PAGE_CONFIG;
  // const { JOB, STATUS, APPLICATION, JOB_TYPE } = TITLE_BAR_CONFIG;
  const jobInfoAPIData = useGetPostedJobList();
  const { paginatedInfoData, hasMore, totalLength } = usePagination({
    paginatedAPIData: jobInfoAPIData,
  });
  const router = useRouter();

  function handleViewApplicationClick(job: CommonObjectType) {
    if (job?.job_id !== undefined && job?.application_count !== 0) {
      router.push({
        pathname: CANDIATE_APPLICATIONS_URL,
        query: { id: job.job_id as number },
      });
    }
  }

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
            className: "  mb-3.5",
            direction: "row",
            justifyContent: "space-around ",

            bgcolor: colorStyles.listTitleBackgroundColor,
          }}
        >
          <Typography {...JOB()} />
          <Typography {...JOB_TYPE()} />
          <Typography {...APPLICATION()} />
          <Typography {...STATUS()} />
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
              <PostedJobCard
                job={job}
                key={`${job?.id}`}
                handleViewApplicationClick={handleViewApplicationClick}
              />
            ))}
          </Stack>
        </InfinitePagination>
      </When>
      <When condition={totalLength === 0}>
        <EmptyPostedJobs />
      </When>
    </>
  );
}

export default PostedJobs;
