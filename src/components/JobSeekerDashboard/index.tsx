import { useCommonDetails } from "@/services";
import { Stack, Typography } from "../common";
import { DASHBOARD_PAGE_CONFIG } from "@/constants";
import { OverallCard } from "@/components";
import { WorkIcon, SaveAltIcon } from "@/assets";
import { useGetOverAllJobSeekerRecruiterDetails } from "@/services";
import { colorStyles } from "@/styles";

function JobSeekerDashboard() {
  const { name, userType } = useCommonDetails();
  const {
    data: responseData,
    isLoading,
    isRefetching,
  } = useGetOverAllJobSeekerRecruiterDetails();
  if (userType === -1) return null;

  return (
    <>
      <Stack>
        <Typography {...DASHBOARD_PAGE_CONFIG.TITLE_HEADER(name)} />
        <Typography {...DASHBOARD_PAGE_CONFIG.TITLE_CAPTION()} />
      </Stack>
      <Stack
        stackProps={{
          gap: 4,
          className: "my-8",
          direction: { base: "column", md: "row" },
        }}
      >
        <OverallCard
          title={DASHBOARD_PAGE_CONFIG.APPLIED_JOBS}
          count={responseData?.data?.job_applied || 0}
          bgColor={colorStyles.appliedJobsBackgroundColor}
          icon={<WorkIcon style={{ color: colorStyles.blue }} />}
          isLoading={isLoading || isRefetching}
        />
        <OverallCard
          title={DASHBOARD_PAGE_CONFIG.SAVED_JOBS}
          count={responseData?.data?.saved_job || 0}
          bgColor={colorStyles.savedJobsBackgroundColor}
          icon={<SaveAltIcon style={{ color: colorStyles.gold }} />}
          isLoading={isLoading || isRefetching}
        />
      </Stack>
    </>
  );
}

export default JobSeekerDashboard;
