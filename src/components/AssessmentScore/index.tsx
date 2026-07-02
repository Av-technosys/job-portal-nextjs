import { Loader } from "../common";
import { useGetAssessmentScoreInfo } from "@/services/useGetAssessmentScoreDetails";
import Link from "next/link";
import { useMemo, useEffect, useState } from "react";
import { ArrowForwardOutlinedIcon } from "@/assets";

type paramID = {
  id: string | number | string[];
};

function AssessmentScore({ id }: paramID) {
  const assessmentScoreDetails = useGetAssessmentScoreInfo({
    queryParams: { id },
  });

  const scoreDetails = useMemo(() => {
    const data = assessmentScoreDetails?.data?.data;
    if (!data) return null;
    return {
      ...data,
      assesment_total: data["assesment_total "] || data.assesment_total,
    };
  }, [assessmentScoreDetails?.data?.data]);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  if (!scoreDetails || !isClient) {
    return (
      <Loader
        loaderProps={{
          open: true,
        }}
      />
    );
  }

  const marksScored = parseFloat(scoreDetails?.total_marks_scored || "0");
  const totalMarks = parseFloat(scoreDetails?.assesment_total || "1");
  const percentage = Math.round((marksScored / totalMarks) * 100);

  // SVG Circle properties
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let scoreMessage = "Good Effort!";
  let scoreColor = "text-amber-500";
  let strokeColor = "stroke-amber-500";
  if (percentage >= 80) {
    scoreMessage = "Outstanding Performance!";
    scoreColor = "text-emerald-500";
    strokeColor = "stroke-emerald-500";
  } else if (percentage >= 60) {
    scoreMessage = "Great Job!";
    scoreColor = "text-blue-500";
    strokeColor = "stroke-blue-500";
  } else if (percentage < 40) {
    scoreMessage = "Keep Practicing!";
    scoreColor = "text-rose-500";
    strokeColor = "stroke-rose-500";
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 overflow-hidden relative">
        
        {/* Background Decorative Blob */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-50 blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-indigo-50 blur-3xl opacity-60"></div>

        <div className="relative p-8 md:p-12 flex flex-col items-center">
          
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-3 tracking-tight">
              Assessment Complete
            </h1>
            <p className="text-slate-500 font-medium text-lg">
              Here is a summary of your performance
            </p>
          </div>

          {/* Score Visual Ring */}
          <div className="relative flex items-center justify-center mb-12">
            {/* Background Ring */}
            <svg className="transform -rotate-90 w-48 h-48">
              <circle
                cx="96"
                cy="96"
                r={radius}
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-slate-100"
              />
              {/* Progress Ring */}
              <circle
                cx="96"
                cy="96"
                r={radius}
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className={`${strokeColor} transition-all duration-1000 ease-out`}
                strokeLinecap="round"
              />
            </svg>
            
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className={`text-5xl font-black ${scoreColor}`}>
                {percentage}%
              </span>
              <span className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-wider">
                Score
              </span>
            </div>
          </div>

          {/* Greeting message based on score */}
          <h2 className={`text-2xl font-bold mb-8 ${scoreColor}`}>
            {scoreMessage}
          </h2>

          {/* Stats Widgets */}
          <div className="w-full grid grid-cols-2 gap-4 mb-10">
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col items-center text-center">
              <span className="text-slate-400 font-semibold text-sm mb-1">Marks Scored</span>
              <span className="text-3xl font-bold text-slate-800">{marksScored}</span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col items-center text-center">
              <span className="text-slate-400 font-semibold text-sm mb-1">Total Possible</span>
              <span className="text-3xl font-bold text-slate-800">{totalMarks}</span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="w-full">
            <Link href="/dashboard" passHref className="w-full block">
              <button className="w-full flex items-center justify-center gap-2 px-8 py-4 text-base font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 active:scale-[0.98] transition-all">
                Return to Dashboard
                <ArrowForwardOutlinedIcon fontSize="small" />
              </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AssessmentScore;
