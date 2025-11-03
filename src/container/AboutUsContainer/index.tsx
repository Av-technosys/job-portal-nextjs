import { AboutUs, DashboardLayout } from "@/components";
import Footer from "@/components/HomePage/footer";
import { getDehydratedStateForCommonDetails } from "@/services";
import { GetServerSidePropsContext } from "next";
import { ReactElement } from "react";

function Page() {
  return <AboutUs />;
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
