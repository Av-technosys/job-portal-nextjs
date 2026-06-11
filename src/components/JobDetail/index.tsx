import {
  JOB_DETAIL_PAGE_CONFIG,
  JOBS_URL,
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
import { Job, TypographyFontColor, TypographyFontWeight } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import SalaryLocationCard from "../SalaryLocationCard";
import JobOverviewCard from "../JobOverviewCard";

const PROFILE_REQUIRED_MESSAGE =
  "Complete your profile before applying for jobs.";

function getDisplayValue(value: unknown) {
  if (Array.isArray(value)) return value.filter(Boolean).join(", ");
  return value !== undefined && value !== null && value !== ""
    ? String(value)
    : "N/A";
}

function getSalaryText(job: Job) {
  if (job.salary_range) return job.salary_range;
  if ((job as Record<string, unknown>).salary) {
    return String((job as Record<string, unknown>).salary);
  }
  const minSalary = (job as Record<string, unknown>).min_salary;
  const maxSalary = (job as Record<string, unknown>).max_salary;
  if (minSalary && maxSalary) return `${minSalary} - ${maxSalary}`;
  return "N/A";
}

function getLocationText(job: Job) {
  if (job.location) return job.location;
  return (
    [job.city, job.state, job.country].filter(Boolean).join(", ") || "N/A"
  );
}

function getSkills(job: Job) {
  const skills = (job as Record<string, unknown>).skills;
  if (Array.isArray(skills)) return skills.filter(Boolean).map(String);
  if (typeof skills === "string" && skills.trim()) {
    return skills.split(",").map((skill) => skill.trim()).filter(Boolean);
  }
  return [];
}

function JobDetail({ jobId }: { jobId: number }) {
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
    <Stack stackProps={{ gap: 4, className: "capitalize" }}>
      <Stack
        stackProps={{
          direction: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack stackProps={{ direction: "row", gap: 2, alignItems: "center" }}>
          <Avatar {...IMAGE(job).avatarProps}>
            {getInitials({ name: String(job?.company_name || "") })}
          </Avatar>
          <Stack
            stackProps={{
              className: "-mt-4 md:-mt-0",
            }}
          >
            <Typography {...DESIGNATION(job)} />
            <Stack
              stackProps={{
                className: "pt-2 md:pt-0",
                direction: "row",
                gap: 1,
              }}
            >
              <Typography {...COMPANY_NAME(job)} />
              <Stack
                stackProps={{
                  className: "rounded-sm px-2",
                  bgcolor: colorStyles.green,
                }}
              >
                <Typography {...JOB_TYPE(job)} />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <LoadingButton
          {...APPLY_BUTTON}
          onClick={onApplyClick}
          loading={jobApplyMutate.isPending}
        />
      </Stack>

      {/* full Stack */}
      <Stack
        stackProps={{
          direction: { xs: "column", md: "row" },
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        {/*Left Side Description Stack */}
        <Stack stackProps={{ width: { xs: "100%", md: "60%" }, gap: 3 }}>
          <Stack stackProps={{ gap: 1 }}>
            <Typography {...DESCRIPTION_TEXT()} />
            <Typography {...JOB_DESCRIPTION(job)} />
          </Stack>
          <Stack stackProps={{ gap: 2 }}>
            <Typography
              typographyProps={{
                children: "Job Details",
                variant: "h6",
              }}
              fontWeight={TypographyFontWeight.bold}
            />
            <Stack
              stackProps={{
                className: "grid grid-cols-1 sm:grid-cols-2",
                gap: 2,
              }}
            >
              {jobFacts.map((fact) => (
                <Stack
                  key={fact.label}
                  stackProps={{
                    className: "border rounded-lg p-3",
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
          <Stack stackProps={{ gap: 1 }}>
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
                gap: 1,
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
            gap: 2,
            width: { xs: "100%", md: "40%" },
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
