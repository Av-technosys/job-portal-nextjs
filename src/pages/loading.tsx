import { useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY } from "@/constants";
import { getItem, isPrivateAndPublicRoute, isPrivateRoute } from "@/helper";
import { Loader } from "@/components";
import { useRouter } from "next/router";
import { useThemeContext } from "@/styles";

const ASSESSMENT_ROUTE_PREFIXES = [
  "/dashboard/assessment",
  "/assessment/get_all_test_question",
  "/assessment/get_free_test_question",
];

function isAssessmentFlowRoute(url: string) {
  return ASSESSMENT_ROUTE_PREFIXES.some((routePrefix) =>
    url.startsWith(routePrefix)
  );
}

function Loading() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { theme } = useThemeContext();

  useEffect(() => {
    setLoading(false);
  }, [router.asPath]);

  useEffect(() => {
    const handleStart = (
      url: string,
      urlOptions: {
        shallow?: boolean;
      }
    ) => {
      const accessToken = getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      if (accessToken && !isPrivateRoute(url)) {
        // Private route bt moved to non-private route
        if (!isPrivateAndPublicRoute(url)) {
          // Private as well as Public route
          // if (!urlOptions?.shallow) {
          //   removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
          // }
        }
      }
      if (isAssessmentFlowRoute(url)) {
        setLoading(false);
        return;
      }
      if (!urlOptions?.shallow) {
        setLoading(true);
      }
    };

    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  useEffect(() => {
    if (!loading) return;

    const timeoutId = window.setTimeout(() => {
      setLoading(false);
    }, 8000);

    return () => window.clearTimeout(timeoutId);
  }, [loading]);

  if (!loading) return null;

  return (
    <Loader
      loaderProps={{
        open: true,
        sx: {
          zIndex: theme.zIndex.drawer + 5,
        },
      }}
    />
  );
}

export default Loading;
