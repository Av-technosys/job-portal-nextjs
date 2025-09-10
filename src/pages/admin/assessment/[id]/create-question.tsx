import { AdminAssessmentEditQuestion } from "@/components";
import { useRouter } from "next/router";
import React from "react";

function CreateQuestion() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <AdminAssessmentEditQuestion
      questionMethod="create-question"
      subjectId={Number(id)}
    />
  );
}

export default CreateQuestion;
