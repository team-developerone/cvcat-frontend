import Layout from "@/components/Layout";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useCV } from "@/lib/context";
import { CV } from "@/lib/types";
import { motion } from "framer-motion";
import { useState } from "react";

export default function CVManagement() {
  const { mainCV, tailoredCVs } = useCV();
  const [activeTab, setActiveTab] = useState<'all' | 'recent'>('all');
  
  // Format date for display
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate time since update for display
  const getTimeSince = (date: Date) => {
    const now = new Date();
    const updateDate = new Date(date);
    const diffInDays = Math.floor((now.getTime() - updateDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };
  
  return (
    <Layout isAuthenticated={true}>
      <div className="flex-1 min-h-screen bg-gray-50">
        {/* Background patterns */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute -top-20 left-[20%] w-72 h-72 bg-[#DAA520]/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 right-[10%] w-96 h-96 bg-[#DAA520]/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          {/* Header with action buttons */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-3xl font-bold">My CV Collection</h1>
              <p className="text-gray-500 mt-2">Manage and customize your professional profiles</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex gap-3"
            >
              <Button className="bg-black text-white hover:bg-[#DAA520] rounded-full px-5 py-2 shadow-sm transition-all duration-300">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                New CV
              </Button>
              <Button variant="outline" className="border border-gray-200 hover:border-[#DAA520] hover:text-[#DAA520] rounded-full px-5 py-2 transition-all duration-300">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Import
              </Button>
            </motion.div>
          </div>
          
          {/* Tab navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex border-b border-gray-200 mb-8"
          >
            <button 
              className={`pb-3 px-4 font-medium text-base relative ${activeTab === 'all' ? 'text-black' : 'text-gray-400'}`}
              onClick={() => setActiveTab('all')}
            >
              All CVs
              {activeTab === 'all' && (
                <motion.div 
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#DAA520]" 
                />
              )}
            </button>
            <button 
              className={`pb-3 px-4 font-medium text-base relative ${activeTab === 'recent' ? 'text-black' : 'text-gray-400'}`}
              onClick={() => setActiveTab('recent')}
            >
              Recent
              {activeTab === 'recent' && (
                <motion.div 
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#DAA520]" 
                />
              )}
            </button>
          </motion.div>
          
          {/* Core CV Section */}
          <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mb-10"
          >
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Core CV</h2>
              <p className="text-sm text-gray-500">This is your base resume that will be used for customization</p>
            </div>
            
            {mainCV && (
              <motion.div 
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="bg-white rounded-xl border-none shadow-lg overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      {/* Preview thumbnail */}
                      <div className="hidden md:block w-32 h-40 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                        <svg className="text-gray-300 w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-xs font-medium px-2 py-0.5 bg-[#DAA520]/10 text-[#DAA520] rounded-full">Core CV</span>
                            <h3 className="text-xl font-bold mt-2">{mainCV.title}</h3>
                          </div>
                          
                          <div className="flex space-x-1">
                            <Button size="sm" variant="ghost" className="h-8 w-8 rounded-full text-gray-400 hover:text-gray-700">
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                              </svg>
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">Professional</span>
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{mainCV.personalInfo.title}</span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {mainCV.personalInfo.summary || "Your comprehensive CV containing all your professional details and experience."}
                        </p>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-xs text-gray-500">
                            <svg className="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Updated {getTimeSince(mainCV.lastUpdated)}
                          </div>
                          
                          <div className="flex gap-3">
                            <Link href="/cv-builder">
                              <a className="text-xs font-medium text-[#DAA520] hover:underline flex items-center">
                                <svg className="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                Edit
                              </a>
                            </Link>
                            <button className="text-xs font-medium text-gray-500 hover:text-[#DAA520] flex items-center">
                              <svg className="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.section>
          
          {/* Tailored CVs Section */}
          <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Tailored CVs</h2>
              <Button
                variant="ghost"
                className="text-[#DAA520] hover:bg-[#DAA520]/10 rounded-lg transition-all"
              >
                <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Create Tailored Version
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tailored CV Cards */}
              {tailoredCVs.map((cv, index) => (
                <motion.div 
                  key={cv.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="bg-white rounded-xl border-none shadow overflow-hidden h-full">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="text-xs font-medium px-2 py-0.5 bg-blue-50 text-blue-500 rounded-full">Tailored</span>
                          <h3 className="text-lg font-bold mt-2">{cv.title}</h3>
                          <p className="text-sm text-gray-500">For: {cv.forJob}</p>
                        </div>
                        <Button size="sm" variant="ghost" className="h-8 w-8 rounded-full text-gray-400 hover:text-gray-700">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                          </svg>
                        </Button>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-6 line-clamp-3">{cv.description}</p>
                      
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center text-gray-500">
                          <svg className="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(cv.lastUpdated)}
                        </div>
                        
                        <div className="flex gap-3">
                          <Link href="/cv-builder">
                            <a className="text-xs font-medium text-[#DAA520] hover:underline flex items-center">
                              <svg className="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                              Edit
                            </a>
                          </Link>
                          <button className="text-xs font-medium text-gray-500 hover:text-[#DAA520] flex items-center">
                            <svg className="w-3.5 h-3.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              
              {/* Empty Tailored CV Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + (tailoredCVs.length * 0.1) }}
                whileHover={{ y: -5 }}
              >
                <Card className="border border-dashed border-gray-200 rounded-xl bg-white/50 p-8 flex flex-col items-center justify-center text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-[#DAA520]/10 flex items-center justify-center mb-5">
                    <svg className="w-8 h-8 text-[#DAA520]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Create Tailored CV</h3>
                  <p className="text-sm text-gray-500 mb-6 max-w-xs">Customize your CV for specific job applications to increase your chances of success</p>
                  <Button className="bg-black hover:bg-[#DAA520] text-white rounded-full px-6 py-2 shadow-sm transition-all duration-300">
                    Get Started
                  </Button>
                </Card>
              </motion.div>
            </div>
          </motion.section>
        </div>
      </div>
    </Layout>
  );
}
