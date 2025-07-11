import { useCommonDetails } from "@/services";
import { FeatureWIP, Loader, RecruiterSubscription } from "@/components";

function RecruiterSubscriptionContainer() {
  const { userType, accessType } = useCommonDetails();

  if (userType === -1) {
    return (
      <Loader
        loaderProps={{
          open: true,
        }}
      />
    );
  }

  if (accessType !== -1) {
    return (
      <FeatureWIP
        title={"Subscription Applied"}
        description={
          "You have successfully applied for the subscription, you will now able to access the services"
        }
      />
    );
  }

  return <RecruiterSubscription />;
}

export default RecruiterSubscriptionContainer;
