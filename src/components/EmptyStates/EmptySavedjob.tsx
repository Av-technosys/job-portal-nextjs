import React from "react";
import { Button, NextImage, Stack, Typography } from "../common";
import { JOBS_URL, SAVED_BOX_CONFIG } from "@/constants";
import { savedJob } from "@/assets";
import { useRouter } from "next/router";

function EmptySavedJobs() {
  const router = useRouter();
  const navigateToJobs = () => {
    router.push(JOBS_URL);
  };
  const { TEXT_FEILD, APPLY_BUTTON } = SAVED_BOX_CONFIG;
  return (
    <>
      <Stack
        stackProps={{
          justifyContent: "center",
          gap: 1,
          alignItems: "center",
        }}
      >
        <NextImage
          props={{
            alt: "savedJob",
            src: savedJob,
          }}
        />
        <Typography {...TEXT_FEILD} />
        <Button {...APPLY_BUTTON} onClick={navigateToJobs} />
      </Stack>
    </>
  );
}

export default EmptySavedJobs;
