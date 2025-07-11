import React, { useMemo, useState } from "react";
import { AppProps } from "next/app";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { darkTheme, GlobalTheme, lightTheme } from "@/styles";
import { ThemeProvider } from "@mui/material";
import "../styles/global.scss";
import Loading from "./loading";
import {
  CommonDetailsProvider,
  NotificationProvider,
  ReactQueryProvider,
} from "@/services";
import { HydrationBoundary } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { getItem } from "@/helper";
import { LOCAL_STORAGE_KEY } from "@/constants";

const App = ({ Component, pageProps }: AppProps) => {
  const [isDark, toggleIsDark] = useState(false);
  const getLayout = Component?.getLayout ?? ((page) => page);
  const accessTokenFromLocalStorage = getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  const currentTheme = useMemo(() => {
    return isDark ? darkTheme : lightTheme;
  }, [isDark]);

  return (
    <>
      <SessionProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ReactQueryProvider>
            <HydrationBoundary state={pageProps?.dehydratedState}>
              <CommonDetailsProvider
                pageProps={pageProps}
                accessTokenFromLocalStorage={accessTokenFromLocalStorage}
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
