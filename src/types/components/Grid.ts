import { Grid2Props as MUIGridProps } from "@mui/material";
import { ElementRenderType } from "../common";

export interface GridProps {
  gridProps?: MUIGridProps;
  children?: ElementRenderType;
}
