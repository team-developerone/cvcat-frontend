import { useState, useEffect, useCallback } from "react";
import Layout from "@/components/Layout";
import CVBuilderForm from "@/components/CVBuilderForm";
import ChatBot from "@/components/ChatBot";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useCV } from "@/lib/context";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  LucideCheck,
  LucideDownload,
  LucideFileText,
  LucideMessageCircle,
  LucideSave,
  LucideSettings2,
  LucideZap,
} from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "@/hooks/use-toast";
import CVPreview from "@/components/CVPreview";
import pdfService from "@/services/pdf-service";
import { useIsMobile } from "@/hooks/use-mobile";
import EmailVerificationModal from "@/components/EmailVerificationModal";
import EmailVerificationBanner from "@/components/EmailVerificationBanner";

// Available section types
export type SectionType =
  | 'personal'
  | 'experience'
  | 'volunteer'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'awards'
  | 'languages'
  | 'interests'
  | 'references'
  | 'publications'
  | 'custom';

export default function CVBuilder() {
  const { mainCV, setMainCV, saveCV, savingCV, loadCVById } = useCV();
  const [, navigate] = useLocation();
  const ENABLE_CV_ASSISTANT = false;
  const isMobile = useIsMobile();
  const [activeTemplate, setActiveTemplate] = useState("modern");
  const [activeColor, setActiveColor] = useState("golden");
  const [activeTab, setActiveTab] = useState<"edit" | "preview" | "chat">("edit");
  const [activeSection, setActiveSection] = useState<SectionType>("personal");
  const [isDownloading, setIsDownloading] = useState(false);
  const [showEmailVerificationModal, setShowEmailVerificationModal] = useState(false);
  const [pendingSaveAction, setPendingSaveAction] = useState<"save" | "saveAndExit" | null>(null);
  const [isMobileTemplateDrawerOpen, setIsMobileTemplateDrawerOpen] = useState(false);

  const handleDownloadPDF = useCallback(async () => {
    if (!mainCV || isDownloading) return;

    // Check if email is verified
    if (mainCV.isEmailVerified === false) {
      toast({ 
        title: 'Email Verification Required', 
        description: 'Please verify your email before downloading your CV.',
        variant: 'destructive'
      });
      return;
    }

    try {
      setIsDownloading(true);
      toast({ title: 'Generating PDF...', description: 'Please wait while we prepare your CV.' });
      const blob = await pdfService.generatePDF(mainCV, activeTemplate as any);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${mainCV.personalInfo.fullName || 'CV'}_${activeTemplate}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: 'PDF Downloaded!', description: 'Your CV has been saved.' });
    } catch (err) {
      console.error(err);
      toast({ title: 'Download failed', description: 'Something went wrong generating the PDF.', variant: 'destructive' });
    } finally {
      setIsDownloading(false);
    }
  }, [mainCV, activeTemplate, isDownloading]);

  // Load specific CV by ID from query param, or create empty CV for fresh start
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cvId = params.get("id");
    if (cvId) {
      loadCVById(cvId);
    } else if (!mainCV) {
      setMainCV({
        id: '',
        title: 'Untitled CV',
        lastUpdated: new Date(),
        isTailored: false,
        personalInfo: { fullName: '', title: '', email: '', phone: '', location: '', summary: '' },
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: [],
        languages: [],
        references: [],
        publications: [],
        volunteer: [],
        awards: [],
        interests: [],
        customSections: [],
      });
    }
  }, [loadCVById]);

  useEffect(() => {
    if (!ENABLE_CV_ASSISTANT && activeTab === "chat") {
      setActiveTab("edit");
    }
  }, [ENABLE_CV_ASSISTANT, activeTab]);

  useEffect(() => {
    if (!isMobile || activeTab !== "preview") {
      setIsMobileTemplateDrawerOpen(false);
    }
  }, [isMobile, activeTab]);

  // Dynamic page title
  useEffect(() => {
    const name = mainCV?.personalInfo?.fullName;
    document.title = name ? `Edit CV - ${name} | CVCat` : 'CV Builder | CVCat';
    return () => { document.title = 'CVCat'; };
  }, [mainCV?.personalInfo?.fullName]);

  const handleSave = useCallback(async () => {
    if (!mainCV) return;

    // Check if this is a new CV (not an existing one being edited)
    const isExistingCV = mainCV.id && mainCV.id.length === 24 && /^[a-f0-9]+$/.test(mainCV.id);

    // If it's a new CV and has an email, show verification modal first
    if (!isExistingCV && mainCV.personalInfo?.email) {
      setPendingSaveAction("save");
      setShowEmailVerificationModal(true);
      return;
    }

    // Otherwise, proceed with save
    await performSave();
  }, [mainCV]);

  const performSave = useCallback(async () => {
    if (!mainCV) return;
    try {
      await saveCV(mainCV);
      toast({ title: "CV saved successfully" });
    } catch (err: unknown) {
      toast({
        title: "Save failed",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
    }
  }, [mainCV, saveCV]);

  const performSaveAndExit = useCallback(async () => {
    if (!mainCV) {
      navigate("/cv-management");
      return;
    }
    try {
      await saveCV(mainCV);
      toast({ title: "CV saved successfully" });
      navigate("/cv-management");
    } catch (err: unknown) {
      toast({
        title: "Save failed",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
    }
  }, [mainCV, saveCV, navigate]);

  const handleEmailVerificationConfirm = useCallback(async (updatedEmail: string) => {
    setShowEmailVerificationModal(false);
    
    // Update the email in mainCV if it was changed
    if (mainCV && mainCV.personalInfo?.email !== updatedEmail) {
      const updatedCV = {
        ...mainCV,
        personalInfo: {
          ...mainCV.personalInfo,
          email: updatedEmail,
        },
      };
      setMainCV(updatedCV);
      
      // Save with the updated CV
      if (pendingSaveAction === "save") {
        try {
          await saveCV(updatedCV);
          toast({ title: "CV saved successfully" });
        } catch (err: unknown) {
          toast({
            title: "Save failed",
            description: err instanceof Error ? err.message : "Unknown error",
            variant: "destructive",
          });
        }
      } else if (pendingSaveAction === "saveAndExit") {
        try {
          await saveCV(updatedCV);
          toast({ title: "CV saved successfully" });
          navigate("/cv-management");
        } catch (err: unknown) {
          toast({
            title: "Save failed",
            description: err instanceof Error ? err.message : "Unknown error",
            variant: "destructive",
          });
        }
      }
    } else {
      // No email change, proceed with normal save
      if (pendingSaveAction === "save") {
        await performSave();
      } else if (pendingSaveAction === "saveAndExit") {
        await performSaveAndExit();
      }
    }
    
    setPendingSaveAction(null);
  }, [mainCV, pendingSaveAction, performSave, performSaveAndExit, saveCV, setMainCV, navigate]);

  const handleEmailVerificationCancel = useCallback(() => {
    setShowEmailVerificationModal(false);
    setPendingSaveAction(null);
  }, []);

  const handleBannerEmailUpdated = useCallback((newEmail: string) => {
    setMainCV((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          email: newEmail,
        },
      };
    });
  }, [setMainCV]);

  const handleBannerVerificationSent = useCallback(async () => {
    // Refresh the CV to get updated verification status
    if (mainCV?.id) {
      try {
        const updatedCV = await loadCVById(mainCV.id);
        if (updatedCV) {
          setMainCV(updatedCV);
        }
      } catch (err) {
        console.error("Failed to refresh CV:", err);
      }
    }
  }, [mainCV?.id, loadCVById, setMainCV]);

  const handleSaveAndExit = useCallback(async () => {
    if (!mainCV) {
      navigate("/cv-management");
      return;
    }

    // Check if this is a new CV (not an existing one being edited)
    const isExistingCV = mainCV.id && mainCV.id.length === 24 && /^[a-f0-9]+$/.test(mainCV.id);

    // If it's a new CV and has an email, show verification modal first
    if (!isExistingCV && mainCV.personalInfo?.email) {
      setPendingSaveAction("saveAndExit");
      setShowEmailVerificationModal(true);
      return;
    }

    // Otherwise, proceed with save and exit
    await performSaveAndExit();
  }, [mainCV, navigate, performSaveAndExit]);

  // Listen for "Save & Exit" from Navbar
  useEffect(() => {
    const handler = () => { handleSaveAndExit(); };
    window.addEventListener("cvcat:save-and-exit", handler);
    return () => window.removeEventListener("cvcat:save-and-exit", handler);
  }, [handleSaveAndExit]);
  
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
    },
    { 
      id: "professional", 
      name: "Professional",
      description: "Two-column layout with clean lines and text only",
      headerStyle: "left-aligned",
      accentStyle: "line",
      fontFamily: "Arial, sans-serif",
      spacing: "compact"
    },
    { 
      id: "simple-ats", 
      name: "Simple ATS",
      description: "ATS-friendly single-column with blue headings",
      headerStyle: "left-aligned",
      accentStyle: "line",
      fontFamily: "Arial, sans-serif",
      spacing: "normal"
    },
    { 
      id: "pure-ats", 
      name: "Pure ATS",
      description: "Plain text-only layout, maximum ATS compatibility",
      headerStyle: "left-aligned",
      accentStyle: "line",
      fontFamily: "Times New Roman, serif",
      spacing: "compact"
    },
    { 
      id: "traditional", 
      name: "Traditional",
      description: "Classic centered layout with gray banners",
      headerStyle: "centered",
      accentStyle: "banner",
      fontFamily: "Georgia, serif",
      spacing: "normal"
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
    { id: 'volunteer', name: 'Volunteer', icon: 'heart' },
    { id: 'education', name: 'Education', icon: 'graduation-cap' },
    { id: 'skills', name: 'Skills', icon: 'star' },
    { id: 'projects', name: 'Projects', icon: 'code' },
    { id: 'certifications', name: 'Certifications', icon: 'certificate' },
    { id: 'awards', name: 'Awards', icon: 'trophy' },
    { id: 'languages', name: 'Languages', icon: 'language' },
    { id: 'interests', name: 'Interests', icon: 'lightbulb' },
    { id: 'references', name: 'References', icon: 'users' },
    { id: 'publications', name: 'Publications', icon: 'file-text' },
    { id: 'custom', name: 'Custom Sections', icon: 'plus-circle' }
  ];

  const activeSectionMeta = sections.find((section) => section.id === activeSection);
  const activeTemplateMeta = templates.find((template) => template.id === activeTemplate) ?? templates[0];
  
  return (
    <Layout>
      {/* Email Verification Banner - shown when email is not verified */}
      {mainCV && mainCV.isEmailVerified === false && mainCV.personalInfo?.email && (
        <EmailVerificationBanner
          cvId={mainCV.id}
          currentEmail={mainCV.personalInfo.email}
          onEmailUpdated={handleBannerEmailUpdated}
          onVerificationSent={handleBannerVerificationSent}
        />
      )}

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-screen-2xl mx-auto">
          <div className="p-2 md:p-6">
            <Tabs 
              defaultValue="edit" 
              value={activeTab} 
              onValueChange={(value) => {
                const next = value as "edit" | "preview" | "chat";
                if (!ENABLE_CV_ASSISTANT && next === "chat") return;
                setActiveTab(next);
              }}
              className="w-full mb-2 md:mb-6"
            >
              <div className={isMobile ? "sticky top-0 z-20 -mx-2 mb-3 bg-gray-50/95 px-2 pb-3 pt-1 backdrop-blur supports-[backdrop-filter]:bg-gray-50/80" : "flex items-center gap-2 md:gap-3 mb-1 md:mb-2"}>
                {isMobile ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <TabsList className={`grid flex-1 ${ENABLE_CV_ASSISTANT ? "grid-cols-3" : "grid-cols-2"} h-12 rounded-2xl border border-gray-200 bg-white p-1 shadow-sm`}>
                        <TabsTrigger
                          value="edit"
                          className="rounded-xl data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=active]:shadow-none h-10 text-xs font-medium"
                        >
                          <LucideFileText className="mr-1.5 h-4 w-4" />
                          Edit
                        </TabsTrigger>
                        <TabsTrigger
                          value="preview"
                          className="rounded-xl data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=active]:shadow-none h-10 text-xs font-medium"
                        >
                          <LucideZap className="mr-1.5 h-4 w-4" />
                          Preview
                        </TabsTrigger>
                        {ENABLE_CV_ASSISTANT && (
                          <TabsTrigger
                            value="chat"
                            className="rounded-xl data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=active]:shadow-none h-10 text-xs font-medium"
                          >
                            <LucideMessageCircle className="mr-1.5 h-4 w-4" />
                            Assistant
                          </TabsTrigger>
                        )}
                      </TabsList>
                      <Button
                        onClick={handleSave}
                        disabled={savingCV || !mainCV}
                        className="h-12 w-12 rounded-2xl bg-[#DAA520] px-0 text-white shadow-sm hover:bg-[#B8860B]"
                        title={savingCV ? "Saving" : "Save CV"}
                      >
                        {savingCV ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        ) : (
                          <LucideSave className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-white px-3 py-2.5 shadow-sm">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gray-400">
                            {activeTab === "edit" ? "Currently editing" : "Preview mode"}
                          </p>
                          <p className="truncate text-sm font-semibold text-gray-900">
                            {activeTab === "edit" ? activeSectionMeta?.name : `${activeTemplateMeta.name} template`}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => setActiveTab(activeTab === "edit" ? "preview" : "edit")}
                          className="h-8 rounded-full px-3 text-xs text-gray-600"
                        >
                          {activeTab === "edit" ? "Quick preview" : "Back to edit"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <TabsList className={`grid flex-1 ${ENABLE_CV_ASSISTANT ? "grid-cols-3" : "grid-cols-2"} rounded-full h-9 md:h-12 p-0.5 md:p-1 bg-gray-100`}>
                      <TabsTrigger
                        value="edit"
                        className="rounded-full data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm h-8 md:h-10 text-xs md:text-sm"
                      >
                        <LucideFileText className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1 md:mr-2" />
                        Edit CV
                      </TabsTrigger>
                      <TabsTrigger
                        value="preview"
                        className="rounded-full data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm h-8 md:h-10 text-xs md:text-sm"
                      >
                        <LucideZap className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1 md:mr-2" />
                        Preview & Download
                      </TabsTrigger>
                      {ENABLE_CV_ASSISTANT && (
                        <TabsTrigger
                          value="chat"
                          className="rounded-full data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm h-8 md:h-10 text-xs md:text-sm"
                        >
                          <LucideMessageCircle className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1 md:mr-2" />
                          CV Assistant
                        </TabsTrigger>
                      )}
                    </TabsList>
                    <Button
                      onClick={handleSave}
                      disabled={savingCV || !mainCV}
                      className="bg-[#DAA520] hover:bg-[#B8860B] text-white rounded-full h-9 md:h-12 px-3 md:px-5 text-xs md:text-sm font-medium shadow-sm transition-all flex-shrink-0"
                    >
                      {savingCV ? (
                        <div className="w-3.5 h-3.5 md:w-4 md:h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1 md:mr-2" />
                      ) : (
                        <LucideSave className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1 md:mr-2" />
                      )}
                      {savingCV ? "Saving..." : "Save"}
                    </Button>
                  </>
                )}
              </div>

              <div className="mt-2 md:mt-6">
                <div className="flex flex-col lg:flex-row lg:gap-6">
                  {/* Left Panel: Section Navigation */}
                  {/* Mobile: Horizontal scrollable pills */}
                  {isMobile && activeTab === "edit" && (
                    <div className="mb-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gray-400">
                            Jump to section
                          </p>
                          <p className="truncate text-sm font-semibold text-gray-900">
                            {activeSectionMeta?.name}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => setActiveTab("preview")}
                          className="h-8 rounded-full px-3 text-xs text-gray-600"
                        >
                          Preview
                        </Button>
                      </div>
                      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
                        {sections.map((section) => (
                          <button
                            key={section.id}
                            className={`flex-shrink-0 whitespace-nowrap rounded-full border px-3 py-2 text-xs font-medium transition-colors ${
                              activeSection === section.id
                                ? 'border-gray-900 bg-gray-900 text-white'
                                : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'
                            }`}
                            onClick={() => setActiveSection(section.id as SectionType)}
                          >
                            {section.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Desktop: Vertical sidebar (always mounted, hidden when not in edit mode) */}
                  {!isMobile && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: activeTab === "edit" ? 1 : 0, x: activeTab === "edit" ? 0 : -20 }}
                      className={`w-full lg:w-64 flex-shrink-0 mb-4 lg:mb-0 ${activeTab !== "edit" ? 'hidden' : ''}`}
                    >
                        <div className="bg-gray-900 p-4 rounded-xl shadow-sm">
                          <h3 className="text-xs font-medium uppercase tracking-wider text-gray-200 mb-3 ml-2">Sections</h3>
                          <div className="space-y-1">
                            {sections.map((section) => (
                              <button
                                key={section.id}
                                className={`w-full text-left flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                                  activeSection === section.id
                                    ? 'bg-[#DAA520]/10 font-medium !text-white'
                                    : '!text-white hover:bg-gray-800 hover:!text-white'
                                }`}
                                onClick={() => setActiveSection(section.id as SectionType)}
                              >
                                <i className={`fas fa-${section.icon} text-[#DAA520] w-5 text-center mr-2`}></i>
                                <span className="!text-white !opacity-100">{section.name}</span>
                              </button>
                            ))}
                          </div>
                          
                          <div className="mt-6 pt-6 border-t border-gray-700">
                            <Button
                              variant="outline"
                              className="w-full flex items-center justify-center text-sm border-dashed border-gray-700 bg-gray-800 hover:bg-gray-700 !text-white/90 hover:!text-white"
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
                    className="flex-1"
                  >
                    <TabsContent value="edit" className="mt-0" forceMount style={{ display: activeTab === 'edit' ? undefined : 'none' }}>
                      <CVBuilderForm activeSection={activeSection} />
                    </TabsContent>
                    
                    <TabsContent value="preview" className="mt-0">
                      {isMobile ? (
                        <>
                          <div className="space-y-3 pb-24">
                            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gray-400">
                                    Live preview
                                  </p>
                                  <h2 className="text-lg font-bold text-gray-900">Your CV</h2>
                                  <p className="mt-1 text-sm text-gray-500">
                                    Reviewing the <span className="font-medium text-gray-700">{activeTemplateMeta.name}</span> template.
                                    Swipe around the preview to inspect the layout.
                                  </p>
                                </div>
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => setIsMobileTemplateDrawerOpen(true)}
                                  className="h-10 rounded-xl px-3 text-xs font-medium"
                                >
                                  <LucideSettings2 className="mr-1.5 h-4 w-4" />
                                  Style
                                </Button>
                              </div>
                            </div>

                            {mainCV && (
                              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                                <div className="border-b border-gray-100 bg-gray-50 px-4 py-2 text-xs text-gray-500">
                                  Pinch and scroll to review spacing, hierarchy, and line breaks before you download.
                                </div>
                                <div className="p-1.5">
                                  <CVPreview
                                    cv={mainCV}
                                    template={activeTemplate as any}
                                    className="rounded-xl border-0 shadow-none"
                                    style={{ minHeight: '70vh' }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          <Drawer open={isMobileTemplateDrawerOpen} onOpenChange={setIsMobileTemplateDrawerOpen}>
                            <DrawerContent className="max-h-[85vh] overflow-hidden rounded-t-2xl border-x-0">
                              <DrawerHeader className="shrink-0 text-left">
                                <DrawerTitle>Choose a template</DrawerTitle>
                                <DrawerDescription>
                                  Switch styles without leaving the preview. Your content stays the same.
                                </DrawerDescription>
                              </DrawerHeader>
                              <div className="min-h-0 flex-1 overflow-y-auto px-4">
                                <div className="space-y-2 pb-4">
                                  {templates.map((template) => (
                                    <button
                                      key={template.id}
                                      type="button"
                                      onClick={() => {
                                        setActiveTemplate(template.id);
                                        setIsMobileTemplateDrawerOpen(false);
                                      }}
                                      className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors ${
                                        activeTemplate === template.id
                                          ? "border-[#DAA520] bg-[#DAA520]/5"
                                          : "border-gray-200 bg-white hover:bg-gray-50"
                                      }`}
                                    >
                                      <div className="flex items-start justify-between gap-3">
                                        <div>
                                          <p className="text-sm font-semibold text-gray-900">{template.name}</p>
                                          <p className="mt-1 text-xs leading-relaxed text-gray-500">
                                            {template.description}
                                          </p>
                                        </div>
                                        {activeTemplate === template.id && (
                                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#DAA520] text-white">
                                            <LucideCheck className="h-3.5 w-3.5" />
                                          </span>
                                        )}
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <DrawerFooter className="shrink-0 border-t border-gray-100 bg-white pb-[calc(env(safe-area-inset-bottom)+1rem)]">
                                {mainCV?.isEmailVerified === false && (
                                  <p className="text-center text-xs text-amber-700">
                                    Verify your email first to enable PDF download.
                                  </p>
                                )}
                                <Button
                                  onClick={handleDownloadPDF}
                                  disabled={isDownloading || mainCV?.isEmailVerified === false}
                                  className="bg-black text-white hover:bg-black/90"
                                >
                                  <LucideDownload className="mr-2 h-4 w-4" />
                                  {isDownloading ? "Generating..." : "Download PDF"}
                                </Button>
                              </DrawerFooter>
                            </DrawerContent>
                          </Drawer>

                          <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-lg backdrop-blur">
                            <div className="mx-auto flex max-w-md gap-2">
                              <Button
                                variant="outline"
                                onClick={() => setActiveTab("edit")}
                                className="h-11 rounded-xl px-4 text-xs font-medium"
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => setIsMobileTemplateDrawerOpen(true)}
                                className="h-11 rounded-xl px-4 text-xs font-medium"
                              >
                                <LucideSettings2 className="mr-1.5 h-4 w-4" />
                                Style
                              </Button>
                              <Button
                                onClick={handleDownloadPDF}
                                disabled={isDownloading || mainCV?.isEmailVerified === false}
                                className="h-11 flex-1 rounded-xl bg-black text-xs font-medium text-white hover:bg-[#DAA520]"
                              >
                                <LucideDownload className="mr-1.5 h-4 w-4" />
                                {isDownloading ? 'Generating...' : 'Download PDF'}
                              </Button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                          <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">CV Preview</h2>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-500 hover:text-black hover:bg-gray-100 text-sm"
                                onClick={handleDownloadPDF}
                                disabled={isDownloading}
                              >
                                <LucideDownload className="w-4 h-4 mr-2" />
                                {isDownloading ? 'Generating...' : 'Download'}
                              </Button>
                            </div>
                          </div>

                          {mainCV && (
                            <CVPreview
                              cv={mainCV}
                              template={activeTemplate as any}
                              style={{ minHeight: '400px' }}
                            />
                          )}
                        </div>
                      )}
                    </TabsContent>
                    
                    {ENABLE_CV_ASSISTANT && (
                      <TabsContent value="chat" className="mt-0">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-[80vh]">
                          <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">CV Assistant</h2>
                            <p className="text-sm text-gray-500">
                              Ask for advice or tips about your CV
                            </p>
                          </div>
                          <div className="h-[calc(80vh-120px)]">
                            <ChatBot isEmbedded={true} />
                          </div>
                        </div>
                      </TabsContent>
                    )}
                  </motion.div>
                  
                  {/* Right Panel: Design Options (always mounted, hidden when not in preview mode) */}
                  {!isMobile && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: activeTab === "preview" ? 1 : 0, x: activeTab === "preview" ? 0 : 20 }}
                      className={`lg:w-80 flex-shrink-0 mt-2 lg:mt-0 ${activeTab !== "preview" ? 'hidden' : ''}`}
                    >
                      <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${isMobile ? 'p-3' : 'p-4'}`}>
                        <div className="mb-3 md:mb-5">
                          <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-2 md:mb-3 ml-2">Template</h3>
                          <div className={`grid gap-1.5 md:gap-2 ${isMobile ? 'grid-cols-4' : 'grid-cols-3'}`}>
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
                                  {template.id === "professional" && (
                                    <div className="absolute inset-0 flex flex-col p-2">
                                      <div className="mb-1 pb-1 border-b-2 border-blue-500">
                                        <div className="w-12 h-1.5 bg-gray-800 rounded-sm mb-0.5"></div>
                                        <div className="w-16 h-0.5 bg-blue-400"></div>
                                      </div>
                                      <div className="flex flex-1 mt-1">
                                        <div className="w-3/5 border-r border-gray-200 pr-1 space-y-1">
                                          <div className="w-10 h-0.5 bg-blue-400 border-b border-blue-400 pb-0.5 mb-0.5"></div>
                                          <div className="w-full h-0.5 bg-gray-100"></div>
                                          <div className="w-full h-0.5 bg-gray-100"></div>
                                          <div className="w-10 h-0.5 bg-blue-400 mt-1 border-b border-blue-400 pb-0.5 mb-0.5"></div>
                                          <div className="w-full h-0.5 bg-gray-100"></div>
                                          <div className="w-3/4 h-0.5 bg-gray-100"></div>
                                        </div>
                                        <div className="w-2/5 pl-1 space-y-1">
                                          <div className="w-8 h-0.5 bg-blue-400 border-b border-blue-400 pb-0.5 mb-0.5"></div>
                                          <div className="w-full h-0.5 bg-gray-100"></div>
                                          <div className="w-8 h-0.5 bg-blue-400 mt-1 border-b border-blue-400 pb-0.5 mb-0.5"></div>
                                          <div className="w-full h-0.5 bg-gray-100"></div>
                                          <div className="w-2/3 h-0.5 bg-gray-100"></div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  {template.id === "simple-ats" && (
                                    <div className="absolute inset-0 flex flex-col p-2">
                                      <div className="flex justify-between items-start mb-1">
                                        <div>
                                          <div className="w-10 h-1 bg-blue-400 rounded-sm mb-0.5"></div>
                                          <div className="w-14 h-0.5 bg-blue-300"></div>
                                        </div>
                                        <div className="text-right space-y-0.5">
                                          <div className="w-10 h-0.5 bg-gray-200"></div>
                                          <div className="w-8 h-0.5 bg-gray-200"></div>
                                        </div>
                                      </div>
                                      <div className="w-8 h-0.5 bg-blue-300 mb-0.5 mt-1"></div>
                                      <div className="w-full h-px bg-gray-200 mb-1"></div>
                                      <div className="w-full h-0.5 bg-gray-100 mb-0.5"></div>
                                      <div className="w-8 h-0.5 bg-blue-300 mb-0.5 mt-1"></div>
                                      <div className="w-full h-px bg-gray-200 mb-1"></div>
                                      <div className="flex flex-wrap gap-1">
                                        {[1,2,3].map(i => (
                                          <div key={i} className="flex items-center gap-0.5">
                                            <div className="w-0.5 h-0.5 rounded-full bg-gray-400"></div>
                                            <div className="w-4 h-0.5 bg-gray-100"></div>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="w-8 h-0.5 bg-blue-300 mb-0.5 mt-1"></div>
                                      <div className="w-full h-px bg-gray-200 mb-1"></div>
                                      <div className="w-full h-0.5 bg-gray-100"></div>
                                      <div className="w-3/4 h-0.5 bg-gray-100 mt-0.5"></div>
                                    </div>
                                  )}
                                  {template.id === "pure-ats" && (
                                    <div className="absolute inset-0 flex flex-col p-2">
                                      <div className="mb-1">
                                        <div className="w-12 h-1.5 bg-gray-800 rounded-sm mb-0.5"></div>
                                        <div className="w-20 h-0.5 bg-gray-300"></div>
                                      </div>
                                      <div className="w-6 h-0.5 bg-gray-400 mb-0.5 mt-1"></div>
                                      <div className="w-full h-px bg-gray-300 mb-1"></div>
                                      <div className="w-full h-0.5 bg-gray-100 mb-0.5"></div>
                                      <div className="w-3/4 h-0.5 bg-gray-100 mb-1"></div>
                                      <div className="w-6 h-0.5 bg-gray-400 mb-0.5"></div>
                                      <div className="w-full h-px bg-gray-300 mb-1"></div>
                                      <div className="flex flex-wrap gap-1 mb-1">
                                        {[1,2,3,4].map(i => (
                                          <div key={i} className="w-5 h-0.5 bg-gray-100"></div>
                                        ))}
                                      </div>
                                      <div className="w-6 h-0.5 bg-gray-400 mb-0.5"></div>
                                      <div className="w-full h-px bg-gray-300 mb-1"></div>
                                      <div className="w-full h-0.5 bg-gray-100"></div>
                                      <div className="w-full h-0.5 bg-gray-100 mt-0.5"></div>
                                    </div>
                                  )}
                                  {template.id === "traditional" && (
                                    <div className="absolute inset-0 flex flex-col p-2">
                                      <div className="text-center mb-1">
                                        <div className="w-12 h-1.5 bg-gray-800 mx-auto rounded-sm mb-0.5"></div>
                                        <div className="w-8 h-0.5 bg-gray-400 mx-auto mb-0.5"></div>
                                        <div className="w-14 h-0.5 bg-gray-200 mx-auto"></div>
                                      </div>
                                      <div className="w-full h-3 bg-gray-100 flex items-center justify-center mb-1">
                                        <div className="w-6 h-0.5 bg-gray-400"></div>
                                      </div>
                                      <div className="w-full h-0.5 bg-gray-100 mb-0.5"></div>
                                      <div className="w-3/4 h-0.5 bg-gray-100 mb-1"></div>
                                      <div className="w-full h-3 bg-gray-100 flex items-center justify-center mb-1">
                                        <div className="w-4 h-0.5 bg-gray-400"></div>
                                      </div>
                                      <div className="flex flex-wrap gap-1 mb-1">
                                        {[1,2,3,4].map(i => (
                                          <div key={i} className="w-5 h-0.5 bg-gray-200"></div>
                                        ))}
                                      </div>
                                      <div className="w-full h-3 bg-gray-100 flex items-center justify-center">
                                        <div className="w-8 h-0.5 bg-gray-400"></div>
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
                        
                        
                        <div className="pb-2">
                          <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-3 ml-2">Actions</h3>
                          <div className="space-y-2">
                            <Button
                              className="w-full bg-black text-white hover:bg-black/90 text-xs py-2 h-9 disabled:opacity-50 disabled:cursor-not-allowed"
                              onClick={handleDownloadPDF}
                              disabled={isDownloading || mainCV?.isEmailVerified === false}
                              title={mainCV?.isEmailVerified === false ? "Please verify your email to download" : ""}
                            >
                              <LucideDownload className="w-3.5 h-3.5 mr-2" />
                              {isDownloading ? 'Generating...' : mainCV?.isEmailVerified === false ? 'Verify Email to Download' : 'Download as PDF'}
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

      {/* Email Verification Modal */}
      <EmailVerificationModal
        isOpen={showEmailVerificationModal}
        onClose={handleEmailVerificationCancel}
        onConfirm={handleEmailVerificationConfirm}
        email={mainCV?.personalInfo?.email || ""}
      />
    </Layout>
  );
}