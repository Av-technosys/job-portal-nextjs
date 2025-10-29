import React, { useState } from "react";
import { IconButton, Stack } from "../common";
import JOBOPPORTUNITY from "@/constants/jobOppotunity.json";
import LatestJobCard from "../LatestJobCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@/assets";

interface JobOpportunityProps {
  jobFilterKey?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}

function JobOpportunity({ jobFilterKey }: JobOpportunityProps) {
  const [slideCount, setSlideCount] = useState(0);
  const filteredJobs = JOBOPPORTUNITY.jobs.filter(
    ({ categoryName }) => categoryName === jobFilterKey
  );

  const handleSliderNext = () => {
    setSlideCount((prev) => prev < filteredJobs.length - 3 && prev + 1);
  };

  const handleSliderPrevious = () => {
    setSlideCount((prev) => prev > 0 && prev - 1);
  };

  return (
    <>
      <div className="w-full flex items-center justify-end pr-10 md:pr-0">
        <Stack
          stackProps={{
            width: "10%",
            direction: "row",
          }}
        >
          <IconButton onClick={() => handleSliderPrevious()}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton onClick={() => handleSliderNext()}>
            <ChevronRightIcon />
          </IconButton>
        </Stack>
      </div>
      <Stack
        stackProps={{
          direction: "row",
          alignItems: "center",
          justifyItems: "center",
          gap: 1,
          className: "max-w-6xl  mb-8   overflow-hidden p-2",
        }}
      >
        {filteredJobs.map((job, jobIndex) => (
          <div
            key={jobIndex}
            className=" transition-transform duration-500"
            style={{ transform: `translateX(-${slideCount * 100}%)` }}
          >
            <LatestJobCard job={job} index={jobIndex} />
          </div>
        ))}
      </Stack>
    </>
  );
}

export default JobOpportunity;
