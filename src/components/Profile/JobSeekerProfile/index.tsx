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
    </>
  );
}

export default JobSeekerProfile;
