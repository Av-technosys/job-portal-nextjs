import { Tabs } from "@/components/common";
import { useMemo } from "react";
import AdminRecruiterComponent from "./AdminRecruiterComponent";
import AdminJobseekerComponent from "./AdminJobseekerComponent";
import AdminAssessmentComponent from "./AdminAssessmentComponent";
import { useRouter } from "next/router";

function AdminTabs() {
  const router = useRouter();
  const { tab } = router.query;
  const currentTabOpen = tab || "recruiter";

  const tabItems = useMemo(() => {
    return [
      {
        label: "Recruiter",
        value: "recruiter",
        key: "recruiter",
        children: <AdminRecruiterComponent />,
        onClick: () => {
          router.push("/admin?tab=recruiter");
        },
      },
      {
        label: "Job Seekers",
        value: "jobSeeker",
        key: "jobSeeker",
        children: <AdminJobseekerComponent />,
        onClick: () => {
          router.push("/admin?tab=jobSeeker");
        },
      },
      {
        label: "Assessments",
        value: "assesment",
        key: "assesment",
        children: <AdminAssessmentComponent />,
        onClick: () => {
          router.push("/admin?tab=assesment");
        },
      },
    ];
  }, []);
  return (
    <>
      <Tabs
        items={tabItems}
        tabsProps={{
          defaultValue: currentTabOpen,
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
