import { AvatarProps } from "@/types";
import { Avatar as MUIAvatar } from "@mui/material";

function Avatar(props: AvatarProps) {
  return <MUIAvatar {...props} />;
}

export default Avatar;
