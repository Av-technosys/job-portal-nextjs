import { Tabs } from "@/components/common";
import { useState, useMemo } from "react";
import StudentProfile from "./StudentProfile";
import AdditonalInformation from "./AdditionalInformation";
import Personal from "./Personal";
import SocialLinks from "./SocialLinks";

function JobSeekerProfile() {
  const [currentTab, setCurrentTab] = useState("generalInformation");

  const tabItems = useMemo(() => {
    return [
      {
        label: "Personal",
        value: "generalInformation",
        key: "generalInformation",
        children: <Personal onNextTab={() => setCurrentTab("profile")} />,
      },
      {
        label: "Profile",
        value: "profile",
        key: "job-seeker-profile",
        children: <StudentProfile onNextTab={() => setCurrentTab("additionalInformation")} />,
      },
      {
        label: "Additional Information",
        value: "additionalInformation",
        key: "additionalInformation",
        children: <AdditonalInformation onNextTab={() => setCurrentTab("socialLinks")} />,
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
    <>
      <Tabs
        items={tabItems}
        handleTabChange={setCurrentTab}
        tabsProps={{
          defaultValue: currentTab,
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
    </>
  );
}

export default JobSeekerProfile;
