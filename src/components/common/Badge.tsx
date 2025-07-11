import { BadgeProps } from "@/types";
import { Badge as MuiBadge } from "@mui/material";

function Badge(props: BadgeProps) {
  return <MuiBadge {...props} />;
}

export default Badge;
