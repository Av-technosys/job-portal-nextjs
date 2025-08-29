import React, { useEffect, useRef, useState } from "react";
import { ArrowForwardOutlinedIcon, ChevronRightIcon } from "@/assets";
import {
  AssessmentNavigation,
  Button,
  Grid,
  Modal,
  Stack,
  Typography,
} from "@/components";

import { ButtonVariantEnum, TypographyVariantEnum } from "@/types";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useRouter } from "next/navigation";
import StopWatchHandler from "@/components/Assessments/StopWatchHandler";
import { useGetStudentAssessmentQuestions } from "@/services/useGetStudentAssessmentQuestions";

export default function MainAssessmentContainer() {
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

  const StudentAssessmentQuestions = useGetStudentAssessmentQuestions();
  const getAllStudentAssessmentQuestions =
    StudentAssessmentQuestions.data?.data.questions;
  const AllStudentAssessmentQuestionsLength =
    getAllStudentAssessmentQuestions?.length;

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

  // const tabItems = useMemo(() => {
  //   return [
  //     {
  //       label: "English",
  //       key: "english-0",
  //       value: "0",
  //       children: null,
  //     },
  //     {
  //       label: "Hindi",
  //       key: "hindi-1",
  //       value: "1",
  //       children: null,
  //     },
  //   ];
  // }, []);

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

  return (
    <>
      <Grid
        gridProps={{
          container: true,
          className: "m-4",
          style: {
            height: "100%",
          },
        }}
      >
        <Grid
          gridProps={{
            size: 9,
          }}
        >
          <Stack
            stackProps={{
              justifyContent: "space-between",
              className: "h-full",
              sx: {
                height: "100%",
              },
            }}
          >
            <div>
              <div>Question No. {currentQIndex}</div>
              <div>Total Tab switched {tabSwitchCount}</div>
              <StopWatchHandler />
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
            </div>
            <Stack
              stackProps={{
                direction: "row",
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
            size: 3,
          }}
        >
          <AssessmentNavigation
            setCurrentQIndex={handleQIndexChange}
            userAssessmentDetails={userAnsweredData}
            assessmentSection={assessmentSectionValue}
          />
          <SubmitButton />
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

function SubmitButton() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  function handleSubmitTest() {
    router.push("/assessment-submission");
  }
  return (
    <React.Fragment>
      <Button
        buttonProps={{
          children: "Submit",
          variant: ButtonVariantEnum.CONTAINED,
          endIcon: <ChevronRightIcon />,
          sx: {
            marginTop: "16px",
          },
        }}
        onClick={() => setOpen(true)}
      />

      <Modal open={open} onClose={() => setOpen(false)}>
        <>
          <Stack
            stackProps={{
              width: "80%",
              sx: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                border: "2px solid #333",
                boxShadow: 24,
                p: 4,
                maxHeight: "80vh",
                maxWidth: "52rem",
                overflow: "auto",
              },
            }}
          >
            <Typography
              typographyProps={{
                children: "Start Next Section",
                variant: TypographyVariantEnum.H6,
                color: "text.secondary",
                className: "text-center ",
              }}
            />
            <Typography
              typographyProps={{
                children:
                  "Your Attempt for this section is successfully submitted. You Can Now Take a Break Before Starting Next Section. Do you Want to start the Next Section Now ?",
                variant: TypographyVariantEnum.H6,
                color: "text.secondary",
                className: "text-center mt-4",
              }}
            />

            <Stack
              stackProps={{
                direction: "row",
                spacing: 2,
                justifyContent: "flex-end",
              }}
            >
              <Button
                buttonProps={{
                  children: "Start Next Section",
                  variant: ButtonVariantEnum.CONTAINED,
                  color: "success",
                  sx: {
                    marginTop: "16px",
                  },
                }}
                onClick={handleSubmitTest}
              />
              <Button
                buttonProps={{
                  children: "Close Section",
                  variant: ButtonVariantEnum.CONTAINED,
                  color: "error",
                  sx: {
                    marginTop: "16px",
                  },
                }}
                onClick={() => setOpen(false)}
              />
            </Stack>
          </Stack>
        </>
      </Modal>
    </React.Fragment>
  );
}
