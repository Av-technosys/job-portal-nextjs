import React from "react";
import { Button, NextImage, Stack, Typography } from "../common";
import { CREATE_JOB_URL, POSTED_JOB_CONFIG } from "@/constants";
import { postedJob } from "@/assets";
import { useRouter } from "next/router";

function EmptyPostedJobs() {
  const router = useRouter();
  const navigateToPostedJobs = () => {
    router.push(CREATE_JOB_URL);
  };
  const { TEXT_FEILD, APPLY_BUTTON } = POSTED_JOB_CONFIG;
  return (
    <>
      <Stack
        stackProps={{
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <NextImage
          props={{
            alt: "postedJob",
            src: postedJob,
          }}
        />
        <Typography {...TEXT_FEILD} />
        <Button {...APPLY_BUTTON} onClick={navigateToPostedJobs} />
      </Stack>
    </>
  );
}

export default EmptyPostedJobs;
