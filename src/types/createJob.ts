import { dayjsInstance } from "@/types";

export type CreateOrUpdateJobPostInput = {
  title: string;  
  role: string;
  min_salary: number;
  max_salary: number;
  education: string;
  experience: number;
  job_type: string;
  city: string;
  state: string;
  country: string;  
  skills: string[];
  description: string;
  vacancies: number;
  job_level: string;
  date_of_birth: dayjsInstance;
  time_duration: boolean;
};

