import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { importCV } from "@/services/api";
import { Sparkles, FileText, Brain, CheckCircle2, XCircle } from "lucide-react";

interface ImportAnimationModalProps {
  isOpen: boolean;
  onClose: () => void;
  importType: "pdf" | "word" | "linkedin" | null;
  file?: File | null;
  cvEmail?: string;
}

const cvTips = [
  { icon: "✨", text: "Great choice! We're analyzing your profile..." },
  { icon: "📄", text: "Extracting your experience and skills..." },
  { icon: "🎯", text: "Pro tip: Keep your CV concise and focused" },
  { icon: "💡", text: "Unpacking the details from your CV..." },
  { icon: "🚀", text: "Almost there! Organizing your information..." },
  { icon: "🎨", text: "Tip: Use action verbs to describe achievements" },
  { icon: "⚡", text: "Processing your professional journey..." },
  { icon: "🌟", text: "Tip: Quantify your achievements when possible" },
  { icon: "🔍", text: "Analyzing structure and formatting..." },
  { icon: "💼", text: "Your career story is taking shape..." },
  { icon: "✅", text: "Tip: Keep contact information up to date" },
  { icon: "🎓", text: "Finalizing education and certifications..." },
];

export default function ImportAnimationModal({
  isOpen,
  onClose,
  importType,
  file,
  cvEmail
}: ImportAnimationModalProps) {
  const [, navigate] = useLocation();
  const [progress, setProgress] = useState(0);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [status, setStatus] = useState<"processing" | "success" | "error">("processing");
  const [errorMessage, setErrorMessage] = useState("");
  const uploadStarted = useRef(false);
  const importedCVId = useRef<string | null>(null);
  const apiCallCompleted = useRef(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setProgress(0);
      setCurrentTipIndex(0);
      setStatus("processing");
      setErrorMessage("");
      uploadStarted.current = false;
      apiCallCompleted.current = false;
      importedCVId.current = null;
    }
  }, [isOpen]);

  // Start API call in the background
  useEffect(() => {
    if (!isOpen || !file || uploadStarted.current) return;
    uploadStarted.current = true;

    importCV(file, cvEmail)
      .then((res) => {
        if (res.data?._id) {
          importedCVId.current = res.data._id;
        }
        apiCallCompleted.current = true;
      })
      .catch((err) => {
        setErrorMessage(err.message || "Import failed. Please try again.");
        setStatus("error");
        apiCallCompleted.current = true;
      });
  }, [isOpen, file, cvEmail]);

  // 15-second fake progress bar with rotating tips
  useEffect(() => {
    if (!isOpen || status !== "processing") return;

    const totalDuration = 15000; // 15 seconds
    const progressInterval = 50; // Update every 50ms
    const totalSteps = totalDuration / progressInterval;
    const progressPerStep = 100 / totalSteps;
    
    // Change tip every 2 seconds
    const tipChangeInterval = 2000;
    
    let currentProgress = 0;
    let currentTip = 0;

    const progressTimer = setInterval(() => {
      currentProgress += progressPerStep;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        clearInterval(progressTimer);
        clearInterval(tipTimer);
        
        // Wait for API call to complete before showing success
        const checkApiInterval = setInterval(() => {
          if (apiCallCompleted.current) {
            clearInterval(checkApiInterval);
            // Use functional update to check current status
            setStatus(currentStatus => {
              if (currentStatus === "processing") {
                return "success";
              }
              return currentStatus;
            });
          }
        }, 100);
        
        return;
      }
      
      setProgress(currentProgress);
    }, progressInterval);

    const tipTimer = setInterval(() => {
      currentTip = (currentTip + 1) % cvTips.length;
      setCurrentTipIndex(currentTip);
    }, tipChangeInterval);

    return () => {
      clearInterval(progressTimer);
      clearInterval(tipTimer);
    };
  }, [isOpen, status]);

  // Navigate to CV builder after success
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        const cvId = importedCVId.current;
        navigate(cvId ? `/cv-builder?id=${cvId}` : '/cv-builder');
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [status, navigate]);

  const currentTip = cvTips[currentTipIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={status === "error" ? onClose : undefined}
          >
          {/* Modal */}
          <motion.div
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-10 w-[90%] max-w-lg border border-gray-100 relative"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
          >
            {status === "processing" && (
            <div className="flex flex-col items-center text-center">
                {/* Animated Icon */}
                <motion.div
                  className="relative w-32 h-32 mb-8"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {/* Outer rotating circle */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-[#DAA520]/20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Inner rotating circle */}
                  <motion.div
                    className="absolute inset-4 rounded-full border-4 border-t-[#DAA520] border-r-transparent border-b-transparent border-l-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Center icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <FileText className="w-12 h-12 text-[#DAA520]" />
                    </motion.div>
                  </div>

                  {/* Sparkles */}
                  <motion.div
                    className="absolute -top-2 -right-2"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-6 h-6 text-[#DAA520]" />
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-2 -left-2"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [360, 180, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <Brain className="w-6 h-6 text-[#DAA520]" />
                  </motion.div>
                </motion.div>

                {/* Title */}
                <h2 className="text-3xl font-bold mb-3 text-gray-800">
                  Analyzing Your CV
                </h2>

                {/* Rotating Tips */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTipIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="min-h-[60px] flex items-center justify-center mb-6"
                  >
                    <p className="text-lg text-gray-600 flex items-center gap-2">
                      <span className="text-2xl">{currentTip.icon}</span>
                      <span>{currentTip.text}</span>
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Progress Bar */}
                <div className="w-full mb-4 px-2">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>Processing...</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#DAA520] to-[#FFD700] relative overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    >
                      {/* Animated shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Timer hint */}
                <p className="text-xs text-gray-400 text-center">This usually takes about 15 seconds</p>
                </div>
              )}

            {status === "success" && (
              <motion.div
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </motion.div>

                <h2 className="text-3xl font-bold mb-3 text-gray-800">
                  Success! 🎉
                </h2>

                <p className="text-lg text-gray-600 mb-4">
                  Your CV has been imported successfully!
                </p>

                <p className="text-sm text-gray-500">
                  Redirecting to CV builder...
                </p>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  <XCircle className="w-12 h-12 text-red-600" />
                </motion.div>

                <h2 className="text-3xl font-bold mb-3 text-gray-800">
                  Import Failed
                </h2>

                <p className="text-lg text-gray-600 mb-6">
                  {errorMessage}
                </p>

                <Button
                  onClick={onClose}
                  className="bg-[#DAA520] hover:bg-[#B8860B] text-white px-6"
                >
                  Try Again
                </Button>
              </motion.div>
              )}
          </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
