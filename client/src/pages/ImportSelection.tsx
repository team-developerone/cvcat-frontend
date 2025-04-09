import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";

export default function ImportSelection() {
  const [, navigate] = useLocation();
  const [showImportOptions, setShowImportOptions] = useState(false);
  
  // Toggle import options
  const toggleImportOptions = () => {
    setShowImportOptions(!showImportOptions);
  };
  
  // Go to CV builder
  const goToCVBuilder = () => {
    navigate('/cv-builder');
  };
  
  return (
    <Layout isAuthenticated={true}>
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-lg w-full text-center">
          <h1 className="text-3xl font-bold mb-6">Let's Get Started</h1>
          <p className="text-gray-600 mb-10">Would you like to import an existing CV or create a new one from scratch?</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              className="border border-gray-200 rounded-lg p-6 hover:border-[#DAA520] hover:shadow-md transition-all cursor-pointer"
              onClick={goToCVBuilder}
            >
              <div className="h-16 w-16 rounded-full bg-[#DAA520]/10 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-plus text-[#DAA520] text-xl"></i>
              </div>
              <h3 className="text-xl font-medium mb-2">Create New CV</h3>
              <p className="text-gray-600">Start from scratch with our easy-to-use CV builder</p>
            </Card>
            
            <Card
              className="border border-gray-200 rounded-lg p-6 hover:border-[#DAA520] hover:shadow-md transition-all cursor-pointer"
              onClick={toggleImportOptions}
            >
              <div className="h-16 w-16 rounded-full bg-[#DAA520]/10 flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-file-import text-[#DAA520] text-xl"></i>
              </div>
              <h3 className="text-xl font-medium mb-2">Import Existing CV</h3>
              <p className="text-gray-600">Upload your existing CV and we'll format it for you</p>
            </Card>
          </div>
          
          {showImportOptions && (
            <Card className="mt-8 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Choose Import Method</h3>
              
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-all"
                  onClick={goToCVBuilder}
                >
                  <i className="fas fa-file-pdf text-red-500 mr-2"></i>
                  Upload PDF Resume
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-all"
                  onClick={goToCVBuilder}
                >
                  <i className="fas fa-file-word text-blue-500 mr-2"></i>
                  Upload Word Document
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-all"
                  onClick={goToCVBuilder}
                >
                  <i className="fab fa-linkedin text-blue-700 mr-2"></i>
                  Import from LinkedIn
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
