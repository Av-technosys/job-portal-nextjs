import { DividerProps } from "@/types";
import { Divider as MUIDivider } from "@mui/material";

function Divider({ children, ...props }: DividerProps) {
  return <MUIDivider {...props}>{children}</MUIDivider>;
}

export default Divider;
