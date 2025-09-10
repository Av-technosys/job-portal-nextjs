import React, { ReactElement } from "react";

import { getDehydratedStateForCommonDetails } from "@/services";
import { GetServerSidePropsContext } from "next";
import { AdminAssessmentQuestionsContainer } from "@/container";
import AdminAssessmentContainer from "@/container/AdminAssessmentContainer";
import { DashboardLayout } from "@/components";
import AdminLayout from "@/components/AdminLayout";

function Page() {
  return <AdminAssessmentContainer />;
}

Page.getLayout = (page: ReactElement) => (
  <AdminLayout pageProps={page.props}>{page}</AdminLayout>
);

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const commonDetails = await getDehydratedStateForCommonDetails(context);

  return {
    props: {
      ...commonDetails,
    },
  };
}

export default Page;
