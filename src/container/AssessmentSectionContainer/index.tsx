import { DashboardLayout } from "@/components";
import AssessmentSection from "@/components/Assessments/AssessmentSection";
import Footer from "@/components/HomePage/footer";
import { useRouter } from "next/router";

import React from "react";

const AssessmentSectionContainer = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <AssessmentSection id={id} />
    </>
  );
};

export default AssessmentSectionContainer;
