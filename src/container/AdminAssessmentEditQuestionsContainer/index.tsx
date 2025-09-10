import { AdminAssessmentEditQuestion } from "@/components";
import { useRouter } from "next/router";
import React from "react";

function AdminAssessmentEditQuestionsContainer() {
  const router = useRouter();
  const { id } = router.query;

  return <AdminAssessmentEditQuestion subjectId={Number(id)} />;
}

export default AdminAssessmentEditQuestionsContainer;
