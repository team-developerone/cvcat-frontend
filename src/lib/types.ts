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
  highlights?: string[];
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
      description: w.summary || "",
      highlights: w.highlights || [],
    })),
    education: (bcv.data?.education || []).map((e, i) => ({
      id: `edu-${i}`,
      institution: e.institution || "",
      degree: [e.studyType, e.area].filter(Boolean).join(" in "),
      period: [e.startDate, e.endDate].filter(Boolean).join(" - "),
      description: e.score ? `GPA: ${e.score}` : undefined,
    })),
    skills: (bcv.data?.skills || []).flatMap((s) => {
      // If the skill group has keywords, use them (these are the actual skills).
      // Only use the group name as a skill if there are no keywords (single-skill entry).
      if (s.keywords && s.keywords.length > 0) {
        return s.keywords;
      }
      return s.name ? [s.name] : [];
    }),
    projects: (bcv.data?.projects || []).map((p, i) => ({
      id: `proj-${i}`,
      title: p.name || "",
      description: p.description || "",
      technologies: p.keywords || [],
      url: p.url,
      startDate: p.startDate,
      endDate: p.endDate,
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
  // Parse the combined degree string back into studyType and area
  // Format is "studyType in area" (e.g. "Bachelor's in Computer Science")
  const parseEducationDegree = (degree: string) => {
    const match = degree.match(/^(.+?)\s+in\s+(.+)$/);
    if (match) {
      return { studyType: match[1], area: match[2] };
    }
    return { studyType: degree, area: "" };
  };

  // Group skills into a single skill group with all skills as keywords
  // This preserves them as a flat list while using the JSON Resume structure
  const skillsData: BackendCV["data"]["skills"] =
    cv.skills.length > 0
      ? [{ name: "Skills", keywords: cv.skills }]
      : [];

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
      highlights: e.highlights || [],
    })),
    education: cv.education.map((e) => {
      const { studyType, area } = parseEducationDegree(e.degree);
      const periodParts = e.period.split(" - ");
      return {
        institution: e.institution,
        studyType,
        area,
        startDate: periodParts[0]?.trim() || "",
        endDate: periodParts[1]?.trim() || "",
        score: e.description?.replace(/^GPA:\s*/, "") || undefined,
      };
    }),
    skills: skillsData,
    projects: (cv.projects || []).map((p) => ({
      name: p.title,
      description: p.description,
      keywords: p.technologies,
      url: p.url,
      startDate: p.startDate,
      endDate: p.endDate,
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
