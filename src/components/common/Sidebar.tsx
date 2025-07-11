import { Box, Drawer, Toolbar } from "@mui/material";
import UserWiseSidebar from "../UserWiseSidebar";
import { dimensionStyle, useThemeContext } from "@/styles";
import { useScreen } from "@/services";
import { useEffect, useState } from "react";
import IconButton from "./IconButton";
import { ChevronLeftIcon, ChevronRightIcon } from "@/assets";

function Sidebar() {
  const { isExtraSmallScreen } = useScreen();
  const [isExpanded, setIsExpanded] = useState(!isExtraSmallScreen);
  const { theme } = useThemeContext();

  useEffect(() => {
    if (isExpanded && isExtraSmallScreen) {
      setIsExpanded(false);
    }
  }, [isExtraSmallScreen, isExpanded]);

  return (
    <>
      <Drawer
        variant={"permanent"}
        sx={{
          width:
            dimensionStyle[
              isExpanded ? "sidebarExpandedWidth" : "sidebarWidth"
            ],
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width:
              dimensionStyle[
                isExpanded ? "sidebarExpandedWidth" : "sidebarWidth"
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
            minHeight: `${dimensionStyle.headerHeight} !important`,
          }}
        />
        <Box sx={{ overflow: "auto" }}>
          <UserWiseSidebar isExpanded={isExpanded} />
        </Box>
      </Drawer>
      <Box
        sx={{
          position: "fixed",
          top: "85%",
          left: `calc(${
            dimensionStyle[isExpanded ? "sidebarExpandedWidth" : "sidebarWidth"]
          } - 20px)`,
          transform: "translateY(-50%)",
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <IconButton
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{
            backgroundColor: "white",
            borderRadius: "50%",
            boxShadow: 1,
          }}
          disabled={isExtraSmallScreen}
        >
          {isExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>
    </>
  );
}

export default Sidebar;
