import { JobSeekerProfile, RecruiterProfile, When } from "@/components";
import { isLoggedInUserJobSeeker, isLoggedInUserRecruiter } from "@/helper";
import { useCommonDetails } from "@/services";

function ProfileContainer() {
  const { userType } = useCommonDetails();

  if (userType === -1) return null;

  return (
    <>
      <When condition={isLoggedInUserJobSeeker({ userType })}>
        <JobSeekerProfile />
      </When>
      <When condition={isLoggedInUserRecruiter({ userType })}>
        <RecruiterProfile />
      </When>
    </>
  );
}

export default ProfileContainer;
