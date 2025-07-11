import { OTP } from "@/components";
import { LOGIN_URL } from "@/constants";
import { useRouter } from "next/router";
import { useEffect } from "react";

function OTPContainer() {
  const router = useRouter();
  const emailFromRoute = (router?.query?.email as string) || "";

  useEffect(() => {
    if (!router?.query?.email) {
      router.push(LOGIN_URL);
    }
  }, [router]);

  if (!emailFromRoute) return null;

  return <OTP email={emailFromRoute} />;
}

export default OTPContainer;
