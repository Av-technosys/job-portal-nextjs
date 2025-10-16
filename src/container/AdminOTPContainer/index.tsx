import { OTP } from "@/components";
import AdminOTP from "@/components/Admin/AdminOTP";
import { ADMIN_LOGIN_URL } from "@/constants";
import { useRouter } from "next/router";
import { useEffect } from "react";

function AdminOTPContainer() {
  const router = useRouter();
  const emailFromRoute = (router?.query?.email as string) || "";

  useEffect(() => {
    if (!router?.query?.email) {
      router.push(ADMIN_LOGIN_URL);
    }
  }, [router]);

  if (!emailFromRoute) return null;

  return <AdminOTP email={emailFromRoute} />;
}

export default AdminOTPContainer;
