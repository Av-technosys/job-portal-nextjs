import {
  JOB_DETAIL_PAGE_CONFIG,
  JOBS_URL,
  LOCAL_STORAGE_KEY,
  LOGIN_URL,
  PAGIANTION_LIMIT,
  PROFILE_URL,
} from "@/constants";
import {
  Avatar,
  Chip,
  Loader,
  LoadingButton,
  Stack,
  Typography,
} from "../common";
import {
  getErrorMessageFromAPI,
  getInitials,
  getItem,
  mutateJobListQueryDataForAppliedJobs,
} from "@/helper";
import { colorStyles } from "@/styles";
import { useMemo } from "react";
import {
  getInfiniteSaveJobQueryOptions,
  useGetDetailedJobDetails,
  useJobApply,
  useNotification,
} from "@/services";
import {
  Job,
  TypographyFontColor,
  TypographyFontWeight,
  UserType,
} from "@/types";
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
    COMPANY_NAME,
    DESIGNATION,
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

    // Update the cache to reflect the changes on UI
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
          console.error(error, "error");
        },
      }
    );
  }

  if (jobDetailsAPIData?.isLoading) {
    return (
      <Loader
        loaderProps={{
          open: true,
        }}
      />
    );
  }

  if (jobDetailsAPIData?.isError || !job) {
    return (
      <Stack stackProps={{ gap: 1 }}>
        <Typography
          typographyProps={{
            children: "Unable to load job details.",
            variant: "h6",
          }}
          fontWeight={TypographyFontWeight.bold}
        />
        <Typography
          typographyProps={{
            children: "Please try again later.",
            variant: "body2",
          }}
          fontColor={TypographyFontColor.grey}
        />
      </Stack>
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
    <Stack stackProps={{ gap: { xs: 4, md: 5 }, className: "capitalize" }}>
      {/* Top Header Section */}
      <Stack
        stackProps={{
          direction: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          gap: { xs: 3, md: 0 },
        }}
      >
        <Stack stackProps={{ direction: "row", gap: { xs: 2, md: 3 }, alignItems: "center" }}>
          <Avatar {...IMAGE(job).avatarProps}>
            {getInitials({ name: String(job?.company_name || "") })}
          </Avatar>
          <Stack stackProps={{ gap: 0.5 }}>
            <Typography {...DESIGNATION(job)} />
            <Stack
              stackProps={{
                direction: "row",
                gap: 1.5,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Typography {...COMPANY_NAME(job)} />
              <Stack
                stackProps={{
                  className: "rounded px-2 py-0.5",
                  bgcolor: colorStyles.green,
                }}
              >
                <Typography {...JOB_TYPE(job)} />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        
        {!hideApplyButton && (
          <Stack stackProps={{ width: { xs: "100%", md: "auto" } }}>
            <LoadingButton
              {...APPLY_BUTTON}
              onClick={onApplyClick}
              loading={jobApplyMutate.isPending}
              buttonProps={{
                ...APPLY_BUTTON.buttonProps,
                sx: { width: { xs: "100%", md: "auto" }, py: { xs: 1.5, md: 1 } },
              }}
            />
          </Stack>
        )}
      </Stack>

      {/* Main Content Area */}
      <Stack
        stackProps={{
          direction: { xs: "column", md: "row" },
          gap: { xs: 4, md: 3 },
          justifyContent: "space-between",
        }}
      >
        {/*Left Side Description Stack */}
        <Stack stackProps={{ width: { xs: "100%", md: "60%" }, flex: { md: 1 }, gap: { xs: 4, md: 3 } }}>
          <Stack stackProps={{ gap: 1.5 }}>
            <Typography {...DESCRIPTION_TEXT()} />
            <Typography {...JOB_DESCRIPTION(job)} />
          </Stack>
          <Stack stackProps={{ gap: 2.5 }}>
            <Typography
              typographyProps={{
                children: "Job Details",
                variant: "h6",
              }}
              fontWeight={TypographyFontWeight.bold}
            />
            <Stack
              stackProps={{
                className: "grid grid-cols-2 sm:grid-cols-2",
                gap: 2,
              }}
            >
              {jobFacts.map((fact) => (
                <Stack
                  key={fact.label}
                  stackProps={{
                    className: "border rounded-xl p-3 sm:p-4",
                    borderColor: colorStyles.filterTagsBackgroundColor,
                    gap: 0.5,
                  }}
                >
                  <Typography
                    typographyProps={{
                      children: fact.label,
                      variant: "caption",
                    }}
                    fontColor={TypographyFontColor.grey}
                  />
                  <Typography
                    typographyProps={{
                      children: fact.value,
                      variant: "body2",
                    }}
                  />
                </Stack>
              ))}
            </Stack>
          </Stack>
          <Stack stackProps={{ gap: 2 }}>
            <Typography
              typographyProps={{
                children: "Skills Required",
                variant: "h6",
              }}
              fontWeight={TypographyFontWeight.bold}
            />
            <Stack
              stackProps={{
                direction: "row",
                gap: 1.5,
                flexWrap: "wrap",
              }}
            >
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    color="primary"
                    variant="outlined"
                    sx={{ borderRadius: "8px" }}
                  />
                ))
              ) : (
                <Typography
                  typographyProps={{
                    children: "N/A",
                    variant: "body2",
                  }}
                />
              )}
            </Stack>
          </Stack>
        </Stack>
        {/* Right side logo and text Stack */}
        <Stack
          stackProps={{
            direction: "column",
            gap: 3,
            width: { xs: "100%", md: "320px", lg: "360px" },
            flexShrink: 0,
          }}
        >
          <SalaryLocationCard job={job} />
          <JobOverviewCard job={job} />
          {/* <SocialLinksCard job={job} /> */}
        </Stack>
      </Stack>
    </Stack>
  );
}
export default JobDetail;
