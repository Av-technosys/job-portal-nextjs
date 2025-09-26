import React, { useState } from "react";
import AssessmentNavigation from "./Navigation";
import { useRouter } from "next/router";
import { useNotification } from "@/services";
import { UseCreateStudentAnsweredData } from "@/services/useCreateStudentTestAnsweredData";
import { getErrorMessageFromAPI } from "@/helper";
import { Button, Modal, Stack, Typography } from "../common";
import { ButtonVariantEnum, TypographyVariantEnum } from "@/types";
import { ChevronRightIcon } from "@/assets";

const AssessmentSideBarDrawer = ({
  isExpanded,
  setCurrentQIndex,
  userAssessmentDetails,
  assessmentSection,
  userAnsweredData,
  timeForSubmit,
  tabSwitchCount,
  attemptId,
  questionData,
}: any) => {
  return (
    <>
      {isExpanded && (
        <>
          <Stack
            stackProps={{
              width: "100%",
              height: "100%",
              direction: "column",
              justifyContent: "space-between",
            }}
          >
            <AssessmentNavigation
              setCurrentQIndex={setCurrentQIndex}
              userAssessmentDetails={userAssessmentDetails}
              assessmentSection={assessmentSection}
              questionData={questionData}
            />

            <SubmitButton
              userAnsweredData={userAnsweredData}
              timeForSubmit={timeForSubmit}
              tabSwitchCount={tabSwitchCount}
              attemptId={attemptId}
            />
          </Stack>
        </>
      )}
    </>
  );
};

export default AssessmentSideBarDrawer;

type SubmitButtonProps = {
  userAnsweredData: any;
  timeForSubmit: number | null;
  tabSwitchCount: number;
  attemptId: number;
};

function SubmitButton({
  userAnsweredData,
  timeForSubmit,
  tabSwitchCount,
  attemptId,
}: SubmitButtonProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { showNotification } = useNotification();

  // const data = {
  //   answers: {
  //     ...userAnsweredData,
  //   },
  //   timeLeft: timeForSubmit,
  //   tabSwitchCount: tabSwitchCount,
  //   is_completed: true,
  // };

  const answerMap: Record<string, number> = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
  };

  // convert userAnsweredData into required format
  const transformedAnswers: Record<string, string> = Object.entries(
    userAnsweredData || {}
  ).reduce((acc, [key, value]: any) => {
    const answer = answerMap[value.answer] ?? null;
    if (answer !== null) {
      acc[key] = `1_${answer}`;
    }
    return acc;
  }, {} as Record<string, string>);

  const data = {
    answers: transformedAnswers,
    timeLeft: timeForSubmit,
    tabSwitchCount: tabSwitchCount,
    is_completed: false,
  };

  const createStudentTestAnsweredData = UseCreateStudentAnsweredData({
    mutationConfig: {
      onSuccess: () => {
        router.push(`/dashboard/assessment-summary/${attemptId}`);
      },
      onError: (error) => {
        showNotification({
          ...getErrorMessageFromAPI(error),
        });
        console.error(error, "error");
      },
    },
  });

  function handleSubmitTest() {
    createStudentTestAnsweredData.mutate({ data, attemptId });
    setOpen(false);
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
            marginBottom: "16px",
            marginLeft: "8px",
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
                  children: "Close",
                  variant: ButtonVariantEnum.CONTAINED,
                  color: "error",
                  sx: {
                    marginTop: "16px",
                  },
                }}
                onClick={() => setOpen(false)}
              />
              <Button
                buttonProps={{
                  children: "Submit",
                  variant: ButtonVariantEnum.CONTAINED,
                  color: "success",
                  sx: {
                    marginTop: "16px",
                  },
                }}
                onClick={handleSubmitTest}
              />
            </Stack>
          </Stack>
        </>
      </Modal>
    </React.Fragment>
  );
}
