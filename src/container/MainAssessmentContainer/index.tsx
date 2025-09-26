import React, { useEffect, useRef, useState } from "react";
import { ArrowForwardOutlinedIcon } from "@/assets";
import { Button, Grid, Stack, Typography } from "@/components";

import { ButtonVariantEnum, TypographyVariantEnum } from "@/types";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import StopWatchHandler from "@/components/Assessments/StopWatchHandler";
import AssessmentSidebar from "@/components/common/AssessmentSidebar";
import { useRouter } from "next/router";
import { useGetStudentAssessmentQuestions } from "@/services/useGetStudentAssessmentQuestions";
import { useGetFreeAssessmentQuestions } from "@/services/useGetFreeAssessmentQuestions";

export type testTypeProp = {
  testType: string;
};

export default function MainAssessmentContainer({ testType }: testTypeProp) {
  type AnsweredData = {
    [key: string]: {
      answer: string;
      status: number;
    };
  };

  const [assessmentSectionValue, setAssessmentSectionValue] = useState<
    number | null
  >(0);
  const [currentQIndex, setCurrentQIndex] = useState(1);
  const [currentTabIndex, setCurrentTabIndex] = useState("0");
  const [currentSelectedOption, setCurrentSelectedOption] = useState("0");
  const [userAnsweredData, setUserAnsweredData] = useState<AnsweredData>({});
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const prevTypeRef = useRef<"blur" | "focus" | null>(null);
  const [timeForSubmit, setTimeForSubmit] = useState<number | null>(null);

  const router = useRouter();
  const { assesment_session_id, subject_id } = router.query;
  let StudentAssessmentQuestions;

  if (testType == "paid") {
    StudentAssessmentQuestions = useGetStudentAssessmentQuestions({
      queryParams: {
        assesment_session_id: assesment_session_id,
        subject_id: subject_id,
      },
    });
  } else {
    StudentAssessmentQuestions = useGetFreeAssessmentQuestions({
      queryParams: {
        subject_id: subject_id,
      },
    });
  }

  const getAllStudentAssessmentQuestions =
    StudentAssessmentQuestions.data?.data?.questions;
  const AllStudentAssessmentQuestionsLength =
    getAllStudentAssessmentQuestions?.length;

  const attempt_id = StudentAssessmentQuestions.data?.data?.attempt_id;

  useEffect(() => {
    const handleFocus = () => {
      // Only count if we previously lost focus
      if (prevTypeRef.current !== "focus") {
        setTabSwitchCount((prev) => prev + 1);
      }
      prevTypeRef.current = "focus";
    };

    const handleBlur = () => {
      if (prevTypeRef.current !== "blur") {
        console.log("User left the tab.");
      }
      prevTypeRef.current = "blur";
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, [tabSwitchCount]);

  useEffect(() => {
    setCurrentSelectedOption(
      userAnsweredData?.[
        `${
          getAllStudentAssessmentQuestions?.[currentQIndex - 1]?.id
        }_${currentQIndex}`
      ]?.answer || "0"
    );
  }, [currentTabIndex, currentQIndex, userAnsweredData]);

  function moveToNextQuestion() {
    const nextQuestionIndex = currentQIndex + 1;
    if (
      nextQuestionIndex <= AllStudentAssessmentQuestionsLength &&
      nextQuestionIndex > 0
    ) {
      setCurrentQIndex(nextQuestionIndex);
    }
  }

  function handleMarkForReviewAndNext(answeredValue: string) {
    setUserAnsweredData({
      ...userAnsweredData,
      [`${
        getAllStudentAssessmentQuestions?.[currentQIndex - 1]?.id
      }_${currentQIndex}`]: {
        answer: answeredValue,
        status: 1,
      },
    });
    moveToNextQuestion();
  }

  function handleClearResponse() {
    setCurrentSelectedOption("0");
    setUserAnsweredData({
      ...userAnsweredData,
      [`${
        getAllStudentAssessmentQuestions?.[currentQIndex - 1]?.id
      }_${currentQIndex}`]: {
        answer: "0",
        status: 2,
      },
    });
  }

  function handleSaveAndNext(answeredValue: string) {
    if (!answeredValue || answeredValue === "0") return;
    setUserAnsweredData({
      ...userAnsweredData,
      [`${
        getAllStudentAssessmentQuestions?.[currentQIndex - 1]?.id
      }_${currentQIndex}`]: {
        answer: answeredValue,
        status: 0,
      },
    });
    setAssessmentSectionValue(
      getAllStudentAssessmentQuestions?.[currentQIndex - 1]?.id
    );
    moveToNextQuestion();
  }

  function handleQIndexChange(qIndex: number) {
    if (qIndex <= AllStudentAssessmentQuestionsLength && qIndex > 0) {
      setUserAnsweredData((prev) => {
        const prevIndex = currentQIndex;
        if (!prevIndex || prevIndex === qIndex) return prev;

        const prevQuestionId =
          getAllStudentAssessmentQuestions?.[prevIndex - 1]?.id;
        if (!prevQuestionId) return prev;

        const prevKey = `${prevQuestionId}_${prevIndex}`;
        const prevEntry = prev[prevKey];
        if (prevEntry && prevEntry.answer && prevEntry.answer !== "") {
          return prev;
        }
        return {
          ...prev,
          [prevKey]: {
            answer: prevEntry?.answer ?? "",
            status: 2,
          },
        };
      });
      setCurrentQIndex(qIndex);
    }
  }

  function getStopWatchTimeValue(time: number) {
    setTimeForSubmit(time);
  }

  return (
    <>
      <Grid
        gridProps={{
          container: true,
          className: " h-screen",
        }}
      >
        <Grid
          gridProps={{
            size: { xs: 11, sm: 6.5, md: 8, lg: 8.6, xl: 9 },
          }}
        >
          <Stack
            stackProps={{
              direction: "column",
              justifyContent: "space-between",
              className: "h-full p-2 sm:p-0",
              sx: {
                height: "100%",
                width: "100%",
              },
            }}
          >
            <Stack>
              <Stack>Question No. {currentQIndex}</Stack>
              <Stack>Total Tab switched {tabSwitchCount}</Stack>
              <StopWatchHandler getStopWatchTime={getStopWatchTimeValue} />
              {getAllStudentAssessmentQuestions?.[currentQIndex - 1]
                ?.question_paragraph && (
                <Typography
                  typographyProps={{
                    children:
                      getAllStudentAssessmentQuestions?.[currentQIndex - 1]
                        ?.question_paragraph,
                    variant: TypographyVariantEnum.H6,
                    color: "text.secondary",
                    className: "text-start mt-4",
                  }}
                />
              )}

              <Typography
                typographyProps={{
                  children:
                    getAllStudentAssessmentQuestions?.[currentQIndex - 1]
                      ?.question_text,
                  variant: TypographyVariantEnum.H6,
                  color: "text.secondary",
                  className: "text-start mt-4",
                }}
              />

              <QuestionOptions
                questionData={
                  getAllStudentAssessmentQuestions?.[currentQIndex - 1]
                }
                selectedValue={currentSelectedOption}
                onChange={setCurrentSelectedOption}
              />
            </Stack>
            <Stack
              stackProps={{
                direction: { xs: "column", sm: "row" },
                gap: 1,
              }}
            >
              <Button
                buttonProps={{
                  children: "Mark For Review & Next",
                  variant: ButtonVariantEnum.CONTAINED,
                }}
                onClick={() =>
                  handleMarkForReviewAndNext(currentSelectedOption)
                }
              />
              <Button
                buttonProps={{
                  children: "Clear Response",
                  variant: ButtonVariantEnum.CONTAINED,
                }}
                onClick={handleClearResponse}
              />
              <Button
                buttonProps={{
                  children: "Save & Next",
                  variant: ButtonVariantEnum.CONTAINED,
                  endIcon: <ArrowForwardOutlinedIcon />,
                }}
                onClick={() => handleSaveAndNext(currentSelectedOption)}
              />
            </Stack>
          </Stack>
        </Grid>

        <Grid
          gridProps={{
            size: { xs: 1, sm: 5.5, md: 4, lg: 3.4, xl: 3 },
          }}
        >
          <AssessmentSidebar
            setCurrentQIndex={handleQIndexChange}
            userAssessmentDetails={userAnsweredData}
            assessmentSection={assessmentSectionValue}
            userAnsweredData={userAnsweredData}
            timeForSubmit={timeForSubmit}
            tabSwitchCount={tabSwitchCount}
            attemptId={attempt_id}
            questionData={getAllStudentAssessmentQuestions}
          />
        </Grid>
      </Grid>
    </>
  );
}

type QuestionOptionsProps = {
  questionData: Record<string, string | any>;
  selectedValue: string;
  onChange: (value: string) => void;
};

const QuestionOptions = ({
  questionData,
  selectedValue,
  onChange,
}: QuestionOptionsProps) => {
  const QuestionOptionsData = {
    A: questionData?.option_1,
    B: questionData?.option_2,
    C: questionData?.option_3,
    D: questionData?.option_4,
  };

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
      >
        {Object.entries(QuestionOptionsData).map(([key, value]) => {
          return (
            <>
              <FormControlLabel
                key={`${key}-${value}`}
                value={key}
                control={<Radio />}
                label={value}
              />
            </>
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};
