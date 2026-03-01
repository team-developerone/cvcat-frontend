import { useState, useEffect } from "react";
import { useCV } from "@/lib/context";
import { useFormState } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  WorkExperience,
  Education,
  SkillGroup,
  Project,
  Certification,
  Language,
  Reference,
  Publication,
  Volunteer,
  Award,
  Interest,
  CustomSection,
  CustomSectionItem
} from "@/lib/types";
import { type SectionType } from "@/pages/CVBuilder";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { LucidePlus, LucideTrash2, LucidePencil, LucideX, LucideCheck, LucideChevronRight } from "lucide-react";

interface CVBuilderFormProps {
  activeSection: SectionType;
}

export default function CVBuilderForm({ activeSection }: CVBuilderFormProps) {
  const { mainCV, setMainCV } = useCV();
  const [showAddExperienceForm, setShowAddExperienceForm] = useState(false);
  const [showAddEducationForm, setShowAddEducationForm] = useState(false);
  const [showAddSkillForm, setShowAddSkillForm] = useState(false);
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const [showAddCertificationForm, setShowAddCertificationForm] = useState(false);
  const [showAddLanguageForm, setShowAddLanguageForm] = useState(false);
  const [showAddReferenceForm, setShowAddReferenceForm] = useState(false);
  const [showAddPublicationForm, setShowAddPublicationForm] = useState(false);
  const [showAddCustomSectionForm, setShowAddCustomSectionForm] = useState(false);
  const [showAddCustomSectionItemForm, setShowAddCustomSectionItemForm] = useState<string | null>(null);
  const [showAddVolunteerForm, setShowAddVolunteerForm] = useState(false);
  const [showAddAwardForm, setShowAddAwardForm] = useState(false);
  const [showAddInterestForm, setShowAddInterestForm] = useState(false);
  const [newSkillKeyword, setNewSkillKeyword] = useState("");
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  // Reset all form states when active section changes
  useEffect(() => {
    setShowAddExperienceForm(false);
    setShowAddEducationForm(false);
    setShowAddSkillForm(false);
    setShowAddProjectForm(false);
    setShowAddCertificationForm(false);
    setShowAddLanguageForm(false);
    setShowAddReferenceForm(false);
    setShowAddPublicationForm(false);
    setShowAddCustomSectionForm(false);
    setShowAddVolunteerForm(false);
    setShowAddAwardForm(false);
    setShowAddInterestForm(false);
    setEditingItemId(null);
  }, [activeSection]);
  
  // Form state for new experience
  const { formData: newExperience, handleChange: handleExperienceChange, setFormData: setExperienceFormData, resetForm: resetExperienceForm } = useFormState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: ""
  });
  
  // Form state for new education
  const { formData: newEducation, handleChange: handleEducationChange, setFormData: setEducationFormData, resetForm: resetEducationForm } = useFormState({
    institution: "",
    studyType: "",
    area: "",
    startDate: "",
    endDate: "",
    score: "",
    url: "",
    description: ""
  });
  
  // Form state for new project
  const { formData: newProject, handleChange: handleProjectChange, setFormData: setProjectFormData, resetForm: resetProjectForm } = useFormState({
    title: "",
    description: "",
    technologies: "",
    url: "",
    startDate: "",
    endDate: ""
  });
  
  // Form state for new certification
  const { formData: newCertification, handleChange: handleCertificationChange, setFormData: setCertificationFormData, resetForm: resetCertificationForm } = useFormState({
    name: "",
    issuer: "",
    date: "",
    expiryDate: "",
    url: "",
    description: ""
  });
  
  // Form state for new language
  const { formData: newLanguage, handleChange: handleLanguageChange, resetForm: resetLanguageForm } = useFormState({
    name: "",
    proficiency: "Professional Working"
  });
  
  // Form state for new reference
  const { formData: newReference, handleChange: handleReferenceChange, resetForm: resetReferenceForm } = useFormState({
    name: "",
    position: "",
    company: "",
    email: "",
    phone: "",
    relationship: ""
  });
  
  // Form state for new publication
  const { formData: newPublication, handleChange: handlePublicationChange, resetForm: resetPublicationForm } = useFormState({
    title: "",
    publisher: "",
    date: "",
    url: "",
    description: ""
  });
  
  // Form state for new custom section
  const { formData: newCustomSection, handleChange: handleCustomSectionChange, resetForm: resetCustomSectionForm } = useFormState({
    title: ""
  });
  
  // Form state for new custom section item
  const { formData: newCustomSectionItem, handleChange: handleCustomSectionItemChange, resetForm: resetCustomSectionItemForm } = useFormState({
    title: "",
    subtitle: "",
    date: "",
    description: ""
  });

  // Form state for new skill group
  const { formData: newSkillGroup, handleChange: handleSkillGroupChange, resetForm: resetSkillGroupForm } = useFormState({
    name: "",
    level: ""
  });

  // Form state for new volunteer
  const { formData: newVolunteer, handleChange: handleVolunteerChange, resetForm: resetVolunteerForm } = useFormState({
    organization: "",
    position: "",
    url: "",
    startDate: "",
    endDate: "",
    summary: ""
  });

  // Form state for new award
  const { formData: newAward, handleChange: handleAwardChange, resetForm: resetAwardForm } = useFormState({
    title: "",
    date: "",
    awarder: "",
    summary: ""
  });

  // Form state for new interest
  const { formData: newInterest, handleChange: handleInterestChange, resetForm: resetInterestForm } = useFormState({
    name: ""
  });
  
  // Toggle add experience form
  const toggleAddExperienceForm = () => {
    setShowAddExperienceForm(!showAddExperienceForm);
    if (!showAddExperienceForm) {
      resetExperienceForm();
    }
    setEditingItemId(null);
  };
  
  // Toggle add education form
  const toggleAddEducationForm = () => {
    setShowAddEducationForm(!showAddEducationForm);
    if (!showAddEducationForm) {
      resetEducationForm();
    }
    setEditingItemId(null);
  };
  
  // Toggle add skill form
  const toggleAddSkillForm = () => {
    setShowAddSkillForm(!showAddSkillForm);
    if (!showAddSkillForm) {
      resetSkillGroupForm();
      setNewSkillKeyword("");
    }
  };
  
  // Toggle add project form
  const toggleAddProjectForm = () => {
    setShowAddProjectForm(!showAddProjectForm);
    if (!showAddProjectForm) {
      resetProjectForm();
    }
    setEditingItemId(null);
  };
  
  // Toggle add certification form
  const toggleAddCertificationForm = () => {
    setShowAddCertificationForm(!showAddCertificationForm);
    if (!showAddCertificationForm) {
      resetCertificationForm();
    }
    setEditingItemId(null);
  };
  
  // Toggle add language form
  const toggleAddLanguageForm = () => {
    setShowAddLanguageForm(!showAddLanguageForm);
    if (!showAddLanguageForm) {
      resetLanguageForm();
    }
  };
  
  // Toggle add reference form
  const toggleAddReferenceForm = () => {
    setShowAddReferenceForm(!showAddReferenceForm);
    if (!showAddReferenceForm) {
      resetReferenceForm();
    }
  };
  
  // Toggle add publication form
  const toggleAddPublicationForm = () => {
    setShowAddPublicationForm(!showAddPublicationForm);
    if (!showAddPublicationForm) {
      resetPublicationForm();
    }
  };
  
  // Toggle add custom section form
  const toggleAddCustomSectionForm = () => {
    setShowAddCustomSectionForm(!showAddCustomSectionForm);
    if (!showAddCustomSectionForm) {
      resetCustomSectionForm();
    }
  };

  // Toggle add volunteer form
  const toggleAddVolunteerForm = () => {
    setShowAddVolunteerForm(!showAddVolunteerForm);
    if (!showAddVolunteerForm) {
      resetVolunteerForm();
    }
  };

  // Toggle add award form
  const toggleAddAwardForm = () => {
    setShowAddAwardForm(!showAddAwardForm);
    if (!showAddAwardForm) {
      resetAwardForm();
    }
  };

  // Toggle add interest form
  const toggleAddInterestForm = () => {
    setShowAddInterestForm(!showAddInterestForm);
    if (!showAddInterestForm) {
      resetInterestForm();
    }
  };
  
  // Toggle add custom section item form
  const toggleAddCustomSectionItemForm = (sectionId: string | null) => {
    setShowAddCustomSectionItemForm(sectionId);
    if (sectionId === null) {
      resetCustomSectionItemForm();
    }
  };
  
  // Start editing an experience item
  const startEditExperience = (exp: WorkExperience) => {
    setEditingItemId(exp.id);
    setShowAddExperienceForm(true);
    setExperienceFormData({
      company: exp.company,
      position: exp.position,
      startDate: exp.startDate,
      endDate: exp.endDate,
      description: exp.description,
    });
  };

  // Start editing an education item
  const startEditEducation = (edu: Education) => {
    setEditingItemId(edu.id);
    setShowAddEducationForm(true);
    setEducationFormData({
      institution: edu.institution,
      studyType: edu.studyType,
      area: edu.area,
      startDate: edu.startDate,
      endDate: edu.endDate,
      score: edu.score || "",
      url: edu.url || "",
      description: edu.description || "",
    });
  };

  // Start editing a project item
  const startEditProject = (project: Project) => {
    setEditingItemId(project.id);
    setShowAddProjectForm(true);
    setProjectFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies ? project.technologies.join(", ") : "",
      url: project.url || "",
      startDate: project.startDate || "",
      endDate: project.endDate || "",
    });
  };

  // Start editing a certification item
  const startEditCertification = (cert: Certification) => {
    setEditingItemId(cert.id);
    setShowAddCertificationForm(true);
    setCertificationFormData({
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date,
      expiryDate: cert.expiryDate || "",
      url: cert.url || "",
      description: cert.description || "",
    });
  };

  // Handle updating personal info
  const updatePersonalInfo = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!mainCV) return;
    
    const { name, value } = e.target;
    setMainCV({
      ...mainCV,
      personalInfo: {
        ...mainCV.personalInfo,
        [name]: value
      },
      lastUpdated: new Date()
    });
  };
  
  // Add or update experience
  const addExperience = () => {
    if (!mainCV) return;

    if (editingItemId) {
      setMainCV({
        ...mainCV,
        experience: mainCV.experience.map((exp) =>
          exp.id === editingItemId
            ? {
                ...exp,
                company: newExperience.company,
                position: newExperience.position,
                startDate: newExperience.startDate,
                endDate: newExperience.endDate,
                description: newExperience.description,
              }
            : exp
        ),
        lastUpdated: new Date(),
      });
      setEditingItemId(null);
      setShowAddExperienceForm(false);
      resetExperienceForm();
    } else {
      const newExp: WorkExperience = {
        id: Date.now().toString(),
        company: newExperience.company,
        position: newExperience.position,
        startDate: newExperience.startDate,
        endDate: newExperience.endDate,
        description: newExperience.description
      };

      setMainCV({
        ...mainCV,
        experience: [newExp, ...mainCV.experience],
        lastUpdated: new Date()
      });

      toggleAddExperienceForm();
    }
  };
  
  // Add or update education
  const addEducation = () => {
    if (!mainCV) return;

    if (editingItemId) {
      setMainCV({
        ...mainCV,
        education: mainCV.education.map((edu) =>
          edu.id === editingItemId
            ? {
                ...edu,
                institution: newEducation.institution,
                studyType: newEducation.studyType,
                area: newEducation.area,
                startDate: newEducation.startDate,
                endDate: newEducation.endDate,
                score: newEducation.score || undefined,
                url: newEducation.url || undefined,
                description: newEducation.description || undefined,
              }
            : edu
        ),
        lastUpdated: new Date(),
      });
      setEditingItemId(null);
      setShowAddEducationForm(false);
      resetEducationForm();
    } else {
      const newEdu: Education = {
        id: Date.now().toString(),
        institution: newEducation.institution,
        studyType: newEducation.studyType,
        area: newEducation.area,
        startDate: newEducation.startDate,
        endDate: newEducation.endDate,
        score: newEducation.score || undefined,
        url: newEducation.url || undefined,
        description: newEducation.description || undefined,
      };

      setMainCV({
        ...mainCV,
        education: [newEdu, ...mainCV.education],
        lastUpdated: new Date()
      });

      toggleAddEducationForm();
    }
  };
  
  // Add new skill group
  const addSkillGroup = () => {
    if (!mainCV || !newSkillGroup.name.trim()) return;

    const group: SkillGroup = {
      id: Date.now().toString(),
      name: newSkillGroup.name,
      level: newSkillGroup.level || undefined,
      keywords: [],
    };

    setMainCV({
      ...mainCV,
      skills: [...mainCV.skills, group],
      lastUpdated: new Date()
    });

    resetSkillGroupForm();
    setNewSkillKeyword("");
  };

  // Add keyword to skill group
  const addSkillKeyword = (groupId: string) => {
    if (!mainCV || !newSkillKeyword.trim()) return;

    setMainCV({
      ...mainCV,
      skills: mainCV.skills.map(g =>
        g.id === groupId ? { ...g, keywords: [...g.keywords, newSkillKeyword.trim()] } : g
      ),
      lastUpdated: new Date()
    });
    setNewSkillKeyword("");
  };

  // Remove keyword from skill group
  const removeSkillKeyword = (groupId: string, keyword: string) => {
    if (!mainCV) return;

    setMainCV({
      ...mainCV,
      skills: mainCV.skills.map(g =>
        g.id === groupId ? { ...g, keywords: g.keywords.filter(k => k !== keyword) } : g
      ),
      lastUpdated: new Date()
    });
  };
  
  // Add or update project
  const addProject = () => {
    if (!mainCV) return;

    const technologies = newProject.technologies.split(',').map(tech => tech.trim()).filter(tech => tech);

    if (editingItemId) {
      setMainCV({
        ...mainCV,
        projects: (mainCV.projects || []).map((proj) =>
          proj.id === editingItemId
            ? {
                ...proj,
                title: newProject.title,
                description: newProject.description,
                technologies,
                url: newProject.url || undefined,
                startDate: newProject.startDate || undefined,
                endDate: newProject.endDate || undefined,
              }
            : proj
        ),
        lastUpdated: new Date(),
      });
      setEditingItemId(null);
      setShowAddProjectForm(false);
      resetProjectForm();
    } else {
      const newProj: Project = {
        id: Date.now().toString(),
        title: newProject.title,
        description: newProject.description,
        technologies,
        url: newProject.url || undefined,
        startDate: newProject.startDate || undefined,
        endDate: newProject.endDate || undefined
      };

      setMainCV({
        ...mainCV,
        projects: mainCV.projects ? [newProj, ...mainCV.projects] : [newProj],
        lastUpdated: new Date()
      });

      toggleAddProjectForm();
    }
  };
  
  // Add or update certification
  const addCertification = () => {
    if (!mainCV) return;

    if (editingItemId) {
      setMainCV({
        ...mainCV,
        certifications: (mainCV.certifications || []).map((cert) =>
          cert.id === editingItemId
            ? {
                ...cert,
                name: newCertification.name,
                issuer: newCertification.issuer,
                date: newCertification.date,
                expiryDate: newCertification.expiryDate || undefined,
                url: newCertification.url || undefined,
                description: newCertification.description || undefined,
              }
            : cert
        ),
        lastUpdated: new Date(),
      });
      setEditingItemId(null);
      setShowAddCertificationForm(false);
      resetCertificationForm();
    } else {
      const newCert: Certification = {
        id: Date.now().toString(),
        name: newCertification.name,
        issuer: newCertification.issuer,
        date: newCertification.date,
        expiryDate: newCertification.expiryDate || undefined,
        url: newCertification.url || undefined,
        description: newCertification.description || undefined
      };

      setMainCV({
        ...mainCV,
        certifications: mainCV.certifications ? [newCert, ...mainCV.certifications] : [newCert],
        lastUpdated: new Date()
      });

      toggleAddCertificationForm();
    }
  };
  
  // Add new language
  const addLanguage = () => {
    if (!mainCV) return;
    
    const newLang: Language = {
      id: Date.now().toString(),
      name: newLanguage.name,
      proficiency: newLanguage.proficiency as Language["proficiency"]
    };
    
    setMainCV({
      ...mainCV,
      languages: mainCV.languages ? [newLang, ...mainCV.languages] : [newLang],
      lastUpdated: new Date()
    });
    
    toggleAddLanguageForm();
  };
  
  // Add new reference
  const addReference = () => {
    if (!mainCV) return;
    
    const newRef: Reference = {
      id: Date.now().toString(),
      name: newReference.name,
      position: newReference.position,
      company: newReference.company,
      email: newReference.email || undefined,
      phone: newReference.phone || undefined,
      relationship: newReference.relationship
    };
    
    setMainCV({
      ...mainCV,
      references: mainCV.references ? [newRef, ...mainCV.references] : [newRef],
      lastUpdated: new Date()
    });
    
    toggleAddReferenceForm();
  };
  
  // Add new publication
  const addPublication = () => {
    if (!mainCV) return;
    
    const newPub: Publication = {
      id: Date.now().toString(),
      title: newPublication.title,
      publisher: newPublication.publisher,
      date: newPublication.date,
      url: newPublication.url || undefined,
      description: newPublication.description || undefined
    };
    
    setMainCV({
      ...mainCV,
      publications: mainCV.publications ? [newPub, ...mainCV.publications] : [newPub],
      lastUpdated: new Date()
    });
    
    toggleAddPublicationForm();
  };
  
  // Add new custom section
  const addCustomSection = () => {
    if (!mainCV || !newCustomSection.title.trim()) return;
    
    const newSection: CustomSection = {
      id: Date.now().toString(),
      title: newCustomSection.title,
      items: []
    };
    
    setMainCV({
      ...mainCV,
      customSections: mainCV.customSections ? [...mainCV.customSections, newSection] : [newSection],
      lastUpdated: new Date()
    });
    
    toggleAddCustomSectionForm();
  };
  
  // Remove experience
  const removeExperience = (id: string) => {
    if (!mainCV) return;
    
    setMainCV({
      ...mainCV,
      experience: mainCV.experience.filter(exp => exp.id !== id),
      lastUpdated: new Date()
    });
  };
  
  // Remove education
  const removeEducation = (id: string) => {
    if (!mainCV) return;
    
    setMainCV({
      ...mainCV,
      education: mainCV.education.filter(edu => edu.id !== id),
      lastUpdated: new Date()
    });
  };
  
  // Remove skill group
  const removeSkillGroup = (id: string) => {
    if (!mainCV) return;

    setMainCV({
      ...mainCV,
      skills: mainCV.skills.filter(g => g.id !== id),
      lastUpdated: new Date()
    });
  };
  
  // Remove project
  const removeProject = (id: string) => {
    if (!mainCV || !mainCV.projects) return;
    
    setMainCV({
      ...mainCV,
      projects: mainCV.projects.filter(project => project.id !== id),
      lastUpdated: new Date()
    });
  };
  
  // Remove certification
  const removeCertification = (id: string) => {
    if (!mainCV || !mainCV.certifications) return;
    
    setMainCV({
      ...mainCV,
      certifications: mainCV.certifications.filter(cert => cert.id !== id),
      lastUpdated: new Date()
    });
  };
  
  // Remove language
  const removeLanguage = (id: string) => {
    if (!mainCV || !mainCV.languages) return;
    
    setMainCV({
      ...mainCV,
      languages: mainCV.languages.filter(lang => lang.id !== id),
      lastUpdated: new Date()
    });
  };
  
  // Remove reference
  const removeReference = (id: string) => {
    if (!mainCV || !mainCV.references) return;
    
    setMainCV({
      ...mainCV,
      references: mainCV.references.filter(ref => ref.id !== id),
      lastUpdated: new Date()
    });
  };
  
  // Remove publication
  const removePublication = (id: string) => {
    if (!mainCV || !mainCV.publications) return;

    setMainCV({
      ...mainCV,
      publications: mainCV.publications.filter(pub => pub.id !== id),
      lastUpdated: new Date()
    });
  };

  // Add new volunteer
  const addVolunteer = () => {
    if (!mainCV) return;

    const vol: Volunteer = {
      id: Date.now().toString(),
      organization: newVolunteer.organization,
      position: newVolunteer.position,
      url: newVolunteer.url || undefined,
      startDate: newVolunteer.startDate,
      endDate: newVolunteer.endDate,
      summary: newVolunteer.summary,
    };

    setMainCV({
      ...mainCV,
      volunteer: mainCV.volunteer ? [vol, ...mainCV.volunteer] : [vol],
      lastUpdated: new Date()
    });

    toggleAddVolunteerForm();
  };

  // Remove volunteer
  const removeVolunteer = (id: string) => {
    if (!mainCV || !mainCV.volunteer) return;

    setMainCV({
      ...mainCV,
      volunteer: mainCV.volunteer.filter(v => v.id !== id),
      lastUpdated: new Date()
    });
  };

  // Add new award
  const addAward = () => {
    if (!mainCV) return;

    const award: Award = {
      id: Date.now().toString(),
      title: newAward.title,
      date: newAward.date,
      awarder: newAward.awarder,
      summary: newAward.summary || undefined,
    };

    setMainCV({
      ...mainCV,
      awards: mainCV.awards ? [award, ...mainCV.awards] : [award],
      lastUpdated: new Date()
    });

    toggleAddAwardForm();
  };

  // Remove award
  const removeAward = (id: string) => {
    if (!mainCV || !mainCV.awards) return;

    setMainCV({
      ...mainCV,
      awards: mainCV.awards.filter(a => a.id !== id),
      lastUpdated: new Date()
    });
  };

  // Add new interest
  const addInterest = () => {
    if (!mainCV || !newInterest.name.trim()) return;

    const interest: Interest = {
      id: Date.now().toString(),
      name: newInterest.name,
      keywords: [],
    };

    setMainCV({
      ...mainCV,
      interests: mainCV.interests ? [interest, ...mainCV.interests] : [interest],
      lastUpdated: new Date()
    });

    resetInterestForm();
  };

  // Remove interest
  const removeInterest = (id: string) => {
    if (!mainCV || !mainCV.interests) return;

    setMainCV({
      ...mainCV,
      interests: mainCV.interests.filter(i => i.id !== id),
      lastUpdated: new Date()
    });
  };

  // Add keyword to interest
  const [newInterestKeyword, setNewInterestKeyword] = useState("");
  const addInterestKeyword = (interestId: string) => {
    if (!mainCV || !mainCV.interests || !newInterestKeyword.trim()) return;

    setMainCV({
      ...mainCV,
      interests: mainCV.interests.map(i =>
        i.id === interestId ? { ...i, keywords: [...i.keywords, newInterestKeyword.trim()] } : i
      ),
      lastUpdated: new Date()
    });
    setNewInterestKeyword("");
  };

  // Remove keyword from interest
  const removeInterestKeyword = (interestId: string, keyword: string) => {
    if (!mainCV || !mainCV.interests) return;

    setMainCV({
      ...mainCV,
      interests: mainCV.interests.map(i =>
        i.id === interestId ? { ...i, keywords: i.keywords.filter(k => k !== keyword) } : i
      ),
      lastUpdated: new Date()
    });
  };
  
  // Remove custom section
  const removeCustomSection = (id: string) => {
    if (!mainCV || !mainCV.customSections) return;
    
    setMainCV({
      ...mainCV,
      customSections: mainCV.customSections.filter(section => section.id !== id),
      lastUpdated: new Date()
    });
  };
  
  // Add custom section item
  const addCustomSectionItem = (sectionId: string) => {
    if (!mainCV || !mainCV.customSections) return;
    
    const newItem: CustomSectionItem = {
      id: Date.now().toString(),
      title: newCustomSectionItem.title,
      subtitle: newCustomSectionItem.subtitle || undefined,
      date: newCustomSectionItem.date || undefined,
      description: newCustomSectionItem.description || undefined
    };
    
    const updatedSections = mainCV.customSections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          items: [newItem, ...section.items]
        };
      }
      return section;
    });
    
    setMainCV({
      ...mainCV,
      customSections: updatedSections,
      lastUpdated: new Date()
    });
    
    toggleAddCustomSectionItemForm(null);
  };
  
  // Remove custom section item
  const removeCustomSectionItem = (sectionId: string, itemId: string) => {
    if (!mainCV || !mainCV.customSections) return;
    
    const updatedSections = mainCV.customSections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          items: section.items.filter(item => item.id !== itemId)
        };
      }
      return section;
    });
    
    setMainCV({
      ...mainCV,
      customSections: updatedSections,
      lastUpdated: new Date()
    });
  };
  
  if (!mainCV) return null;
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <AnimatePresence mode="wait">
        {/* Personal Info Section */}
        {activeSection === "personal" && (
          <motion.div
            key="personal"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-5">
              <h2 className="text-lg font-medium mb-4">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
                  <Input
                    type="text"
                    name="fullName"
                    value={mainCV.personalInfo.fullName}
                    onChange={updatePersonalInfo}
                    className="w-full h-9 focus-visible:ring-[#DAA520]"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Professional Title</label>
                  <Input
                    type="text"
                    name="title"
                    value={mainCV.personalInfo.title}
                    onChange={updatePersonalInfo}
                    className="w-full h-9 focus-visible:ring-[#DAA520]"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={mainCV.personalInfo.email}
                    onChange={updatePersonalInfo}
                    className="w-full h-9 focus-visible:ring-[#DAA520]"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Phone</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={mainCV.personalInfo.phone}
                    onChange={updatePersonalInfo}
                    className="w-full h-9 focus-visible:ring-[#DAA520]"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Location</label>
                  <Input
                    type="text"
                    name="location"
                    value={mainCV.personalInfo.location}
                    onChange={updatePersonalInfo}
                    className="w-full h-9 focus-visible:ring-[#DAA520]"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Professional Summary</label>
                  <Textarea
                    name="summary"
                    value={mainCV.personalInfo.summary}
                    onChange={updatePersonalInfo}
                    className="w-full min-h-[100px] focus-visible:ring-[#DAA520]"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Work Experience Section */}
        {activeSection === "experience" && (
          <motion.div
            key="experience"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Work Experience</h2>
              <Button 
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-xs text-[#DAA520] hover:text-[#DAA520]/80 hover:bg-[#DAA520]/5"
                onClick={toggleAddExperienceForm}
              >
                <LucidePlus className="w-3 h-3 mr-1" />
                Add Experience
              </Button>
            </div>
            
            {/* Add Experience Form - Only show at top when adding new (not editing) */}
            {showAddExperienceForm && !editingItemId && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium">Add Work Experience</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/70 h-7 w-7 p-0"
                    onClick={toggleAddExperienceForm}
                  >
                    <LucideX className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Company</label>
                    <Input
                      type="text"
                      name="company"
                      value={newExperience.company}
                      onChange={handleExperienceChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Position</label>
                    <Input
                      type="text"
                      name="position"
                      value={newExperience.position}
                      onChange={handleExperienceChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
                    <Input
                      type="month"
                      name="startDate"
                      value={newExperience.startDate}
                      onChange={handleExperienceChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
                    <Input
                      type="month"
                      name="endDate"
                      value={newExperience.endDate}
                      onChange={handleExperienceChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                    <Textarea
                      name="description"
                      value={newExperience.description}
                      onChange={handleExperienceChange}
                      className="w-full min-h-[80px] focus-visible:ring-[#DAA520]"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end mt-4 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleAddExperienceForm}
                    className="text-xs h-8"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={addExperience}
                    className="text-xs h-8 bg-black hover:bg-black/80"
                  >
                    <LucideCheck className="w-3 h-3 mr-1" />
                    Save
                  </Button>
                </div>
              </div>
            )}
            
            {/* Experience Items */}
            {mainCV.experience.length > 0 ? (
              <div className="space-y-3">
                {mainCV.experience.map((exp) => (
                  <div key={exp.id}>
                    {editingItemId === exp.id ? (
                      // Show edit form in place of the block
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-sm font-medium">Edit Work Experience</h3>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/70 h-7 w-7 p-0"
                            onClick={toggleAddExperienceForm}
                          >
                            <LucideX className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Company</label>
                            <Input
                              type="text"
                              name="company"
                              value={newExperience.company}
                              onChange={handleExperienceChange}
                              className="w-full h-9 focus-visible:ring-[#DAA520]"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Position</label>
                            <Input
                              type="text"
                              name="position"
                              value={newExperience.position}
                              onChange={handleExperienceChange}
                              className="w-full h-9 focus-visible:ring-[#DAA520]"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
                            <Input
                              type="month"
                              name="startDate"
                              value={newExperience.startDate}
                              onChange={handleExperienceChange}
                              className="w-full h-9 focus-visible:ring-[#DAA520]"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
                            <Input
                              type="month"
                              name="endDate"
                              value={newExperience.endDate}
                              onChange={handleExperienceChange}
                              className="w-full h-9 focus-visible:ring-[#DAA520]"
                            />
                          </div>
                          
                          <div className="md:col-span-2">
                            <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                            <Textarea
                              name="description"
                              value={newExperience.description}
                              onChange={handleExperienceChange}
                              className="w-full min-h-[80px] focus-visible:ring-[#DAA520]"
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-end mt-4 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={toggleAddExperienceForm}
                            className="text-xs h-8"
                          >
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={addExperience}
                            className="text-xs h-8 bg-black hover:bg-black/80"
                          >
                            <LucideCheck className="w-3 h-3 mr-1" />
                            Update
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // Show normal block view
                      <div className="p-3 border border-gray-100 rounded-lg hover:border-[#DAA520]/40 transition-all bg-white">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-sm">{exp.position}</h3>
                            <p className="text-gray-600 text-xs">{exp.company}</p>
                            <p className="text-gray-400 text-xs mt-0.5">{exp.startDate} - {exp.endDate}</p>
                          </div>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0 text-gray-400 hover:text-[#DAA520] hover:bg-gray-50"
                              onClick={() => startEditExperience(exp)}
                            >
                              <LucidePencil className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0 text-gray-400 hover:text-red-500 hover:bg-gray-50"
                              onClick={() => removeExperience(exp.id)}
                            >
                              <LucideTrash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>
                        {exp.description && (
                          <p className="mt-2 text-xs text-gray-600">{exp.description}</p>
                        )}
                        {exp.highlights && exp.highlights.length > 0 && (
                          <ul className="mt-1 list-disc list-inside text-xs text-gray-600">
                            {exp.highlights.map((h, i) => <li key={i}>{h}</li>)}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
                <p className="text-gray-500 text-sm mb-3">No work experience added yet</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleAddExperienceForm} 
                  className="text-xs"
                >
                  <LucidePlus className="w-3.5 h-3.5 mr-1" />
                  Add Your First Experience
                </Button>
              </div>
            )}
          </motion.div>
        )}
        
        {/* Education Section */}
        {activeSection === "education" && (
          <motion.div
            key="education"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Education</h2>
              <Button 
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-xs text-[#DAA520] hover:text-[#DAA520]/80 hover:bg-[#DAA520]/5"
                onClick={toggleAddEducationForm}
              >
                <LucidePlus className="w-3 h-3 mr-1" />
                Add Education
              </Button>
            </div>
            
            {/* Add Education Form */}
            {showAddEducationForm && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium">{editingItemId ? "Edit Education" : "Add Education"}</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/70 h-7 w-7 p-0"
                    onClick={toggleAddEducationForm}
                  >
                    <LucideX className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Institution</label>
                    <Input
                      type="text"
                      name="institution"
                      value={newEducation.institution}
                      onChange={handleEducationChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Study Type</label>
                    <Input
                      type="text"
                      name="studyType"
                      value={newEducation.studyType}
                      onChange={handleEducationChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                      placeholder="e.g. Bachelor's, Master's"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Area of Study</label>
                    <Input
                      type="text"
                      name="area"
                      value={newEducation.area}
                      onChange={handleEducationChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                      placeholder="e.g. Computer Science"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
                    <Input
                      type="month"
                      name="startDate"
                      value={newEducation.startDate}
                      onChange={handleEducationChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
                    <Input
                      type="month"
                      name="endDate"
                      value={newEducation.endDate}
                      onChange={handleEducationChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Score / GPA (Optional)</label>
                    <Input
                      type="text"
                      name="score"
                      value={newEducation.score}
                      onChange={handleEducationChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                      placeholder="e.g. 3.8/4.0"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">URL (Optional)</label>
                    <Input
                      type="url"
                      name="url"
                      value={newEducation.url}
                      onChange={handleEducationChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-4 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleAddEducationForm}
                    className="text-xs h-8"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={addEducation}
                    className="text-xs h-8 bg-black hover:bg-black/80"
                  >
                    <LucideCheck className="w-3 h-3 mr-1" />
                    {editingItemId ? "Update" : "Save"}
                  </Button>
                </div>
              </div>
            )}

            {/* Education Items */}
            {mainCV.education.length > 0 ? (
              <div className="space-y-3">
                {mainCV.education.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-3 border border-gray-100 rounded-lg hover:border-[#DAA520]/40 transition-all bg-white"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-sm">{[edu.studyType, edu.area].filter(Boolean).join(' in ')}</h3>
                        <p className="text-gray-600 text-xs">{edu.institution}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{[edu.startDate, edu.endDate].filter(Boolean).join(' - ')}</p>
                        {edu.score && <p className="text-gray-500 text-xs mt-0.5">GPA: {edu.score}</p>}
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-gray-400 hover:text-[#DAA520] hover:bg-gray-50"
                          onClick={() => startEditEducation(edu)}
                        >
                          <LucidePencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-gray-400 hover:text-red-500 hover:bg-gray-50"
                          onClick={() => removeEducation(edu.id)}
                        >
                          <LucideTrash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                    {edu.courses && edu.courses.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {edu.courses.map((course, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">{course}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
                <p className="text-gray-500 text-sm mb-3">No education added yet</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleAddEducationForm} 
                  className="text-xs"
                >
                  <LucidePlus className="w-3.5 h-3.5 mr-1" />
                  Add Your Education
                </Button>
              </div>
            )}
          </motion.div>
        )}
        
        {/* Skills Section */}
        {activeSection === "skills" && (
          <motion.div
            key="skills"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Skills</h2>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-xs text-[#DAA520] hover:text-[#DAA520]/80 hover:bg-[#DAA520]/5"
                onClick={toggleAddSkillForm}
              >
                <LucidePlus className="w-3 h-3 mr-1" />
                Add Skill Group
              </Button>
            </div>

            {/* Add Skill Group Form */}
            {showAddSkillForm && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium">Add Skill Group</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/70 h-7 w-7 p-0"
                    onClick={toggleAddSkillForm}
                  >
                    <LucideX className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Group Name</label>
                    <Input
                      type="text"
                      name="name"
                      value={newSkillGroup.name}
                      onChange={handleSkillGroupChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                      placeholder="e.g. Programming Languages, Frameworks"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Level (Optional)</label>
                    <Input
                      type="text"
                      name="level"
                      value={newSkillGroup.level}
                      onChange={handleSkillGroupChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                      placeholder="e.g. Advanced, Intermediate"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-4 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleAddSkillForm}
                    className="text-xs h-8"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={addSkillGroup}
                    disabled={!newSkillGroup.name.trim()}
                    className="text-xs h-8 bg-black hover:bg-black/80"
                  >
                    <LucideCheck className="w-3 h-3 mr-1" />
                    Create Group
                  </Button>
                </div>
              </div>
            )}

            {/* Skill Groups */}
            {mainCV.skills.length > 0 ? (
              <div className="space-y-4">
                {mainCV.skills.map((group) => (
                  <div key={group.id} className="p-3 border border-gray-100 rounded-lg hover:border-[#DAA520]/40 transition-all bg-white">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h3 className="font-medium text-sm">{group.name}</h3>
                        {group.level && <p className="text-gray-500 text-xs">{group.level}</p>}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-gray-400 hover:text-red-500 hover:bg-gray-50"
                        onClick={() => removeSkillGroup(group.id)}
                      >
                        <LucideTrash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {group.keywords.map((kw, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="bg-[#DAA520]/5 hover:bg-[#DAA520]/10 border-[#DAA520]/20 text-gray-700 py-0.5 px-2 rounded-full text-xs"
                        >
                          {kw}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 ml-1 text-gray-400 hover:text-red-500 hover:bg-transparent"
                            onClick={() => removeSkillKeyword(group.id, kw)}
                          >
                            <LucideX className="w-3 h-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>

                    <div className="flex">
                      <Input
                        type="text"
                        value={newSkillKeyword}
                        onChange={(e) => setNewSkillKeyword(e.target.value)}
                        className="w-full h-8 text-xs focus-visible:ring-[#DAA520]"
                        placeholder="Add a skill keyword..."
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && newSkillKeyword.trim()) {
                            addSkillKeyword(group.id);
                          }
                        }}
                      />
                      <Button
                        size="sm"
                        onClick={() => addSkillKeyword(group.id)}
                        disabled={!newSkillKeyword.trim()}
                        className="ml-2 h-8 bg-black hover:bg-black/80 text-xs"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
                <p className="text-gray-500 text-sm mb-3">No skills added yet</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleAddSkillForm}
                  className="text-xs"
                >
                  <LucidePlus className="w-3.5 h-3.5 mr-1" />
                  Add Your Skills
                </Button>
              </div>
            )}
          </motion.div>
        )}

        {/* Custom Section Form */}
        {activeSection === "custom" && (
          <motion.div
            key="custom"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Custom Sections</h2>
              <Button 
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-xs text-[#DAA520] hover:text-[#DAA520]/80 hover:bg-[#DAA520]/5"
                onClick={toggleAddCustomSectionForm}
              >
                <LucidePlus className="w-3 h-3 mr-1" />
                Add Custom Section
              </Button>
            </div>
            
            {/* Add Custom Section Form */}
            {showAddCustomSectionForm && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium">Create New Section</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/70 h-7 w-7 p-0"
                    onClick={toggleAddCustomSectionForm}
                  >
                    <LucideX className="w-4 h-4" />
                  </Button>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Section Title</label>
                  <Input
                    type="text"
                    name="title"
                    value={newCustomSection.title}
                    onChange={handleCustomSectionChange}
                    className="w-full h-9 focus-visible:ring-[#DAA520]"
                    placeholder="e.g. Volunteer Work, Awards, Interests, etc."
                  />
                </div>
                
                <div className="flex justify-end mt-4 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleAddCustomSectionForm}
                    className="text-xs h-8"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={addCustomSection}
                    className="text-xs h-8 bg-black hover:bg-black/80"
                    disabled={!newCustomSection.title.trim()}
                  >
                    <LucideCheck className="w-3 h-3 mr-1" />
                    Create Section
                  </Button>
                </div>
              </div>
            )}
            
            {/* Custom Sections List */}
            {mainCV.customSections && mainCV.customSections.length > 0 ? (
              <div className="space-y-4">
                {mainCV.customSections.map((section) => (
                  <div key={section.id} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-gray-800">{section.title}</h3>
                      <div className="flex space-x-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 w-7 p-0 text-gray-400 hover:text-red-500 hover:bg-gray-50"
                          onClick={() => removeCustomSection(section.id)}
                        >
                          <LucideTrash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                    
                    {section.items.length > 0 ? (
                      <div className="space-y-2">
                        {section.items.map((item) => (
                          <div key={item.id} className="p-2 bg-gray-50 rounded-md text-sm">
                            <div className="flex justify-between">
                              <span className="font-medium">{item.title}</span>
                              <div className="flex space-x-1">
                                {item.date && <span className="text-gray-500 text-xs mr-2 self-center">{item.date}</span>}
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 w-6 p-0 text-gray-400 hover:text-red-500 hover:bg-gray-100"
                                  onClick={() => removeCustomSectionItem(section.id, item.id)}
                                >
                                  <LucideTrash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            {item.subtitle && <p className="text-gray-600 text-xs">{item.subtitle}</p>}
                            {item.description && <p className="text-gray-600 text-xs mt-1">{item.description}</p>}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No items added yet</p>
                    )}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 text-xs h-7 w-full"
                      onClick={() => toggleAddCustomSectionItemForm(section.id)}
                    >
                      <LucidePlus className="w-3 h-3 mr-1" />
                      Add Item to {section.title}
                    </Button>
                    
                    {/* Add Custom Section Item Form */}
                    {showAddCustomSectionItemForm === section.id && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-xs font-medium">Add Item to {section.title}</h3>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/70 h-6 w-6 p-0"
                            onClick={() => toggleAddCustomSectionItemForm(null)}
                          >
                            <LucideX className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                            <Input
                              type="text"
                              name="title"
                              value={newCustomSectionItem.title}
                              onChange={handleCustomSectionItemChange}
                              className="w-full h-8 text-sm focus-visible:ring-[#DAA520]"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Subtitle (Optional)</label>
                            <Input
                              type="text"
                              name="subtitle"
                              value={newCustomSectionItem.subtitle}
                              onChange={handleCustomSectionItemChange}
                              className="w-full h-8 text-sm focus-visible:ring-[#DAA520]"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Date (Optional)</label>
                            <Input
                              type="text"
                              name="date"
                              value={newCustomSectionItem.date}
                              onChange={handleCustomSectionItemChange}
                              className="w-full h-8 text-sm focus-visible:ring-[#DAA520]"
                              placeholder="e.g. 2021 - 2023 or January 2023"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Description (Optional)</label>
                            <Textarea
                              name="description"
                              value={newCustomSectionItem.description}
                              onChange={handleCustomSectionItemChange}
                              className="w-full min-h-[70px] text-sm focus-visible:ring-[#DAA520]"
                            />
                          </div>
                          
                          <div className="flex justify-end mt-2 gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleAddCustomSectionItemForm(null)}
                              className="text-xs h-8"
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => addCustomSectionItem(section.id)}
                              className="text-xs h-8 bg-black hover:bg-black/80"
                              disabled={!newCustomSectionItem.title.trim()}
                            >
                              <LucideCheck className="w-3 h-3 mr-1" />
                              Add Item
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
                <p className="text-gray-500 text-sm mb-3">No custom sections added yet</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleAddCustomSectionForm} 
                  className="text-xs"
                >
                  <LucidePlus className="w-3.5 h-3.5 mr-1" />
                  Create Custom Section
                </Button>
              </div>
            )}
          </motion.div>
        )}
        
        {/* Projects Section */}
        {activeSection === "projects" && (
          <motion.div
            key="projects"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Projects</h2>
              <Button 
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-xs text-[#DAA520] hover:text-[#DAA520]/80 hover:bg-[#DAA520]/5"
                onClick={toggleAddProjectForm}
              >
                <LucidePlus className="w-3 h-3 mr-1" />
                Add Project
              </Button>
            </div>
            
            {/* Add Project Form */}
            {showAddProjectForm && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium">{editingItemId ? "Edit Project" : "Add Project"}</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/70 h-7 w-7 p-0"
                    onClick={toggleAddProjectForm}
                  >
                    <LucideX className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Project Title</label>
                    <Input
                      type="text"
                      name="title"
                      value={newProject.title}
                      onChange={handleProjectChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">URL (Optional)</label>
                    <Input
                      type="url"
                      name="url"
                      value={newProject.url}
                      onChange={handleProjectChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                      placeholder="https://..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Start Date (Optional)</label>
                    <Input
                      type="month"
                      name="startDate"
                      value={newProject.startDate}
                      onChange={handleProjectChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">End Date (Optional)</label>
                    <Input
                      type="month"
                      name="endDate"
                      value={newProject.endDate}
                      onChange={handleProjectChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Technologies (comma separated)</label>
                    <Input
                      type="text"
                      name="technologies"
                      value={newProject.technologies}
                      onChange={handleProjectChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                      placeholder="e.g. React, TypeScript, Node.js"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                    <Textarea
                      name="description"
                      value={newProject.description}
                      onChange={handleProjectChange}
                      className="w-full min-h-[80px] focus-visible:ring-[#DAA520]"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end mt-4 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleAddProjectForm}
                    className="text-xs h-8"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={addProject}
                    className="text-xs h-8 bg-black hover:bg-black/80"
                    disabled={!newProject.title || !newProject.description}
                  >
                    <LucideCheck className="w-3 h-3 mr-1" />
                    {editingItemId ? "Update" : "Save"}
                  </Button>
                </div>
              </div>
            )}
            
            {/* Project Items */}
            {mainCV.projects && mainCV.projects.length > 0 ? (
              <div className="space-y-3">
                {mainCV.projects.map((project) => (
                  <div 
                    key={project.id} 
                    className="p-3 border border-gray-100 rounded-lg hover:border-[#DAA520]/40 transition-all bg-white"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-sm">{project.title}</h3>
                        {project.startDate && (
                          <p className="text-gray-400 text-xs mt-0.5">
                            {project.startDate}{project.endDate ? ` - ${project.endDate}` : ' - Present'}
                          </p>
                        )}
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-gray-400 hover:text-[#DAA520] hover:bg-gray-50"
                          onClick={() => startEditProject(project)}
                        >
                          <LucidePencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-gray-400 hover:text-red-500 hover:bg-gray-50"
                          onClick={() => removeProject(project.id)}
                        >
                          <LucideTrash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="mt-2 text-xs text-gray-600">{project.description}</p>
                    {project.highlights && project.highlights.length > 0 && (
                      <ul className="mt-1 list-disc list-inside text-xs text-gray-600">
                        {project.highlights.map((h, i) => <li key={i}>{h}</li>)}
                      </ul>
                    )}

                    {project.technologies && project.technologies.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {project.url && (
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="mt-2 inline-flex items-center text-xs text-[#DAA520] hover:underline"
                      >
                        <LucideChevronRight className="w-3 h-3 mr-0.5" />
                        View Project
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
                <p className="text-gray-500 text-sm mb-3">No projects added yet</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleAddProjectForm} 
                  className="text-xs"
                >
                  <LucidePlus className="w-3.5 h-3.5 mr-1" />
                  Add Your First Project
                </Button>
              </div>
            )}
          </motion.div>
        )}

        {/* Certifications Section */}
        {activeSection === "certifications" && (
          <motion.div
            key="certifications"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Certifications</h2>
              <Button 
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-xs text-[#DAA520] hover:text-[#DAA520]/80 hover:bg-[#DAA520]/5"
                onClick={toggleAddCertificationForm}
              >
                <LucidePlus className="w-3 h-3 mr-1" />
                Add Certification
              </Button>
            </div>
            
            {/* Add Certification Form */}
            {showAddCertificationForm && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium">{editingItemId ? "Edit Certification" : "Add Certification"}</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/70 h-7 w-7 p-0"
                    onClick={toggleAddCertificationForm}
                  >
                    <LucideX className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Certification Name</label>
                    <Input
                      type="text"
                      name="name"
                      value={newCertification.name}
                      onChange={handleCertificationChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                      placeholder="e.g. AWS Certified Solutions Architect"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Issuing Organization</label>
                    <Input
                      type="text"
                      name="issuer"
                      value={newCertification.issuer}
                      onChange={handleCertificationChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                      placeholder="e.g. Amazon Web Services"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Issue Date</label>
                    <Input
                      type="date"
                      name="date"
                      value={newCertification.date}
                      onChange={handleCertificationChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Expiry Date (Optional)</label>
                    <Input
                      type="date"
                      name="expiryDate"
                      value={newCertification.expiryDate}
                      onChange={handleCertificationChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Credential URL (Optional)</label>
                    <Input
                      type="url"
                      name="url"
                      value={newCertification.url}
                      onChange={handleCertificationChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                      placeholder="https://..."
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Description (Optional)</label>
                    <Textarea
                      name="description"
                      value={newCertification.description}
                      onChange={handleCertificationChange}
                      className="w-full min-h-[80px] focus-visible:ring-[#DAA520]"
                      placeholder="Brief description of the certification or skills it validates"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end mt-4 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleAddCertificationForm}
                    className="text-xs h-8"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={addCertification}
                    className="text-xs h-8 bg-black hover:bg-black/80"
                    disabled={!newCertification.name || !newCertification.issuer || !newCertification.date}
                  >
                    <LucideCheck className="w-3 h-3 mr-1" />
                    {editingItemId ? "Update Certification" : "Save Certification"}
                  </Button>
                </div>
              </div>
            )}
            
            {/* Certification Items */}
            {mainCV.certifications && mainCV.certifications.length > 0 ? (
              <div className="space-y-3">
                {mainCV.certifications.map((cert) => (
                  <div 
                    key={cert.id} 
                    className="p-3 border border-gray-100 rounded-lg hover:border-[#DAA520]/40 transition-all bg-white"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-sm">{cert.name}</h3>
                        <p className="text-gray-500 text-xs mt-0.5">
                          {cert.issuer} • Issued {cert.date}
                          {cert.expiryDate && ` • Expires ${cert.expiryDate}`}
                        </p>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-gray-400 hover:text-[#DAA520] hover:bg-gray-50"
                          onClick={() => startEditCertification(cert)}
                        >
                          <LucidePencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-gray-400 hover:text-red-500 hover:bg-gray-50"
                          onClick={() => removeCertification(cert.id)}
                        >
                          <LucideTrash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                    
                    {cert.description && (
                      <p className="mt-2 text-xs text-gray-600">{cert.description}</p>
                    )}
                    
                    {cert.url && (
                      <a 
                        href={cert.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="mt-2 inline-flex items-center text-xs text-[#DAA520] hover:underline"
                      >
                        <LucideChevronRight className="w-3 h-3 mr-0.5" />
                        View Credential
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
                <p className="text-gray-500 text-sm mb-3">No certifications added yet</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleAddCertificationForm} 
                  className="text-xs"
                >
                  <LucidePlus className="w-3.5 h-3.5 mr-1" />
                  Add Your First Certification
                </Button>
              </div>
            )}
          </motion.div>
        )}

        {/* Languages Section */}
        {activeSection === "languages" && (
          <motion.div
            key="languages"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Languages</h2>
              <Button 
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-xs text-[#DAA520] hover:text-[#DAA520]/80 hover:bg-[#DAA520]/5"
                onClick={toggleAddLanguageForm}
              >
                <LucidePlus className="w-3 h-3 mr-1" />
                Add Language
              </Button>
            </div>
            
            {/* Add Language Form */}
            {showAddLanguageForm && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium">Add Language</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/70 h-7 w-7 p-0"
                    onClick={toggleAddLanguageForm}
                  >
                    <LucideX className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Language</label>
                    <Input
                      type="text"
                      name="name"
                      value={newLanguage.name}
                      onChange={handleLanguageChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                      placeholder="e.g. English, Spanish, French"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Proficiency Level</label>
                    <select
                      name="proficiency"
                      value={newLanguage.proficiency}
                      onChange={handleLanguageChange}
                      className="w-full h-9 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#DAA520]"
                    >
                      <option value="Elementary">Elementary</option>
                      <option value="Limited Working">Limited Working</option>
                      <option value="Professional Working">Professional Working</option>
                      <option value="Full Professional">Full Professional</option>
                      <option value="Native/Bilingual">Native/Bilingual</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleAddLanguageForm}
                    className="text-xs h-8"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={addLanguage}
                    className="text-xs h-8 bg-black hover:bg-black/80"
                    disabled={!newLanguage.name}
                  >
                    <LucideCheck className="w-3 h-3 mr-1" />
                    Save Language
                  </Button>
                </div>
              </div>
            )}
            
            {/* Language Items */}
            {mainCV.languages && mainCV.languages.length > 0 ? (
              <div className="space-y-3">
                {mainCV.languages.map((language) => (
                  <div 
                    key={language.id} 
                    className="p-3 border border-gray-100 rounded-lg hover:border-[#DAA520]/40 transition-all bg-white"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium">{language.name}</div>
                        <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-2 py-0.5 text-[10px]">
                          {language.proficiency}
                        </Badge>
                      </div>
                      <div className="flex space-x-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 w-7 p-0 text-gray-400 hover:text-red-500 hover:bg-gray-50"
                          onClick={() => removeLanguage(language.id)}
                        >
                          <LucideTrash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
                <p className="text-gray-500 text-sm mb-3">No languages added yet</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleAddLanguageForm} 
                  className="text-xs"
                >
                  <LucidePlus className="w-3.5 h-3.5 mr-1" />
                  Add Your First Language
                </Button>
              </div>
            )}
          </motion.div>
        )}

        {/* References Section */}
        {activeSection === "references" && (
          <motion.div
            key="references"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">References</h2>
              <Button 
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-xs text-[#DAA520] hover:text-[#DAA520]/80 hover:bg-[#DAA520]/5"
                onClick={toggleAddReferenceForm}
              >
                <LucidePlus className="w-3 h-3 mr-1" />
                Add Reference
              </Button>
            </div>
            
            {/* Add Reference Form */}
            {showAddReferenceForm && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium">Add Reference</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/70 h-7 w-7 p-0"
                    onClick={toggleAddReferenceForm}
                  >
                    <LucideX className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
                    <Input
                      type="text"
                      name="name"
                      value={newReference.name}
                      onChange={handleReferenceChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                      placeholder="e.g. John Smith"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Position/Title</label>
                    <Input
                      type="text"
                      name="position"
                      value={newReference.position}
                      onChange={handleReferenceChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                      placeholder="e.g. Senior Manager"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Company/Organization</label>
                    <Input
                      type="text"
                      name="company"
                      value={newReference.company}
                      onChange={handleReferenceChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                      placeholder="e.g. ABC Corporation"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Relationship</label>
                    <Input
                      type="text"
                      name="relationship"
                      value={newReference.relationship}
                      onChange={handleReferenceChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                      placeholder="e.g. Direct Supervisor, Colleague"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Email (Optional)</label>
                    <Input
                      type="email"
                      name="email"
                      value={newReference.email}
                      onChange={handleReferenceChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                      placeholder="e.g. john.smith@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Phone (Optional)</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={newReference.phone}
                      onChange={handleReferenceChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                      placeholder="e.g. +1 123 456 7890"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end mt-4 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleAddReferenceForm}
                    className="text-xs h-8"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={addReference}
                    className="text-xs h-8 bg-black hover:bg-black/80"
                    disabled={!newReference.name || !newReference.position || !newReference.company || !newReference.relationship}
                  >
                    <LucideCheck className="w-3 h-3 mr-1" />
                    Save Reference
                  </Button>
                </div>
              </div>
            )}
            
            {/* Reference Items */}
            {mainCV.references && mainCV.references.length > 0 ? (
              <div className="space-y-3">
                {mainCV.references.map((reference) => (
                  <div 
                    key={reference.id} 
                    className="p-3 border border-gray-100 rounded-lg hover:border-[#DAA520]/40 transition-all bg-white"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-sm">{reference.name}</h3>
                        <p className="text-gray-500 text-xs mt-0.5">
                          {reference.position} at {reference.company}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {reference.relationship}
                        </p>
                        {(reference.email || reference.phone) && (
                          <div className="mt-1 flex flex-wrap gap-x-3 text-xs text-gray-500">
                            {reference.email && (
                              <span className="inline-flex items-center">
                                <i className="fas fa-envelope text-[#DAA520] mr-1 text-[10px]"></i>
                                {reference.email}
                              </span>
                            )}
                            {reference.phone && (
                              <span className="inline-flex items-center">
                                <i className="fas fa-phone text-[#DAA520] mr-1 text-[10px]"></i>
                                {reference.phone}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 w-7 p-0 text-gray-400 hover:text-red-500 hover:bg-gray-50"
                          onClick={() => removeReference(reference.id)}
                        >
                          <LucideTrash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
                <p className="text-gray-500 text-sm mb-3">No references added yet</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleAddReferenceForm} 
                  className="text-xs"
                >
                  <LucidePlus className="w-3.5 h-3.5 mr-1" />
                  Add Your First Reference
                </Button>
              </div>
            )}
          </motion.div>
        )}

        {/* Volunteer Section */}
        {activeSection === "volunteer" && (
          <motion.div
            key="volunteer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Volunteer Experience</h2>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-xs text-[#DAA520] hover:text-[#DAA520]/80 hover:bg-[#DAA520]/5"
                onClick={toggleAddVolunteerForm}
              >
                <LucidePlus className="w-3 h-3 mr-1" />
                Add Volunteer
              </Button>
            </div>

            {showAddVolunteerForm && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium">Add Volunteer Experience</h3>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/70 h-7 w-7 p-0" onClick={toggleAddVolunteerForm}>
                    <LucideX className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Organization</label>
                    <Input type="text" name="organization" value={newVolunteer.organization} onChange={handleVolunteerChange} className="w-full h-9 focus-visible:ring-[#DAA520]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Position</label>
                    <Input type="text" name="position" value={newVolunteer.position} onChange={handleVolunteerChange} className="w-full h-9 focus-visible:ring-[#DAA520]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
                    <Input type="month" name="startDate" value={newVolunteer.startDate} onChange={handleVolunteerChange} className="w-full h-9 focus-visible:ring-[#DAA520]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
                    <Input type="month" name="endDate" value={newVolunteer.endDate} onChange={handleVolunteerChange} className="w-full h-9 focus-visible:ring-[#DAA520]" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">URL (Optional)</label>
                    <Input type="url" name="url" value={newVolunteer.url} onChange={handleVolunteerChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="https://..." />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Summary</label>
                    <Textarea name="summary" value={newVolunteer.summary} onChange={handleVolunteerChange} className="w-full min-h-[80px] focus-visible:ring-[#DAA520]" />
                  </div>
                </div>

                <div className="flex justify-end mt-4 gap-2">
                  <Button variant="outline" size="sm" onClick={toggleAddVolunteerForm} className="text-xs h-8">Cancel</Button>
                  <Button size="sm" onClick={addVolunteer} className="text-xs h-8 bg-black hover:bg-black/80" disabled={!newVolunteer.organization || !newVolunteer.position}>
                    <LucideCheck className="w-3 h-3 mr-1" />
                    Save
                  </Button>
                </div>
              </div>
            )}

            {mainCV.volunteer && mainCV.volunteer.length > 0 ? (
              <div className="space-y-3">
                {mainCV.volunteer.map((vol) => (
                  <div key={vol.id} className="p-3 border border-gray-100 rounded-lg hover:border-[#DAA520]/40 transition-all bg-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-sm">{vol.position}</h3>
                        <p className="text-gray-600 text-xs">{vol.organization}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{vol.startDate} - {vol.endDate}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-400 hover:text-red-500 hover:bg-gray-50" onClick={() => removeVolunteer(vol.id)}>
                        <LucideTrash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                    {vol.summary && <p className="mt-2 text-xs text-gray-600">{vol.summary}</p>}
                    {vol.highlights && vol.highlights.length > 0 && (
                      <ul className="mt-1 list-disc list-inside text-xs text-gray-600">
                        {vol.highlights.map((h, i) => <li key={i}>{h}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
                <p className="text-gray-500 text-sm mb-3">No volunteer experience added yet</p>
                <Button variant="outline" size="sm" onClick={toggleAddVolunteerForm} className="text-xs">
                  <LucidePlus className="w-3.5 h-3.5 mr-1" />
                  Add Volunteer Experience
                </Button>
              </div>
            )}
          </motion.div>
        )}

        {/* Awards Section */}
        {activeSection === "awards" && (
          <motion.div
            key="awards"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Awards</h2>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-xs text-[#DAA520] hover:text-[#DAA520]/80 hover:bg-[#DAA520]/5"
                onClick={toggleAddAwardForm}
              >
                <LucidePlus className="w-3 h-3 mr-1" />
                Add Award
              </Button>
            </div>

            {showAddAwardForm && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium">Add Award</h3>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/70 h-7 w-7 p-0" onClick={toggleAddAwardForm}>
                    <LucideX className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Award Title</label>
                    <Input type="text" name="title" value={newAward.title} onChange={handleAwardChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. Employee of the Year" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Awarder</label>
                    <Input type="text" name="awarder" value={newAward.awarder} onChange={handleAwardChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. Company Name" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
                    <Input type="date" name="date" value={newAward.date} onChange={handleAwardChange} className="w-full h-9 focus-visible:ring-[#DAA520]" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Summary (Optional)</label>
                    <Textarea name="summary" value={newAward.summary} onChange={handleAwardChange} className="w-full min-h-[80px] focus-visible:ring-[#DAA520]" />
                  </div>
                </div>

                <div className="flex justify-end mt-4 gap-2">
                  <Button variant="outline" size="sm" onClick={toggleAddAwardForm} className="text-xs h-8">Cancel</Button>
                  <Button size="sm" onClick={addAward} className="text-xs h-8 bg-black hover:bg-black/80" disabled={!newAward.title || !newAward.awarder || !newAward.date}>
                    <LucideCheck className="w-3 h-3 mr-1" />
                    Save Award
                  </Button>
                </div>
              </div>
            )}

            {mainCV.awards && mainCV.awards.length > 0 ? (
              <div className="space-y-3">
                {mainCV.awards.map((award) => (
                  <div key={award.id} className="p-3 border border-gray-100 rounded-lg hover:border-[#DAA520]/40 transition-all bg-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-sm">{award.title}</h3>
                        <p className="text-gray-500 text-xs mt-0.5">{award.awarder} • {award.date}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-400 hover:text-red-500 hover:bg-gray-50" onClick={() => removeAward(award.id)}>
                        <LucideTrash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                    {award.summary && <p className="mt-2 text-xs text-gray-600">{award.summary}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
                <p className="text-gray-500 text-sm mb-3">No awards added yet</p>
                <Button variant="outline" size="sm" onClick={toggleAddAwardForm} className="text-xs">
                  <LucidePlus className="w-3.5 h-3.5 mr-1" />
                  Add Your First Award
                </Button>
              </div>
            )}
          </motion.div>
        )}

        {/* Interests Section */}
        {activeSection === "interests" && (
          <motion.div
            key="interests"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Interests</h2>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-xs text-[#DAA520] hover:text-[#DAA520]/80 hover:bg-[#DAA520]/5"
                onClick={toggleAddInterestForm}
              >
                <LucidePlus className="w-3 h-3 mr-1" />
                Add Interest
              </Button>
            </div>

            {showAddInterestForm && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium">Add Interest</h3>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/70 h-7 w-7 p-0" onClick={toggleAddInterestForm}>
                    <LucideX className="w-4 h-4" />
                  </Button>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Interest Name</label>
                  <Input type="text" name="name" value={newInterest.name} onChange={handleInterestChange} className="w-full h-9 focus-visible:ring-[#DAA520]" placeholder="e.g. Open Source, Photography, Gaming" />
                </div>

                <div className="flex justify-end mt-4 gap-2">
                  <Button variant="outline" size="sm" onClick={toggleAddInterestForm} className="text-xs h-8">Cancel</Button>
                  <Button size="sm" onClick={addInterest} className="text-xs h-8 bg-black hover:bg-black/80" disabled={!newInterest.name.trim()}>
                    <LucideCheck className="w-3 h-3 mr-1" />
                    Create Interest
                  </Button>
                </div>
              </div>
            )}

            {mainCV.interests && mainCV.interests.length > 0 ? (
              <div className="space-y-4">
                {mainCV.interests.map((interest) => (
                  <div key={interest.id} className="p-3 border border-gray-100 rounded-lg hover:border-[#DAA520]/40 transition-all bg-white">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-sm">{interest.name}</h3>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-400 hover:text-red-500 hover:bg-gray-50" onClick={() => removeInterest(interest.id)}>
                        <LucideTrash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {interest.keywords.map((kw, i) => (
                        <Badge key={i} variant="outline" className="bg-[#DAA520]/5 hover:bg-[#DAA520]/10 border-[#DAA520]/20 text-gray-700 py-0.5 px-2 rounded-full text-xs">
                          {kw}
                          <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1 text-gray-400 hover:text-red-500 hover:bg-transparent" onClick={() => removeInterestKeyword(interest.id, kw)}>
                            <LucideX className="w-3 h-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>

                    <div className="flex">
                      <Input
                        type="text"
                        value={newInterestKeyword}
                        onChange={(e) => setNewInterestKeyword(e.target.value)}
                        className="w-full h-8 text-xs focus-visible:ring-[#DAA520]"
                        placeholder="Add a keyword..."
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && newInterestKeyword.trim()) {
                            addInterestKeyword(interest.id);
                          }
                        }}
                      />
                      <Button size="sm" onClick={() => addInterestKeyword(interest.id)} disabled={!newInterestKeyword.trim()} className="ml-2 h-8 bg-black hover:bg-black/80 text-xs">
                        Add
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
                <p className="text-gray-500 text-sm mb-3">No interests added yet</p>
                <Button variant="outline" size="sm" onClick={toggleAddInterestForm} className="text-xs">
                  <LucidePlus className="w-3.5 h-3.5 mr-1" />
                  Add Your Interests
                </Button>
              </div>
            )}
          </motion.div>
        )}

        {/* Publications Section */}
        {activeSection === "publications" && (
          <motion.div
            key="publications"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Publications</h2>
              <Button 
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-xs text-[#DAA520] hover:text-[#DAA520]/80 hover:bg-[#DAA520]/5"
                onClick={toggleAddPublicationForm}
              >
                <LucidePlus className="w-3 h-3 mr-1" />
                Add Publication
              </Button>
            </div>
            
            {/* Add Publication Form */}
            {showAddPublicationForm && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium">Add Publication</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/70 h-7 w-7 p-0"
                    onClick={toggleAddPublicationForm}
                  >
                    <LucideX className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                    <Input
                      type="text"
                      name="title"
                      value={newPublication.title}
                      onChange={handlePublicationChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                      placeholder="e.g. The Impact of AI on Modern Business"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Publisher/Journal</label>
                    <Input
                      type="text"
                      name="publisher"
                      value={newPublication.publisher}
                      onChange={handlePublicationChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                      placeholder="e.g. Journal of Technology Innovation"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Publication Date</label>
                    <Input
                      type="date"
                      name="date"
                      value={newPublication.date}
                      onChange={handlePublicationChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">URL (Optional)</label>
                    <Input
                      type="url"
                      name="url"
                      value={newPublication.url}
                      onChange={handlePublicationChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                      placeholder="https://..."
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Description (Optional)</label>
                    <Textarea
                      name="description"
                      value={newPublication.description}
                      onChange={handlePublicationChange}
                      className="w-full min-h-[80px] focus-visible:ring-[#DAA520]"
                      placeholder="Brief description or abstract of the publication"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end mt-4 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleAddPublicationForm}
                    className="text-xs h-8"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={addPublication}
                    className="text-xs h-8 bg-black hover:bg-black/80"
                    disabled={!newPublication.title || !newPublication.publisher || !newPublication.date}
                  >
                    <LucideCheck className="w-3 h-3 mr-1" />
                    Save Publication
                  </Button>
                </div>
              </div>
            )}
            
            {/* Publication Items */}
            {mainCV.publications && mainCV.publications.length > 0 ? (
              <div className="space-y-3">
                {mainCV.publications.map((publication) => (
                  <div 
                    key={publication.id} 
                    className="p-3 border border-gray-100 rounded-lg hover:border-[#DAA520]/40 transition-all bg-white"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-sm">{publication.title}</h3>
                        <p className="text-gray-500 text-xs mt-0.5">
                          {publication.publisher} • Published {publication.date}
                        </p>
                      </div>
                      <div className="flex space-x-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 w-7 p-0 text-gray-400 hover:text-red-500 hover:bg-gray-50"
                          onClick={() => removePublication(publication.id)}
                        >
                          <LucideTrash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                    
                    {publication.description && (
                      <p className="mt-2 text-xs text-gray-600">{publication.description}</p>
                    )}
                    
                    {publication.url && (
                      <a 
                        href={publication.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="mt-2 inline-flex items-center text-xs text-[#DAA520] hover:underline"
                      >
                        <LucideChevronRight className="w-3 h-3 mr-0.5" />
                        View Publication
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
                <p className="text-gray-500 text-sm mb-3">No publications added yet</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleAddPublicationForm} 
                  className="text-xs"
                >
                  <LucidePlus className="w-3.5 h-3.5 mr-1" />
                  Add Your First Publication
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
