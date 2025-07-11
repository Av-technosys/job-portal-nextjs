import { recruiter_plan_page_icon } from "@/assets";
import { Stack, Typography, Avatar, PlanCard } from "@/components";
import {
  DASHBOARD_URL,
  recruiterSubscription,
  SUBSCRIPTION_CONFIG,
} from "@/constants";
import { SQUARE_AVATAR_CONFIG } from "@/types";
import { useRouter } from "next/router";

export default function RecruiterSubscription() {
  const { HEADER_TEXT, HEADER_SUB_TEXT } = recruiterSubscription;
  const router = useRouter();

  function handlePaymentComplete() {
    router.push(DASHBOARD_URL);
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
          {...SUBSCRIPTION_CONFIG.RECRUITER_SUBSCRIPTION.BASIC_PLAN_CARD_CONFIG}
          handlePaymentComplete={handlePaymentComplete}
        />
        <PlanCard
          {...SUBSCRIPTION_CONFIG.RECRUITER_SUBSCRIPTION
            .STANDARD_PLAN_CARD_CONFIG}
          handlePaymentComplete={handlePaymentComplete}
        />
        <PlanCard
          {...SUBSCRIPTION_CONFIG.RECRUITER_SUBSCRIPTION
            .PREMIUM_PLAN_CARD_CONFIG}
          handlePaymentComplete={handlePaymentComplete}
        />
      </Stack>
    </>
  );
}
