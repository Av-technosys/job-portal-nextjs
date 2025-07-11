import { useMemo, useState } from "react";
import { ArrowForwardOutlinedIcon } from "@/assets";
import { AssessmentNavigation, Button, Grid, Stack, Tabs } from "@/components";
import { ASSESSMENT_CONFIG } from "@/constants";
import { ButtonVariantEnum } from "@/types";

export default function MainAssessmentContainer() {
  const [currentQIndex, setCurrentQIndex] = useState(1);
  const [currentTabIndex, setCurrentTabIndex] = useState("0");
  const [userAnsweredData, setUserAnsweredData] = useState({});

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

  function handleMarkForReviewAndNext() {
    setUserAnsweredData({
      ...userAnsweredData,
      [`${currentTabIndex}_${currentQIndex}`]: {
        answer: 0,
        status: 1,
      },
    });
    moveToNextQuestion();
  }

  function handleClearResponse() {}

  function handleSaveAndNext() {
    setUserAnsweredData({
      ...userAnsweredData,
      [`${currentTabIndex}_${currentQIndex}`]: {
        answer: 0,
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
              Question Answer
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
                onClick={handleMarkForReviewAndNext}
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
                onClick={handleSaveAndNext}
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
