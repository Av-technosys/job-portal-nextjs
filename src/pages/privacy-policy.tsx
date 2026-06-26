import React, { ReactElement } from "react";
import { DashboardLayout } from "@/components";
import { getDehydratedStateForCommonDetails } from "@/services";
import { GetServerSidePropsContext } from "next";
import Footer from "@/components/HomePage/footer";

const sections = [
  {
    title: "1. Information We Collect",
    body: `We collect information you provide directly to us when you create an account, update your profile, apply for jobs, or contact us. This includes your name, email address, phone number, resume, and any other information you choose to provide. We may also collect information automatically when you use our services, such as log data, device information, and cookies.`,
  },
  {
    title: "2. How We Use Your Information",
    body: `We use the information we collect to provide, maintain, and improve our services; to process job applications and connect job seekers with recruiters; to send you technical notices, updates, and support messages; to respond to your comments and questions; and to monitor and analyze trends and usage of our platform.`,
  },
  {
    title: "3. Sharing of Information",
    body: `We may share your personal information with recruiters and employers when you apply for a job or express interest in a position. We do not sell your personal data to third parties. We may share your information with service providers who assist in our operations, subject to confidentiality agreements, or when required by law.`,
  },
  {
    title: "4. Data Retention",
    body: `We retain your information for as long as your account is active or as needed to provide you with our services. You may request deletion of your account and data at any time by contacting us. Note that some information may be retained for legal obligations or legitimate business purposes.`,
  },
  {
    title: "5. Security",
    body: `We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access. However, no internet-based service can be 100% secure, and we cannot guarantee the absolute security of your information.`,
  },
  {
    title: "6. Your Rights",
    body: `You have the right to access, update, or delete the personal information we hold about you. You may also opt out of receiving promotional communications from us. To exercise these rights, please contact us using the information below.`,
  },
  {
    title: "7. Cookies",
    body: `We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. If you do not accept cookies, some parts of our service may not function properly.`,
  },
  {
    title: "8. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page and updating the effective date. Your continued use of our services after such changes constitutes your acceptance of the updated policy.`,
  },
  {
    title: "9. Contact Us",
    body: `If you have any questions about this Privacy Policy, please contact us at: privacy@jobassured.com or visit our Contact Us page.`,
  },
];

function Page() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-base">
            Effective Date: January 1, 2025
          </p>
          <p className="text-gray-600 mt-4 text-lg leading-relaxed max-w-2xl mx-auto">
            Your privacy is important to us. This Privacy Policy explains how
            Job Assured collects, uses, and protects your personal information
            when you use our platform.
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
