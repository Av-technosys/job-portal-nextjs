import { Tabs } from "@/components/common";
import { useMemo } from "react";
import StudentProfile from "./StudentProfile";
import AdditonalInformation from "./AdditionalInformation";
import Personal from "./Personal";
import SocialLinks from "./SocialLinks";

function JobSeekerProfile() {
  const tabItems = useMemo(() => {
    return [
      {
        label: "Personal",
        value: "generalInformation",
        key: "generalInformation",
        children: <Personal />,
      },
      {
        label: "Profile",
        value: "profile",
        key: "job-seeker-profile",
        children: <StudentProfile />,
      },
      {
        label: "Additional Information",
        value: "additionalInformation",
        key: "additionalInformation",
        children: <AdditonalInformation />,
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
    </>
  );
}

export default JobSeekerProfile;
