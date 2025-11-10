import React, { ReactElement, useState } from "react";
import { DashboardLayout } from "@/components";
import { getDehydratedStateForCommonDetails } from "@/services";
import { GetServerSidePropsContext } from "next";
import { HomePageContainer } from "@/container";
import Footer from "@/components/HomePage/footer";
// import Footer from "@/components/HomePage/Footer";

function Page() {
  return (
    <>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet impedit
        natus aut! Temporibus neque laboriosam perferendis incidunt, esse
        provident dolor earum corrupti placeat dicta iusto. Vero ab dolor at
        ipsa.
      </div>
      <div>Privacy Policy</div>
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
