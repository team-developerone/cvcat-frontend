import { CV } from '@/lib/types';

type CVLayoutStyle = 'modern' | 'classic' | 'minimalist' | 'creative' | 'executive';

interface PDFOptions {
  format?: 'A4' | 'Letter' | 'Legal';
  landscape?: boolean;
  margin?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
}

/**
 * Service for generating and downloading CV PDFs
 */
export class PDFService {
  private baseUrl: string;
  
  constructor() {
    // Access the PDF service through the main server API routes
    this.baseUrl = '/api/pdf';
  }
  
  /**
   * Generate a PDF from CV data using the specified template
   */
  async generatePDF(cv: CV, layout: CVLayoutStyle = 'modern', options: PDFOptions = {}): Promise<Blob> {
    try {
      const response = await fetch(`${this.baseUrl}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cv, layout, options })
      });
      
      if (!response.ok) {
        let errorMessage = 'Failed to generate PDF';
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          // If response is not JSON, use the status text
          errorMessage = response.statusText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }
      
      return await response.blob();
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  }
  
  /**
   * Generate and download a PDF file
   */
  async downloadPDF(cv: CV, layout: CVLayoutStyle = 'modern', options: PDFOptions = {}): Promise<void> {
    try {
      const pdfBlob = await this.generatePDF(cv, layout, options);
      
      // Create a URL for the blob
      const url = URL.createObjectURL(pdfBlob);
      
      // Create a temporary download link
      const a = document.createElement('a');
      a.href = url;
      a.download = `${cv.title || 'cv'}.pdf`;
      
      // Append to the document body and click
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      throw error;
    }
  }
  
  /**
   * Check if the PDF service is available
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      return response.ok;
    } catch (error) {
      console.error('PDF service is not available:', error);
      return false;
    }
  }
}

export default new PDFService();