import React from "react";
import { Carousel, CarouselCard, Stack } from "../common";
import JOBOPPORTUNITY from "@/constants/jobOppotunity.json";
import LatestJobCard from "../LatestJobCard";

interface JobOpportunityProps {
  jobFilterKey?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sliderRef?: any;
}

function JobOpportunity({ jobFilterKey, sliderRef }: JobOpportunityProps) {
  const filteredJobs = JOBOPPORTUNITY.jobs.filter(
    ({ categoryName }) => categoryName === jobFilterKey
  );
  return (
    <>
      <Stack
        stackProps={{
          direction: "row",
          gap: 2,
          className: "mb-8",
        }}
      >
        <Carousel width="75vw" sliderRef={sliderRef}>
          {filteredJobs.map((job, jobIndex) => (
            <CarouselCard key={`${jobIndex}-${job?.postedDate}`}>
              <LatestJobCard job={job} index={jobIndex} />
            </CarouselCard>
          ))}
        </Carousel>
      </Stack>
    </>
  );
}

export default JobOpportunity;
