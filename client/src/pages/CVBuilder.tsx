import { useState } from "react";
import Layout from "@/components/Layout";
import CVBuilderForm from "@/components/CVBuilderForm";
import { Button } from "@/components/ui/button";
import { useCV } from "@/lib/context";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LucideFileText, LucideDownload, LucideShare2, LucideZap } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [activeSection, setActiveSection] = useState<SectionType>("personal");
  
  // Template options
  const templates = [
    { id: "modern", name: "Modern" },
    { id: "classic", name: "Classic" },
    { id: "minimalist", name: "Minimalist" },
    { id: "creative", name: "Creative" }
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
              onValueChange={(value) => setActiveTab(value as "edit" | "preview")}
              className="w-full mb-6"
            >
              <TabsList className="grid w-full grid-cols-2 rounded-full h-12 p-1 bg-gray-100">
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
                      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-3 ml-2">Sections</h3>
                        <div className="space-y-1">
                          {sections.map((section) => (
                            <button
                              key={section.id}
                              className={`w-full text-left flex items-center px-3 py-2 rounded-lg text-sm ${
                                activeSection === section.id
                                  ? 'bg-black/5 font-medium text-black'
                                  : 'text-gray-600 hover:bg-gray-50'
                              }`}
                              onClick={() => setActiveSection(section.id as SectionType)}
                            >
                              <i className={`fas fa-${section.icon} text-[#DAA520] w-5 text-center mr-2`}></i>
                              <span>{section.name}</span>
                            </button>
                          ))}
                        </div>
                        
                        <div className="mt-6 pt-6 border-t border-gray-100">
                          <Button
                            variant="outline"
                            className="w-full flex items-center justify-center text-sm border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
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
                            <div className="w-full h-full p-8 flex flex-col">
                              <h2 className="text-center font-bold text-2xl">{mainCV.personalInfo.fullName}</h2>
                              <p className="text-center text-gray-600 mb-4">{mainCV.personalInfo.title}</p>
                              
                              <div className="flex justify-center space-x-4 mb-6 text-sm text-gray-500">
                                <span>{mainCV.personalInfo.email}</span>
                                <span>•</span>
                                <span>{mainCV.personalInfo.phone}</span>
                                <span>•</span>
                                <span>{mainCV.personalInfo.location}</span>
                              </div>
                              
                              <div className="border-t border-gray-200 pt-4 mb-4">
                                <h3 className="font-semibold text-gray-800 mb-2">Professional Summary</h3>
                                <p className="text-sm text-gray-600">{mainCV.personalInfo.summary}</p>
                              </div>
                              
                              <div className="mb-4">
                                <h3 className="font-semibold text-gray-800 mb-2">Experience</h3>
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
                              
                              <div className="mb-4">
                                <h3 className="font-semibold text-gray-800 mb-2">Education</h3>
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
                              
                              <div>
                                <h3 className="font-semibold text-gray-800 mb-2">Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                  {mainCV.skills.map((skill, i) => (
                                    <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
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
                          <div className="grid grid-cols-2 gap-2">
                            {templates.map((template) => (
                              <div 
                                key={template.id}
                                className={`cursor-pointer transition-all rounded-lg overflow-hidden border ${
                                  activeTemplate === template.id 
                                    ? 'border-[#DAA520]/80 ring-1 ring-[#DAA520]/30' 
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                                onClick={() => setActiveTemplate(template.id)}
                              >
                                <div className="aspect-[1/1.414] bg-gray-50"></div>
                                <div className="p-1.5">
                                  <p className={`text-xs ${activeTemplate === template.id ? 'text-[#DAA520] font-medium' : 'text-gray-600'}`}>
                                    {template.name}
                                  </p>
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