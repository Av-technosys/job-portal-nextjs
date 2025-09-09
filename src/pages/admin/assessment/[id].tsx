import React from "react";

import { getDehydratedStateForCommonDetails } from "@/services";
import { GetServerSidePropsContext } from "next";
import { AdminAssessmentQuestionsContainer } from "@/container";

function Page() {
  return <AdminAssessmentQuestionsContainer />;
}

// Page.getLayout = (page: ReactElement) => (
//   <DashboardLayout pageProps={page.props}>{page}</DashboardLayout>
// );

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const commonDetails = await getDehydratedStateForCommonDetails(context);

  return {
    props: {
      ...commonDetails,
    },
  };
}

export default Page;
