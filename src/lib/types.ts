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
  skills: SkillGroup[];
  projects?: Project[];
  certifications?: Certification[];
  languages?: Language[];
  references?: Reference[];
  publications?: Publication[];
  volunteer?: Volunteer[];
  awards?: Award[];
  interests?: Interest[];
  customSections?: CustomSection[];
}

export interface SocialProfile {
  id: string;
  network: string;
  username: string;
  url: string;
}

export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  url?: string;
  profiles?: SocialProfile[];
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights?: string[];
  location?: string;
  url?: string;
}

export interface Education {
  id: string;
  institution: string;
  studyType: string;
  area: string;
  startDate: string;
  endDate: string;
  score?: string;
  url?: string;
  courses?: string[];
  description?: string;
}

export interface SkillGroup {
  id: string;
  name: string;
  level?: string;
  keywords: string[];
}

export interface Volunteer {
  id: string;
  organization: string;
  position: string;
  url?: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights?: string[];
}

export interface Award {
  id: string;
  title: string;
  date: string;
  awarder: string;
  summary?: string;
}

export interface Interest {
  id: string;
  name: string;
  keywords: string[];
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
  highlights?: string[];
  roles?: string[];
  entity?: string;
  type?: string;
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
      url: basics.url || undefined,
      profiles: (basics.profiles || []).map((p, i) => ({
        id: `profile-${i}`,
        network: p.network || "",
        username: p.username || "",
        url: p.url || "",
      })),
    },
    experience: (bcv.data?.work || []).map((w, i) => ({
      id: `work-${i}`,
      company: w.name || "",
      position: w.position || "",
      startDate: w.startDate || "",
      endDate: w.endDate || "",
      description: w.summary || "",
      highlights: w.highlights || [],
      location: w.location || undefined,
      url: w.url || undefined,
    })),
    education: (bcv.data?.education || []).map((e, i) => ({
      id: `edu-${i}`,
      institution: e.institution || "",
      studyType: e.studyType || "",
      area: e.area || "",
      startDate: e.startDate || "",
      endDate: e.endDate || "",
      score: e.score || undefined,
      url: e.url || undefined,
      courses: e.courses || [],
      description: undefined,
    })),
    skills: (bcv.data?.skills || []).map((s, i) => ({
      id: `skill-${i}`,
      name: s.name || "",
      level: s.level || undefined,
      keywords: s.keywords || [],
    })),
    projects: (bcv.data?.projects || []).map((p, i) => ({
      id: `proj-${i}`,
      title: p.name || "",
      description: p.description || "",
      technologies: p.keywords || [],
      url: p.url,
      startDate: p.startDate,
      endDate: p.endDate,
      highlights: p.highlights || [],
      roles: p.roles || [],
      entity: p.entity || undefined,
      type: p.type || undefined,
    })),
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
    volunteer: (bcv.data?.volunteer || []).map((v, i) => ({
      id: `vol-${i}`,
      organization: v.organization || "",
      position: v.position || "",
      url: v.url || undefined,
      startDate: v.startDate || "",
      endDate: v.endDate || "",
      summary: v.summary || "",
      highlights: v.highlights || [],
    })),
    awards: (bcv.data?.awards || []).map((a, i) => ({
      id: `award-${i}`,
      title: a.title || "",
      date: a.date || "",
      awarder: a.awarder || "",
      summary: a.summary || undefined,
    })),
    interests: (bcv.data?.interests || []).map((int, i) => ({
      id: `interest-${i}`,
      name: int.name || "",
      keywords: int.keywords || [],
    })),
    customSections: (bcv.data?.custom || []).map((cs, i) => ({
      id: `custom-${i}`,
      title: cs.sectionTitle || "",
      items: (cs.items || []).map((item, j) => ({
        id: `custom-${i}-item-${j}`,
        title: item.title || "",
        subtitle: item.subtitle,
        date: item.date,
        description: item.description,
      })),
    })),
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
      url: cv.personalInfo.url || undefined,
      location: {
        address: cv.personalInfo.location,
      },
      profiles: (cv.personalInfo.profiles || []).map((p) => ({
        network: p.network,
        username: p.username,
        url: p.url,
      })),
    },
    work: cv.experience.map((e) => ({
      name: e.company,
      position: e.position,
      startDate: e.startDate,
      endDate: e.endDate,
      summary: e.description,
      highlights: e.highlights || [],
      location: e.location || undefined,
      url: e.url || undefined,
    })),
    education: cv.education.map((e) => ({
      institution: e.institution,
      studyType: e.studyType,
      area: e.area,
      startDate: e.startDate,
      endDate: e.endDate,
      score: e.score || undefined,
      url: e.url || undefined,
      courses: e.courses || [],
    })),
    skills: cv.skills.map((s) => ({
      name: s.name,
      level: s.level || undefined,
      keywords: s.keywords,
    })),
    projects: (cv.projects || []).map((p) => ({
      name: p.title,
      description: p.description,
      keywords: p.technologies,
      url: p.url,
      startDate: p.startDate,
      endDate: p.endDate,
      highlights: p.highlights || [],
      roles: p.roles || [],
      entity: p.entity || undefined,
      type: p.type || undefined,
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
    volunteer: (cv.volunteer || []).map((v) => ({
      organization: v.organization,
      position: v.position,
      url: v.url || undefined,
      startDate: v.startDate,
      endDate: v.endDate,
      summary: v.summary,
      highlights: v.highlights || [],
    })),
    awards: (cv.awards || []).map((a) => ({
      title: a.title,
      date: a.date,
      awarder: a.awarder,
      summary: a.summary || undefined,
    })),
    interests: (cv.interests || []).map((int) => ({
      name: int.name,
      keywords: int.keywords,
    })),
    custom: (cv.customSections || []).map((cs) => ({
      sectionTitle: cs.title,
      items: cs.items.map((item) => ({
        title: item.title,
        subtitle: item.subtitle,
        date: item.date,
        description: item.description,
      })),
    })),
  };
}
