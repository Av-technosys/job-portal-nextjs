import { useEffect, useMemo, useState } from "react";
import { AppProps } from "next/app";
import { ElementRenderType, SSOSessionProps } from "@/types";
import Header from "../Header";
import { Box, Toolbar } from "@mui/material";
import { Sidebar, When } from "../common";
import {
  isSidebarVisible,
  isUserAuthenticated,
  isUserAuthenticatedWithServer,
} from "@/helper";
import { useRouter } from "next/router";
import { dimensionStyle } from "@/styles";
import { useSSOSession } from "@/services";

function DashboardLayout({
  children,
  pageProps,
}: {
  children: ElementRenderType;
  pageProps: AppProps["pageProps"];
}) {
  const router = useRouter();
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

  const isSidebar = useMemo(() => {
    return isSidebarVisible(router.pathname, isAuthenticated);
  }, [router?.pathname, isAuthenticated]);

  return (
    <>
      <Box sx={{ display: "flex", overflowX: "hidden", width: "100%" }}>
        <Header isAuthenticated={isAuthenticated} />
        <When condition={isSidebar}>
          <Sidebar />
        </When>
        <Box component="main" sx={{ flexGrow: 1, px: { xs: 1.5, sm: 2, md: 4 }, pb: { xs: 3, md: 4 }, pt: { xs: 2, md: 4 }, minWidth: 0, overflowX: "hidden" }}>
          <Toolbar
            sx={{
              minHeight: "64px !important",
            }}
          />
          {children}
        </Box>
      </Box>
    </>
  );
}

export default DashboardLayout;
