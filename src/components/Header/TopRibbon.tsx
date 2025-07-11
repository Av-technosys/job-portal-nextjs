import { getTopRibbonDetails } from "@/helper";
import { Stack, Tabs } from "../common";
import { useCommonDetails } from "@/services";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { colorStyles, dimensionStyle } from "@/styles";
import { DASHBOARD_URL } from "@/constants";

function TopRibbon() {
  const { userType } = useCommonDetails();
  const router = useRouter();

  const userWiseTopRibbon = useMemo(() => {
    return getTopRibbonDetails({ userType });
  }, [userType]);

  const tabSelectedInRibbon = useMemo(() => {
    const tabSelected = userWiseTopRibbon?.find(
      (tab) => tab.value === router?.pathname
    );
    return tabSelected?.value || DASHBOARD_URL;
  }, [router?.pathname, userWiseTopRibbon]);

  function handleClick(url: string) {
    router.push(
      {
        pathname: `${url}`,
      },
      url
      // {
      //   shallow: true,
      // }
    );
  }

  return (
    <>
      <Stack
        stackProps={{
          bgcolor: colorStyles.topRibbonColor,
          height: dimensionStyle.topRibbonHeight,
          className: "w-full",
          alignItems: "center",
        }}
      >
        <Tabs
          tabsProps={{
            defaultValue: tabSelectedInRibbon,
          }}
          items={userWiseTopRibbon}
          handleTabChange={handleClick}
        />
      </Stack>
    </>
  );
}

export default TopRibbon;
