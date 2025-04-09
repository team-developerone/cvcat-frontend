import express from 'express';
import cors from 'cors';
import pdfGenerator from './pdf-service/pdf-generator';
import { CV, CVLayoutStyle } from './types';

const app = express();
const PORT = Number(process.env.PORT) || 5001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));  // Increase payload limit for large CV data

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'PDF service is running' });
});

// PDF generation endpoint
app.post('/generate-pdf', async (req, res) => {
  try {
    const { cv, layout, options } = req.body;
    
    if (!cv) {
      return res.status(400).json({ error: 'CV data is required' });
    }
    
    const layoutStyle = layout || 'modern' as CVLayoutStyle;
    
    // Handle possible date serialization issues
    const cvData: CV = {
      ...cv,
      lastUpdated: new Date(cv.lastUpdated)
    };
    
    const pdfBuffer = await pdfGenerator.generatePDF(cvData, layoutStyle, options);
    
    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${cv.title || 'cv'}.pdf"`);
    
    // Send the PDF buffer
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    
    // Send error response
    res.status(500).json({
      error: 'Failed to generate PDF',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`PDF service running on port ${PORT}`);
});

export default app;