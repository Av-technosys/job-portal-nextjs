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
  const hasPaidAssessmentParams = Boolean(assesment_session_id && subject_id);
  const hasFreeAssessmentParams = Boolean(subject_id);
  let StudentAssessmentQuestions;

  // if (testType == "paid") {
  const paidAssesmentData = useGetStudentAssessmentQuestions({
    enabled: testType == "paid" && hasPaidAssessmentParams,
    queryParams: {
      assesment_session_id: assesment_session_id,
      subject_id: subject_id,
    },
  });
  // } else {
  const freeAssesmentData = useGetFreeAssessmentQuestions({
    enabled: testType !== "paid" && hasFreeAssessmentParams,
    queryParams: {
      subject_id: subject_id,
    },
  });
  // }

  if (testType == "paid") {
    StudentAssessmentQuestions = paidAssesmentData;
  } else {
    StudentAssessmentQuestions = freeAssesmentData;
  }

  const getAllStudentAssessmentQuestions =
    StudentAssessmentQuestions.data?.data?.questions;
  const AllStudentAssessmentQuestionsLength =
    getAllStudentAssessmentQuestions?.length;


  const isQuestionsLoading = StudentAssessmentQuestions.isLoading;
  const isQuestionsError = StudentAssessmentQuestions.isError;
  const questionErrorMessage =
    (StudentAssessmentQuestions.error as any)?.response?.data?.message ||
    (StudentAssessmentQuestions.error as any)?.message ||
    "Unable to load assessment questions.";

  const attempt_id = StudentAssessmentQuestions.data?.data?.attempt_id;
  const maxTimeFromBackend = StudentAssessmentQuestions.data?.data?.duration_minutes;
  const currentQuestion = getAllStudentAssessmentQuestions?.[currentQIndex - 1];

  // Redirect if this attempt was already submitted (prevents returning via back)
  useEffect(() => {
    try {
      if (attempt_id) {
        const key = `assessment_submitted_${attempt_id}`;
        const val = localStorage.getItem(key);
        if (val === "1") {
          router.replace(`/dashboard/assessment-summary/${attempt_id}`);
        }
      }
    } catch (e) {
      // ignore localStorage errors
    }
  }, [attempt_id]);

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
        `${getAllStudentAssessmentQuestions?.[currentQIndex - 1]?.id
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
      [`${getAllStudentAssessmentQuestions?.[currentQIndex - 1]?.id
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
      [`${getAllStudentAssessmentQuestions?.[currentQIndex - 1]?.id
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
      [`${getAllStudentAssessmentQuestions?.[currentQIndex - 1]?.id
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

  if (isQuestionsError) {
    return (
      <Stack
        stackProps={{
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          sx: { minHeight: "70vh", p: 3, textAlign: "center" },
        }}
      >
        <Typography
          typographyProps={{
            children: questionErrorMessage,
            variant: TypographyVariantEnum.H6,
            color: "error",
          }}
        />
        <Button
          buttonProps={{
            children: "Back to Assessments",
            variant: ButtonVariantEnum.CONTAINED,
          }}
          onClick={() => router.replace("/dashboard/assessment")}
        />
      </Stack>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Grid
        gridProps={{
          container: true,
          className: "h-screen",
        }}
      >
        {/* Left Side: Question Area */}
        <Grid
          gridProps={{
            size: { xs: 11, sm: 6.5, md: 8, lg: 8.6, xl: 9 },
            className: "h-full",
          }}
        >
          <div className="h-full p-4 md:p-6 lg:p-8 flex flex-col">
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col h-full overflow-hidden">
              
              {/* Top Info Bar */}
              <div className="flex flex-wrap items-center justify-between p-5 md:px-8 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-bold text-blue-800">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    Question {currentQIndex}
                  </span>
                  
                  {tabSwitchCount > 0 && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-600 border border-rose-100">
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Tab switched: {tabSwitchCount}
                    </span>
                  )}
                </div>

                <div className="mt-4 md:mt-0 px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-100 font-mono font-bold text-slate-700 text-lg flex items-center gap-2">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-amber-500">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <StopWatchHandler
                    maxTime={maxTimeFromBackend}
                    getStopWatchTime={getStopWatchTimeValue}
                    isLoading={isQuestionsLoading}
                  />
                </div>
              </div>

              {/* Question Area */}
              <div className="flex-grow p-6 md:p-10 overflow-y-auto">
                {currentQuestion?.question_paragraph && (
                  <div className="mb-6 p-5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 font-medium text-lg leading-relaxed">
                    {currentQuestion.question_paragraph}
                  </div>
                )}

                {currentQuestion?.question_image && (
                  <div className="mb-8 w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                    <img
                      src={currentQuestion.question_image}
                      alt={`Question ${currentQIndex}`}
                      className="w-full h-auto object-contain bg-white"
                      style={{ maxHeight: 400 }}
                    />
                  </div>
                )}

                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-8 leading-relaxed">
                  {currentQuestion?.question_text}
                </h2>

                <QuestionOptions
                  questionData={getAllStudentAssessmentQuestions?.[currentQIndex - 1]}
                  selectedValue={currentSelectedOption}
                  onChange={setCurrentSelectedOption}
                />
              </div>

              {/* Action Footer */}
              <div className="p-5 md:px-8 border-t border-slate-100 bg-white flex flex-wrap items-center gap-3 justify-between">
                <div className="flex gap-3">
                  <button
                    onClick={() => handleMarkForReviewAndNext(currentSelectedOption)}
                    className="px-5 py-2.5 text-sm font-bold rounded-xl border-2 border-amber-100 text-amber-700 hover:bg-amber-50 hover:border-amber-200 transition-colors"
                  >
                    Mark For Review
                  </button>
                  <button
                    onClick={handleClearResponse}
                    className="px-5 py-2.5 text-sm font-bold rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                  >
                    Clear
                  </button>
                </div>
                
                <button
                  onClick={() => handleSaveAndNext(currentSelectedOption)}
                  className="flex items-center gap-2 px-8 py-3 text-sm font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 active:scale-[0.98] transition-all"
                >
                  Save & Next
                  <ArrowForwardOutlinedIcon fontSize="small" />
                </button>
              </div>
            </div>
          </div>
        </Grid>

        {/* Right Side: Sidebar Area */}
        <Grid
          gridProps={{
            size: { xs: 1, sm: 5.5, md: 4, lg: 3.4, xl: 3 },
            className: "h-full",
          }}
        >
          <div className="h-full p-4 md:py-6 md:pr-6">
            <div className="h-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
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
            </div>
          </div>
        </Grid>
      </Grid>
    </div>  );
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
  const QuestionOptionsData = [
    { id: "A", text: questionData?.option_1 },
    { id: "B", text: questionData?.option_2 },
    { id: "C", text: questionData?.option_3 },
    { id: "D", text: questionData?.option_4 },
  ];

  return (
    <div className="flex flex-col gap-6">
      {QuestionOptionsData.map((option) => {
        if (!option.text) return null;
        const isSelected = selectedValue === option.id;
        
        return (
          <label
            key={option.id}
            className={`
              relative flex items-center p-4 md:p-5 cursor-pointer rounded-2xl border-2 transition-all duration-200
              ${isSelected 
                ? 'border-blue-500 bg-blue-50/50 shadow-sm' 
                : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50'
              }
            `}
          >
            <input
              type="radio"
              name="question-option"
              value={option.id}
              checked={isSelected}
              onChange={() => onChange(option.id)}
              className="hidden peer"
            />
            
            {/* Custom Radio Indicator */}
            <div className={`
              flex-shrink-0 w-6 h-6 rounded-full border-2 mr-5 flex items-center justify-center transition-colors
              ${isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'}
            `}>
              {isSelected && (
                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
              )}
            </div>

            {/* Option Text */}
            <span className={`text-lg font-medium ${isSelected ? 'text-blue-900' : 'text-slate-700'}`}>
              {option.text}
            </span>
          </label>
        );
      })}
    </div>
  );
};
