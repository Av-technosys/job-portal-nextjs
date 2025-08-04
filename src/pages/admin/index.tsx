// import React, { ReactElement } from "react";
import { getDehydratedStateForCommonDetails } from "@/services";
import { GetServerSidePropsContext } from "next";
import AdminContainer from "@/container/AdminContainer";
import AdminLayout from "@/components/AdminLayout";
import { ReactElement } from "react";
// import { DashboardContainer } from "@/container";

function Page() {
  return <AdminContainer />;
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
