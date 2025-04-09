import React, { createContext, useContext, useState, ReactNode } from "react";
import { CV, PersonalInfo, WorkExperience, Education, ChatMessage } from "./types";

// Initial values for new CV
const defaultPersonalInfo: PersonalInfo = {
  fullName: "John Doe",
  title: "Senior Software Engineer",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  summary: "Senior Software Engineer with 8+ years of experience specializing in full-stack development. Proven track record of delivering scalable web applications and leading development teams."
};

const initialExperience: WorkExperience[] = [
  {
    id: "exp1",
    company: "Tech Innovations Inc.",
    position: "Lead Developer",
    startDate: "2020-01",
    endDate: "present",
    description: "Led a team of 5 developers building a SaaS platform. Architected microservices infrastructure and implemented CI/CD pipelines."
  },
  {
    id: "exp2",
    company: "Digital Solutions LLC",
    position: "Senior Software Engineer",
    startDate: "2017-03",
    endDate: "2019-12",
    description: "Developed and maintained multiple client applications using React and Node.js. Implemented authentication systems and RESTful APIs."
  }
];

const initialEducation: Education[] = [
  {
    id: "edu1",
    institution: "Stanford University",
    degree: "Master of Computer Science",
    period: "2014 - 2016",
    description: "Specialized in Artificial Intelligence and Distributed Systems. GPA: 3.9/4.0"
  }
];

const initialSkills = [
  "JavaScript", "React", "Node.js", "TypeScript", "AWS", 
  "Docker", "GraphQL", "MongoDB", "CI/CD", "Agile"
];

const sampleCV: CV = {
  id: "main",
  title: "Main Professional CV",
  lastUpdated: new Date("2023-10-15"),
  isTailored: false,
  personalInfo: defaultPersonalInfo,
  experience: initialExperience,
  education: initialEducation,
  skills: initialSkills
};

// Tailored CVs sample data
const tailoredCVs: CV[] = [
  {
    id: "frontend",
    title: "Frontend Developer",
    description: "Tailored for frontend positions with focus on React ecosystem and UI/UX skills.",
    lastUpdated: new Date("2023-09-28"),
    forJob: "Google application",
    isTailored: true,
    personalInfo: defaultPersonalInfo,
    experience: initialExperience,
    education: initialEducation,
    skills: initialSkills
  },
  {
    id: "fullstack",
    title: "Full-Stack Engineer",
    description: "Tailored for full-stack roles with emphasis on Node.js backend and cloud infrastructure experience.",
    lastUpdated: new Date("2023-10-03"),
    forJob: "Microsoft application",
    isTailored: true,
    personalInfo: defaultPersonalInfo,
    experience: initialExperience,
    education: initialEducation,
    skills: initialSkills
  }
];

interface CVContextType {
  mainCV: CV | null;
  setMainCV: React.Dispatch<React.SetStateAction<CV | null>>;
  tailoredCVs: CV[];
  setTailoredCVs: React.Dispatch<React.SetStateAction<CV[]>>;
  currentCV: CV | null;
  setCurrentCV: React.Dispatch<React.SetStateAction<CV | null>>;
  messages: ChatMessage[];
  addMessage: (message: string, isBot: boolean) => void;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

export function CVProvider({ children }: { children: ReactNode }) {
  const [mainCV, setMainCV] = useState<CV | null>(sampleCV);
  const [tailoredCVsList, setTailoredCVs] = useState<CV[]>(tailoredCVs);
  const [currentCV, setCurrentCV] = useState<CV | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial",
      text: "Meow! 😺 I'm your CV Assistant. How can I help you today with your resume?",
      isBot: true,
      timestamp: new Date()
    }
  ]);

  const addMessage = (text: string, isBot: boolean) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <CVContext.Provider 
      value={{ 
        mainCV, 
        setMainCV, 
        tailoredCVs: tailoredCVsList, 
        setTailoredCVs, 
        currentCV, 
        setCurrentCV,
        messages,
        addMessage
      }}
    >
      {children}
    </CVContext.Provider>
  );
}

export function useCV() {
  const context = useContext(CVContext);
  if (context === undefined) {
    throw new Error("useCV must be used within a CVProvider");
  }
  return context;
}
