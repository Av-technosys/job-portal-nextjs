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
            borderColor: "divider",
            marginLeft: "25%",
            marginBottom: 2,
          },
        }}
      />
    </>
  );
}

export default JobSeekerProfile;
