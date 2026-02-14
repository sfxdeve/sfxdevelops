export interface PortfolioContact {
  email: string;
  phone: string;
  linkedIn: string;
  github: string;
}

export interface PortfolioProfile {
  name: string;
  title: string;
  location: string;
  summary: string[];
  relocationNote: string;
  contact: PortfolioContact;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  achievements: string[];
}

export interface SkillCategory {
  name: string;
  items: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  expected: string;
  gpa: string;
}

export interface LanguageItem {
  name: string;
  level: string;
}
