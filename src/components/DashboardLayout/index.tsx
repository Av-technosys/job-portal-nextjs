import { useMemo } from "react";
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
  const isAuthenticated = useMemo(() => {
    if (pageProps?.accessToken !== undefined) {
      return isUserAuthenticatedWithServer(pageProps.accessToken);
    } else if ((ssoData as SSOSessionProps)?.accessToken) {
      // TOken from SSO Login
      return isUserAuthenticatedWithServer(
        (ssoData as SSOSessionProps)?.accessToken
      );
    } else {
      return isUserAuthenticated();
    }
  }, [pageProps?.accessToken, ssoData]);

  const isSidebar = useMemo(() => {
    return isSidebarVisible(router.pathname, isAuthenticated);
  }, [router?.pathname, isAuthenticated]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Header isAuthenticated={isAuthenticated} />
        <When condition={isSidebar}>
          <Sidebar />
        </When>
        <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
          <Toolbar
            sx={{
              minHeight: `${dimensionStyle.headerHeight} !important`,
            }}
          />
          {children}
        </Box>
      </Box>
    </>
  );
}

export default DashboardLayout;
