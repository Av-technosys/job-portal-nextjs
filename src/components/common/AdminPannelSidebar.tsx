import { Box, Drawer, Toolbar } from "@mui/material";
import { dimensionStyle, useThemeContext } from "@/styles";
import { useEffect, useState } from "react";

import AdminSideBarDrawer from "../Admin/AdminSideBarDrawer";

function AdminPannelSidebar({
  selectedUser,
  sideBarStatus,
  setSideBarStatus,
  UserType,
}: {
  selectedUser: number;
  sideBarStatus: boolean;
  setSideBarStatus: any;
  UserType: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme } = useThemeContext();

  useEffect(() => {
    if (sideBarStatus == true) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, [isExpanded, sideBarStatus]);

  return (
    <>
      <Drawer
        anchor="right"
        variant="temporary"
        open={isExpanded}
        sx={{
          zIndex: 9999999,
          width:
            dimensionStyle[
              isExpanded ? "adminSidebarExpandedWidth" : "adminSidebarWidth"
            ],

          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width:
              dimensionStyle[
                isExpanded ? "adminSidebarExpandedWidth" : "adminSidebarWidth"
              ],
            boxSizing: "border-box",
          },
          ["& .MuiListItemIcon-root"]: {
            minWidth: isExpanded ? undefined : "100%",
            padding: isExpanded ? undefined : "5px",
          },
        }}
      >
        <Toolbar
          sx={{
            minHeight: `${dimensionStyle.adminHeaderHeight} !important`,
          }}
        />
        <Box
          sx={{
            height: "100%",
            overflow: "auto",
            direction: "column",
            justifyContent: "space-between",
          }}
        >
          <AdminSideBarDrawer
            isExpanded={isExpanded}
            selectedUser={selectedUser}
            setSideBarStatus={setSideBarStatus}
            UserType={UserType}
          />
        </Box>
      </Drawer>
      <Box
        sx={{
          position: "fixed",
          top: { xs: "50%" },
          right: `calc(${
            dimensionStyle[
              isExpanded ? "adminSidebarExpandedWidth" : "adminSidebarWidth"
            ]
          } - 20px)`,
          transform: "translateY(-50%)",
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        {/* <IconButton
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{
            backgroundColor: "white",
            borderRadius: "50%",
            boxShadow: 1,
          }}
          disabled={!isExtraSmallScreen}
        >
          {isExpanded ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton> */}
      </Box>
    </>
  );
}

export default AdminPannelSidebar;
