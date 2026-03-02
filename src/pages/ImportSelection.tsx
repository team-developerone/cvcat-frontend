import { useState } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import ImportModal from "@/components/ImportModal";
import ImportAnimationModal from "@/components/ImportAnimationModal";

export default function ImportSelection() {
  const [, navigate] = useLocation();
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isAnimationModalOpen, setIsAnimationModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedEmail, setSelectedEmail] = useState<string>("");

  const goToCVBuilder = () => {
    navigate('/cv-builder');
  };

  const handleImportClick = () => {
    setIsImportModalOpen(true);
  };

  const handleFileSelect = (file: File, email: string) => {
    setSelectedFile(file);
    setSelectedEmail(email);
    setIsImportModalOpen(false);
    setIsAnimationModalOpen(true);
  };

  const closeAnimationModal = () => {
    setIsAnimationModalOpen(false);
    setSelectedFile(null);
    setSelectedEmail("");
  };

  return (
    <Layout>
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-3xl font-bold mb-6">Let's Get Started</h1>
          <p className="text-gray-600 mb-10">Would you like to import an existing CV or create a new one from scratch?</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Create New CV Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className="border-2 border-gray-200 rounded-lg p-8 hover:border-[#DAA520] hover:shadow-lg transition-all cursor-pointer h-full flex flex-col items-center justify-center"
                onClick={goToCVBuilder}
              >
                <div className="h-20 w-20 rounded-full bg-[#DAA520]/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-[#DAA520]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Create New CV</h3>
                <p className="text-gray-600 text-sm">Start from scratch with our easy-to-use CV builder</p>
              </Card>
            </motion.div>

            {/* Import Existing CV Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className="border-2 border-gray-200 rounded-lg p-8 hover:border-[#DAA520] hover:shadow-lg transition-all cursor-pointer h-full flex flex-col items-center justify-center"
                onClick={handleImportClick}
              >
                <div className="h-20 w-20 rounded-full bg-[#DAA520]/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-[#DAA520]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 11V17M12 17L15 14M12 17L9 14M20 16.7428C21.2215 15.734 22 14.2079 22 12.5C22 9.46243 19.5376 7 16.5 7C16.2815 7 16.0771 6.886 15.9661 6.69774C14.6621 4.48484 12.2544 3 9.5 3C5.35786 3 2 6.35786 2 10.5C2 12.5661 2.83545 14.4371 4.18695 15.7935" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Import Existing CV</h3>
                <p className="text-gray-600 text-sm">Upload your existing CV and we'll format it for you</p>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Import Modal */}
      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onFileSelect={handleFileSelect}
      />

      {/* Import Animation Modal */}
      <ImportAnimationModal
        isOpen={isAnimationModalOpen}
        onClose={closeAnimationModal}
        importType={selectedFile?.type === "application/pdf" ? "pdf" : "word"}
        file={selectedFile}
        cvEmail={selectedEmail}
      />
    </Layout>
  );
}
