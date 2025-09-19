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
import { useCommonDetails } from "@/services";
import React, { useMemo } from "react";

import AdminTabs from "@/components/Admin";
import { useGetAdminProfileMetaDataInfo } from "@/services/useGetAdminMetaData";
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

  const { WELCOME_MESSAGE, TAB_TITLE } = ADMIN_PAGE_BODY_CONFIG;

  const statsData = [
    {
      icon: <PeopleIcon fontSize="large" />,
      count:
        adminMetaDetailsMemo?.recruiter_count +
        adminMetaDetailsMemo?.job_seeker_count,
      label: "Total Users",
      bgColor: "#FFE2E5",
    },
    {
      icon: <BusinessIcon fontSize="large" />,
      count: adminMetaDetailsMemo?.recruiter_count,
      label: "Recruiter Count",
      bgColor: "#DCFCE7",
    },
    {
      icon: <PersonIcon fontSize="large" />,
      count: adminMetaDetailsMemo?.job_seeker_count,
      label: "Student Count",
      bgColor: "#DCFCE7",
    },
    {
      icon: <SchoolIcon fontSize="large" />,
      count: adminMetaDetailsMemo?.assessment_count,
      label: "Total Assessment Taken",
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
                  sx: {
                    padding: 4,
                    background: item.bgColor,
                    borderRadius: "12px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  },
                }}
              >
                <Typography
                  typographyProps={{
                    children: item.count,
                  }}
                  fontSize={TypographyFontSize.largeTitle}
                />
                <Typography
                  typographyProps={{
                    children: item.label,
                  }}
                  fontWeight={TypographyFontWeight.bold}
                  fontSize={TypographyFontSize.normal}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Stack>
      <Stack stackProps={{ width: "100%", className: "p-3" }}>
        <Typography {...TAB_TITLE} />
        <AdminTabs />
      </Stack>
    </Stack>
  );
}

export default AdminContainer;
