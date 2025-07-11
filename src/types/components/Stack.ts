import { StackProps as MUIStackProps } from "@mui/material";
import { ElementRenderType } from "../common";

export interface StackProps {
  stackProps?: MUIStackProps;
  children?: ElementRenderType;
}
