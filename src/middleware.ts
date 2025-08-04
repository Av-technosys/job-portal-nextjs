import { NextRequest, NextResponse } from "next/server";
import {
  // ASSESSMENT_URL,
  CANDIATE_APPLICATIONS_PARTIAL_URL,
  DASHBOARD_URL,
  JOB_DETAILS_PARTIAL_URL,
  JOBS_URL,
  LOCAL_STORAGE_KEY,
  LOGIN_URL,
  MY_POSTED_JOBS_URL,
  NO_PERMISSION_URL,
  // SUBSCRIPTION_URL,
} from "./constants";
import {
  checkIfRouteAllowedForCurrentUserType,
  // isLoggedInUserJobSeeker,
  // isLoggedInUserRecruiter,
  isNonPrivateRoute,
  isPrivateRoute,
} from "./helper";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(
    LOCAL_STORAGE_KEY.ACCESS_TOKEN
  )?.value;

  const currentUserType = request.cookies.get(
    LOCAL_STORAGE_KEY.CURRENT_USER_TYPE
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  )?.value as any;

  const currentUserAccessType = request.cookies.get(
    LOCAL_STORAGE_KEY.CURRENT_ACCESS_TYPE
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  )?.value as any;

  let routeObj = {
    isRedirect: false,
    redirectUrl: "",
  };

  if (request.nextUrl.pathname.includes("/api/auth/")) {
    routeObj.isRedirect = false;
  } else if (isPrivateRoute(request.nextUrl.pathname) && !accessToken) {
    // Private route but not logged in
    routeObj = {
      isRedirect: true,
      redirectUrl: LOGIN_URL,
    };
  } else if (
    accessToken &&
    currentUserAccessType === "null" &&
    (isPrivateRoute(request.nextUrl.pathname) ||
      isNonPrivateRoute(request.nextUrl.pathname))
  ) {
    // if (
    //   ![ASSESSMENT_URL, SUBSCRIPTION_URL].includes(request.nextUrl.pathname)
    // ) {
    //   routeObj = {
    //     isRedirect: true,
    //     redirectUrl: isLoggedInUserJobSeeker({ userType: currentUserType })
    //       ? ASSESSMENT_URL
    //       : isLoggedInUserRecruiter({ userType: currentUserType })
    //       ? SUBSCRIPTION_URL
    //       : DASHBOARD_URL,
    //   };
    // }
  } else if (accessToken && isNonPrivateRoute(request.nextUrl.pathname)) {
    // Logged in but routed non-private route.
    // Redirect it to the dashboard overview
    routeObj = {
      isRedirect: true,
      redirectUrl: DASHBOARD_URL,
    };
  } else if (
    accessToken &&
    currentUserType &&
    isPrivateRoute(request.nextUrl.pathname)
  ) {
    // Logged in & has user type & private route & have some access type
    const isAllowed = checkIfRouteAllowedForCurrentUserType({
      currentUserType,
      routePath: request.nextUrl.pathname,
    });
    if (!isAllowed) {
      routeObj = {
        isRedirect: true,
        redirectUrl: NO_PERMISSION_URL,
      };
    } else {
      if (request.nextUrl.pathname === JOB_DETAILS_PARTIAL_URL) {
        // If no job id is passed, redirect it to find jobs page
        routeObj = {
          isRedirect: true,
          redirectUrl: JOBS_URL,
        };
      } else if (
        request.nextUrl.pathname === CANDIATE_APPLICATIONS_PARTIAL_URL
      ) {
        // If no job id is passed, redirect it to posted jobs page
        routeObj = {
          isRedirect: true,
          redirectUrl: MY_POSTED_JOBS_URL,
        };
      }
    }
  }

  if (routeObj.isRedirect) {
    return NextResponse.redirect(new URL(routeObj?.redirectUrl, request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  runtime: "experimental-edge",
  unstable_allowDynamic: ["**/node_modules/resize-observer-polyfill/**/*.js"],
};
