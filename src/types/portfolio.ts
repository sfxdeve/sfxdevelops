export interface PortfolioContact {
  email: string;
  phone: string;
  linkedIn: string;
  github: string;
}

export interface PortfolioBrand {
  tagline: string;
  availability: string;
  focusAreas: string[];
}

export interface PortfolioProfile {
  name: string;
  title: string;
  location: string;
  summary: string[];
  relocationNote: string;
  contact: PortfolioContact;
  brand?: PortfolioBrand;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  achievements: string[];
}

export interface LabelValueItem {
  label: string;
  value: string;
}

export interface SimpleStepItem {
  step: string;
}

export interface SkillGroup {
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
