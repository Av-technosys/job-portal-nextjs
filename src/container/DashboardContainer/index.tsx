import { When } from "@/components";
import { isLoggedInUserJobSeeker, isLoggedInUserRecruiter } from "@/helper";
import { useCommonDetails } from "@/services";
import { JobSeekerDashboard, RecruiterDashboard } from "@/components";

function DashboardContainer() {
  const { userType } = useCommonDetails();

  if (userType === -1) return null;

  return (
    <>
      <When condition={isLoggedInUserJobSeeker({ userType })}>
        <JobSeekerDashboard />
      </When>
      <When condition={isLoggedInUserRecruiter({ userType })}>
        <RecruiterDashboard />
      </When>
    </>
  );
}

export default DashboardContainer;
