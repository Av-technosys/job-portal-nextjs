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
} from "@/services";
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
      icon: <PeopleIcon fontSize="large" />,
      count: recruiterCount + jobSeekerCount,
      label: "Total Users",
      bgColor: "#FFE2E5",
    },
    {
      icon: <BusinessIcon fontSize="large" />,
      count: recruiterCount,
      label: "Recruiter Count",
      bgColor: "#DCFCE7",
    },
    {
      icon: <PersonIcon fontSize="large" />,
      count: jobSeekerCount,
      label: "Job Seeker Count",
      bgColor: "#DCFCE7",
    },
    {
      icon: <SchoolIcon fontSize="large" />,
      count: assessmentCount,
      label: "Total Assessment",
      bgColor: "#FFC1B2",
    },
  ];

  if (userType === -1) return null;
  const isAuthenticated = true;

  return (
    <Stack>
      <Stack
        stackProps={{
          width: "100%",
          bgcolor: "skyblue",
          direction: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <AppBar
          style={{
            backgroundColor: theme.palette.background.paper,
            zIndex: theme.zIndex.drawer + 1,
            borderBottom: `1px solid ${colorStyles.topRibbonColor}`,
          }}
          elevation={0}
        >
          <Stack
            stackProps={{
              className: "items-center w-full justify-between px-2 md:px-20",
              direction: "row",
            }}
          >
            <NextImage
              props={{
                alt: "ja_logo",
                src: JA_LOGO,
              }}
            />

            <When condition={!isAuthenticated}>
              <Button
                {...LOGIN_BUTTON}
                onClick={() => handleClick(LOGIN_URL)}
              />
            </When>
            <When condition={isAuthenticated}>
              <AccountPopover />
            </When>
          </Stack>
        </AppBar>
      </Stack>
      <Stack
        stackProps={{
          className: "mt-8 mb-4 p-3",
          direction: "column",
          justifyContent: "space-between",
          gap: 4,
          sx: { width: "100%" },
        }}
      >
        <Typography {...WELCOME_MESSAGE("Admin")} />

        {/* Stats section */}
        <Stack
          stackProps={{
            sx: {
              display: "grid",
              gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
              gap: { xs: 1.5, md: 3 },
            },
          }}
        >
          {statsData.map((item, index) => (
            <Paper
              key={index}
              paperProps={{
                sx: {
                  p: { xs: 2, md: 3 },
                  background: item.bgColor,
                  borderRadius: "16px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
                  display: "flex",
                  flexDirection: "column",
                  gap: { xs: 1.5, md: 2 },
                },
              }}
            >
              <Stack
                stackProps={{
                  direction: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  width: "100%",
                }}
              >
                <Typography
                  typographyProps={{
                    children: item.count,
                    sx: { lineHeight: 1 },
                  }}
                  fontSize={TypographyFontSize.largeTitle}
                />
                <Stack
                  stackProps={{
                    sx: {
                      width: { xs: 40, md: 48 },
                      height: { xs: 40, md: 48 },
                      bgcolor: "rgba(255, 255, 255, 0.5)",
                      borderRadius: "12px",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  }}
                >
                  {item.icon}
                </Stack>
              </Stack>
              <Typography
                typographyProps={{
                  children: item.label,
                  sx: {
                    color: "text.secondary",
                    fontSize: { xs: "0.8rem", md: "0.875rem" },
                    lineHeight: 1.2,
                  },
                }}
                fontWeight={TypographyFontWeight.semibold}
              />
            </Paper>
          ))}
        </Stack>
      </Stack>
      <Stack stackProps={{ width: "100%", className: "p-3" }}>
        <Typography {...TAB_TITLE} />
        <AdminTabs />
      </Stack>
    </Stack>
  );
}

export default AdminContainer;
