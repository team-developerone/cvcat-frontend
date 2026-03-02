import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CV } from '@/lib/types';
import pdfService from '@/services/pdf-service';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import CVPreview from '@/components/CVPreview';
import { LucideDownload } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface PDFDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  cv: CV | null;
}

type CVLayoutStyle = 'modern' | 'classic' | 'minimalist' | 'creative' | 'executive' | 'technical' | 'professional' | 'simple-ats' | 'pure-ats' | 'traditional';

export default function PDFDownloadModal({ isOpen, onClose, cv }: PDFDownloadModalProps) {
  const [selectedLayout, setSelectedLayout] = useState<CVLayoutStyle>('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const isMobile = useIsMobile();
  
  const layoutOptions: { value: CVLayoutStyle; label: string; description: string }[] = [
    { 
      value: 'modern', 
      label: 'Modern', 
      description: 'Clean, professional design with gold accents'
    },
    { 
      value: 'classic', 
      label: 'Classic', 
      description: 'Traditional format with serif fonts'
    },
    { 
      value: 'minimalist', 
      label: 'Minimalist', 
      description: 'Simple, elegant layout with minimal styling'
    },
    { 
      value: 'creative', 
      label: 'Creative', 
      description: 'Bold design with purple accents'
    },
    { 
      value: 'executive', 
      label: 'Executive', 
      description: 'Formal layout ideal for senior positions'
    },
    { 
      value: 'technical', 
      label: 'Technical', 
      description: 'Structured layout ideal for technical roles'
    },
    { 
      value: 'professional', 
      label: 'Professional', 
      description: 'Two-column layout with clean lines and text only'
    },
    { 
      value: 'simple-ats', 
      label: 'Simple ATS', 
      description: 'ATS-friendly single-column with blue headings'
    },
    { 
      value: 'pure-ats', 
      label: 'Pure ATS', 
      description: 'Plain text-only layout, maximum ATS compatibility'
    },
    { 
      value: 'traditional', 
      label: 'Traditional', 
      description: 'Classic centered layout with gray banners'
    }
  ];
  
  const handleDownload = async () => {
    if (!cv) return;
    
    try {
      setIsGenerating(true);
      
      toast({
        title: "Generating PDF...",
        description: "Your CV is being processed. Please wait.",
      });
      
      await pdfService.downloadPDF(cv, selectedLayout);
      
      toast({
        title: "PDF generated!",
        description: "Your CV has been downloaded successfully.",
        variant: "default",
      });
      
      onClose();
    } catch (error) {
      console.error("Error downloading PDF:", error);
      
      toast({
        title: "Download failed",
        description: error instanceof Error ? error.message : "There was a problem generating your PDF.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  if (!cv) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn(
        "p-0 overflow-hidden",
        isMobile 
          ? "w-[98vw] max-w-[98vw] h-[95vh] rounded-xl" 
          : "max-w-7xl w-[95vw] h-[90vh]"
      )}>
        <DialogHeader className={cn("border-b border-gray-200", isMobile ? "p-3 pb-2" : "p-6 pb-4")}>
          <DialogTitle className={cn("font-bold", isMobile ? "text-base" : "text-xl")}>Export CV as PDF</DialogTitle>
          <DialogDescription className={isMobile ? "text-xs" : ""}>
            Preview your CV and choose a template style
          </DialogDescription>
        </DialogHeader>
        
        <div className={cn(
          isMobile 
            ? "flex flex-col h-[calc(95vh-80px)] overflow-y-auto" 
            : "flex h-[calc(90vh-140px)]"
        )}>
          {/* Template Selection - on mobile, horizontal scrollable strip at top */}
          {isMobile && (
            <div className="flex-shrink-0 px-3 pt-2 pb-1">
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Template</h3>
              <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
                {layoutOptions.map((layout) => (
                  <button
                    key={layout.value}
                    className={cn(
                      "flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap",
                      selectedLayout === layout.value
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                    onClick={() => setSelectedLayout(layout.value)}
                  >
                    {layout.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CV Preview */}
          <div className={cn(
            isMobile 
              ? "flex-1 px-3 pb-2 overflow-hidden min-h-0" 
              : "flex-1 p-6 pr-3 overflow-hidden"
          )}>
            <div className="h-full flex flex-col">
              {!isMobile && (
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">CV Preview</h3>
                  <div className="text-sm text-gray-500">
                    Template: {layoutOptions.find(l => l.value === selectedLayout)?.label}
                  </div>
                </div>
              )}
              <div className="flex-1 overflow-hidden">
                <CVPreview 
                  cv={cv} 
                  template={selectedLayout} 
                  className="h-full"
                  style={{ minHeight: 'unset' }}
                />
              </div>
            </div>
          </div>
          
          {/* Right Panel: Template Selection - desktop only */}
          {!isMobile && (
            <div className="w-80 border-l border-gray-200 p-6 pl-3 overflow-y-auto">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Choose Template</h3>
                <div className="space-y-3">
                  {layoutOptions.map((layout) => (
                    <div 
                      key={layout.value}
                      className={cn(
                        "flex items-start border-2 rounded-lg p-3 cursor-pointer transition-all",
                        selectedLayout === layout.value 
                          ? "border-[#DAA520] bg-[#DAA520]/5" 
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      )}
                      onClick={() => setSelectedLayout(layout.value)}
                    >
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center flex-shrink-0 mt-0.5",
                        selectedLayout === layout.value 
                          ? "border-[#DAA520]" 
                          : "border-gray-300"
                      )}>
                        {selectedLayout === layout.value && (
                          <div className="w-3 h-3 rounded-full bg-[#DAA520]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 mb-1">{layout.label}</h4>
                        <p className="text-xs text-gray-600 leading-relaxed">{layout.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Download Section */}
              <div className="border-t border-gray-200 pt-6">
                <Button 
                  onClick={handleDownload} 
                  disabled={isGenerating}
                  className="w-full bg-black text-white hover:bg-[#DAA520] py-3 text-sm font-medium"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <LucideDownload className="w-4 h-4 mr-2" />
                      Download PDF
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  className="w-full mt-3 border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile: Sticky bottom download bar */}
        {isMobile && (
          <div className="flex-shrink-0 border-t border-gray-200 p-2 flex gap-2 bg-white">
            <Button 
              onClick={handleDownload} 
              disabled={isGenerating}
              className="flex-1 bg-black text-white hover:bg-[#DAA520] h-10 text-xs font-medium"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-1.5 h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <LucideDownload className="w-3.5 h-3.5 mr-1.5" />
                  Download PDF
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="h-10 text-xs px-4"
            >
              Cancel
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}