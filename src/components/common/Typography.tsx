import {
  TypographyFontColor,
  TypographyFontSize,
  TypographyFontWeight,
  TypographyProps,
} from "@/types";
import { Typography as MUITypography } from "@mui/material";

function Typography({
  typographyProps,
  fontSize = TypographyFontSize.normal,
  fontWeight = TypographyFontWeight.normal,
  fontColor = TypographyFontColor.black,
}: TypographyProps) {
  return (
    <MUITypography
      {...typographyProps}
      sx={{
        ...typographyProps.sx,
        fontSize: fontSize,
        fontWeight: fontWeight,
      }}
      color={fontColor}
    />
  );
}

export default Typography;
