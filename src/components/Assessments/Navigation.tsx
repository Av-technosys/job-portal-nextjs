import React, { useMemo } from "react";
import { CommonObjectType } from "@/types";

function getStatusTheme(status: number) {
  switch (status) {
    case 0: // Answered
      return { bg: "bg-emerald-500", text: "text-white", border: "border-emerald-600", dot: "bg-emerald-500", lightBg: "bg-emerald-50" };
    case 1: // Marked for Review
      return { bg: "bg-indigo-500", text: "text-white", border: "border-indigo-600", dot: "bg-indigo-500", lightBg: "bg-indigo-50" };
    case 2: // Not Answered
      return { bg: "bg-rose-500", text: "text-white", border: "border-rose-600", dot: "bg-rose-500", lightBg: "bg-rose-50" };
    case 3: // Not Visited
    default:
      return { bg: "bg-white", text: "text-slate-600", border: "border-slate-200", dot: "bg-slate-300", lightBg: "bg-slate-50" };
  }
}

function AssessmentStatusLegend() {
  const statusLegendArr = [
    { label: "Answered", status: 0 },
    { label: "Marked for Review", status: 1 },
    { label: "Not Answered", status: 2 },
    { label: "Visited", status: 3 },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50/50 border-b border-slate-100">
      {statusLegendArr.map((legend, index) => {
        const theme = getStatusTheme(legend.status);
        return (
          <div key={index} className="flex items-center gap-2.5">
            <div className={`w-3 h-3 rounded-full ${theme.dot} shadow-sm border border-black/5`}></div>
            <span className="text-xs font-semibold text-slate-600 leading-tight">
              {legend.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export interface AssessmentNavigationProps {
  setCurrentQIndex: (questionNo: number) => void;
  userAssessmentDetails: CommonObjectType;
  assessmentSection: number | null | string;
  questionData: any;
}

export default function AssessmentNavigation({
  setCurrentQIndex,
  userAssessmentDetails,
  questionData,
}: AssessmentNavigationProps) {
  const questionArr = useMemo(() => {
    return questionData ?? [];
  }, [questionData]);

  return (
    <div className="flex flex-col w-full h-full bg-white">
      <AssessmentStatusLegend />
      
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-slate-800">Question Navigator</h3>
        <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{questionArr.length} Total</span>
      </div>

      <div className="p-5 overflow-y-auto max-h-[360px]">
        <div className="grid grid-cols-5 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {questionArr?.map((question: any, index: any) => {
            const questionId = question.id;
            const questionDetails = userAssessmentDetails?.[`${questionId}_${index + 1}`] as CommonObjectType;
            const status = (questionDetails?.status as number) ?? 3;
            const theme = getStatusTheme(status);

            return (
              <button
                key={`${questionId}-${index}`}
                onClick={() => setCurrentQIndex(index + 1)}
                className={`
                  aspect-square rounded-xl flex items-center justify-center text-sm font-bold shadow-sm transition-all hover:-translate-y-0.5
                  ${theme.bg} ${theme.text} border ${theme.border}
                  ${status === 3 ? 'hover:bg-slate-50 hover:border-slate-300' : 'hover:opacity-90'}
                `}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
