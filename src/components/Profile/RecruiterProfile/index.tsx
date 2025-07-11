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
        sx: {
          borderBottom: 1,
          borderColor: "divider",
          marginLeft: "25%",
          marginBottom: 2,
        },
      }}
    />
  );
}

export default RecruiterProfile;
