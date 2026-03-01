import { CV } from '@/lib/types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

type CVLayoutStyle = 'modern' | 'classic' | 'minimalist' | 'creative' | 'executive' | 'technical';

/**
 * Generates HTML string for a given CV and layout template.
 * This is the single source of truth for both preview and PDF rendering.
 */
export function renderCVToHTML(cv: CV, layout: CVLayoutStyle): string {
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
      highlights: (exp.highlights || []).map(h => escape(h)),
      location: escape(exp.location),
    })),
    education: cv.education.map(edu => ({
      degree: escape([edu.studyType, edu.area].filter(Boolean).join(' in ')),
      institution: escape(edu.institution),
      period: escape([edu.startDate, edu.endDate].filter(Boolean).join(' - ')),
      description: edu.score ? escape(`GPA: ${edu.score}`) : escape(edu.description),
    })),
    skills: cv.skills.flatMap(s => s.keywords.length > 0 ? s.keywords.map(k => escape(k)) : [escape(s.name)]),
    skillGroups: cv.skills.map(s => ({
      name: escape(s.name),
      level: escape(s.level),
      keywords: s.keywords.map(k => escape(k)),
    })),
    projects: (cv.projects || []).map(p => ({
      title: escape(p.title),
      description: escape(p.description),
      startDate: escape(p.startDate),
      endDate: escape(p.endDate),
      technologies: (p.technologies || []).map(t => escape(t)),
      url: escape(p.url),
      highlights: (p.highlights || []).map(h => escape(h)),
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
    volunteer: (cv.volunteer || []).map(v => ({
      position: escape(v.position),
      organization: escape(v.organization),
      startDate: escape(v.startDate),
      endDate: escape(v.endDate),
      summary: escape(v.summary),
      highlights: (v.highlights || []).map(h => escape(h)),
    })),
    awards: (cv.awards || []).map(a => ({
      title: escape(a.title),
      awarder: escape(a.awarder),
      date: escape(a.date),
      summary: escape(a.summary),
    })),
    interests: (cv.interests || []).map(int => ({
      name: escape(int.name),
      keywords: int.keywords.map(k => escape(k)),
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
    case 'technical':
      return renderTechnical(pi, sectionsHTML);
    default:
      return renderModern(pi, sectionsHTML);
  }
}

type PI = { fullName: string; title: string; email: string; phone: string; location: string };
interface Sections {
  summary: string;
  experience: { position: string; company: string; startDate: string; endDate: string; description: string; highlights: string[]; location: string }[];
  education: { degree: string; institution: string; period: string; description: string }[];
  skills: string[];
  skillGroups: { name: string; level: string; keywords: string[] }[];
  projects: { title: string; description: string; startDate: string; endDate: string; technologies: string[]; url: string; highlights: string[] }[];
  certifications: { name: string; issuer: string; date: string; description: string }[];
  languages: { name: string; proficiency: string }[];
  references: { name: string; position: string; company: string; email: string; phone: string }[];
  publications: { title: string; publisher: string; date: string }[];
  volunteer: { position: string; organization: string; startDate: string; endDate: string; summary: string; highlights: string[] }[];
  awards: { title: string; awarder: string; date: string; summary: string }[];
  interests: { name: string; keywords: string[] }[];
  customSections: { title: string; items: { title: string; subtitle: string; date: string; description: string }[] }[];
}

/* ─── helpers ─── */
function sectionBlock(content: string): string {
  return `<div style="margin-bottom: 20px; break-inside: avoid;">${content}</div>`;
}

function modernHeading(title: string): string {
  return `<h2 style="font-size: 15px; font-weight: 600; color: #333; margin: 0 0 8px; display: flex; align-items: center;">
    <span style="display: inline-block; width: 24px; height: 2px; background: #DAA520; margin-right: 8px;"></span>${title}</h2>`;
}

function highlightsList(highlights: string[], fontSize = '12px', color = '#666'): string {
  if (highlights.length === 0) return '';
  return `<ul style="list-style: disc; padding-left: 16px; margin: 4px 0 0;">
    ${highlights.map(h => `<li style="font-size: ${fontSize}; color: ${color}; margin-bottom: 2px;">${h}</li>`).join('')}</ul>`;
}

/* ─── MODERN ─── */
function renderModern(pi: PI, s: Sections): string {
  return `
    <div style="padding: 40px; font-family: Inter, Helvetica, Arial, sans-serif; color: #000; max-width: 800px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="width: 96px; height: 2px; background: #DAA520; margin: 0 auto 12px;"></div>
        <h1 style="font-size: 24px; font-weight: bold; margin: 0 0 4px;">${pi.fullName}</h1>
        <p style="color: #666; margin: 0 0 8px;">${pi.title}</p>
        <div style="display: flex; justify-content: center; gap: 16px; font-size: 13px; color: #888;">
          <span>${pi.email}</span><span>${pi.phone}</span><span>${pi.location}</span>
        </div>
      </div>

      ${s.summary ? sectionBlock(`${modernHeading('Professional Summary')}<p style="font-size: 13px; color: #666; margin: 0; line-height: 1.6;">${s.summary}</p>`) : ''}

      ${s.experience.length > 0 ? `<div style="margin-bottom: 20px;">
        ${modernHeading('Experience')}
        ${s.experience.map(exp => `<div style="margin-bottom: 12px; font-size: 13px; break-inside: avoid;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span style="font-weight: 500;">${exp.position}</span>
            <span style="color: #888;">${exp.startDate} - ${exp.endDate}</span>
          </div>
          <p style="color: #666; margin: 0 0 4px;">${exp.company}${exp.location ? ` · ${exp.location}` : ''}</p>
          <p style="color: #666; font-size: 12px; margin: 0;">${exp.description}</p>
          ${highlightsList(exp.highlights)}
        </div>`).join('')}
      </div>` : ''}

      ${s.education.length > 0 ? `<div style="margin-bottom: 20px;">
        ${modernHeading('Education')}
        ${s.education.map(edu => `<div style="margin-bottom: 12px; font-size: 13px; break-inside: avoid;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span style="font-weight: 500;">${edu.degree}</span>
            <span style="color: #888;">${edu.period}</span>
          </div>
          <p style="color: #666; margin: 0;">${edu.institution}</p>
          ${edu.description ? `<p style="color: #888; font-size: 12px; margin: 2px 0 0;">${edu.description}</p>` : ''}
        </div>`).join('')}
      </div>` : ''}

      ${s.skills.length > 0 ? sectionBlock(`${modernHeading('Skills')}
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${s.skills.map(skill => `<span style="font-size: 12px; padding: 4px 8px; background: #f3f4f6; color: #555; border-radius: 4px;">${skill}</span>`).join('')}
        </div>`) : ''}

      ${s.projects.length > 0 ? `<div style="margin-bottom: 20px;">
        ${modernHeading('Projects')}
        ${s.projects.map(p => `<div style="margin-bottom: 12px; font-size: 13px; break-inside: avoid;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span style="font-weight: 500;">${p.title}</span>
            ${(p.startDate || p.endDate) ? `<span style="color: #888;">${p.startDate}${p.endDate ? ' - ' + p.endDate : ' - Present'}</span>` : ''}
          </div>
          <p style="color: #666; font-size: 12px; margin: 0 0 4px;">${p.description}</p>
          ${highlightsList(p.highlights)}
          ${p.technologies.length > 0 ? `<div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px;">${p.technologies.map(t => `<span style="font-size: 10px; padding: 2px 6px; background: #f3f4f6; color: #666; border-radius: 3px;">${t}</span>`).join('')}</div>` : ''}
        </div>`).join('')}
      </div>` : ''}

      ${s.certifications.length > 0 ? `<div style="margin-bottom: 20px;">
        ${modernHeading('Certifications')}
        ${s.certifications.map(c => `<div style="margin-bottom: 8px; font-size: 13px; break-inside: avoid;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
            <span style="font-weight: 500;">${c.name}</span><span style="color: #888;">${c.date}</span>
          </div>
          <p style="color: #666; margin: 0;">${c.issuer}</p>
          ${c.description ? `<p style="color: #666; font-size: 12px; margin: 2px 0 0;">${c.description}</p>` : ''}
        </div>`).join('')}
      </div>` : ''}

      ${s.volunteer.length > 0 ? `<div style="margin-bottom: 20px;">
        ${modernHeading('Volunteer Experience')}
        ${s.volunteer.map(v => `<div style="margin-bottom: 12px; font-size: 13px; break-inside: avoid;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span style="font-weight: 500;">${v.position}</span>
            <span style="color: #888;">${v.startDate} - ${v.endDate}</span>
          </div>
          <p style="color: #666; margin: 0 0 4px;">${v.organization}</p>
          <p style="color: #666; font-size: 12px; margin: 0;">${v.summary}</p>
          ${highlightsList(v.highlights)}
        </div>`).join('')}
      </div>` : ''}

      ${s.awards.length > 0 ? `<div style="margin-bottom: 20px;">
        ${modernHeading('Awards')}
        ${s.awards.map(a => `<div style="margin-bottom: 8px; font-size: 13px; break-inside: avoid;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
            <span style="font-weight: 500;">${a.title}</span><span style="color: #888;">${a.date}</span>
          </div>
          <p style="color: #666; margin: 0;">${a.awarder}</p>
          ${a.summary ? `<p style="color: #666; font-size: 12px; margin: 2px 0 0;">${a.summary}</p>` : ''}
        </div>`).join('')}
      </div>` : ''}

      ${s.languages.length > 0 ? sectionBlock(`${modernHeading('Languages')}
        <div style="display: flex; flex-wrap: wrap; gap: 16px;">
          ${s.languages.map(l => `<div style="font-size: 13px;"><span style="font-weight: 500;">${l.name}:</span> <span style="color: #666;">${l.proficiency}</span></div>`).join('')}
        </div>`) : ''}

      ${s.interests.length > 0 ? sectionBlock(`${modernHeading('Interests')}
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${s.interests.map(int => `<div style="font-size: 12px;"><span style="font-weight: 500;">${int.name}</span>${int.keywords.length > 0 ? `<span style="color: #888;"> · ${int.keywords.join(', ')}</span>` : ''}</div>`).join('')}
        </div>`) : ''}

      ${s.references.length > 0 ? `<div style="margin-bottom: 20px;">
        ${modernHeading('References')}
        ${s.references.map(r => `<div style="margin-bottom: 12px; font-size: 13px; break-inside: avoid;">
          <p style="font-weight: 500; margin: 0;">${r.name}</p>
          <p style="color: #666; margin: 0;">${r.position}${r.company ? ', ' + r.company : ''}</p>
          <div style="display: flex; gap: 16px; color: #888; font-size: 12px; margin-top: 2px;">
            ${r.email ? `<span>${r.email}</span>` : ''}${r.phone ? `<span>${r.phone}</span>` : ''}
          </div>
        </div>`).join('')}
      </div>` : ''}

      ${s.publications.length > 0 ? `<div style="margin-bottom: 20px;">
        ${modernHeading('Publications')}
        ${s.publications.map(p => `<div style="margin-bottom: 8px; font-size: 13px; break-inside: avoid;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
            <span style="font-weight: 500; font-style: italic;">${p.title}</span><span style="color: #888;">${p.date}</span>
          </div>
          <p style="color: #666; margin: 0;">${p.publisher}</p>
        </div>`).join('')}
      </div>` : ''}

      ${s.customSections.map(sec => `<div style="margin-bottom: 20px;">
        ${modernHeading(sec.title)}
        ${sec.items.map(item => `<div style="margin-bottom: 8px; font-size: 13px; break-inside: avoid;">
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

/* ─── CLASSIC ─── */
function renderClassic(pi: PI, s: Sections): string {
  const heading = (t: string) => `<h2 style="font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">${t}</h2>`;
  return `
    <div style="padding: 40px; font-family: Georgia, 'Times New Roman', serif; color: #000; max-width: 800px; margin: 0 auto;">
      <div style="margin-bottom: 16px;">
        <h1 style="font-size: 28px; font-weight: bold; margin: 0;">${pi.fullName}</h1>
        <p style="color: #555; font-weight: 600; font-style: italic; margin: 0 0 8px;">${pi.title}</p>
        <div style="font-size: 13px; color: #666;">
          <div>${pi.email} &bull; ${pi.phone}</div><div>${pi.location}</div>
        </div>
      </div>
      <div style="width: 100%; height: 1px; background: #ccc; margin: 16px 0;"></div>

      ${s.summary ? `<div style="margin-bottom: 24px; break-inside: avoid;">${heading('Summary')}<p style="font-size: 13px; color: #555; line-height: 1.6; margin: 0;">${s.summary}</p></div>` : ''}

      ${s.experience.length > 0 ? `<div style="margin-bottom: 24px;">
        ${heading('Experience')}
        ${s.experience.map(exp => `<div style="margin-bottom: 16px; font-size: 13px; break-inside: avoid;">
          <p style="font-weight: bold; margin: 0;">${exp.position}</p>
          <div style="display: flex; justify-content: space-between; color: #555; font-style: italic; margin: 0 0 4px;">
            <span>${exp.company}</span><span>${exp.startDate} - ${exp.endDate}</span>
          </div>
          <p style="color: #555; margin: 0;">${exp.description}</p>
          ${highlightsList(exp.highlights, '12px', '#555')}
        </div>`).join('')}
      </div>` : ''}

      ${s.education.length > 0 ? `<div style="margin-bottom: 24px;">
        ${heading('Education')}
        ${s.education.map(edu => `<div style="margin-bottom: 12px; font-size: 13px; break-inside: avoid;">
          <p style="font-weight: bold; margin: 0;">${edu.degree}</p>
          <div style="display: flex; justify-content: space-between; color: #555; font-style: italic;">
            <span>${edu.institution}</span><span>${edu.period}</span>
          </div>
          ${edu.description ? `<p style="font-size: 12px; color: #666; margin: 2px 0 0;">${edu.description}</p>` : ''}
        </div>`).join('')}
      </div>` : ''}

      ${s.skills.length > 0 ? `<div style="margin-bottom: 24px; break-inside: avoid;">${heading('Skills')}<p style="font-size: 13px; color: #555; margin: 0;">${s.skills.join(', ')}</p></div>` : ''}

      ${s.projects.length > 0 ? `<div style="margin-bottom: 24px;">
        ${heading('Projects')}
        ${s.projects.map(p => `<div style="margin-bottom: 12px; font-size: 13px; break-inside: avoid;">
          <div style="display: flex; justify-content: space-between;">
            <span style="font-weight: bold;">${p.title}</span>
            ${(p.startDate || p.endDate) ? `<span style="color: #555; font-style: italic;">${p.startDate}${p.endDate ? ' - ' + p.endDate : ''}</span>` : ''}
          </div>
          <p style="color: #555; margin: 0;">${p.description}</p>
          ${highlightsList(p.highlights, '12px', '#555')}
          ${p.technologies.length > 0 ? `<p style="font-size: 12px; color: #666; margin: 4px 0 0;"><b>Technologies:</b> ${p.technologies.join(', ')}</p>` : ''}
        </div>`).join('')}
      </div>` : ''}

      ${s.certifications.length > 0 ? `<div style="margin-bottom: 24px;">
        ${heading('Certifications')}
        ${s.certifications.map(c => `<div style="margin-bottom: 12px; font-size: 13px; break-inside: avoid;">
          <div style="display: flex; justify-content: space-between;">
            <span style="font-weight: bold;">${c.name}</span><span style="color: #555; font-style: italic;">${c.date}</span>
          </div>
          <p style="color: #555; margin: 0;">${c.issuer}</p>
          ${c.description ? `<p style="font-size: 12px; color: #666; margin: 4px 0 0;">${c.description}</p>` : ''}
        </div>`).join('')}
      </div>` : ''}

      ${s.volunteer.length > 0 ? `<div style="margin-bottom: 24px;">
        ${heading('Volunteer Experience')}
        ${s.volunteer.map(v => `<div style="margin-bottom: 16px; font-size: 13px; break-inside: avoid;">
          <p style="font-weight: bold; margin: 0;">${v.position}</p>
          <div style="display: flex; justify-content: space-between; color: #555; font-style: italic; margin: 0 0 4px;">
            <span>${v.organization}</span><span>${v.startDate} - ${v.endDate}</span>
          </div>
          <p style="color: #555; margin: 0;">${v.summary}</p>
          ${highlightsList(v.highlights, '12px', '#555')}
        </div>`).join('')}
      </div>` : ''}

      ${s.awards.length > 0 ? `<div style="margin-bottom: 24px;">
        ${heading('Awards')}
        ${s.awards.map(a => `<div style="margin-bottom: 12px; font-size: 13px; break-inside: avoid;">
          <div style="display: flex; justify-content: space-between;">
            <span style="font-weight: bold;">${a.title}</span><span style="color: #555; font-style: italic;">${a.date}</span>
          </div>
          <p style="color: #555; margin: 0;">${a.awarder}</p>
          ${a.summary ? `<p style="font-size: 12px; color: #666; margin: 4px 0 0;">${a.summary}</p>` : ''}
        </div>`).join('')}
      </div>` : ''}

      ${s.languages.length > 0 ? `<div style="margin-bottom: 24px; break-inside: avoid;">${heading('Languages')}
        <div style="display: flex; flex-wrap: wrap; gap: 16px;">
          ${s.languages.map(l => `<div style="font-size: 13px;"><span style="font-weight: 500;">${l.name}:</span> ${l.proficiency}</div>`).join('')}
        </div></div>` : ''}

      ${s.interests.length > 0 ? `<div style="margin-bottom: 24px; break-inside: avoid;">${heading('Interests')}
        <div style="display: flex; flex-wrap: wrap; gap: 12px;">
          ${s.interests.map(int => `<div style="font-size: 13px;"><span style="font-weight: 500;">${int.name}</span>${int.keywords.length > 0 ? `: ${int.keywords.join(', ')}` : ''}</div>`).join('')}
        </div></div>` : ''}

      ${s.references.length > 0 ? `<div style="margin-bottom: 24px;">
        ${heading('References')}
        ${s.references.map(r => `<div style="margin-bottom: 12px; font-size: 13px; break-inside: avoid;">
          <p style="font-weight: bold; margin: 0;">${r.name}</p>
          <p style="color: #555; margin: 0;">${r.position}${r.company ? ', ' + r.company : ''}</p>
          <div style="display: flex; gap: 16px; color: #666; font-size: 12px; margin-top: 2px;">
            ${r.email ? `<span>${r.email}</span>` : ''}${r.phone ? `<span>${r.phone}</span>` : ''}
          </div>
        </div>`).join('')}
      </div>` : ''}

      ${s.publications.length > 0 ? `<div style="margin-bottom: 24px;">
        ${heading('Publications')}
        ${s.publications.map(p => `<div style="margin-bottom: 8px; font-size: 13px; break-inside: avoid;">
          <div style="display: flex; justify-content: space-between;">
            <span style="font-weight: bold; font-style: italic;">${p.title}</span><span style="color: #555;">${p.date}</span>
          </div>
          <p style="color: #555; margin: 0;">${p.publisher}</p>
        </div>`).join('')}
      </div>` : ''}

      ${s.customSections.map(sec => `<div style="margin-bottom: 24px;">
        ${heading(sec.title)}
        ${sec.items.map(item => `<div style="margin-bottom: 8px; font-size: 13px; break-inside: avoid;">
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

/* ─── MINIMALIST ─── */
function renderMinimalist(pi: PI, s: Sections): string {
  const heading = (t: string) => `<h3 style="font-size: 14px; font-weight: 500; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; margin: 0 0 12px;">${t}</h3>`;
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

        ${s.skillGroups.length > 0 ? `<div style="margin-bottom: 24px;">
          <h3 style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 500; margin: 0 0 8px;">Skills</h3>
          ${s.skillGroups.map(g => `<div style="margin-bottom: 8px;">
            <div style="font-size: 11px; font-weight: 500; margin-bottom: 2px;">${g.name}${g.level ? ` · ${g.level}` : ''}</div>
            ${g.keywords.map(k => `<div style="font-size: 12px; color: #666; margin-bottom: 2px;">${k}</div>`).join('')}
          </div>`).join('')}
        </div>` : ''}

        ${s.languages.length > 0 ? `<div style="margin-bottom: 24px;">
          <h3 style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 500; margin: 0 0 8px;">Languages</h3>
          ${s.languages.map(l => `<div style="font-size: 12px; margin-bottom: 6px;"><span>${l.name}:</span> <span style="color: #888;">${l.proficiency}</span></div>`).join('')}
        </div>` : ''}

        ${s.interests.length > 0 ? `<div style="margin-bottom: 24px;">
          <h3 style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 500; margin: 0 0 8px;">Interests</h3>
          ${s.interests.map(int => `<div style="font-size: 12px; margin-bottom: 4px;">${int.name}${int.keywords.length > 0 ? `<div style="font-size: 11px; color: #888;">${int.keywords.join(', ')}</div>` : ''}</div>`).join('')}
        </div>` : ''}
      </div>

      <!-- Main content -->
      <div style="width: 67%; padding: 24px; display: flex; flex-direction: column;">
        ${s.summary ? `<p style="font-size: 13px; color: #555; margin: 0 0 24px; line-height: 1.5;">${s.summary}</p>` : ''}

        ${s.experience.length > 0 ? `<div style="margin-bottom: 24px;">
          ${heading('Experience')}
          ${s.experience.map(exp => `<div style="margin-bottom: 16px; font-size: 12px; break-inside: avoid;">
            <p style="font-weight: 500; margin: 0;">${exp.position}</p>
            <div style="display: flex; justify-content: space-between; color: #888; margin-bottom: 4px;">
              <span>${exp.company}</span><span>${exp.startDate} - ${exp.endDate}</span>
            </div>
            <p style="color: #666; margin: 0;">${exp.description}</p>
            ${highlightsList(exp.highlights, '11px', '#666')}
          </div>`).join('')}
        </div>` : ''}

        ${s.education.length > 0 ? `<div style="margin-bottom: 24px;">
          ${heading('Education')}
          ${s.education.map(edu => `<div style="margin-bottom: 12px; font-size: 12px; break-inside: avoid;">
            <p style="font-weight: 500; margin: 0;">${edu.degree}</p>
            <div style="display: flex; justify-content: space-between; color: #888;">
              <span>${edu.institution}</span><span>${edu.period}</span>
            </div>
            ${edu.description ? `<p style="font-size: 11px; color: #888; margin: 2px 0 0;">${edu.description}</p>` : ''}
          </div>`).join('')}
        </div>` : ''}

        ${s.projects.length > 0 ? `<div style="margin-bottom: 24px;">
          ${heading('Projects')}
          ${s.projects.map(p => `<div style="margin-bottom: 12px; font-size: 12px; break-inside: avoid;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
              <span style="font-weight: 500;">${p.title}</span>
              ${(p.startDate || p.endDate) ? `<span style="color: #888;">${p.startDate}${p.endDate ? ' - ' + p.endDate : ''}</span>` : ''}
            </div>
            <p style="color: #666; margin: 0;">${p.description}</p>
            ${highlightsList(p.highlights, '11px', '#666')}
            ${p.technologies.length > 0 ? `<p style="font-size: 11px; color: #888; margin: 4px 0 0;"><b>Tech:</b> ${p.technologies.join(', ')}</p>` : ''}
          </div>`).join('')}
        </div>` : ''}

        ${s.certifications.length > 0 ? `<div style="margin-bottom: 24px;">
          ${heading('Certifications')}
          ${s.certifications.map(c => `<div style="margin-bottom: 8px; font-size: 12px; break-inside: avoid;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
              <span style="font-weight: 500;">${c.name}</span><span style="color: #888;">${c.date}</span>
            </div>
            <p style="color: #666; margin: 0;">${c.issuer}</p>
          </div>`).join('')}
        </div>` : ''}

        ${s.volunteer.length > 0 ? `<div style="margin-bottom: 24px;">
          ${heading('Volunteer Experience')}
          ${s.volunteer.map(v => `<div style="margin-bottom: 12px; font-size: 12px; break-inside: avoid;">
            <p style="font-weight: 500; margin: 0;">${v.position}</p>
            <div style="display: flex; justify-content: space-between; color: #888; margin-bottom: 4px;">
              <span>${v.organization}</span><span>${v.startDate} - ${v.endDate}</span>
            </div>
            <p style="color: #666; margin: 0;">${v.summary}</p>
            ${highlightsList(v.highlights, '11px', '#666')}
          </div>`).join('')}
        </div>` : ''}

        ${s.awards.length > 0 ? `<div style="margin-bottom: 24px;">
          ${heading('Awards')}
          ${s.awards.map(a => `<div style="margin-bottom: 8px; font-size: 12px; break-inside: avoid;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
              <span style="font-weight: 500;">${a.title}</span><span style="color: #888;">${a.date}</span>
            </div>
            <p style="color: #666; margin: 0;">${a.awarder}</p>
            ${a.summary ? `<p style="font-size: 11px; color: #888; margin: 2px 0 0;">${a.summary}</p>` : ''}
          </div>`).join('')}
        </div>` : ''}

        ${s.references.length > 0 ? `<div style="margin-bottom: 24px;">
          ${heading('References')}
          ${s.references.map(r => `<div style="margin-bottom: 12px; font-size: 12px; break-inside: avoid;">
            <p style="font-weight: 500; margin: 0;">${r.name}</p>
            <p style="color: #666; margin: 0;">${r.position}${r.company ? ', ' + r.company : ''}</p>
            <div style="display: flex; gap: 12px; color: #888; font-size: 11px; margin-top: 2px;">
              ${r.email ? `<span>${r.email}</span>` : ''}${r.phone ? `<span>${r.phone}</span>` : ''}
            </div>
          </div>`).join('')}
        </div>` : ''}

        ${s.publications.length > 0 ? `<div style="margin-bottom: 24px;">
          ${heading('Publications')}
          ${s.publications.map(p => `<div style="margin-bottom: 8px; font-size: 12px; break-inside: avoid;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
              <span style="font-weight: 500; font-style: italic;">${p.title}</span><span style="color: #888;">${p.date}</span>
            </div>
            <p style="color: #666; margin: 0;">${p.publisher}</p>
          </div>`).join('')}
        </div>` : ''}

        ${s.customSections.map(sec => `<div style="margin-bottom: 24px;">
          ${heading(sec.title)}
          ${sec.items.map(item => `<div style="margin-bottom: 8px; font-size: 12px; break-inside: avoid;">
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

/* ─── CREATIVE ─── */
function renderCreative(pi: PI, s: Sections): string {
  const heading = (t: string) => `<h2 style="font-size: 18px; font-weight: 600; margin: 0 0 12px;">${t}</h2>`;
  const timelineItem = (content: string) => `<div style="padding-left: 16px; border-left: 2px solid rgba(218,165,32,0.3); margin-bottom: 16px; position: relative; break-inside: avoid;">
    <div style="position: absolute; left: -5px; top: 0; width: 8px; height: 8px; border-radius: 50%; background: #DAA520;"></div>${content}</div>`;

  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #000; max-width: 800px; margin: 0 auto;">
      <div style="background: rgba(218,165,32,0.15); padding: 24px 40px; display: flex; align-items: center;">
        <div>
          <h1 style="font-size: 24px; font-weight: bold; margin: 0;">${pi.fullName}</h1>
          <p style="color: #666; margin: 0;">${pi.title}</p>
        </div>
      </div>

      <div style="padding: 32px 40px;">
        <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 24px; font-size: 13px;">
          ${[pi.email, pi.phone, pi.location].map(v => `<div style="display: flex; align-items: center; gap: 4px;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #DAA520; display: inline-block;"></span><span>${v}</span>
          </div>`).join('')}
        </div>

        ${s.summary ? `<p style="font-size: 13px; margin: 0 0 24px; line-height: 1.5;">${s.summary}</p>` : ''}

        ${s.experience.length > 0 ? `<div style="margin-bottom: 24px;">
          ${heading('Experience')}
          ${s.experience.map(exp => timelineItem(`
            <p style="font-weight: 600; margin: 0;">${exp.position}</p>
            <div style="display: flex; justify-content: space-between; font-size: 13px; color: #666; margin-bottom: 4px;">
              <span>${exp.company}</span><span>${exp.startDate} - ${exp.endDate}</span>
            </div>
            <p style="font-size: 13px; color: #666; margin: 0;">${exp.description}</p>
            ${highlightsList(exp.highlights, '12px', '#666')}
          `)).join('')}
        </div>` : ''}

        ${s.education.length > 0 ? `<div style="margin-bottom: 24px;">
          ${heading('Education')}
          ${s.education.map(edu => timelineItem(`
            <p style="font-weight: 600; margin: 0;">${edu.degree}</p>
            <div style="display: flex; justify-content: space-between; font-size: 13px; color: #666; margin-bottom: 4px;">
              <span>${edu.institution}</span><span>${edu.period}</span>
            </div>
            ${edu.description ? `<p style="font-size: 12px; color: #888; margin: 0;">${edu.description}</p>` : ''}
          `)).join('')}
        </div>` : ''}

        ${s.skills.length > 0 ? `<div style="margin-bottom: 24px; break-inside: avoid;">
          ${heading('Skills')}
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${s.skills.map(skill => `<span style="padding: 4px 12px; background: rgba(218,165,32,0.1); border-radius: 20px; font-size: 12px;">${skill}</span>`).join('')}
          </div>
        </div>` : ''}

        ${s.projects.length > 0 ? `<div style="margin-bottom: 24px;">
          ${heading('Projects')}
          ${s.projects.map(p => `<div style="padding: 12px; border-radius: 6px; background: #f9fafb; margin-bottom: 12px; font-size: 13px; break-inside: avoid;">
            <p style="font-weight: 600; margin: 0 0 4px;">${p.title}</p>
            ${(p.startDate || p.endDate) ? `<p style="font-size: 12px; color: #DAA520; margin: 0 0 4px;">${p.startDate}${p.endDate ? ' - ' + p.endDate : ''}</p>` : ''}
            <p style="color: #666; margin: 0 0 8px;">${p.description}</p>
            ${highlightsList(p.highlights, '12px', '#666')}
            ${p.technologies.length > 0 ? `<div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px;">${p.technologies.map(t => `<span style="font-size: 11px; padding: 2px 8px; background: rgba(218,165,32,0.1); border-radius: 3px;">${t}</span>`).join('')}</div>` : ''}
          </div>`).join('')}
        </div>` : ''}

        ${s.certifications.length > 0 ? `<div style="margin-bottom: 24px;">
          ${heading('Certifications')}
          ${s.certifications.map(c => timelineItem(`
            <p style="font-weight: 600; margin: 0;">${c.name}</p>
            <div style="display: flex; justify-content: space-between; font-size: 13px;">
              <span style="color: #666;">${c.issuer}</span><span style="color: #DAA520;">${c.date}</span>
            </div>
            ${c.description ? `<p style="font-size: 12px; color: #666; margin: 4px 0 0;">${c.description}</p>` : ''}
          `)).join('')}
        </div>` : ''}

        ${s.volunteer.length > 0 ? `<div style="margin-bottom: 24px;">
          ${heading('Volunteer Experience')}
          ${s.volunteer.map(v => timelineItem(`
            <p style="font-weight: 600; margin: 0;">${v.position}</p>
            <div style="display: flex; justify-content: space-between; font-size: 13px; color: #666; margin-bottom: 4px;">
              <span>${v.organization}</span><span>${v.startDate} - ${v.endDate}</span>
            </div>
            <p style="font-size: 13px; color: #666; margin: 0;">${v.summary}</p>
            ${highlightsList(v.highlights, '12px', '#666')}
          `)).join('')}
        </div>` : ''}

        ${s.awards.length > 0 ? `<div style="margin-bottom: 24px;">
          ${heading('Awards')}
          ${s.awards.map(a => timelineItem(`
            <p style="font-weight: 600; margin: 0;">${a.title}</p>
            <div style="display: flex; justify-content: space-between; font-size: 13px;">
              <span style="color: #666;">${a.awarder}</span><span style="color: #DAA520;">${a.date}</span>
            </div>
            ${a.summary ? `<p style="font-size: 12px; color: #666; margin: 4px 0 0;">${a.summary}</p>` : ''}
          `)).join('')}
        </div>` : ''}

        ${s.languages.length > 0 ? `<div style="margin-bottom: 24px; break-inside: avoid;">
          ${heading('Languages')}
          <div style="display: flex; flex-wrap: wrap; gap: 12px;">
            ${s.languages.map(l => `<div style="display: flex; align-items: center; justify-content: space-between; min-width: 150px;">
              <span style="font-weight: 500;">${l.name}</span>
              <span style="font-size: 12px; padding: 2px 8px; background: rgba(218,165,32,0.1); border-radius: 3px;">${l.proficiency}</span>
            </div>`).join('')}
          </div>
        </div>` : ''}

        ${s.interests.length > 0 ? `<div style="margin-bottom: 24px; break-inside: avoid;">
          ${heading('Interests')}
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${s.interests.map(int => `<span style="padding: 4px 12px; background: rgba(218,165,32,0.1); border-radius: 20px; font-size: 12px;">${int.name}${int.keywords.length > 0 ? ': ' + int.keywords.join(', ') : ''}</span>`).join('')}
          </div>
        </div>` : ''}

        ${s.references.length > 0 ? `<div style="margin-bottom: 24px;">
          ${heading('References')}
          ${s.references.map(r => `<div style="padding: 12px; border-radius: 6px; background: #f9fafb; margin-bottom: 12px; break-inside: avoid;">
            <p style="font-weight: 600; margin: 0;">${r.name}</p>
            <p style="font-size: 13px; color: #666; margin: 0;">${r.position}${r.company ? ', ' + r.company : ''}</p>
            <div style="display: flex; gap: 12px; font-size: 12px; color: #888; margin-top: 4px;">
              ${r.email ? `<span>${r.email}</span>` : ''}${r.phone ? `<span>${r.phone}</span>` : ''}
            </div>
          </div>`).join('')}
        </div>` : ''}

        ${s.publications.length > 0 ? `<div style="margin-bottom: 24px;">
          ${heading('Publications')}
          ${s.publications.map(p => timelineItem(`
            <p style="font-weight: 600; font-style: italic; margin: 0;">${p.title}</p>
            <div style="display: flex; justify-content: space-between; font-size: 13px;">
              <span style="color: #666;">${p.publisher}</span><span style="color: #DAA520;">${p.date}</span>
            </div>
          `)).join('')}
        </div>` : ''}

        ${s.customSections.map(sec => `<div style="margin-bottom: 24px;">
          ${heading(sec.title)}
          ${sec.items.map(item => timelineItem(`
            <p style="font-weight: 600; margin: 0;">${item.title}</p>
            ${item.subtitle ? `<p style="font-size: 13px; color: #666; margin: 0;">${item.subtitle}</p>` : ''}
            ${item.date ? `<p style="font-size: 12px; color: #DAA520; margin: 0;">${item.date}</p>` : ''}
            ${item.description ? `<p style="font-size: 13px; color: #666; margin: 4px 0 0;">${item.description}</p>` : ''}
          `)).join('')}
        </div>`).join('')}
      </div>
    </div>`;
}

/* ─── EXECUTIVE ─── */
function renderExecutive(pi: PI, s: Sections): string {
  const heading = (t: string) => `<h2 style="font-size: 16px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid rgba(218,165,32,0.3); padding-bottom: 4px; margin: 0 0 12px;">${t}</h2>`;
  return `
    <div style="font-family: Georgia, 'Times New Roman', serif; color: #000; max-width: 800px; margin: 0 auto;">
      <div style="padding: 32px 40px; border-bottom: 4px solid #DAA520; margin-bottom: 24px;">
        <h1 style="font-size: 28px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 4px;">${pi.fullName}</h1>
        <p style="font-size: 18px; color: #555; letter-spacing: 1px; margin: 0 0 12px;">${pi.title}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 16px; font-size: 13px;">
          ${[{icon:'@',val:pi.email},{icon:'T',val:pi.phone},{icon:'L',val:pi.location}].map(c => `<div style="display: flex; align-items: center;">
            <span style="width: 16px; height: 16px; border-radius: 50%; background: #DAA520; display: inline-flex; align-items: center; justify-content: center; margin-right: 8px; color: white; font-size: 8px;">${c.icon}</span><span>${c.val}</span>
          </div>`).join('')}
        </div>
      </div>

      <div style="padding: 0 40px;">
        ${s.summary ? `<div style="margin-bottom: 24px; break-inside: avoid;">${heading('Executive Summary')}<p style="font-size: 13px; line-height: 1.6; margin: 0;">${s.summary}</p></div>` : ''}

        ${s.experience.length > 0 ? `<div style="margin-bottom: 24px;">
          ${heading('Professional Experience')}
          ${s.experience.map(exp => `<div style="margin-bottom: 16px; break-inside: avoid;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-weight: bold;">${exp.position}</span>
              <span style="font-weight: 600; color: #DAA520;">${exp.startDate} - ${exp.endDate}</span>
            </div>
            <p style="font-size: 13px; font-weight: 600; margin: 0 0 4px;">${exp.company}</p>
            <p style="font-size: 13px; color: #555; margin: 0;">${exp.description}</p>
            ${highlightsList(exp.highlights, '12px', '#555')}
          </div>`).join('')}
        </div>` : ''}

        ${s.education.length > 0 ? `<div style="margin-bottom: 24px;">
          ${heading('Education')}
          ${s.education.map(edu => `<div style="margin-bottom: 12px; break-inside: avoid;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-weight: bold;">${edu.degree}</span>
              <span style="font-weight: 600; color: #DAA520;">${edu.period}</span>
            </div>
            <p style="font-size: 13px; margin: 0;">${edu.institution}</p>
            ${edu.description ? `<p style="font-size: 13px; color: #555; margin: 4px 0 0;">${edu.description}</p>` : ''}
          </div>`).join('')}
        </div>` : ''}

        ${s.skills.length > 0 ? `<div style="margin-bottom: 24px; break-inside: avoid;">
          ${heading('Core Competencies')}
          <div style="display: flex; flex-wrap: wrap; gap: 8px 16px;">
            ${s.skills.map(skill => `<div style="display: flex; align-items: center; font-size: 13px;">
              <span style="width: 6px; height: 6px; border-radius: 50%; background: #DAA520; margin-right: 8px; display: inline-block;"></span><span>${skill}</span>
            </div>`).join('')}
          </div>
        </div>` : ''}

        ${s.projects.length > 0 ? `<div style="margin-bottom: 24px;">
          ${heading('Key Projects')}
          ${s.projects.map(p => `<div style="margin-bottom: 16px; break-inside: avoid;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-weight: bold;">${p.title}</span>
              ${(p.startDate || p.endDate) ? `<span style="font-weight: 600; color: #DAA520;">${p.startDate}${p.endDate ? ' - ' + p.endDate : ''}</span>` : ''}
            </div>
            <p style="font-size: 13px; color: #555; margin: 0 0 4px;">${p.description}</p>
            ${highlightsList(p.highlights, '12px', '#555')}
            ${p.technologies.length > 0 ? `<p style="font-size: 12px; margin: 4px 0 0;"><b>Technologies:</b> ${p.technologies.join(', ')}</p>` : ''}
          </div>`).join('')}
        </div>` : ''}

        ${s.certifications.length > 0 ? `<div style="margin-bottom: 24px;">
          ${heading('Certifications')}
          ${s.certifications.map(c => `<div style="margin-bottom: 12px; break-inside: avoid;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-weight: bold;">${c.name}</span>
              <span style="font-weight: 600; color: #DAA520;">${c.date}</span>
            </div>
            <p style="font-size: 13px; margin: 0;">${c.issuer}</p>
            ${c.description ? `<p style="font-size: 13px; color: #555; margin: 4px 0 0;">${c.description}</p>` : ''}
          </div>`).join('')}
        </div>` : ''}

        ${s.volunteer.length > 0 ? `<div style="margin-bottom: 24px;">
          ${heading('Community Involvement')}
          ${s.volunteer.map(v => `<div style="margin-bottom: 16px; break-inside: avoid;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-weight: bold;">${v.position}</span>
              <span style="font-weight: 600; color: #DAA520;">${v.startDate} - ${v.endDate}</span>
            </div>
            <p style="font-size: 13px; font-weight: 600; margin: 0 0 4px;">${v.organization}</p>
            <p style="font-size: 13px; color: #555; margin: 0;">${v.summary}</p>
            ${highlightsList(v.highlights, '12px', '#555')}
          </div>`).join('')}
        </div>` : ''}

        ${s.awards.length > 0 ? `<div style="margin-bottom: 24px;">
          ${heading('Honors & Awards')}
          ${s.awards.map(a => `<div style="margin-bottom: 12px; break-inside: avoid;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-weight: bold;">${a.title}</span>
              <span style="font-weight: 600; color: #DAA520;">${a.date}</span>
            </div>
            <p style="font-size: 13px; margin: 0;">${a.awarder}</p>
            ${a.summary ? `<p style="font-size: 13px; color: #555; margin: 4px 0 0;">${a.summary}</p>` : ''}
          </div>`).join('')}
        </div>` : ''}

        ${s.languages.length > 0 ? `<div style="margin-bottom: 24px; break-inside: avoid;">${heading('Languages')}
          <div style="display: flex; flex-wrap: wrap; gap: 24px;">
            ${s.languages.map(l => `<div style="font-size: 13px;"><span style="font-weight: 600;">${l.name}:</span> ${l.proficiency}</div>`).join('')}
          </div>
        </div>` : ''}

        ${s.interests.length > 0 ? `<div style="margin-bottom: 24px; break-inside: avoid;">${heading('Interests')}
          <div style="display: flex; flex-wrap: wrap; gap: 8px 16px;">
            ${s.interests.map(int => `<div style="display: flex; align-items: center; font-size: 13px;">
              <span style="width: 6px; height: 6px; border-radius: 50%; background: #DAA520; margin-right: 8px; display: inline-block;"></span>
              <span>${int.name}${int.keywords.length > 0 ? ': ' + int.keywords.join(', ') : ''}</span>
            </div>`).join('')}
          </div>
        </div>` : ''}

        ${s.references.length > 0 ? `<div style="margin-bottom: 24px;">
          ${heading('Professional References')}
          ${s.references.map(r => `<div style="margin-bottom: 16px; break-inside: avoid;">
            <p style="font-weight: bold; margin: 0;">${r.name}</p>
            <p style="font-size: 13px; margin: 0;">${r.position}${r.company ? ', ' + r.company : ''}</p>
            <div style="display: flex; gap: 16px; font-size: 13px; color: #555; margin-top: 4px;">
              ${r.email ? `<span>${r.email}</span>` : ''}${r.phone ? `<span>${r.phone}</span>` : ''}
            </div>
          </div>`).join('')}
        </div>` : ''}

        ${s.publications.length > 0 ? `<div style="margin-bottom: 24px;">
          ${heading('Publications')}
          ${s.publications.map(p => `<div style="margin-bottom: 12px; break-inside: avoid;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-weight: bold; font-style: italic;">${p.title}</span>
              <span style="font-weight: 600; color: #DAA520;">${p.date}</span>
            </div>
            <p style="font-size: 13px; margin: 0;">${p.publisher}</p>
          </div>`).join('')}
        </div>` : ''}

        ${s.customSections.map(sec => `<div style="margin-bottom: 24px;">
          ${heading(sec.title)}
          ${sec.items.map(item => `<div style="margin-bottom: 12px; break-inside: avoid;">
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

/* ─── TECHNICAL ─── */
function renderTechnical(pi: PI, s: Sections): string {
  const heading = (t: string) => `<h2 style="font-family: 'Fira Code', 'Courier New', monospace; font-size: 14px; font-weight: 600; color: #333; margin: 0 0 10px; padding: 6px 10px; background: #f3f4f6; border-left: 3px solid #DAA520;">${t}</h2>`;
  return `
    <div style="font-family: Inter, Helvetica, Arial, sans-serif; color: #000; max-width: 800px; margin: 0 auto; padding: 36px 40px;">
      <div style="margin-bottom: 20px; border-bottom: 2px solid #DAA520; padding-bottom: 16px;">
        <h1 style="font-size: 22px; font-weight: bold; margin: 0 0 4px; font-family: 'Fira Code', 'Courier New', monospace;">${pi.fullName}</h1>
        <p style="font-size: 14px; color: #555; margin: 0 0 8px;">${pi.title}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 12px; font-size: 12px; color: #666; font-family: 'Fira Code', 'Courier New', monospace;">
          <span>${pi.email}</span><span>|</span><span>${pi.phone}</span><span>|</span><span>${pi.location}</span>
        </div>
      </div>

      ${s.summary ? `<div style="margin-bottom: 20px; break-inside: avoid;">${heading('// Summary')}<p style="font-size: 13px; color: #555; margin: 0; line-height: 1.6;">${s.summary}</p></div>` : ''}

      ${s.skillGroups.length > 0 ? `<div style="margin-bottom: 20px; break-inside: avoid;">
        ${heading('// Technical Skills')}
        ${s.skillGroups.map(g => `<div style="margin-bottom: 8px;">
          <span style="font-size: 12px; font-weight: 600; font-family: 'Fira Code', 'Courier New', monospace; color: #DAA520;">${g.name}${g.level ? ' (' + g.level + ')' : ''}:</span>
          <span style="font-size: 12px; color: #555;"> ${g.keywords.join(' · ')}</span>
        </div>`).join('')}
      </div>` : ''}

      ${s.experience.length > 0 ? `<div style="margin-bottom: 20px;">
        ${heading('// Experience')}
        ${s.experience.map(exp => `<div style="margin-bottom: 14px; font-size: 13px; break-inside: avoid; padding-left: 12px; border-left: 2px solid #e5e7eb;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span style="font-weight: 600;">${exp.position}</span>
            <span style="color: #888; font-family: 'Fira Code', 'Courier New', monospace; font-size: 11px;">${exp.startDate} → ${exp.endDate}</span>
          </div>
          <p style="color: #555; margin: 0 0 4px; font-weight: 500;">${exp.company}${exp.location ? ' · ' + exp.location : ''}</p>
          <p style="color: #666; font-size: 12px; margin: 0;">${exp.description}</p>
          ${highlightsList(exp.highlights, '12px', '#666')}
        </div>`).join('')}
      </div>` : ''}

      ${s.projects.length > 0 ? `<div style="margin-bottom: 20px;">
        ${heading('// Projects')}
        ${s.projects.map(p => `<div style="margin-bottom: 14px; font-size: 13px; break-inside: avoid; padding: 10px; background: #fafafa; border-radius: 4px; border: 1px solid #e5e7eb;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span style="font-weight: 600;">${p.title}</span>
            ${(p.startDate || p.endDate) ? `<span style="color: #888; font-family: 'Fira Code', 'Courier New', monospace; font-size: 11px;">${p.startDate}${p.endDate ? ' → ' + p.endDate : ''}</span>` : ''}
          </div>
          <p style="color: #666; font-size: 12px; margin: 0 0 6px;">${p.description}</p>
          ${highlightsList(p.highlights, '12px', '#666')}
          ${p.technologies.length > 0 ? `<div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px;">${p.technologies.map(t => `<span style="font-size: 10px; padding: 2px 8px; background: #DAA520; color: white; border-radius: 3px; font-family: 'Fira Code', 'Courier New', monospace;">${t}</span>`).join('')}</div>` : ''}
        </div>`).join('')}
      </div>` : ''}

      ${s.education.length > 0 ? `<div style="margin-bottom: 20px;">
        ${heading('// Education')}
        ${s.education.map(edu => `<div style="margin-bottom: 10px; font-size: 13px; break-inside: avoid; padding-left: 12px; border-left: 2px solid #e5e7eb;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span style="font-weight: 600;">${edu.degree}</span>
            <span style="color: #888; font-family: 'Fira Code', 'Courier New', monospace; font-size: 11px;">${edu.period}</span>
          </div>
          <p style="color: #555; margin: 0;">${edu.institution}</p>
          ${edu.description ? `<p style="font-size: 12px; color: #888; margin: 2px 0 0;">${edu.description}</p>` : ''}
        </div>`).join('')}
      </div>` : ''}

      ${s.certifications.length > 0 ? `<div style="margin-bottom: 20px;">
        ${heading('// Certifications')}
        ${s.certifications.map(c => `<div style="margin-bottom: 8px; font-size: 13px; break-inside: avoid;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
            <span style="font-weight: 500;">${c.name}</span>
            <span style="color: #888; font-family: 'Fira Code', 'Courier New', monospace; font-size: 11px;">${c.date}</span>
          </div>
          <p style="color: #666; margin: 0;">${c.issuer}</p>
        </div>`).join('')}
      </div>` : ''}

      ${s.volunteer.length > 0 ? `<div style="margin-bottom: 20px;">
        ${heading('// Volunteer')}
        ${s.volunteer.map(v => `<div style="margin-bottom: 14px; font-size: 13px; break-inside: avoid; padding-left: 12px; border-left: 2px solid #e5e7eb;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span style="font-weight: 600;">${v.position}</span>
            <span style="color: #888; font-family: 'Fira Code', 'Courier New', monospace; font-size: 11px;">${v.startDate} → ${v.endDate}</span>
          </div>
          <p style="color: #555; margin: 0 0 4px;">${v.organization}</p>
          <p style="color: #666; font-size: 12px; margin: 0;">${v.summary}</p>
          ${highlightsList(v.highlights, '12px', '#666')}
        </div>`).join('')}
      </div>` : ''}

      ${s.awards.length > 0 ? `<div style="margin-bottom: 20px;">
        ${heading('// Awards')}
        ${s.awards.map(a => `<div style="margin-bottom: 8px; font-size: 13px; break-inside: avoid;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
            <span style="font-weight: 500;">${a.title}</span>
            <span style="color: #888; font-family: 'Fira Code', 'Courier New', monospace; font-size: 11px;">${a.date}</span>
          </div>
          <p style="color: #666; margin: 0;">${a.awarder}</p>
          ${a.summary ? `<p style="font-size: 12px; color: #888; margin: 2px 0 0;">${a.summary}</p>` : ''}
        </div>`).join('')}
      </div>` : ''}

      ${s.languages.length > 0 ? `<div style="margin-bottom: 20px; break-inside: avoid;">
        ${heading('// Languages')}
        <div style="display: flex; flex-wrap: wrap; gap: 12px;">
          ${s.languages.map(l => `<span style="font-size: 12px; padding: 4px 10px; background: #f3f4f6; border-radius: 4px; font-family: 'Fira Code', 'Courier New', monospace;">${l.name}: ${l.proficiency}</span>`).join('')}
        </div>
      </div>` : ''}

      ${s.interests.length > 0 ? `<div style="margin-bottom: 20px; break-inside: avoid;">
        ${heading('// Interests')}
        <div style="display: flex; flex-wrap: wrap; gap: 6px;">
          ${s.interests.map(int => `<span style="font-size: 11px; padding: 3px 10px; background: #f3f4f6; border-radius: 3px;">${int.name}${int.keywords.length > 0 ? ': ' + int.keywords.join(', ') : ''}</span>`).join('')}
        </div>
      </div>` : ''}

      ${s.references.length > 0 ? `<div style="margin-bottom: 20px;">
        ${heading('// References')}
        ${s.references.map(r => `<div style="margin-bottom: 10px; font-size: 13px; break-inside: avoid;">
          <p style="font-weight: 500; margin: 0;">${r.name}</p>
          <p style="color: #666; margin: 0;">${r.position}${r.company ? ', ' + r.company : ''}</p>
          <div style="display: flex; gap: 12px; color: #888; font-size: 11px; margin-top: 2px; font-family: 'Fira Code', 'Courier New', monospace;">
            ${r.email ? `<span>${r.email}</span>` : ''}${r.phone ? `<span>${r.phone}</span>` : ''}
          </div>
        </div>`).join('')}
      </div>` : ''}

      ${s.publications.length > 0 ? `<div style="margin-bottom: 20px;">
        ${heading('// Publications')}
        ${s.publications.map(p => `<div style="margin-bottom: 8px; font-size: 13px; break-inside: avoid;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
            <span style="font-weight: 500; font-style: italic;">${p.title}</span>
            <span style="color: #888; font-family: 'Fira Code', 'Courier New', monospace; font-size: 11px;">${p.date}</span>
          </div>
          <p style="color: #666; margin: 0;">${p.publisher}</p>
        </div>`).join('')}
      </div>` : ''}

      ${s.customSections.map(sec => `<div style="margin-bottom: 20px;">
        ${heading('// ' + sec.title)}
        ${sec.items.map(item => `<div style="margin-bottom: 8px; font-size: 13px; break-inside: avoid;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
            <span style="font-weight: 500;">${item.title}</span>
            ${item.date ? `<span style="color: #888; font-family: 'Fira Code', 'Courier New', monospace; font-size: 11px;">${item.date}</span>` : ''}
          </div>
          ${item.subtitle ? `<p style="color: #666; margin: 0;">${item.subtitle}</p>` : ''}
          ${item.description ? `<p style="color: #666; font-size: 12px; margin: 4px 0 0;">${item.description}</p>` : ''}
        </div>`).join('')}
      </div>`).join('')}
    </div>`;
}

/* ─── PDF SERVICE ─── */
export class PDFService {
  async generatePDF(cv: CV, layout: CVLayoutStyle = 'modern'): Promise<Blob> {
    const html = renderCVToHTML(cv, layout);

    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = '794px';
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

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = 210;
      const pdfHeight = 297;
      const margin = 10; // mm margin for footer
      const usableHeight = pdfHeight - margin;
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;
      let pageNum = 0;
      const totalPages = Math.ceil(imgHeight / usableHeight);

      while (heightLeft > 0) {
        if (pageNum > 0) {
          pdf.addPage();
        }
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);

        // Footer with page number
        pdf.setFontSize(8);
        pdf.setTextColor(180, 180, 180);
        pdf.text(
          `Page ${pageNum + 1} of ${totalPages}`,
          pdfWidth / 2,
          pdfHeight - 4,
          { align: 'center' }
        );

        heightLeft -= usableHeight;
        position -= usableHeight;
        pageNum++;
      }

      return pdf.output('blob');
    } finally {
      document.body.removeChild(container);
    }
  }

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
