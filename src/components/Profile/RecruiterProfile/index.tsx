import { Tabs } from "@/components/common";
import { useMemo, useState } from "react";
import RecruiterCompanyProfile from "./CompanyProfile";
import SocialLinks from "./SocialLinks";
import RecruiterFoundingInfo from "./CompanyFoundingInfo";

function RecruiterProfile() {
  const [activeTab, setActiveTab] = useState("organizationInfo");

  const tabItems = useMemo(() => {
    return [
      {
        label: "Organization Info",
        value: "organizationInfo",
        key: "organizationInfo",
        children: <RecruiterCompanyProfile onNextTab={() => setActiveTab("foundingInfo")} />,
      },
      {
        label: "Founding Info",
        value: "foundingInfo",
        key: "foundingInfo",
        children: <RecruiterFoundingInfo onNextTab={() => setActiveTab("socialLinks")} />,
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
      handleTabChange={(newTab) => setActiveTab(newTab)}
      tabsProps={{
        defaultValue: activeTab,
        sx: {
          borderBottom: 1,
          borderColor: "transparent",
          marginBottom: 4,
          backgroundColor: '#f8fafc',
          padding: '4px',
          borderRadius: '12px',
          display: 'inline-flex',
          '& .MuiTabs-indicator': {
            display: 'none',
          },
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
            color: '#64748b',
            minHeight: '40px',
            borderRadius: '8px',
            margin: '0 4px',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              color: '#334155',
            },
            '&.Mui-selected': {
              color: '#1e40af',
              backgroundColor: '#ffffff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            },
          },
        },
      }}
    />
  );
}

export default RecruiterProfile;
