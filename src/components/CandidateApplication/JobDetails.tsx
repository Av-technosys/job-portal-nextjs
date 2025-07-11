import { JOB_DETAILS_SECTION } from "@/constants";
import { Typography } from "../common";
import { Job } from "@/types";

function JobDetails({ jobDetails }: { jobDetails: Job }) {
  const { JOB_TITLE } = JOB_DETAILS_SECTION;
  return (
    <>
      <Typography {...JOB_TITLE(jobDetails?.title as string)} />
    </>
  );
}

export default JobDetails;
