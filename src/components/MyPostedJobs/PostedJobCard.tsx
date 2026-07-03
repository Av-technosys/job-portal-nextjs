import { CommonObjectType, JobStatusEnum } from "@/types";
import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  Stack,
  TextWithIcon,
  Typography,
} from "../common";
import {
  POSTED_JOB_PAGE_CONFIG,
  NOTIFICATION_CONFIG,
  REOPEN_JOB_POST,
  MARK_AS_EXPIRED,
  DELETE_JOB_PERMANENTLY,
  ACTIVE_MENU_ITEMS,
  EXPIRED_MENU_ITEMS,
} from "@/constants";
import {
  FmdGoodOutlinedIcon,
  PeopleIcon,
  VisibilityOutlinedIcon,
  CurrencyRupeeIcon,
  CheckCircleOutlinedIcon,
  CancelOutlinedIcon,
  DeleteIcon,
  HighlightOffRoundedIcon,
} from "@/assets";
import { colorStyles } from "@/styles";
import { useMemo, useState } from "react";
import { getErrorMessageFromAPI, getInitials, getStatusProps } from "@/helper";
import { MenuItem } from "@mui/material";
import { useNotification, useUpdateJobStatus, useDeleteJob } from "@/services";

export default function PostedJobCard({
  job,
  handleViewApplicationClick,
}: {
  job: CommonObjectType;
  handleViewApplicationClick: (job: CommonObjectType) => void;
}) {
  const { POSTED_JOB_CARD } = POSTED_JOB_PAGE_CONFIG;
  const {
    DESIGNATION,
    IMAGE,
    SALARY_RANGE,
    LOCATION,
    JOB_TYPE,
    APPLICANTS,
    STATUS,
  } = POSTED_JOB_CARD;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const updateJobToExpiredMutate = useUpdateJobStatus();
  const useDeleteJobMutate = useDeleteJob();
  const { showNotification } = useNotification();

  function updateJobToExpired(jobId: number, status: string) {
    updateJobToExpiredMutate.mutate(
      { id: jobId, status: status },
      {
        onSuccess: () => {
          showNotification(NOTIFICATION_CONFIG.SUCCESS);
        },
        onError: (error) => {
          showNotification({
            ...getErrorMessageFromAPI(error),
          });
          console.error(error, "error");
        },
      }
    );
  }

  function deleteJob(jobId: number) {
    useDeleteJobMutate.mutate(jobId, {
      onSuccess: () => {
        showNotification(NOTIFICATION_CONFIG.DELETE_SUCCESS);
      },
      onError: (error) => {
        showNotification({
          ...getErrorMessageFromAPI(error),
        });
        console.error(error, "error");
      },
    });
  }
  const ACTIVE_MENU_ICONS = [
    {
      icon: <DeleteIcon sx={{ fontSize: 20, mr: 1 }} />,
    },
    {
      icon: <HighlightOffRoundedIcon sx={{ fontSize: 20, mr: 1 }} />,
    },
  ];
  const EXPIRED_MENU_ICONS = [
    {
      icon: <DeleteIcon sx={{ fontSize: 20, mr: 1 }} />,
    },
    {
      icon: <CheckCircleOutlinedIcon sx={{ fontSize: 20, mr: 1 }} />,
    },
  ];

  function handleMenuItemClick(key: string, jobId: number) {
    switch (key) {
      case DELETE_JOB_PERMANENTLY:
        deleteJob(jobId);
        break;
      case MARK_AS_EXPIRED:
        updateJobToExpired(jobId, JobStatusEnum.EXPIRED);
        break;
      case REOPEN_JOB_POST:
        updateJobToExpired(jobId, JobStatusEnum.ACTIVE);
        break;
    }
    handleClose();
  }

  const handleIconButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const ACTIVE_MENU = ACTIVE_MENU_ITEMS.map((item, index) => ({
    ...item,
    icon: ACTIVE_MENU_ICONS[index].icon,
  }));

  const EXPIRED_MENU = EXPIRED_MENU_ITEMS.map((item, index) => ({
    ...item,
    icon: EXPIRED_MENU_ICONS[index].icon,
  }));

  const postedJobDetails = useMemo(() => {
    return [
      {
        icon: (
          <FmdGoodOutlinedIcon
            sx={{
              color: colorStyles.listTitleTextColor,
              fontSize: "medium",
            }}
          />
        ),
        textProps: LOCATION(job),
      },
      {
        icon: (
          <CurrencyRupeeIcon
            sx={{
              color: colorStyles.listTitleTextColor,
              fontSize: "medium",
            }}
          />
        ),
        textProps: SALARY_RANGE(job),
      },
    ];
  }, [LOCATION, SALARY_RANGE, job]);

  const JOB_STATUS_ICONS: Record<JobStatusEnum, JSX.Element> = {
    [JobStatusEnum.ACTIVE]: (
      <CheckCircleOutlinedIcon
        sx={{
          color: colorStyles.green,
          fontSize: "medium",
        }}
      />
    ),
    [JobStatusEnum.EXPIRED]: (
      <CancelOutlinedIcon
        sx={{
          color: colorStyles.errorColor,
          fontSize: "medium",
        }}
      />
    ),
  };
  const { color, label } = getStatusProps(job.job_status as JobStatusEnum);

  return (
    <>
      <div className="flex flex-col bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
        
        {/* Header Section */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm flex items-center justify-center bg-slate-50 border border-slate-100">
              <Avatar {...IMAGE(job).avatarProps}>
                {getInitials({ name: String(job.company_name || "") })}
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
          
          <div className="relative">
            <IconButton onClick={handleIconButtonClick} sx={{ padding: '4px' }}>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 hover:text-slate-600"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
            </IconButton>
            <Menu
              handleClose={handleClose}
              anchorEl={anchorEl}
              styles={{
                paperStyles: {
                  width: "250px",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
                },
              }}
            >
              {(job.job_status === JobStatusEnum.ACTIVE
                ? ACTIVE_MENU
                : EXPIRED_MENU
              ).map((item) => (
                <MenuItem
                  key={`postedJobCardMenu-${item.key}`}
                  onClick={() =>
                    handleMenuItemClick(item.key, Number(job.job_id))
                  }
                  sx={{ padding: '12px 16px', '&:hover': { backgroundColor: '#f8fafc' } }}
                >
                  {item.icon}
                  <span className="font-medium text-sm text-slate-700">{item.label}</span>
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>

        {/* Status Pill & Meta */}
        <div className="flex flex-col gap-3 mb-5 mt-auto">
          <div className="flex items-center justify-between">
             <span className={`px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1 ${
               job.job_status === JobStatusEnum.ACTIVE 
                 ? "bg-emerald-100 text-emerald-800" 
                 : "bg-rose-100 text-rose-800"
             }`}>
               {job.job_status === JobStatusEnum.ACTIVE ? <CheckCircleOutlinedIcon fontSize="small" /> : <CancelOutlinedIcon fontSize="small" />}
               {STATUS(color, label)?.typographyProps?.children}
             </span>
             <div className="flex items-center gap-1 text-blue-600 text-sm font-semibold">
               <PeopleIcon fontSize="small" />
               <span>{APPLICANTS(job)?.typographyProps?.children || "0"} Applicants</span>
             </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 w-full mt-auto flex flex-col gap-2">
          <button
            onClick={() => handleViewApplicationClick(job as CommonObjectType)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-50 text-indigo-700 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-600 hover:text-white hover:shadow-md hover:shadow-indigo-500/20 rounded-xl text-sm font-bold transition-all duration-200"
          >
            <VisibilityOutlinedIcon fontSize="small" />
            View Applications
          </button>
        </div>
      </div>
    </>
  );
}
