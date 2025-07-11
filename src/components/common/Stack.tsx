import { Stack as MUIStack } from "@mui/material";
import { StackProps } from "@/types";

function Stack({ stackProps, children }: StackProps) {
  return <MUIStack {...stackProps}>{children}</MUIStack>;
}

export default Stack;
