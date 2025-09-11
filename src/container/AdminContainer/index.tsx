import {
  AccountBalanceIcon,
  BusinessIcon,
  PeopleIcon,
  PersonIcon,
  SchoolIcon,
} from "@/assets";
import { Grid, Paper, Stack, Typography, When } from "@/components";
import { ADMIN_PAGE_BODY_CONFIG } from "@/constants";
import { useCommonDetails } from "@/services";
import React, { useMemo } from "react";

import AdminTabs from "@/components/Admin";
import { useGetAdminProfileMetaDataInfo } from "@/services/useGetAdminMetaData";
import { TypographyFontSize, TypographyFontWeight } from "@/types";

function AdminContainer() {
  const { userType } = useCommonDetails();

  const adminMetaDetails = useGetAdminProfileMetaDataInfo();

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
      label: "Recruiter count",
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
      label: "Total assessment taken",
      bgColor: "#FFC1B2",
    },
  ];

  if (userType === -1) return null;
  return (
    <>
      {/* <When condition={isLoggedInUserAdmin({ userType })}> */}
      <When condition={true}>
        <Stack
          stackProps={{
            className: "mt-8",
            direction: "column",
            justifyContent: "space-between",
            flexWrap: "wrap",
            maxWidth: "100%",
            gap: 4,
          }}
        >
          <Typography {...WELCOME_MESSAGE("Admin")} />

          <Stack>
            <Grid gridProps={{ container: true, spacing: 3 }}>
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
                      },
                    }}
                  >
                    <Stack
                      stackProps={{
                        direction: "column",
                        gap: 1,
                        alignItems: "flex-start",
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
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Stack>

          <Typography {...TAB_TITLE} />
          <AdminTabs />
        </Stack>
      </When>
    </>
  );
}

export default AdminContainer;
