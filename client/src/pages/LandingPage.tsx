import Layout from "@/components/Layout";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);

  // Track scroll position for animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Layout showFooter={true}>
      {/* Hero Section */}
      <section className="py-10 px-4 md:px-8 bg-white relative overflow-hidden">
        {/* Background Cat Paw Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-10 left-10">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z" fill="black"/>
              <path d="M16 9C17.1046 9 18 8.10457 18 7C18 5.89543 17.1046 5 16 5C14.8954 5 14 5.89543 14 7C14 8.10457 14.8954 9 16 9Z" fill="black"/>
              <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="black"/>
              <path d="M5 15C6.10457 15 7 14.1046 7 13C7 11.8954 6.10457 11 5 11C3.89543 11 3 11.8954 3 13C3 14.1046 3.89543 15 5 15Z" fill="black"/>
              <path d="M19 15C20.1046 15 21 14.1046 21 13C21 11.8954 20.1046 11 19 11C17.8954 11 17 11.8954 17 13C17 14.1046 17.8954 15 19 15Z" fill="black"/>
            </svg>
          </div>
          <div className="absolute top-60 right-20">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z" fill="black"/>
              <path d="M16 9C17.1046 9 18 8.10457 18 7C18 5.89543 17.1046 5 16 5C14.8954 5 14 5.89543 14 7C14 8.10457 14.8954 9 16 9Z" fill="black"/>
              <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="black"/>
              <path d="M5 15C6.10457 15 7 14.1046 7 13C7 11.8954 6.10457 11 5 11C3.89543 11 3 11.8954 3 13C3 14.1046 3.89543 15 5 15Z" fill="black"/>
              <path d="M19 15C20.1046 15 21 14.1046 21 13C21 11.8954 20.1046 11 19 11C17.8954 11 17 11.8954 17 13C17 14.1046 17.8954 15 19 15Z" fill="black"/>
            </svg>
          </div>
          <div className="absolute bottom-20 left-1/3">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z" fill="black"/>
              <path d="M16 9C17.1046 9 18 8.10457 18 7C18 5.89543 17.1046 5 16 5C14.8954 5 14 5.89543 14 7C14 8.10457 14.8954 9 16 9Z" fill="black"/>
              <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="black"/>
              <path d="M5 15C6.10457 15 7 14.1046 7 13C7 11.8954 6.10457 11 5 11C3.89543 11 3 11.8954 3 13C3 14.1046 3.89543 15 5 15Z" fill="black"/>
              <path d="M19 15C20.1046 15 21 14.1046 21 13C21 11.8954 20.1046 11 19 11C17.8954 11 17 11.8954 17 13C17 14.1046 17.8954 15 19 15Z" fill="black"/>
            </svg>
          </div>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center relative z-10">
          <motion.div 
            className="md:w-1/2 md:pr-8 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center md:text-left">
              <motion.h1 
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Your CV, <span className="text-[#DAA520]">Purr</span>fected
              </motion.h1>
              <motion.p 
                className="text-sm mb-3 max-w-lg text-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Create, manage, and tailor your CVs with feline precision. Let our AI assistant help you stand out in today's competitive job market.
              </motion.p>
              
              <motion.div
                className="mb-6 relative z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.div
                  className="text-xs font-medium bg-[#DAA520]/10 border border-[#DAA520]/20 inline-flex items-center px-3 py-1.5 text-left relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.03, 
                    backgroundColor: "rgba(218, 165, 32, 0.2)" 
                  }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#DAA520]/10 to-transparent"
                    animate={{ 
                      x: [-100, 200],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2,
                      ease: "linear"
                    }}
                  />
                  <svg className="w-3 h-3 mr-1.5 text-[#DAA520] flex-shrink-0 relative z-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="relative z-10">Most features are <span className="text-[#DAA520] font-bold mx-0.5">100% FREE</span> — unlimited edits, exports with no watermarks!</span>
                </motion.div>
                
                <motion.div
                  className="text-xs font-medium bg-[#DAA520]/10 border border-[#DAA520]/20 inline-flex items-center px-3 py-1.5 text-left mt-1.5 relative overflow-hidden"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ 
                    scale: 1.03, 
                    backgroundColor: "rgba(218, 165, 32, 0.2)" 
                  }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#DAA520]/10 to-transparent"
                    animate={{ 
                      x: [-100, 200],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2,
                      ease: "linear",
                      delay: 0.5
                    }}
                  />
                  <svg className="w-3 h-3 mr-1.5 text-[#DAA520] flex-shrink-0 relative z-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5C12 5 13 9 10 12C9 13 7 14 7.5 18C7.5 18 11 17 12 12C12 12 13 17 17 19C17 19 19 15 17 13C15 11 16 9 16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="relative z-10">AI assistant <span className="text-[#DAA520] font-bold mx-0.5">included in free plan</span> — get expert help instantly!</span>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mb-6 md:justify-start justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link href="/auth">
                  <Button
                    className="btn-primary text-xs py-2 px-4"
                  >
                    Get Started
                  </Button>
                </Link>
                
                <Button
                  variant="outline"
                  className="btn-secondary text-xs py-2 px-4"
                >
                  See Samples
                </Button>
              </motion.div>
              
              <motion.div 
                className="flex gap-6 justify-center md:justify-start text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="text-center md:text-left flex flex-col items-center md:items-start">
                  <div className="text-base font-medium text-[#DAA520]">39%</div>
                  <div className="text-xs text-gray-600">hire rate increase</div>
                </div>
                <div className="text-center md:text-left flex flex-col items-center md:items-start">
                  <div className="text-base font-medium text-[#DAA520]">8%</div>
                  <div className="text-xs text-gray-600">higher salary</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative bg-gradient-to-br from-gray-100 to-white p-8 rounded-lg shadow-lg">
              {/* Gold gradient accent lines */}
              <motion.div 
                className="absolute inset-x-0 top-0 h-[2px]"
                style={{ 
                  background: "linear-gradient(90deg, transparent, rgba(218, 165, 32, 0.7), transparent)" 
                }}
                animate={{
                  backgroundPosition: ["200% 0", "-200% 0"],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
              <motion.div 
                className="absolute inset-y-0 right-0 w-[2px]"
                style={{ 
                  background: "linear-gradient(180deg, transparent, rgba(218, 165, 32, 0.7), transparent)" 
                }}
                animate={{
                  backgroundPosition: ["0 200%", "0 -200%"],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: 0.5
                }}
              />
              <motion.div 
                className="absolute inset-x-0 bottom-0 h-[2px]"
                style={{ 
                  background: "linear-gradient(90deg, transparent, rgba(218, 165, 32, 0.7), transparent)" 
                }}
                animate={{
                  backgroundPosition: ["-200% 0", "200% 0"],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: 1
                }}
              />
              <motion.div 
                className="absolute inset-y-0 left-0 w-[2px]"
                style={{ 
                  background: "linear-gradient(180deg, transparent, rgba(218, 165, 32, 0.7), transparent)" 
                }}
                animate={{
                  backgroundPosition: ["0 -200%", "0 200%"],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: 1.5
                }}
              />
              
              {/* Interactive Animated Cat */}
              <motion.div 
                className="absolute -top-14 -right-6 w-28 h-28 z-10"
                animate={{ 
                  rotate: [0, 5, 0, -5, 0],
                  y: [0, -5, 0, -5, 0] 
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 5,
                  ease: "easeInOut" 
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: [0, 10, 0, -10, 0],
                  transition: { duration: 0.3 }
                }}
                whileTap={{
                  scale: 0.9,
                  rotate: 0
                }}
              >
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Cat body */}
                  <g>
                    <path d="M50 10C50 10 55 25 45 40C38 50 25 60 30 80C30 80 45 75 50 50C50 50 55 75 75 90C75 90 90 70 75 55C60 40 65 25 65 25C65 25 60 28 55 28C50 28 50 25 50 25C50 25 50 28 45 28C40 28 35 25 35 25C35 25 40 40 25 55C10 70 25 90 25 90C45 75 50 50 50 50C55 75 70 80 70 80C75 60 62 50 55 40C45 25 50 10 50 10Z" fill="#DAA520"/>
                    <motion.path 
                      d="M50 10C50 10 55 25 45 40C38 50 25 60 30 80C30 80 45 75 50 50C50 50 55 75 75 90C75 90 90 70 75 55C60 40 65 25 65 25C65 25 60 28 55 28C50 28 50 25 50 25C50 25 50 28 45 28C40 28 35 25 35 25C35 25 40 40 25 55C10 70 25 90 25 90C45 75 50 50 50 50C55 75 70 80 70 80C75 60 62 50 55 40C45 25 50 10 50 10Z" 
                      stroke="#B58800" 
                      strokeWidth="0.5" 
                      strokeOpacity="0.6"
                      animate={{
                        strokeOpacity: [0.2, 0.6, 0.2],
                        strokeWidth: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </g>
                  
                  {/* Cat eyes */}
                  <motion.g
                    animate={{
                      y: [0, 0.5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  >
                    <circle cx="40" cy="35" r="2.5" fill="#111111"/>
                    <circle cx="40" cy="34" r="0.8" fill="white"/>
                    <circle cx="60" cy="35" r="2.5" fill="#111111"/>
                    <circle cx="60" cy="34" r="0.8" fill="white"/>
                  </motion.g>
                  
                  {/* Cat mouth */}
                  <motion.path 
                    d="M45 45C45 45 50 46 55 45" 
                    stroke="#111111" 
                    strokeWidth="1.5" 
                    strokeLinecap="round"
                    animate={{ 
                      d: ["M45 45C45 45 50 46 55 45", "M45 47C45 47 50 49 55 47", "M45 45C45 45 50 46 55 45"] 
                    }}
                    transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                  />
                  
                  {/* Cat whiskers */}
                  <motion.g
                    animate={{
                      x: [0, 0.3, 0, -0.3, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <path d="M30 40L20 38" stroke="#111111" strokeWidth="0.5" strokeLinecap="round"/>
                    <path d="M30 43L18 43" stroke="#111111" strokeWidth="0.5" strokeLinecap="round"/>
                    <path d="M30 46L20 48" stroke="#111111" strokeWidth="0.5" strokeLinecap="round"/>
                    
                    <path d="M70 40L80 38" stroke="#111111" strokeWidth="0.5" strokeLinecap="round"/>
                    <path d="M70 43L82 43" stroke="#111111" strokeWidth="0.5" strokeLinecap="round"/>
                    <path d="M70 46L80 48" stroke="#111111" strokeWidth="0.5" strokeLinecap="round"/>
                  </motion.g>
                </svg>
              </motion.div>
              
              {/* Enhanced CV Preview with animated elements */}
              <motion.div 
                className="border border-gray-200 bg-white overflow-hidden shadow-md"
                whileHover={{ 
                  boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 5px 10px -5px rgba(218, 165, 32, 0.2)",
                  y: -8,
                  borderColor: "rgba(218, 165, 32, 0.3)"
                }}
                transition={{ duration: 0.3 }}
              >
                {/* CV Header */}
                <div className="bg-black text-white p-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <motion.div 
                        className="w-3 h-3 bg-[#DAA520] mr-2 rounded-full"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.7, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <h3 className="text-xs font-medium">Professional CV</h3>
                    </div>
                    <div className="flex space-x-1.5">
                      <motion.div 
                        className="h-2 w-2 rounded-full bg-red-400"
                        whileHover={{ scale: 1.2 }}
                      />
                      <motion.div 
                        className="h-2 w-2 rounded-full bg-yellow-400"
                        whileHover={{ scale: 1.2 }}
                      />
                      <motion.div 
                        className="h-2 w-2 rounded-full bg-green-400"
                        whileHover={{ scale: 1.2 }}
                      />
                    </div>
                  </div>
                </div>
                
                {/* CV Content */}
                <div className="p-4">
                  {/* Header Section */}
                  <div className="mb-4 border-b border-gray-100 pb-3">
                    <motion.div 
                      className="h-6 bg-gray-100 mb-2 w-3/4 rounded-sm relative overflow-hidden"
                      animate={{ opacity: [0.7, 0.9, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                        animate={{ 
                          x: [-100, 200],
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 1.5,
                          ease: "linear"
                        }}
                      />
                    </motion.div>
                    <div className="flex justify-between items-center">
                      <div className="h-3 bg-gray-100 w-1/3 rounded-sm"></div>
                      <div className="h-3 w-3 rounded-full bg-[#DAA520]/30"></div>
                    </div>
                  </div>
                  
                  {/* Profile Section */}
                  <div className="mb-4">
                    <motion.div 
                      className="h-3 bg-[#DAA520]/20 mb-2 w-1/4 rounded-sm"
                      animate={{ width: ["25%", "28%", "25%"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <div className="space-y-1.5">
                      <div className="h-2 bg-gray-100 rounded-sm"></div>
                      <div className="h-2 bg-gray-100 rounded-sm"></div>
                      <div className="h-2 bg-gray-100 w-11/12 rounded-sm"></div>
                    </div>
                  </div>
                  
                  {/* Experience Section */}
                  <div className="mb-4">
                    <motion.div 
                      className="h-3 bg-[#DAA520]/20 mb-2 w-1/3 rounded-sm"
                      initial={{ width: "30%" }}
                      animate={{ 
                        width: ["30%", "35%", "30%"],
                        backgroundColor: ["rgba(218, 165, 32, 0.2)", "rgba(218, 165, 32, 0.3)", "rgba(218, 165, 32, 0.2)"]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    
                    {/* Job Entry 1 */}
                    <div className="mb-2 pl-2 border-l-2 border-gray-200">
                      <div className="flex justify-between mb-1">
                        <div className="h-2.5 bg-gray-200 w-1/3 rounded-sm"></div>
                        <div className="h-2 bg-gray-100 w-1/5 rounded-sm"></div>
                      </div>
                      <div className="h-2 bg-gray-100 mb-1 w-1/2 rounded-sm"></div>
                      <div className="space-y-1">
                        <div className="h-1.5 bg-gray-100 rounded-sm"></div>
                        <div className="h-1.5 bg-gray-100 rounded-sm"></div>
                      </div>
                    </div>
                    
                    {/* Job Entry 2 - Animated */}
                    <motion.div 
                      className="mb-2 pl-2 border-l-2 border-[#DAA520]/30"
                      animate={{ 
                        borderColor: ["rgba(218, 165, 32, 0.3)", "rgba(218, 165, 32, 0.6)", "rgba(218, 165, 32, 0.3)"]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="flex justify-between mb-1">
                        <div className="h-2.5 bg-gray-200 w-1/4 rounded-sm"></div>
                        <div className="h-2 bg-gray-100 w-1/5 rounded-sm"></div>
                      </div>
                      <div className="h-2 bg-gray-100 mb-1 w-2/5 rounded-sm"></div>
                      <div className="space-y-1">
                        <div className="h-1.5 bg-gray-100 rounded-sm"></div>
                        <motion.div 
                          className="h-1.5 bg-gray-100 rounded-sm w-11/12"
                          animate={{ width: ["91.666667%", "95%", "91.666667%"] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Skills Section */}
                  <div>
                    <div className="h-3 bg-[#DAA520]/20 mb-2 w-1/4 rounded-sm"></div>
                    {/* Skill bars */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className="h-2 bg-gray-100 w-1/4 rounded-sm"></div>
                        <motion.div 
                          className="h-1.5 bg-[#DAA520]/40 rounded-full flex-1"
                          initial={{ width: "70%" }}
                          animate={{ width: ["70%", "75%", "70%"] }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 bg-gray-100 w-1/5 rounded-sm"></div>
                        <motion.div 
                          className="h-1.5 bg-[#DAA520]/30 rounded-full flex-1"
                          initial={{ width: "85%" }}
                          animate={{ width: ["85%", "90%", "85%"] }}
                          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.3 }}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 bg-gray-100 w-1/5 rounded-sm"></div>
                        <motion.div 
                          className="h-1.5 bg-[#DAA520]/20 rounded-full flex-1"
                          initial={{ width: "60%" }}
                          animate={{ width: ["60%", "63%", "60%"] }}
                          transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse", delay: 0.6 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Animated Paw Prints Trail */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                  className="absolute"
                  animate={{
                    left: ["-5%", "110%"],
                    top: ["110%", "-10%"],
                    opacity: [0, 1, 1, 0],
                    scale: [0.8, 1, 1, 0.8]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.2, 0.8, 1]
                  }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        left: `${i * 20}px`,
                        top: `${i * 20}px`,
                        rotate: `${i * 5}deg`
                      }}
                      animate={{
                        rotate: [`${i * 5}deg`, `${i * 5 + 5}deg`, `${i * 5}deg`]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z" fill="#DAA520" fillOpacity="0.4"/>
                        <path d="M16 9C17.1046 9 18 8.10457 18 7C18 5.89543 17.1046 5 16 5C14.8954 5 14 5.89543 14 7C14 8.10457 14.8954 9 16 9Z" fill="#DAA520" fillOpacity="0.4"/>
                        <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="#DAA520" fillOpacity="0.4"/>
                        <path d="M5 15C6.10457 15 7 14.1046 7 13C7 11.8954 6.10457 11 5 11C3.89543 11 3 11.8954 3 13C3 14.1046 3.89543 15 5 15Z" fill="#DAA520" fillOpacity="0.4"/>
                        <path d="M19 15C20.1046 15 21 14.1046 21 13C21 11.8954 20.1046 11 19 11C17.8954 11 17 11.8954 17 13C17 14.1046 17.8954 15 19 15Z" fill="#DAA520" fillOpacity="0.4"/>
                      </svg>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              
              {/* Animated Cursor */}
              <motion.div
                className="absolute hidden md:block w-4 h-4 z-10"
                style={{
                  borderRadius: "50%",
                  boxShadow: "0 0 0 1px rgba(0,0,0,0.1), 0 0 0 3px rgba(218, 165, 32, 0.2)",
                  backgroundColor: "rgba(218, 165, 32, 0.1)"
                }}
                animate={{
                  x: [100, 200, 150, 180, 120],
                  y: [100, 120, 200, 150, 100],
                  scale: [1, 1.2, 1, 1.1, 1]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.5, 0.8, 1]
                }}
              >
                <motion.div
                  className="w-1 h-1 bg-[#DAA520] rounded-full mx-auto mt-[7px]"
                  animate={{
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity
                  }}
                />
              </motion.div>
              
              {/* Advanced AI assistance animations */}
              
              {/* AI Improvement Suggestions */}
              <motion.div
                className="absolute bottom-4 left-20 flex items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [10, 0, 0, -10],
                }}
                transition={{
                  duration: 4,
                  times: [0, 0.1, 0.9, 1],
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
              >
                <div className="bg-black/90 text-white text-xs py-1 px-2 rounded-md shadow-md flex items-center">
                  <motion.div 
                    className="w-2 h-2 bg-[#DAA520] rounded-full mr-1.5"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <span>Improve profile summary</span>
                </div>
              </motion.div>
              
              {/* AI Magic Wand Animation */}
              <motion.div
                className="absolute top-1/3 right-1/4"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1.2, 1, 0.8],
                  rotate: [0, 10, -5, 0]
                }}
                transition={{
                  duration: 3,
                  times: [0, 0.3, 0.7, 1],
                  repeat: Infinity,
                  repeatDelay: 6,
                  ease: "easeInOut"
                }}
              >
                <div className="relative">
                  {/* Magic wand */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 4L18 7M8.5 19L3 13.5L13.5 3L20 9.5L8.5 19Z" stroke="#DAA520" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  
                  {/* Sparkles */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#DAA520]/60"
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: 0.5
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-[#DAA520]/60"
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: 0.7,
                      delay: 0.3
                    }}
                  />
                </div>
              </motion.div>
              
              {/* AI Text Generation Effect */}
              <motion.div
                className="absolute top-[45%] right-[20%] bg-black/80 text-[9px] text-[#DAA520] py-0.5 px-1.5 rounded z-20"
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [5, 0, 0, -5],
                }}
                transition={{
                  duration: 5,
                  times: [0, 0.1, 0.9, 1],
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: "easeInOut"
                }}
              >
                <motion.span
                  animate={{
                    opacity: [0, 1]
                  }}
                  transition={{
                    duration: 2,
                    times: [0, 1],
                    repeat: 0
                  }}
                >
                  AI generating content...
                </motion.span>
              </motion.div>
              
              {/* Neural Network Animation */}
              <motion.div 
                className="absolute bottom-10 left-6 opacity-70"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.7, 0],
                }}
                transition={{
                  duration: 5,
                  times: [0, 0.2, 1],
                  repeat: Infinity,
                  repeatDelay: 5,
                }}
              >
                <svg width="50" height="40" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Neural network nodes */}
                  {[...Array(3)].map((_, i) => (
                    <g key={`layer1-${i}`}>
                      <motion.circle 
                        cx={30} 
                        cy={25 + i * 25} 
                        r={4} 
                        fill="#DAA520" 
                        fillOpacity={0.7}
                        animate={{
                          r: [4, 5, 4],
                          fillOpacity: [0.5, 0.9, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    </g>
                  ))}
                  
                  {[...Array(4)].map((_, i) => (
                    <g key={`layer2-${i}`}>
                      <motion.circle 
                        cx={60} 
                        cy={15 + i * 22} 
                        r={4} 
                        fill="#DAA520" 
                        fillOpacity={0.7}
                        animate={{
                          r: [4, 5, 4],
                          fillOpacity: [0.5, 0.9, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.15 + 0.5
                        }}
                      />
                    </g>
                  ))}
                  
                  {[...Array(2)].map((_, i) => (
                    <g key={`layer3-${i}`}>
                      <motion.circle 
                        cx={90} 
                        cy={35 + i * 30} 
                        r={4} 
                        fill="#DAA520" 
                        fillOpacity={0.7}
                        animate={{
                          r: [4, 5, 4],
                          fillOpacity: [0.5, 0.9, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3 + 1
                        }}
                      />
                    </g>
                  ))}
                  
                  {/* Connection lines with animated pulses */}
                  {[...Array(3)].map((_, i) => (
                    [...Array(4)].map((_, j) => (
                      <g key={`conn1-${i}-${j}`}>
                        <line 
                          x1={30} 
                          y1={25 + i * 25} 
                          x2={60} 
                          y2={15 + j * 22} 
                          stroke="#DAA520" 
                          strokeOpacity={0.3} 
                          strokeWidth={0.5}
                        />
                        <motion.circle
                          cx={0}
                          cy={0}
                          r={1}
                          fill="#DAA520"
                          animate={{
                            cx: [30, 60],
                            cy: [25 + i * 25, 15 + j * 22],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 1.5,
                            times: [0, 0.5, 1],
                            repeat: Infinity,
                            repeatDelay: Math.random() * 5,
                            ease: "easeInOut"
                          }}
                        />
                      </g>
                    ))
                  ))}
                  
                  {[...Array(4)].map((_, i) => (
                    [...Array(2)].map((_, j) => (
                      <g key={`conn2-${i}-${j}`}>
                        <line 
                          x1={60} 
                          y1={15 + i * 22} 
                          x2={90} 
                          y2={35 + j * 30} 
                          stroke="#DAA520" 
                          strokeOpacity={0.3} 
                          strokeWidth={0.5}
                        />
                        <motion.circle
                          cx={0}
                          cy={0}
                          r={1}
                          fill="#DAA520"
                          animate={{
                            cx: [60, 90],
                            cy: [15 + i * 22, 35 + j * 30],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 1.5,
                            times: [0, 0.5, 1],
                            repeat: Infinity,
                            repeatDelay: Math.random() * 5,
                            ease: "easeInOut"
                          }}
                        />
                      </g>
                    ))
                  ))}
                </svg>
              </motion.div>
              
              {/* Smart Grammar Suggestion */}
              <motion.div
                className="absolute bottom-28 right-10 flex items-center"
                initial={{ opacity: 0, y: 5 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [5, 0, 0, -5],
                }}
                transition={{
                  duration: 4,
                  times: [0, 0.1, 0.9, 1],
                  repeat: Infinity,
                  repeatDelay: 7,
                  delay: 2,
                  ease: "easeInOut"
                }}
              >
                <motion.div 
                  className="bg-[#DAA520]/10 border border-[#DAA520]/30 text-black text-[8px] py-0.5 px-1 rounded"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(218, 165, 32, 0)", 
                      "0 0 0 3px rgba(218, 165, 32, 0.2)",
                      "0 0 0 0 rgba(218, 165, 32, 0)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  "experienced" → "proficient"
                </motion.div>
              </motion.div>
              
              {/* Profile Summary Improvement Suggestions - Three rotating variants */}
              {['first', 'second', 'third'].map((variant, index) => (
                <motion.div
                  key={variant}
                  className="absolute top-[120px] left-[80px] z-30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0.8, 1, 1, 0.8],
                  }}
                  transition={{
                    duration: 8,
                    times: [0, 0.1, 0.9, 1],
                    repeat: Infinity,
                    repeatDelay: 12, // Long enough for all three to show
                    delay: 1.5 + (index * 7) // Staggered delays
                  }}
                >
                  <div className="relative">
                    <motion.div 
                      className="bg-black rounded-md p-1.5 shadow-lg"
                      animate={{
                        y: [0, -2, 0, -2, 0]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="text-white text-[7px] max-w-[120px]">
                        <div className="flex items-center mb-1">
                          <svg className="w-2 h-2 mr-1 text-[#DAA520]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 16L11 12L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M11 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M19 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          <span className="font-bold text-[#DAA520]">AI Improvement</span>
                        </div>
                        
                        {/* Three different improvement suggestions */}
                        {index === 0 && (
                          <>
                            <div className="mb-1">Your summary needs more impact.</div>
                            
                            <div className="bg-[#111] p-1 rounded mb-1">
                              <div className="mb-0.5 text-gray-400">Current:</div>
                              <div className="text-[6px] text-gray-300">Experienced software developer with skills in React and Node.js.</div>
                            </div>
                            
                            <div className="bg-[#1a1a1a] p-1 rounded">
                              <div className="mb-0.5 text-[#DAA520]">Suggested:</div>
                              <div className="text-[6px] text-white">Results-driven software developer who increased user engagement by 40% through innovative React and Node.js solutions.</div>
                            </div>
                          </>
                        )}
                        
                        {index === 1 && (
                          <>
                            <div className="mb-1">Add measurable achievements.</div>
                            
                            <div className="bg-[#111] p-1 rounded mb-1">
                              <div className="mb-0.5 text-gray-400">Current:</div>
                              <div className="text-[6px] text-gray-300">Marketing specialist with experience in social media campaigns.</div>
                            </div>
                            
                            <div className="bg-[#1a1a1a] p-1 rounded">
                              <div className="mb-0.5 text-[#DAA520]">Suggested:</div>
                              <div className="text-[6px] text-white">Strategic marketing specialist who grew Instagram following by 250% and generated $15K in attributable revenue through targeted campaigns.</div>
                            </div>
                          </>
                        )}
                        
                        {index === 2 && (
                          <>
                            <div className="mb-1">Highlight leadership qualities.</div>
                            
                            <div className="bg-[#111] p-1 rounded mb-1">
                              <div className="mb-0.5 text-gray-400">Current:</div>
                              <div className="text-[6px] text-gray-300">Project manager with 5 years of experience.</div>
                            </div>
                            
                            <div className="bg-[#1a1a1a] p-1 rounded">
                              <div className="mb-0.5 text-[#DAA520]">Suggested:</div>
                              <div className="text-[6px] text-white">Transformational project manager who led cross-functional teams of 15+ to deliver $2M in projects ahead of schedule and under budget.</div>
                            </div>
                          </>
                        )}
                      </div>
                      
                      <div className="flex justify-between mt-1">
                        <motion.button 
                          className="text-[6px] text-gray-400 px-1 py-0.5 rounded bg-[#222]"
                          whileHover={{ scale: 1.05, backgroundColor: "#333" }}
                        >
                          Skip
                        </motion.button>
                        <motion.button 
                          className="text-[6px] text-black px-1 py-0.5 rounded bg-[#DAA520]"
                          whileHover={{ scale: 1.05, backgroundColor: "#c99417" }}
                          animate={{
                            boxShadow: [
                              "0 0 0 0 rgba(218, 165, 32, 0.2)",
                              "0 0 0 2px rgba(218, 165, 32, 0.4)",
                              "0 0 0 0 rgba(218, 165, 32, 0.2)"
                            ]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity
                          }}
                        >
                          Apply
                        </motion.button>
                      </div>
                    </motion.div>
                    
                    {/* Connector line */}
                    <motion.svg 
                      width="30" 
                      height="50" 
                      viewBox="0 0 30 50" 
                      fill="none" 
                      className="absolute top-1/2 -right-[18px]"
                      animate={{
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    >
                      <path d="M0 25C20 25 30 40 30 50" stroke="#DAA520" strokeDasharray="2 2" />
                      <circle cx="0" cy="25" r="2" fill="#DAA520" />
                    </motion.svg>
                  </div>
                </motion.div>
              ))}
              
              {/* Skills Enhancement Suggestion */}
              <motion.div
                className="absolute bottom-[90px] right-[75px] z-30"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.9, 1, 1, 0.9],
                }}
                transition={{
                  duration: 7,
                  times: [0, 0.1, 0.9, 1],
                  repeat: Infinity,
                  repeatDelay: 6,
                  delay: 5
                }}
              >
                <motion.div 
                  className="bg-black/90 rounded p-1 max-w-[100px]"
                  animate={{
                    y: [0, -2, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="flex items-center mb-1">
                    <motion.div
                      className="w-2 h-2 mr-1 rounded-full bg-[#DAA520]"
                      animate={{
                        scale: [1, 1.3, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    />
                    <span className="text-[6px] text-white font-medium">Skills Analysis</span>
                  </div>
                  
                  <div className="text-[6px] text-[#DAA520] font-medium mb-0.5">Missing in-demand skills:</div>
                  
                  <div className="flex flex-wrap gap-0.5 mb-1">
                    {["TypeScript", "AWS", "Docker"].map((skill, i) => (
                      <motion.div
                        key={skill}
                        className="text-[5px] bg-[#222] text-white rounded px-0.5"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          backgroundColor: i === 0 ? ["#222", "#DAA520/30", "#222"] : "#222"
                        }}
                        transition={{ 
                          delay: i * 0.3,
                          duration: i === 0 ? 2 : 0.3,
                          repeat: i === 0 ? Infinity : 0,
                          repeatDelay: i === 0 ? 4 : 0
                        }}
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="text-[6px] text-white">
                    Adding these skills could increase interview chances by <span className="text-[#DAA520] font-bold">35%</span>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Job Title Optimization */}
              <motion.div
                className="absolute top-[100px] right-[60px] z-30"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 6,
                  times: [0, 0.1, 0.8, 1],
                  repeat: Infinity,
                  repeatDelay: 8,
                  delay: 3.5
                }}
              >
                <div className="flex items-center">
                  <motion.div 
                    className="bg-gradient-to-r from-black/90 to-black/95 rounded-md p-1 text-center shadow-lg border border-[#DAA520]/20"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(218, 165, 32, 0)",
                        "0 0 10px 2px rgba(218, 165, 32, 0.2)",
                        "0 0 0 0 rgba(218, 165, 32, 0)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  >
                    <div className="text-[6px] text-white mb-0.5">
                      <span className="text-[#DAA520]">AI</span> Title Optimizer
                    </div>
                    
                    <div className="flex justify-center items-center space-x-1 mb-1">
                      <div className="text-[6px] text-gray-200 line-through">Developer</div>
                      <svg className="w-2 h-2 text-[#DAA520]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <motion.div
                        className="text-[6px] text-[#DAA520] font-bold"
                        animate={{
                          scale: [1, 1.1, 1]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity
                        }}
                      >
                        Software Engineer
                      </motion.div>
                    </div>
                    
                    <div className="text-[5px] text-gray-300">
                      +65% more interview requests
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* AI Writing In Progress - Three rotating messages */}
              {['work', 'skills', 'achievements'].map((content, index) => (
                <motion.div
                  key={`generating-${content}`}
                  className="absolute top-[160px] left-[30px]"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.9, 0.9, 0]
                  }}
                  transition={{
                    duration: 5,
                    times: [0, 0.2, 0.8, 1],
                    repeat: Infinity,
                    repeatDelay: 12, // Long enough for all three
                    delay: index * 5.5 // Staggered to show one after another
                  }}
                >
                  <div className="relative">
                    <svg className="w-36 h-4" viewBox="0 0 120 12" fill="none">
                      <rect width="120" height="12" fill="#111111" rx="2"/>
                      
                      <motion.rect 
                        x="4" 
                        y="4" 
                        width="0" 
                        height="4" 
                        fill="#DAA520"
                        animate={{
                          width: [0, 112, 0]
                        }}
                        transition={{
                          duration: 5,
                          times: [0, 0.8, 1],
                          repeat: Infinity,
                          repeatDelay: 12
                        }}
                      />
                      
                      <motion.text 
                        x="60" 
                        y="8" 
                        fontSize="6" 
                        fontFamily="sans-serif" 
                        fill="white" 
                        textAnchor="middle" 
                        dominantBaseline="middle"
                        opacity="0.8"
                      >
                        {index === 0 && "AI generating work experience..."}
                        {index === 1 && "AI enhancing skills section..."}
                        {index === 2 && "AI adding quantifiable achievements..."}
                      </motion.text>
                    </svg>
                  </div>
                </motion.div>
              ))}
              
              {/* Main AI pointer */}
              <motion.div
                className="absolute bottom-4 right-12 flex items-center"
                animate={{
                  y: [0, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="bg-black/90 text-white text-xs py-1 px-2 rounded mr-2 shadow-md flex items-center">
                  <motion.div
                    className="mr-1 w-3 h-3 relative"
                    animate={{
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <div className="absolute inset-0 rounded-full border-2 border-[#DAA520] border-t-transparent"></div>
                  </motion.div>
                  AI Suggestion
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="#DAA520" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 5L19 12L12 19" stroke="#DAA520" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Animated Cat Paw Divider */}
      <div className="relative h-6 overflow-hidden bg-white">
        <div className="absolute inset-0 flex items-center justify-around">
          {[...Array(8)].map((_, i) => (
            <motion.div 
              key={i}
              initial={{ y: 30 }} 
              animate={{ y: [30, -5, 30] }}
              transition={{ 
                duration: 1.5, 
                delay: i * 0.2, 
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z" fill="#DAA520" fillOpacity="0.5"/>
                <path d="M16 9C17.1046 9 18 8.10457 18 7C18 5.89543 17.1046 5 16 5C14.8954 5 14 5.89543 14 7C14 8.10457 14.8954 9 16 9Z" fill="#DAA520" fillOpacity="0.5"/>
                <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="#DAA520" fillOpacity="0.5"/>
                <path d="M5 15C6.10457 15 7 14.1046 7 13C7 11.8954 6.10457 11 5 11C3.89543 11 3 11.8954 3 13C3 14.1046 3.89543 15 5 15Z" fill="#DAA520" fillOpacity="0.5"/>
                <path d="M19 15C20.1046 15 21 14.1046 21 13C21 11.8954 20.1046 11 19 11C17.8954 11 17 11.8954 17 13C17 14.1046 17.8954 15 19 15Z" fill="#DAA520" fillOpacity="0.5"/>
              </svg>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Counter Section */}
      <section className="bg-gray-50 py-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-8">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-8 h-8 bg-[#DAA520]/10 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z" stroke="#DAA520" strokeWidth="2"/>
                <path d="M7 7H17" stroke="#DAA520" strokeWidth="2" strokeLinecap="round"/>
                <path d="M7 12H17" stroke="#DAA520" strokeWidth="2" strokeLinecap="round"/>
                <path d="M7 17H13" stroke="#DAA520" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-medium text-gray-800">12,548</span>
              <span className="text-xs text-gray-600">CVs created</span>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-8 h-8 bg-[#DAA520]/10 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#DAA520" strokeWidth="2"/>
                <path d="M12 6V12L16 16" stroke="#DAA520" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-medium text-gray-800">1.2M</span>
              <span className="text-xs text-gray-600">job applications</span>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-8 h-8 bg-[#DAA520]/10 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="#DAA520" strokeWidth="2"/>
                <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#DAA520" strokeWidth="2"/>
                <path d="M23 21V19C22.9986 17.1458 21.765 15.5552 20 15" stroke="#DAA520" strokeWidth="2"/>
                <path d="M16 3C17.654 3.53511 18.7595 5.13988 18.7595 6.95C18.7595 8.76012 17.654 10.3649 16 10.9" stroke="#DAA520" strokeWidth="2"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-medium text-gray-800">98%</span>
              <span className="text-xs text-gray-600">satisfaction rate</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-10 px-4 bg-white relative">
        {/* Background animation */}
        <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
          <motion.div 
            className="absolute w-32 h-32"
            style={{ bottom: "-5%", left: "15%" }}
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 10C50 10 55 25 45 40C38 50 25 60 30 80C30 80 45 75 50 50C50 50 55 75 75 90C75 90 90 70 75 55C60 40 65 25 65 25C65 25 60 28 55 28C50 28 50 25 50 25C50 25 50 28 45 28C40 28 35 25 35 25C35 25 40 40 25 55C10 70 25 90 25 90C45 75 50 50 50 50C55 75 70 80 70 80C75 60 62 50 55 40C45 25 50 10 50 10Z" fill="#000000"/>
            </svg>
          </motion.div>
          <motion.div 
            className="absolute w-24 h-24"
            style={{ top: "10%", right: "10%" }}
            animate={{ 
              scale: [1, 0.9, 1],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z" fill="#000000"/>
              <path d="M16 9C17.1046 9 18 8.10457 18 7C18 5.89543 17.1046 5 16 5C14.8954 5 14 5.89543 14 7C14 8.10457 14.8954 9 16 9Z" fill="#000000"/>
              <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="#000000"/>
              <path d="M5 15C6.10457 15 7 14.1046 7 13C7 11.8954 6.10457 11 5 11C3.89543 11 3 11.8954 3 13C3 14.1046 3.89543 15 5 15Z" fill="#000000"/>
              <path d="M19 15C20.1046 15 21 14.1046 21 13C21 11.8954 20.1046 11 19 11C17.8954 11 17 11.8954 17 13C17 14.1046 17.8954 15 19 15Z" fill="#000000"/>
            </svg>
          </motion.div>
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-8 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2 
              className="text-lg font-medium mb-2"
              whileInView={{
                textShadow: ["0px 0px 0px rgba(218,165,32,0)", "0px 0px 5px rgba(218,165,32,0.3)", "0px 0px 0px rgba(218,165,32,0)"],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            >
              How <span className="text-[#DAA520]">CVCat</span> Works
            </motion.h2>
            <p className="text-xs text-gray-600 max-w-lg mx-auto">
              Three simple steps to create a professional CV that gets noticed
            </p>
            
            {/* Cat paw trace animation */}
            <div className="absolute left-0 right-0 -bottom-12 h-8 pointer-events-none overflow-hidden">
              <motion.div
                className="flex space-x-6 justify-center"
                animate={{ x: [0, -80] }}
                transition={{ 
                  repeat: Infinity,
                  duration: 8,
                  ease: "linear"
                }}
              >
                {[...Array(8)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#DAA520] opacity-30">
                    <path d="M8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z" fill="currentColor"/>
                    <path d="M16 9C17.1046 9 18 8.10457 18 7C18 5.89543 17.1046 5 16 5C14.8954 5 14 5.89543 14 7C14 8.10457 14.8954 9 16 9Z" fill="currentColor"/>
                    <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="currentColor"/>
                    <path d="M5 15C6.10457 15 7 14.1046 7 13C7 11.8954 6.10457 11 5 11C3.89543 11 3 11.8954 3 13C3 14.1046 3.89543 15 5 15Z" fill="currentColor"/>
                    <path d="M19 15C20.1046 15 21 14.1046 21 13C21 11.8954 20.1046 11 19 11C17.8954 11 17 11.8954 17 13C17 14.1046 17.8954 15 19 15Z" fill="currentColor"/>
                  </svg>
                ))}
              </motion.div>
            </div>
          </motion.div>
          
          {/* Process steps with connecting lines */}
          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Connecting line animation */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 -translate-y-1/2 h-0.5 bg-gray-100">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#DAA520] to-transparent"
                animate={{ x: [-300, 300]}}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3,
                  ease: "linear"
                }}
              />
            </div>
            {[
              { 
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 4H4V11H11V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 4H13V11H20V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11 13H4V20H11V13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 13H13V20H20V13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: "Choose a Template",
                description: "Select from our collection of professional templates designed by career experts."
              },
              { 
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5C12 5 13 9 10 12C9 13 7 14 7.5 18C7.5 18 11 17 12 12C12 12 13 17 17 19C17 19 19 15 17 13C15 11 16 9 16 9C16 9 15 10 14 10C13 10 13 9 13 9C13 9 13 10 12 10C11 10 10 9 10 9C10 9 11 11 9 13C7 15 9 19 9 19C13 17 14 12 14 12C15 17 18.5 18 18.5 18C19 14 17 13 16 12C13 9 14 5 14 5" fill="currentColor"/>
                  </svg>
                ),
                title: "Get AI Assistance",
                description: "Our AI cat assistant helps refine your content for maximum impact."
              },
              { 
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.5 10H15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.5 14H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: "Export & Apply",
                description: "Download your polished CV in multiple formats and start applying for jobs."
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="card-flat p-4 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  borderColor: "#DAA520" 
                }}
              >
                {/* Step Number */}
                <div className="absolute top-0 right-0 w-6 h-6 bg-[#DAA520] text-white text-xs flex items-center justify-center">
                  {index + 1}
                </div>
                
                <div className="h-8 w-8 text-[#DAA520] mb-3 flex items-center justify-center">
                  {step.icon}
                </div>
                <h3 className="text-sm font-medium mb-1">{step.title}</h3>
                <p className="text-xs text-gray-500">{step.description}</p>
                
                {/* Paw print */}
                <motion.div 
                  className="absolute bottom-2 right-2 opacity-30"
                  animate={{ 
                    rotate: [0, 10, 0, -10, 0],
                    scale: [1, 1.1, 1, 1.1, 1] 
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z" fill="#DAA520"/>
                    <path d="M16 9C17.1046 9 18 8.10457 18 7C18 5.89543 17.1046 5 16 5C14.8954 5 14 5.89543 14 7C14 8.10457 14.8954 9 16 9Z" fill="#DAA520"/>
                    <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="#DAA520"/>
                    <path d="M5 15C6.10457 15 7 14.1046 7 13C7 11.8954 6.10457 11 5 11C3.89543 11 3 11.8954 3 13C3 14.1046 3.89543 15 5 15Z" fill="#DAA520"/>
                    <path d="M19 15C20.1046 15 21 14.1046 21 13C21 11.8954 20.1046 11 19 11C17.8954 11 17 11.8954 17 13C17 14.1046 17.8954 15 19 15Z" fill="#DAA520"/>
                  </svg>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <Features />
      
      {/* Cat-themed Testimonials */}
      <section className="py-10 px-4 bg-gray-50 relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <motion.div 
            className="absolute bottom-0 left-10 w-32 h-32"
            animate={{ 
              rotate: [0, 5, 0, -5, 0],
              opacity: [0.05, 0.08, 0.05]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 10C50 10 55 25 45 40C38 50 25 60 30 80C30 80 45 75 50 50C50 50 55 75 75 90C75 90 90 70 75 55C60 40 65 25 65 25C65 25 60 28 55 28C50 28 50 25 50 25C50 25 50 28 45 28C40 28 35 25 35 25C35 25 40 40 25 55C10 70 25 90 25 90C45 75 50 50 50 50C55 75 70 80 70 80C75 60 62 50 55 40C45 25 50 10 50 10Z" fill="#000000" fillOpacity="0.05"/>
            </svg>
          </motion.div>
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-8 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-lg font-medium mb-2">What Our Users Say</h2>
            <p className="text-xs text-gray-500 max-w-lg mx-auto">
              Success stories from professionals who found their dream jobs
            </p>
            
            {/* Cat ears decoration */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 10C5 10 0 7 0 0C0 0 3 5 5 5C7 5 10 0 10 0C10 0 13 5 15 5C17 5 20 0 20 0C20 7 15 10 15 10H5Z" fill="#DAA520" fillOpacity="0.3"/>
              </svg>
            </div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: "Alex Morgan",
                role: "Software Engineer",
                image: "M",
                text: "The AI cat assistant was surprisingly helpful. It suggested improvements to my CV that I hadn't considered. Landed a job within 2 weeks!"
              },
              {
                name: "Sarah Chen",
                role: "Marketing Manager",
                image: "S",
                text: "I love how easy it is to create different versions of my CV for different job applications. The cat-themed interface makes a tedious task actually fun."
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white border border-gray-100 hover:border-[#DAA520]/50 p-4 relative shadow-sm"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -3,
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  borderColor: "rgba(218, 165, 32, 0.5)"
                }}
              >
                <div className="flex">
                  <div className="w-8 h-8 bg-[#DAA520]/10 flex items-center justify-center text-xs font-medium text-[#DAA520] mr-3">
                    {testimonial.image}
                  </div>
                  <div>
                    <p className="text-xs mb-2 text-gray-600 italic">"{testimonial.text}"</p>
                    <p className="text-xs font-medium">{testimonial.name}</p>
                    <p className="text-[10px] text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                
                {/* Paw mark */}
                <div className="absolute bottom-2 right-2 opacity-20">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z" fill="#DAA520"/>
                    <path d="M16 9C17.1046 9 18 8.10457 18 7C18 5.89543 17.1046 5 16 5C14.8954 5 14 5.89543 14 7C14 8.10457 14.8954 9 16 9Z" fill="#DAA520"/>
                    <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="#DAA520"/>
                    <path d="M5 15C6.10457 15 7 14.1046 7 13C7 11.8954 6.10457 11 5 11C3.89543 11 3 11.8954 3 13C3 14.1046 3.89543 15 5 15Z" fill="#DAA520"/>
                    <path d="M19 15C20.1046 15 21 14.1046 21 13C21 11.8954 20.1046 11 19 11C17.8954 11 17 11.8954 17 13C17 14.1046 17.8954 15 19 15Z" fill="#DAA520"/>
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Companies Section */}
      <section className="py-8 px-4 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Our users land jobs at top companies</h2>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-8 opacity-60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
          >
            {[...Array(5)].map((_, index) => (
              <motion.div 
                key={index}
                className="w-24 h-12 flex items-center justify-center"
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <svg viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {index === 0 && (
                    <>
                      <path d="M45 10H55M45 15H55M45 20H50" stroke="black" strokeWidth="1" strokeLinecap="round"/>
                      <rect x="10" y="5" width="30" height="20" rx="2" stroke="black" strokeWidth="1"/>
                      <rect x="60" y="5" width="30" height="20" rx="10" stroke="black" strokeWidth="1"/>
                    </>
                  )}
                  {index === 1 && (
                    <>
                      <circle cx="50" cy="15" r="10" stroke="black" strokeWidth="1"/>
                      <path d="M20 5L30 25M30 5L20 25" stroke="black" strokeWidth="1" strokeLinecap="round"/>
                      <path d="M70 5V25M80 5V25M70 15H80" stroke="black" strokeWidth="1" strokeLinecap="round"/>
                    </>
                  )}
                  {index === 2 && (
                    <>
                      <path d="M20 15C20 10 25 5 30 5H40C45 5 50 10 50 15C50 20 45 25 40 25H30C25 25 20 20 20 15Z" stroke="black" strokeWidth="1"/>
                      <path d="M60 5H80L70 15L80 25H60" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    </>
                  )}
                  {index === 3 && (
                    <>
                      <rect x="20" y="5" width="20" height="20" rx="2" stroke="black" strokeWidth="1"/>
                      <path d="M50 5L60 15L50 25" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M60 5L70 15L60 25" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    </>
                  )}
                  {index === 4 && (
                    <>
                      <path d="M30 5H70M30 15H70M30 25H70" stroke="black" strokeWidth="1" strokeLinecap="round"/>
                      <circle cx="20" cy="15" r="10" stroke="black" strokeWidth="1"/>
                      <circle cx="80" cy="15" r="10" stroke="black" strokeWidth="1"/>
                    </>
                  )}
                </svg>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Cat-themed CTA */}
      <section className="py-12 px-4 bg-gradient-to-b from-black to-[#111111] text-white relative">
        {/* Gold diagonal line accent */}
        <div className="absolute left-0 right-0 top-0 bottom-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -left-10 w-40 h-40 rotate-45 bg-gradient-to-r from-[#DAA520]/5 to-[#DAA520]/10"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rotate-45 bg-gradient-to-r from-[#DAA520]/10 to-[#DAA520]/5"></div>
        </div>
        
        <motion.div 
          className="max-w-4xl mx-auto relative z-10 border border-[#DAA520]/30 p-6 bg-[#0A0A0A]/80 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Animated gold accent line */}
          <motion.div 
            className="absolute inset-x-0 top-0 h-[1px]"
            style={{ 
              background: "linear-gradient(90deg, transparent, rgba(218, 165, 32, 0.7), transparent)" 
            }}
            animate={{
              backgroundPosition: ["200% 0", "-200% 0"],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
          
          {/* Cat silhouette */}
          <div className="absolute -right-10 -bottom-10 opacity-10">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, 0, -2, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 10C50 10 55 25 45 40C38 50 25 60 30 80C30 80 45 75 50 50C50 50 55 75 75 90C75 90 90 70 75 55C60 40 65 25 65 25C65 25 60 28 55 28C50 28 50 25 50 25C50 25 50 28 45 28C40 28 35 25 35 25C35 25 40 40 25 55C10 70 25 90 25 90C45 75 50 50 50 50C55 75 70 80 70 80C75 60 62 50 55 40C45 25 50 10 50 10Z" fill="#DAA520" fillOpacity="0.3"/>
              </svg>
            </motion.div>
          </div>
          
          <div className="text-center relative z-10">
            <motion.h2 
              className="text-lg font-medium mb-2 text-white"
              animate={{
                textShadow: ["0px 0px 0px rgba(218,165,32,0)", "0px 0px 8px rgba(218,165,32,0.5)", "0px 0px 0px rgba(218,165,32,0)"],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            >
              Ready to create a <span className="text-[#DAA520]">purr</span>fect CV?
            </motion.h2>
            <p className="text-xs text-gray-300 max-w-md mx-auto mb-5">
              Join thousands of professionals who've boosted their careers with CVCat
            </p>
            
            <motion.div 
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/auth">
                <Button className="bg-[#DAA520] text-white hover:bg-[#DAA520]/80 text-xs font-medium py-2 px-6 border-0">
                  Get Started for Free
                </Button>
              </Link>
            </motion.div>
          </div>
          
          {/* Animated gold accent line at bottom */}
          <motion.div 
            className="absolute inset-x-0 bottom-0 h-[1px]"
            style={{ 
              background: "linear-gradient(90deg, transparent, rgba(218, 165, 32, 0.7), transparent)" 
            }}
            animate={{
              backgroundPosition: ["-200% 0", "200% 0"],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "linear",
              delay: 1.5
            }}
          />
        </motion.div>
      </section>
      
      {/* Pricing Section */}
      <Pricing />
    </Layout>
  );
}
