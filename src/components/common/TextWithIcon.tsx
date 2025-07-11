import React from "react";
import { Stack } from "@mui/material";
import { textWithIconProps, TypographyProps } from "@/types";
import When from "./When";
import Typography from "./Typography";
import { constructClassName } from "@/helper";

const TextWithIcon: React.FC<textWithIconProps> = ({
  textWithIconProps,
  icon,
  textProps,
  subTextProps,
}) => {
  return (
    <Stack
      spacing={1}
      {...textWithIconProps}
      className={constructClassName([
        "capitalize",
        textWithIconProps?.className || "",
      ])}
    >
      {/* Main text with icon */}
      <When condition={!subTextProps}>
        <Stack alignItems="center" direction="row" spacing={1}>
          {icon}
          <Typography {...(textProps as TypographyProps)} />
        </Stack>
      </When>
      {/* Render subtext stack if subTextProps is provided */}
      <When condition={!!subTextProps}>
        <Stack alignItems="center" spacing={1}>
          {/* {subIcon} */}
          {icon}
          <Typography {...(subTextProps as TypographyProps)} />
          <Typography {...(textProps as TypographyProps)} />
        </Stack>
      </When>
    </Stack>
  );
};

export default TextWithIcon;
