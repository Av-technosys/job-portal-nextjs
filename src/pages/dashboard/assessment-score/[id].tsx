import AdminLayout from "@/components/AdminLayout";
import { AssessmentScoreContainer } from "@/container";
import React, { ReactElement } from "react";

function AssessmentSubjectId() {
  return <AssessmentScoreContainer />;
}

AssessmentSubjectId.getLayout = (page: ReactElement) => (
  <AdminLayout pageProps={page.props}>{page}</AdminLayout>
);

export default AssessmentSubjectId;
