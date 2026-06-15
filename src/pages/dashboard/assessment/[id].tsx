import { DashboardLayout } from "@/components";
import AssessmentSectionContainer from "@/container/AssessmentSectionContainer";

import React, { ReactElement } from "react";

function AssessmentTestId() {
  return <AssessmentSectionContainer assessmentType="paid" />;
}

AssessmentTestId.getLayout = (page: ReactElement) => (
  <DashboardLayout pageProps={page.props}>{page}</DashboardLayout>
);

export default AssessmentTestId;
