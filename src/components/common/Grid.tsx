import { Grid2 as MUIGrid } from "@mui/material";
import { GridProps } from "@/types";

function Grid({ gridProps, children }: GridProps) {
  return <MUIGrid {...gridProps}>{children}</MUIGrid>;
}

export default Grid;
