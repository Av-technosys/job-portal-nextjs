import { PaperProps as MUIPaperProps } from "@mui/material";
import { ElementRenderType } from "../common";

export interface PaperProps {
  paperProps?: MUIPaperProps;
  children?: ElementRenderType;
}
