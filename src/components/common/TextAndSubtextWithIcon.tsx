import React from "react";
import { Stack } from "@mui/material";
import { textAndSubtexttWithIconProps, TypographyProps } from "@/types";
import When from "./When";
import Typography from "./Typography";
import { constructClassName } from "@/helper";

const TextAndSubtextWithIcon: React.FC<textAndSubtexttWithIconProps> = ({
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
        <Stack alignItems="center" direction="row" spacing={1}>
          {/* {subIcon} */}
          {icon}
          <Stack direction="column">
            <Typography {...(subTextProps as TypographyProps)} />
            <Typography {...(textProps as TypographyProps)} />
          </Stack>
        </Stack>
      </When>
    </Stack>
  );
};

export default TextAndSubtextWithIcon;
