import React, { useEffect, useMemo, useState } from "react";
import { Stack, Paper, Typography, Grid, IconButton } from "../common";
import { CommonObjectType } from "@/types";
import { useGetStudentAssessmentQuestions } from "@/services/useGetStudentAssessmentQuestions";

function QuestionNoBox({
  questionNo,
  questionStatus,
}: {
  questionNo: number | string;
  questionStatus: number;
}) {
  const statusLegendArr = ["green", "blue", "red", "grey"];
  return (
    <Paper
      paperProps={{
        sx: {
          padding: 4,
          background: statusLegendArr[questionStatus] || "white",
        },
      }}
    >
      <Stack
        stackProps={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {questionNo}
      </Stack>
    </Paper>
  );
}

function AssessmentStatusLegend() {
  const statusLegendArr = [
    "Answered",
    "Marked for Review",
    "Not Answered",
    "Not Visited",
  ];

  return (
    <Grid
      gridProps={{
        container: true,
        spacing: 1,
        padding: "6px",
      }}
    >
      {statusLegendArr.map((legendText, index) => {
        return (
          <Grid
            key={`${legendText}-${index}-questionNo`}
            gridProps={{
              size: 6,
            }}
          >
            <Stack
              stackProps={{
                direction: "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <QuestionNoBox questionNo={index + 1} questionStatus={index} />
              <Typography
                typographyProps={{
                  variant: "body1",
                  children: legendText,
                }}
              />
            </Stack>
          </Grid>
        );
      })}
    </Grid>
  );
}

export interface AssessmentNavigationProps {
  setCurrentQIndex: (questionNo: number) => void;
  userAssessmentDetails: CommonObjectType;
  assessmentSection: number | null | string;
}

export default function AssessmentNavigation({
  setCurrentQIndex,
  userAssessmentDetails,
  assessmentSection,
}: AssessmentNavigationProps) {
  const { data } = useGetStudentAssessmentQuestions();
  const questions = data?.data.questions;
  const questionArr = useMemo(() => {
    return questions ?? [];
  }, [questions]);
  return (
    <>
      <AssessmentStatusLegend />
      <Typography
        typographyProps={{
          variant: "h5",
          children: "Choose a Questions",
          sx: {
            pt: 2,
            pb: 1,
            px: 2,
            color: "white",
            backgroundColor: "#007AFF",
          },
        }}
      />
      <Grid
        gridProps={{
          container: true,
          rowSpacing: 1,
          columnSpacing: 2,
          sx: {
            overflowX: "hidden",
            overflowY: "scroll",
            height: "283px",
            padding: "8px",
          },
        }}
      >
        {questionArr?.map((question: any, index: any) => {
          const questionId = question.id;
          const questionDetails = userAssessmentDetails?.[
            `${questionId}_${index + 1}`
          ] as CommonObjectType;

          return (
            <Grid
              key={`${questionId}-${index}-questionNo`}
              gridProps={{
                size: 3,
                onClick: () => setCurrentQIndex(index + 1),
              }}
            >
              <QuestionNoBox
                questionNo={index + 1}
                questionStatus={questionDetails?.status as number}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
