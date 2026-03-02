import { CV } from '@/lib/types';

export const mockCVData: CV = {
  id: "sample-cv-1",
  title: "Sarah Johnson's CV",
  isTailored: false,
  personalInfo: {
    fullName: "Sarah Johnson",
    title: "Senior Software Engineer",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    summary: "Experienced full-stack developer with 6+ years building scalable web applications. Passionate about clean code, user experience, and mentoring junior developers. Proven track record of leading cross-functional teams and delivering high-impact projects."
  },
  experience: [
    {
      id: "exp-1",
      position: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      startDate: "2021-03",
      endDate: "Present",
      description: "Lead development of microservices architecture serving 2M+ users daily. Mentor junior developers and drive technical decisions for the platform team.",
      highlights: [
        "Improved system performance by 40% through database optimization",
        "Led migration from monolith to microservices, reducing deployment time by 60%",
        "Mentored 5 junior developers, with 3 receiving promotions"
      ]
    },
    {
      id: "exp-2",
      position: "Software Engineer",
      company: "StartupXYZ",
      location: "San Francisco, CA",
      startDate: "2019-06",
      endDate: "2021-02",
      description: "Built full-stack features for B2B SaaS platform using React, Node.js, and PostgreSQL. Collaborated with product and design teams to deliver user-centric solutions.",
      highlights: [
        "Developed real-time collaboration features used by 50K+ users",
        "Reduced API response times by 35% through caching strategies",
        "Implemented comprehensive test suite increasing code coverage to 85%"
      ]
    },
    {
      id: "exp-3",
      position: "Junior Developer",
      company: "WebSolutions LLC",
      location: "Austin, TX",
      startDate: "2018-01",
      endDate: "2019-05",
      description: "Developed responsive websites and web applications for small to medium businesses. Gained experience in modern web technologies and agile development practices.",
      highlights: [
        "Built 15+ responsive websites using modern CSS and JavaScript",
        "Collaborated with designers to implement pixel-perfect UI components",
        "Maintained legacy PHP applications and improved performance"
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      institution: "University of California, Berkeley",
      studyType: "Bachelor of Science",
      area: "Computer Science",
      startDate: "2014-08",
      endDate: "2018-05",
      score: "3.7/4.0",
      description: "Relevant coursework: Data Structures, Algorithms, Database Systems, Software Engineering, Machine Learning"
    }
  ],
  skills: [
    {
      id: "skill-1",
      name: "Programming Languages",
      level: "Expert",
      keywords: ["JavaScript", "TypeScript", "Python", "Java", "Go"]
    },
    {
      id: "skill-2",
      name: "Frontend Technologies",
      level: "Expert",
      keywords: ["React", "Vue.js", "HTML5", "CSS3", "Tailwind CSS", "Next.js"]
    },
    {
      id: "skill-3",
      name: "Backend Technologies",
      level: "Advanced",
      keywords: ["Node.js", "Express", "Django", "PostgreSQL", "MongoDB", "Redis"]
    },
    {
      id: "skill-4",
      name: "DevOps & Tools",
      level: "Intermediate",
      keywords: ["Docker", "AWS", "Git", "Jenkins", "Kubernetes", "Terraform"]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "E-commerce Analytics Dashboard",
      description: "Built a real-time analytics dashboard for e-commerce platforms using React, D3.js, and WebSocket connections. Processes 100K+ events per minute.",
      technologies: ["React", "TypeScript", "D3.js", "WebSocket", "Node.js", "PostgreSQL"],
      startDate: "2022-01",
      endDate: "2022-06",
      url: "https://github.com/sarah/ecommerce-dashboard",
      highlights: [
        "Real-time data visualization with sub-second latency",
        "Scalable architecture handling 100K+ events per minute",
        "Intuitive UI reducing analysis time by 50%"
      ]
    },
    {
      id: "proj-2",
      title: "Open Source Task Manager",
      description: "Developed a collaborative task management tool with real-time synchronization. Featured drag-and-drop interface and team collaboration tools.",
      technologies: ["Vue.js", "Node.js", "Socket.io", "MongoDB", "Docker"],
      startDate: "2021-08",
      endDate: "2021-12",
      url: "https://github.com/sarah/task-manager",
      highlights: [
        "500+ GitHub stars and active community contributions",
        "Real-time collaboration with conflict resolution",
        "Mobile-responsive design with PWA capabilities"
      ]
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2022-09",
      description: "Professional-level certification demonstrating expertise in designing distributed systems on AWS."
    },
    {
      id: "cert-2",
      name: "Certified Kubernetes Administrator",
      issuer: "Cloud Native Computing Foundation",
      date: "2023-03",
      description: "Hands-on certification for Kubernetes cluster administration and troubleshooting."
    }
  ],
  languages: [
    {
      id: "lang-1",
      name: "English",
      proficiency: "Native/Bilingual"
    },
    {
      id: "lang-2",
      name: "Spanish",
      proficiency: "Limited Working"
    }
  ],
  lastUpdated: new Date("2024-01-15")
};

export const mockCVVariants = {
  creative: {
    ...mockCVData,
    personalInfo: {
      ...mockCVData.personalInfo,
      fullName: "Alex Rivera",
      title: "Creative Frontend Developer",
      summary: "Innovative frontend developer with a passion for creating beautiful, interactive user experiences. Specializes in modern JavaScript frameworks and creative web animations."
    }
  },
  executive: {
    ...mockCVData,
    personalInfo: {
      ...mockCVData.personalInfo,
      fullName: "Michael Chen",
      title: "VP of Engineering",
      summary: "Strategic technology leader with 12+ years of experience scaling engineering teams and driving digital transformation. Proven track record of building high-performing organizations and delivering enterprise-grade solutions."
    },
    experience: [
      {
        id: "exp-1",
        position: "VP of Engineering",
        company: "Enterprise Solutions Inc.",
        location: "New York, NY",
        startDate: "2020-01",
        endDate: "Present",
        description: "Lead engineering organization of 80+ developers across 6 teams. Drive technical strategy and architecture decisions for enterprise SaaS platform serving Fortune 500 clients.",
        highlights: [
          "Scaled engineering team from 25 to 80+ developers",
          "Reduced system downtime by 95% through reliability initiatives",
          "Led digital transformation saving $2M annually"
        ]
      }
    ]
  },
  minimalist: {
    ...mockCVData,
    personalInfo: {
      ...mockCVData.personalInfo,
      fullName: "Emma Thompson",
      title: "UX Designer",
      summary: "Clean, user-focused design philosophy with expertise in creating intuitive digital experiences. Passionate about accessibility and inclusive design practices."
    }
  }
};
