import AdminLayout from "@/components/AdminLayout";
import AssessmentSectionContainer from "@/container/AssessmentSectionContainer";

import React, { ReactElement } from "react";

function AssessmentTestId() {
  return <AssessmentSectionContainer assessmentType="free" />;
}

AssessmentTestId.getLayout = (page: ReactElement) => (
  <AdminLayout pageProps={page.props}>{page}</AdminLayout>
);

export default AssessmentTestId;
