import { useEffect, useMemo, useState } from "react";
import { ArrowForwardOutlinedIcon } from "@/assets";
import {
  AssessmentNavigation,
  Button,
  Grid,
  Stack,
  Tabs,
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

  useEffect(() => {
    setCurrentSelectedOption(
      userAnsweredData?.[`${currentTabIndex}_${currentQIndex}`]?.answer || "0"
    );
  }, [currentTabIndex, currentQIndex, userAnsweredData]);

  const tabItems = useMemo(() => {
    return [
      {
        label: "English",
        key: "english-0",
        value: "0",
        children: null,
      },
      {
        label: "Hindi",
        key: "hindi-1",
        value: "1",
        children: null,
      },
    ];
  }, []);

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
              <Stack
                stackProps={{
                  direction: "row",
                  alignItems: "center",
                  sx: {
                    width: "100%",
                  },
                }}
              >
                Sections:
                <Tabs
                  items={tabItems}
                  tabsProps={{
                    sx: {
                      width: "100%",
                    },
                    defaultValue: currentTabIndex,
                  }}
                  handleTabChange={setCurrentTabIndex}
                />
              </Stack>

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
