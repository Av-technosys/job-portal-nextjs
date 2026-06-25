import { recruiter_plan_page_icon } from "@/assets";
import { Stack, Typography, Avatar, PlanCard, Loader } from "@/components";
import {
  DASHBOARD_URL,
  recruiterSubscription,
  SUBSCRIPTION_CONFIG,
} from "@/constants";
import { useGetPaymentPlans } from "@/services";
import { SQUARE_AVATAR_CONFIG } from "@/types";
import { useRouter } from "next/router";

export default function RecruiterSubscription() {
  const { HEADER_TEXT, HEADER_SUB_TEXT } = recruiterSubscription;
  const router = useRouter();
  const paymentPlans = useGetPaymentPlans();

  const getBackendPlan = (planName: string) =>
    paymentPlans.data?.data?.find((plan) => plan.name === planName);

  const withBackendPlan = (
    config:
      typeof SUBSCRIPTION_CONFIG.RECRUITER_SUBSCRIPTION.BASIC_PLAN_CARD_CONFIG,
    planName: string
  ) => {
    const backendPlan = getBackendPlan(planName);

    return {
      ...config,
      price: backendPlan?.price ?? "Unavailable",
      planConfig: {
        ...config.planConfig,
        amount: backendPlan?.price,
        planId: backendPlan?.name,
        planType: backendPlan?.name ?? config.planConfig.planType,
      },
    };
  };

  function handlePaymentComplete() {
    router.push(DASHBOARD_URL);
  }

  if (paymentPlans.isLoading) {
    return (
      <Loader
        loaderProps={{
          open: true,
        }}
      />
    );
  }

  return (
    <>
      <Stack
        stackProps={{
          direction: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          width: { xs: "100%", md: "80%" },
          margin: "auto",
        }}
      >
        <Stack
          stackProps={{
            direction: "column",
            gap: 2,
            width: { xs: "100%", md: "40%" },
          }}
        >
          <Typography {...HEADER_TEXT} />
          <Typography {...HEADER_SUB_TEXT} />
        </Stack>
        <Avatar
          {...SQUARE_AVATAR_CONFIG(recruiter_plan_page_icon.src, "avatar")}
        />
      </Stack>
      <Stack
        stackProps={{
          direction: { xs: "column", md: "row" },
          justifyContent: "space-between",
          width: { xs: "100%", md: "80%" },
          margin: "auto",
          gap: 3,
        }}
      >
        <PlanCard
          {...withBackendPlan(
            SUBSCRIPTION_CONFIG.RECRUITER_SUBSCRIPTION.BASIC_PLAN_CARD_CONFIG,
            "r_basic"
          )}
          handlePaymentComplete={handlePaymentComplete}
        />
        <PlanCard
          {...withBackendPlan(
            SUBSCRIPTION_CONFIG.RECRUITER_SUBSCRIPTION.STANDARD_PLAN_CARD_CONFIG,
            "r_standard"
          )}
          handlePaymentComplete={handlePaymentComplete}
        />
        <PlanCard
          {...withBackendPlan(
            SUBSCRIPTION_CONFIG.RECRUITER_SUBSCRIPTION.PREMIUM_PLAN_CARD_CONFIG,
            "r_premium"
          )}
          handlePaymentComplete={handlePaymentComplete}
        />
      </Stack>
    </>
  );
}
