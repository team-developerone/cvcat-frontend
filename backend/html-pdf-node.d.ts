declare module 'html-pdf-node' {
  interface PDFOptions {
    format?: 'A4' | 'Letter' | 'Legal' | string;
    width?: string;
    height?: string;
    margin?: {
      top?: string;
      right?: string;
      bottom?: string;
      left?: string;
    };
    landscape?: boolean;
    printBackground?: boolean;
    scale?: number;
    displayHeaderFooter?: boolean;
    headerTemplate?: string;
    footerTemplate?: string;
    pageRanges?: string;
    path?: string;
  }

  interface PDFFile {
    content?: string;
    url?: string;
    path?: string;
  }

  function generatePdf(file: PDFFile, options: PDFOptions): Promise<Buffer>;
  
  export { generatePdf };
}