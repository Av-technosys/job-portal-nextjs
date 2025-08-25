import {
  AccountBalanceIcon,
  BusinessIcon,
  PeopleIcon,
  PersonIcon,
  SchoolIcon,
} from "@/assets";
import { Paper, Stack, Table, Tabs, Typography, When } from "@/components";
import { ADMIN_PAGE_BODY_CONFIG } from "@/constants";
import { useCommonDetails } from "@/services";
import React, { useMemo } from "react";

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
            width: "100%",
            gap: 4,
          }}
        >
          <Typography {...WELCOME_MESSAGE("Admin")} />

          <Stack stackProps={{ direction: "row", gap: 6, flexWrap: "wrap" }}>
            {statsData.map((item, index) => {
              return (
                <Paper
                  key={index}
                  paperProps={{
                    sx: {
                      padding: 4,
                      background: item.bgColor,
                      width: "fit-content",
                      borderRadius: "12px",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  <Stack
                    stackProps={{
                      direction: "column",
                      gap: 1,
                      minWidth: { xs: "100%", md: "100px" },
                    }}
                  >
                    {item.icon}
                    <Typography
                      typographyProps={{
                        children: item.count,
                      }}
                    />
                    <Typography
                      typographyProps={{
                        children: item.label,
                      }}
                    />
                  </Stack>
                </Paper>
              );
            })}
          </Stack>

          <Typography {...TAB_TITLE} />
          <AdminTabs />
        </Stack>
      </When>
    </>
  );
}

export default AdminContainer;
