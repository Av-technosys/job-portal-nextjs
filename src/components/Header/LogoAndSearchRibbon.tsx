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
  HOW_IT_WORKS_URL,
  JOB_DETAILS_URL,
  JOBS_URL,
  LANDING_URL,
  LOGIN_URL,
  RECRUITER_URL,
  REGISTER_URL,
  TOP_RIBBON_AUTH_REDIRECT_CONFIG,
} from "@/constants";
import { getTopRibbonDetails } from "@/helper";
import { useCommonDetails, useScreen } from "@/services";
import { useMemo } from "react";
import { useRouter } from "next/router";

function LogoAndSearchRibbon({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const { userType } = useCommonDetails();
  const router = useRouter();
  const { LOGIN_BUTTON, REGISTER_BUTTON } = TOP_RIBBON_AUTH_REDIRECT_CONFIG;
  const { isExtraSmallScreen } = useScreen();

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
      const ribbonDetailsForSmallScreens = ribbonDetails?.map((item) => {
        return {
          icon: (
            <>
              <Tooltip title={item.label}>
                {TabIconConfig[item?.value] || <SearchIcon />}
              </Tooltip>
            </>
          ),
          ...item,
          label: undefined,
        };
      });
      return ribbonDetailsForSmallScreens;
    }
    return ribbonDetails;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType, isExtraSmallScreen]);

  const tabSelectedInRibbon = useMemo(() => {
    const tabSelected = userWiseTopRibbon?.find((tab) => {
      // SHow Find Job selected when user is on job details page
      if (tab.value === JOBS_URL && router?.pathname === JOB_DETAILS_URL) {
        return true;
      }
      return tab.value === router?.pathname;
    });

    if (tabSelected?.value) {
      return tabSelected.value;
    } else if (router?.pathname?.includes(DASHBOARD_URL) && userType !== -1) {
      return DASHBOARD_URL;
    }
    return userWiseTopRibbon?.[0]?.value;
  }, [router?.pathname, userWiseTopRibbon, userType]);

  function handleClick(url: string) {
    router.push(
      {
        pathname: `${url}`,
      },
      url
      // {
      //   shallow: true,
      // }
    );
  }

  return (
    <>
      <Stack
        stackProps={{
          className: "items-center w-full justify-between",
          direction: "row",
          sx: { px: { xs: 2, md: 4 }, height: 64 },
        }}
      >
        <div className="flex items-center justify-center flex-shrink-0 mr-6">
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
                height: "56px",
                width: "auto",
              },
            }}
          />
        </div>
        <Stack
          stackProps={{
            className: "w-full",
            alignItems: "center",
          }}
        >
          <Tabs
            tabsProps={{
              defaultValue: tabSelectedInRibbon,
              variant: isExtraSmallScreen ? "fullWidth" : "scrollable",
              visibleScrollbar: true,
              sx: {
                minHeight: 64,
                "& .MuiTabs-indicator": {
                  height: "3px",
                  background: "linear-gradient(90deg, #6366f1, #3b82f6)",
                  borderRadius: "3px 3px 0 0",
                },
                "& .MuiButtonBase-root.MuiTab-root": {
                  minWidth: isExtraSmallScreen ? "0px" : undefined,
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
        <Stack
          stackProps={{
            direction: "row",
            gap: 1,
          }}
        >
          <When condition={isAuthenticated}>
            <ActionNotification />
            <AccountPopover />
          </When>
          <When condition={!isAuthenticated}>
            <Stack
              stackProps={{
                flexDirection: "row",
                alignItems: "center",
                gap: { xs: 0, md: 2 },
              }}
            >
              <Button
                {...LOGIN_BUTTON}
                onClick={() => handleClick(LOGIN_URL)}
              />
              <Button
                {...REGISTER_BUTTON}
                onClick={() => handleClick(REGISTER_URL)}
              />
            </Stack>
          </When>
        </Stack>
      </Stack>
    </>
  );
}

export default LogoAndSearchRibbon;
