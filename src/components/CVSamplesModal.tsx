import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// CV Sample Layout Types - Using the exact templates from CV builder
type CVLayoutStyle = "modern" | "classic" | "minimalist" | "creative" | "executive";

interface CVSamplesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVSamplesModal({ isOpen, onClose }: CVSamplesModalProps) {
  const [activeLayout, setActiveLayout] = useState<CVLayoutStyle>("modern");

  // These are the exact templates from the CV builder
  const layouts = [
    { 
      id: "modern", 
      name: "Modern",
      description: "Clean and professional with a touch of elegance",
      headerStyle: "centered",
      accentStyle: "line",
      fontFamily: "Inter, sans-serif",
      spacing: "comfortable",
      color: "#3498DB"
    },
    { 
      id: "classic", 
      name: "Classic",
      description: "Traditional layout with a timeless design",
      headerStyle: "left-aligned",
      accentStyle: "bold",
      fontFamily: "Georgia, serif",
      spacing: "compact",
      color: "#2C3E50" 
    },
    { 
      id: "minimalist", 
      name: "Minimalist",
      description: "Sleek and concise with minimal visual elements",
      headerStyle: "side",
      accentStyle: "subtle",
      fontFamily: "Inter, sans-serif",
      spacing: "airy",
      color: "#34495E"
    },
    { 
      id: "creative", 
      name: "Creative",
      description: "Bold design with unique visual elements",
      headerStyle: "banner",
      accentStyle: "dots",
      fontFamily: "Poppins, sans-serif",
      spacing: "balanced",
      color: "#9B59B6"
    },
    {
      id: "executive",
      name: "Executive",
      description: "Sophisticated design for senior professionals",
      headerStyle: "corporate",
      accentStyle: "elegant",
      fontFamily: "Merriweather, serif",
      spacing: "formal",
      color: "#1E3A8A"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-white">
        <DialogHeader className="px-6 pt-6 pb-2 border-b-2 border-gray-100">
          <DialogTitle className="text-xl font-bold text-black">CV Sample Templates</DialogTitle>
        </DialogHeader>
        
        <div className="p-4">
          <Tabs defaultValue="modern" className="w-full" onValueChange={(value) => setActiveLayout(value as CVLayoutStyle)}>
            <TabsList className="grid grid-cols-5 mb-4">
              {layouts.map((layout) => (
                <TabsTrigger 
                  key={layout.id} 
                  value={layout.id}
                  className={cn(
                    "text-xs py-2 data-[state=active]:border-b-2 data-[state=active]:border-[#DAA520]",
                    activeLayout === layout.id ? "font-bold" : "font-medium"
                  )}
                >
                  {layout.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {layouts.map((layout) => (
              <TabsContent key={layout.id} value={layout.id} className="mt-0">
                <div className="mb-3">
                  <p className="text-xs text-gray-600">{layout.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 md:col-span-1">
                    <CVTemplate layout={layout.id as CVLayoutStyle} />
                  </div>
                  
                  <div className="col-span-2 md:col-span-1 bg-gray-50 p-4 rounded-md border-2 border-gray-200">
                    <h4 className="text-sm font-bold mb-2">Key Features:</h4>
                    <ul className="text-xs space-y-1.5">
                      {layout.id === "classic" && (
                        <>
                          <li className="flex items-start">
                            <span className="text-[#DAA520] mr-1.5">•</span>
                            <span>Traditional left-aligned header with clear contact information</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#DAA520] mr-1.5">•</span>
                            <span>Bold section titles with underlines for clear navigation</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#DAA520] mr-1.5">•</span>
                            <span>Formal language and compact spacing for maximum content</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#DAA520] mr-1.5">•</span>
                            <span>Chronological presentation of experience and achievements</span>
                          </li>
                        </>
                      )}
                      {layout.id === "modern" && (
                        <>
                          <li className="flex items-start">
                            <span className="text-[#DAA520] mr-1.5">•</span>
                            <span>Centered header layout with clean typography</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#DAA520] mr-1.5">•</span>
                            <span>Sidebar design for contact information and skills</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#DAA520] mr-1.5">•</span>
                            <span>Vertical accent lines highlight important sections</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#DAA520] mr-1.5">•</span>
                            <span>Comfortable spacing for improved readability</span>
                          </li>
                        </>
                      )}
                      {layout.id === "creative" && (
                        <>
                          <li className="flex items-start">
                            <span className="text-[#DAA520] mr-1.5">•</span>
                            <span>Banner-style header with personal branding elements</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#DAA520] mr-1.5">•</span>
                            <span>Dot accents and visual elements for unique presentation</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#DAA520] mr-1.5">•</span>
                            <span>Grid-based layout for dynamic content organization</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#DAA520] mr-1.5">•</span>
                            <span>Bold colors and distinctive visual hierarchy</span>
                          </li>
                        </>
                      )}
                      {layout.id === "minimalist" && (
                        <>
                          <li className="flex items-start">
                            <span className="text-[#DAA520] mr-1.5">•</span>
                            <span>Side-by-side layout for concise information display</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#DAA520] mr-1.5">•</span>
                            <span>Subtle design elements with clean, airy typography</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#DAA520] mr-1.5">•</span>
                            <span>Ample white space with condensed, essential content</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#DAA520] mr-1.5">•</span>
                            <span>Understated section headers for elegant simplicity</span>
                          </li>
                        </>
                      )}
                      {layout.id === "executive" && (
                        <>
                          <li className="flex items-start">
                            <span className="text-[#DAA520] mr-1.5">•</span>
                            <span>Corporate header style with professional color scheme</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#DAA520] mr-1.5">•</span>
                            <span>Elegant section separators with subtle accents</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#DAA520] mr-1.5">•</span>
                            <span>Formal spacing and sophisticated typography</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-[#DAA520] mr-1.5">•</span>
                            <span>Enhanced emphasis on leadership and achievements</span>
                          </li>
                        </>
                      )}
                    </ul>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-bold mb-2">Best For:</h4>
                      <p className="text-xs">
                        {layout.id === "classic" && "Finance, Law, Executive Positions, Traditional Industries"}
                        {layout.id === "modern" && "Tech, Marketing, Middle Management, Most Corporate Roles"}
                        {layout.id === "creative" && "Design, Arts, Media, Advertising, Entertainment"}
                        {layout.id === "minimalist" && "Experienced Professionals, Academia, Research, Technical Roles"}
                        {layout.id === "executive" && "Senior Management, C-Suite Executives, Corporate Leadership"}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <Button 
                    className="bg-black hover:bg-[#DAA520] text-white text-xs font-medium py-2 px-4 rounded shadow-sm transition-all"
                    onClick={() => onClose()}
                  >
                    Get Started with This Template
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// CV Template Preview Component
function CVTemplate({ layout }: { layout: CVLayoutStyle }) {
  // Sample data for the CV templates
  const personalInfo = {
    name: "Alex Morgan",
    title: "Senior Software Engineer",
    email: "alex.morgan@example.com",
    phone: "+91 98765 43210",
    location: "Bangalore, India",
    summary: "Experienced software engineer with 7+ years specializing in full-stack development. Led teams to deliver high-performance applications for enterprise clients."
  };

  const experience = [
    {
      company: "TechSolutions Inc.",
      position: "Senior Software Engineer",
      period: "2020 - Present",
      description: "Leading a team of 5 developers for enterprise web applications. Implemented microservices architecture reducing system latency by 40%."
    },
    {
      company: "InnovateTech",
      position: "Software Developer",
      period: "2017 - 2020",
      description: "Developed RESTful APIs and frontend components for financial services platform. Improved code coverage to 90% through automated testing."
    }
  ];

  const education = [
    {
      institution: "National Institute of Technology",
      degree: "B.Tech in Computer Science",
      period: "2013 - 2017",
      description: "Graduated with First Class Honors. Specialized in AI and Machine Learning."
    }
  ];

  const skills = [
    "JavaScript/TypeScript", "React", "Node.js", "Python", 
    "AWS", "Docker", "SQL/NoSQL", "CI/CD", "System Design"
  ];

  // Dynamic styles based on layout type
  const getLayoutStyles = () => {
    switch(layout) {
      case "classic":
        return {
          container: "bg-white border-2 border-gray-300 rounded-md overflow-hidden",
          header: "bg-[#2C3E50] text-white p-6",
          nameStyle: "text-xl font-bold",
          contentLayout: "p-4",
          sectionTitle: "text-[#2C3E50] font-bold text-sm border-b border-gray-300 pb-1 mb-3",
          experienceItem: "mb-3",
          skillItem: "bg-gray-100 text-[#2C3E50] rounded px-2 py-0.5 text-xs mr-1 mb-1 inline-block"
        };
      case "modern":
        return {
          container: "bg-white border-2 border-gray-300 rounded-md overflow-hidden flex flex-col",
          header: "bg-[#3498DB] text-white p-4",
          nameStyle: "text-xl font-bold",
          contentLayout: "flex p-4",
          sectionTitle: "text-[#3498DB] font-bold text-sm mb-3",
          experienceItem: "mb-3 pl-3 border-l-2 border-[#3498DB]",
          skillItem: "bg-[#3498DB]/10 text-[#3498DB] rounded-full px-2 py-0.5 text-xs mr-1 mb-1 inline-block"
        };
      case "creative":
        return {
          container: "bg-white border-2 border-gray-300 rounded-md overflow-hidden",
          header: "bg-gradient-to-r from-[#9B59B6] to-[#8E44AD] text-white p-4 flex items-center justify-between",
          nameStyle: "text-xl font-bold",
          contentLayout: "p-4 grid grid-cols-12 gap-3",
          sectionTitle: "text-[#9B59B6] font-bold text-sm uppercase tracking-wider mb-3",
          experienceItem: "mb-3 rounded bg-gray-50 p-2",
          skillItem: "bg-[#9B59B6]/10 text-[#9B59B6] rounded px-2 py-0.5 text-xs mr-1 mb-1 inline-block"
        };
      case "minimalist":
        return {
          container: "bg-white border-2 border-gray-300 rounded-md overflow-hidden",
          header: "border-b-2 border-black text-black p-4",
          nameStyle: "text-xl font-bold",
          contentLayout: "p-4",
          sectionTitle: "text-black font-bold text-sm uppercase mb-3",
          experienceItem: "mb-3",
          skillItem: "border border-gray-300 rounded-none px-2 py-0.5 text-xs mr-1 mb-1 inline-block"
        };
      case "executive":
        return {
          container: "bg-white border-2 border-gray-300 rounded-md overflow-hidden",
          header: "bg-[#1E3A8A] text-white p-5",
          nameStyle: "text-xl font-bold",
          contentLayout: "p-4",
          sectionTitle: "text-[#1E3A8A] font-bold text-sm border-b border-[#1E3A8A]/30 pb-1 mb-3",
          experienceItem: "mb-3",
          skillItem: "bg-[#1E3A8A]/10 text-[#1E3A8A] rounded px-2 py-0.5 text-xs mr-1 mb-1 inline-block"
        };
      default:
        return {
          container: "bg-white border-2 border-gray-300 rounded-md overflow-hidden",
          header: "bg-[#3498DB] text-white p-4",
          nameStyle: "text-xl font-bold",
          contentLayout: "flex p-4",
          sectionTitle: "text-[#3498DB] font-bold text-sm mb-3",
          experienceItem: "mb-3 pl-3 border-l-2 border-[#3498DB]",
          skillItem: "bg-[#3498DB]/10 text-[#3498DB] rounded-full px-2 py-0.5 text-xs mr-1 mb-1 inline-block"
        };
    }
  };

  const styles = getLayoutStyles();

  // Render different layouts based on the layout type
  if (layout === "modern") {
    return (
      <div className={styles.container} style={{ maxHeight: "500px", overflow: "auto" }}>
        <div className={styles.header}>
          <div className={styles.nameStyle}>{personalInfo.name}</div>
          <div className="text-xs opacity-90 mt-1">{personalInfo.title}</div>
        </div>
        
        <div className="flex">
          {/* Left sidebar */}
          <div className="w-1/3 p-4 bg-gray-50 border-r border-gray-200">
            <div className="mb-4">
              <div className={styles.sectionTitle}>Contact</div>
              <div className="text-xs space-y-1">
                <div>{personalInfo.email}</div>
                <div>{personalInfo.phone}</div>
                <div>{personalInfo.location}</div>
              </div>
            </div>
            
            <div>
              <div className={styles.sectionTitle}>Skills</div>
              <div>
                {skills.map((skill, index) => (
                  <span key={index} className={styles.skillItem}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="w-2/3 p-4">
            <div className="mb-4">
              <div className={styles.sectionTitle}>Professional Summary</div>
              <p className="text-xs">{personalInfo.summary}</p>
            </div>
            
            <div className="mb-4">
              <div className={styles.sectionTitle}>Experience</div>
              {experience.map((exp, index) => (
                <div key={index} className={styles.experienceItem}>
                  <div className="text-xs font-semibold">{exp.position}</div>
                  <div className="text-xs flex justify-between">
                    <span>{exp.company}</span>
                    <span className="text-gray-500">{exp.period}</span>
                  </div>
                  <p className="text-xs mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
            
            <div>
              <div className={styles.sectionTitle}>Education</div>
              {education.map((edu, index) => (
                <div key={index}>
                  <div className="text-xs font-semibold">{edu.degree}</div>
                  <div className="text-xs flex justify-between">
                    <span>{edu.institution}</span>
                    <span className="text-gray-500">{edu.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  else if (layout === "creative") {
    return (
      <div className={styles.container} style={{ maxHeight: "500px", overflow: "auto" }}>
        <div className={styles.header}>
          <div>
            <div className={styles.nameStyle}>{personalInfo.name}</div>
            <div className="text-xs opacity-90 mt-1">{personalInfo.title}</div>
          </div>
          <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center text-[#9B59B6] font-bold text-2xl">
            AM
          </div>
        </div>
        
        <div className={styles.contentLayout}>
          <div className="col-span-12 mb-4">
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-[#9B59B6] mr-2"></div>
              <div className={styles.sectionTitle}>About Me</div>
            </div>
            <p className="text-xs">{personalInfo.summary}</p>
            
            <div className="flex flex-wrap mt-2 text-xs">
              <div className="mr-4 flex items-center">
                <span className="text-[#9B59B6] mr-1">✉</span>
                <span>{personalInfo.email}</span>
              </div>
              <div className="mr-4 flex items-center">
                <span className="text-[#9B59B6] mr-1">☎</span>
                <span>{personalInfo.phone}</span>
              </div>
              <div className="flex items-center">
                <span className="text-[#9B59B6] mr-1">⌂</span>
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </div>
          
          <div className="col-span-12 mb-4">
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-[#9B59B6] mr-2"></div>
              <div className={styles.sectionTitle}>Experience</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {experience.map((exp, index) => (
                <div key={index} className={styles.experienceItem}>
                  <div className="text-xs font-semibold">{exp.position}</div>
                  <div className="text-xs flex justify-between">
                    <span>{exp.company}</span>
                    <span className="text-[#9B59B6]">{exp.period}</span>
                  </div>
                  <p className="text-xs mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="col-span-7 mb-4">
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-[#9B59B6] mr-2"></div>
              <div className={styles.sectionTitle}>Education</div>
            </div>
            {education.map((edu, index) => (
              <div key={index} className="mb-2">
                <div className="text-xs font-semibold">{edu.degree}</div>
                <div className="text-xs flex justify-between">
                  <span>{edu.institution}</span>
                  <span className="text-[#9B59B6]">{edu.period}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="col-span-5">
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-[#9B59B6] mr-2"></div>
              <div className={styles.sectionTitle}>Skills</div>
            </div>
            <div>
              {skills.map((skill, index) => (
                <span key={index} className={styles.skillItem}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  else if (layout === "minimalist") {
    return (
      <div className={styles.container} style={{ maxHeight: "500px", overflow: "auto" }}>
        <div className={styles.header}>
          <div className={styles.nameStyle}>{personalInfo.name}</div>
          <div className="text-xs mt-1">{personalInfo.title}</div>
          
          <div className="text-xs mt-4 flex flex-wrap">
            <span className="mr-4">{personalInfo.email}</span>
            <span className="mr-4">{personalInfo.phone}</span>
            <span>{personalInfo.location}</span>
          </div>
        </div>
        
        <div className={styles.contentLayout}>
          <div className="mb-6">
            <div className={styles.sectionTitle}>Summary</div>
            <p className="text-xs">{personalInfo.summary}</p>
          </div>
          
          <div className="mb-6">
            <div className={styles.sectionTitle}>Experience</div>
            {experience.map((exp, index) => (
              <div key={index} className={styles.experienceItem}>
                <div className="flex justify-between text-xs">
                  <span className="font-semibold">{exp.position}, {exp.company}</span>
                  <span>{exp.period}</span>
                </div>
                <p className="text-xs mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mb-6">
            <div className={styles.sectionTitle}>Education</div>
            {education.map((edu, index) => (
              <div key={index} className="flex justify-between text-xs">
                <span className="font-semibold">{edu.degree}, {edu.institution}</span>
                <span>{edu.period}</span>
              </div>
            ))}
          </div>
          
          <div>
            <div className={styles.sectionTitle}>Skills</div>
            <div>
              {skills.map((skill, index) => (
                <span key={index} className={styles.skillItem}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  else if (layout === "executive") {
    return (
      <div className={styles.container} style={{ maxHeight: "500px", overflow: "auto" }}>
        <div className={styles.header}>
          <div className={styles.nameStyle}>{personalInfo.name}</div>
          <div className="text-sm mt-1">{personalInfo.title}</div>
          
          <div className="text-xs mt-3 flex flex-wrap">
            <span className="mr-4">{personalInfo.email}</span>
            <span className="mr-4">{personalInfo.phone}</span>
            <span>{personalInfo.location}</span>
          </div>
        </div>
        
        <div className={styles.contentLayout}>
          <div className="mb-6">
            <div className={styles.sectionTitle}>Executive Profile</div>
            <p className="text-xs">{personalInfo.summary}</p>
          </div>
          
          <div className="mb-6">
            <div className={styles.sectionTitle}>Professional Experience</div>
            {experience.map((exp, index) => (
              <div key={index} className={styles.experienceItem}>
                <div className="flex justify-between items-center my-1">
                  <div className="text-sm font-semibold">{exp.position}</div>
                  <div className="text-xs font-medium text-[#1E3A8A]">{exp.period}</div>
                </div>
                <div className="text-xs font-medium mb-1">{exp.company}</div>
                <p className="text-xs">{exp.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mb-6">
            <div className={styles.sectionTitle}>Academic Background</div>
            {education.map((edu, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between items-center">
                  <div className="text-xs font-semibold">{edu.degree}</div>
                  <div className="text-xs font-medium text-[#1E3A8A]">{edu.period}</div>
                </div>
                <div className="text-xs">{edu.institution}</div>
              </div>
            ))}
          </div>
          
          <div>
            <div className={styles.sectionTitle}>Areas of Expertise</div>
            <div>
              {skills.map((skill, index) => (
                <span key={index} className={styles.skillItem}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Classic layout - Default fallback
  else if (layout === "classic") {
    return (
      <div className={styles.container} style={{ maxHeight: "500px", overflow: "auto" }}>
        <div className={styles.header}>
          <div className={styles.nameStyle}>{personalInfo.name}</div>
          <div className="text-sm mt-1">{personalInfo.title}</div>
          
          <div className="text-xs mt-3 flex flex-wrap">
            <span className="mr-3">{personalInfo.email}</span>
            <span className="mr-3">{personalInfo.phone}</span>
            <span>{personalInfo.location}</span>
          </div>
        </div>
        
        <div className={styles.contentLayout}>
          <div className="mb-4">
            <div className={styles.sectionTitle}>Profile Summary</div>
            <p className="text-xs">{personalInfo.summary}</p>
          </div>
          
          <div className="mb-4">
            <div className={styles.sectionTitle}>Professional Experience</div>
            {experience.map((exp, index) => (
              <div key={index} className={styles.experienceItem}>
                <div className="text-xs font-semibold">{exp.position}</div>
                <div className="text-xs flex justify-between">
                  <span>{exp.company}</span>
                  <span className="text-gray-500">{exp.period}</span>
                </div>
                <p className="text-xs mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mb-4">
            <div className={styles.sectionTitle}>Education</div>
            {education.map((edu, index) => (
              <div key={index} className="mb-2">
                <div className="text-xs font-semibold">{edu.degree}</div>
                <div className="text-xs flex justify-between">
                  <span>{edu.institution}</span>
                  <span className="text-gray-500">{edu.period}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div>
            <div className={styles.sectionTitle}>Technical Skills</div>
            <div>
              {skills.map((skill, index) => (
                <span key={index} className={styles.skillItem}>{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Default template (should not reach here since we handle all types above)
  return (
    <div className={styles.container} style={{ maxHeight: "500px", overflow: "auto" }}>
      <div className={styles.header}>
        <div className={styles.nameStyle}>{personalInfo.name}</div>
        <div className="text-sm mt-1">{personalInfo.title}</div>
        
        <div className="text-xs mt-3 flex flex-wrap">
          <span className="mr-3">{personalInfo.email}</span>
          <span className="mr-3">{personalInfo.phone}</span>
          <span>{personalInfo.location}</span>
        </div>
      </div>
      
      <div className={styles.contentLayout}>
        <div className="mb-4">
          <div className={styles.sectionTitle}>Professional Summary</div>
          <p className="text-xs">{personalInfo.summary}</p>
        </div>
        
        <div className="mb-4">
          <div className={styles.sectionTitle}>Work Experience</div>
          {experience.map((exp, index) => (
            <div key={index} className={styles.experienceItem}>
              <div className="text-xs font-semibold">{exp.position}</div>
              <div className="text-xs flex justify-between">
                <span>{exp.company}</span>
                <span className="text-gray-500">{exp.period}</span>
              </div>
              <p className="text-xs mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mb-4">
          <div className={styles.sectionTitle}>Education</div>
          {education.map((edu, index) => (
            <div key={index} className="mb-2">
              <div className="text-xs font-semibold">{edu.degree}</div>
              <div className="text-xs flex justify-between">
                <span>{edu.institution}</span>
                <span className="text-gray-500">{edu.period}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div>
          <div className={styles.sectionTitle}>Skills</div>
          <div>
            {skills.map((skill, index) => (
              <span key={index} className={styles.skillItem}>{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}