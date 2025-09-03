import { Tabs } from "@/components/common";
import { useMemo } from "react";
import AdminRecruiterComponent from "./AdminRecruiterComponent";
import AdminJobseekerComponent from "./AdminJobseekerComponent";
import AdminAssessmentComponent from "./AdminAssessmentComponent";

function AdminTabs() {
  const tabItems = useMemo(() => {
    return [
      {
        label: "Recruiter",
        value: "generalInformation",
        key: "generalInformation",
        children: <AdminRecruiterComponent />,
      },
      {
        label: "Job Seekers",
        value: "profile",
        key: "job-seeker-profile",
        children: <AdminJobseekerComponent />,
      },
      {
        label: "Assessments",
        value: "additionalInformation",
        key: "additionalInformation",
        children: <AdminAssessmentComponent />,
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
            marginBottom: 2,
          },
        }}
      />
    </>
  );
}
export default AdminTabs;
