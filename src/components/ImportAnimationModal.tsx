import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { importCV } from "@/services/api";

interface ImportAnimationModalProps {
  isOpen: boolean;
  onClose: () => void;
  importType: "pdf" | "word" | "linkedin" | null;
  file?: File | null;
}

export default function ImportAnimationModal({
  isOpen,
  onClose,
  importType,
  file
}: ImportAnimationModalProps) {
  const [, navigate] = useLocation();
  const [currentStage, setCurrentStage] = useState<"uploading" | "scanning" | "analyzing" | "completed" | "error">("uploading");
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const uploadStarted = useRef(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStage("uploading");
      setProgress(0);
      setErrorMessage("");
      uploadStarted.current = false;
    }
  }, [isOpen]);

  // Start real upload when file is provided
  useEffect(() => {
    if (!isOpen || !file || uploadStarted.current) return;
    uploadStarted.current = true;

    // Simulate uploading stage briefly then do the real API call
    setCurrentStage("uploading");
    let progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 2, 30));
    }, 50);

    importCV(file)
      .then((res) => {
        clearInterval(progressInterval);
        setProgress(100);
        setCurrentStage("scanning");

        // Simulate scanning stage
        let scanProgress = 0;
        const scanInterval = setInterval(() => {
          scanProgress += 5;
          setProgress(scanProgress);
          if (scanProgress >= 100) {
            clearInterval(scanInterval);
            setCurrentStage("analyzing");

            // Simulate analyzing stage
            let analyzeProgress = 0;
            const analyzeInterval = setInterval(() => {
              analyzeProgress += 5;
              setProgress(analyzeProgress);
              if (analyzeProgress >= 100) {
                clearInterval(analyzeInterval);
                setCurrentStage("completed");
              }
            }, 30);
          }
        }, 30);
      })
      .catch((err) => {
        clearInterval(progressInterval);
        setErrorMessage(err.message || "Import failed");
        setCurrentStage("error");
      });
  }, [isOpen, file]);

  // Simulated progress for LinkedIn (no file)
  useEffect(() => {
    if (!isOpen || file || importType !== "linkedin") return;

    let interval: NodeJS.Timeout;

    if (currentStage === "uploading") {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress >= 100) {
            clearInterval(interval);
            setCurrentStage("scanning");
            return 100;
          }
          return newProgress;
        });
      }, 30);
    } else if (currentStage === "scanning") {
      setProgress(0);
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress >= 100) {
            clearInterval(interval);
            setCurrentStage("analyzing");
            return 100;
          }
          return newProgress;
        });
      }, 40);
    } else if (currentStage === "analyzing") {
      setProgress(0);
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress >= 100) {
            clearInterval(interval);
            setCurrentStage("completed");
            return 100;
          }
          return newProgress;
        });
      }, 50);
    }

    return () => clearInterval(interval);
  }, [isOpen, currentStage, file, importType]);

  // Proceed to CV Builder after animation completes
  useEffect(() => {
    if (currentStage === "completed") {
      const timer = setTimeout(() => {
        navigate('/cv-builder');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentStage, navigate]);

  const getStageTitle = () => {
    switch (currentStage) {
      case "uploading":
        return "Uploading Your CV";
      case "scanning":
        return "Scanning Document";
      case "analyzing":
        return "Analyzing Content";
      case "completed":
        return "Import Completed!";
      case "error":
        return "Import Failed";
      default:
        return "";
    }
  };

  const getStageDescription = () => {
    switch (currentStage) {
      case "uploading":
        return `Uploading your ${importType === "pdf" ? "PDF" : importType === "word" ? "Word document" : "LinkedIn profile"}...`;
      case "scanning":
        return "Extracting text and formatting from your document...";
      case "analyzing":
        return "Our AI is analyzing your CV structure and content...";
      case "completed":
        return "Successfully imported! Redirecting to CV builder...";
      case "error":
        return errorMessage;
      default:
        return "";
    }
  };

  const getIconAnimation = () => {
    switch (currentStage) {
      case "uploading":
        return (
          <motion.div
            className="w-24 h-24 bg-[#DAA520]/10 rounded-full flex items-center justify-center mb-6"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.svg
              className="w-10 h-10 text-[#DAA520]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path d="M9 17V11L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 11L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </motion.svg>
          </motion.div>
        );
      case "scanning":
        return (
          <motion.div
            className="w-24 h-24 bg-[#DAA520]/10 rounded-full flex items-center justify-center mb-6 relative overflow-hidden"
            animate={{
              boxShadow: ["0 0 0 0 rgba(218, 165, 32, 0)", "0 0 10px 3px rgba(218, 165, 32, 0.3)", "0 0 0 0 rgba(218, 165, 32, 0)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="absolute top-0 left-0 w-full h-2 bg-[#DAA520]/40"
              animate={{ y: ["0%", "500%", "0%"] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <svg className="w-10 h-10 text-[#DAA520]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 18H5C3.89543 18 3 17.1046 3 16V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V16C21 17.1046 20.1046 18 19 18H17M12 15V20M12 15L9 18M12 15L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 5V3M17 5V3M8 9H16M8 13H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        );
      case "analyzing":
        return (
          <motion.div
            className="w-24 h-24 bg-[#DAA520]/10 rounded-full flex items-center justify-center mb-6"
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <motion.div className="relative">
              <motion.div
                className="absolute w-12 h-12 border-t-2 border-r-2 border-[#DAA520] rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute w-8 h-8 border-t-2 border-l-2 border-black rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <svg className="w-10 h-10 text-[#DAA520] relative z-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 15.5H7.5C6.67157 15.5 6 16.1716 6 17V18.5C6 19.3284 6.67157 20 7.5 20H16.5C17.3284 20 18 19.3284 18 18.5V17C18 16.1716 17.3284 15.5 16.5 15.5H15M12 3V15M12 15L9 12M12 15L15 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </motion.div>
        );
      case "completed":
        return (
          <motion.div
            className="w-24 h-24 bg-[#DAA520]/10 rounded-full flex items-center justify-center mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1
            }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <svg className="w-12 h-12 text-[#DAA520]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M7 13L10 16L17 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                <motion.path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8 }}
                />
              </svg>
            </motion.div>
          </motion.div>
        );
      case "error":
        return (
          <motion.div
            className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <svg className="w-12 h-12 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={currentStage === "error" ? onClose : undefined}
          />

          {/* Modal */}
          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-8 w-[90%] max-w-md z-50"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="flex flex-col items-center text-center">
              {getIconAnimation()}

              <h2 className="text-2xl font-bold mb-2">{getStageTitle()}</h2>
              <p className="text-gray-600 mb-6">{getStageDescription()}</p>

              {currentStage !== "error" && (
                <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                  <motion.div
                    className="h-full rounded-full bg-[#DAA520]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "tween" }}
                  />
                </div>
              )}

              {currentStage === "completed" ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-sm text-gray-500">Redirecting to CV builder...</p>
                </motion.div>
              ) : currentStage === "error" ? (
                <Button
                  variant="outline"
                  className="text-sm"
                  onClick={onClose}
                >
                  Close
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="text-sm"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
