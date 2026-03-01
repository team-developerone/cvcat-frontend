import { useCV } from "@/lib/context";
import { type SectionType } from "@/pages/CVBuilder";
import { motion, AnimatePresence } from "framer-motion";
import PersonalInfoSection from "@/components/cv-sections/PersonalInfoSection";
import ExperienceSection from "@/components/cv-sections/ExperienceSection";
import VolunteerSection from "@/components/cv-sections/VolunteerSection";
import EducationSection from "@/components/cv-sections/EducationSection";
import SkillsSection from "@/components/cv-sections/SkillsSection";
import ProjectsSection from "@/components/cv-sections/ProjectsSection";
import CertificationsSection from "@/components/cv-sections/CertificationsSection";
import AwardsSection from "@/components/cv-sections/AwardsSection";
import LanguagesSection from "@/components/cv-sections/LanguagesSection";
import InterestsSection from "@/components/cv-sections/InterestsSection";
import ReferencesSection from "@/components/cv-sections/ReferencesSection";
import PublicationsSection from "@/components/cv-sections/PublicationsSection";
import CustomSectionsSection from "@/components/cv-sections/CustomSectionsSection";

interface CVBuilderFormProps {
  activeSection: SectionType;
}

const sectionComponents: Record<SectionType, React.ComponentType> = {
  personal: PersonalInfoSection,
  experience: ExperienceSection,
  volunteer: VolunteerSection,
  education: EducationSection,
  skills: SkillsSection,
  projects: ProjectsSection,
  certifications: CertificationsSection,
  awards: AwardsSection,
  languages: LanguagesSection,
  interests: InterestsSection,
  references: ReferencesSection,
  publications: PublicationsSection,
  custom: CustomSectionsSection,
};

export default function CVBuilderForm({ activeSection }: CVBuilderFormProps) {
  const { mainCV } = useCV();

  if (!mainCV) return null;

  const SectionComponent = sectionComponents[activeSection];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <SectionComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
