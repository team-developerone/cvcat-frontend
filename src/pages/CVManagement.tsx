import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useCV } from "@/lib/context";
import { CV } from "@/lib/types";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import PDFDownloadModal from "@/components/PDFDownloadModal";
import { toast } from "@/hooks/use-toast";
import { deleteCV } from "@/services/api";

export default function CVManagement() {
  const { mainCV, tailoredCVs, refreshCVs, cvsLoading } = useCV();
  const [, navigate] = useLocation();
  const [showTailoredSection, setShowTailoredSection] = useState(false);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [selectedCV, setSelectedCV] = useState<CV | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Dynamic page title
  useEffect(() => {
    document.title = 'My CVs | CVCat';
    return () => { document.title = 'CVCat'; };
  }, []);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTimeSince = (date: Date) => {
    const now = new Date();
    const updateDate = new Date(date);
    const diffInDays = Math.floor((now.getTime() - updateDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays}d ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w ago`;
    return `${Math.floor(diffInDays / 30)}mo ago`;
  };

  const handleOpenPDFModal = (cv: CV) => {
    setSelectedCV(cv);
    setPdfModalOpen(true);
  };

  const handleDelete = async (cv: CV) => {
    if (!confirm(`Delete "${cv.title}"? This cannot be undone.`)) return;
    setDeletingId(cv.id);
    try {
      await deleteCV(cv.id);
      toast({ title: "CV deleted" });
      await refreshCVs();
    } catch (err: unknown) {
      toast({
        title: "Delete failed",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  if (cvsLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#DAA520] border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  // If no CVs at all, redirect to import
  if (!mainCV && tailoredCVs.length === 0) {
    return (
      <Layout>
        <div className="flex-1 min-h-screen flex flex-col items-center justify-center bg-white">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-full bg-[#DAA520]/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#DAA520]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">No CVs yet</h2>
            <p className="text-gray-600 mb-6">Create your first CV or import an existing one to get started.</p>
            <Button
              onClick={() => navigate("/import-selection")}
              className="bg-black hover:bg-[#DAA520] text-white px-6 py-2"
            >
              Get Started
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex-1 min-h-screen bg-white">
        {/* Background patterns */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gray-50/80"></div>
          <div className="absolute -top-20 left-[20%] w-64 h-64 bg-[#DAA520]/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 right-[10%] w-64 h-64 bg-[#DAA520]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 md:mb-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl font-bold tracking-tight text-black">My CV</h1>
              <p className="text-sm text-gray-600 mt-2">Your professional document</p>
            </motion.div>
          </div>


          {/* Content */}
          <motion.div
            variants={containerAnimation}
            initial="hidden"
            animate="show"
          >
            {/* Core CV Document View */}
            {mainCV && (
              <motion.section
                variants={itemAnimation}
                className="mb-12"
              >
                <motion.div 
                  whileHover={{ y: -4 }} 
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="cursor-pointer"
                  onClick={() => navigate(`/cv-builder?id=${mainCV.id}`)}
                >
                  <Card className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="flex flex-col lg:flex-row">
                        {/* Document Preview */}
                        <div className="lg:w-1/3 bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center border-r border-gray-200">
                          <div className="relative">
                            {/* Document Icon with Shadow */}
                            <div className="w-32 h-40 bg-white rounded-lg shadow-lg border border-gray-300 relative overflow-hidden">
                              {/* Document Header */}
                              <div className="h-8 bg-[#DAA520]/10 border-b border-gray-200 flex items-center px-3">
                                <div className="w-2 h-2 bg-[#DAA520] rounded-full mr-2"></div>
                                <div className="w-16 h-1 bg-gray-300 rounded"></div>
                              </div>
                              
                              {/* Document Content Lines */}
                              <div className="p-3 space-y-2">
                                <div className="w-full h-1.5 bg-gray-800 rounded"></div>
                                <div className="w-3/4 h-1 bg-gray-400 rounded"></div>
                                <div className="w-full h-1 bg-gray-400 rounded"></div>
                                <div className="w-5/6 h-1 bg-gray-400 rounded"></div>
                                
                                <div className="pt-2">
                                  <div className="w-1/2 h-1 bg-[#DAA520] rounded mb-1"></div>
                                  <div className="w-full h-0.5 bg-gray-300 rounded"></div>
                                  <div className="w-4/5 h-0.5 bg-gray-300 rounded"></div>
                                  <div className="w-3/4 h-0.5 bg-gray-300 rounded"></div>
                                </div>
                                
                                <div className="pt-2">
                                  <div className="w-1/2 h-1 bg-[#DAA520] rounded mb-1"></div>
                                  <div className="w-full h-0.5 bg-gray-300 rounded"></div>
                                  <div className="w-2/3 h-0.5 bg-gray-300 rounded"></div>
                                </div>
                              </div>
                              
                              {/* Shine Effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-pulse"></div>
                            </div>
                            
                            {/* Status Badge */}
                            <div className="absolute -top-2 -right-2 bg-[#DAA520] text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                              ✓
                            </div>
                          </div>
                        </div>

                        {/* CV Details */}
                        <div className="lg:w-2/3 p-8">
                          <div className="flex justify-between items-start mb-6">
                            <div>
                              <div className="flex items-center mb-2">
                                <h2 className="text-2xl font-bold text-gray-900">{mainCV.title}</h2>
                                <span className="ml-3 text-xs bg-[#DAA520]/10 text-[#DAA520] font-semibold px-3 py-1 rounded-full">Core CV</span>
                              </div>
                              <p className="text-gray-600 mb-1">{mainCV.personalInfo.fullName}</p>
                              <p className="text-sm text-[#DAA520] font-medium">{mainCV.personalInfo.title}</p>
                            </div>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(mainCV);
                              }}
                              disabled={deletingId === mainCV.id}
                              className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-all"
                              title="Delete CV"
                            >
                              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>

                          <p className="text-gray-600 mb-6 leading-relaxed">
                            {mainCV.personalInfo.summary || "Your comprehensive professional profile showcasing your skills, experience, and achievements."}
                          </p>

                          {/* Quick Stats */}
                          <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                              <div className="text-lg font-bold text-gray-900">{mainCV.experience?.length || 0}</div>
                              <div className="text-xs text-gray-500">Experience</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                              <div className="text-lg font-bold text-gray-900">{mainCV.skills?.length || 0}</div>
                              <div className="text-xs text-gray-500">Skills</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                              <div className="text-lg font-bold text-gray-900">{mainCV.education?.length || 0}</div>
                              <div className="text-xs text-gray-500">Education</div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <Link href={`/cv-builder?id=${mainCV.id}`} className="flex-1">
                              <Button className="w-full bg-black hover:bg-[#DAA520] text-white font-medium py-3 rounded-lg transition-all shadow-md hover:shadow-lg">
                                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                Edit CV
                              </Button>
                            </Link>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenPDFModal(mainCV);
                              }}
                              variant="outline"
                              className="px-6 py-3 border-2 border-[#DAA520] text-[#DAA520] hover:bg-[#DAA520] hover:text-white font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
                            >
                              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              Download
                            </Button>
                          </div>

                          {/* Last Updated */}
                          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                            <div className="flex items-center text-sm text-gray-500">
                              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Last updated {getTimeSince(mainCV.lastUpdated)}
                            </div>
                            <div className="text-xs text-gray-400">
                              Click anywhere to edit
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.section>
            )}

            {/* Hidden Tailored CVs Section - Keep code but hide UI */}
            {showTailoredSection && (
              <motion.section variants={itemAnimation}>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-bold text-black">Tailored CVs</h2>
                  <Link href="/tailor-cv">
                    <Button
                      variant="ghost"
                      className="text-xs font-medium text-[#DAA520] hover:bg-[#DAA520]/5 rounded transition-all h-7 px-2"
                    >
                      <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      Create Tailored
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tailoredCVs.map((cv) => (
                    <motion.div
                      key={cv.id}
                      variants={itemAnimation}
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Card className="bg-white rounded-md shadow-md border-2 border-gray-300 overflow-hidden h-full">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-1.5">
                            <div>
                              <div className="flex items-center">
                                <span className="text-[10px] bg-blue-50 text-blue-600 font-medium px-1.5 py-0.5 rounded-full">Tailored</span>
                                <h3 className="text-sm font-semibold ml-2 truncate text-gray-900">{cv.title}</h3>
                              </div>
                              {cv.forJob && <p className="text-[10px] text-gray-500 mt-0.5">For: {cv.forJob}</p>}
                            </div>
                            <button
                              onClick={() => handleDelete(cv)}
                              disabled={deletingId === cv.id}
                              className="text-gray-400 hover:text-red-500 h-6 w-6 flex items-center justify-center"
                              title="Delete"
                            >
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>

                          <p className="text-xs text-gray-600 mb-3 line-clamp-2">{cv.description}</p>

                          <div className="flex justify-between items-center text-[10px]">
                            <div className="flex items-center text-gray-500">
                              <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {formatDate(cv.lastUpdated)}
                            </div>

                            <div className="flex gap-2">
                              <Link href={`/cv-builder?id=${cv.id}`}>
                                <a className="text-[10px] font-medium text-[#DAA520] hover:underline flex items-center">
                                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                  </svg>
                                  Edit
                                </a>
                              </Link>
                              <button
                                onClick={() => handleOpenPDFModal(cv)}
                                className="text-[10px] font-medium text-gray-500 hover:text-[#DAA520] flex items-center"
                              >
                                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                    variants={itemAnimation}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Card className="border-2 border-dashed border-gray-300 rounded-md bg-white p-4 flex flex-col items-center justify-center text-center h-full">
                      <div className="w-10 h-10 rounded-full bg-[#DAA520]/10 flex items-center justify-center mb-3">
                        <svg className="w-5 h-5 text-[#DAA520]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-sm mb-1 text-gray-900">Create Tailored CV</h3>
                      <p className="text-xs text-gray-600 mb-3 max-w-[180px]">Customize for specific job applications</p>
                      <Link href="/tailor-cv">
                        <Button className="bg-black hover:bg-[#DAA520] text-white text-xs rounded px-3.5 py-1.5 shadow-sm transition-all font-medium">
                          Create
                        </Button>
                      </Link>
                    </Card>
                  </motion.div>
                </div>
              </motion.section>
            )}
          </motion.div>
        </div>
      </div>

      {/* PDF Download Modal */}
      <PDFDownloadModal
        isOpen={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
        cv={selectedCV}
      />
    </Layout>
  );
}
