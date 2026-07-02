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

/** Full-page initial load splash — shown until window fires 'load'. */
function PageLoadSplash() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    // Quickly animate the bar toward 90% while waiting for load
    const t1 = setTimeout(() => setProgress(40), 200);
    const t2 = setTimeout(() => setProgress(65), 600);
    const t3 = setTimeout(() => setProgress(85), 1200);

    const dismiss = () => {
      setProgress(100);
      // Short delay so the bar visually hits 100% before fade starts
      setTimeout(() => setFading(true), 300);
      setTimeout(() => setVisible(false), 750);
    };

    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("load", dismiss);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
        transition: "opacity 0.45s ease",
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "all",
      }}
    >
      {/* Top progress bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(to right, #6366f1, #3b82f6, #a855f7)",
            borderRadius: "0 9999px 9999px 0",
            boxShadow: "0 0 8px 2px rgba(99,102,241,0.45)",
            transition: "width 0.5s ease-out",
          }}
        />
      </div>

      {/* Centered brand card */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          padding: "36px 48px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(203,213,225,0.6)",
          boxShadow: "0 20px 50px rgba(99,102,241,0.1), 0 4px 16px rgba(0,0,0,0.06)",
        }}
      >
        {/* Gradient logo mark */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "14px",
            background: "linear-gradient(135deg, #6366f1 0%, #3b82f6 60%, #a855f7 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 20px rgba(99,102,241,0.35)",
          }}
        >
          {/* Simple briefcase icon in white */}
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="7" width="20" height="14" rx="3" fill="white" fillOpacity="0.25" stroke="white" strokeWidth="1.8"/>
            <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            <line x1="2" y1="13" x2="22" y2="13" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Spinner ring */}
        <div style={{ position: "relative", width: 36, height: 36 }}>
          <div style={{
            position: "absolute", inset: 0,
            borderRadius: "50%",
            border: "3px solid #e0e7ff",
          }} />
          <div style={{
            position: "absolute", inset: 0,
            borderRadius: "50%",
            border: "3px solid transparent",
            borderTopColor: "#6366f1",
            borderRightColor: "#3b82f6",
            animation: "spin 0.8s linear infinite",
          }} />
        </div>

        <span style={{
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#94a3b8",
          fontFamily: "system-ui, sans-serif",
        }}>
          Loading…
        </span>
      </div>

      {/* Inject spin keyframes */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

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
      <PageLoadSplash />
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
