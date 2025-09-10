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
import React from "react";

import AdminTabs from "@/components/Admin";

function AdminContainer() {
  const { userType } = useCommonDetails();

  const { WELCOME_MESSAGE, TAB_TITLE } = ADMIN_PAGE_BODY_CONFIG;

  const statsData = [
    {
      icon: <PeopleIcon fontSize="large" />,
      count: "1K",
      label: "Total Users",
      bgColor: "#FFE2E5",
    },
    {
      icon: <BusinessIcon fontSize="large" />,
      count: "1K",
      label: "Recruiter count",
      bgColor: "#DCFCE7",
    },
    {
      icon: <PersonIcon fontSize="large" />,
      count: "1K",
      label: "Student Count",
      bgColor: "#DCFCE7",
    },
    {
      icon: <SchoolIcon fontSize="large" />,
      count: "1K",
      label: "Student Count",
      bgColor: "#FFC1B2",
    },
    {
      icon: <AccountBalanceIcon fontSize="large" />,
      count: "1K",
      label: "Student Count",
      bgColor: "#DCFCE7",
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
                    size: { xs: 12, sm: 6, md: 4 },
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
                      {item.icon}
                      <Typography
                        typographyProps={{
                          children: item.count,
                          variant: "h6",
                        }}
                      />
                      <Typography
                        typographyProps={{
                          children: item.label,
                          variant: "body2",
                          color: "text.secondary",
                        }}
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
