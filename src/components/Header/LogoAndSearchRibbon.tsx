import {
  ContactPhoneOutlinedIcon,
  DeveloperBoardOutlinedIcon,
  HomeOutlinedIcon,
  JA_LOGO,
  PersonSearchOutlinedIcon,
  SearchIcon,
} from "@/assets";
import ActionNotification from "../ActionNotification";
import { Button, NextImage, Stack, Tabs, Tooltip, When } from "../common";
import AccountPopover from "./AccountPopover";
import {
  ABOUT_US_URL,
  CONTACT_US_URL,
  DASHBOARD_URL,
  JOB_DETAILS_URL,
  JOBS_URL,
  LANDING_URL,
  LOGIN_URL,
  RECRUITER_URL,
  REGISTER_URL,
  TOP_RIBBON_AUTH_REDIRECT_CONFIG,
  MY_APPLIED_JOBS_URL,
  PROFILE_URL,
  CREATE_JOB_URL,
  MY_POSTED_JOBS_URL,
  SAVED_JOB_URL,
  ASSESSMENT_URL,
  SCORE_URL,
} from "@/constants";
import { getSidebarDetails, getTopRibbonDetails } from "@/helper";
import { useCommonDetails, useScreen } from "@/services";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import {
  MyJobsIcon,
  OverviewIcon,
  ProfileIcon,
  UploadFileIcon,
  SaveAltIcon,
  AssessmentIcon,
} from "@/assets";
import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Collapse } from "@mui/material";
import { UserType } from "@/types";

// Hamburger icon
function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

const DASHBOARD_ICON_MAP: Record<string, JSX.Element> = {
  [DASHBOARD_URL]: <OverviewIcon />,
  [MY_APPLIED_JOBS_URL]: <MyJobsIcon />,
  [PROFILE_URL]: <ProfileIcon />,
  [CREATE_JOB_URL]: <UploadFileIcon />,
  [MY_POSTED_JOBS_URL]: <MyJobsIcon />,
  [SAVED_JOB_URL]: <SaveAltIcon />,
  [ASSESSMENT_URL]: <AssessmentIcon />,
  [SCORE_URL]: <AssessmentIcon />,
};

function LogoAndSearchRibbon({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const { userType } = useCommonDetails();
  const router = useRouter();
  const { LOGIN_BUTTON, REGISTER_BUTTON } = TOP_RIBBON_AUTH_REDIRECT_CONFIG;
  const { isExtraSmallScreen } = useScreen();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dashboardExpanded, setDashboardExpanded] = useState(false);

  const TabIconConfig = {
    [LANDING_URL]: <HomeOutlinedIcon />,
    [JOBS_URL]: <SearchIcon />,
    [RECRUITER_URL]: <PersonSearchOutlinedIcon />,
    [DASHBOARD_URL]: <DeveloperBoardOutlinedIcon />,
    [CONTACT_US_URL]: <ContactPhoneOutlinedIcon />,
    [ABOUT_US_URL]: <ContactPhoneOutlinedIcon />,
  };

  const userWiseTopRibbon = useMemo(() => {
    const ribbonDetails = getTopRibbonDetails({ userType });
    if (isExtraSmallScreen) {
      return ribbonDetails?.map((item) => ({
        icon: (
          <>
            <Tooltip title={item.label}>
              {TabIconConfig[item?.value] || <SearchIcon />}
            </Tooltip>
          </>
        ),
        ...item,
        label: undefined,
      }));
    }
    return ribbonDetails;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType, isExtraSmallScreen]);

  const tabSelectedInRibbon = useMemo(() => {
    const tabSelected = userWiseTopRibbon?.find((tab) => {
      if (tab.value === JOBS_URL && router?.pathname === JOB_DETAILS_URL) return true;
      return tab.value === router?.pathname;
    });
    if (tabSelected?.value) return tabSelected.value;
    else if (router?.pathname?.includes(DASHBOARD_URL) && userType !== -1) return DASHBOARD_URL;
    return userWiseTopRibbon?.[0]?.value;
  }, [router?.pathname, userWiseTopRibbon, userType]);

  // All nav tabs for the hamburger menu (with labels always shown)
  const allNavTabs = useMemo(() => getTopRibbonDetails({ userType }), [userType]);

  // Dashboard sidebar items for the hamburger menu
  const dashboardItems = useMemo(() => {
    if (userType === -1) return [];
    return getSidebarDetails({ userType }).map((item) => ({
      ...item,
      icon: DASHBOARD_ICON_MAP[item.listValue],
    }));
  }, [userType]);

  function handleClick(url: string) {
    router.push({ pathname: `${url}` }, url);
  }

  function handleMobileNav(url: string) {
    setMobileOpen(false);
    handleClick(url);
  }

  const isDashboardRoute = router?.pathname?.startsWith(DASHBOARD_URL);

  return (
    <>
      <Stack
        stackProps={{
          className: "items-center w-full justify-between",
          direction: "row",
          sx: { px: { xs: 2, md: 4 }, height: 64 },
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-center flex-shrink-0 mr-2 md:mr-6">
          <NextImage
            props={{
              alt: "ja_logo",
              src: JA_LOGO,
              width: 220,
              height: 56,
              onClick: () => handleClick(LANDING_URL),
              style: {
                cursor: "pointer",
                objectFit: "contain",
                height: "46px",
                width: "auto",
              },
            }}
          />
        </div>

        {/* Desktop nav tabs — hidden on mobile */}
        <Stack
          stackProps={{
            className: "hidden md:flex w-full",
            alignItems: "center",
          }}
        >
          <Tabs
            tabsProps={{
              defaultValue: tabSelectedInRibbon,
              variant: "scrollable",
              visibleScrollbar: true,
              sx: {
                minHeight: 64,
                "& .MuiTabs-indicator": {
                  height: "3px",
                  background: "linear-gradient(90deg, #6366f1, #3b82f6)",
                  borderRadius: "3px 3px 0 0",
                },
                "& .MuiButtonBase-root.MuiTab-root": {
                  minHeight: 64,
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#64748b",
                  textTransform: "none",
                  letterSpacing: "0.01em",
                  px: 2,
                  "&:hover": {
                    color: "#6366f1",
                    backgroundColor: "rgba(99,102,241,0.04)",
                    borderRadius: "6px",
                  },
                  "&.Mui-selected": {
                    color: "#4f46e5",
                    fontWeight: 600,
                  },
                },
              },
            }}
            items={userWiseTopRibbon}
            handleTabChange={handleClick}
          />
        </Stack>

        {/* Right side: auth/notifications + hamburger */}
        <Stack stackProps={{ direction: "row", gap: 1, alignItems: "center" }}>
          <When condition={isAuthenticated}>
            <ActionNotification />
            <AccountPopover />
          </When>
          <When condition={!isAuthenticated}>
            <Stack
              stackProps={{
                flexDirection: "row",
                alignItems: "center",
                gap: { xs: 0.5, md: 2 },
                sx: { display: { xs: "none", md: "flex" } },
              }}
            >
              <Button {...LOGIN_BUTTON} onClick={() => handleClick(LOGIN_URL)} />
              <Button {...REGISTER_BUTTON} onClick={() => handleClick(REGISTER_URL)} />
            </Stack>
          </When>

          {/* Hamburger button — mobile only */}
          <div className="flex md:hidden">
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{
                color: "#4f46e5",
                p: 1,
                borderRadius: "8px",
                "&:hover": { backgroundColor: "rgba(99,102,241,0.06)" },
              }}
            >
              <HamburgerIcon />
            </IconButton>
          </div>
        </Stack>
      </Stack>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 280,
            boxSizing: "border-box",
            background: "#fff",
          },
        }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
          <NextImage
            props={{
              alt: "ja_logo",
              src: JA_LOGO,
              width: 140,
              height: 40,
              onClick: () => handleMobileNav(LANDING_URL),
              style: { cursor: "pointer", objectFit: "contain", height: "36px", width: "auto" },
            }}
          />
          <IconButton
            onClick={() => setMobileOpen(false)}
            sx={{ color: "#64748b", p: 0.75 }}
          >
            <CloseIcon />
          </IconButton>
        </div>

        {/* Nav links */}
        <List sx={{ py: 1 }}>
          {allNavTabs?.map((tab) => {
            const isDash = tab.value === DASHBOARD_URL;
            const isActive = tabSelectedInRibbon === tab.value;

            if (isDash && isAuthenticated && dashboardItems.length > 0) {
              return (
                <div key={tab.value}>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        setDashboardExpanded((prev) => !prev);
                      }}
                      sx={{
                        px: 2,
                        py: 1,
                        borderRadius: "8px",
                        mx: 1,
                        color: isDashboardRoute ? "#4f46e5" : "#334155",
                        fontWeight: isDashboardRoute ? 700 : 500,
                        backgroundColor: isDashboardRoute ? "rgba(99,102,241,0.08)" : "transparent",
                        "&:hover": { backgroundColor: "rgba(99,102,241,0.06)" },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
                        {TabIconConfig[tab.value] || <DeveloperBoardOutlinedIcon />}
                      </ListItemIcon>
                      <ListItemText
                        primary={tab.label}
                        primaryTypographyProps={{
                          fontSize: "0.9rem",
                          fontWeight: isDashboardRoute ? 700 : 500,
                        }}
                      />
                      {dashboardExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </ListItemButton>
                  </ListItem>

                  {/* Dashboard sub-items */}
                  <Collapse in={dashboardExpanded || isDashboardRoute} timeout="auto" unmountOnExit>
                    <List disablePadding>
                      {dashboardItems.map((item) => {
                        const isSubActive = router.pathname === item.listValue;
                        return (
                          <ListItem key={item.listValue} disablePadding>
                            <ListItemButton
                              onClick={() => handleMobileNav(item.listValue)}
                              sx={{
                                pl: 4.5,
                                pr: 2,
                                py: 0.75,
                                borderRadius: "8px",
                                mx: 1,
                                color: isSubActive ? "#4f46e5" : "#475569",
                                fontWeight: isSubActive ? 700 : 400,
                                backgroundColor: isSubActive ? "rgba(99,102,241,0.08)" : "transparent",
                                "&:hover": { backgroundColor: "rgba(99,102,241,0.06)" },
                              }}
                            >
                              <ListItemIcon sx={{ minWidth: 32, color: "inherit", "& svg": { fontSize: "1.1rem" } }}>
                                {item.icon}
                              </ListItemIcon>
                              <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{
                                  fontSize: "0.85rem",
                                  fontWeight: isSubActive ? 700 : 400,
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                </div>
              );
            }

            return (
              <ListItem key={tab.value} disablePadding>
                <ListItemButton
                  onClick={() => handleMobileNav(tab.value)}
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: "8px",
                    mx: 1,
                    color: isActive ? "#4f46e5" : "#334155",
                    fontWeight: isActive ? 700 : 500,
                    backgroundColor: isActive ? "rgba(99,102,241,0.08)" : "transparent",
                    "&:hover": { backgroundColor: "rgba(99,102,241,0.06)" },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
                    {TabIconConfig[tab.value] || <SearchIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={tab.label}
                    primaryTypographyProps={{
                      fontSize: "0.9rem",
                      fontWeight: isActive ? 700 : 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        {/* Login/Register for unauthenticated users */}
        <When condition={!isAuthenticated}>
          <Divider sx={{ my: 1 }} />
          <div className="px-4 flex flex-col gap-2 pb-4">
            <Button {...LOGIN_BUTTON} onClick={() => handleMobileNav(LOGIN_URL)} />
            <Button {...REGISTER_BUTTON} onClick={() => handleMobileNav(REGISTER_URL)} />
          </div>
        </When>
      </Drawer>
    </>
  );
}

export default LogoAndSearchRibbon;
