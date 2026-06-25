import {
  ContactPhoneOutlinedIcon,
  CloseIcon,
  DeveloperBoardOutlinedIcon,
  HomeOutlinedIcon,
  InfoOutlinedIcon,
  JA_LOGO,
  PersonSearchOutlinedIcon,
  SearchIcon,
  MenuIcon,
} from "@/assets";
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
} from "@/constants";
import { getTopRibbonDetails } from "@/helper";
import { useCommonDetails } from "@/services";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Button, NextImage, Stack, When } from "../common";
import AccountPopover from "./AccountPopover";
import ActionNotification from "../ActionNotification";

const TAB_ICON_MAP: Record<string, React.ReactElement> = {
  [LANDING_URL]: <HomeOutlinedIcon />,
  [JOBS_URL]: <SearchIcon />,
  [RECRUITER_URL]: <PersonSearchOutlinedIcon />,
  [DASHBOARD_URL]: <DeveloperBoardOutlinedIcon />,
  [CONTACT_US_URL]: <ContactPhoneOutlinedIcon />,
  [ABOUT_US_URL]: <InfoOutlinedIcon />,
};

const DRAWER_WIDTH = 270;

interface MobileDrawerMenuProps {
  isAuthenticated: boolean;
}

function MobileDrawerMenu({ isAuthenticated }: MobileDrawerMenuProps) {
  const [open, setOpen] = useState(false);
  const { userType } = useCommonDetails();
  const router = useRouter();
  const { LOGIN_BUTTON, REGISTER_BUTTON } = TOP_RIBBON_AUTH_REDIRECT_CONFIG;

  const navItems = useMemo(
    () => getTopRibbonDetails({ userType }),
    [userType]
  );

  const activeValue = useMemo(() => {
    const matched = navItems?.find((tab) => {
      if (tab.value === JOBS_URL && router.pathname === JOB_DETAILS_URL)
        return true;
      return tab.value === router.pathname;
    });
    return matched?.value ?? navItems?.[0]?.value;
  }, [router.pathname, navItems]);

  function handleNavigate(url: string) {
    router.push({ pathname: url }, url);
    setOpen(false);
  }

  return (
    <>
      {/* ── Top bar: Logo | (auth icons) | Hamburger ── */}
      <Stack
        stackProps={{
          direction: "row",
          alignItems: "center",
          justifyContent: "space-between",
          className: "w-full px-3 py-1",
        }}
      >
        <NextImage
          props={{
            alt: "ja_logo",
            src: JA_LOGO,
            onClick: () => handleNavigate(LANDING_URL),
            style: { cursor: "pointer" },
          }}
        />

        <Stack stackProps={{ direction: "row", alignItems: "center", gap: 0.5 }}>
          <When condition={isAuthenticated}>
            <ActionNotification />
            <AccountPopover />
          </When>
          <When condition={!isAuthenticated}>
            <Button
              {...LOGIN_BUTTON}
              onClick={() => handleNavigate(LOGIN_URL)}
            />
            <Button
              {...REGISTER_BUTTON}
              onClick={() => handleNavigate(REGISTER_URL)}
            />
          </When>

          {/* Hamburger button */}
          <IconButton
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
            edge="end"
            size="medium"
            sx={{ ml: 0.5 }}
          >
            <MenuIcon />
          </IconButton>
        </Stack>
      </Stack>

      {/* ── Slide-in Drawer ── */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: DRAWER_WIDTH,
            pt: 1,
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {/* Drawer header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            pb: 1,
          }}
        >
          <NextImage
            props={{
              alt: "ja_logo",
              src: JA_LOGO,
              onClick: () => handleNavigate(LANDING_URL),
              style: { cursor: "pointer" },
            }}
          />
          <IconButton onClick={() => setOpen(false)} aria-label="Close menu">
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* Nav links */}
        <List sx={{ flexGrow: 1, py: 1 }}>
          {navItems?.map((item) => {
            const isActive = item.value === activeValue;
            return (
              <ListItem key={item.key} disablePadding>
                <ListItemButton
                  selected={isActive}
                  onClick={() => handleNavigate(item.value)}
                  sx={{
                    borderRadius: 2,
                    mx: 1,
                    my: 0.25,
                    "&.Mui-selected": {
                      backgroundColor: "primary.main",
                      color: "primary.contrastText",
                      "& .MuiListItemIcon-root": {
                        color: "primary.contrastText",
                      },
                      "&:hover": {
                        backgroundColor: "primary.dark",
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 36,
                      color: isActive ? "inherit" : "text.secondary",
                    }}
                  >
                    {TAB_ICON_MAP[item.value] ?? <SearchIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: isActive ? 700 : 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        {/* Bottom auth block for unauthenticated users */}
        <When condition={!isAuthenticated}>
          <Divider />
          <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Button
              {...LOGIN_BUTTON}
              buttonProps={{
                ...LOGIN_BUTTON.buttonProps,
                fullWidth: true,
              }}
              onClick={() => handleNavigate(LOGIN_URL)}
            />
            <Button
              {...REGISTER_BUTTON}
              buttonProps={{
                ...REGISTER_BUTTON.buttonProps,
                fullWidth: true,
              }}
              onClick={() => handleNavigate(REGISTER_URL)}
            />
          </Box>
        </When>
      </Drawer>
    </>
  );
}

export default MobileDrawerMenu;
