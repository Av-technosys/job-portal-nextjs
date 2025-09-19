"use client";

import { useRouter, usePathname } from "next/navigation";
import { ACCOUNT_POPOVER_CONFIG, LOGIN_URL, PROFILE_URL } from "@/constants";
import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuList,
  Typography,
} from "../common";
import { clearAllCookie, getErrorMessageFromAPI } from "@/helper";
import {
  useLogoutUser,
  useNotification,
  useCommonDetails,
  useFirebaseNotification,
} from "@/services";
import { useState } from "react";

function AccountPopover() {
  const { TEXT_CONFIG, MENU_ITEMS, MENU_ITEMS_ADMIN, AVATAR_CONFIG } =
    ACCOUNT_POPOVER_CONFIG;

  const { showNotification } = useNotification();
  const { deleteFCMToken } = useFirebaseNotification();
  const router = useRouter();
  const { name, profileImage } = useCommonDetails();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const pagePath = usePathname();

  function postLogoutAction() {
    clearAllCookie();
    router.push(LOGIN_URL);
  }

  const logoutUser = useLogoutUser({
    mutationConfig: {
      onSuccess: () => {
        deleteFCMToken();
        showNotification({ message: "Successfully Logged out" });
        postLogoutAction();
      },
      onError: (error) => {
        showNotification({
          ...getErrorMessageFromAPI(error),
        });
        postLogoutAction();
        console.error(error, "error");
      },
    },
  });

  function handleMenuItemClick(key: string) {
    switch (key) {
      case "profile":
        router.push(PROFILE_URL);
        break;
      case "logout":
        logoutUser.mutate({ data: {} });
        break;
    }
    handleClose();
  }

  const handleIconButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleIconButtonClick}>
        <Avatar
          {...AVATAR_CONFIG(
            profileImage,
            pagePath?.startsWith("/admin") ? "admin" : name
          )}
        />
      </IconButton>
      <Menu
        handleClose={handleClose}
        anchorEl={anchorEl}
        styles={{
          paperStyles: {
            width: "250px",
          },
        }}
      >
        <Typography
          {...TEXT_CONFIG({
            loggedInUser: pagePath?.startsWith("/admin") ? "admin" : name,
          })}
        />
        <Divider />
        <MenuList
          menuItems={
            pagePath?.startsWith("/admin") ? MENU_ITEMS_ADMIN : MENU_ITEMS
          }
          onClick={handleMenuItemClick}
        />
      </Menu>
    </>
  );
}

export default AccountPopover;
