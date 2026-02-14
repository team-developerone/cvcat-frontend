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
  projects?: Project[];
  certifications?: Certification[];
  languages?: Language[];
  references?: Reference[];
  publications?: Publication[];
  customSections?: CustomSection[];
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
  duration?: string;
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

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  url?: string;
  startDate?: string;
  endDate?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  url?: string;
  description?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Elementary' | 'Limited Working' | 'Professional Working' | 'Full Professional' | 'Native/Bilingual';
}

export interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
  email?: string;
  phone?: string;
  relationship: string;
}

export interface Publication {
  id: string;
  title: string;
  publisher: string;
  date: string;
  url?: string;
  description?: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
}

// --- Backend mapping utilities ---

import type { BackendCV } from "@/services/api";

export function backendCVToFrontendCV(bcv: BackendCV): CV {
  const basics = bcv.data?.basics || {};
  const locationParts = [
    basics.location?.city,
    basics.location?.region,
    basics.location?.countryCode,
  ].filter(Boolean);

  return {
    id: bcv._id,
    title: bcv.title || basics.name || "Untitled CV",
    description: bcv.description || bcv.generatedSummary,
    lastUpdated: new Date(bcv.updatedAt),
    forJob: undefined,
    isTailored: bcv.cvType === "tailored",
    personalInfo: {
      fullName: basics.name || "",
      title: basics.label || "",
      email: basics.email || "",
      phone: basics.phone || "",
      location: locationParts.join(", ") || basics.location?.address || "",
      summary: basics.summary || bcv.data?.summary || "",
    },
    experience: (bcv.data?.work || []).map((w, i) => ({
      id: `work-${i}`,
      company: w.name || "",
      position: w.position || "",
      startDate: w.startDate || "",
      endDate: w.endDate || "",
      description: w.summary || (w.highlights || []).join("\n"),
    })),
    education: (bcv.data?.education || []).map((e, i) => ({
      id: `edu-${i}`,
      institution: e.institution || "",
      degree: [e.studyType, e.area].filter(Boolean).join(" in "),
      period: [e.startDate, e.endDate].filter(Boolean).join(" - "),
      description: e.score ? `GPA: ${e.score}` : undefined,
    })),
    skills: (bcv.data?.skills || []).flatMap((s) => {
      const items: string[] = [];
      if (s.name) items.push(s.name);
      if (s.keywords) items.push(...s.keywords);
      return items;
    }),
    certifications: (bcv.data?.certificates || []).map((c, i) => ({
      id: `cert-${i}`,
      name: c.name || "",
      issuer: c.issuer || "",
      date: c.date || "",
      url: c.url,
    })),
    languages: (bcv.data?.languages || []).map((l, i) => ({
      id: `lang-${i}`,
      name: l.language || "",
      proficiency: (l.fluency as Language["proficiency"]) || "Professional Working",
    })),
    publications: (bcv.data?.publications || []).map((p, i) => ({
      id: `pub-${i}`,
      title: p.name || "",
      publisher: p.publisher || "",
      date: p.releaseDate || "",
      url: p.url,
      description: p.summary,
    })),
    references: (bcv.data?.references || []).map((r, i) => ({
      id: `ref-${i}`,
      name: r.name || "",
      position: "",
      company: "",
      relationship: r.reference || "",
    })),
    projects: [],
    customSections: [],
  };
}

export function frontendCVToBackendData(cv: CV): BackendCV["data"] {
  return {
    basics: {
      name: cv.personalInfo.fullName,
      label: cv.personalInfo.title,
      email: cv.personalInfo.email,
      phone: cv.personalInfo.phone,
      summary: cv.personalInfo.summary,
      location: {
        address: cv.personalInfo.location,
      },
    },
    work: cv.experience.map((e) => ({
      name: e.company,
      position: e.position,
      startDate: e.startDate,
      endDate: e.endDate,
      summary: e.description,
    })),
    education: cv.education.map((e) => ({
      institution: e.institution,
      studyType: e.degree,
      area: "",
      startDate: e.period.split(" - ")[0] || "",
      endDate: e.period.split(" - ")[1] || "",
    })),
    skills: cv.skills.map((s) => ({
      name: s,
    })),
    certificates: (cv.certifications || []).map((c) => ({
      name: c.name,
      issuer: c.issuer,
      date: c.date,
      url: c.url,
    })),
    languages: (cv.languages || []).map((l) => ({
      language: l.name,
      fluency: l.proficiency,
    })),
    publications: (cv.publications || []).map((p) => ({
      name: p.title,
      publisher: p.publisher,
      releaseDate: p.date,
      url: p.url,
      summary: p.description,
    })),
    references: (cv.references || []).map((r) => ({
      name: r.name,
      reference: r.relationship,
    })),
  };
}
