import React, { ReactElement } from "react";
import { DashboardLayout } from "@/components";
import { getDehydratedStateForCommonDetails } from "@/services";
import { GetServerSidePropsContext } from "next";
import Footer from "@/components/HomePage/footer";

function Page() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-10 md:p-12 text-slate-700 leading-relaxed">
        {/* Header Section */}
        <div className="border-b border-slate-100 pb-8 mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 mb-4">
            Legal &amp; Privacy
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Last Updated: <span className="text-slate-700">July 2026</span> • Effective Date: <span className="text-slate-700">Immediate</span>
          </p>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            At <strong>Job Assured</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we respect your privacy and are committed to protecting the personal data you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our assessment platform, apply for job openings, or interact with recruiters.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block"></span>
              1. Information We Collect
            </h2>
            <p className="text-slate-600 mb-3">
              We collect information that identifies, relates to, describes, or is reasonably capable of being associated with you. This includes:
            </p>
            <ul className="list-disc list-outside ml-6 space-y-2 text-slate-600">
              <li>
                <strong>Personal Identification Information:</strong> Full name, email address, phone number (verified via DLT-compliant SMS services such as MSG91), postal address, and profile photographs.
              </li>
              <li>
                <strong>Professional &amp; Career Data:</strong> Resumes/CVs, educational qualifications, employment history, skills, portfolio links, and salary expectations.
              </li>
              <li>
                <strong>Assessment &amp; Performance Data:</strong> Aptitude test scores, numerical reasoning results, verbal/logical evaluation reports, and interview preparation analytics generated on our platform.
              </li>
              <li>
                <strong>Financial &amp; Transactional Data:</strong> When you purchase paid assessments or subscription plans, payments are securely processed via authorized gateways (e.g., Razorpay). We do not store complete credit/debit card numbers on our servers.
              </li>
              <li>
                <strong>Technical &amp; Usage Information:</strong> IP address, browser type, device identifiers, operating system, and platform navigation logs collected via cookies and automated technologies.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block"></span>
              2. How We Use Your Information
            </h2>
            <p className="text-slate-600 mb-3">
              We use the collected information for the following legitimate business purposes:
            </p>
            <ul className="list-disc list-outside ml-6 space-y-2 text-slate-600">
              <li>
                <strong>Job Matching &amp; Recruiter Connect:</strong> To match your profile, skills, and assessment scores with relevant job vacancies and allow registered recruiters to discover and contact you.
              </li>
              <li>
                <strong>Platform Delivery &amp; Assessment Scoring:</strong> To administer practice, resume-based, and actual aptitude tests, evaluate submissions, and generate diagnostic performance reports.
              </li>
              <li>
                <strong>Account Administration &amp; Security:</strong> To authenticate your identity via OTP, maintain session security, prevent fraudulent activities, and ensure DLT regulatory compliance.
              </li>
              <li>
                <strong>Communication &amp; Notifications:</strong> To send job alerts, application status updates, interview schedules, payment receipts, and platform announcements.
              </li>
              <li>
                <strong>Platform Optimization:</strong> To analyze user behavior, improve our recommendation algorithms, and enhance user interface responsiveness.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block"></span>
              3. Information Sharing &amp; Disclosure
            </h2>
            <p className="text-slate-600 mb-3">
              We respect the confidentiality of your career data and disclose it only under strict conditions:
            </p>
            <ul className="list-disc list-outside ml-6 space-y-2 text-slate-600">
              <li>
                <strong>With Prospective Employers &amp; Recruiters:</strong> When you apply for a job or opt into our searchable candidate database, verified recruiters receive access to your profile, resume, and assessment reports.
              </li>
              <li>
                <strong>With Third-Party Service Providers:</strong> We collaborate with trusted partners for SMS/OTP verification (MSG91), payment processing (Razorpay), cloud hosting, and analytics. These entities are contractually bound to safeguard your data.
              </li>
              <li>
                <strong>Legal Compliance &amp; Protection:</strong> We may disclose information if required by law, regulation, judicial order, or to protect the safety, rights, and property of Job Assured, our users, or the public.
              </li>
              <li>
                <strong>Business Transfers:</strong> In the event of a merger, acquisition, or corporate restructuring, user data may be transferred as part of business assets under continued privacy protection.
              </li>
            </ul>
            <p className="mt-3 text-slate-600 font-medium">
              <em>Note: We do NOT sell, rent, or trade your personal information to third-party marketing companies.</em>
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block"></span>
              4. Data Security &amp; Retention
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We implement robust administrative, technical, and physical security measures—including SSL encryption, secure token-based authentication, and restricted database access—to protect your personal information against unauthorized access, alteration, or destruction. We retain your profile data and assessment scores for as long as your account is active or as needed to provide you career services, comply with legal obligations, and resolve disputes.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block"></span>
              5. Your Privacy Rights &amp; Controls
            </h2>
            <p className="text-slate-600 mb-3">
              You maintain full control over your personal data on Job Assured. You have the right to:
            </p>
            <ul className="list-disc list-outside ml-6 space-y-2 text-slate-600">
              <li>
                <strong>Access &amp; Update:</strong> Review, edit, or update your resume, contact details, and career preferences at any time via your dashboard profile settings.
              </li>
              <li>
                <strong>Manage Visibility:</strong> Toggle your profile visibility between public (searchable by recruiters) and private.
              </li>
              <li>
                <strong>Account Deletion:</strong> Request the permanent deletion of your account and associated personal data by contacting our support team or initiating deletion from account settings.
              </li>
              <li>
                <strong>Opt-Out:</strong> Unsubscribe from non-essential promotional emails or SMS notifications while continuing to receive critical transactional alerts.
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block"></span>
              6. Cookies &amp; Tracking Technologies
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Our platform uses essential session cookies and local storage to maintain user login states, remember your preferences, and ensure seamless navigation during timed aptitude assessments. We also utilize aggregated, anonymized analytical tools to measure website traffic and improve platform performance. You can modify your browser settings to decline cookies, though this may impact certain interactive features of our assessment interface.
            </p>
          </section>

          {/* Section 7 */}
          {/* <section className="bg-slate-50 rounded-xl p-6 border border-slate-200/60 mt-8">
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              7. Contact Us About Privacy
            </h2>
            <p className="text-slate-600 text-sm mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or how your data is handled, please reach out to our Grievance Officer:
            </p>
            <div className="text-sm space-y-1 text-slate-700 font-medium">
              <p><strong>Email:</strong> <a href="mailto:privacy@jobassured.com" className="text-indigo-600 hover:underline">privacy@jobassured.com</a> / <a href="mailto:support@jobassured.com" className="text-indigo-600 hover:underline">support@jobassured.com</a></p>
              <p><strong>Platform:</strong> Job Assured Portal Support</p>
              <p><strong>Hours:</strong> Monday to Saturday, 9:00 AM – 6:00 PM IST</p>
            </div>
          </section> */}
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
