import React, { ReactElement } from "react";
import { DashboardLayout } from "@/components";
import { AssessmentContainer } from "@/container";

function Page() {
  return <AssessmentContainer />;
}

Page.getLayout = (page: ReactElement) => (
  <DashboardLayout pageProps={page.props}>{page}</DashboardLayout>
);

export default Page;
