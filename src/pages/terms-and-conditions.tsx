import React, { ReactElement, useState } from "react";
import { DashboardLayout } from "@/components";
import { getDehydratedStateForCommonDetails } from "@/services";
import { GetServerSidePropsContext } from "next";
import { HomePageContainer } from "@/container";
import Footer from "@/components/HomePage/footer";

function Page() {
  return (
    <>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam saepe
        ut maxime. Neque placeat aperiam asperiores? Odit corporis, voluptate
        officiis animi magnam tempora? Aliquid pariatur, fugit natus maxime
        beatae accusamus?
      </div>
      <div>Terms & Conditions</div>
    </>
  );
}

Page.getLayout = (page: ReactElement) => (
  <>
    <DashboardLayout pageProps={page.props}>{page}</DashboardLayout>
    <Footer />
  </>
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
