import React, { ReactElement } from "react";
import { DashboardLayout } from "@/components";
import { getDehydratedStateForCommonDetails } from "@/services";
import { GetServerSidePropsContext } from "next";
import { AssessmentContainer } from "@/container";

function Page() {
  return <AssessmentContainer />;
}

Page.getLayout = (page: ReactElement) => (
  <DashboardLayout pageProps={page.props}>{page}</DashboardLayout>
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
