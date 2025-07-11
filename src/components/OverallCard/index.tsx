import { Stack, Typography, Skeleton, When } from "../common";
import { DASHBOARD_PAGE_CONFIG } from "@/constants";
import { colorStyles } from "@/styles";
import { SkeletonVariantEnum } from "@/types";

function OverallCard({
  title,
  count,
  bgColor,
  icon,
  isLoading,
}: {
  title: string;
  count: number;
  bgColor: string;
  icon: React.ReactNode;
  isLoading: boolean;
}) {
  return (
    <Stack
      stackProps={{
        className: "my-2 rounded-lg px-5 py-6 shadow-md",
        height: "100px",
        width: "280px",
        justifyContent: "space-between",
        bgcolor: bgColor,
        direction: "row",
        alignItems: "center",
      }}
    >
      <Stack>
        <When condition={isLoading}>
          <Skeleton
            variant={SkeletonVariantEnum.TEXT}
            {...DASHBOARD_PAGE_CONFIG.SKELETON.COUNT_ICON}
          />
          <Skeleton
            variant={SkeletonVariantEnum.TEXT}
            {...DASHBOARD_PAGE_CONFIG.SKELETON.TITLE_TEXT}
          />
        </When>
        <When condition={!isLoading}>
          <Typography {...DASHBOARD_PAGE_CONFIG.COUNT(count)} />
          <Typography {...DASHBOARD_PAGE_CONFIG.TITLE_TEXT(title)} />
        </When>
      </Stack>

      <When condition={isLoading}>
        <Skeleton
          variant={SkeletonVariantEnum.TEXT}
          {...DASHBOARD_PAGE_CONFIG.SKELETON.COUNT_ICON}
        />
      </When>
      <When condition={!isLoading}>
        <Stack
          stackProps={{
            height: "40px",
            width: "40px",
            bgcolor: colorStyles.white,
            className:
              "items-center justify-center rounded-md border-2 border-white",
          }}
        >
          {icon}
        </Stack>
      </When>
    </Stack>
  );
}

export default OverallCard;
