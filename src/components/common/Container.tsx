import { Container as MUIContainer } from "@mui/material";
import { ContainerProps } from "@/types";

function Container({ containerProps, children }: ContainerProps) {
  return <MUIContainer {...containerProps}>{children}</MUIContainer>;
}

export default Container;
