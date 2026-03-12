import Layout from "@/components/Layout";
import CVSamplesModal from "@/components/CVSamplesModal";
import CVPreview from "@/components/CVPreview";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { fetchLatestCV } from "@/services/api";
import { toast } from "@/hooks/use-toast";
import { mockCVData, mockCVVariants } from "@/data/mockCVData";
import { useMetaTags } from "@/hooks/useMetaTags";

export default function LandingPage() {
  const [, navigate] = useLocation();
  const { signInWithGoogle, isAuthenticated } = useAuth();
  const [showSamplesModal, setShowSamplesModal] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Set SEO meta tags for the landing page
  useMetaTags({
    title: "CVCat - AI-Powered CV Builder | Create Professional Resumes in Minutes",
    description: "Create stunning, professional CVs and resumes with CVCat's AI-powered builder. Choose from multiple templates, optimize for ATS, and land your dream job faster.",
    keywords: "CV builder, resume builder, AI CV, professional CV, ATS-friendly, CV templates, resume maker, job search, career tools",
    ogImage: "https://cvcat.io/og-image.png",
    ogUrl: "https://cvcat.io/",
    canonicalUrl: "https://cvcat.io/"
  });

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    try {
      const { isFirstTime } = await signInWithGoogle();

      if (isFirstTime) {
        navigate("/import-selection");
        return;
      }

      try {
        const latestCV = await fetchLatestCV();
        if (!latestCV) {
          navigate("/import-selection");
        } else {
          navigate("/cv-management");
        }
      } catch {
        navigate("/import-selection");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Sign-in failed. Please try again.";
      toast({
        title: "Sign-in failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <Layout>
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
              <motion.div
                className="inline-flex items-center gap-2 bg-[#DAA520]/10 border border-[#DAA520]/30 px-3 py-1.5 rounded-full mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="text-xs font-bold text-[#DAA520]">100% FREE FOREVER</span>
                <span className="text-xs text-gray-600">• No credit card needed</span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Stop Wrestling With<br />
                <span className="text-[#DAA520]">Word Documents</span>
              </motion.h1>
              <motion.p 
                className="text-lg mb-6 max-w-lg text-gray-700 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Your entire career in one place. Update once, export anytime. Let AI handle the polish while you focus on landing that job.
              </motion.p>
              
              <motion.div
                className="mb-8 space-y-4 relative z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {/* AI Powered */}
                <motion.div
                  className="flex items-start gap-3 bg-white border border-gray-200 p-4 rounded-lg shadow-sm"
                  whileHover={{ 
                    scale: 1.02, 
                    borderColor: "rgba(218, 165, 32, 0.5)",
                    shadow: "lg"
                  }}
                >
                  <div className="w-10 h-10 bg-[#DAA520]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#DAA520]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">AI Does the Heavy Lifting</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">Smart suggestions to improve your content, optimize for ATS, and make every word count. No fluff, just results.</p>
                  </div>
                </motion.div>

                {/* Single Place Management */}
                <motion.div
                  className="flex items-start gap-3 bg-white border border-gray-200 p-4 rounded-lg shadow-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ 
                    scale: 1.02, 
                    borderColor: "rgba(218, 165, 32, 0.5)",
                    shadow: "lg"
                  }}
                >
                  <div className="w-10 h-10 bg-[#DAA520]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#DAA520]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">One Master CV. Infinite Possibilities.</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">Update your details once. Export to any format, any template. No more hunting through folders for "Final_CV_v3_FINAL.docx"</p>
                  </div>
                </motion.div>

                {/* 100% Free */}
                <motion.div
                  className="flex items-start gap-3 bg-gradient-to-br from-[#DAA520]/5 to-[#DAA520]/10 border-2 border-[#DAA520]/30 p-4 rounded-lg"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  whileHover={{ 
                    scale: 1.02,
                    borderColor: "rgba(218, 165, 32, 0.6)"
                  }}
                >
                  <div className="w-10 h-10 bg-[#DAA520] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">Actually Free</h3>
                    <p className="text-xs text-gray-700 leading-relaxed"><strong>All features. Forever.</strong> No trial expiring in 7 days. No surprise charges. No "upgrade to export" nonsense.</p>
                  </div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mb-6 md:justify-start justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button
                  className="btn-primary text-xs py-2 px-4"
                  onClick={() => setShowSamplesModal(true)}
                >
                  See Sample CVs
                </Button>
                {isAuthenticated && (
                  <Button
                    className="bg-[#DAA520] hover:bg-[#DAA520]/90 text-white text-xs py-2 px-4"
                    onClick={() => navigate("/cv-management")}
                  >
                    Go to Dashboard
                  </Button>
                )}
              </motion.div>

              <motion.div 
                className="flex flex-wrap gap-2 text-xs max-w-md mx-auto md:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                {[
                  "9 Templates",
                  "Unlimited Edits",
                  "ATS-Optimized",
                  "Import from PDF/Word",
                  "One-Click Export",
                  "Cloud Saved"
                ].map((feature, i) => (
                  <motion.span
                    key={feature}
                    className="bg-gray-100 border border-gray-300 px-3 py-1.5 rounded-full text-gray-700 font-medium"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + (i * 0.05) }}
                    whileHover={{ scale: 1.05, backgroundColor: "#f9f9f9" }}
                  >
                    {feature}
                  </motion.span>
                ))}
              </motion.div>

              {!isAuthenticated && (
                <motion.div
                  className="mt-6 max-w-md mx-auto md:mx-0"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <div className="bg-white border border-gray-200 shadow-md p-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Get Started</h3>
                    <p className="text-xs text-gray-500 mb-3">Continue with Google to start creating your professional CV.</p>
                    <Button
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={isSigningIn}
                      className="w-full flex items-center justify-center py-2.5 bg-black text-white rounded-lg hover:bg-[#DAA520] transition-all duration-300"
                    >
                      {isSigningIn ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      ) : (
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                        </svg>
                      )}
                      {isSigningIn ? "Signing in..." : "Continue with Google"}
                    </Button>
                  </div>
                </motion.div>
              )}
              
              {isAuthenticated && (
                <motion.div
                  className="mt-6 max-w-md mx-auto md:mx-0"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <div className="bg-gradient-to-r from-[#DAA520]/10 to-[#DAA520]/5 border border-[#DAA520]/30 shadow-md p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-[#DAA520]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13L9 17L19 7" />
                      </svg>
                      Welcome back!
                    </h3>
                    <p className="text-xs text-gray-600 mb-3">Ready to continue working on your professional CV?</p>
                    <Button
                      type="button"
                      onClick={() => navigate("/cv-management")}
                      className="w-full flex items-center justify-center py-2.5 bg-[#DAA520] text-white rounded-lg hover:bg-[#DAA520]/90 transition-all duration-300"
                    >
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5L16 12L9 19" />
                      </svg>
                      Go to Dashboard
                    </Button>
                  </div>
                </motion.div>
              )}
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
                  {/* Modern Silhouette Cat - Animated */}
                  <g>
                    {/* Semi-circular frame (top only) - animated */}
                    <motion.path 
                      d="M10 50 A 40 40 0 1 0 90 50" 
                      fill="none"
                      stroke="#DAA520"
                      strokeWidth="4"
                      strokeDasharray="250"
                      animate={{
                        strokeDashoffset: [250, 0],
                        opacity: [0.4, 1]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Cat head shape - with animation */}
                    <motion.path 
                      d="M25 75 L 75 75 C 78 55 75 40 50 40 C 25 40 22 55 25 75 Z" 
                      fill="#DAA520"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        y: [0, -2, 0]
                      }}
                      transition={{
                        y: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        },
                        opacity: { duration: 0.5 },
                        scale: { duration: 0.5 }
                      }}
                    />
                    
                    {/* Left ear - with animation */}
                    <motion.path 
                      d="M30 42 L 15 20 L 45 30 Z" 
                      fill="#DAA520"
                      animate={{
                        rotate: [-1, 1, -1],
                        transformOrigin: "30px 42px"
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Right ear - with animation */}
                    <motion.path 
                      d="M70 42 L 85 20 L 55 30 Z" 
                      fill="#DAA520"
                      animate={{
                        rotate: [1, -1, 1],
                        transformOrigin: "70px 42px"
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </g>
                  
                  {/* Cat eyes - animated blinking */}
                  <motion.g
                    animate={{
                      scaleY: [1, 0.1, 1],
                    }}
                    transition={{
                      duration: 0.3,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut"
                    }}
                  >
                    {/* Left eye */}
                    <ellipse 
                      cx="35" 
                      cy="55" 
                      rx="5" 
                      ry="7" 
                      fill="white"
                    />
                    
                    {/* Right eye */}
                    <ellipse 
                      cx="65" 
                      cy="55" 
                      rx="5" 
                      ry="7" 
                      fill="white"
                    />
                  </motion.g>
                  
                  {/* Nose */}
                  <motion.path 
                    d="M47 65 L 50 68 L 53 65 Z" 
                    fill="white"
                    animate={{
                      y: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Whiskers with animation */}
                  <motion.g
                    animate={{
                      x: [0, 0.5, 0, -0.5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {/* Left whiskers */}
                    <line 
                      x1="30" y1="65" x2="15" y2="60" 
                      stroke="white" 
                      strokeWidth="1.5" 
                    />
                    <line 
                      x1="30" y1="68" x2="15" y2="68" 
                      stroke="white" 
                      strokeWidth="1.5" 
                    />
                    <line 
                      x1="30" y1="71" x2="15" y2="76" 
                      stroke="white" 
                      strokeWidth="1.5" 
                    />
                    
                    {/* Right whiskers */}
                    <line 
                      x1="70" y1="65" x2="85" y2="60" 
                      stroke="white" 
                      strokeWidth="1.5" 
                    />
                    <line 
                      x1="70" y1="68" x2="85" y2="68" 
                      stroke="white" 
                      strokeWidth="1.5" 
                    />
                    <line 
                      x1="70" y1="71" x2="85" y2="76" 
                      stroke="white" 
                      strokeWidth="1.5" 
                    />
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
                              <div className="text-[6px] text-white">Results-driven software developer focused on building reliable React and Node.js solutions.</div>
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
                              <div className="text-[6px] text-white">Strategic marketing specialist experienced in planning targeted social media campaigns.</div>
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
                              <div className="text-[6px] text-white">Transformational project manager who leads cross-functional teams to deliver high-impact projects.</div>
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
                    Add relevant skills to align your CV with role expectations.
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
                      More precise and searchable role title
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
      
      {/* Sample CV Templates Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute top-20 left-10">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z" fill="black"/>
              <path d="M16 9C17.1046 9 18 8.10457 18 7C18 5.89543 17.1046 5 16 5C14.8954 5 14 5.89543 14 7C14 8.10457 14.8954 9 16 9Z" fill="black"/>
              <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="black"/>
              <path d="M5 15C6.10457 15 7 14.1046 7 13C7 11.8954 6.10457 11 5 11C3.89543 11 3 11.8954 3 13C3 14.1046 3.89543 15 5 15Z" fill="black"/>
              <path d="M19 15C20.1046 15 21 14.1046 21 13C21 11.8954 20.1046 11 19 11C17.8954 11 17 11.8954 17 13C17 14.1046 17.8954 15 19 15Z" fill="black"/>
            </svg>
          </div>
          <div className="absolute bottom-20 right-20">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z" fill="black"/>
              <path d="M16 9C17.1046 9 18 8.10457 18 7C18 5.89543 17.1046 5 16 5C14.8954 5 14 5.89543 14 7C14 8.10457 14.8954 9 16 9Z" fill="black"/>
              <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="black"/>
              <path d="M5 15C6.10457 15 7 14.1046 7 13C7 11.8954 6.10457 11 5 11C3.89543 11 3 11.8954 3 13C3 14.1046 3.89543 15 5 15Z" fill="black"/>
              <path d="M19 15C20.1046 15 21 14.1046 21 13C21 11.8954 20.1046 11 19 11C17.8954 11 17 11.8954 17 13C17 14.1046 17.8954 15 19 15Z" fill="black"/>
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose from <span className="text-[#DAA520]">9 Premium</span> Templates
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Each template is carefully designed to be ATS-friendly while maintaining professional aesthetics. 
              See your CV rendered in real-time with our exact template system.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Modern Template */}
            <motion.div
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 group-hover:shadow-xl group-hover:border-[#DAA520]/30 transition-all duration-300">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Modern Template</h3>
                    <span className="text-xs bg-[#DAA520]/10 text-[#DAA520] px-2 py-1 rounded-full font-medium">
                      Popular
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Clean design with gold accents</p>
                </div>
                <div className="h-96 overflow-hidden bg-gray-50">
                  <div className="w-full">
                    <CVPreview 
                      cv={mockCVData} 
                      template="modern"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Creative Template */}
            <motion.div
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 group-hover:shadow-xl group-hover:border-[#DAA520]/30 transition-all duration-300">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Creative Template</h3>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                      Bold
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Eye-catching design with purple accents</p>
                </div>
                <div className="h-96 overflow-hidden bg-gray-50">
                  <div className="w-full">
                    <CVPreview 
                      cv={mockCVVariants.creative} 
                      template="creative"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Executive Template */}
            <motion.div
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 group-hover:shadow-xl group-hover:border-[#DAA520]/30 transition-all duration-300">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Executive Template</h3>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full font-medium">
                      Professional
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Formal layout for senior positions</p>
                </div>
                <div className="h-96 overflow-hidden bg-gray-50">
                  <div className="w-full">
                    <CVPreview 
                      cv={mockCVVariants.executive} 
                      template="executive"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Additional Templates Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[
              { name: 'Minimalist', template: 'minimalist', color: 'bg-blue-100 text-blue-700' },
              { name: 'Classic', template: 'classic', color: 'bg-green-100 text-green-700' },
              { name: 'Technical', template: 'technical', color: 'bg-indigo-100 text-indigo-700' },
              { name: 'Professional', template: 'professional', color: 'bg-gray-100 text-gray-700' },
              { name: 'Simple ATS', template: 'simple-ats', color: 'bg-cyan-100 text-cyan-700' },
              { name: 'Pure ATS', template: 'pure-ats', color: 'bg-emerald-100 text-emerald-700' }
            ].map((template, index) => (
              <motion.div
                key={template.name}
                className="group cursor-pointer"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-white rounded-lg border border-gray-200 p-3 group-hover:border-[#DAA520]/40 group-hover:shadow-md transition-all duration-200">
                  <div className="h-52 bg-gray-50 rounded mb-2 overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="transform scale-[0.32] origin-center">
                        <CVPreview 
                          cv={mockCVVariants.minimalist} 
                          template={template.template as any}
                          style={{ minHeight: '800px', width: '600px' }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="font-medium text-sm text-gray-900 mb-1">{template.name}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${template.color}`}>
                      Available
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button
              className="btn-primary text-sm py-3 px-6"
              onClick={() => setShowSamplesModal(true)}
            >
              View All Templates
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              See full-size previews and choose the perfect template for your industry
            </p>
          </motion.div>
        </div>
      </section>

      {/* Animated Cat Paw Divider */}
      <div className="relative h-6 overflow-hidden bg-gray-50">
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

      {/* Why CVCat Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <motion.div
            className="absolute top-10 right-10 w-28 h-28"
            animate={{ rotate: [0, 8, 0, -8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z" fill="#DAA520"/>
              <path d="M16 9C17.1046 9 18 8.10457 18 7C18 5.89543 17.1046 5 16 5C14.8954 5 14 5.89543 14 7C14 8.10457 14.8954 9 16 9Z" fill="#DAA520"/>
              <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="#DAA520"/>
              <path d="M5 15C6.10457 15 7 14.1046 7 13C7 11.8954 6.10457 11 5 11C3.89543 11 3 11.8954 3 13C3 14.1046 3.89543 15 5 15Z" fill="#DAA520"/>
              <path d="M19 15C20.1046 15 21 14.1046 21 13C21 11.8954 20.1046 11 19 11C17.8954 11 17 11.8954 17 13C17 14.1046 17.8954 15 19 15Z" fill="#DAA520"/>
            </svg>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for People Who <span className="text-[#DAA520]">Actually Apply</span> to Jobs
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We get it. You don't need another tool that "helps" you spend 3 hours on formatting.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "The Old Way",
                subtitle: "(and why it sucks)",
                items: [
                  "Dig through folders for latest CV",
                  "Fight with Word formatting",
                  "Manually tailor for each job",
                  "Pay $15/month for a PDF export",
                  "Lost v7_final_REAL.docx again"
                ],
                color: "border-red-200 bg-red-50/30"
              },
              {
                title: "The CVCat Way",
                subtitle: "(much better)",
                items: [
                  "One source of truth, always updated",
                  "AI suggests improvements instantly",
                  "Export any format, any template",
                  "Actually free. Like, really free.",
                  "Never lose your work again"
                ],
                color: "border-[#DAA520] bg-[#DAA520]/5 ring-2 ring-[#DAA520]/20"
              },
              {
                title: "What You Get",
                subtitle: "(the good stuff)",
                items: [
                  "Professional CV in minutes",
                  "9 battle-tested templates",
                  "ATS-friendly by default",
                  "Import existing CV instantly",
                  "Update once, use everywhere"
                ],
                color: "border-green-200 bg-green-50/30"
              }
            ].map((column, index) => (
              <motion.div
                key={column.title}
                className={`border-2 ${column.color} p-6 rounded-xl`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{column.title}</h3>
                  <p className="text-sm text-gray-600">{column.subtitle}</p>
                </div>
                <ul className="space-y-3">
                  {column.items.map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-700"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + i * 0.05 }}
                    >
                      {index === 0 ? (
                        <span className="text-red-500 mt-0.5">✗</span>
                      ) : (
                        <span className={`${index === 1 ? 'text-[#DAA520]' : 'text-green-600'} mt-0.5`}>✓</span>
                      )}
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-gray-600 mb-4">
              Join thousands who've already ditched the Word document struggle
            </p>
            {!isAuthenticated && (
              <Button
                onClick={handleGoogleSignIn}
                disabled={isSigningIn}
                className="bg-[#DAA520] hover:bg-[#B8860B] text-white font-semibold py-3 px-8 text-base rounded-lg shadow-lg"
              >
                {isSigningIn ? "Starting..." : "Get Started Free →"}
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      {/* CV Samples Modal */}
      <CVSamplesModal 
        isOpen={showSamplesModal} 
        onClose={() => setShowSamplesModal(false)} 
      />
    </Layout>
  );
}
