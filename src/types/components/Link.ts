import { LinkProps as MUILinkProps } from "@mui/material";
import { ElementRenderType } from "../common";

export interface LinkProps {
  linkProps?: MUILinkProps;
  children?: ElementRenderType;
}
