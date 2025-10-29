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
    [HOW_IT_WORKS_URL]: <ContactPhoneOutlinedIcon />,
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
          className: "items-center w-full justify-between px-2 ",
          direction: "row",
        }}
      >
        <NextImage
          props={{
            alt: "ja_logo",
            src: JA_LOGO,
          }}
        />
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
                ".MuiButtonBase-root.MuiTab-root": {
                  minWidth: isExtraSmallScreen ? "0px" : undefined,
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
                gap: 4,
              }}
            >
              <Button
                {...LOGIN_BUTTON}
                onClick={() => handleClick(LOGIN_URL)}
              />
              {/* <Button
                {...REGISTER_BUTTON}
                onClick={() => handleClick(REGISTER_URL)}
              /> */}
            </Stack>
          </When>
        </Stack>
      </Stack>
    </>
  );
}

export default LogoAndSearchRibbon;
