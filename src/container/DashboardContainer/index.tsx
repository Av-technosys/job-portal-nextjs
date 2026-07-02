import { When } from "@/components";
import {
  isLoggedInUserAdmin,
  isLoggedInUserJobSeeker,
  isLoggedInUserRecruiter,
} from "@/helper";
import { useCommonDetails } from "@/services";
import { JobSeekerDashboard, RecruiterDashboard } from "@/components";
import { ADMIN_URL } from "@/constants";
import { useRouter } from "next/router";
import { useEffect } from "react";

function DashboardContainer() {
  const { userType } = useCommonDetails();
  const router = useRouter();

  useEffect(() => {
    if (userType !== -1 && isLoggedInUserAdmin({ userType })) {
      router.replace(ADMIN_URL);
    }
  }, [router, userType]);

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
