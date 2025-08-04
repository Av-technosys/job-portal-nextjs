import React from "react";
import { Button, Divider, NextImage, Stack, Typography } from "../common";
import { ASSESSMENT_SUBMISSION_PAGE_CONFIG } from "@/constants";
import { colorStyles } from "@/styles";
import { JA_LOGO } from "@/assets";
import { useRouter } from "next/navigation";
const sectionData = [
  {
    sectionName: "Numerical Reasoning",
    attempted: "7 out of 7",
    action: "Review",
  },
  {
    sectionName: "Verbal Reasoning",
    attempted: "7 out of 7",
    action: "Review",
  },
  {
    sectionName: "Logical Reasoning",
    attempted: "7 out of 7",
    action: "Review",
  },
  {
    sectionName: "Personality Test",
    attempted: "7 out of 7",
    action: "Review",
  },
  {
    sectionName: "Technical Skill Test",
    attempted: "7 out of 7",
    action: "Review",
  },
];

function AssessmentSubmission() {
  const {
    WELCOME_TEXT,
    JOB_SEEKER_ID,
    TIME,
    SUMMERY,
    SECTION_NAME,
    SECTION_NAME_ITEM,
    ATTEMPT_ITEM,
    ACTION_ITEM,
    ATTEMPTED,
    ACTION,
    BACK_TO_TEST,
    SUBMIT_BUTTON,
  } = ASSESSMENT_SUBMISSION_PAGE_CONFIG;
  const job = {
    company_name: "AV Technosys",
    welcome_text: "welcome user",
    time: "4:59",
  }; // Define the job variable

  const router = useRouter();

  function handleBackToTestClick() {
    router.push("/assessment");
  }
  function handleSubmitClick() {
    router.push("/assessment-summary");
  }

  return (
    <>
      <Stack>
        <Stack
          stackProps={{
            className: "mb-4",
            direction: "row",
            justifyContent: "space-between",
          }}
        >
          <NextImage
            props={{
              alt: "ja_logo",
              src: JA_LOGO,
            }}
          />
          <Stack
            stackProps={{ direction: "row", gap: 7, alignItems: "center" }}
          >
            <Stack>
              <Typography {...WELCOME_TEXT()} />
              <Typography {...JOB_SEEKER_ID()} />
            </Stack>
            <Typography {...TIME(job)} />
          </Stack>
        </Stack>
        <Divider />
        <Stack stackProps={{ className: "p-4" }}>
          <Typography {...SUMMERY()} />
        </Stack>
        <Stack stackProps={{ className: "border p-4", gap: 2 }}>
          <Stack
            stackProps={{
              className: "p-4 rounded-md",
              direction: "row",
              justifyContent: "space-between",
              sx: { bgcolor: colorStyles.filterTagsBackgroundColor },
            }}
          >
            <Stack
              stackProps={{
                width: "50%",
              }}
            >
              <Typography {...SECTION_NAME()} />
            </Stack>
            <Typography {...ATTEMPTED()} />
            <Typography {...ACTION()} />
          </Stack>
          <Stack
            stackProps={{
              className: "p-4 border",
            }}
          >
            {sectionData.map((section, index) => (
              <Stack
                key={`sectionData-${index}`}
                stackProps={{
                  direction: "row",
                  justifyContent: "space-between",
                }}
              >
                {/* Section Name */}
                <Stack
                  stackProps={{
                    className: " p-4 ",
                    direction: "column",
                    width: "50%",
                  }}
                >
                  <Typography {...SECTION_NAME_ITEM(section)} />
                </Stack>
                <Typography {...ATTEMPT_ITEM(section)} />
                <Stack
                  stackProps={{
                    sx: { color: colorStyles.filterTagsTextColor },
                  }}
                >
                  <Typography {...ACTION_ITEM(section)} />
                </Stack>
              </Stack>
            ))}
          </Stack>
          <Stack
            stackProps={{
              className: "border p-2",
              direction: "row",
              alignContent: "center",
              justifyContent: "space-between",
            }}
          >
            <Button onClick={handleBackToTestClick} {...BACK_TO_TEST} />
            <Button onClick={handleSubmitClick} {...SUBMIT_BUTTON} />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
export default AssessmentSubmission;
