import { useState } from "react";
import Layout from "@/components/Layout";
import CVBuilderForm from "@/components/CVBuilderForm";
import { Button } from "@/components/ui/button";
import { useCV } from "@/lib/context";

export default function CVBuilder() {
  const { mainCV } = useCV();
  const [activeTemplate, setActiveTemplate] = useState("modern");
  const [activeColor, setActiveColor] = useState("golden");
  
  // Template options
  const templates = [
    { id: "modern", name: "Modern" },
    { id: "classic", name: "Classic" },
    { id: "minimalist", name: "Minimalist" },
    { id: "creative", name: "Creative" }
  ];
  
  // Color options
  const colors = [
    { id: "golden", color: "#DAA520", selected: true },
    { id: "blue", color: "#3B82F6", selected: false },
    { id: "green", color: "#10B981", selected: false },
    { id: "purple", color: "#8B5CF6", selected: false },
    { id: "red", color: "#EF4444", selected: false }
  ];
  
  return (
    <Layout isAuthenticated={true}>
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Panel: CV Editor */}
        <div className="w-full md:w-2/3 p-6 overflow-y-auto">
          <CVBuilderForm />
        </div>
        
        {/* Right Panel: Preview & Options */}
        <div className="w-full md:w-1/3 bg-gray-50 p-6 overflow-y-auto">
          <div className="sticky top-6">
            <h2 className="text-xl font-bold mb-4">CV Preview</h2>
            
            {/* CV Preview */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-8 relative">
              <div className="aspect-[1/1.414] bg-gray-100 flex items-center justify-center">
                {mainCV && (
                  <div className="w-full h-full p-4 flex flex-col">
                    <h2 className="text-center font-bold text-xl mb-2">{mainCV.personalInfo.fullName}</h2>
                    <p className="text-center text-gray-600 mb-4">{mainCV.personalInfo.title}</p>
                    <div className="border-t border-gray-300 my-2"></div>
                    <h3 className="font-semibold mt-2">Summary</h3>
                    <p className="text-sm">{mainCV.personalInfo.summary}</p>
                    <h3 className="font-semibold mt-2">Experience</h3>
                    <div className="flex-1 overflow-hidden text-sm">
                      {mainCV.experience.map((exp, i) => (
                        <div key={i} className="mb-1">
                          <p className="font-medium">{exp.position} at {exp.company}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  className="bg-black bg-opacity-60 text-white rounded-full p-3 hover:bg-[#DAA520] transition-all"
                >
                  <i className="fas fa-expand text-lg"></i>
                </Button>
              </div>
            </div>
            
            {/* Template Options */}
            <h3 className="font-semibold mb-3">Template Style</h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {templates.map((template) => (
                <div 
                  key={template.id}
                  className={`${
                    activeTemplate === template.id 
                      ? 'border-2 border-[#DAA520]' 
                      : 'border border-gray-200 hover:border-[#DAA520]'
                  } rounded-md p-2 cursor-pointer transition-all`}
                  onClick={() => setActiveTemplate(template.id)}
                >
                  <div className="aspect-[1/1.414] bg-gray-100 rounded mb-2"></div>
                  <p className={`text-sm text-center ${activeTemplate === template.id ? 'font-medium' : ''}`}>
                    {template.name}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Color Options */}
            <h3 className="font-semibold mb-3">Accent Color</h3>
            <div className="flex flex-wrap gap-3 mb-6">
              {colors.map((color) => (
                <div 
                  key={color.id}
                  className={`w-8 h-8 rounded-full cursor-pointer transition-all`}
                  style={{ 
                    backgroundColor: color.color,
                    border: activeColor === color.id ? '2px solid black' : '1px solid #e5e5e5'
                  }}
                  onClick={() => setActiveColor(color.id)}
                ></div>
              ))}
            </div>
            
            {/* Actions */}
            <h3 className="font-semibold mb-3">Actions</h3>
            <div className="space-y-3">
              <Button
                className="w-full flex items-center justify-center py-2 px-4 bg-black text-white rounded-md hover:bg-[#DAA520] transition-all"
              >
                <i className="fas fa-download mr-2"></i>
                Download PDF
              </Button>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center py-2 px-4 border border-black rounded-md hover:bg-black hover:text-white transition-all"
              >
                <i className="fas fa-share-alt mr-2"></i>
                Share CV
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
