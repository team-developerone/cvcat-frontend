import { useState } from "react";
import Layout from "@/components/Layout";
import CVBuilderForm from "@/components/CVBuilderForm";
import ChatBot from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import { useCV } from "@/lib/context";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LucideFileText, LucideDownload, LucideShare2, LucideZap, LucideMessageCircle } from "lucide-react";

// Available section types
export type SectionType = 
  | 'personal'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'languages'
  | 'references'
  | 'publications'
  | 'custom';

export default function CVBuilder() {
  const { mainCV } = useCV();
  const [activeTemplate, setActiveTemplate] = useState("modern");
  const [activeColor, setActiveColor] = useState("golden");
  const [activeTab, setActiveTab] = useState<"edit" | "preview" | "chat">("edit");
  const [activeSection, setActiveSection] = useState<SectionType>("personal");
  
  // Template options
  const templates = [
    { 
      id: "modern", 
      name: "Modern",
      description: "Clean and professional with a touch of elegance",
      headerStyle: "centered",
      accentStyle: "line",
      fontFamily: "Inter, sans-serif",
      spacing: "comfortable"
    },
    { 
      id: "classic", 
      name: "Classic",
      description: "Traditional layout with a timeless design",
      headerStyle: "left-aligned",
      accentStyle: "bold",
      fontFamily: "Georgia, serif",
      spacing: "compact" 
    },
    { 
      id: "minimalist", 
      name: "Minimalist",
      description: "Sleek and concise with minimal visual elements",
      headerStyle: "side",
      accentStyle: "subtle",
      fontFamily: "Inter, sans-serif",
      spacing: "airy"
    },
    { 
      id: "creative", 
      name: "Creative",
      description: "Bold design with unique visual elements",
      headerStyle: "banner",
      accentStyle: "dots",
      fontFamily: "Poppins, sans-serif",
      spacing: "balanced"
    },
    { 
      id: "executive", 
      name: "Executive",
      description: "Sophisticated design for senior professionals",
      headerStyle: "box",
      accentStyle: "double-line",
      fontFamily: "Merriweather, serif",
      spacing: "compact"
    },
    { 
      id: "technical", 
      name: "Technical",
      description: "Structured layout ideal for technical roles",
      headerStyle: "tabbed",
      accentStyle: "brackets",
      fontFamily: "Roboto Mono, monospace",
      spacing: "compact"
    }
  ];
  
  // Color options
  const colors = [
    { id: "golden", color: "#DAA520", selected: true },
    { id: "blue", color: "#3B82F6", selected: false },
    { id: "green", color: "#10B981", selected: false },
    { id: "purple", color: "#8B5CF6", selected: false },
    { id: "red", color: "#EF4444", selected: false }
  ];

  // Sections navigation
  const sections = [
    { id: 'personal', name: 'Personal Info', icon: 'user' },
    { id: 'experience', name: 'Experience', icon: 'briefcase' },
    { id: 'education', name: 'Education', icon: 'graduation-cap' },
    { id: 'skills', name: 'Skills', icon: 'star' },
    { id: 'projects', name: 'Projects', icon: 'code' },
    { id: 'certifications', name: 'Certifications', icon: 'certificate' },
    { id: 'languages', name: 'Languages', icon: 'language' },
    { id: 'references', name: 'References', icon: 'users' },
    { id: 'publications', name: 'Publications', icon: 'file-text' },
    { id: 'custom', name: 'Custom Sections', icon: 'plus-circle' }
  ];
  
  return (
    <Layout isAuthenticated={true}>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-screen-2xl mx-auto">
          <div className="p-4 md:p-6">
            <Tabs 
              defaultValue="edit" 
              value={activeTab} 
              onValueChange={(value) => setActiveTab(value as "edit" | "preview" | "chat")}
              className="w-full mb-6"
            >
              <TabsList className="grid w-full grid-cols-3 rounded-full h-12 p-1 bg-gray-100">
                <TabsTrigger 
                  value="edit" 
                  className="rounded-full data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm h-10"
                >
                  <LucideFileText className="w-4 h-4 mr-2" />
                  Edit CV
                </TabsTrigger>
                <TabsTrigger 
                  value="preview" 
                  className="rounded-full data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm h-10"
                >
                  <LucideZap className="w-4 h-4 mr-2" />
                  Preview
                </TabsTrigger>
                <TabsTrigger 
                  value="chat" 
                  className="rounded-full data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm h-10"
                >
                  <LucideMessageCircle className="w-4 h-4 mr-2" />
                  CV Assistant
                </TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <div className="flex flex-col lg:flex-row lg:gap-6">
                  {/* Left Panel: Section Navigation (visible only in edit mode) */}
                  {activeTab === "edit" && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="w-full lg:w-64 flex-shrink-0 mb-4 lg:mb-0"
                    >
                      <div className="bg-gray-900 p-4 rounded-xl shadow-sm">
                        <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-3 ml-2">Sections</h3>
                        <div className="space-y-1">
                          {sections.map((section) => (
                            <button
                              key={section.id}
                              className={`w-full text-left flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                                activeSection === section.id
                                  ? 'bg-[#DAA520]/10 font-medium text-white'
                                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                              }`}
                              onClick={() => setActiveSection(section.id as SectionType)}
                            >
                              <i className={`fas fa-${section.icon} text-[#DAA520] w-5 text-center mr-2`}></i>
                              <span>{section.name}</span>
                            </button>
                          ))}
                        </div>
                        
                        <div className="mt-6 pt-6 border-t border-gray-700">
                          <Button
                            variant="outline"
                            className="w-full flex items-center justify-center text-sm border-dashed border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white"
                            onClick={() => setActiveSection("custom")}
                          >
                            <i className="fas fa-plus-circle mr-2 text-[#DAA520]"></i>
                            Add Custom Section
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Middle Panel: CV Editor or Full Preview */}
                  <motion.div 
                    layout
                    className={`flex-1 ${activeTab === "edit" ? "lg:max-w-3xl" : "w-full"}`}
                  >
                    <TabsContent value="edit" className="mt-0">
                      <CVBuilderForm activeSection={activeSection} />
                    </TabsContent>
                    
                    <TabsContent value="preview" className="mt-0">
                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-xl font-bold">CV Preview</h2>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-500 hover:text-black hover:bg-gray-100"
                            >
                              <LucideDownload className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-500 hover:text-black hover:bg-gray-100"
                            >
                              <LucideShare2 className="w-4 h-4 mr-2" />
                              Share
                            </Button>
                          </div>
                        </div>
                        
                        <div className="aspect-[1/1.414] bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
                          {mainCV && (
                            <div className="w-full h-full overflow-auto" style={{ color: activeColor === "golden" ? "#000" : colors.find(c => c.id === activeColor)?.color }}>
                              {/* Modern Template */}
                              {activeTemplate === "modern" && (
                                <div className="p-8 w-full h-full flex flex-col overflow-auto" style={{ fontFamily: "Inter, sans-serif" }}>
                                  {/* Header - Modern Template */}
                                  <div className="text-center mb-6">
                                    <div className="w-24 h-0.5 bg-[#DAA520] mx-auto mb-3"></div>
                                    <h2 className="font-bold text-2xl">{mainCV.personalInfo.fullName}</h2>
                                    <p className="text-gray-600 mb-2">{mainCV.personalInfo.title}</p>
                                    <div className="flex justify-center flex-wrap gap-x-4 text-sm text-gray-500">
                                      <span>{mainCV.personalInfo.email}</span>
                                      <span>{mainCV.personalInfo.phone}</span>
                                      <span>{mainCV.personalInfo.location}</span>
                                    </div>
                                  </div>
                                  
                                  {/* Sections - Modern Template */}
                                  <div className="space-y-5">
                                    {/* Summary */}
                                    <div>
                                      <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                                        <span className="w-6 h-0.5 bg-[#DAA520] mr-2"></span>
                                        Professional Summary
                                      </h3>
                                      <p className="text-sm text-gray-600">{mainCV.personalInfo.summary}</p>
                                    </div>
                                    
                                    {/* Experience */}
                                    <div>
                                      <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                                        <span className="w-6 h-0.5 bg-[#DAA520] mr-2"></span>
                                        Experience
                                      </h3>
                                      <div className="space-y-3">
                                        {mainCV.experience.map((exp, i) => (
                                          <div key={i} className="text-sm">
                                            <div className="flex justify-between mb-1">
                                              <p className="font-medium">{exp.position}</p>
                                              <p className="text-gray-500">{exp.startDate} - {exp.endDate}</p>
                                            </div>
                                            <p className="text-gray-600 mb-1">{exp.company}</p>
                                            <p className="text-gray-600 text-xs">{exp.description}</p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    
                                    {/* Education */}
                                    <div>
                                      <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                                        <span className="w-6 h-0.5 bg-[#DAA520] mr-2"></span>
                                        Education
                                      </h3>
                                      <div className="space-y-3">
                                        {mainCV.education.map((edu, i) => (
                                          <div key={i} className="text-sm">
                                            <div className="flex justify-between mb-1">
                                              <p className="font-medium">{edu.degree}</p>
                                              <p className="text-gray-500">{edu.period}</p>
                                            </div>
                                            <p className="text-gray-600">{edu.institution}</p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    
                                    {/* Skills */}
                                    <div>
                                      <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                                        <span className="w-6 h-0.5 bg-[#DAA520] mr-2"></span>
                                        Skills
                                      </h3>
                                      <div className="flex flex-wrap gap-2">
                                        {mainCV.skills.map((skill, i) => (
                                          <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md">
                                            {skill}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                    
                                    {/* Projects */}
                                    {mainCV.projects && mainCV.projects.length > 0 && (
                                      <div>
                                        <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                                          <span className="w-6 h-0.5 bg-[#DAA520] mr-2"></span>
                                          Projects
                                        </h3>
                                        <div className="space-y-3">
                                          {mainCV.projects.map((project, i) => (
                                            <div key={i} className="text-sm">
                                              <div className="flex justify-between mb-1">
                                                <p className="font-medium">{project.title}</p>
                                                {(project.startDate || project.endDate) && (
                                                  <p className="text-gray-500">
                                                    {project.startDate}{project.endDate ? ` - ${project.endDate}` : ' - Present'}
                                                  </p>
                                                )}
                                              </div>
                                              <p className="text-gray-600 text-xs mb-1">{project.description}</p>
                                              <div className="flex flex-wrap gap-1">
                                                {project.technologies.map((tech, j) => (
                                                  <span key={j} className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                                                    {tech}
                                                  </span>
                                                ))}
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                    
                                    {/* Certifications */}
                                    {mainCV.certifications && mainCV.certifications.length > 0 && (
                                      <div>
                                        <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                                          <span className="w-6 h-0.5 bg-[#DAA520] mr-2"></span>
                                          Certifications
                                        </h3>
                                        <div className="space-y-2">
                                          {mainCV.certifications.map((cert, i) => (
                                            <div key={i} className="text-sm">
                                              <div className="flex justify-between mb-0.5">
                                                <p className="font-medium">{cert.name}</p>
                                                <p className="text-gray-500">{cert.date}</p>
                                              </div>
                                              <p className="text-gray-600">{cert.issuer}</p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                    
                                    {/* Languages */}
                                    {mainCV.languages && mainCV.languages.length > 0 && (
                                      <div>
                                        <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                                          <span className="w-6 h-0.5 bg-[#DAA520] mr-2"></span>
                                          Languages
                                        </h3>
                                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                                          {mainCV.languages.map((lang, i) => (
                                            <div key={i} className="text-sm">
                                              <span className="font-medium">{lang.name}:</span>
                                              <span className="text-gray-600 ml-1">{lang.proficiency}</span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                    
                                    {/* References */}
                                    {mainCV.references && mainCV.references.length > 0 && (
                                      <div>
                                        <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                                          <span className="w-6 h-0.5 bg-[#DAA520] mr-2"></span>
                                          References
                                        </h3>
                                        <div className="space-y-3">
                                          {mainCV.references.map((ref, i) => (
                                            <div key={i} className="text-sm">
                                              <p className="font-medium">{ref.name}</p>
                                              <p className="text-gray-600">{ref.position}, {ref.company}</p>
                                              <div className="flex gap-x-4 text-gray-500 text-xs mt-0.5">
                                                {ref.email && <span>{ref.email}</span>}
                                                {ref.phone && <span>{ref.phone}</span>}
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                    
                                    {/* Publications */}
                                    {mainCV.publications && mainCV.publications.length > 0 && (
                                      <div>
                                        <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                                          <span className="w-6 h-0.5 bg-[#DAA520] mr-2"></span>
                                          Publications
                                        </h3>
                                        <div className="space-y-3">
                                          {mainCV.publications.map((pub, i) => (
                                            <div key={i} className="text-sm">
                                              <div className="flex justify-between mb-0.5">
                                                <p className="font-medium italic">{pub.title}</p>
                                                <p className="text-gray-500">{pub.date}</p>
                                              </div>
                                              <p className="text-gray-600">{pub.publisher}</p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                    
                                    {/* Custom Sections */}
                                    {mainCV.customSections && mainCV.customSections.length > 0 && 
                                      mainCV.customSections.map((section, i) => (
                                        <div key={i}>
                                          <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                                            <span className="w-6 h-0.5 bg-[#DAA520] mr-2"></span>
                                            {section.title}
                                          </h3>
                                          <div className="space-y-3">
                                            {section.items.map((item, j) => (
                                              <div key={j} className="text-sm">
                                                <div className="flex justify-between mb-0.5">
                                                  <p className="font-medium">{item.title}</p>
                                                  {item.date && <p className="text-gray-500">{item.date}</p>}
                                                </div>
                                                {item.subtitle && <p className="text-gray-600">{item.subtitle}</p>}
                                                {item.description && <p className="text-gray-600 text-xs mt-1">{item.description}</p>}
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      ))
                                    }
                                  </div>
                                </div>
                              )}

                              {/* Classic Template */}
                              {activeTemplate === "classic" && (
                                <div className="p-8 w-full h-full flex flex-col overflow-auto" style={{ fontFamily: "Georgia, serif" }}>
                                  {/* Header - Classic Template */}
                                  <div className="mb-4">
                                    <h2 className="font-bold text-3xl">{mainCV.personalInfo.fullName}</h2>
                                    <p className="text-gray-700 font-semibold italic mb-2">{mainCV.personalInfo.title}</p>
                                    <div className="text-sm text-gray-600">
                                      <div>{mainCV.personalInfo.email} • {mainCV.personalInfo.phone}</div>
                                      <div>{mainCV.personalInfo.location}</div>
                                    </div>
                                  </div>
                                  
                                  <div className="w-full h-px bg-gray-300 my-4"></div>
                                  
                                  {/* Sections - Classic Template */}
                                  <div className="space-y-6">
                                    {/* Summary */}
                                    <div>
                                      <h3 className="font-bold text-gray-800 mb-2 uppercase tracking-wide">SUMMARY</h3>
                                      <p className="text-sm text-gray-700 leading-relaxed">{mainCV.personalInfo.summary}</p>
                                    </div>
                                    
                                    {/* Experience */}
                                    <div>
                                      <h3 className="font-bold text-gray-800 mb-3 uppercase tracking-wide">EXPERIENCE</h3>
                                      <div className="space-y-4">
                                        {mainCV.experience.map((exp, i) => (
                                          <div key={i} className="text-sm">
                                            <p className="font-bold">{exp.position}</p>
                                            <div className="flex justify-between text-gray-700 italic mb-1">
                                              <p>{exp.company}</p>
                                              <p>{exp.startDate} - {exp.endDate}</p>
                                            </div>
                                            <p className="text-gray-700">{exp.description}</p>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    
                                    {/* Education */}
                                    <div>
                                      <h3 className="font-bold text-gray-800 mb-3 uppercase tracking-wide">EDUCATION</h3>
                                      <div className="space-y-3">
                                        {mainCV.education.map((edu, i) => (
                                          <div key={i} className="text-sm">
                                            <p className="font-bold">{edu.degree}</p>
                                            <div className="flex justify-between text-gray-700 italic">
                                              <p>{edu.institution}</p>
                                              <p>{edu.period}</p>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    
                                    {/* Skills */}
                                    <div>
                                      <h3 className="font-bold text-gray-800 mb-2 uppercase tracking-wide">SKILLS</h3>
                                      <p className="text-sm text-gray-700">
                                        {mainCV.skills.join(', ')}
                                      </p>
                                    </div>

                                    {/* Other sections can be added for the classic template */}
                                  </div>
                                </div>
                              )}
                              
                              {/* Minimalist Template */}
                              {activeTemplate === "minimalist" && (
                                <div className="flex w-full h-full overflow-auto" style={{ fontFamily: "Inter, sans-serif" }}>
                                  <div className="w-1/3 bg-gray-50 p-6 flex flex-col">
                                    <h2 className="font-bold text-xl mb-4">{mainCV.personalInfo.fullName}</h2>
                                    <p className="text-gray-600 mb-2 text-sm">{mainCV.personalInfo.title}</p>
                                    
                                    <div className="space-y-1 text-sm text-gray-600 mb-6">
                                      <p>{mainCV.personalInfo.email}</p>
                                      <p>{mainCV.personalInfo.phone}</p>
                                      <p>{mainCV.personalInfo.location}</p>
                                    </div>
                                    
                                    <div className="space-y-6 mt-6">
                                      <div>
                                        <h3 className="text-xs uppercase tracking-wider font-medium mb-2">Skills</h3>
                                        <div className="space-y-1.5">
                                          {mainCV.skills.map((skill, i) => (
                                            <div key={i} className="text-xs">{skill}</div>
                                          ))}
                                        </div>
                                      </div>
                                      
                                      {mainCV.languages && mainCV.languages.length > 0 && (
                                        <div>
                                          <h3 className="text-xs uppercase tracking-wider font-medium mb-2">Languages</h3>
                                          <div className="space-y-1.5">
                                            {mainCV.languages.map((lang, i) => (
                                              <div key={i} className="text-xs">
                                                <span>{lang.name}:</span>
                                                <span className="text-gray-500 ml-1">{lang.proficiency}</span>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <div className="w-2/3 p-6 flex flex-col">
                                    <p className="text-sm text-gray-700 mb-6">
                                      {mainCV.personalInfo.summary}
                                    </p>
                                    
                                    <div className="space-y-6">
                                      <div>
                                        <h3 className="text-sm font-medium border-b border-gray-200 pb-1 mb-3">
                                          Experience
                                        </h3>
                                        <div className="space-y-4">
                                          {mainCV.experience.map((exp, i) => (
                                            <div key={i} className="text-xs">
                                              <p className="font-medium">{exp.position}</p>
                                              <div className="flex justify-between text-gray-500 mb-1">
                                                <p>{exp.company}</p>
                                                <p>{exp.startDate} - {exp.endDate}</p>
                                              </div>
                                              <p className="text-gray-600">{exp.description}</p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                      
                                      <div>
                                        <h3 className="text-sm font-medium border-b border-gray-200 pb-1 mb-3">
                                          Education
                                        </h3>
                                        <div className="space-y-3">
                                          {mainCV.education.map((edu, i) => (
                                            <div key={i} className="text-xs">
                                              <p className="font-medium">{edu.degree}</p>
                                              <div className="flex justify-between text-gray-500">
                                                <p>{edu.institution}</p>
                                                <p>{edu.period}</p>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                      
                                      {/* Other sections could be added for the minimalist template */}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Creative Template */}
                              {activeTemplate === "creative" && (
                                <div className="w-full h-full overflow-auto" style={{ fontFamily: "Poppins, sans-serif" }}>
                                  <div className="h-24 bg-[#DAA520]/20 w-full px-8 flex items-center">
                                    <div>
                                      <h2 className="font-bold text-2xl">{mainCV.personalInfo.fullName}</h2>
                                      <p className="text-gray-600">{mainCV.personalInfo.title}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="p-8">
                                    <div className="flex flex-wrap gap-4 mb-6 text-sm">
                                      <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-[#DAA520]"></div>
                                        <span>{mainCV.personalInfo.email}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-[#DAA520]"></div>
                                        <span>{mainCV.personalInfo.phone}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-[#DAA520]"></div>
                                        <span>{mainCV.personalInfo.location}</span>
                                      </div>
                                    </div>
                                    
                                    <div className="space-y-6">
                                      <div>
                                        <p className="text-sm mb-6">{mainCV.personalInfo.summary}</p>
                                      </div>
                                      
                                      <div>
                                        <h3 className="text-lg font-semibold mb-3">Experience</h3>
                                        <div className="space-y-4">
                                          {mainCV.experience.map((exp, i) => (
                                            <div key={i} className="relative pl-4 border-l-2 border-[#DAA520]/30">
                                              <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-[#DAA520]"></div>
                                              <p className="font-semibold">{exp.position}</p>
                                              <div className="flex justify-between text-sm text-gray-600 mb-1">
                                                <p>{exp.company}</p>
                                                <p>{exp.startDate} - {exp.endDate}</p>
                                              </div>
                                              <p className="text-sm text-gray-600">{exp.description}</p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                      
                                      {/* Other sections could be added for the creative template */}
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {/* Add Executive and Technical templates here */}
                            </div>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="chat" className="mt-0">
                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-[80vh]">
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-xl font-bold">CV Assistant</h2>
                          <p className="text-sm text-gray-500">
                            Ask for advice or tips about your CV
                          </p>
                        </div>
                        <div className="h-[calc(80vh-120px)]">
                          <ChatBot />
                        </div>
                      </div>
                    </TabsContent>
                  </motion.div>
                  
                  {/* Right Panel: Design Options (visible in both modes) */}
                  {(activeTab === "edit" || (activeTab === "preview" && window.innerWidth >= 1280)) && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="lg:w-64 flex-shrink-0 mt-4 lg:mt-0"
                    >
                      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="mb-5">
                          <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-3 ml-2">Template</h3>
                          <div className="grid grid-cols-2 gap-3">
                            {templates.map((template) => (
                              <div 
                                key={template.id}
                                className={`cursor-pointer transition-all rounded-lg overflow-hidden border ${
                                  activeTemplate === template.id 
                                    ? 'border-[#DAA520]/80 ring-1 ring-[#DAA520]/30 shadow-md' 
                                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                }`}
                                onClick={() => setActiveTemplate(template.id)}
                              >
                                <div className="aspect-[1/1.414] bg-white relative">
                                  {/* Template Preview */}
                                  {template.id === "modern" && (
                                    <div className="absolute inset-0 flex flex-col p-2">
                                      <div className="text-center">
                                        <div className="w-16 h-0.5 bg-[#DAA520] mx-auto mb-1"></div>
                                        <div className="w-10 h-1.5 bg-gray-800 mx-auto mb-1 rounded-sm"></div>
                                        <div className="w-20 h-0.5 bg-gray-300 mx-auto"></div>
                                      </div>
                                      <div className="flex justify-center mt-2 space-x-1">
                                        <div className="w-4 h-0.5 bg-gray-200"></div>
                                        <div className="w-4 h-0.5 bg-gray-200"></div>
                                        <div className="w-4 h-0.5 bg-gray-200"></div>
                                      </div>
                                      <div className="mt-auto space-y-1 px-1">
                                        {[1,2,3].map(i => (
                                          <div key={i} className="flex items-center">
                                            <div className="w-8 h-0.5 bg-[#DAA520]/40"></div>
                                            <div className="flex-1 ml-1">
                                              <div className="w-full h-0.5 bg-gray-100"></div>
                                              <div className="w-3/4 h-0.5 bg-gray-100 mt-0.5"></div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  {template.id === "classic" && (
                                    <div className="absolute inset-0 flex flex-col p-2">
                                      <div className="text-left">
                                        <div className="w-10 h-1.5 bg-gray-800 rounded-sm mb-1"></div>
                                        <div className="w-16 h-0.5 bg-gray-300"></div>
                                      </div>
                                      <div className="w-full mt-2 h-px bg-gray-200"></div>
                                      <div className="mt-2">
                                        <div className="w-8 h-1 bg-gray-800 mb-1 rounded-sm"></div>
                                        {[1,2].map(i => (
                                          <div key={i} className="flex items-center mt-1">
                                            <div className="w-full h-0.5 bg-gray-100"></div>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="mt-2">
                                        <div className="w-8 h-1 bg-gray-800 mb-1 rounded-sm"></div>
                                        {[1,2].map(i => (
                                          <div key={i} className="flex items-center mt-1">
                                            <div className="w-full h-0.5 bg-gray-100"></div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  {template.id === "minimalist" && (
                                    <div className="absolute inset-0 flex p-2">
                                      <div className="w-1/3 border-r border-gray-100 pr-1">
                                        <div className="w-full h-2 bg-gray-800 rounded-sm mb-2"></div>
                                        <div className="w-full h-0.5 bg-gray-100 mb-0.5"></div>
                                        <div className="w-2/3 h-0.5 bg-gray-100 mb-0.5"></div>
                                        <div className="w-full h-0.5 bg-gray-100 mb-0.5"></div>
                                        <div className="mt-2 w-full h-0.5 bg-gray-200"></div>
                                        <div className="w-full h-0.5 bg-gray-100 mt-1 mb-0.5"></div>
                                        <div className="w-full h-0.5 bg-gray-100 mb-0.5"></div>
                                      </div>
                                      <div className="w-2/3 pl-1 space-y-2">
                                        <div>
                                          <div className="w-12 h-0.5 bg-[#DAA520]"></div>
                                          <div className="w-full h-0.5 bg-gray-100 mt-1 mb-0.5"></div>
                                          <div className="w-full h-0.5 bg-gray-100 mb-0.5"></div>
                                        </div>
                                        <div>
                                          <div className="w-12 h-0.5 bg-[#DAA520]"></div>
                                          <div className="w-full h-0.5 bg-gray-100 mt-1 mb-0.5"></div>
                                          <div className="w-full h-0.5 bg-gray-100 mb-0.5"></div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {template.id === "creative" && (
                                    <div className="absolute inset-0 flex flex-col p-2">
                                      <div className="h-5 w-full bg-[#DAA520]/20 -mx-2 -mt-2 px-2 pt-1 mb-2">
                                        <div className="w-10 h-1 bg-gray-800 rounded-sm"></div>
                                        <div className="w-16 h-0.5 bg-gray-600 mt-1"></div>
                                      </div>
                                      <div className="mt-1">
                                        <div className="flex items-center gap-1 mb-1">
                                          <div className="w-1 h-1 rounded-full bg-[#DAA520]"></div>
                                          <div className="w-12 h-0.5 bg-gray-200"></div>
                                        </div>
                                        <div className="flex items-center gap-1 mb-1">
                                          <div className="w-1 h-1 rounded-full bg-[#DAA520]"></div>
                                          <div className="w-16 h-0.5 bg-gray-200"></div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <div className="w-1 h-1 rounded-full bg-[#DAA520]"></div>
                                          <div className="w-10 h-0.5 bg-gray-200"></div>
                                        </div>
                                      </div>
                                      <div className="mt-auto mb-1 flex flex-wrap gap-0.5">
                                        {[1,2,3,4,5].map(i => (
                                          <div key={i} className="w-2 h-1 bg-gray-100"></div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  {template.id === "executive" && (
                                    <div className="absolute inset-0 flex flex-col p-2">
                                      <div className="flex items-center mb-2">
                                        <div className="flex-1">
                                          <div className="w-10 h-1.5 bg-gray-800 rounded-sm mb-1"></div>
                                          <div className="w-16 h-0.5 bg-gray-400"></div>
                                        </div>
                                        <div className="w-4 h-4 border-2 border-[#DAA520] rounded-sm"></div>
                                      </div>
                                      <div className="w-full h-0.5 border-t border-b border-gray-300"></div>
                                      <div className="mt-2 space-y-2">
                                        <div>
                                          <div className="w-12 h-0.5 bg-gray-800 mb-1"></div>
                                          <div className="w-full h-0.5 bg-gray-100"></div>
                                          <div className="w-full h-0.5 bg-gray-100 mt-0.5"></div>
                                        </div>
                                        <div>
                                          <div className="w-12 h-0.5 bg-gray-800 mb-1"></div>
                                          <div className="w-full h-0.5 bg-gray-100"></div>
                                          <div className="w-full h-0.5 bg-gray-100 mt-0.5"></div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {template.id === "technical" && (
                                    <div className="absolute inset-0 flex flex-col p-2">
                                      <div className="text-left mb-1">
                                        <div className="w-12 h-1 bg-gray-800 rounded-sm mb-0.5"></div>
                                        <div className="w-16 h-0.5 bg-gray-400 mb-1"></div>
                                        <div className="font-mono text-[5px] text-gray-400">&lt;summary&gt;</div>
                                        <div className="w-full h-0.5 bg-gray-100 mb-0.5 ml-1"></div>
                                        <div className="font-mono text-[5px] text-gray-400">&lt;/summary&gt;</div>
                                      </div>
                                      <div className="font-mono text-[5px] text-gray-400">&lt;experience&gt;</div>
                                      <div className="ml-1">
                                        <div className="w-full h-0.5 bg-gray-100 mt-0.5"></div>
                                        <div className="w-2/3 h-0.5 bg-gray-100 mt-0.5"></div>
                                      </div>
                                      <div className="font-mono text-[5px] text-gray-400">&lt;/experience&gt;</div>
                                      <div className="mt-1 flex flex-wrap gap-1">
                                        {[1,2,3,4].map(i => (
                                          <div key={i} className="px-0.5 py-px bg-gray-100 rounded">
                                            <div className="w-3 h-0.5 bg-[#DAA520]/50"></div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div className="p-1.5">
                                  <p className={`text-xs ${activeTemplate === template.id ? 'text-[#DAA520] font-medium' : 'text-gray-600'}`}>
                                    {template.name}
                                  </p>
                                  <p className="text-[10px] text-gray-400 truncate">{template.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mb-5">
                          <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-3 ml-2">Color</h3>
                          <div className="flex flex-wrap gap-2">
                            {colors.map((color) => (
                              <button 
                                key={color.id}
                                className="relative w-7 h-7 rounded-full transition-all"
                                style={{ 
                                  backgroundColor: color.color,
                                }}
                                onClick={() => setActiveColor(color.id)}
                              >
                                {activeColor === color.id && (
                                  <span className="absolute inset-0 rounded-full ring-2 ring-black/10 ring-offset-2 ring-offset-white"></span>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div className="pb-2">
                          <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-3 ml-2">Actions</h3>
                          <div className="space-y-2">
                            <Button
                              className="w-full bg-black text-white hover:bg-black/90 text-xs py-2 h-9"
                            >
                              <LucideDownload className="w-3.5 h-3.5 mr-2" />
                              Download as PDF
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full text-xs py-2 h-9"
                            >
                              <LucideShare2 className="w-3.5 h-3.5 mr-2" />
                              Share CV Link
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
}