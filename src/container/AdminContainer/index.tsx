import {
  BusinessIcon,
  JA_LOGO,
  PeopleIcon,
  PersonIcon,
  SchoolIcon,
} from "@/assets";
import {
  Button,
  Grid,
  NextImage,
  Paper,
  Stack,
  Typography,
  When,
} from "@/components";
import {
  ADMIN_PAGE_BODY_CONFIG,
  LOGIN_URL,
  TOP_RIBBON_AUTH_REDIRECT_CONFIG,
} from "@/constants";
import {
  useCommonDetails,
  useGetFindRecruiterList,
  usePagination,
  useLogoutUser,
  useNotification,
  useFirebaseNotification,
} from "@/services";
import { clearAllCookie, getErrorMessageFromAPI } from "@/helper";
import React, { useMemo } from "react";

import AdminTabs from "@/components/Admin";
import { useGetAdminProfileMetaDataInfo } from "@/services/useGetAdminMetaData";
import { useGetFindStudentList } from "@/services/useGetFindStudent";
import { useGetSubjectList } from "@/services/useGetFindSubject";
import { TypographyFontSize, TypographyFontWeight } from "@/types";
import { AppBar } from "@mui/material";
import { colorStyles, useThemeContext } from "@/styles";
import AccountPopover from "@/components/Header/AccountPopover";
import { useRouter } from "next/router";

function AdminContainer() {
  const { userType } = useCommonDetails();
  const adminMetaDetails = useGetAdminProfileMetaDataInfo();
  const { theme } = useThemeContext();
  const { LOGIN_BUTTON } = TOP_RIBBON_AUTH_REDIRECT_CONFIG;
  const router = useRouter();
  const recruiterCountData = useGetFindRecruiterList({
    queryFnParams: {
      pageLimit: 1,
    },
  });
  const jobSeekerCountData = useGetFindStudentList({
    queryFnParams: {
      pageLimit: 1,
    },
  });
  const subjectListData = useGetSubjectList();

  const { totalLength: recruiterListCount } = usePagination({
    paginatedAPIData: recruiterCountData,
  });
  const { totalLength: jobSeekerListCount } = usePagination({
    paginatedAPIData: jobSeekerCountData,
  });

  const { showNotification } = useNotification();
  const { deleteFCMToken } = useFirebaseNotification();

  function postLogoutAction() {
    clearAllCookie();
    router.push(LOGIN_URL);
  }

  const logoutUser = useLogoutUser({
    mutationConfig: {
      onSuccess: () => {
        deleteFCMToken();
        showNotification({ message: "Successfully Logged out" });
        postLogoutAction();
      },
      onError: (error) => {
        showNotification({
          ...getErrorMessageFromAPI(error),
        });
        postLogoutAction();
        console.error(error, "error");
      },
    },
  });

  function handleClick(url: string) {
    router.push(
      {
        pathname: `${url}`,
      },
      url
    );
  }

  const adminMetaDetailsMemo = useMemo(() => {
    return adminMetaDetails?.data?.data;
  }, [adminMetaDetails]);

  const getNumberValue = (value: unknown, fallback?: number) => {
    if (value === undefined || value === null || value === "") {
      return fallback ?? 0;
    }

    const numberValue = Number(value);
    return Number.isFinite(numberValue) ? numberValue : fallback ?? 0;
  };

  const recruiterListTotal =
    recruiterCountData?.data?.pages?.[0]?.data?.total_count;
  const jobSeekerListTotal =
    jobSeekerCountData?.data?.pages?.[0]?.data?.total_count;
  const subjectListTotal = Array.isArray(subjectListData?.data?.data)
    ? subjectListData.data.data.length
    : undefined;

  const recruiterCount = getNumberValue(
    recruiterListTotal,
    getNumberValue(adminMetaDetailsMemo?.recruiter_count, recruiterListCount)
  );
  const jobSeekerCount = getNumberValue(
    jobSeekerListTotal,
    getNumberValue(adminMetaDetailsMemo?.job_seeker_count, jobSeekerListCount)
  );
  const assessmentCount = getNumberValue(
    subjectListTotal,
    getNumberValue(adminMetaDetailsMemo?.assessment_count)
  );

  const { WELCOME_MESSAGE, TAB_TITLE } = ADMIN_PAGE_BODY_CONFIG;

  const statsData = [
    {
      icon: <PeopleIcon sx={{ fontSize: 28, color: "#4f46e5" }} />,
      count: recruiterCount + jobSeekerCount,
      label: "Total Users",
      badgeBg: "#eef2ff",
      borderColor: "#e0e7ff",
    },
    {
      icon: <BusinessIcon sx={{ fontSize: 28, color: "#16a34a" }} />,
      count: recruiterCount,
      label: "Recruiter Count",
      badgeBg: "#f0fdf4",
      borderColor: "#dcfce7",
    },
    {
      icon: <PersonIcon sx={{ fontSize: 28, color: "#2563eb" }} />,
      count: jobSeekerCount,
      label: "Job Seeker Count",
      badgeBg: "#eff6ff",
      borderColor: "#dbeafe",
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 28, color: "#9333ea" }} />,
      count: assessmentCount,
      label: "Total Assessment",
      badgeBg: "#faf5ff",
      borderColor: "#f3e8ff",
    },
  ];

  if (userType === -1) return null;
  const isAuthenticated = true;

  return (
    <Stack stackProps={{ sx: { bgcolor: "#f8fafc", minHeight: "100vh", pb: 8 } }}>
      <Stack
        stackProps={{
          className: "mt-8 mb-4 p-3",
          direction: "column",
          justifyContent: "space-between",
          gap: 4,
          sx: { width: "100%", px: { xs: 2, md: 6 }, pt: 6 },
        }}
      >
        <Stack stackProps={{ direction: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Typography {...WELCOME_MESSAGE("Admin")} />
          <button 
            onClick={() => logoutUser.mutate({ data: {} })}
            disabled={logoutUser.isPending}
            className="px-6 py-2.5 bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white rounded-xl font-bold transition-all duration-300 shadow-sm border border-rose-100 disabled:opacity-50 flex items-center justify-center min-w-[120px]"
          >
            {logoutUser.isPending ? "Logging out..." : "Logout"}
          </button>
        </Stack>

        {/* Stats section */}
        <Grid
          gridProps={{
            container: true,
            spacing: 3,
          }}
        >
          {statsData.map((item, index) => (
            <Grid
              key={index}
              gridProps={{
                size: { xs: 12, sm: 6, md: 3 },
              }}
            >
              <Paper
                paperProps={{
                  elevation: 0,
                  sx: {
                    p: 3.5,
                    background: "#ffffff",
                    border: `1px solid ${item.borderColor}`,
                    borderRadius: "16px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -1px rgba(0, 0, 0, 0.02)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 12px 20px -8px rgba(79, 70, 229, 0.12)",
                      borderColor: "#818cf8",
                    },
                  },
                }}
              >
                <Stack
                  stackProps={{
                    direction: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    mb: 2.5,
                  }}
                >
                  <Typography
                    typographyProps={{
                      children: item.label,
                      sx: { color: "#64748b" },
                    }}
                    fontWeight={TypographyFontWeight.bold}
                    fontSize={TypographyFontSize.normal}
                  />
                  <div
                    style={{
                      backgroundColor: item.badgeBg,
                      padding: "10px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </div>
                </Stack>
                <Typography
                  typographyProps={{
                    children: item.count,
                    sx: { color: "#1e293b", lineHeight: 1 },
                  }}
                  fontWeight={TypographyFontWeight.extrabold}
                  fontSize={TypographyFontSize.largeTitle}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Stack>
      <Stack stackProps={{ width: "100%", className: "p-3", sx: { px: { xs: 2, md: 6 } } }}>
        <Typography {...TAB_TITLE} />
        <AdminTabs />
      </Stack>
    </Stack>
  );
}

export default AdminContainer;
