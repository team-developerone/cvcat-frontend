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

interface PDFDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  cv: CV | null;
}

type CVLayoutStyle = 'modern' | 'classic' | 'minimalist' | 'creative' | 'executive';

export default function PDFDownloadModal({ isOpen, onClose, cv }: PDFDownloadModalProps) {
  const [selectedLayout, setSelectedLayout] = useState<CVLayoutStyle>('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  
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
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-bold">Export CV as PDF</DialogTitle>
          <DialogDescription>
            Choose a template style for your CV
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-4 p-6 pt-2">
          {layoutOptions.map((layout) => (
            <div 
              key={layout.value}
              className={cn(
                "flex items-center border-2 rounded-md p-3 cursor-pointer transition-all",
                selectedLayout === layout.value 
                  ? "border-[#DAA520] bg-[#DAA520]/5" 
                  : "border-gray-200 hover:border-gray-300"
              )}
              onClick={() => setSelectedLayout(layout.value)}
            >
              <div className={cn(
                "w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center",
                selectedLayout === layout.value 
                  ? "border-[#DAA520]" 
                  : "border-gray-300"
              )}>
                {selectedLayout === layout.value && (
                  <div className="w-3 h-3 rounded-full bg-[#DAA520]" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium">{layout.label}</h3>
                <p className="text-xs text-gray-500">{layout.description}</p>
              </div>
              <div className="w-12 h-16 bg-gray-100 border border-gray-200 rounded flex items-center justify-center text-gray-400">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
        
        <DialogFooter className="p-4 bg-gray-50">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDownload} 
            disabled={isGenerating || !cv}
            className="bg-black text-white hover:bg-[#DAA520]"
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}