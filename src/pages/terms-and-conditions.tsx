import React, { ReactElement } from "react";
import { DashboardLayout } from "@/components";
import { getDehydratedStateForCommonDetails } from "@/services";
import { GetServerSidePropsContext } from "next";
import Footer from "@/components/HomePage/footer";

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: `By accessing and using the Job Assured platform ("Service"), you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our Service. We reserve the right to modify these terms at any time, and your continued use of the Service constitutes your acceptance of the modified terms.`,
  },
  {
    title: "2. User Accounts",
    body: `To use certain features of our Service, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account. We reserve the right to terminate accounts that violate our policies.`,
  },
  {
    title: "3. Job Seeker Responsibilities",
    body: `As a job seeker, you agree to provide accurate, current, and complete information in your profile and applications. You agree not to misrepresent your qualifications, experience, or identity. You understand that applying for a job through our platform does not guarantee employment, and we are not responsible for any hiring decisions made by recruiters or employers.`,
  },
  {
    title: "4. Recruiter Responsibilities",
    body: `As a recruiter or employer, you agree to post only legitimate job openings and not to use our platform for any fraudulent purpose. You agree to treat all applicants fairly and in accordance with applicable employment laws. You are solely responsible for your hiring decisions and all communications with job seekers.`,
  },
  {
    title: "5. Prohibited Activities",
    body: `You agree not to: (a) use the Service for any unlawful purpose; (b) post false, misleading, or deceptive content; (c) harass, abuse, or harm other users; (d) attempt to gain unauthorized access to our systems; (e) scrape or harvest data from our platform without permission; (f) use automated tools to interact with our Service without our prior written consent.`,
  },
  {
    title: "6. Intellectual Property",
    body: `The Service and its original content, features, and functionality are owned by Job Assured and are protected by international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without express written permission.`,
  },
  {
    title: "7. Assessments",
    body: `Our platform may offer skill assessments for job seekers. Assessment results are for informational purposes only and do not guarantee any particular job outcome. We reserve the right to modify or discontinue assessments at any time. Assessment scores should not be used as the sole criterion for employment decisions.`,
  },
  {
    title: "8. Limitation of Liability",
    body: `To the maximum extent permitted by law, Job Assured shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service. Our total liability to you for any claim shall not exceed the amount paid by you, if any, for accessing the Service.`,
  },
  {
    title: "9. Governing Law",
    body: `These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Job Assured operates, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in that jurisdiction.`,
  },
  {
    title: "10. Contact Us",
    body: `If you have any questions about these Terms and Conditions, please contact us at: legal@jobassured.com or visit our Contact Us page for more ways to reach us.`,
  },
];

function Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-gray-500 text-base">
            Last Updated: January 1, 2025
          </p>
          <p className="text-gray-600 mt-4 text-lg leading-relaxed max-w-2xl mx-auto">
            Please read these Terms and Conditions carefully before using the
            Job Assured platform. These terms govern your access to and use of
            our services.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                {section.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-base">
                {section.body}
              </p>
              <hr className="mt-8 border-gray-100" />
            </div>
          ))}
        </div>
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
