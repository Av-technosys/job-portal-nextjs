import { CommonObjectType, TypographyVariantEnum } from "@/types";
import { Avatar } from "../common";
import { FIND_RECRUITER_PAGE_CONFIG } from "@/constants";
import { getInitials } from "@/helper";
import {
  FmdGoodOutlinedIcon,
  BusinessCenterOutlinedIcon,
  ArrowForwardOutlinedIcon,
} from "@/assets";
import { useMemo } from "react";

export default function FindRecruiterCard({
  recruiter,
  openRecruiterApplicationPopup,
}: {
  recruiter: CommonObjectType;
  openRecruiterApplicationPopup: VoidFunction;
}) {
  const { RECRUITER_CARD } = FIND_RECRUITER_PAGE_CONFIG;
  const {
    ADDRESS,
    IMAGE,
  } = RECRUITER_CARD;

  const recruiterDetails = useMemo(() => {
    const details = [
      {
        icon: (
          <FmdGoodOutlinedIcon
            sx={{ color: "#667085", fontSize: "18px" }}
          />
        ),
        textProps: ADDRESS(recruiter),
      },
    ];

    if (recruiter?.organization_type || recruiter?.industry_type) {
      details.push({
        icon: (
          <BusinessCenterOutlinedIcon
            sx={{ color: "#667085", fontSize: "18px" }}
          />
        ),
        textProps: {
          typographyProps: {
            children: String(recruiter.organization_type || recruiter.industry_type),
            variant: TypographyVariantEnum.BODY2,
          },
          fontSize: "13px",
        },
      } as any);
    }

    if (recruiter?.company_size) {
      details.push({
        icon: (
          <AccessTimeOutlinedIcon
            sx={{ color: "#667085", fontSize: "18px" }}
          />
        ),
        textProps: {
          typographyProps: {
            children: `${recruiter.company_size}+ Employees`,
            variant: TypographyVariantEnum.BODY2,
          },
          fontSize: "13px",
        },
      } as any);
    }

    return details;
  }, [ADDRESS, recruiter]);

  return (
    <div
      onClick={openRecruiterApplicationPopup}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openRecruiterApplicationPopup();
        }
      }}
      className="group cursor-pointer rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_2px_4px_-1px_rgba(0,0,0,0.02)] hover:-translate-y-1.5 hover:border-[#818CF8] hover:shadow-[0_20px_25px_-5px_rgba(79,70,229,0.1),0_10px_10px_-5px_rgba(79,70,229,0.04)] transition-all duration-300 relative overflow-hidden flex flex-col h-full capitalize"
    >
      {/* Top gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#10B981]" />

      <div className="flex flex-col gap-5 p-8 flex-1 pt-9">
        {/* Avatar + Company Name */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl shrink-0 shadow-sm border border-slate-100 overflow-hidden flex items-center justify-center bg-slate-50">
            <Avatar {...IMAGE(recruiter).avatarProps}>
              {getInitials({
                name: String(recruiter?.first_name || recruiter?.industry_type || ""),
              })}
            </Avatar>
          </div>
          <div className="flex flex-col gap-0.5">
            {/* Company name — no truncation */}
            <div className="font-bold text-slate-900 text-lg leading-snug group-hover:text-[#4F46E5] transition-colors break-words">
              {String(recruiter?.first_name || "Recruiter")}
            </div>
            {/* Industry type as subtle sub-line */}
            {(recruiter?.organization_type || recruiter?.industry_type) && (
              <div className="text-slate-500 text-xs font-medium">
                {String(recruiter?.organization_type || recruiter?.industry_type)}
              </div>
            )}
          </div>
        </div>

        {/* Meta: location + company size */}
        <div className="flex flex-col gap-2.5 text-slate-500 text-sm font-medium mt-auto">
          {ADDRESS(recruiter)?.typographyProps?.children && (
            <div className="flex items-center gap-2">
              <FmdGoodOutlinedIcon sx={{ color: "#667085", fontSize: "16px", flexShrink: 0 }} />
              <span>{String(ADDRESS(recruiter)?.typographyProps?.children)}</span>
            </div>
          )}
          {recruiter?.company_size && (
            <div className="flex items-center gap-2">
              <BusinessCenterOutlinedIcon sx={{ color: "#667085", fontSize: "16px", flexShrink: 0 }} />
              <span>{recruiter.company_size}+ Employees</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-5 pb-4 pt-3 border-t border-[#EEF2F6] flex items-center justify-between">
        <span className="text-xs font-semibold text-[#4F46E5]">View Profile</span>
        <div className="shadow-sm flex items-center justify-center w-8 h-8 shrink-0 rounded-full text-[#4F46E5] bg-[#EEF2FF] border border-[#E0E7FF] transition-all duration-300 group-hover:bg-[#4F46E5] group-hover:text-white group-hover:translate-x-1">
          <ArrowForwardOutlinedIcon sx={{ fontSize: 17 }} />
        </div>
      </div>
    </div>
  );
}
