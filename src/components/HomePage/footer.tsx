import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { JA_LOGO_white } from "@/assets";
import { NextImage } from "@/components/common";
import {
  FOOTER_QUICK_LINKS_MENU,
  JOB_SEEKER_MENU,
  RECRUITER_MENU,
  SUPPORT_MENU,
} from "@/constants";

const Footer: React.FC = () => {
  const router = useRouter();

  const { HOME_TEXT, ABOUT_US_TEXT } = FOOTER_QUICK_LINKS_MENU;
  const { JOBSEERKER_DASHBOARD_TEXT, SAVED_JOBS_TEXT } = JOB_SEEKER_MENU;
  const { POST_JOB_TEXT, RECUITER_DASHBOARD_TEXT, APPLICATION_TEXT } = RECRUITER_MENU;
  const { CONTACT_US_TEXT, PRIVACY_POLICY_TEXT, TERMS_CONDITION_TEXT } = SUPPORT_MENU;

  const navCols = [
    {
      heading: "Quick Links",
      links: [
        { label: HOME_TEXT?.typographyProps?.children ?? "Home", href: "/" },
        { label: ABOUT_US_TEXT?.typographyProps?.children ?? "About Us", href: "/about-us" },
      ],
    },
    {
      heading: "Job Seekers",
      links: [
        { label: JOBSEERKER_DASHBOARD_TEXT?.typographyProps?.children ?? "Dashboard", href: "/dashboard" },
        { label: SAVED_JOBS_TEXT?.typographyProps?.children ?? "Saved Jobs", href: "/dashboard/saved-job" },
      ],
    },
    {
      heading: "Recruiters",
      links: [
        { label: POST_JOB_TEXT?.typographyProps?.children ?? "Post a Job", href: "/dashboard/create-job" },
        { label: RECUITER_DASHBOARD_TEXT?.typographyProps?.children ?? "Dashboard", href: "/dashboard" },
        { label: APPLICATION_TEXT?.typographyProps?.children ?? "Applications", href: "/dashboard/my-posted-jobs" },
      ],
    },
    {
      heading: "Support",
      links: [
        { label: CONTACT_US_TEXT?.typographyProps?.children ?? "Contact Us", href: "/contact-us" },
        { label: PRIVACY_POLICY_TEXT?.typographyProps?.children ?? "Privacy Policy", href: "/privacy-policy" },
        { label: TERMS_CONDITION_TEXT?.typographyProps?.children ?? "Terms & Conditions", href: "/terms-and-conditions" },
      ],
    },
  ];

  const socialLinks = [
    {
      label: "Facebook",
      href: "#",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      label: "Twitter",
      href: "#",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "#",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "#",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #0a0f1e 0%, #0e1324 60%, #080c18 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >


      {/* Subtle grid pattern overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(99,102,241,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }}
      />

      {/* Glow blob */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          background: "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="max-w-[22rem] md:max-w-[45rem] lg:max-w-6xl mx-auto px-4 sm:px-6"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Main grid */}
        <div className="pt-10 pb-6 grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-2 flex flex-col gap-5">
            <div className="-mt-2">
              <NextImage
                props={{
                  alt: "ja_logo",
                  src: JA_LOGO_white,
                  width: 160,
                  height: 50,
                  onClick: () => router.push("/"),
                  style: { cursor: "pointer", objectFit: "contain" },
                }}
              />
            </div>
            <p className="text-slate-400 text-sm leading-7 max-w-xs">
              Your gateway to verified career opportunities. Connect with top companies, showcase your skills, and accelerate your career growth.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2 mt-1">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "linear-gradient(135deg, #6366f1, #3b82f6)";
                    (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,255,255,0.08)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {navCols.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <h3
                className="text-xs font-bold tracking-widest uppercase"
                style={{
                  background: "linear-gradient(90deg, #818cf8, #60a5fa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={String(link.label)}>
                    <button
                      onClick={() => router.push(link.href)}
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-150 text-left"
                    >
                      {String(link.label)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.08)" }} />

        {/* Copyright bar */}
        <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Job Portal. All rights reserved.
          </p>
          <div className="flex items-center gap-1">

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
