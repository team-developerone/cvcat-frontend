import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import debojyotiImg from "../assets/debojyoti.png";
import sayanImg from "../assets/sayan.png";
import { useState } from "react";

interface TeamMember {
  name: string;
  nickname?: string;
  role: string;
  image: string;
  experience: string;
  bio: string;
  skills: string[];
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export default function TeamPage() {
  const teamMembers: TeamMember[] = [
    {
      name: "Sayan Chakrabarti",
      nickname: "Riju",
      role: "Co-founder & Backend Developer",
      image: debojyotiImg, // Flipped as requested
      experience: "12+ years",
      bio: "Veteran backend developer with extensive experience in building scalable systems and APIs. Expert in database design, system architecture, and performance optimization.",
      skills: ["Node.js", "Python", "Database Design", "API Development", "System Architecture", "Cloud Infrastructure"],
      social: {
        github: "https://github.com/sayan",
        linkedin: "https://linkedin.com/in/sayan",
      }
    },
    {
      name: "Debojyoti Saha",
      role: "Co-founder & Frontend Specialist",
      image: sayanImg, // Flipped as requested
      experience: "8+ years",
      bio: "Passionate frontend developer with expertise in creating intuitive user interfaces and seamless experiences. Specializes in React, TypeScript, and modern web frameworks.",
      skills: ["React", "TypeScript", "UI/UX Design", "CSS/SASS", "Frontend Architecture", "Mobile Responsive Design"],
      social: {
        github: "https://github.com/debojyoti",
        linkedin: "https://linkedin.com/in/debojyoti",
      }
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <Layout>
      <motion.div 
        className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-3"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Meet Our <span className="text-[#DAA520]">Team</span>
            </motion.h1>
            <motion.div 
              className="w-24 h-1 bg-[#DAA520] mx-auto mb-6"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              The passionate founders behind CVCat, combining over 20 years of experience in development to create the perfect CV building experience.
            </motion.p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.name}
                className="relative"
                variants={item}
                whileHover={{ scale: 1.01 }}
              >
                <div className="bg-white rounded-md shadow-sm border border-gray-100 transition-all duration-300 h-full p-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                    {/* Circular small profile image */}
                    <div className="relative flex-shrink-0">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#DAA520]/20">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1 text-center sm:text-left">
                      <h2 className="text-xl font-bold text-gray-900">
                        {member.name}
                        {member.nickname && <span className="text-sm font-normal ml-2 text-gray-500">({member.nickname})</span>}
                      </h2>
                      <p className="text-[#DAA520] font-medium text-sm mb-1">{member.role}</p>
                      <p className="text-gray-500 text-xs">{member.experience} of experience</p>
                    </div>
                  </div>
                  
                  <div className="mt-5 pt-5 border-t border-gray-100">
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">{member.bio}</p>
                    
                    <div className="mb-4">
                      <h3 className="text-xs font-semibold uppercase text-gray-400 mb-2">Expertise</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {member.skills.map((skill) => (
                          <span 
                            key={skill}
                            className="bg-gray-50 text-gray-500 px-2.5 py-1 rounded-md text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-3 mt-4 border-t border-gray-50 pt-4">
                      {member.social.github && (
                        <a 
                          href={member.social.github}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-black transition-colors"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5229 6.47715 22 12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14.3333 19V17.137C14.3583 16.8275 14.3154 16.5163 14.2073 16.2242C14.0993 15.9321 13.9286 15.6677 13.7067 15.4505C15.8 15.212 18 14.536 18 11.4505C17.9998 10.5685 17.6418 9.7258 17 9.10005C17.3039 8.32649 17.2824 7.46909 16.94 6.71053C16.94 6.71053 16.1533 6.4721 14.3333 7.6238C12.8053 7.20892 11.1947 7.20892 9.66666 7.6238C7.84666 6.4721 7.05999 6.71053 7.05999 6.71053C6.71757 7.46909 6.69609 8.32649 6.99999 9.10005C6.35341 9.7304 5.99501 10.5803 5.99999 11.4671C5.99999 14.5338 8.19999 15.2089 10.2933 15.4671C10.0739 15.682 9.90483 15.9429 9.79686 16.231C9.68889 16.5192 9.64453 16.8261 9.66666 17.1329V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9.66667 17.7018C7.66667 18.3351 6 17.7018 5 16.0033" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      )}
                      
                      {member.social.linkedin && (
                        <a 
                          href={member.social.linkedin}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 11V16M8 8V8.01M12 16V11M16 16V13C16 12.4696 15.7893 11.9609 15.4142 11.5858C15.0391 11.2107 14.5304 11 14 11C13.4696 11 12.9609 11.2107 12.5858 11.5858C12.2107 11.9609 12 12.4696 12 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      )}
                      
                      {member.social.twitter && (
                        <a 
                          href={member.social.twitter}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-400 transition-colors"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.2941 20.1667C16.2471 20.1667 20.5882 13.5327 20.5882 7.79511C20.5882 7.62348 20.5882 7.45252 20.5765 7.28155C21.3529 6.71267 22.0235 6.00043 22.5647 5.19312C21.84 5.50278 21.0684 5.70542 20.2735 5.79706C21.1059 5.29784 21.7294 4.50773 22.0235 3.57543C21.2401 4.04055 20.3788 4.36743 19.4718 4.54432C18.7294 3.76139 17.6941 3.27344 16.5412 3.27344C14.3294 3.27344 12.5412 5.06159 12.5412 7.27344C12.5412 7.58311 12.5765 7.88566 12.6471 8.1763C9.32471 8.01245 6.35765 6.42541 4.36 4.01246C4.01647 4.60557 3.82118 5.28784 3.82118 6.01246C3.82118 7.3885 4.52941 8.60249 5.6 9.31472C4.94118 9.29851 4.31765 9.10998 3.76471 8.82364C3.76471 8.83985 3.76471 8.85839 3.76471 8.8773C3.76471 10.8195 5.14824 12.4427 7.01176 12.8088C6.68235 12.9005 6.33059 12.9494 5.96471 12.9494C5.70588 12.9494 5.45647 12.9249 5.21412 12.8773C5.71765 14.4756 7.21176 15.6329 8.98824 15.6655C7.6 16.7382 5.84706 17.3747 3.95294 17.3747C3.63059 17.3747 3.31529 17.3584 3 17.3254C4.79059 18.4561 6.95059 19.1089 9.26118 19.1089" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
            <p className="text-gray-600 max-w-lg mx-auto mb-6">
              We're always looking for talented individuals to join our mission of transforming CV creation with AI.
            </p>
            <motion.a
              href="#" 
              className="inline-flex items-center bg-black hover:bg-[#DAA520] text-white py-3 px-6 rounded-lg shadow-md transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View Open Positions</span>
              <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
}