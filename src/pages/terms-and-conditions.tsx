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
            Legal &amp; Terms
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Last Updated: <span className="text-slate-700">July 2026</span> • Effective Date: <span className="text-slate-700">Immediate</span>
          </p>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Welcome to <strong>Job Assured</strong>! These Terms and Conditions (&quot;Terms,&quot; &quot;Agreement&quot;) govern your access to and use of our website, assessment modules, job application portals, and recruiter services. By accessing, registering an account, or using any service on Job Assured, you agree to be bound by these Terms.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block"></span>
              1. Acceptance of Terms &amp; Eligibility
            </h2>
            <p className="text-slate-600 leading-relaxed">
              By using our platform, you affirm that you are at least 18 years of age (or the legal age of majority in your jurisdiction) and possess the legal competence to enter into this Agreement. If you are registering on behalf of a corporate entity or recruitment agency, you represent and warrant that you have the authority to legally bind that entity to these Terms. If you do not agree to any part of these Terms, you must immediately terminate your use of our platform.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block"></span>
              2. User Accounts &amp; Registration Security
            </h2>
            <p className="text-slate-600 mb-3">
              To access personalized job recommendations, aptitude tests, and recruiter tools, you must create a verified account:
            </p>
            <ul className="list-disc list-outside ml-6 space-y-2 text-slate-600">
              <li>
                <strong>Account Verification:</strong> We utilize secure phone and email verification (via SMS providers such as MSG91). You agree to provide accurate, current, and complete contact details during registration.
              </li>
              <li>
                <strong>Account Responsibility:</strong> You are entirely responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.
              </li>
              <li>
                <strong>Prohibition of Multiple Accounts:</strong> Users are prohibited from creating duplicate, fraudulent, or impersonated accounts. We reserve the right to suspend or terminate accounts found to violate platform integrity.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block"></span>
              3. Platform Services &amp; Aptitude Assessments
            </h2>
            <p className="text-slate-600 mb-3">
              Job Assured provides candidate testing, resume evaluation, and employer matching services:
            </p>
            <ul className="list-disc list-outside ml-6 space-y-2 text-slate-600">
              <li>
                <strong>Assessment Integrity:</strong> Our platform offers practice tests, resume-based assessments, and formal paid aptitude tests (e.g., numerical, verbal, logical, and technical assessments). All tests must be taken independently without unfair assistance, automated scripts, or unauthorized collaboration.
              </li>
              <li>
                <strong>Score Validity &amp; Sharing:</strong> Assessment scores generated by our algorithms are used to showcase candidate competency to registered recruiters. We do not guarantee that achieving a specific score will result in a job interview or offer.
              </li>
              <li>
                <strong>Service Availability:</strong> While we strive for continuous platform availability, we reserve the right to modify, update, or temporarily suspend testing modules for maintenance or enhancement without prior notice.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block"></span>
              4. Payments, Subscriptions &amp; Refunds
            </h2>
            <p className="text-slate-600 mb-3">
              Certain premium features—including official assessment certifications, test retakes, and recruiter subscription packages—require payment of applicable fees:
            </p>
            <ul className="list-disc list-outside ml-6 space-y-2 text-slate-600">
              <li>
                <strong>Payment Processing:</strong> All transactions are processed securely through authorized third-party payment gateways (such as Razorpay). By initiating a transaction, you authorize us and our payment partners to charge the specified amount in Indian Rupees (INR) or applicable currency.
              </li>
              <li>
                <strong>Pricing &amp; Taxes:</strong> All fees displayed on the platform are subject to applicable government taxes (e.g., GST) unless explicitly stated otherwise. We reserve the right to revise fee structures with prospective effect.
              </li>
              <li>
                <strong>Refund Policy:</strong> Due to the digital and instant-access nature of our assessment tests and profile evaluations, all payments are generally final and non-refundable once an assessment session has been initiated or completed. Exceptions or technical refund requests (e.g., duplicate billing due to gateway errors) must be submitted to our support team within 7 business days of the transaction.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block"></span>
              5. User Conduct &amp; Prohibited Activities
            </h2>
            <p className="text-slate-600 mb-3">
              When using Job Assured, you strictly agree NOT to engage in any of the following prohibited behaviors:
            </p>
            <ul className="list-disc list-outside ml-6 space-y-2 text-slate-600">
              <li>
                <strong>Misrepresentation:</strong> Submitting fabricated resumes, false educational degrees, inaccurate employment history, or forged identification documents.
              </li>
              <li>
                <strong>Scraping &amp; Data Mining:</strong> Using robots, spiders, scrapers, or automated extraction tools to harvest recruiter profiles, job listings, or candidate databases without written consent.
              </li>
              <li>
                <strong>System Interference:</strong> Attempting to reverse-engineer, decompile, compromise, or disrupt the security, assessment timers, or routing infrastructure of our website.
              </li>
              <li>
                <strong>Harassment &amp; Unsolicited Spam:</strong> Sending abusive, defamatory, harassing, or unsolicited commercial messages to employers, job seekers, or our staff.
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block"></span>
              6. Intellectual Property Rights
            </h2>
            <p className="text-slate-600 leading-relaxed">
              All website graphics, logos, user interfaces, proprietary assessment question banks, scoring algorithms, software code, and content published on Job Assured remain the exclusive intellectual property of Job Assured and its licensors, protected by copyright and trademark laws. You are granted a limited, non-exclusive, non-transferable, revocable license to access the platform for your personal career development or authorized recruitment activities.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block"></span>
              7. Limitation of Liability &amp; Disclaimers
            </h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              Job Assured operates as an intermediary bridging job seekers and employers. While we rigorously vet listings and provide diagnostic testing tools:
            </p>
            <ul className="list-disc list-outside ml-6 space-y-2 text-slate-600">
              <li>
                <strong>No Hiring Guarantee:</strong> We do not warrant or guarantee that registering on our platform or passing an aptitude test will result in employment, interview callbacks, or specific career outcomes.
              </li>
              <li>
                <strong>&quot;As Is&quot; Service:</strong> Our services are provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, express or implied.
              </li>
              <li>
                <strong>Limitation of Damages:</strong> To the maximum extent permitted by law, Job Assured, its directors, employees, and partners shall not be liable for any indirect, incidental, consequential, special, or punitive damages (including loss of profits, data, or employment opportunities) arising from your use or inability to use the platform.
              </li>
            </ul>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block"></span>
              8. Modifications to Terms &amp; Termination
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We reserve the right to amend or update these Terms at any time. Notice of substantial changes will be posted on our website or sent via email/notification. Your continued use of the platform following any modifications constitutes your binding acceptance of the revised Agreement. We also reserve the right to suspend or terminate your account immediately without notice if you violate any provision of these Terms.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block"></span>
              9. Governing Law &amp; Dispute Resolution
            </h2>
            <p className="text-slate-600 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of India. Any legal dispute, controversy, or claim arising out of or relating to these Terms or your use of Job Assured shall be subject to the exclusive jurisdiction of the competent courts situated in New Delhi / NCR, India.
            </p>
          </section>

          {/* Section 10 */}
          {/* <section className="bg-slate-50 rounded-xl p-6 border border-slate-200/60 mt-8">
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              10. Contact Information &amp; Grievances
            </h2>
            <p className="text-slate-600 text-sm mb-4">
              If you have any questions, clarification requests, or formal notices regarding these Terms and Conditions, please contact us at:
            </p>
            <div className="text-sm space-y-1 text-slate-700 font-medium">
              <p><strong>Email:</strong> <a href="mailto:legal@jobassured.com" className="text-indigo-600 hover:underline">legal@jobassured.com</a> / <a href="mailto:support@jobassured.com" className="text-indigo-600 hover:underline">support@jobassured.com</a></p>
              <p><strong>Platform:</strong> Job Assured Legal &amp; Compliance Department</p>
              <p><strong>Support Hours:</strong> Monday to Saturday, 9:00 AM – 6:00 PM IST</p>
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
