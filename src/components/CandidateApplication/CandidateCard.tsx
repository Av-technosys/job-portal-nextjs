import { CommonObjectType } from "@/types";
import {
  Avatar,
  Chip,
  TextWithIcon,
  IconButton,
} from "../common";
import {
  CANDIDATE_APPLICATION_PAGE_CONFIG,
  getCandidateApplicationStatusLabel,
} from "@/constants";
import { getInitials } from "@/helper";

import {
  AccessTimeOutlinedIcon,
  BusinessCenterOutlinedIcon,
  FmdGoodOutlinedIcon,
  MoreVertIcon,
} from "@/assets";
import { useMemo } from "react";

function getStatusColor(status: number) {
  if (status === 5) {
    return "error";
  }

  if (status >= 7) {
    return "success";
  }

  if (status >= 4) {
    return "info";
  }

  if (status === 3) {
    return "primary";
  }

  if (status === 2) {
    return "warning";
  }

  return "default";
}

export default function CandidateApplicationCard({
  candidate,
  openApplicationPopup,
  handleIconButtonClick,
}: {
  candidate: CommonObjectType;
  openApplicationPopup: VoidFunction;
  handleIconButtonClick: (event: React.MouseEvent<HTMLElement>) => void;
}) {
  const { CANDIDATE_CARD } = CANDIDATE_APPLICATION_PAGE_CONFIG;
  const { IMAGE, JOB_TYPE, LOCATION, EXPERIENCE } = CANDIDATE_CARD;
  const applicationStatus = Number(candidate?.application_status || 0);
  const applicationStatusLabel = getCandidateApplicationStatusLabel(
    applicationStatus,
    String(candidate?.application_status_label || "Received")
  );

  const candidateDetails = useMemo(() => {
    return [
      {
        icon: (
          <BusinessCenterOutlinedIcon
            sx={{ color: "#6366f1", fontSize: "16px" }}
          />
        ),
        textProps: JOB_TYPE(candidate),
      },
      {
        icon: (
          <AccessTimeOutlinedIcon
            sx={{ color: "#6366f1", fontSize: "16px" }}
          />
        ),
        textProps: EXPERIENCE(candidate),
      },
      {
        icon: (
          <FmdGoodOutlinedIcon
            sx={{ color: "#6366f1", fontSize: "16px" }}
          />
        ),
        textProps: LOCATION(candidate),
      },
    ];
  }, [EXPERIENCE, JOB_TYPE, LOCATION, candidate]);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 p-5 md:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(79,70,229,0.08)] hover:border-indigo-200 hover:-translate-y-0.5 transition-all duration-300 my-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 capitalize">
      {/* Left section: Avatar and Candidate Info */}
      <div className="flex items-start md:items-center gap-4 w-full md:w-auto min-w-0 flex-1">
        {/* Avatar */}
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-indigo-50 shrink-0 flex items-center justify-center text-indigo-700 font-bold text-lg">
          <Avatar
            {...IMAGE(candidate.user as CommonObjectType).avatarProps}
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "1rem",
              bgcolor: "transparent",
              color: "#4f46e5",
              fontWeight: "bold",
              fontSize: "1.25rem",
            }}
          >
            {getInitials({ name: String(candidate?.name || (candidate.user as CommonObjectType)?.first_name || "") })}
          </Avatar>
        </div>

        {/* Candidate details column */}
        <div className="flex flex-col gap-1.5 min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-tight truncate">
              {String((candidate.user as CommonObjectType)?.first_name || (candidate.user as CommonObjectType)?.name || candidate?.name || "Candidate")}
            </h3>
            <Chip
              label={applicationStatusLabel}
              color={getStatusColor(applicationStatus) as any}
              size="small"
              variant="outlined"
              sx={{ textTransform: "none", fontWeight: 600, borderRadius: "6px" }}
            />
          </div>

          {candidate?.designation && (
            <p className="text-sm font-semibold text-indigo-600 truncate">
              {String(candidate?.designation)}
            </p>
          )}

          {/* Metadata chips */}
          <div className="flex flex-wrap items-center gap-2 mt-1">
            {candidateDetails.map((detail, index) => (
              <div
                key={`CandidateApplicationDetails-${index}`}
                className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100/80 text-slate-600 text-xs md:text-sm font-medium"
              >
                <TextWithIcon icon={detail.icon} textProps={detail.textProps} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right section: Action Button & Menu */}
      <div className="flex items-center justify-end gap-3 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
        <button
          onClick={openApplicationPopup}
          className="flex-1 md:flex-initial px-6 py-2.5 bg-indigo-50 text-indigo-700 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-600 hover:text-white hover:shadow-md hover:shadow-indigo-500/20 rounded-xl text-sm font-bold transition-all duration-200"
        >
          Open Profile
        </button>

        <div className="shrink-0">
          <IconButton
            onClick={handleIconButtonClick}
            sx={{
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              padding: "8px",
              color: "#64748b",
              "&:hover": {
                backgroundColor: "#f8fafc",
                borderColor: "#cbd5e1",
                color: "#1e293b",
              },
            }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
