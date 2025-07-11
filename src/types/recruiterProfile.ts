export type CreateOrUpdateRecruiterProfileInput = {
  first_name: string;
  company_about_us: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  postal_code: number;
  country: string;
  recruiter_profile_id: number;
};

export type CreateOrUpdateRecruiterFoundingInfoInput = {
  organization_type: string;
  industry_type: string;
  company_size: number;
  company_website: string;
  mission: string;
  vision: string;
  recruiter_founding_info_id: number;
};

export type CreateOrUpdateRecruiterSocialLinksInput = {
  platform: string;
  url: string;
};
