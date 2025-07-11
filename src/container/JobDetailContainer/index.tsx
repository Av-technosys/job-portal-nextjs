import { JobDetail } from "@/components";
import { useRouter } from "next/router";
import React from "react";

function JobDetailContainer() {
  const router = useRouter();
  const { id } = router.query;

  return <JobDetail jobId={Number(id)} />;
}

export default JobDetailContainer;
