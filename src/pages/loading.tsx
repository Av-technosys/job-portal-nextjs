import { useEffect, useState } from "react";
import { LOCAL_STORAGE_KEY } from "@/constants";
import { getItem, isPrivateAndPublicRoute, isPrivateRoute } from "@/helper";
import { Loader } from "@/components";
import { useRouter } from "next/router";
import { useThemeContext } from "@/styles";

function Loading() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { theme } = useThemeContext();
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
