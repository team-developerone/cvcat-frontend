import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useCV } from "@/lib/context";
import { CV } from "@/lib/types";
import { motion } from "framer-motion";
import { useState } from "react";
import PDFDownloadModal from "@/components/PDFDownloadModal";
import { toast } from "@/hooks/use-toast";
import { deleteCV } from "@/services/api";

export default function CVManagement() {
  const { mainCV, tailoredCVs, refreshCVs, cvsLoading } = useCV();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<'all' | 'recent'>('all');
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [selectedCV, setSelectedCV] = useState<CV | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl font-bold tracking-tight text-black">My CVs</h1>
              <p className="text-xs text-gray-700 mt-1">Manage your professional profiles</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex gap-2 mt-4 md:mt-0"
            >
              <Button
                onClick={() => navigate("/import-selection")}
                className="bg-black text-white hover:bg-[#DAA520] rounded-md px-3 py-1.5 text-xs shadow-sm transition-all"
              >
                <svg className="w-3.5 h-3.5 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                New
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/import-selection")}
                className="border border-gray-200 hover:border-[#DAA520] hover:text-[#DAA520] rounded-md px-3 py-1.5 text-xs transition-all"
              >
                <svg className="w-3.5 h-3.5 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Import
              </Button>
            </motion.div>
          </div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex border-b border-gray-200 mb-6"
          >
            <button
              className={`pb-2 px-3 text-xs font-semibold relative ${activeTab === 'all' ? 'text-black' : 'text-gray-500'}`}
              onClick={() => setActiveTab('all')}
            >
              All
              {activeTab === 'all' && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#DAA520]"
                />
              )}
            </button>
            <button
              className={`pb-2 px-3 text-xs font-semibold relative ${activeTab === 'recent' ? 'text-black' : 'text-gray-500'}`}
              onClick={() => setActiveTab('recent')}
            >
              Recent
              {activeTab === 'recent' && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#DAA520]"
                />
              )}
            </button>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={containerAnimation}
            initial="hidden"
            animate="show"
          >
            {/* Core CV Section */}
            {mainCV && (
              <motion.section
                variants={itemAnimation}
                className="mb-8"
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-bold text-black">Core CV</h2>
                  <p className="text-xs text-gray-500">Base template</p>
                </div>

                <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400 }}>
                  <Card className="bg-white rounded-md shadow-md border-2 border-gray-300 overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <div className="hidden md:block w-20 h-28 bg-gray-50 rounded border border-gray-200 flex-shrink-0 flex items-center justify-center overflow-hidden mr-4">
                          <svg className="text-gray-300 w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1.5">
                            <div>
                              <div className="flex items-center">
                                <span className="text-[10px] bg-[#DAA520]/10 text-[#DAA520] font-medium px-1.5 py-0.5 rounded-full">Core</span>
                                <h3 className="text-sm font-semibold ml-2 truncate text-gray-900">{mainCV.title}</h3>
                              </div>
                            </div>

                            <div className="flex">
                              <button
                                onClick={() => handleDelete(mainCV)}
                                disabled={deletingId === mainCV.id}
                                className="text-gray-400 hover:text-red-500 h-6 w-6 flex items-center justify-center"
                                title="Delete"
                              >
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-2">
                            <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 font-medium rounded-full">{mainCV.personalInfo.title}</span>
                          </div>

                          <p className="text-xs text-gray-600 mb-2 line-clamp-1">
                            {mainCV.personalInfo.summary || "Your comprehensive professional profile"}
                          </p>

                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-[10px] text-gray-500">
                              <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {getTimeSince(mainCV.lastUpdated)}
                            </div>

                            <div className="flex gap-2">
                              <Link href={`/cv-builder?id=${mainCV.id}`}>
                                <a className="text-[10px] font-medium text-[#DAA520] hover:underline flex items-center">
                                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                  </svg>
                                  Edit
                                </a>
                              </Link>
                              <button
                                onClick={() => handleOpenPDFModal(mainCV)}
                                className="text-[10px] font-medium text-gray-500 hover:text-[#DAA520] flex items-center"
                              >
                                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
              </motion.section>
            )}

            {/* Tailored CVs Section */}
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
