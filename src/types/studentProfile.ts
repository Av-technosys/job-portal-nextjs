export type CreateOrUpdateStudentProfilePersonalInfoInput = {
  first_name: string;
  gender: number;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  postal_code: number;
  country: string;
  phone_number: number;
  date_of_birth: string;
  id: number;
  student_profile_id: number;
};

export type CreateOrUpdateStudentProfileGeneralInfoInput = {
  current_salary: number;
  expected_salary: number;
  job_search_status: number;
  notice_period: number;
  qualification_type: string;
  institution_name: string;
  qualification_status: string;
  score: number;
  start_date: string;
  end_date: string;
  aq_id: number;
  sy_id: number;
};

export type CreateOrUpdateStudentProfileAdditionalInfoInput = {
  work_experiences: {
    start_date: string;
    end_date: string;
    organization_name: string;
    designation: string;
    experience: number;
    salary: number;
  };
  certifications: {
    start_date: string;
    end_date: string;
    certification_name: string;
    institution_name: string;
  };
  projects: {
    start_date: string;
    end_date: string;
    project_name: string;
    project_organization_name: string;
  };
};

export type CreateOrUpdateStudentProfileSocialLinksInput = {
  platform: string;
  url: string;
};
