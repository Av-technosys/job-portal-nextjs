import { useMemo } from "react";
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

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AdminHeader isAuthenticated={isAuthenticated} />
        <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 13 }}>
          {children}
        </Box>
      </Box>
    </>
  );
}

export default AdminLayout;
