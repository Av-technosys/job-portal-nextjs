import { AppBar, Toolbar } from "@mui/material";
import { useThemeContext } from "@/styles";
import LogoAndSearchRibbon from "./LogoAndSearchRibbon";

function Header({ isAuthenticated }: { isAuthenticated: boolean }) {
  const { theme } = useThemeContext();

  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        zIndex: theme.zIndex.drawer + 1,
        boxShadow: "0 1px 0 0 #e8eaf0",
        borderBottom: "1px solid #e8eaf0",
      }}
    >
      <Toolbar sx={{ padding: "0px!important", flexDirection: "column" }}>
        <LogoAndSearchRibbon isAuthenticated={isAuthenticated} />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
