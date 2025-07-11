import { ContainerProps as MUIContainerProps } from "@mui/material";
import { ElementRenderType } from "../common";

export interface ContainerProps {
  containerProps?: MUIContainerProps;
  children?: ElementRenderType;
}
