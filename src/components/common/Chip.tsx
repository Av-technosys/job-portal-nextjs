import { Chip as MUIChip } from "@mui/material";
import { ChipProps } from "@/types";

function Chip(props: ChipProps) {
  return <MUIChip {...props} />;
}

export default Chip;
