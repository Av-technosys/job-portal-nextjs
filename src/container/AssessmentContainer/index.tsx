import { useCommonDetails } from "@/services";
import JobSeekerSubscriptionContainer from "../SubscriptionContainer";
import { FeatureWIP, Link, Loader, Stack } from "@/components";

function AssessmentContainer() {
  const { userType, accessType } = useCommonDetails();

  // if (userType === -1) {
  //   return (
  //     <Loader
  //       loaderProps={{
  //         open: true,
  //       }}
  //     />
  //   );
  // }

  if (accessType !== -1) {
    // if (true) {
    return (
      <Stack>
        <FeatureWIP
          title={"Assessment Completed"}
          description={
            "You have successfully completed the assessment, you are now able to access the services"
          }
        />
        <Link
          linkProps={{
            href: "/assessment",
            target: "_blank",
          }}
        >
          Start Assessment
        </Link>
        <Link
          linkProps={{
            href: "/assessment-submission",
            target: "_blank",
          }}
        >
          Assessment Submission
        </Link>
        <Link
          linkProps={{
            href: "/assessment-summary",
            target: "_blank",
          }}
        >
          Assessment Summary
        </Link>
        <Link
          linkProps={{
            href: "/assessment-score",
            target: "_blank",
          }}
        >
          Assessment Score
        </Link>
      </Stack>
    );
  }

  return <JobSeekerSubscriptionContainer />;
}

export default AssessmentContainer;
