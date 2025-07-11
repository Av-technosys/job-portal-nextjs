import { CommonObjectType } from "./common";

export type Job = {
  company_name?: string;
  title?: string;
  description?: string;
  salary_range?: string;
  job_type?: string;
  status?: "active" | "expired";
  location?: string;
  experience?: string;
  is_applied?: boolean;
  created_at?: string;
  days_remaining?: number;
  job_id?: number;
  applicants_count?: number;
  education?: string;
  job_level?: string;
  // existing job properties
  social_links?: {
    id: number;
    name: string;
    url: string;
    platform: string;
  }[];
};

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
}

export interface SocialLinksCardProps {
  job: Job;
}

export interface JobOverviewCardProps {
  job: CommonObjectType;
}

export interface SalaryLocationCardProps {
  job: Job;
}
