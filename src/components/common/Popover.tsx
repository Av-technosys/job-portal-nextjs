import { PopoverProps } from "@/types";
import { Popover as MuiPopover } from "@mui/material";

function Popover(props: PopoverProps) {
  return <MuiPopover {...props} />;
}

export default Popover;
