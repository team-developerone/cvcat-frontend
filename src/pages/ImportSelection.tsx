import { useState, useRef } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import ImportAnimationModal from "@/components/ImportAnimationModal";

export default function ImportSelection() {
  const [, navigate] = useLocation();
  const [showImportOptions, setShowImportOptions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [importType, setImportType] = useState<"pdf" | "word" | "linkedin" | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleImportOptions = () => {
    setShowImportOptions(!showImportOptions);
  };

  const goToCVBuilder = () => {
    navigate('/cv-builder');
  };

  const handleFileSelect = (type: "pdf" | "word") => {
    setImportType(type);
    if (fileInputRef.current) {
      fileInputRef.current.accept = type === "pdf"
        ? ".pdf"
        : ".doc,.docx";
      fileInputRef.current.click();
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setIsModalOpen(true);
    }
    // Reset input so the same file can be re-selected
    e.target.value = "";
  };

  const startLinkedInImport = () => {
    setImportType("linkedin");
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  return (
    <Layout>
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-lg w-full text-center">
          <h1 className="text-3xl font-bold mb-6">Let's Get Started</h1>
          <p className="text-gray-600 mb-10">Would you like to import an existing CV or create a new one from scratch?</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className="border border-gray-200 rounded-lg p-6 hover:border-[#DAA520] hover:shadow-md transition-all cursor-pointer h-full"
                onClick={goToCVBuilder}
              >
                <div className="h-16 w-16 rounded-full bg-[#DAA520]/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#DAA520]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Create New CV</h3>
                <p className="text-gray-600">Start from scratch with our easy-to-use CV builder</p>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className="border border-gray-200 rounded-lg p-6 hover:border-[#DAA520] hover:shadow-md transition-all cursor-pointer h-full"
                onClick={toggleImportOptions}
              >
                <div className="h-16 w-16 rounded-full bg-[#DAA520]/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#DAA520]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 11V17M12 17L15 14M12 17L9 14M20 16.7428C21.2215 15.734 22 14.2079 22 12.5C22 9.46243 19.5376 7 16.5 7C16.2815 7 16.0771 6.886 15.9661 6.69774C14.6621 4.48484 12.2544 3 9.5 3C5.35786 3 2 6.35786 2 10.5C2 12.5661 2.83545 14.4371 4.18695 15.7935" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Import Existing CV</h3>
                <p className="text-gray-600">Upload your existing CV and we'll format it for you</p>
              </Card>
            </motion.div>
          </div>

          {showImportOptions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <Card className="mt-8 border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Choose Import Method</h3>

                <div className="space-y-4">
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center py-6 px-4 border border-gray-300 rounded-lg hover:border-[#DAA520]/60 transition-all"
                      onClick={() => handleFileSelect("pdf")}
                    >
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 14V5.74701M12 14L8.78 10.3075M12 14L15.22 10.3075" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M17.5 14H19.4C19.9601 14 20.2401 14 20.454 13.891C20.6422 13.7951 20.7951 13.6422 20.891 13.454C21 13.2401 21 12.9601 21 12.4V11.6C21 11.0399 21 10.7599 20.891 10.546C20.7951 10.3578 20.6422 10.2049 20.454 10.109C20.2401 10 19.9601 10 19.4 10H16.6C16.0399 10 15.7599 10 15.546 10.109C15.3578 10.2049 15.2049 10.3578 15.109 10.546C15 10.7599 15 11.0399 15 11.6V12.4C15 12.9601 15 13.2401 15.109 13.454C15.2049 13.6422 15.3578 13.7951 15.546 13.891C15.7599 14 16.0399 14 16.6 14H17.5ZM16.5 18H18.4C18.9601 18 19.2401 18 19.454 17.891C19.6422 17.7951 19.7951 17.6422 19.891 17.454C20 17.2401 20 16.9601 20 16.4V15.6C20 15.0399 20 14.7599 19.891 14.546C19.7951 14.3578 19.6422 14.2049 19.454 14.109C19.2401 14 18.9601 14 18.4 14H15.6C15.0399 14 14.7599 14 14.546 14.109C14.3578 14.2049 14.2049 14.3578 14.109 14.546C14 14.7599 14 15.0399 14 15.6V16.4C14 16.9601 14 17.2401 14.109 17.454C14.2049 17.6422 14.3578 17.7951 14.546 17.891C14.7599 18 15.0399 18 15.6 18H16.5ZM12 18C12 19.8856 12 20.8284 11.4142 21.4142C10.8284 22 9.88562 22 8 22H6C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2H8C9.88562 2 10.8284 2 11.4142 2.58579C12 3.17157 12 4.11438 12 6V18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium">Upload PDF Resume</h4>
                        <p className="text-xs text-gray-500">Import your existing PDF resume</p>
                      </div>
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center py-6 px-4 border border-gray-300 rounded-lg hover:border-[#DAA520]/60 transition-all"
                      onClick={() => handleFileSelect("word")}
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 7V5.71517C19 4.33093 19 3.63881 18.7187 3.10727C18.4748 2.64456 18.104 2.27185 17.6437 2.02622C17.1122 1.74493 16.4201 1.74493 15.0359 1.74493H8.96408C7.57993 1.74493 6.88783 1.74493 6.35628 2.02622C5.89604 2.27185 5.52516 2.64456 5.28136 3.10727C5 3.63881 5 4.33093 5 5.71517V18.2848C5 19.6691 5 20.3612 5.28136 20.8927C5.52516 21.3554 5.89604 21.7282 6.35628 21.9738C6.88783 22.2551 7.57993 22.2551 8.96408 22.2551H15.0359C16.4201 22.2551 17.1122 22.2551 17.6437 21.9738C18.104 21.7282 18.4748 21.3554 18.7187 20.8927C19 20.3612 19 19.6691 19 18.2848V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8 14L10 16L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium">Upload Word Document</h4>
                        <p className="text-xs text-gray-500">Import your existing Word document</p>
                      </div>
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center py-6 px-4 border border-gray-300 rounded-lg hover:border-[#DAA520]/60 transition-all"
                      onClick={startLinkedInImport}
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-blue-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 17V9M12 17V13M17 17V11M16 7H16.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium">Import from LinkedIn</h4>
                        <p className="text-xs text-gray-500">Connect your LinkedIn profile</p>
                      </div>
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={onFileChange}
      />

      {/* Import Animation Modal */}
      <ImportAnimationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        importType={importType}
        file={selectedFile}
      />
    </Layout>
  );
}
