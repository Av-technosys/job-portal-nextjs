import { AppBar, Toolbar } from "@mui/material";
import { colorStyles, useThemeContext } from "@/styles";
import { useRouter } from "next/router";
import { Button, NextImage, Stack, When } from "../common";
import { JA_LOGO } from "@/assets";
import AccountPopover from "./AccountPopover";
import { LOGIN_URL, TOP_RIBBON_AUTH_REDIRECT_CONFIG } from "@/constants";

function AdminHeader({ isAuthenticated }: { isAuthenticated: boolean }) {
  const { theme } = useThemeContext();
  const { LOGIN_BUTTON } = TOP_RIBBON_AUTH_REDIRECT_CONFIG;
  const router = useRouter();
  function handleClick(url: string) {
    router.push(
      {
        pathname: `${url}`,
      },
      url
    );
  }

  return (
    <>
      <Toolbar sx={{ padding: "0px!important", flexDirection: "column" }}>
        <AppBar
          style={{
            backgroundColor: theme.palette.background.paper,
            zIndex: theme.zIndex.drawer + 1,
            borderBottom: `1px solid ${colorStyles.topRibbonColor}`,
          }}
          elevation={0}
        >
          <Stack
            stackProps={{
              className: "items-center w-full justify-between px-2 md:px-20",
              direction: "row",
            }}
          >
            <NextImage
              props={{
                alt: "ja_logo",
                src: JA_LOGO,
              }}
            />

            <When condition={!isAuthenticated}>
              <Button
                {...LOGIN_BUTTON}
                onClick={() => handleClick(LOGIN_URL)}
              />
            </When>
            <When condition={isAuthenticated}>
              <AccountPopover />
            </When>
          </Stack>
        </AppBar>
      </Toolbar>
    </>
  );
}

export default AdminHeader;
