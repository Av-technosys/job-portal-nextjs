import React from "react";
import { Button, NextImage, Stack, Typography } from "../common";
import { EMPTY_BOX_CONFIG, JOBS_URL } from "@/constants";
import { applyjob } from "@/assets";
import { useRouter } from "next/router";

function EmptyAppliedJobs() {
  const router = useRouter();
  const navigateToJobs = () => {
    router.push(JOBS_URL);
  };
  const { TEXT_FEILD, APPLY_BUTTON } = EMPTY_BOX_CONFIG;
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
            alt: "applyJob",
            src: applyjob,
          }}
        />
        <Typography {...TEXT_FEILD} />
        <Button {...APPLY_BUTTON} onClick={navigateToJobs} />
      </Stack>
    </>
  );
}

export default EmptyAppliedJobs;
