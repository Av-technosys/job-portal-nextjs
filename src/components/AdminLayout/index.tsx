import { useEffect, useMemo, useState } from "react";
import { AppProps } from "next/app";
import { ElementRenderType, SSOSessionProps } from "@/types";
import { Box } from "@mui/material";
import {
  //   isSidebarVisible,
  isUserAuthenticated,
  isUserAuthenticatedWithServer,
} from "@/helper";
import { useSSOSession } from "@/services";
import AdminHeader from "../AdminHeader";

function AdminLayout({
  children,
  pageProps,
}: {
  children: ElementRenderType;
  pageProps: AppProps["pageProps"];
}) {
  //   const router = useRouter();
  const { ssoData } = useSSOSession();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isAuthenticated = useMemo(() => {
    if (pageProps?.accessToken !== undefined) {
      return pageProps.accessToken !== "";
    } else if ((ssoData as SSOSessionProps)?.accessToken) {
      // TOken from SSO Login
      return isUserAuthenticatedWithServer(
        (ssoData as SSOSessionProps)?.accessToken
      );
    } else if (isMounted) {
      return isUserAuthenticated();
    } else {
      return false;
    }
  }, [isMounted, pageProps?.accessToken, ssoData]);

  return (
    <>
      <Box sx={{ display: "flex", bgcolor: "#f8fafc", minHeight: "100vh" }}>
        <AdminHeader isAuthenticated={isAuthenticated} />
        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, pt: { xs: 11, md: 12 }, width: "100%", overflowX: "hidden" }}>
          {children}
        </Box>
      </Box>
    </>
  );
}

export default AdminLayout;
