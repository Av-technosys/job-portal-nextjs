import React, { useMemo } from "react";
import { CommonObjectType, JobStatusEnum } from "@/types";
import { Avatar, When } from "../common";
import { SAVED_JOB_PAGE_COFIG } from "@/constants";
import {
  FmdGoodOutlinedIcon,
  CurrencyRupeeIcon,
  TurnedInIcon,
  EventIcon,
} from "@/assets";
import { getInitials } from "@/helper";

export default function SavedJobCard({
  job,
  handleApplyClick,
  handleUnSaveClick,
}: {
  job: CommonObjectType;
  handleApplyClick: (job: CommonObjectType) => void;
  handleUnSaveClick: (job: CommonObjectType) => void;
}) {
  const { JOB_SAVE_CARD } = SAVED_JOB_PAGE_COFIG;
  const {
    DESIGNATION,
    APPLY_BUTTON,
    JOB_TYPE,
    SALARY_RANGE,
    LOCATION,
    EXPIRY,
    IMAGE,
  } = JOB_SAVE_CARD;

  const jobDetails = useMemo(() => {
    return [
      {
        icon: <FmdGoodOutlinedIcon fontSize="small" className="text-slate-400" />,
        text: LOCATION(job)?.typographyProps?.children || "N/A",
      },
      {
        icon: <CurrencyRupeeIcon fontSize="small" className="text-slate-400" />,
        text: SALARY_RANGE(job)?.typographyProps?.children || "N/A",
      },
      ...(job?.status !== JobStatusEnum.EXPIRED
        ? [
            {
              icon: <EventIcon fontSize="small" className="text-slate-400" />,
              text: EXPIRY(job)?.typographyProps?.children || "N/A",
            },
          ]
        : []),
    ];
  }, [LOCATION, SALARY_RANGE, EXPIRY, job]);

  return (
    <div className="flex flex-col bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
      
      {/* Header Section */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm flex items-center justify-center bg-slate-50 border border-slate-100 shrink-0">
            <Avatar {...IMAGE(job).avatarProps}>
              {getInitials({ name: String(job?.company_name || "") })}
            </Avatar>
          </div>
          <div className="flex flex-col gap-0.5">
            <h3 className="text-lg font-bold text-slate-800 leading-tight line-clamp-2">
              {String(job?.title || (job?.job as CommonObjectType)?.title || "N/A")}
            </h3>
            <p className="text-sm font-medium text-slate-500">
              {DESIGNATION(job)?.typographyProps?.children || "N/A"}
            </p>
            <div className="mt-1">
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium text-xs">
                {JOB_TYPE(job)?.typographyProps?.children || "N/A"}
              </span>
            </div>
          </div>
        </div>
        
        {/* Unsave Icon */}
        <When condition={job?.id !== undefined}>
          <button
            onClick={() => handleUnSaveClick(job)}
            className="p-1.5 rounded-full text-indigo-500 bg-indigo-50 hover:bg-indigo-100 transition-colors"
            title="Remove from saved"
          >
            <TurnedInIcon fontSize="small" />
          </button>
        </When>
      </div>

      {/* Metadata Section */}
      <div className="flex flex-col gap-2 mb-5 mt-auto">
        {jobDetails.map((detail, index) => (
          <div key={`jobDetails-${index}`} className="flex items-center gap-2 text-slate-500 text-sm font-medium">
            {detail.icon}
            <span className="truncate">{detail.text}</span>
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="pt-4 border-t border-slate-100 w-full mt-auto">
        <button
          onClick={() => handleApplyClick(job)}
          className="w-full px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20 active:scale-[0.98] rounded-xl text-sm font-bold transition-all"
        >
          {APPLY_BUTTON(job)?.buttonProps?.children || "Apply Now"}
        </button>
      </div>
    </div>
  );
}
