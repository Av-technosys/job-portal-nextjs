import React, { ReactElement } from "react";

import { AssessmentScoreContainer } from "@/container";
import AdminLayout from "@/components/AdminLayout";

function Page() {
  return <AssessmentScoreContainer />;
}
Page.getLayout = (page: ReactElement) => (
  <AdminLayout pageProps={page.props}>{page}</AdminLayout>
);
export default Page;
