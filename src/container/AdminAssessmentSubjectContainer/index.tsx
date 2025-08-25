import AdminAssessmentSubject from "@/components/AdminAssessmentQuestion";
import { useRouter } from "next/router";
import React from "react";

function AdminAssessmentSubjectContainer() {
  const router = useRouter();
  const { id } = router.query;

  return <AdminAssessmentSubject subjectId={Number(id)} />;
}

export default AdminAssessmentSubjectContainer;
