import * as htmlPdf from 'html-pdf-node';
import * as handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { CV, CVLayoutStyle } from '../types';

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
 * Service for generating PDF files from CV data using different templates
 */
export class PDFGenerator {
  private templates: { [key in CVLayoutStyle]?: string } = {};
  
  constructor() {
    this.loadTemplates();
  }

  /**
   * Loads and compiles all CV templates
   */
  private loadTemplates() {
    const templatesDir = path.join(__dirname, 'templates');
    
    try {
      // Load templates if they exist
      const templateStyles: CVLayoutStyle[] = ['modern', 'classic', 'minimalist', 'creative', 'executive'];
      
      for (const style of templateStyles) {
        const templatePath = path.join(templatesDir, `${style}.html`);
        if (fs.existsSync(templatePath)) {
          this.templates[style] = fs.readFileSync(templatePath, 'utf8');
        }
      }
      
      // If no templates were found, create fallback templates
      if (Object.keys(this.templates).length === 0) {
        console.log('No templates found. Creating fallback templates...');
        this.createFallbackTemplates();
      } else {
        console.log(`Loaded ${Object.keys(this.templates).length} CV templates`);
      }
    } catch (error) {
      console.error('Error loading templates:', error);
      // Create fallback templates if loading fails
      this.createFallbackTemplates();
    }
  }

  /**
   * Creates fallback templates for each style
   */
  private createFallbackTemplates() {
    const templateStyles: CVLayoutStyle[] = ['modern', 'classic', 'minimalist', 'creative', 'executive'];
    
    for (const style of templateStyles) {
      this.templates[style] = this.createFallbackTemplate(style);
      
      // Save the fallback template to disk for future use
      try {
        const templatesDir = path.join(__dirname, 'templates');
        if (!fs.existsSync(templatesDir)) {
          fs.mkdirSync(templatesDir, { recursive: true });
        }
        
        fs.writeFileSync(
          path.join(templatesDir, `${style}.html`), 
          this.templates[style] as string
        );
      } catch (error) {
        console.error(`Error saving fallback template for ${style}:`, error);
      }
    }
    
    console.log('Created fallback templates for all CV styles');
  }

  /**
   * Generates a PDF from CV data using the specified template
   */
  async generatePDF(cv: CV, layout: CVLayoutStyle = 'modern', options: PDFOptions = {}) {
    try {
      // Use the requested template or fall back to modern if not found
      let template = this.templates[layout] || this.templates.modern;
      
      // If templates haven't been loaded yet (first request), try to load them
      if (!template) {
        this.loadTemplates();
        template = this.templates[layout] || this.templates.modern;
        
        // If still no template, create a fallback
        if (!template) {
          template = this.createFallbackTemplate(layout);
        }
      }
      
      // Register Handlebars helpers
      this.registerHandlebarsHelpers();
      
      // Compile the template with Handlebars
      const compiledTemplate = handlebars.compile(template);
      
      // Create a copy of the CV data to ensure date is handled properly
      const cvData = JSON.parse(JSON.stringify(cv));
      
      // Convert Date objects to strings for proper rendering
      if (cvData.lastUpdated) {
        if (typeof cvData.lastUpdated === 'string') {
          cvData.lastUpdated = new Date(cvData.lastUpdated).toLocaleDateString();
        } else {
          cvData.lastUpdated = cvData.lastUpdated.toLocaleDateString();
        }
      }
      
      const html = compiledTemplate(cvData);
      
      // Configure PDF generation options
      const pdfOptions = {
        format: options.format || 'A4',
        landscape: options.landscape || false,
        margin: options.margin || {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px'
        },
        printBackground: true
      };
      
      // Generate the PDF
      const file = { content: html };
      const buffer = await htmlPdf.generatePdf(file, pdfOptions);
      
      return buffer;
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Failed to generate PDF');
    }
  }

  /**
   * Registers custom Handlebars helpers for template rendering
   */
  private registerHandlebarsHelpers() {
    // Join array items with commas
    handlebars.registerHelper('join', function(array: string[], separator: string = ', ') {
      return Array.isArray(array) ? array.join(separator) : array;
    });
    
    // Format a date string
    handlebars.registerHelper('formatDate', function(dateStr: string) {
      if (!dateStr) return '';
      
      try {
        return new Date(dateStr).toLocaleDateString();
      } catch {
        return dateStr;
      }
    });
    
    // Check if a value is defined and not empty
    handlebars.registerHelper('isDefined', function(value) {
      if (Array.isArray(value)) return value.length > 0;
      return value !== undefined && value !== null && value !== '';
    });
  }

  /**
   * Creates a simple fallback template in case the requested template can't be loaded
   */
  private createFallbackTemplate(style: CVLayoutStyle): string {
    let css = '';
    let template = '';
    
    // Base CSS for all templates
    const baseCSS = `
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        color: #333;
      }
      .header {
        margin-bottom: 30px;
      }
      h1 {
        margin: 0;
        color: #000;
      }
      .contact-info {
        margin: 10px 0;
        font-size: 14px;
      }
      .section {
        margin-bottom: 25px;
      }
      .section-title {
        font-size: 18px;
        margin-bottom: 15px;
      }
      .item {
        margin-bottom: 15px;
      }
      .item-header {
        display: flex;
        justify-content: space-between;
        font-weight: bold;
        margin-bottom: 5px;
      }
      .item-content {
        font-size: 14px;
      }
    `;
    
    // Add style-specific CSS
    switch (style) {
      case 'modern':
        css = `
          ${baseCSS}
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            color: #333;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          h1 {
            color: #2c3e50;
            font-size: 26px;
          }
          .section-title {
            color: #3498db;
            border-bottom: 2px solid #3498db;
            padding-bottom: 8px;
          }
          .item-header {
            color: #2c3e50;
          }
        `;
        break;
        
      case 'classic':
        css = `
          ${baseCSS}
          body {
            font-family: Georgia, serif;
          }
          .header {
            text-align: center;
          }
          h1 {
            color: #000;
            font-weight: normal;
            font-size: 28px;
          }
          .section-title {
            color: #000;
            border-bottom: 1px solid #000;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-size: 16px;
          }
        `;
        break;
        
      case 'minimalist':
        css = `
          ${baseCSS}
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #444;
            line-height: 1.6;
          }
          .header {
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
          }
          h1 {
            font-weight: 300;
            font-size: 24px;
            color: #222;
          }
          .section-title {
            font-weight: 500;
            font-size: 16px;
            color: #222;
            text-transform: uppercase;
          }
          .item-header {
            font-weight: 500;
          }
        `;
        break;
        
      case 'creative':
        css = `
          ${baseCSS}
          body {
            font-family: 'Trebuchet MS', sans-serif;
            background-color: #fafafa;
          }
          .header {
            background-color: #9b59b6;
            color: white;
            padding: 20px;
            border-radius: 5px;
            margin: -20px -20px 30px -20px;
          }
          h1 {
            color: white;
            text-transform: uppercase;
          }
          .contact-info {
            color: rgba(255, 255, 255, 0.8);
          }
          .section-title {
            color: #9b59b6;
            border-left: 4px solid #9b59b6;
            padding-left: 10px;
          }
          .item {
            border-left: 2px solid #eee;
            padding-left: 15px;
          }
        `;
        break;
        
      case 'executive':
        css = `
          ${baseCSS}
          body {
            font-family: 'Times New Roman', Times, serif;
            color: #222;
          }
          .header {
            border-bottom: 3px double #999;
            padding-bottom: 15px;
          }
          h1 {
            font-size: 26px;
            color: #333;
            text-transform: uppercase;
          }
          .section-title {
            color: #333;
            border-bottom: 1px solid #999;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .item-header {
            font-weight: bold;
          }
        `;
        break;
        
      default:
        css = baseCSS;
    }
    
    // Create the template with the appropriate CSS
    template = `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>{{title}}</title>
          <style>${css}</style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1>{{personalInfo.fullName}}</h1>
              <div class="contact-info">
                {{personalInfo.title}} | {{personalInfo.email}} | {{personalInfo.phone}} | {{personalInfo.location}}
              </div>
            </div>
          </div>
          
          <div class="section">
            <h2 class="section-title">Summary</h2>
            <p>{{personalInfo.summary}}</p>
          </div>
          
          {{#if experience.length}}
          <div class="section">
            <h2 class="section-title">Experience</h2>
            {{#each experience}}
            <div class="item">
              <div class="item-header">
                <span>{{position}}, {{company}}</span>
                <span>{{startDate}} - {{endDate}}</span>
              </div>
              <div class="item-content">{{description}}</div>
            </div>
            {{/each}}
          </div>
          {{/if}}
          
          {{#if education.length}}
          <div class="section">
            <h2 class="section-title">Education</h2>
            {{#each education}}
            <div class="item">
              <div class="item-header">
                <span>{{degree}}, {{institution}}</span>
                <span>{{period}}</span>
              </div>
              {{#if description}}
              <div class="item-content">{{description}}</div>
              {{/if}}
            </div>
            {{/each}}
          </div>
          {{/if}}
          
          {{#if skills.length}}
          <div class="section">
            <h2 class="section-title">Skills</h2>
            <p>{{join skills}}</p>
          </div>
          {{/if}}
          
          {{#if projects.length}}
          <div class="section">
            <h2 class="section-title">Projects</h2>
            {{#each projects}}
            <div class="item">
              <div class="item-header">
                <span>{{title}}</span>
                {{#if startDate}}
                <span>{{startDate}}{{#if endDate}} - {{endDate}}{{/if}}</span>
                {{/if}}
              </div>
              <div class="item-content">
                {{description}}
                {{#if technologies.length}}
                <div><strong>Technologies:</strong> {{join technologies}}</div>
                {{/if}}
                {{#if url}}
                <div><strong>URL:</strong> {{url}}</div>
                {{/if}}
              </div>
            </div>
            {{/each}}
          </div>
          {{/if}}
          
          {{#if certifications.length}}
          <div class="section">
            <h2 class="section-title">Certifications</h2>
            {{#each certifications}}
            <div class="item">
              <div class="item-header">
                <span>{{name}}, {{issuer}}</span>
                <span>{{date}}{{#if expiryDate}} - {{expiryDate}}{{/if}}</span>
              </div>
              {{#if description}}
              <div class="item-content">{{description}}</div>
              {{/if}}
            </div>
            {{/each}}
          </div>
          {{/if}}
          
          {{#if languages.length}}
          <div class="section">
            <h2 class="section-title">Languages</h2>
            <ul>
            {{#each languages}}
              <li><strong>{{name}}:</strong> {{proficiency}}</li>
            {{/each}}
            </ul>
          </div>
          {{/if}}
          
          {{#if references.length}}
          <div class="section">
            <h2 class="section-title">References</h2>
            {{#each references}}
            <div class="item">
              <div class="item-header">
                <span>{{name}}, {{position}}</span>
                <span>{{company}}</span>
              </div>
              <div class="item-content">
                <div>Relationship: {{relationship}}</div>
                {{#if email}}<div>Email: {{email}}</div>{{/if}}
                {{#if phone}}<div>Phone: {{phone}}</div>{{/if}}
              </div>
            </div>
            {{/each}}
          </div>
          {{/if}}
          
          {{#if publications.length}}
          <div class="section">
            <h2 class="section-title">Publications</h2>
            {{#each publications}}
            <div class="item">
              <div class="item-header">
                <span>{{title}}, {{publisher}}</span>
                <span>{{date}}</span>
              </div>
              {{#if description}}
              <div class="item-content">{{description}}</div>
              {{/if}}
            </div>
            {{/each}}
          </div>
          {{/if}}
          
          {{#if customSections.length}}
          {{#each customSections}}
          <div class="section">
            <h2 class="section-title">{{title}}</h2>
            {{#each items}}
            <div class="item">
              <div class="item-header">
                <span>{{title}}{{#if subtitle}}, {{subtitle}}{{/if}}</span>
                {{#if date}}<span>{{date}}</span>{{/if}}
              </div>
              {{#if description}}
              <div class="item-content">{{description}}</div>
              {{/if}}
            </div>
            {{/each}}
          </div>
          {{/each}}
          {{/if}}
        </body>
      </html>`;
      
    return template;
  }
}

export default new PDFGenerator();