import {
  CONTACT_FORM_CONFIG,
  LEFT_SECTION_CONFIG,
} from "@/constants/contactUs";
import { Formik, Loader } from "../common";
import { useState } from "react";
import { contactUsFormSchema } from "@/validator/contactUs";
import { useCreateContactUsInfo } from "@/services/useCreateContactUs";
import { useNotification } from "@/services";
import { getErrorMessageFromAPI } from "@/helper";

export interface contactFormData {
  phone_number: string;
  email: string;
  first_name: string;
  last_name: string;
  message: string;
  subject: string;
}

function ContactUs() {
  const { NOTIFICATION_CONFIG } = CONTACT_FORM_CONFIG;
  const { showNotification } = useNotification();
  const [formKey, setFormKey] = useState(0);

  const {
    FIRST_NAME_FIELD,
    LAST_NAME_FIELD,
    EMAIL_FIELD,
    CONTACT_NUMBER_FIELD,
    SUBJECT_FIELD,
    MESSAGE_FIELD,
    SEND_BUTTON,
  } = CONTACT_FORM_CONFIG.FORM_CONFIG;

  const { LOCATION, EMAIL, CONTACT } = LEFT_SECTION_CONFIG;

  const CreateContactUsInfoMutate = useCreateContactUsInfo({
    mutationConfig: {
      onSuccess: () => {
        showNotification(NOTIFICATION_CONFIG.SUCCESS);
        setFormKey((k) => k + 1);
      },
      onError: (error) => {
        showNotification({ ...getErrorMessageFromAPI(error) });
        console.error(error);
      },
    },
  });

  function handleFormSuccess(values: any) {
    const payload = { ...values.values } as contactFormData;

    let phone = payload.phone_number?.trim() || "";
    if (phone && !phone.startsWith("+")) {
      if (phone.startsWith("91") && phone.length === 12) {
        phone = "+" + phone;
      } else {
        phone = "+91" + phone;
      }
    }
    payload.phone_number = phone;

    CreateContactUsInfoMutate.mutate({ data: payload });
  }

  const contactItems = [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 13 19.79 19.79 0 0 1 1 4.18 2 2 0 0 1 2.96 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
        </svg>
      ),
      label: "Phone",
      value: String(CONTACT?.typographyProps?.children ?? "+91 234-567-8901"),
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: "Email",
      value: String(EMAIL?.typographyProps?.children ?? "info@jobportal.com"),
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: "Address",
      value: String(LOCATION?.typographyProps?.children ?? "Jaipur, Rajasthan, India "),
    },
  ];

  return (
    <div
      className="min-h-screen py-16 px-4 bg-white"
    >
      <Loader loaderProps={{ open: CreateContactUsInfoMutate.isPending }} />
      <div className="max-w-[22rem] md:max-w-[45rem] lg:max-w-5xl mx-auto">

        {/* Page header */}
        <div className="text-center mb-12">
          {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-semibold tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            Get In Touch
          </div> */}
          <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight mb-3">
            Contact <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600">Us</span>
          </h1>
          <p className="text-slate-500 text-base max-w-md mx-auto leading-relaxed">
            Any question or remarks? Just write us a message and we&apos;ll get back to you shortly.
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl overflow-hidden shadow-xl shadow-indigo-100/40 flex flex-col md:flex-row"
          style={{ border: "1px solid rgba(203,213,225,0.6)" }}
        >
          {/* Left — dark info panel */}
          <div
            className="md:w-[38%] p-8 flex flex-col justify-between gap-10"
            style={{
              background: "linear-gradient(160deg, #1e1b4b 0%, #1e3a5f 50%, #0e1324 100%)",
            }}
          >
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-white text-xl font-bold mb-2">Contact Information</h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Say something to start a live chat! We&apos;re happy to help you anytime.
                </p>
              </div>

              <div className="flex flex-col gap-5 mt-2">
                {contactItems.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-indigo-300"
                      style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)" }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-indigo-300 text-xs font-semibold tracking-wider uppercase mb-0.5">{item.label}</p>
                      <p className="text-slate-200 text-sm leading-snug">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {[
                { label: "Twitter", d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" },
                { label: "LinkedIn", d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" },
                { label: "Instagram", d: "" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    {s.label === "Instagram" ? (
                      <>
                        <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
                        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                        <circle cx="17.5" cy="6.5" r="1" />
                      </>
                    ) : (
                      <path d={s.d} />
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Right — form panel */}
          <div className="flex-1 bg-white p-8 md:p-10">
            <Formik
              key={formKey}
              initialValues={{
                first_name: "",
                last_name: "",
                email: "",
                phone_number: "",
                subject: "",
                message: "",
              }}
              onSuccess={handleFormSuccess}
              validationSchema={contactUsFormSchema}
              fieldDetailsArray={[
                FIRST_NAME_FIELD,
                LAST_NAME_FIELD,
                EMAIL_FIELD,
                CONTACT_NUMBER_FIELD,
                SUBJECT_FIELD,
                MESSAGE_FIELD,
              ]}
              formFooterArray={[SEND_BUTTON]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
