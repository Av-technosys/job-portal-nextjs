import { PaperProps } from "@/types";
import { Paper as MUIPaper } from "@mui/material";

function Paper({ paperProps, children }: PaperProps) {
  return <MUIPaper {...paperProps}>{children}</MUIPaper>;
}

export default Paper;
