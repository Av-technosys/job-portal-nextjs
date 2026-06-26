import { Tabs } from "@/components/common";
import { useMemo } from "react";
import RecruiterCompanyProfile from "./CompanyProfile";
import SocialLinks from "./SocialLinks";
import RecruiterFoundingInfo from "./CompanyFoundingInfo";

function RecruiterProfile() {
  const tabItems = useMemo(() => {
    return [
      {
        label: "Organization Info",
        value: "organizationInfo",
        key: "organizationInfo",
        children: <RecruiterCompanyProfile />,
      },
      {
        label: "Founding Info",
        value: "foundingInfo",
        key: "foundingInfo",
        children: <RecruiterFoundingInfo />,
      },
      {
        label: "Social Links",
        value: "socialLinks",
        key: "socialLinks",
        children: <SocialLinks />,
      },
    ];
  }, []);

  return (
    <Tabs
      items={tabItems}
      tabsProps={{
        defaultValue: tabItems?.[0].key,
        variant: "scrollable",
        scrollButtons: "auto",
        allowScrollButtonsMobile: true,
        sx: {
          borderBottom: 1,
          borderColor: "divider",
          marginBottom: 2,
          "& .MuiTab-root": {
            fontSize: { xs: 13, md: 14 },
            fontWeight: 600,
            minWidth: { xs: 80, md: 120 },
            px: { xs: 1.5, md: 2 },
            textTransform: "capitalize",
          },
        },
      }}
    />
  );
}

export default RecruiterProfile;
