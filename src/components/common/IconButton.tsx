import { IconButtonProps } from "@/types";
import { IconButton as MUIIconButton } from "@mui/material";

function IconButton({ children, ...props }: IconButtonProps) {
  return <MUIIconButton {...props}>{children}</MUIIconButton>;
}

export default IconButton;
