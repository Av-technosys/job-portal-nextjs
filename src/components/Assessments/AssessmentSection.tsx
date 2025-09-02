import { ASSESSMENT_SECTION_PAGE_CONFIG } from "@/constants/assessmentSection";
import React from "react";
import { Button, Paper, Stack, Typography } from "../common";
import { StopWatchIcon, TotalQuestionsIcon } from "@/assets";

type testID = {
  id: string | string[] | undefined;
};

const {
  SECTION_HEADER,
  START_TEST,
  RETAKE_TEST,
  ANALYSIS_TEST,
  MAX_TIME,
  TOTAL_QUESTIONS,
} = ASSESSMENT_SECTION_PAGE_CONFIG;

const AssessmentSection = ({ id }: testID) => {
  const AssessmentSubjects = [
    "English",
    "Maths",
    "Science",
    "Reasoning",
    "History",
  ];
  return (
    <>
      <Stack
        stackProps={{
          direction: "column",
          spacing: "16px",
          alignItems: "center",
          className: "max-w-6xl mx-auto",
        }}
      >
        <Typography {...SECTION_HEADER()} />
        <Stack
          stackProps={{
            direction: "column",
            spacing: "16px",
            className: "w-full",
          }}
        >
          {AssessmentSubjects.map((item, index) => {
            return (
              <Paper key={index} paperProps={{ className: "p-3" }}>
                <Stack
                  stackProps={{
                    direction: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Stack>
                    <Stack> {item}</Stack>
                    <Stack stackProps={{ direction: "row", spacing: "20px" }}>
                      <Stack
                        stackProps={{
                          direction: "row",
                          spacing: "1px",
                          alignItems: "center",
                        }}
                      >
                        <TotalQuestionsIcon style={{ fontSize: "15px" }} />
                        <Typography {...TOTAL_QUESTIONS} />
                      </Stack>
                      <Stack
                        stackProps={{
                          direction: "row",
                          spacing: "1px",
                          alignItems: "center",
                        }}
                      >
                        <StopWatchIcon style={{ fontSize: "15px" }} />
                        <Typography {...MAX_TIME} />
                      </Stack>
                    </Stack>
                  </Stack>
                  {item != "English" ? (
                    <Button {...START_TEST} />
                  ) : (
                    <>
                      <Stack stackProps={{ direction: "row", spacing: "8px" }}>
                        <Button {...RETAKE_TEST} />
                        <Button {...ANALYSIS_TEST} />
                      </Stack>
                    </>
                  )}
                </Stack>
              </Paper>
            );
          })}
        </Stack>
      </Stack>
    </>
  );
};

export default AssessmentSection;
