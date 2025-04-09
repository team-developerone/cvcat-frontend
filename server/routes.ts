import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import pdfGenerator from "../backend/pdf-service/pdf-generator";
import { CV, CVLayoutStyle } from "../backend/types";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // PDF service endpoints
  app.get("/api/pdf/health", (_req, res) => {
    res.status(200).json({ status: 'ok', message: 'PDF service is running' });
  });

  // PDF generation endpoint
  app.post("/api/pdf/generate", async (req: Request, res: Response) => {
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

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
