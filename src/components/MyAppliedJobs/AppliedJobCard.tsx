import React, { useState } from "react";
import { CommonObjectType } from "@/types";
import { APPLIED_JOB_PAGE_CONFIG } from "@/constants";
import { Avatar, Button, IconButton, Modal, Stack, Typography, When } from "../common";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import JobDetail from "../JobDetail";
import { colorStyles } from "@/styles";
import { getInitials } from "@/helper";
import Messaging from "../Messaging";
import { EventIcon } from "@/assets";

export default function AppliedJobCard({ job }: { job: CommonObjectType }) {
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

  const { APPLIED_JOB_CARD } = APPLIED_JOB_PAGE_CONFIG;
  const { DESIGNATION, JOB_TYPE, TIME_STAMP, VIEW_DETAILS_BUTTON, IMAGE } =
    APPLIED_JOB_CARD;

  function getJobDetailsId() {
    const nestedJob =
      typeof job?.job === "object" && job.job !== null
        ? (job.job as CommonObjectType)
        : {};
    const nestedJobDetails =
      typeof job?.job_details === "object" && job.job_details !== null
        ? (job.job_details as CommonObjectType)
        : {};

    return (
      job?.job_id ||
      nestedJob?.id ||
      nestedJob?.job_id ||
      nestedJobDetails?.id ||
      nestedJobDetails?.job_id ||
      job?.id
    );
  }

  function handleViewDetailsClick() {
    const jobDetailsId = getJobDetailsId();
    const parsedJobDetailsId = Number(jobDetailsId);

    if (!Number.isNaN(parsedJobDetailsId)) {
      setSelectedJobId(parsedJobDetailsId);
    }
  }

  function getApplicationStatusLabel() {
    if (Number(job?.application_status ?? 0) === 0) {
      return "Submitted";
    }
    return String(job?.application_status_label || "Received");
  }

  function getApplicationStatusColor() {
    const status = Number(job?.application_status ?? 0);
    switch (status) {
      case 0: return "bg-blue-100 text-blue-800";
      case 1: return "bg-amber-100 text-amber-800"; 
      case 2: return "bg-emerald-100 text-emerald-800"; 
      case 3: return "bg-rose-100 text-rose-800";
      default: return "bg-slate-100 text-slate-800";
    }
  }

  return (
    <>
      <div className="flex flex-col bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
        
        {/* Header Section */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm flex items-center justify-center bg-slate-50 border border-slate-100">
              <Avatar {...IMAGE(job).avatarProps}>
                {getInitials({ name: String(job?.company_name || "") })}
              </Avatar>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-slate-800 leading-tight line-clamp-2">
                {DESIGNATION(job)?.typographyProps?.children || "N/A"}
              </h3>
              <p className="text-sm font-medium text-slate-500 mt-0.5">
                {JOB_TYPE(job)?.typographyProps?.children || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Status Pill & Meta */}
        <div className="flex flex-col gap-3 mb-5 mt-auto">
          <div className="flex items-center justify-between">
             <span className={`px-3 py-1 text-xs font-bold rounded-full ${getApplicationStatusColor()}`}>
              {getApplicationStatusLabel()}
             </span>
             <div className="flex items-center gap-1 text-slate-400 text-sm font-medium">
               <EventIcon fontSize="small" />
               <span>{TIME_STAMP(job)?.typographyProps?.children || "N/A"}</span>
             </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 w-full mt-auto flex flex-col gap-2">
          <button
            onClick={handleViewDetailsClick}
            className="w-full px-4 py-2.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-xl text-sm font-bold transition-colors"
          >
            View Details
          </button>
          
          <When condition={job?.user === 28}>
            <div className="mt-2">
               <Messaging applicationId={job?.applicationId as number} />
            </div>
          </When>
        </div>
      </div>

      <Modal open={selectedJobId !== null} onClose={() => setSelectedJobId(null)}>
        <Stack
          stackProps={{
            sx: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: { xs: 2, md: 4 },
              width: { xs: "92%", md: "80%" },
              maxHeight: "85vh",
              overflow: "auto",
              borderRadius: "16px",
            },
          }}
        >
          <Stack stackProps={{ alignItems: "end", mb: 2 }}>
            <IconButton onClick={() => setSelectedJobId(null)}>
              <CancelOutlinedIcon sx={{ color: colorStyles.filterTagsTextColor }} />
            </IconButton>
          </Stack>
          {selectedJobId !== null && (
            <JobDetail jobId={selectedJobId} hideApplyButton />
          )}
        </Stack>
      </Modal>
    </>
  );
}
