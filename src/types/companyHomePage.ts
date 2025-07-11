interface CompanyData {
  companyName: string;
  location: string;
  jobRole: string;
  logo: string;
  backgroundImage: string;
  jobDetailLink: string;
}

export interface CompanyCardProps {
  isAuthenticated: boolean;
  openForceLoginPopup: VoidFunction;
  company: CompanyData;
}
