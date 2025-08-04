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
import { ASSESSMENT_CONFIG, SAMPLE_QUESTIONS } from "@/constants";
import { ButtonVariantEnum, TypographyVariantEnum } from "@/types";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { colorStyles } from "@/styles";
import { useRouter } from "next/navigation";

export default function MainAssessmentContainer() {
  type AnsweredData = {
    [key: string]: {
      answer: string;
      status: number;
    };
  };

  const [currentQIndex, setCurrentQIndex] = useState(1);
  const [currentTabIndex, setCurrentTabIndex] = useState("0");
  const [currentSelectedOption, setCurrentSelectedOption] = useState("0");
  const [userAnsweredData, setUserAnsweredData] = useState<AnsweredData>({});
  const [stopwatchTime, setStopwatchTime] = useState(MAX_TIME);

  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const prevTypeRef = useRef<"blur" | "focus" | null>(null);

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
      userAnsweredData?.[`${currentTabIndex}_${currentQIndex}`]?.answer || "0"
    );
  }, [currentTabIndex, currentQIndex, userAnsweredData]);

  useEffect(() => {
    let timeoutId: any;

    if (stopwatchTime > 0) {
      timeoutId = setTimeout(() => {
        setStopwatchTime((prev) => prev - 1);
      }, 1000);
    }

    return () => clearTimeout(timeoutId);
  }, [stopwatchTime]);

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
      nextQuestionIndex <= ASSESSMENT_CONFIG.MAX_NO_OF_QUESTION &&
      nextQuestionIndex > 0
    ) {
      setCurrentQIndex(nextQuestionIndex);
    }
  }

  function handleMarkForReviewAndNext(answeredValue: string) {
    setUserAnsweredData({
      ...userAnsweredData,
      [`${currentTabIndex}_${currentQIndex}`]: {
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
      [`${currentTabIndex}_${currentQIndex}`]: {
        answer: "0",
        status: 2,
      },
    });
  }

  function handleSaveAndNext(answeredValue: string) {
    if (!answeredValue || answeredValue === "0") return;
    setUserAnsweredData({
      ...userAnsweredData,
      [`${currentTabIndex}_${currentQIndex}`]: {
        answer: answeredValue,
        status: 0,
      },
    });
    moveToNextQuestion();
  }

  function handleQIndexChange(qIndex: number) {
    if (qIndex <= ASSESSMENT_CONFIG.MAX_NO_OF_QUESTION && qIndex > 0) {
      setCurrentQIndex(qIndex);

      setUserAnsweredData((prev) => {
        if (prev[`${currentTabIndex}_${qIndex}`]) {
          return prev;
        }
        return {
          ...prev,
          [`${currentTabIndex}_${qIndex}`]: {
            answer: "",
            status: 2,
          },
        };
      });
    }
  }

  // useEffect(() => {
  //   console.log(userAnsweredData);
  // }, [userAnsweredData]);
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

              <Stack
                stackProps={{
                  alignItems: "end",
                  sx: {
                    width: "100%",
                    padding: "10px 10px",
                    backgroundColor: colorStyles.latestJobCardBackground,
                  },
                }}
              >
                <Typography
                  typographyProps={{
                    children: `Time left: ${String(
                      Math.floor(stopwatchTime / 60)
                    ).padStart(2, "0")}:${String(stopwatchTime % 60).padStart(
                      2,
                      "0"
                    )}`,
                    variant: TypographyVariantEnum.H5,
                    color: "text.secondary",
                    className: "text-center ",
                  }}
                />
              </Stack>

              <Typography
                typographyProps={{
                  children: SAMPLE_QUESTIONS[currentQIndex - 1].paragraph,
                  variant: TypographyVariantEnum.H6,
                  color: "text.secondary",
                  className: "text-center mt-4",
                }}
              />

              <Typography
                typographyProps={{
                  children: SAMPLE_QUESTIONS[currentQIndex - 1].question,
                  variant: TypographyVariantEnum.H6,
                  color: "text.secondary",
                  className: "text-center mt-4",
                }}
              />

              <QuestionOptions
                questionData={SAMPLE_QUESTIONS[currentQIndex - 1].options}
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
            assessmentSection={currentTabIndex}
          />
          <SubmitButton />
        </Grid>
      </Grid>
    </>
  );
}

type QuestionOptionsProps = {
  questionData: Record<string, string>;
  selectedValue: string;
  onChange: (value: string) => void;
};

const QuestionOptions = ({
  questionData,
  selectedValue,
  onChange,
}: QuestionOptionsProps) => {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
      >
        {Object.entries(questionData).map(([key, value]) => {
          return (
            <FormControlLabel
              key={`${key}-${value}`}
              value={key}
              control={<Radio />}
              label={value}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

const MAX_TIME = 20 * 60;

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
