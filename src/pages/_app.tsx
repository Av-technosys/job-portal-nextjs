import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AppProps } from "next/app";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { darkTheme, GlobalTheme, lightTheme } from "@/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ThemeProvider,
  Typography,
} from "@mui/material";
import "../styles/global.scss";
import Loading from "./loading";
import {
  CommonDetailsProvider,
  NotificationProvider,
  ReactQueryProvider,
} from "@/services";
import { HydrationBoundary } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { getItem, removeItem } from "@/helper";
import { LOCAL_STORAGE_KEY } from "@/constants";
import { useRouter } from "next/router";

const App = ({ Component, pageProps }: AppProps) => {
  const [isDark, toggleIsDark] = useState(false);
  const [forceLogoutMessage, setForceLogoutMessage] = useState("");
  const [accessTokenFromCookie, setAccessTokenFromCookie] = useState("");
  const getLayout = Component?.getLayout ?? ((page) => page);
  const router = useRouter();
  const currentTheme = useMemo(() => {
    return isDark ? darkTheme : lightTheme;
  }, [isDark]);

  const syncAccessTokenFromCookie = useCallback(() => {
    setAccessTokenFromCookie(getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN));
  }, []);

  useEffect(() => {
    syncAccessTokenFromCookie();
    router.events.on("routeChangeComplete", syncAccessTokenFromCookie);

    return () => {
      router.events.off("routeChangeComplete", syncAccessTokenFromCookie);
    };
  }, [router.events, syncAccessTokenFromCookie]);

  useEffect(() => {
    const handleForceLogout = (event: Event) => {
      const customEvent = event as CustomEvent<{ message?: string }>;
      setForceLogoutMessage(
        customEvent.detail?.message ||
          "Your account has been deactivated by admin."
      );
    };

    window.addEventListener("force-logout", handleForceLogout);
    return () => {
      window.removeEventListener("force-logout", handleForceLogout);
    };
  }, []);

  const handleForceLogoutConfirm = useCallback(() => {
    removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    removeItem(LOCAL_STORAGE_KEY.CURRENT_USER_TYPE);
    removeItem(LOCAL_STORAGE_KEY.CURRENT_ACCESS_TYPE);
    setForceLogoutMessage("");
    router.push("/login");
  }, [router]);

  return (
    <>
      <SessionProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ReactQueryProvider>
            <HydrationBoundary state={pageProps?.dehydratedState}>
              <CommonDetailsProvider
                pageProps={pageProps}
                accessTokenFromLocalStorage={accessTokenFromCookie}
              >
                <NotificationProvider>
                  <GlobalTheme
                    isDark={isDark}
                    toggleIsDark={toggleIsDark}
                    theme={currentTheme}
                  >
                    <ThemeProvider theme={currentTheme}>
                      <Loading />
                      {getLayout(<Component {...pageProps} />)}
                      <Dialog
                        open={!!forceLogoutMessage}
                        disableEscapeKeyDown
                        onClose={(_, reason) => {
                          if (reason !== "backdropClick") {
                            setForceLogoutMessage("");
                          }
                        }}
                      >
                        <DialogTitle>Account deactivated</DialogTitle>
                        <DialogContent>
                          <Typography>{forceLogoutMessage}</Typography>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            variant="contained"
                            onClick={handleForceLogoutConfirm}
                          >
                            Logout
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </ThemeProvider>
                  </GlobalTheme>
                </NotificationProvider>
              </CommonDetailsProvider>
            </HydrationBoundary>
          </ReactQueryProvider>
        </LocalizationProvider>
      </SessionProvider>
    </>
  );
};

export default App;
