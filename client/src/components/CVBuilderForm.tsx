import { useState, useEffect } from "react";
import { useCV } from "@/lib/context";
import { useFormState } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  WorkExperience, 
  Education, 
  Project, 
  Certification, 
  Language, 
  Reference, 
  Publication, 
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
  const [newSkill, setNewSkill] = useState("");
  
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
  }, [activeSection]);
  
  // Form state for new experience
  const { formData: newExperience, handleChange: handleExperienceChange, resetForm: resetExperienceForm } = useFormState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: ""
  });
  
  // Form state for new education
  const { formData: newEducation, handleChange: handleEducationChange, resetForm: resetEducationForm } = useFormState({
    institution: "",
    degree: "",
    period: "",
    description: ""
  });
  
  // Form state for new project
  const { formData: newProject, handleChange: handleProjectChange, resetForm: resetProjectForm } = useFormState({
    title: "",
    description: "",
    technologies: "",
    url: "",
    startDate: "",
    endDate: ""
  });
  
  // Form state for new certification
  const { formData: newCertification, handleChange: handleCertificationChange, resetForm: resetCertificationForm } = useFormState({
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
  
  // Toggle add experience form
  const toggleAddExperienceForm = () => {
    setShowAddExperienceForm(!showAddExperienceForm);
    if (!showAddExperienceForm) {
      resetExperienceForm();
    }
  };
  
  // Toggle add education form
  const toggleAddEducationForm = () => {
    setShowAddEducationForm(!showAddEducationForm);
    if (!showAddEducationForm) {
      resetEducationForm();
    }
  };
  
  // Toggle add skill form
  const toggleAddSkillForm = () => {
    setShowAddSkillForm(!showAddSkillForm);
    if (!showAddSkillForm) {
      setNewSkill("");
    }
  };
  
  // Toggle add project form
  const toggleAddProjectForm = () => {
    setShowAddProjectForm(!showAddProjectForm);
    if (!showAddProjectForm) {
      resetProjectForm();
    }
  };
  
  // Toggle add certification form
  const toggleAddCertificationForm = () => {
    setShowAddCertificationForm(!showAddCertificationForm);
    if (!showAddCertificationForm) {
      resetCertificationForm();
    }
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
  
  // Add new experience
  const addExperience = () => {
    if (!mainCV) return;
    
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
  };
  
  // Add new education
  const addEducation = () => {
    if (!mainCV) return;
    
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: newEducation.institution,
      degree: newEducation.degree,
      period: newEducation.period,
      description: newEducation.description
    };
    
    setMainCV({
      ...mainCV,
      education: [newEdu, ...mainCV.education],
      lastUpdated: new Date()
    });
    
    toggleAddEducationForm();
  };
  
  // Add new skill
  const addSkill = () => {
    if (!mainCV || !newSkill.trim()) return;
    
    setMainCV({
      ...mainCV,
      skills: [...mainCV.skills, newSkill.trim()],
      lastUpdated: new Date()
    });
    
    setNewSkill("");
  };
  
  // Add new project
  const addProject = () => {
    if (!mainCV) return;
    
    const technologies = newProject.technologies.split(',').map(tech => tech.trim()).filter(tech => tech);
    
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
  };
  
  // Add new certification
  const addCertification = () => {
    if (!mainCV) return;
    
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
  
  // Remove skill
  const removeSkill = (skillToRemove: string) => {
    if (!mainCV) return;
    
    setMainCV({
      ...mainCV,
      skills: mainCV.skills.filter(skill => skill !== skillToRemove),
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
  
  // Remove custom section
  const removeCustomSection = (id: string) => {
    if (!mainCV || !mainCV.customSections) return;
    
    setMainCV({
      ...mainCV,
      customSections: mainCV.customSections.filter(section => section.id !== id),
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
            
            {/* Add Experience Form */}
            {showAddExperienceForm && (
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
                  <div 
                    key={exp.id} 
                    className="p-3 border border-gray-100 rounded-lg hover:border-[#DAA520]/40 transition-all bg-white"
                  >
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
                  <h3 className="text-sm font-medium">Add Education</h3>
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
                  <div>
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
                    <label className="block text-xs font-medium text-gray-600 mb-1">Degree</label>
                    <Input
                      type="text"
                      name="degree"
                      value={newEducation.degree}
                      onChange={handleEducationChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Period</label>
                    <Input
                      type="text"
                      name="period"
                      value={newEducation.period}
                      onChange={handleEducationChange}
                      className="w-full h-9 focus-visible:ring-[#DAA520]"
                      placeholder="e.g. 2015 - 2019"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Description (Optional)</label>
                    <Textarea
                      name="description"
                      value={newEducation.description}
                      onChange={handleEducationChange}
                      className="w-full min-h-[80px] focus-visible:ring-[#DAA520]"
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
                    Save
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
                        <h3 className="font-medium text-sm">{edu.degree}</h3>
                        <p className="text-gray-600 text-xs">{edu.institution}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{edu.period}</p>
                      </div>
                      <div className="flex space-x-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 w-7 p-0 text-gray-400 hover:text-[#DAA520] hover:bg-gray-50"
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
                    {edu.description && (
                      <p className="mt-2 text-xs text-gray-600">{edu.description}</p>
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
                Add Skill
              </Button>
            </div>
            
            {/* Add Skill Form */}
            {showAddSkillForm && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium">Add Skill</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-400 hover:text-gray-600 hover:bg-gray-100/70 h-7 w-7 p-0"
                    onClick={toggleAddSkillForm}
                  >
                    <LucideX className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex">
                  <Input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="w-full h-9 focus-visible:ring-[#DAA520]"
                    placeholder="Enter a skill (e.g. JavaScript, Project Management)"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newSkill.trim()) {
                        addSkill();
                      }
                    }}
                  />
                  <Button
                    size="sm"
                    onClick={addSkill}
                    disabled={!newSkill.trim()}
                    className="ml-2 h-9 bg-black hover:bg-black/80 text-xs"
                  >
                    Add
                  </Button>
                </div>
                
                <p className="text-xs text-gray-500 mt-2">Press Enter to add multiple skills quickly</p>
              </div>
            )}
            
            {/* Skills Items */}
            {mainCV.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {mainCV.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-[#DAA520]/5 hover:bg-[#DAA520]/10 border-[#DAA520]/20 text-gray-700 py-1 px-3 rounded-full text-xs"
                  >
                    {skill}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1.5 text-gray-400 hover:text-red-500 hover:bg-transparent"
                      onClick={() => removeSkill(skill)}
                    >
                      <LucideX className="w-3 h-3" />
                    </Button>
                  </Badge>
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
                  <h3 className="text-sm font-medium">Add Project</h3>
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
                    Save
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
        
        {/* Placeholder for other sections */}
        {(activeSection === "certifications" || 
          activeSection === "languages" || 
          activeSection === "references" || 
          activeSection === "publications" || 
          activeSection === "custom") && (
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center justify-center py-10"
          >
            <h2 className="text-lg font-medium mb-3 capitalize">{activeSection}</h2>
            <p className="text-gray-500 text-sm mb-5">This section is ready to be customized</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs"
            >
              <LucidePlus className="w-3.5 h-3.5 mr-1" />
              Add {activeSection === "custom" ? "Custom Section" : activeSection}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
