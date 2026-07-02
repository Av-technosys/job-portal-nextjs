import {
  JOB_DETAIL_PAGE_CONFIG,
  JOBS_URL,
  LOCAL_STORAGE_KEY,
  LOGIN_URL,
  PAGIANTION_LIMIT,
  PROFILE_URL,
} from "@/constants";
import { Avatar, Loader } from "../common";
import {
  getErrorMessageFromAPI,
  getInitials,
  getItem,
  mutateJobListQueryDataForAppliedJobs,
} from "@/helper";
import { useMemo } from "react";
import {
  getInfiniteSaveJobQueryOptions,
  useGetDetailedJobDetails,
  useJobApply,
  useNotification,
} from "@/services";
import { Job, UserType } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import SalaryLocationCard from "../SalaryLocationCard";
import JobOverviewCard from "../JobOverviewCard";

const PROFILE_REQUIRED_MESSAGE =
  "Complete your profile before applying for jobs.";
const RECRUITER_APPLY_RESTRICTED_MESSAGE =
  "Recruiters can't apply for jobs. Please use a job seeker account.";

function getDisplayValue(value: unknown) {
  if (Array.isArray(value)) return value.filter(Boolean).join(", ");
  return value !== undefined && value !== null && value !== ""
    ? String(value)
    : "N/A";
}

function getSalaryText(job?: Job) {
  if (!job) return "N/A";
  if (job.salary_range) return job.salary_range;
  if ((job as Record<string, unknown>).salary) {
    return String((job as Record<string, unknown>).salary);
  }
  const minSalary = (job as Record<string, unknown>).min_salary;
  const maxSalary = (job as Record<string, unknown>).max_salary;
  if (minSalary && maxSalary) return `${minSalary} - ${maxSalary}`;
  return "N/A";
}

function getLocationText(job?: Job) {
  if (!job) return "N/A";
  if (job.location) return job.location;
  return (
    [job.city, job.state, job.country].filter(Boolean).join(", ") || "N/A"
  );
}

function getSkills(job?: Job) {
  if (!job) return [];
  const skills = (job as Record<string, unknown>).skills;
  if (Array.isArray(skills)) return skills.filter(Boolean).map(String);
  if (typeof skills === "string" && skills.trim()) {
    return skills.split(",").map((skill) => skill.trim()).filter(Boolean);
  }
  return [];
}

function isUnauthorizedError(error: unknown) {
  return (
    (error as { response?: { status?: number } })?.response?.status === 401
  );
}

function JobDetail({
  jobId,
  hideApplyButton = false,
}: {
  jobId: number;
  hideApplyButton?: boolean;
}) {
  const jobDetailsAPIData = useGetDetailedJobDetails({
    queryParams: {
      jobId,
    },
  });
  const { showNotification } = useNotification();
  const jobApplyMutate = useJobApply();
  const queryClient = useQueryClient();
  const router = useRouter();

  const job = useMemo(() => {
    return jobDetailsAPIData?.data?.data as Job;
  }, [jobDetailsAPIData]);

  const {
    IMAGE,
    DESIGNATION,
    COMPANY_NAME,
    JOB_TYPE,
    APPLY_BUTTON,
    DESCRIPTION_TEXT,
    JOB_DESCRIPTION,
    NOTIFICATION_CONFIG,
  } = JOB_DETAIL_PAGE_CONFIG;

  function onJobApplyMutateSuccess() {
    const savedJobListingQueryKey = getInfiniteSaveJobQueryOptions({
      pageLimit: PAGIANTION_LIMIT,
    }).queryKey;

    queryClient.setQueryData(savedJobListingQueryKey, (oldData) =>
      mutateJobListQueryDataForAppliedJobs({
        oldData,
        job: {
          ...job,
          id: job.job_id as number,
        },
      })
    );

    queryClient.invalidateQueries({
      queryKey: ["job_list"],
    });
  }

  function onApplyClick() {
    if (!job?.job_id) return;

    if (!getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)) {
      router.push({
        pathname: LOGIN_URL,
        query: { redirectTo: router.asPath },
      });
      return;
    }

    if (getItem(LOCAL_STORAGE_KEY.CURRENT_USER_TYPE) === UserType.RECUITER_TYPE) {
      showNotification({
        message: RECRUITER_APPLY_RESTRICTED_MESSAGE,
      });
      return;
    }

    jobApplyMutate.mutate(
      {
        data: {
          job: job.job_id as number,
        },
      },
      {
        onSuccess: () => {
          onJobApplyMutateSuccess();
          showNotification(NOTIFICATION_CONFIG.APPLIED);
          router.push(JOBS_URL);
        },
        onError: (error) => {
          if (isUnauthorizedError(error)) {
            router.push({
              pathname: LOGIN_URL,
              query: { redirectTo: router.asPath },
            });
            return;
          }

          const errorMessage = getErrorMessageFromAPI(error);
          showNotification({
            ...errorMessage,
          });
          if (errorMessage.message.includes(PROFILE_REQUIRED_MESSAGE)) {
            router.push(PROFILE_URL);
          }
        },
      }
    );
  }

  if (jobDetailsAPIData?.isLoading) {
    return <Loader loaderProps={{ open: true }} />;
  }

  if (jobDetailsAPIData?.isError || !job) {
    return (
      <div className="flex flex-col gap-2 p-8 text-center bg-slate-50 rounded-2xl">
        <h3 className="text-xl font-bold text-slate-800">Unable to load job details.</h3>
        <p className="text-slate-500">Please try again later.</p>
      </div>
    );
  }

  const jobFacts = [
    { label: "Role", value: getDisplayValue(job?.role) },
    { label: "Vacancies", value: getDisplayValue(job?.vacancies) },
    { label: "Job Level", value: getDisplayValue(job?.job_level) },
    { label: "Experience", value: getDisplayValue(job?.experience) },
    { label: "Education", value: getDisplayValue(job?.education) },
    { label: "Job Type", value: getDisplayValue(job?.job_type) },
    { label: "Salary", value: getSalaryText(job) },
    { label: "Location", value: getLocationText(job) },
  ];
  const skills = getSkills(job);

  return (
    <div className="flex flex-col gap-6 font-sans">
      
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-blue-50/50 border border-blue-100 p-6 rounded-2xl shadow-sm gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm flex items-center justify-center bg-white border border-slate-200 shrink-0">
            <Avatar {...IMAGE(job).avatarProps} sx={{ width: 48, height: 48 }}>
              {getInitials({ name: String(job?.company_name || "") })}
            </Avatar>
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">
              {DESIGNATION(job)?.typographyProps?.children || "N/A"}
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="text-base font-bold text-slate-600">
                {COMPANY_NAME(job)?.typographyProps?.children || "N/A"}
              </span>
              <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-blue-100 text-blue-700 uppercase tracking-wide">
                {JOB_TYPE(job)?.typographyProps?.children || "N/A"}
              </span>
            </div>
          </div>
        </div>
        
        {!hideApplyButton && (
          <button
            onClick={onApplyClick}
            disabled={jobApplyMutate.isPending}
            className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50"
          >
            {jobApplyMutate.isPending ? "Applying..." : (APPLY_BUTTON?.buttonProps?.children || "Apply Now")}
          </button>
        )}
      </div>

      {/* Main Content Split */}
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left Column (Description & Details) */}
        <div className="w-full md:w-3/5 flex flex-col gap-8">
          
          {/* Job Description */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-2">
              {DESCRIPTION_TEXT()?.typographyProps?.children || "Job Description"}
            </h3>
            <div className="text-slate-600 leading-relaxed whitespace-pre-wrap">
              {JOB_DESCRIPTION(job)?.typographyProps?.children || "No description provided."}
            </div>
          </div>

          {/* Job Details Grid */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-2">
              Job Details
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {jobFacts.map((fact) => (
                <div key={fact.label} className="flex flex-col bg-slate-50 border border-slate-100 p-4 rounded-xl">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{fact.label}</span>
                  <span className="text-sm font-semibold text-slate-800">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Required */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-2">
              Skills Required
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <span key={skill} className="px-4 py-1.5 bg-indigo-50 text-indigo-700 border border-indigo-100 font-semibold text-sm rounded-full shadow-sm">
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-slate-500 italic">No specific skills listed.</span>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (Cards) */}
        <div className="w-full md:w-2/5 flex flex-col gap-4">
          <SalaryLocationCard job={job} />
          <JobOverviewCard job={job} />
        </div>

      </div>
    </div>
  );
}

export default JobDetail;
