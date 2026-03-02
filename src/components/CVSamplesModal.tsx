import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import CVPreview from "@/components/CVPreview";
import { mockCVData, mockCVVariants } from "@/data/mockCVData";

// All available CV templates
type CVLayoutStyle = 'modern' | 'classic' | 'minimalist' | 'creative' | 'executive' | 'technical' | 'professional' | 'simple-ats' | 'pure-ats' | 'traditional';

interface CVSamplesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVSamplesModal({ isOpen, onClose }: CVSamplesModalProps) {
  const [activeLayout, setActiveLayout] = useState<CVLayoutStyle>("modern");

  // All available CV templates with descriptions and best use cases
  const layouts = [
    { 
      id: "modern", 
      name: "Modern",
      description: "Clean, professional design with gold accents and excellent readability",
      bestFor: "Tech, Marketing, Middle Management, Most Corporate Roles",
      features: ["Gold accent colors", "Two-column layout", "Clean typography", "Professional sections"],
      popular: true
    },
    { 
      id: "creative", 
      name: "Creative",
      description: "Bold design with purple accents for creative professionals",
      bestFor: "Design, Arts, Media, Advertising, Entertainment",
      features: ["Purple color scheme", "Creative layout", "Visual elements", "Unique styling"],
      popular: false
    },
    { 
      id: "executive", 
      name: "Executive",
      description: "Sophisticated layout ideal for senior leadership positions",
      bestFor: "Senior Management, C-Suite Executives, Corporate Leadership",
      features: ["Formal presentation", "Executive styling", "Professional hierarchy", "Leadership focus"],
      popular: false
    },
    { 
      id: "minimalist", 
      name: "Minimalist",
      description: "Clean, simple design with focus on content over decoration",
      bestFor: "Experienced Professionals, Academia, Research, Technical Roles",
      features: ["Minimal styling", "Content focused", "Clean lines", "Simple layout"],
      popular: false
    },
    { 
      id: "classic", 
      name: "Classic",
      description: "Traditional format with serif fonts and formal structure",
      bestFor: "Finance, Law, Executive Positions, Traditional Industries",
      features: ["Traditional layout", "Serif typography", "Formal structure", "Conservative design"],
      popular: false
    },
    { 
      id: "technical", 
      name: "Technical",
      description: "Structured layout ideal for technical and engineering roles",
      bestFor: "Software Engineering, IT, Technical Roles, Engineering",
      features: ["Technical focus", "Structured sections", "Skills emphasis", "Project highlights"],
      popular: false
    },
    { 
      id: "professional", 
      name: "Professional",
      description: "Two-column layout with clean lines and text-only design",
      bestFor: "Business, Consulting, Finance, Professional Services",
      features: ["Two-column design", "Text-only layout", "Professional styling", "Business focused"],
      popular: false
    },
    { 
      id: "simple-ats", 
      name: "Simple ATS",
      description: "ATS-friendly single-column layout with blue section headings",
      bestFor: "Job Applications, ATS Systems, Online Applications",
      features: ["ATS optimized", "Single column", "Blue headings", "Scanner friendly"],
      popular: true
    },
    { 
      id: "pure-ats", 
      name: "Pure ATS",
      description: "Plain text-only layout for maximum ATS compatibility",
      bestFor: "Strict ATS Requirements, Government Jobs, Large Corporations",
      features: ["Plain text only", "Maximum compatibility", "No styling", "Pure content"],
      popular: false
    },
    { 
      id: "traditional", 
      name: "Traditional",
      description: "Classic centered layout with gray section banners",
      bestFor: "Traditional Industries, Conservative Roles, Formal Applications",
      features: ["Centered layout", "Gray banners", "Traditional styling", "Formal presentation"],
      popular: false
    }
  ];

  const getCVData = (templateId: string) => {
    switch(templateId) {
      case 'creative':
        return mockCVVariants.creative;
      case 'executive':
        return mockCVVariants.executive;
      case 'minimalist':
        return mockCVVariants.minimalist;
      default:
        return mockCVData;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-7xl w-[95vw] h-[90vh] p-0 overflow-hidden bg-white">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200">
          <DialogTitle className="text-2xl font-bold text-black">CV Template Gallery</DialogTitle>
          <p className="text-gray-600 text-sm mt-2">
            Choose from 10 professionally designed templates. Each uses the exact same rendering system as your CV editor.
          </p>
        </DialogHeader>
        
        <div className="flex h-[calc(90vh-120px)]">
          {/* Template Navigation */}
          <div className="w-80 border-r border-gray-200 p-6 overflow-y-auto">
            <div className="space-y-3">
              {layouts.map((layout) => (
                <motion.div
                  key={layout.id}
                  className={cn(
                    "p-4 rounded-lg border-2 cursor-pointer transition-all duration-200",
                    activeLayout === layout.id 
                      ? "border-[#DAA520] bg-[#DAA520]/5 shadow-md" 
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  )}
                  onClick={() => setActiveLayout(layout.id as CVLayoutStyle)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-sm text-gray-900">{layout.name}</h3>
                    {layout.popular && (
                      <span className="text-xs bg-[#DAA520]/10 text-[#DAA520] px-2 py-0.5 rounded-full font-medium">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-3 leading-relaxed">{layout.description}</p>
                  
                  <div className="mb-3">
                    <h4 className="text-xs font-medium text-gray-700 mb-1">Key Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {layout.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-medium text-gray-700 mb-1">Best For:</h4>
                    <p className="text-xs text-gray-600">{layout.bestFor}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CV Preview */}
          <div className="flex-1 p-6 overflow-hidden">
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {layouts.find(l => l.id === activeLayout)?.name} Template
                  </h3>
                  <p className="text-sm text-gray-600">
                    {layouts.find(l => l.id === activeLayout)?.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={onClose}
                    className="border-gray-300 hover:bg-gray-100"
                  >
                    Close
                  </Button>
                  <Button 
                    size="sm"
                    onClick={onClose}
                    className="bg-black hover:bg-[#DAA520] text-white"
                  >
                    Use This Template
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 overflow-hidden border border-gray-200 rounded-lg">
                <CVPreview 
                  cv={getCVData(activeLayout)} 
                  template={activeLayout}
                  className="h-full"
                  style={{ minHeight: 'unset' }}
                />
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Template Features:</h4>
                    <ul className="space-y-1">
                      {layouts.find(l => l.id === activeLayout)?.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-xs text-gray-600">
                          <span className="w-1.5 h-1.5 bg-[#DAA520] rounded-full mr-2 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Recommended For:</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {layouts.find(l => l.id === activeLayout)?.bestFor}
                    </p>
                    <div className="mt-3">
                      <span className="text-xs font-medium text-gray-700">ATS Compatible:</span>
                      <span className="ml-2 text-xs text-green-600 font-medium">✓ Yes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
