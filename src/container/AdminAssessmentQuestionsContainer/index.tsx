import { AdminAssessmentQuestion } from "@/components";
import { useRouter } from "next/router";
import React from "react";

function AdminAssessmentQuestionsContainer() {
  const router = useRouter();
  const { id } = router.query;

  return <AdminAssessmentQuestion subjectId={Number(id)} />;
}

export default AdminAssessmentQuestionsContainer;
