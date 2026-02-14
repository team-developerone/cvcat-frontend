import { CV } from '@/lib/types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

type CVLayoutStyle = 'modern' | 'classic' | 'minimalist' | 'creative' | 'executive';

/**
 * Generates HTML string for a given CV and layout template.
 * Each template mirrors the preview rendering in CVBuilder.tsx.
 */
function renderCVToHTML(cv: CV, layout: CVLayoutStyle): string {
  const escape = (s: string | undefined | null) =>
    (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const sectionsHTML = {
    summary: cv.personalInfo.summary ? escape(cv.personalInfo.summary) : '',
    experience: cv.experience.map(exp => ({
      position: escape(exp.position),
      company: escape(exp.company),
      startDate: escape(exp.startDate),
      endDate: escape(exp.endDate),
      description: escape(exp.description),
    })),
    education: cv.education.map(edu => ({
      degree: escape(edu.degree),
      institution: escape(edu.institution),
      period: escape(edu.period),
      description: escape(edu.description),
    })),
    skills: cv.skills.map(s => escape(s)),
    projects: (cv.projects || []).map(p => ({
      title: escape(p.title),
      description: escape(p.description),
      startDate: escape(p.startDate),
      endDate: escape(p.endDate),
      technologies: (p.technologies || []).map(t => escape(t)),
      url: escape(p.url),
    })),
    certifications: (cv.certifications || []).map(c => ({
      name: escape(c.name),
      issuer: escape(c.issuer),
      date: escape(c.date),
      description: escape(c.description),
    })),
    languages: (cv.languages || []).map(l => ({
      name: escape(l.name),
      proficiency: escape(l.proficiency),
    })),
    references: (cv.references || []).map(r => ({
      name: escape(r.name),
      position: escape(r.position),
      company: escape(r.company),
      email: escape(r.email),
      phone: escape(r.phone),
    })),
    publications: (cv.publications || []).map(p => ({
      title: escape(p.title),
      publisher: escape(p.publisher),
      date: escape(p.date),
    })),
    customSections: (cv.customSections || []).map(s => ({
      title: escape(s.title),
      items: s.items.map(item => ({
        title: escape(item.title),
        subtitle: escape(item.subtitle),
        date: escape(item.date),
        description: escape(item.description),
      })),
    })),
  };

  const pi = {
    fullName: escape(cv.personalInfo.fullName),
    title: escape(cv.personalInfo.title),
    email: escape(cv.personalInfo.email),
    phone: escape(cv.personalInfo.phone),
    location: escape(cv.personalInfo.location),
  };

  switch (layout) {
    case 'modern':
      return renderModern(pi, sectionsHTML);
    case 'classic':
      return renderClassic(pi, sectionsHTML);
    case 'minimalist':
      return renderMinimalist(pi, sectionsHTML);
    case 'creative':
      return renderCreative(pi, sectionsHTML);
    case 'executive':
      return renderExecutive(pi, sectionsHTML);
    default:
      return renderModern(pi, sectionsHTML);
  }
}

type PI = { fullName: string; title: string; email: string; phone: string; location: string };
interface Sections {
  summary: string;
  experience: { position: string; company: string; startDate: string; endDate: string; description: string }[];
  education: { degree: string; institution: string; period: string; description: string }[];
  skills: string[];
  projects: { title: string; description: string; startDate: string; endDate: string; technologies: string[]; url: string }[];
  certifications: { name: string; issuer: string; date: string; description: string }[];
  languages: { name: string; proficiency: string }[];
  references: { name: string; position: string; company: string; email: string; phone: string }[];
  publications: { title: string; publisher: string; date: string }[];
  customSections: { title: string; items: { title: string; subtitle: string; date: string; description: string }[] }[];
}

function renderModern(pi: PI, s: Sections): string {
  return `
    <div style="padding: 40px; font-family: Inter, Helvetica, Arial, sans-serif; color: #000; max-width: 800px; margin: 0 auto;">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="width: 96px; height: 2px; background: #DAA520; margin: 0 auto 12px;"></div>
        <h1 style="font-size: 24px; font-weight: bold; margin: 0 0 4px;">${pi.fullName}</h1>
        <p style="color: #666; margin: 0 0 8px;">${pi.title}</p>
        <div style="display: flex; justify-content: center; gap: 16px; font-size: 13px; color: #888;">
          <span>${pi.email}</span>
          <span>${pi.phone}</span>
          <span>${pi.location}</span>
        </div>
      </div>

      <!-- Summary -->
      ${s.summary ? `
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 15px; font-weight: 600; color: #333; margin: 0 0 8px; display: flex; align-items: center;">
          <span style="display: inline-block; width: 24px; height: 2px; background: #DAA520; margin-right: 8px;"></span>
          Professional Summary
        </h2>
        <p style="font-size: 13px; color: #666; margin: 0; line-height: 1.6;">${s.summary}</p>
      </div>` : ''}

      <!-- Experience -->
      ${s.experience.length > 0 ? `
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 15px; font-weight: 600; color: #333; margin: 0 0 8px; display: flex; align-items: center;">
          <span style="display: inline-block; width: 24px; height: 2px; background: #DAA520; margin-right: 8px;"></span>
          Experience
        </h2>
        ${s.experience.map(exp => `
        <div style="margin-bottom: 12px; font-size: 13px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span style="font-weight: 500;">${exp.position}</span>
            <span style="color: #888;">${exp.startDate} - ${exp.endDate}</span>
          </div>
          <p style="color: #666; margin: 0 0 4px;">${exp.company}</p>
          <p style="color: #666; font-size: 12px; margin: 0;">${exp.description}</p>
        </div>`).join('')}
      </div>` : ''}

      <!-- Education -->
      ${s.education.length > 0 ? `
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 15px; font-weight: 600; color: #333; margin: 0 0 8px; display: flex; align-items: center;">
          <span style="display: inline-block; width: 24px; height: 2px; background: #DAA520; margin-right: 8px;"></span>
          Education
        </h2>
        ${s.education.map(edu => `
        <div style="margin-bottom: 12px; font-size: 13px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span style="font-weight: 500;">${edu.degree}</span>
            <span style="color: #888;">${edu.period}</span>
          </div>
          <p style="color: #666; margin: 0;">${edu.institution}</p>
        </div>`).join('')}
      </div>` : ''}

      <!-- Skills -->
      ${s.skills.length > 0 ? `
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 15px; font-weight: 600; color: #333; margin: 0 0 8px; display: flex; align-items: center;">
          <span style="display: inline-block; width: 24px; height: 2px; background: #DAA520; margin-right: 8px;"></span>
          Skills
        </h2>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${s.skills.map(skill => `<span style="font-size: 12px; padding: 4px 8px; background: #f3f4f6; color: #555; border-radius: 4px;">${skill}</span>`).join('')}
        </div>
      </div>` : ''}

      <!-- Projects -->
      ${s.projects.length > 0 ? `
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 15px; font-weight: 600; color: #333; margin: 0 0 8px; display: flex; align-items: center;">
          <span style="display: inline-block; width: 24px; height: 2px; background: #DAA520; margin-right: 8px;"></span>
          Projects
        </h2>
        ${s.projects.map(p => `
        <div style="margin-bottom: 12px; font-size: 13px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span style="font-weight: 500;">${p.title}</span>
            ${(p.startDate || p.endDate) ? `<span style="color: #888;">${p.startDate}${p.endDate ? ` - ${p.endDate}` : ' - Present'}</span>` : ''}
          </div>
          <p style="color: #666; font-size: 12px; margin: 0 0 4px;">${p.description}</p>
          ${p.technologies.length > 0 ? `<div style="display: flex; flex-wrap: wrap; gap: 4px;">${p.technologies.map(t => `<span style="font-size: 10px; padding: 2px 6px; background: #f3f4f6; color: #666; border-radius: 3px;">${t}</span>`).join('')}</div>` : ''}
        </div>`).join('')}
      </div>` : ''}

      <!-- Certifications -->
      ${s.certifications.length > 0 ? `
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 15px; font-weight: 600; color: #333; margin: 0 0 8px; display: flex; align-items: center;">
          <span style="display: inline-block; width: 24px; height: 2px; background: #DAA520; margin-right: 8px;"></span>
          Certifications
        </h2>
        ${s.certifications.map(c => `
        <div style="margin-bottom: 8px; font-size: 13px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
            <span style="font-weight: 500;">${c.name}</span>
            <span style="color: #888;">${c.date}</span>
          </div>
          <p style="color: #666; margin: 0;">${c.issuer}</p>
        </div>`).join('')}
      </div>` : ''}

      <!-- Languages -->
      ${s.languages.length > 0 ? `
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 15px; font-weight: 600; color: #333; margin: 0 0 8px; display: flex; align-items: center;">
          <span style="display: inline-block; width: 24px; height: 2px; background: #DAA520; margin-right: 8px;"></span>
          Languages
        </h2>
        <div style="display: flex; flex-wrap: wrap; gap: 16px;">
          ${s.languages.map(l => `<div style="font-size: 13px;"><span style="font-weight: 500;">${l.name}:</span> <span style="color: #666;">${l.proficiency}</span></div>`).join('')}
        </div>
      </div>` : ''}

      <!-- References -->
      ${s.references.length > 0 ? `
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 15px; font-weight: 600; color: #333; margin: 0 0 8px; display: flex; align-items: center;">
          <span style="display: inline-block; width: 24px; height: 2px; background: #DAA520; margin-right: 8px;"></span>
          References
        </h2>
        ${s.references.map(r => `
        <div style="margin-bottom: 12px; font-size: 13px;">
          <p style="font-weight: 500; margin: 0;">${r.name}</p>
          <p style="color: #666; margin: 0;">${r.position}, ${r.company}</p>
          <div style="display: flex; gap: 16px; color: #888; font-size: 12px; margin-top: 2px;">
            ${r.email ? `<span>${r.email}</span>` : ''}
            ${r.phone ? `<span>${r.phone}</span>` : ''}
          </div>
        </div>`).join('')}
      </div>` : ''}

      <!-- Publications -->
      ${s.publications.length > 0 ? `
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 15px; font-weight: 600; color: #333; margin: 0 0 8px; display: flex; align-items: center;">
          <span style="display: inline-block; width: 24px; height: 2px; background: #DAA520; margin-right: 8px;"></span>
          Publications
        </h2>
        ${s.publications.map(p => `
        <div style="margin-bottom: 8px; font-size: 13px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
            <span style="font-weight: 500; font-style: italic;">${p.title}</span>
            <span style="color: #888;">${p.date}</span>
          </div>
          <p style="color: #666; margin: 0;">${p.publisher}</p>
        </div>`).join('')}
      </div>` : ''}

      <!-- Custom Sections -->
      ${s.customSections.map(sec => `
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 15px; font-weight: 600; color: #333; margin: 0 0 8px; display: flex; align-items: center;">
          <span style="display: inline-block; width: 24px; height: 2px; background: #DAA520; margin-right: 8px;"></span>
          ${sec.title}
        </h2>
        ${sec.items.map(item => `
        <div style="margin-bottom: 8px; font-size: 13px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
            <span style="font-weight: 500;">${item.title}</span>
            ${item.date ? `<span style="color: #888;">${item.date}</span>` : ''}
          </div>
          ${item.subtitle ? `<p style="color: #666; margin: 0;">${item.subtitle}</p>` : ''}
          ${item.description ? `<p style="color: #666; font-size: 12px; margin: 4px 0 0;">${item.description}</p>` : ''}
        </div>`).join('')}
      </div>`).join('')}
    </div>`;
}

function renderClassic(pi: PI, s: Sections): string {
  return `
    <div style="padding: 40px; font-family: Georgia, 'Times New Roman', serif; color: #000; max-width: 800px; margin: 0 auto;">
      <!-- Header -->
      <div style="margin-bottom: 16px;">
        <h1 style="font-size: 28px; font-weight: bold; margin: 0;">${pi.fullName}</h1>
        <p style="color: #555; font-weight: 600; font-style: italic; margin: 0 0 8px;">${pi.title}</p>
        <div style="font-size: 13px; color: #666;">
          <div>${pi.email} &bull; ${pi.phone}</div>
          <div>${pi.location}</div>
        </div>
      </div>
      <div style="width: 100%; height: 1px; background: #ccc; margin: 16px 0;"></div>

      <!-- Summary -->
      ${s.summary ? `
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">SUMMARY</h2>
        <p style="font-size: 13px; color: #555; line-height: 1.6; margin: 0;">${s.summary}</p>
      </div>` : ''}

      <!-- Experience -->
      ${s.experience.length > 0 ? `
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">EXPERIENCE</h2>
        ${s.experience.map(exp => `
        <div style="margin-bottom: 16px; font-size: 13px;">
          <p style="font-weight: bold; margin: 0;">${exp.position}</p>
          <div style="display: flex; justify-content: space-between; color: #555; font-style: italic; margin: 0 0 4px;">
            <span>${exp.company}</span>
            <span>${exp.startDate} - ${exp.endDate}</span>
          </div>
          <p style="color: #555; margin: 0;">${exp.description}</p>
        </div>`).join('')}
      </div>` : ''}

      <!-- Education -->
      ${s.education.length > 0 ? `
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">EDUCATION</h2>
        ${s.education.map(edu => `
        <div style="margin-bottom: 12px; font-size: 13px;">
          <p style="font-weight: bold; margin: 0;">${edu.degree}</p>
          <div style="display: flex; justify-content: space-between; color: #555; font-style: italic;">
            <span>${edu.institution}</span>
            <span>${edu.period}</span>
          </div>
        </div>`).join('')}
      </div>` : ''}

      <!-- Skills -->
      ${s.skills.length > 0 ? `
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">SKILLS</h2>
        <p style="font-size: 13px; color: #555; margin: 0;">${s.skills.join(', ')}</p>
      </div>` : ''}

      <!-- Projects -->
      ${s.projects.length > 0 ? `
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">PROJECTS</h2>
        ${s.projects.map(p => `
        <div style="margin-bottom: 12px; font-size: 13px;">
          <div style="display: flex; justify-content: space-between;">
            <span style="font-weight: bold;">${p.title}</span>
            ${(p.startDate || p.endDate) ? `<span style="color: #555; font-style: italic;">${p.startDate}${p.endDate ? ` - ${p.endDate}` : ''}</span>` : ''}
          </div>
          <p style="color: #555; margin: 0;">${p.description}</p>
          ${p.technologies.length > 0 ? `<p style="font-size: 12px; color: #666; margin: 4px 0 0;"><b>Technologies:</b> ${p.technologies.join(', ')}</p>` : ''}
        </div>`).join('')}
      </div>` : ''}

      <!-- Certifications -->
      ${s.certifications.length > 0 ? `
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">CERTIFICATIONS</h2>
        ${s.certifications.map(c => `
        <div style="margin-bottom: 12px; font-size: 13px;">
          <div style="display: flex; justify-content: space-between;">
            <span style="font-weight: bold;">${c.name}</span>
            <span style="color: #555; font-style: italic;">${c.date}</span>
          </div>
          <p style="color: #555; margin: 0;">${c.issuer}</p>
          ${c.description ? `<p style="font-size: 12px; color: #666; margin: 4px 0 0;">${c.description}</p>` : ''}
        </div>`).join('')}
      </div>` : ''}

      <!-- Languages -->
      ${s.languages.length > 0 ? `
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">LANGUAGES</h2>
        <div style="display: flex; flex-wrap: wrap; gap: 16px;">
          ${s.languages.map(l => `<div style="font-size: 13px;"><span style="font-weight: 500;">${l.name}:</span> ${l.proficiency}</div>`).join('')}
        </div>
      </div>` : ''}

      <!-- References -->
      ${s.references.length > 0 ? `
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">REFERENCES</h2>
        ${s.references.map(r => `
        <div style="margin-bottom: 12px; font-size: 13px;">
          <p style="font-weight: bold; margin: 0;">${r.name}</p>
          <p style="color: #555; margin: 0;">${r.position}, ${r.company}</p>
          <div style="display: flex; gap: 16px; color: #666; font-size: 12px; margin-top: 2px;">
            ${r.email ? `<span>${r.email}</span>` : ''}
            ${r.phone ? `<span>${r.phone}</span>` : ''}
          </div>
        </div>`).join('')}
      </div>` : ''}

      <!-- Publications -->
      ${s.publications.length > 0 ? `
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">PUBLICATIONS</h2>
        ${s.publications.map(p => `
        <div style="margin-bottom: 8px; font-size: 13px;">
          <div style="display: flex; justify-content: space-between;">
            <span style="font-weight: bold; font-style: italic;">${p.title}</span>
            <span style="color: #555;">${p.date}</span>
          </div>
          <p style="color: #555; margin: 0;">${p.publisher}</p>
        </div>`).join('')}
      </div>` : ''}

      <!-- Custom Sections -->
      ${s.customSections.map(sec => `
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">${sec.title}</h2>
        ${sec.items.map(item => `
        <div style="margin-bottom: 8px; font-size: 13px;">
          <div style="display: flex; justify-content: space-between;">
            <span style="font-weight: bold;">${item.title}</span>
            ${item.date ? `<span style="color: #555; font-style: italic;">${item.date}</span>` : ''}
          </div>
          ${item.subtitle ? `<p style="color: #555; margin: 0;">${item.subtitle}</p>` : ''}
          ${item.description ? `<p style="color: #666; margin: 4px 0 0;">${item.description}</p>` : ''}
        </div>`).join('')}
      </div>`).join('')}
    </div>`;
}

function renderMinimalist(pi: PI, s: Sections): string {
  return `
    <div style="display: flex; font-family: Inter, Helvetica, Arial, sans-serif; color: #000; max-width: 800px; margin: 0 auto; min-height: 1120px;">
      <!-- Sidebar -->
      <div style="width: 33%; background: #f9fafb; padding: 24px; display: flex; flex-direction: column;">
        <h1 style="font-size: 20px; font-weight: bold; margin: 0 0 16px;">${pi.fullName}</h1>
        <p style="color: #666; font-size: 13px; margin: 0 0 8px;">${pi.title}</p>
        <div style="font-size: 13px; color: #666; margin-bottom: 24px;">
          <p style="margin: 4px 0;">${pi.email}</p>
          <p style="margin: 4px 0;">${pi.phone}</p>
          <p style="margin: 4px 0;">${pi.location}</p>
        </div>

        <!-- Skills in sidebar -->
        ${s.skills.length > 0 ? `
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 500; margin: 0 0 8px;">Skills</h3>
          ${s.skills.map(skill => `<div style="font-size: 12px; margin-bottom: 6px;">${skill}</div>`).join('')}
        </div>` : ''}

        <!-- Languages in sidebar -->
        ${s.languages.length > 0 ? `
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 500; margin: 0 0 8px;">Languages</h3>
          ${s.languages.map(l => `<div style="font-size: 12px; margin-bottom: 6px;"><span>${l.name}:</span> <span style="color: #888;">${l.proficiency}</span></div>`).join('')}
        </div>` : ''}
      </div>

      <!-- Main content -->
      <div style="width: 67%; padding: 24px; display: flex; flex-direction: column;">
        ${s.summary ? `<p style="font-size: 13px; color: #555; margin: 0 0 24px; line-height: 1.5;">${s.summary}</p>` : ''}

        <!-- Experience -->
        ${s.experience.length > 0 ? `
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 14px; font-weight: 500; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; margin: 0 0 12px;">Experience</h3>
          ${s.experience.map(exp => `
          <div style="margin-bottom: 16px; font-size: 12px;">
            <p style="font-weight: 500; margin: 0;">${exp.position}</p>
            <div style="display: flex; justify-content: space-between; color: #888; margin-bottom: 4px;">
              <span>${exp.company}</span>
              <span>${exp.startDate} - ${exp.endDate}</span>
            </div>
            <p style="color: #666; margin: 0;">${exp.description}</p>
          </div>`).join('')}
        </div>` : ''}

        <!-- Education -->
        ${s.education.length > 0 ? `
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 14px; font-weight: 500; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; margin: 0 0 12px;">Education</h3>
          ${s.education.map(edu => `
          <div style="margin-bottom: 12px; font-size: 12px;">
            <p style="font-weight: 500; margin: 0;">${edu.degree}</p>
            <div style="display: flex; justify-content: space-between; color: #888;">
              <span>${edu.institution}</span>
              <span>${edu.period}</span>
            </div>
          </div>`).join('')}
        </div>` : ''}

        <!-- Projects -->
        ${s.projects.length > 0 ? `
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 14px; font-weight: 500; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; margin: 0 0 12px;">Projects</h3>
          ${s.projects.map(p => `
          <div style="margin-bottom: 12px; font-size: 12px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
              <span style="font-weight: 500;">${p.title}</span>
              ${(p.startDate || p.endDate) ? `<span style="color: #888;">${p.startDate}${p.endDate ? ` - ${p.endDate}` : ''}</span>` : ''}
            </div>
            <p style="color: #666; margin: 0;">${p.description}</p>
            ${p.technologies.length > 0 ? `<p style="font-size: 11px; color: #888; margin: 4px 0 0;"><b>Tech:</b> ${p.technologies.join(', ')}</p>` : ''}
          </div>`).join('')}
        </div>` : ''}

        <!-- Certifications -->
        ${s.certifications.length > 0 ? `
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 14px; font-weight: 500; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; margin: 0 0 12px;">Certifications</h3>
          ${s.certifications.map(c => `
          <div style="margin-bottom: 8px; font-size: 12px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
              <span style="font-weight: 500;">${c.name}</span>
              <span style="color: #888;">${c.date}</span>
            </div>
            <p style="color: #666; margin: 0;">${c.issuer}</p>
          </div>`).join('')}
        </div>` : ''}

        <!-- References -->
        ${s.references.length > 0 ? `
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 14px; font-weight: 500; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; margin: 0 0 12px;">References</h3>
          ${s.references.map(r => `
          <div style="margin-bottom: 12px; font-size: 12px;">
            <p style="font-weight: 500; margin: 0;">${r.name}</p>
            <p style="color: #666; margin: 0;">${r.position}, ${r.company}</p>
            <div style="display: flex; gap: 12px; color: #888; font-size: 11px; margin-top: 2px;">
              ${r.email ? `<span>${r.email}</span>` : ''}
              ${r.phone ? `<span>${r.phone}</span>` : ''}
            </div>
          </div>`).join('')}
        </div>` : ''}

        <!-- Publications -->
        ${s.publications.length > 0 ? `
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 14px; font-weight: 500; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; margin: 0 0 12px;">Publications</h3>
          ${s.publications.map(p => `
          <div style="margin-bottom: 8px; font-size: 12px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
              <span style="font-weight: 500; font-style: italic;">${p.title}</span>
              <span style="color: #888;">${p.date}</span>
            </div>
            <p style="color: #666; margin: 0;">${p.publisher}</p>
          </div>`).join('')}
        </div>` : ''}

        <!-- Custom Sections -->
        ${s.customSections.map(sec => `
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 14px; font-weight: 500; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; margin: 0 0 12px;">${sec.title}</h3>
          ${sec.items.map(item => `
          <div style="margin-bottom: 8px; font-size: 12px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
              <span style="font-weight: 500;">${item.title}</span>
              ${item.date ? `<span style="color: #888;">${item.date}</span>` : ''}
            </div>
            ${item.subtitle ? `<p style="color: #666; margin: 0;">${item.subtitle}</p>` : ''}
            ${item.description ? `<p style="color: #666; font-size: 11px; margin: 4px 0 0;">${item.description}</p>` : ''}
          </div>`).join('')}
        </div>`).join('')}
      </div>
    </div>`;
}

function renderCreative(pi: PI, s: Sections): string {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #000; max-width: 800px; margin: 0 auto;">
      <!-- Banner Header -->
      <div style="background: rgba(218,165,32,0.15); padding: 24px 40px; display: flex; align-items: center;">
        <div>
          <h1 style="font-size: 24px; font-weight: bold; margin: 0;">${pi.fullName}</h1>
          <p style="color: #666; margin: 0;">${pi.title}</p>
        </div>
      </div>

      <div style="padding: 32px 40px;">
        <!-- Contact info -->
        <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 24px; font-size: 13px;">
          <div style="display: flex; align-items: center; gap: 4px;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #DAA520; display: inline-block;"></span>
            <span>${pi.email}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 4px;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #DAA520; display: inline-block;"></span>
            <span>${pi.phone}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 4px;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #DAA520; display: inline-block;"></span>
            <span>${pi.location}</span>
          </div>
        </div>

        ${s.summary ? `<p style="font-size: 13px; margin: 0 0 24px; line-height: 1.5;">${s.summary}</p>` : ''}

        <!-- Experience -->
        ${s.experience.length > 0 ? `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 18px; font-weight: 600; margin: 0 0 12px;">Experience</h2>
          ${s.experience.map(exp => `
          <div style="padding-left: 16px; border-left: 2px solid rgba(218,165,32,0.3); margin-bottom: 16px; position: relative;">
            <div style="position: absolute; left: -5px; top: 0; width: 8px; height: 8px; border-radius: 50%; background: #DAA520;"></div>
            <p style="font-weight: 600; margin: 0;">${exp.position}</p>
            <div style="display: flex; justify-content: space-between; font-size: 13px; color: #666; margin-bottom: 4px;">
              <span>${exp.company}</span>
              <span>${exp.startDate} - ${exp.endDate}</span>
            </div>
            <p style="font-size: 13px; color: #666; margin: 0;">${exp.description}</p>
          </div>`).join('')}
        </div>` : ''}

        <!-- Education -->
        ${s.education.length > 0 ? `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 18px; font-weight: 600; margin: 0 0 12px;">Education</h2>
          ${s.education.map(edu => `
          <div style="padding-left: 16px; border-left: 2px solid rgba(218,165,32,0.3); margin-bottom: 16px; position: relative;">
            <div style="position: absolute; left: -5px; top: 0; width: 8px; height: 8px; border-radius: 50%; background: #DAA520;"></div>
            <p style="font-weight: 600; margin: 0;">${edu.degree}</p>
            <div style="display: flex; justify-content: space-between; font-size: 13px; color: #666; margin-bottom: 4px;">
              <span>${edu.institution}</span>
              <span>${edu.period}</span>
            </div>
          </div>`).join('')}
        </div>` : ''}

        <!-- Skills -->
        ${s.skills.length > 0 ? `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 18px; font-weight: 600; margin: 0 0 12px;">Skills</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${s.skills.map(skill => `<span style="padding: 4px 12px; background: rgba(218,165,32,0.1); border-radius: 20px; font-size: 12px;">${skill}</span>`).join('')}
          </div>
        </div>` : ''}

        <!-- Projects -->
        ${s.projects.length > 0 ? `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 18px; font-weight: 600; margin: 0 0 12px;">Projects</h2>
          ${s.projects.map(p => `
          <div style="padding: 12px; border-radius: 6px; background: #f9fafb; margin-bottom: 12px; font-size: 13px;">
            <p style="font-weight: 600; margin: 0 0 4px;">${p.title}</p>
            ${(p.startDate || p.endDate) ? `<p style="font-size: 12px; color: #DAA520; margin: 0 0 4px;">${p.startDate}${p.endDate ? ` - ${p.endDate}` : ''}</p>` : ''}
            <p style="color: #666; margin: 0 0 8px;">${p.description}</p>
            ${p.technologies.length > 0 ? `<div style="display: flex; flex-wrap: wrap; gap: 4px;">${p.technologies.map(t => `<span style="font-size: 11px; padding: 2px 8px; background: rgba(218,165,32,0.1); border-radius: 3px;">${t}</span>`).join('')}</div>` : ''}
          </div>`).join('')}
        </div>` : ''}

        <!-- Certifications -->
        ${s.certifications.length > 0 ? `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 18px; font-weight: 600; margin: 0 0 12px;">Certifications</h2>
          ${s.certifications.map(c => `
          <div style="padding-left: 16px; border-left: 2px solid rgba(218,165,32,0.3); margin-bottom: 12px; position: relative;">
            <div style="position: absolute; left: -5px; top: 0; width: 8px; height: 8px; border-radius: 50%; background: #DAA520;"></div>
            <p style="font-weight: 600; margin: 0;">${c.name}</p>
            <div style="display: flex; justify-content: space-between; font-size: 13px;">
              <span style="color: #666;">${c.issuer}</span>
              <span style="color: #DAA520;">${c.date}</span>
            </div>
            ${c.description ? `<p style="font-size: 12px; color: #666; margin: 4px 0 0;">${c.description}</p>` : ''}
          </div>`).join('')}
        </div>` : ''}

        <!-- Languages -->
        ${s.languages.length > 0 ? `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 18px; font-weight: 600; margin: 0 0 12px;">Languages</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 12px;">
            ${s.languages.map(l => `
            <div style="display: flex; align-items: center; justify-content: space-between; min-width: 150px;">
              <span style="font-weight: 500;">${l.name}</span>
              <span style="font-size: 12px; padding: 2px 8px; background: rgba(218,165,32,0.1); border-radius: 3px;">${l.proficiency}</span>
            </div>`).join('')}
          </div>
        </div>` : ''}

        <!-- References -->
        ${s.references.length > 0 ? `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 18px; font-weight: 600; margin: 0 0 12px;">References</h2>
          ${s.references.map(r => `
          <div style="padding: 12px; border-radius: 6px; background: #f9fafb; margin-bottom: 12px;">
            <p style="font-weight: 600; margin: 0;">${r.name}</p>
            <p style="font-size: 13px; color: #666; margin: 0;">${r.position}, ${r.company}</p>
            <div style="display: flex; gap: 12px; font-size: 12px; color: #888; margin-top: 4px;">
              ${r.email ? `<span>${r.email}</span>` : ''}
              ${r.phone ? `<span>${r.phone}</span>` : ''}
            </div>
          </div>`).join('')}
        </div>` : ''}

        <!-- Publications -->
        ${s.publications.length > 0 ? `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 18px; font-weight: 600; margin: 0 0 12px;">Publications</h2>
          ${s.publications.map(p => `
          <div style="padding-left: 16px; border-left: 2px solid rgba(218,165,32,0.3); margin-bottom: 12px; position: relative;">
            <div style="position: absolute; left: -5px; top: 0; width: 8px; height: 8px; border-radius: 50%; background: #DAA520;"></div>
            <p style="font-weight: 600; font-style: italic; margin: 0;">${p.title}</p>
            <div style="display: flex; justify-content: space-between; font-size: 13px;">
              <span style="color: #666;">${p.publisher}</span>
              <span style="color: #DAA520;">${p.date}</span>
            </div>
          </div>`).join('')}
        </div>` : ''}

        <!-- Custom Sections -->
        ${s.customSections.map(sec => `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 18px; font-weight: 600; margin: 0 0 12px;">${sec.title}</h2>
          ${sec.items.map(item => `
          <div style="padding-left: 16px; border-left: 2px solid rgba(218,165,32,0.3); margin-bottom: 12px; position: relative;">
            <div style="position: absolute; left: -5px; top: 0; width: 8px; height: 8px; border-radius: 50%; background: #DAA520;"></div>
            <p style="font-weight: 600; margin: 0;">${item.title}</p>
            ${item.subtitle ? `<p style="font-size: 13px; color: #666; margin: 0;">${item.subtitle}</p>` : ''}
            ${item.date ? `<p style="font-size: 12px; color: #DAA520; margin: 0;">${item.date}</p>` : ''}
            ${item.description ? `<p style="font-size: 13px; color: #666; margin: 4px 0 0;">${item.description}</p>` : ''}
          </div>`).join('')}
        </div>`).join('')}
      </div>
    </div>`;
}

function renderExecutive(pi: PI, s: Sections): string {
  return `
    <div style="font-family: Georgia, 'Times New Roman', serif; color: #000; max-width: 800px; margin: 0 auto;">
      <!-- Header with gold accent border -->
      <div style="padding: 32px 40px; border-bottom: 4px solid #DAA520; margin-bottom: 24px;">
        <h1 style="font-size: 28px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 4px;">${pi.fullName}</h1>
        <p style="font-size: 18px; color: #555; letter-spacing: 1px; margin: 0 0 12px;">${pi.title}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 16px; font-size: 13px;">
          <div style="display: flex; align-items: center;">
            <span style="width: 16px; height: 16px; border-radius: 50%; background: #DAA520; display: inline-flex; align-items: center; justify-content: center; margin-right: 8px; color: white; font-size: 8px;">@</span>
            <span>${pi.email}</span>
          </div>
          <div style="display: flex; align-items: center;">
            <span style="width: 16px; height: 16px; border-radius: 50%; background: #DAA520; display: inline-flex; align-items: center; justify-content: center; margin-right: 8px; color: white; font-size: 8px;">T</span>
            <span>${pi.phone}</span>
          </div>
          <div style="display: flex; align-items: center;">
            <span style="width: 16px; height: 16px; border-radius: 50%; background: #DAA520; display: inline-flex; align-items: center; justify-content: center; margin-right: 8px; color: white; font-size: 8px;">L</span>
            <span>${pi.location}</span>
          </div>
        </div>
      </div>

      <div style="padding: 0 40px;">
        <!-- Executive Summary -->
        ${s.summary ? `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 16px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid rgba(218,165,32,0.3); padding-bottom: 4px; margin: 0 0 12px;">EXECUTIVE SUMMARY</h2>
          <p style="font-size: 13px; line-height: 1.6; margin: 0;">${s.summary}</p>
        </div>` : ''}

        <!-- Professional Experience -->
        ${s.experience.length > 0 ? `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 16px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid rgba(218,165,32,0.3); padding-bottom: 4px; margin: 0 0 12px;">PROFESSIONAL EXPERIENCE</h2>
          ${s.experience.map(exp => `
          <div style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-weight: bold;">${exp.position}</span>
              <span style="font-weight: 600; color: #DAA520;">${exp.startDate} - ${exp.endDate}</span>
            </div>
            <p style="font-size: 13px; font-weight: 600; margin: 0 0 4px;">${exp.company}</p>
            <p style="font-size: 13px; color: #555; margin: 0;">${exp.description}</p>
          </div>`).join('')}
        </div>` : ''}

        <!-- Education -->
        ${s.education.length > 0 ? `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 16px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid rgba(218,165,32,0.3); padding-bottom: 4px; margin: 0 0 12px;">EDUCATION</h2>
          ${s.education.map(edu => `
          <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-weight: bold;">${edu.degree}</span>
              <span style="font-weight: 600; color: #DAA520;">${edu.period}</span>
            </div>
            <p style="font-size: 13px; margin: 0;">${edu.institution}</p>
            ${edu.description ? `<p style="font-size: 13px; color: #555; margin: 4px 0 0;">${edu.description}</p>` : ''}
          </div>`).join('')}
        </div>` : ''}

        <!-- Core Competencies -->
        ${s.skills.length > 0 ? `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 16px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid rgba(218,165,32,0.3); padding-bottom: 4px; margin: 0 0 12px;">CORE COMPETENCIES</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 8px 16px;">
            ${s.skills.map(skill => `
            <div style="display: flex; align-items: center; font-size: 13px;">
              <span style="width: 6px; height: 6px; border-radius: 50%; background: #DAA520; margin-right: 8px; display: inline-block;"></span>
              <span>${skill}</span>
            </div>`).join('')}
          </div>
        </div>` : ''}

        <!-- Key Projects -->
        ${s.projects.length > 0 ? `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 16px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid rgba(218,165,32,0.3); padding-bottom: 4px; margin: 0 0 12px;">KEY PROJECTS</h2>
          ${s.projects.map(p => `
          <div style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-weight: bold;">${p.title}</span>
              ${(p.startDate || p.endDate) ? `<span style="font-weight: 600; color: #DAA520;">${p.startDate}${p.endDate ? ` - ${p.endDate}` : ''}</span>` : ''}
            </div>
            <p style="font-size: 13px; color: #555; margin: 0 0 4px;">${p.description}</p>
            ${p.technologies.length > 0 ? `<p style="font-size: 12px; margin: 0;"><b>Technologies:</b> ${p.technologies.join(', ')}</p>` : ''}
          </div>`).join('')}
        </div>` : ''}

        <!-- Certifications -->
        ${s.certifications.length > 0 ? `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 16px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid rgba(218,165,32,0.3); padding-bottom: 4px; margin: 0 0 12px;">CERTIFICATIONS</h2>
          ${s.certifications.map(c => `
          <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-weight: bold;">${c.name}</span>
              <span style="font-weight: 600; color: #DAA520;">${c.date}</span>
            </div>
            <p style="font-size: 13px; margin: 0;">${c.issuer}</p>
            ${c.description ? `<p style="font-size: 13px; color: #555; margin: 4px 0 0;">${c.description}</p>` : ''}
          </div>`).join('')}
        </div>` : ''}

        <!-- Languages -->
        ${s.languages.length > 0 ? `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 16px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid rgba(218,165,32,0.3); padding-bottom: 4px; margin: 0 0 12px;">LANGUAGES</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 24px;">
            ${s.languages.map(l => `<div style="font-size: 13px;"><span style="font-weight: 600;">${l.name}:</span> ${l.proficiency}</div>`).join('')}
          </div>
        </div>` : ''}

        <!-- Professional References -->
        ${s.references.length > 0 ? `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 16px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid rgba(218,165,32,0.3); padding-bottom: 4px; margin: 0 0 12px;">PROFESSIONAL REFERENCES</h2>
          ${s.references.map(r => `
          <div style="margin-bottom: 16px;">
            <p style="font-weight: bold; margin: 0;">${r.name}</p>
            <p style="font-size: 13px; margin: 0;">${r.position}, ${r.company}</p>
            <div style="display: flex; gap: 16px; font-size: 13px; color: #555; margin-top: 4px;">
              ${r.email ? `<span>${r.email}</span>` : ''}
              ${r.phone ? `<span>${r.phone}</span>` : ''}
            </div>
          </div>`).join('')}
        </div>` : ''}

        <!-- Publications -->
        ${s.publications.length > 0 ? `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 16px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid rgba(218,165,32,0.3); padding-bottom: 4px; margin: 0 0 12px;">PUBLICATIONS</h2>
          ${s.publications.map(p => `
          <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-weight: bold; font-style: italic;">${p.title}</span>
              <span style="font-weight: 600; color: #DAA520;">${p.date}</span>
            </div>
            <p style="font-size: 13px; margin: 0;">${p.publisher}</p>
          </div>`).join('')}
        </div>` : ''}

        <!-- Custom Sections -->
        ${s.customSections.map(sec => `
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 16px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid rgba(218,165,32,0.3); padding-bottom: 4px; margin: 0 0 12px;">${sec.title}</h2>
          ${sec.items.map(item => `
          <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-weight: bold;">${item.title}</span>
              ${item.date ? `<span style="font-weight: 600; color: #DAA520;">${item.date}</span>` : ''}
            </div>
            ${item.subtitle ? `<p style="font-size: 13px; margin: 0;">${item.subtitle}</p>` : ''}
            ${item.description ? `<p style="font-size: 13px; color: #555; margin: 4px 0 0;">${item.description}</p>` : ''}
          </div>`).join('')}
        </div>`).join('')}
      </div>
    </div>`;
}

/**
 * Client-side PDF generation service.
 * Renders the CV as HTML in an offscreen container, captures with html2canvas, and outputs via jsPDF.
 */
export class PDFService {
  /**
   * Generate a PDF Blob from CV data using the specified template
   */
  async generatePDF(cv: CV, layout: CVLayoutStyle = 'modern'): Promise<Blob> {
    const html = renderCVToHTML(cv, layout);

    // Create offscreen container
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = '794px'; // A4 width at 96dpi
    container.style.background = 'white';
    container.innerHTML = html;
    document.body.appendChild(container);

    try {
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 794,
        windowWidth: 794,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      // If content is taller than one page, split across multiple pages
      let heightLeft = imgHeight;
      let position = 0;
      let pageNum = 0;

      while (heightLeft > 0) {
        if (pageNum > 0) {
          pdf.addPage();
        }
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
        position -= pdfHeight;
        pageNum++;
      }

      return pdf.output('blob');
    } finally {
      document.body.removeChild(container);
    }
  }

  /**
   * Generate and download a PDF file
   */
  async downloadPDF(cv: CV, layout: CVLayoutStyle = 'modern'): Promise<void> {
    const pdfBlob = await this.generatePDF(cv, layout);

    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cv.title || 'cv'}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

export default new PDFService();
