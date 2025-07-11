import { useCommonDetails } from "@/services";
import { Stack, Typography } from "../common";
import { DASHBOARD_PAGE_CONFIG } from "@/constants";
import { OverallCard } from "@/components";
import { WorkIcon, SaveAltIcon } from "@/assets";
import { useGetOverAllJobSeekerRecruiterDetails } from "@/services";
import { colorStyles } from "@/styles";

function RecruiterDashboard() {
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
          title={DASHBOARD_PAGE_CONFIG.POSTED_JOBS}
          count={responseData?.data?.posted_jobs || 0}
          bgColor={colorStyles.appliedJobsBackgroundColor}
          icon={<WorkIcon style={{ color: colorStyles.blue }} />}
          isLoading={isLoading || isRefetching}
        />
        <OverallCard
          title={DASHBOARD_PAGE_CONFIG.SAVED_PROFILES}
          count={responseData?.data?.saved_profiles || 0}
          bgColor={colorStyles.savedJobsBackgroundColor}
          icon={<SaveAltIcon style={{ color: colorStyles.gold }} />}
          isLoading={isLoading || isRefetching}
        />
      </Stack>
    </>
  );
}

export default RecruiterDashboard;
