import { LinkProps } from "@/types";
import { Link as MUILink } from "@mui/material";

function Link({ linkProps, children }: LinkProps) {
  return <MUILink {...linkProps}>{children}</MUILink>;
}

export default Link;
