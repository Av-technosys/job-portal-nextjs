import React, { useMemo } from "react";
import { useGetDetailedJobDetails } from "@/services";
import JobDetails from "./JobDetails";
import CandidateDetails from "./CandidateDetails";
import { Divider, Loader } from "../common";
import { Job } from "@/types";

function CandidateApplicationList({ jobId }: { jobId: number }) {
  const jobDetailsAPIData = useGetDetailedJobDetails({
    queryParams: {
      jobId: jobId,
    },
  });

  const jobDetails = useMemo(() => {
    return jobDetailsAPIData?.data?.data as Job;
  }, [jobDetailsAPIData]);

  if (jobDetailsAPIData?.isLoading) {
    return (
      <Loader
        loaderProps={{
          open: true,
        }}
      />
    );
  }

  return (
    <>
      <JobDetails jobDetails={jobDetails} />
      <Divider
        sx={{
          my: 2,
        }}
      />
      <CandidateDetails jobDetails={jobDetails} />
    </>
  );
}

export default CandidateApplicationList;
