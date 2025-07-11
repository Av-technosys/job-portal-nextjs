import { AvatarVariantEnum } from "@/types";
import { getInitials } from "@/helper";

export const CIRCULAR_AVATAR_CONFIG = (profileImage: string, name: string) => {
  return {
    variant: AvatarVariantEnum.CIRCULAR,
    sx: {
      width: "130px",
      height: "130px",
    },
    className: "border",
    src: profileImage,
    alt: name,
    children: getInitials({ name: name }),
  };
};

export const SQUARE_AVATAR_CONFIG = (profileImage: string, name: string) => {
  return {
    variant: AvatarVariantEnum.SQUARE,
    sx: {
      width: "250px",
      height: "250px",
      border: "none",
    },
    className: "border",
    src: profileImage,
    alt: name,
    children: getInitials({ name: name }),
  };
};
