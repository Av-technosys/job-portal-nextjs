import { useMediaQuery } from "@mui/material";

export function useScreen() {
  const isExtraSmallScreen = useMediaQuery("(max-width:639px)");
  const isSmallScreen = useMediaQuery(
    "(min-width:640px) and (max-width:767px)"
  );
  const isMediumScreen = useMediaQuery(
    "(min-width:768px) and (max-width:1023px)"
  );
  const isLargeScreen = useMediaQuery(
    "(min-width:1024px) and (max-width:1279px)"
  );
  const isExtraLargeScreen = useMediaQuery(
    "(min-width:1280px) and (max-width:1535px)"
  );

  return {
    isExtraSmallScreen,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    isExtraLargeScreen,
  };
}
