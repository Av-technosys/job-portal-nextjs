import { CommonObjectType, TypographyVariantEnum } from "@/types";
import { Avatar, Button, Stack, TextWithIcon, Typography } from "../common";
import { FIND_RECRUITER_PAGE_CONFIG } from "@/constants";
import { getInitials } from "@/helper";
import {
  FmdGoodOutlinedIcon,
  BusinessCenterOutlinedIcon,
  AccessTimeOutlinedIcon,
  ArrowForwardOutlinedIcon,
} from "@/assets";
import { useMemo } from "react";
import { colorStyles } from "@/styles";

export default function FindRecruiterCard({
  recruiter,
  openRecruiterApplicationPopup,
}: {
  recruiter: CommonObjectType;
  openRecruiterApplicationPopup: VoidFunction;
}) {
  const { RECRUITER_CARD } = FIND_RECRUITER_PAGE_CONFIG;
  const {
    RECRUITER_NAME,
    ADDRESS,
    IMAGE,
    RECRUITER_DESIGNATION,
    VIEW_PROFILE_BUTTON,
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
      className="group cursor-pointer rounded-2xl p-6 bg-white border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_2px_4px_-1px_rgba(0,0,0,0.02)] hover:-translate-y-1.5 hover:border-[#818CF8] hover:shadow-[0_20px_25px_-5px_rgba(79,70,229,0.1),0_10px_10px_-5px_rgba(79,70,229,0.04)] transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full min-h-[300px] capitalize"
    >
      {/* 4px Top Gradient Bar matching LatestJobCard */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#10B981]"></div>

      <div className="flex flex-col gap-4">
        {/* Top Section: Title on Left, Badge on Right */}
        <div className="flex items-start justify-between gap-2">
          <div className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-[#4F46E5] transition-colors w-full text-left">
            <Typography {...RECRUITER_NAME(recruiter)} />
          </div>
          <div
            className="rounded-full px-3 py-1 font-medium shadow-sm text-xs shrink-0 max-w-[130px] truncate"
            style={{
              background: "#EEF2FF",
              border: "1px solid #C7D2FE",
              color: "#4338CA",
            }}
          >
            {String(recruiter?.organization_type || recruiter?.industry_type || "HR Agency")}
          </div>
        </div>

        {/* Middle Section: Attributes List */}
        <div className="flex flex-col gap-2.5 text-slate-600 text-xs font-medium my-2">
          {recruiterDetails.map((detail, index) => (
            <div
              key={`recruiterDetails-${index}`}
              className="flex items-center gap-2 truncate text-slate-600 font-normal text-xs text-left"
            >
              <span className="text-[#667085] flex shrink-0 items-center justify-center">
                {detail.icon}
              </span>
              <div className="truncate w-full flex items-center">
                <TextWithIcon
                  icon={<></>}
                  textProps={detail.textProps}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section matching LatestJobCard */}
      <div className="pt-4 mt-4 border-t border-[#EEF2F6] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-full shrink-0 shadow-xs border border-slate-100 overflow-hidden flex items-center justify-center bg-slate-50 [&>*]:!w-full [&>*]:!h-full">
            <Avatar {...IMAGE(recruiter).avatarProps}>
              {getInitials({
                name: String(
                  recruiter?.industry_type || recruiter?.first_name || ""
                ),
              })}
            </Avatar>
          </div>
          <div className="flex flex-col min-w-0 truncate text-left">
            <div className="font-medium text-slate-800 text-sm truncate">
              <Typography {...RECRUITER_DESIGNATION(recruiter)} />
            </div>
            <div className="text-slate-500 text-xs truncate">
              {String(recruiter?.industry_type || "Recruitment Firm")}
            </div>
          </div>
        </div>

        <div className="shadow-sm flex items-center justify-center w-9 h-9 shrink-0 rounded-full text-[#4F46E5] bg-[#EEF2FF] border border-[#E0E7FF] transition-all duration-300 group-hover:bg-[#4F46E5] group-hover:text-white group-hover:translate-x-1 group-hover:scale-108">
          <ArrowForwardOutlinedIcon sx={{ fontSize: 20 }} />
        </div>
      </div>
    </div>
  );
}
