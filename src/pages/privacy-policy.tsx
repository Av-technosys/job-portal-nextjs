import React, { ReactElement, useState } from "react";
import { DashboardLayout } from "@/components";
import { getDehydratedStateForCommonDetails } from "@/services";
import { GetServerSidePropsContext } from "next";
import { HomePageContainer } from "@/container";
import Footer from "@/components/HomePage/footer";
// import Footer from "@/components/HomePage/Footer";

function Page() {
  return (
    <div className="max-w-[22rem] md:max-w-[45rem] lg:max-w-6xl mx-auto w-full px-4 sm:px-6 my-12 text-slate-700 leading-relaxed">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">Privacy Policy</h1>
      <div className="mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet impedit
        natus aut! Temporibus neque laboriosam perferendis incidunt, esse
        provident dolor earum corrupti placeat dicta iusto. Vero ab dolor at
        ipsa.
      </div>
    </div>
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
