import { Drawer as MuiDrawer } from "@mui/material";
import { DrawerProps } from "@/types";

function Drawer(props: DrawerProps) {
  return <MuiDrawer {...props} />;
}

export default Drawer;
