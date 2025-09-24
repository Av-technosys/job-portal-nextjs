import { DashboardLayout } from "@/components";
import AssessmentSection from "@/components/Assessments/AssessmentSection";
import Footer from "@/components/HomePage/footer";
import { useRouter } from "next/router";

import React from "react";

type assessmentProps = {
  assessmentType: string;
};

const AssessmentSectionContainer = ({ assessmentType }: assessmentProps) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <AssessmentSection id={id} assessmentType={assessmentType} />
    </>
  );
};

export default AssessmentSectionContainer;
