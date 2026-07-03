import { Tabs } from "@/components/common";
import { useMemo } from "react";
import AdminRecruiterComponent from "./AdminRecruiterComponent";
import AdminJobseekerComponent from "./AdminJobseekerComponent";
import AdminAssessmentComponent from "./AdminAssessmentComponent";
import AdminContactDetailsComponent from "./AdminContactDetailsComponent";
import AdminPaymentDetailsComponent from "./AdminPaymentDetailsComponent";
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
      {
        label: "Contact-Details",
        value: "contact-details",
        key: "contact-details",
        children: <AdminContactDetailsComponent />,
        onClick: () => {
          router.push("/admin?tab=contact-details");
        },
      },

      // ⭐ NEW TAB ADDED HERE
      {
        label: "Payments",
        value: "payments",
        key: "payments",
        children: <AdminPaymentDetailsComponent />,
        onClick: () => {
          router.push("/admin?tab=payments");
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
            borderBottom: 0,
            borderColor: "transparent",
            marginBottom: 4,
            backgroundColor: "#f8fafc",
            padding: "6px",
            borderRadius: "16px",
            display: "inline-flex",
            border: "1px solid #e2e8f0",
            "& .MuiTabs-indicator": {
              display: "none !important",
              height: "0px !important",
              opacity: "0 !important",
              visibility: "hidden !important",
              backgroundColor: "transparent !important",
            },
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
              color: "#64748b",
              minHeight: "44px",
              padding: "10px 24px",
              borderRadius: "12px",
              margin: "0 4px",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                color: "#334155",
                backgroundColor: "#f1f5f9",
              },
              "&.Mui-selected": {
                color: "#4f46e5 !important",
                backgroundColor: "#ffffff !important",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04) !important",
              },
              "&.Mui-focusVisible": {
                backgroundColor: "#ffffff !important",
              },
              "& .MuiTouchRipple-root": {
                display: "none !important",
              },
            },
          },
        }}
      />
    </>
  );
}

export default AdminTabs;
