export interface CV {
  id: string;
  title: string;
  description?: string;
  lastUpdated: Date;
  forJob?: string;
  isTailored: boolean;
  personalInfo: PersonalInfo;
  experience: WorkExperience[];
  education: Education[];
  skills: string[];
}

export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  description?: string;
}

export interface PricingTier {
  name: string;
  price: string | number;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}
