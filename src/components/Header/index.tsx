import { AppBar, Toolbar } from "@mui/material";
import { colorStyles, useThemeContext } from "@/styles";
// import TopRibbon from "./TopRibbon";
import BreadcrumbRibbon from "./BreadcrumbRibbon";
import LogoAndSearchRibbon from "./LogoAndSearchRibbon";
import { useRouter } from "next/router";

function Header({ isAuthenticated }: { isAuthenticated: boolean }) {
  const { theme } = useThemeContext();
  const { pathname } = useRouter();

  return (
    <>
      <AppBar
        style={{
          backgroundColor: theme.palette.background.paper,
          zIndex: theme.zIndex.drawer + 1,
          borderBottom: `1px solid ${colorStyles.topRibbonColor}`,
        }}
        elevation={0}
      >
        <Toolbar sx={{ padding: "0px!important", flexDirection: "column" }}>
          <LogoAndSearchRibbon isAuthenticated={isAuthenticated} />
          {/* <TopRibbon /> */}
          <BreadcrumbRibbon pathname={pathname} />
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
