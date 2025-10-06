import React from "react";
import { Stack, Typography } from "../common";
import { RECRUITER_APPLICATION_PAGE_CONFIG } from "@/constants";
import SocialLinksCard from "../SocialLinksCard";
import { CommonObjectType } from "@/types";
import { useGetRecruiterFoundingById } from "@/services";

export default function RecruiterOverview({
  recruiterId,
}: {
  recruiterId?: string | number | boolean;
}) {
  const {
    PROFESSIONAL_OVERVIEW_TEXT,
    PROFESSIONAL_OVERVIEW,
    CARRER_TEXT,
    CARRER_EXPERIENCE,
    SKILLS_TEXT,
    SKILLS,
  } = RECRUITER_APPLICATION_PAGE_CONFIG;

  const RecruiterFoundingById = useGetRecruiterFoundingById({
    queryParams: {
      UserId: recruiterId,
    },
  });
  const recruiter = RecruiterFoundingById?.data?.data || {};
  return (
    <Stack
      stackProps={{
        width: { xs: "100%", md: "50%" },
        gap: 2,
      }}
    >
      <Typography {...PROFESSIONAL_OVERVIEW_TEXT} />
      <Typography {...PROFESSIONAL_OVERVIEW(recruiter)} />
      <Typography {...CARRER_TEXT} />
      <Typography {...CARRER_EXPERIENCE(recruiter)} />
      <Typography {...SKILLS_TEXT} />
      <Typography {...SKILLS(recruiter)} />
      <SocialLinksCard recruiterId={recruiterId} />
    </Stack>
  );
}
