import { DashboardLayout } from "@/components";
import { AssessmentScoreContainer } from "@/container";
import React, { ReactElement } from "react";

function AssessmentSubjectId() {
  return <AssessmentScoreContainer />;
}

AssessmentSubjectId.getLayout = (page: ReactElement) => (
  <DashboardLayout pageProps={page.props}>{page}</DashboardLayout>
);

export default AssessmentSubjectId;
