import { ASSESSMENT_SUMMARY } from "@/assets";
import { NextImage } from "../common";
import { useRouter } from "next/navigation";
import { ArrowForwardOutlinedIcon } from "@/assets";

export type paramAttemptId = {
  attemptId: number | string | string[];
};

function AssessmentSummary({ attemptId }: paramAttemptId) {
  const router = useRouter();

  function handleGiveFeedbackClick() {
    router.push("/contact-us");
  }

  function handleShowScoreClick() {
    router.push(`/dashboard/assessment-score/${attemptId}`);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 overflow-hidden flex flex-col">
        
        {/* Success Banner */}
        <div className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 p-8 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
          
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30">
            <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2 tracking-tight">
            Assessment Submitted Successfully!
          </h1>
          <p className="text-emerald-50 font-medium text-sm md:text-base">
            Your responses have been recorded and saved safely.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
          
          {/* Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="max-w-[240px] md:max-w-xs drop-shadow-xl">
              <NextImage
                props={{
                  alt: "Assessment_summary_image",
                  src: ASSESSMENT_SUMMARY,
                }}
              />
            </div>
          </div>

          {/* Details */}
          <div className="w-full md:w-1/2 flex flex-col">
            <h2 className="text-2xl font-bold text-slate-800 mb-3">
              What&apos;s Next?
            </h2>
            <p className="text-slate-500 leading-relaxed mb-6">
              You have completed the assessment. Click the button below to view your detailed performance report, score, and analytics.
            </p>

            <div className="bg-indigo-50/50 rounded-2xl p-5 border border-indigo-100 mb-8">
              <p className="text-slate-600 font-medium text-sm">
                We&apos;d love to hear about your experience! If you faced any issues or have suggestions, please let us know.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 mt-auto">
              <button
                onClick={handleShowScoreClick}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 text-base font-bold rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98] transition-all"
              >
                View Detailed Score
                <ArrowForwardOutlinedIcon fontSize="small" />
              </button>
              
              <button
                onClick={handleGiveFeedbackClick}
                className="w-full flex items-center justify-center px-6 py-3 text-sm font-bold rounded-xl border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-all"
              >
                Give Feedback
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AssessmentSummary;
