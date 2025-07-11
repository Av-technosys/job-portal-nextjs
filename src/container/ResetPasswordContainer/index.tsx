import { ResetPassword } from "@/components";
import { LOGIN_URL } from "@/constants";
import { useRouter } from "next/router";
import { useEffect } from "react";

function ResetPasswordContainer() {
  const router = useRouter();
  const emailFromRoute = (router?.query?.email as string) || "";

  useEffect(() => {
    if (!router?.query?.email) {
      router.push(LOGIN_URL);
    }
  }, [router]);

  if (!emailFromRoute) return null;
  return <ResetPassword email={emailFromRoute} />;
}

export default ResetPasswordContainer;
