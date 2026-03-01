import { CV } from '@/lib/types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

type CVLayoutStyle = 'modern' | 'classic' | 'minimalist' | 'creative' | 'executive' | 'technical' | 'professional' | 'simple-ats' | 'pure-ats' | 'traditional';

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
    case 'professional':
      return renderProfessional(pi, sectionsHTML);
    case 'simple-ats':
      return renderSimpleAts(pi, sectionsHTML);
    case 'pure-ats':
      return renderPureAts(pi, sectionsHTML);
    case 'traditional':
      return renderTraditional(pi, sectionsHTML);
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
  return `<h2 style="font-size: 15px; font-weight: 600; color: #333; margin: 0 0 8px; line-height: 1.25;">
    <span style="display: inline-block; width: 24px; height: 2px; background: #DAA520; margin-right: 8px; vertical-align: middle; position: relative; top: -1px;"></span><span style="vertical-align: middle;">${title}</span></h2>`;
}

/** Inline dot + text using a Unicode bullet character — guaranteed same-baseline alignment. */
function dotText(text: string, _dotSize = 6, dotColor = '#DAA520', textStyle = 'font-size:13px'): string {
  return `<span style="margin-right:16px;white-space:nowrap;${textStyle}"><span style="color:${dotColor};margin-right:6px;">&#9679;</span>${text}</span>`;
}

/** Inline icon-circle + text for Executive header using Unicode. */
function iconText(icon: string, text: string): string {
  return `<span style="margin-right:16px;font-size:13px;"><span style="display:inline-block;width:18px;height:18px;border-radius:50%;background:#DAA520;color:white;font-size:9px;text-align:center;line-height:18px;margin-right:6px;">${icon}</span>${text}</span>`;
}

function highlightsList(highlights: string[], fontSize = '12px', color = '#666'): string {
  if (highlights.length === 0) return '';
  return `<ul style="list-style:none;padding-left:8px;margin:6px 0 0;">
    ${highlights.map(h => `<li style="font-size:${fontSize};color:${color};margin-bottom:3px;line-height:1.5;"><span style="color:${color};margin-right:6px;">&#8226;</span>${h}</li>`).join('')}</ul>`;
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
  const sectionRow = (label: string, content: string) => `<div style="display:flex;margin-bottom:4px;border-top:1px solid #ccc;padding-top:8px;">
    <div style="width:160px;flex-shrink:0;padding-right:16px;"><h2 style="font-size:11px;font-weight:400;text-transform:uppercase;letter-spacing:2px;margin:0;color:#333;">${label}</h2></div>
    <div style="flex:1;font-size:12px;">${content}</div>
  </div>`;

  return `
    <div style="font-family:Georgia,'Times New Roman',serif;color:#000;max-width:800px;margin:0 auto;padding:28px 40px;">
      <!-- Header -->
      <div style="text-align:center;margin-bottom:12px;">
        <h1 style="font-size:20px;font-weight:700;margin:0;">${pi.fullName}, ${pi.title}</h1>
        <p style="font-size:12px;color:#444;margin:4px 0 0;">${[pi.location, pi.phone, pi.email].filter(v => v).join(', ')}</p>
      </div>

      <!-- Profile -->
      ${s.summary ? sectionRow('Profile', `<p style="line-height:1.6;margin:0;color:#333;">${s.summary}</p>`) : ''}

      <!-- Skills -->
      ${s.skillGroups.length > 0 || s.skills.length > 0 ? sectionRow('Skills', `
        <div style="display:flex;flex-wrap:wrap;">
          ${s.skillGroups.length > 0
            ? s.skillGroups.map(sg => sg.keywords.map(k => `<div style="width:50%;box-sizing:border-box;display:flex;justify-content:space-between;padding:1px 24px 1px 0;"><span>${k}</span><span style="color:#555;">${sg.level || ''}</span></div>`).join('')).join('')
            : s.skills.map(skill => `<div style="width:50%;box-sizing:border-box;padding:1px 24px 1px 0;">${skill}</div>`).join('')}
        </div>`) : ''}

      <!-- Experience -->
      ${s.experience.length > 0 ? sectionRow('Employment History', `
        ${s.experience.map(exp => `<div style="margin-bottom:14px;break-inside:avoid;">
          <div style="display:flex;justify-content:space-between;align-items:baseline;">
            <p style="font-size:13px;font-weight:700;margin:0;">${exp.position}, ${exp.company}</p>
            <span style="font-size:11px;color:#555;white-space:nowrap;">${exp.location || ''}</span>
          </div>
          <p style="font-size:11px;color:#666;margin:0 0 4px;">${exp.startDate} &mdash; ${exp.endDate}</p>
          ${exp.highlights.length > 0 ? `<ul style="list-style:disc;padding-left:18px;margin:2px 0 0;">${exp.highlights.map(h => `<li style="font-size:11px;color:#333;line-height:1.6;margin-bottom:2px;">${h}</li>`).join('')}</ul>` : (exp.description ? `<p style="font-size:11px;color:#333;line-height:1.6;margin:2px 0 0;">${exp.description}</p>` : '')}
        </div>`).join('')}`) : ''}

      <!-- Education -->
      ${s.education.length > 0 ? sectionRow('Education', `
        ${s.education.map(edu => `<div style="margin-bottom:10px;break-inside:avoid;">
          <p style="font-size:13px;font-weight:700;margin:0;">${edu.institution}</p>
          <p style="font-size:12px;color:#444;margin:0;">${edu.degree}${edu.period ? ', ' + edu.period : ''}</p>
          ${edu.description ? `<p style="font-size:11px;color:#333;margin:2px 0 0;">${edu.description}</p>` : ''}
        </div>`).join('')}`) : ''}

      <!-- Projects -->
      ${s.projects.length > 0 ? sectionRow('Projects', `
        ${s.projects.map(p => `<div style="margin-bottom:12px;break-inside:avoid;">
          <div style="display:flex;justify-content:space-between;align-items:baseline;">
            <p style="font-size:13px;font-weight:700;margin:0;">${p.title}</p>
            ${(p.startDate || p.endDate) ? `<span style="font-size:11px;color:#555;white-space:nowrap;">${p.startDate}${p.endDate ? ' &mdash; ' + p.endDate : ''}</span>` : ''}
          </div>
          <p style="font-size:11px;color:#333;line-height:1.6;margin:2px 0 0;">${p.description}</p>
          ${p.highlights.length > 0 ? `<ul style="list-style:disc;padding-left:18px;margin:2px 0 0;">${p.highlights.map(h => `<li style="font-size:11px;color:#333;line-height:1.6;margin-bottom:2px;">${h}</li>`).join('')}</ul>` : ''}
          ${p.technologies.length > 0 ? `<p style="font-size:10px;color:#666;margin:2px 0 0;">Tech: ${p.technologies.join(', ')}</p>` : ''}
        </div>`).join('')}`) : ''}

      <!-- Certifications -->
      ${s.certifications.length > 0 ? sectionRow('Certifications', `
        ${s.certifications.map(c => `<div style="margin-bottom:8px;break-inside:avoid;">
          <p style="font-size:12px;font-weight:600;margin:0;">${c.name}</p>
          <p style="font-size:11px;color:#444;margin:0;">${c.issuer}${c.date ? ', ' + c.date : ''}</p>
          ${c.description ? `<p style="font-size:11px;color:#333;line-height:1.5;margin:2px 0 0;">${c.description}</p>` : ''}
        </div>`).join('')}`) : ''}

      <!-- Volunteer -->
      ${s.volunteer.length > 0 ? sectionRow('Volunteer', `
        ${s.volunteer.map(v => `<div style="margin-bottom:12px;break-inside:avoid;">
          <div style="display:flex;justify-content:space-between;align-items:baseline;">
            <p style="font-size:13px;font-weight:700;margin:0;">${v.position}, ${v.organization}</p>
            <span style="font-size:11px;color:#555;white-space:nowrap;">${v.startDate} &mdash; ${v.endDate}</span>
          </div>
          ${v.summary ? `<p style="font-size:11px;color:#333;line-height:1.6;margin:2px 0 0;">${v.summary}</p>` : ''}
          ${v.highlights.length > 0 ? `<ul style="list-style:disc;padding-left:18px;margin:2px 0 0;">${v.highlights.map(h => `<li style="font-size:11px;color:#333;line-height:1.6;margin-bottom:2px;">${h}</li>`).join('')}</ul>` : ''}
        </div>`).join('')}`) : ''}

      <!-- Awards -->
      ${s.awards.length > 0 ? sectionRow('Awards', `
        ${s.awards.map(a => `<div style="margin-bottom:8px;break-inside:avoid;">
          <p style="font-size:12px;font-weight:600;margin:0;">${a.title}${a.awarder ? ' &mdash; ' + a.awarder : ''}${a.date ? ', ' + a.date : ''}</p>
          ${a.summary ? `<p style="font-size:11px;color:#333;line-height:1.5;margin:2px 0 0;">${a.summary}</p>` : ''}
        </div>`).join('')}`) : ''}

      <!-- Languages -->
      ${s.languages.length > 0 ? sectionRow('Languages', `<p style="margin:0;">${s.languages.map(l => l.name + (l.proficiency ? ' (' + l.proficiency + ')' : '')).join(', ')}</p>`) : ''}

      <!-- Interests -->
      ${s.interests.length > 0 ? sectionRow('Interests', `<p style="margin:0;">${s.interests.map(int => int.name + (int.keywords.length > 0 ? ': ' + int.keywords.join(', ') : '')).join('; ')}</p>`) : ''}

      <!-- Publications -->
      ${s.publications.length > 0 ? sectionRow('Publications', `
        ${s.publications.map(p => `<div style="margin-bottom:6px;break-inside:avoid;">
          <p style="font-size:12px;font-weight:600;font-style:italic;margin:0;">${p.title}</p>
          <p style="font-size:11px;color:#444;margin:0;">${p.publisher}${p.date ? ', ' + p.date : ''}</p>
        </div>`).join('')}`) : ''}

      <!-- References -->
      ${s.references.length > 0 ? sectionRow('References', `
        ${s.references.map(r => `<div style="margin-bottom:8px;break-inside:avoid;">
          <p style="font-size:12px;font-weight:600;margin:0;">${r.name}</p>
          <p style="font-size:11px;color:#444;margin:0;">${r.position}${r.company ? ', ' + r.company : ''}</p>
          <p style="font-size:11px;color:#666;margin:0;">${[r.email, r.phone].filter(Boolean).join(' | ')}</p>
        </div>`).join('')}`) : ''}

      <!-- Custom Sections -->
      ${s.customSections.map(sec => sectionRow(sec.title, `
        ${sec.items.map(item => `<div style="margin-bottom:8px;break-inside:avoid;">
          <p style="font-size:12px;font-weight:600;margin:0;">${item.title}</p>
          ${item.subtitle ? `<p style="font-size:11px;color:#444;margin:0;">${item.subtitle}</p>` : ''}
          ${item.date ? `<p style="font-size:11px;color:#666;margin:0;">${item.date}</p>` : ''}
          ${item.description ? `<p style="font-size:11px;color:#333;line-height:1.5;margin:2px 0 0;">${item.description}</p>` : ''}
        </div>`).join('')}`)).join('')}
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
  const timelineItem = (content: string) => `<div style="padding-left: 20px; border-left: 2px solid rgba(218,165,32,0.3); margin-bottom: 16px; position: relative; break-inside: avoid;">
    <div style="position: absolute; left: -5px; top: 6px; width: 8px; height: 8px; border-radius: 50%; background: #DAA520;"></div>${content}</div>`;

  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #000; max-width: 800px; margin: 0 auto;">
      <div style="background: rgba(218,165,32,0.15); padding: 24px 40px; display: flex; align-items: center;">
        <div>
          <h1 style="font-size: 24px; font-weight: bold; margin: 0;">${pi.fullName}</h1>
          <p style="color: #666; margin: 0;">${pi.title}</p>
        </div>
      </div>

      <div style="padding: 32px 40px;">
        <div style="margin-bottom: 24px; font-size: 13px;">
          ${[pi.email, pi.phone, pi.location].filter(v => v).map(v => dotText(v, 6, '#DAA520')).join('')}
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
          <div style="line-height: 2.2;">
            ${s.skills.map(skill => `<span style="display: inline-block; padding: 2px 10px; background: rgba(218,165,32,0.1); border-radius: 12px; font-size: 11px; line-height: 1.6; margin: 0 4px 4px 0; vertical-align: middle;">${skill}</span>`).join('')}
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
        <div style="font-size: 13px;">
          ${[{icon:'@',val:pi.email},{icon:'T',val:pi.phone},{icon:'L',val:pi.location}].map(c => iconText(c.icon, c.val)).join('')}
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
          <div>
            ${s.skills.map(skill => dotText(skill, 6, '#DAA520')).join('')}
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
          <div>
            ${s.interests.map(int => dotText(int.name + (int.keywords.length > 0 ? ': ' + int.keywords.join(', ') : ''), 6, '#DAA520')).join('')}
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

/* ─── PROFESSIONAL ─── */
function renderProfessional(pi: PI, s: Sections): string {
  const accent = '#2B7ABA';
  const heading = (t: string) => `<h2 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#000;margin:0 0 6px;padding-bottom:4px;border-bottom:2px solid ${accent};">${t}</h2>`;

  const leftCol = `
    ${s.summary ? `<div style="margin-bottom:16px;">${heading('Summary')}<p style="font-size:12px;color:#333;line-height:1.5;margin:0;">${s.summary}</p></div>` : ''}

    ${s.experience.length > 0 ? `<div style="margin-bottom:16px;">
      ${heading('Experience')}
      ${s.experience.map(exp => `<div style="margin-bottom:14px;break-inside:avoid;">
        <p style="font-size:13px;font-weight:700;margin:0;">${exp.position}</p>
        <p style="font-size:12px;color:${accent};font-weight:600;margin:0;">${exp.company}</p>
        <p style="font-size:11px;color:#777;margin:0 0 4px;">&#128197; ${exp.startDate} - ${exp.endDate}${exp.location ? '&nbsp;&nbsp;&nbsp;&#9906; ' + exp.location : ''}</p>
        ${exp.highlights.length > 0 ? `<ul style="list-style:none;padding:0;margin:4px 0 0;">${exp.highlights.map(h => `<li style="font-size:11px;color:#444;line-height:1.5;margin-bottom:2px;">&#8226; ${h}</li>`).join('')}</ul>` : (exp.description ? `<p style="font-size:11px;color:#444;line-height:1.5;margin:4px 0 0;">${exp.description}</p>` : '')}
      </div>`).join('')}
    </div>` : ''}

    ${s.projects.length > 0 ? `<div style="margin-bottom:16px;">
      ${heading('Projects')}
      ${s.projects.map(p => `<div style="margin-bottom:12px;break-inside:avoid;">
        <p style="font-size:13px;font-weight:700;margin:0;">${p.title}</p>
        ${(p.startDate || p.endDate) ? `<p style="font-size:11px;color:#777;margin:0;">&#128197; ${p.startDate}${p.endDate ? ' - ' + p.endDate : ''}</p>` : ''}
        <p style="font-size:11px;color:#444;line-height:1.5;margin:4px 0 0;">${p.description}</p>
        ${p.highlights.length > 0 ? `<ul style="list-style:none;padding:0;margin:4px 0 0;">${p.highlights.map(h => `<li style="font-size:11px;color:#444;line-height:1.5;margin-bottom:2px;">&#8226; ${h}</li>`).join('')}</ul>` : ''}
        ${p.technologies.length > 0 ? `<p style="font-size:10px;color:#777;margin:4px 0 0;">Tech: ${p.technologies.join(', ')}</p>` : ''}
      </div>`).join('')}
    </div>` : ''}

    ${s.volunteer.length > 0 ? `<div style="margin-bottom:16px;">
      ${heading('Volunteer')}
      ${s.volunteer.map(v => `<div style="margin-bottom:12px;break-inside:avoid;">
        <p style="font-size:13px;font-weight:700;margin:0;">${v.position}</p>
        <p style="font-size:12px;color:${accent};font-weight:600;margin:0;">${v.organization}</p>
        <p style="font-size:11px;color:#777;margin:0 0 4px;">&#128197; ${v.startDate} - ${v.endDate}</p>
        ${v.summary ? `<p style="font-size:11px;color:#444;line-height:1.5;margin:0;">${v.summary}</p>` : ''}
        ${v.highlights.length > 0 ? `<ul style="list-style:none;padding:0;margin:4px 0 0;">${v.highlights.map(h => `<li style="font-size:11px;color:#444;line-height:1.5;margin-bottom:2px;">&#8226; ${h}</li>`).join('')}</ul>` : ''}
      </div>`).join('')}
    </div>` : ''}

    ${s.languages.length > 0 ? `<div style="margin-bottom:16px;break-inside:avoid;">
      ${heading('Languages')}
      <p style="font-size:12px;color:#333;margin:0;">${s.languages.map(l => `<strong>${l.name}</strong> — ${l.proficiency}`).join('&nbsp;&nbsp;&nbsp;&nbsp;')}</p>
    </div>` : ''}

    ${s.references.length > 0 ? `<div style="margin-bottom:16px;">
      ${heading('References')}
      ${s.references.map(r => `<div style="margin-bottom:8px;break-inside:avoid;">
        <p style="font-size:12px;font-weight:600;margin:0;">${r.name}</p>
        <p style="font-size:11px;color:#555;margin:0;">${r.position}${r.company ? ', ' + r.company : ''}</p>
        <p style="font-size:11px;color:#777;margin:0;">${[r.email, r.phone].filter(Boolean).join(' | ')}</p>
      </div>`).join('')}
    </div>` : ''}

    ${s.publications.length > 0 ? `<div style="margin-bottom:16px;">
      ${heading('Publications')}
      ${s.publications.map(p => `<div style="margin-bottom:6px;break-inside:avoid;">
        <p style="font-size:12px;font-weight:600;font-style:italic;margin:0;">${p.title}</p>
        <p style="font-size:11px;color:#555;margin:0;">${p.publisher}${p.date ? ' — ' + p.date : ''}</p>
      </div>`).join('')}
    </div>` : ''}
  `;

  const rightCol = `
    ${s.awards.length > 0 ? `<div style="margin-bottom:16px;">
      ${heading('Key Achievements')}
      ${s.awards.map(a => `<div style="margin-bottom:10px;break-inside:avoid;">
        <p style="font-size:12px;font-weight:700;margin:0;">${a.title}</p>
        ${a.summary ? `<p style="font-size:11px;color:#444;line-height:1.5;margin:2px 0 0;">${a.summary}</p>` : ''}
      </div>`).join('')}
    </div>` : ''}

    ${s.skills.length > 0 ? `<div style="margin-bottom:16px;break-inside:avoid;">
      ${heading('Skills')}
      <p style="font-size:11px;color:#333;line-height:1.6;margin:0;">${s.skills.join(', ')}</p>
    </div>` : ''}

    ${s.education.length > 0 ? `<div style="margin-bottom:16px;">
      ${heading('Education')}
      ${s.education.map(edu => `<div style="margin-bottom:10px;break-inside:avoid;">
        <p style="font-size:12px;font-weight:700;margin:0;">${edu.degree}</p>
        <p style="font-size:12px;color:${accent};font-weight:600;margin:0;">${edu.institution}</p>
        ${edu.period ? `<p style="font-size:11px;color:#777;margin:0;">&#128197; ${edu.period}</p>` : ''}
        ${edu.description ? `<p style="font-size:11px;color:#555;margin:2px 0 0;">${edu.description}</p>` : ''}
      </div>`).join('')}
    </div>` : ''}

    ${s.certifications.length > 0 ? `<div style="margin-bottom:16px;">
      ${heading('Certifications')}
      ${s.certifications.map(c => `<div style="margin-bottom:8px;break-inside:avoid;">
        <p style="font-size:12px;font-weight:600;margin:0;">${c.name}</p>
        <p style="font-size:11px;color:#555;margin:0;">${c.issuer}${c.date ? ' — ' + c.date : ''}</p>
        ${c.description ? `<p style="font-size:11px;color:#444;line-height:1.5;margin:2px 0 0;">${c.description}</p>` : ''}
      </div>`).join('')}
    </div>` : ''}

    ${s.interests.length > 0 ? `<div style="margin-bottom:16px;break-inside:avoid;">
      ${heading('Interests')}
      ${s.interests.map(int => `<div style="margin-bottom:6px;">
        <p style="font-size:12px;font-weight:600;margin:0;">${int.name}</p>
        ${int.keywords.length > 0 ? `<p style="font-size:11px;color:#555;margin:0;">${int.keywords.join(', ')}</p>` : ''}
      </div>`).join('')}
    </div>` : ''}

    ${s.customSections.map(sec => `<div style="margin-bottom:16px;">
      ${heading(sec.title)}
      ${sec.items.map(item => `<div style="margin-bottom:8px;break-inside:avoid;">
        <p style="font-size:12px;font-weight:600;margin:0;">${item.title}</p>
        ${item.subtitle ? `<p style="font-size:11px;color:#555;margin:0;">${item.subtitle}</p>` : ''}
        ${item.date ? `<p style="font-size:11px;color:#777;margin:0;">${item.date}</p>` : ''}
        ${item.description ? `<p style="font-size:11px;color:#444;line-height:1.5;margin:2px 0 0;">${item.description}</p>` : ''}
      </div>`).join('')}
    </div>`).join('')}
  `;

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#000;max-width:800px;margin:0 auto;">
      <!-- Header -->
      <div style="padding:28px 32px 20px;border-bottom:3px solid ${accent};">
        <h1 style="font-size:26px;font-weight:900;text-transform:uppercase;letter-spacing:1px;margin:0;">${pi.fullName}</h1>
        <p style="font-size:14px;color:${accent};font-weight:600;margin:2px 0 8px;">${pi.title}</p>
        <p style="font-size:11px;color:#555;margin:0;">${[pi.email, pi.phone, pi.location].filter(v => v).join('&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;')}</p>
      </div>
      <!-- Body -->
      <div style="display:flex;padding:20px 32px;">
        <div style="flex:3;padding-right:24px;border-right:1px solid #e0e0e0;">${leftCol}</div>
        <div style="flex:2;padding-left:24px;">${rightCol}</div>
      </div>
    </div>`;
}

/* ─── SIMPLE ATS ─── */
function renderSimpleAts(pi: PI, s: Sections): string {
  const accent = '#4A90D9';
  const heading = (t: string) => `<h2 style="font-size:22px;font-weight:400;color:${accent};margin:20px 0 8px;padding-bottom:6px;border-bottom:1px solid #ddd;">${t}</h2>`;

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#000;max-width:800px;margin:0 auto;padding:32px 40px;">
      <!-- Header -->
      <div style="margin-bottom:8px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <div>
            <h1 style="font-size:28px;font-weight:400;color:${accent};margin:0;">${pi.fullName}</h1>
            <p style="font-size:14px;color:${accent};margin:4px 0 0;">${pi.title}</p>
          </div>
          <div style="text-align:right;font-size:12px;color:#333;line-height:1.6;">
            ${pi.email ? `<div>${pi.email}</div>` : ''}
            ${pi.phone ? `<div>${pi.phone}</div>` : ''}
            ${pi.location ? `<div>${pi.location}</div>` : ''}
          </div>
        </div>
      </div>

      <!-- Profile / Summary -->
      ${s.summary ? `${heading('Profile')}<p style="font-size:13px;color:#333;line-height:1.6;margin:0;">${s.summary}</p>` : ''}

      <!-- Skills -->
      ${s.skills.length > 0 ? `${heading('Areas of Expertise')}
        <div style="display:flex;flex-wrap:wrap;">
          ${s.skills.map(skill => `<div style="width:33.33%;box-sizing:border-box;padding:2px 0;"><span style="font-size:12px;color:#333;">&#8226; ${skill}</span></div>`).join('')}
        </div>` : ''}

      <!-- Experience -->
      ${s.experience.length > 0 ? `${heading('Professional Experience')}
        ${s.experience.map(exp => `<div style="margin-bottom:16px;break-inside:avoid;">
          <div style="display:flex;justify-content:space-between;margin-bottom:2px;">
            <span style="font-size:13px;color:#555;">${exp.company}${exp.location ? ', ' + exp.location : ''}</span>
            <span style="font-size:12px;color:#555;">${exp.startDate} to ${exp.endDate}</span>
          </div>
          <p style="font-size:13px;color:${accent};margin:0 0 4px;">${exp.position}</p>
          ${exp.highlights.length > 0 ? `<ul style="list-style:disc;padding-left:20px;margin:4px 0 0;">${exp.highlights.map(h => `<li style="font-size:12px;color:#333;line-height:1.6;margin-bottom:2px;">${h}</li>`).join('')}</ul>` : (exp.description ? `<p style="font-size:12px;color:#333;line-height:1.6;margin:4px 0 0;">${exp.description}</p>` : '')}
        </div>`).join('')}` : ''}

      <!-- Education -->
      ${s.education.length > 0 ? `${heading('Education')}
        ${s.education.map(edu => `<div style="margin-bottom:12px;break-inside:avoid;">
          <div style="display:flex;justify-content:space-between;margin-bottom:2px;">
            <span style="font-size:13px;font-weight:600;">${edu.degree}</span>
            ${edu.period ? `<span style="font-size:12px;color:#555;">${edu.period}</span>` : ''}
          </div>
          <p style="font-size:13px;color:${accent};margin:0;">${edu.institution}</p>
          ${edu.description ? `<p style="font-size:12px;color:#555;margin:4px 0 0;">${edu.description}</p>` : ''}
        </div>`).join('')}` : ''}

      <!-- Projects -->
      ${s.projects.length > 0 ? `${heading('Projects')}
        ${s.projects.map(p => `<div style="margin-bottom:14px;break-inside:avoid;">
          <div style="display:flex;justify-content:space-between;margin-bottom:2px;">
            <span style="font-size:13px;font-weight:600;">${p.title}</span>
            ${(p.startDate || p.endDate) ? `<span style="font-size:12px;color:#555;">${p.startDate}${p.endDate ? ' to ' + p.endDate : ''}</span>` : ''}
          </div>
          <p style="font-size:12px;color:#333;line-height:1.6;margin:4px 0 0;">${p.description}</p>
          ${p.highlights.length > 0 ? `<ul style="list-style:disc;padding-left:20px;margin:4px 0 0;">${p.highlights.map(h => `<li style="font-size:12px;color:#333;line-height:1.6;margin-bottom:2px;">${h}</li>`).join('')}</ul>` : ''}
          ${p.technologies.length > 0 ? `<p style="font-size:11px;color:#777;margin:4px 0 0;">Tech: ${p.technologies.join(', ')}</p>` : ''}
        </div>`).join('')}` : ''}

      <!-- Certifications -->
      ${s.certifications.length > 0 ? `${heading('Certifications')}
        ${s.certifications.map(c => `<div style="margin-bottom:8px;break-inside:avoid;">
          <p style="font-size:13px;font-weight:600;margin:0;">${c.name}</p>
          <p style="font-size:12px;color:#555;margin:0;">${c.issuer}${c.date ? ' — ' + c.date : ''}</p>
          ${c.description ? `<p style="font-size:12px;color:#444;line-height:1.5;margin:2px 0 0;">${c.description}</p>` : ''}
        </div>`).join('')}` : ''}

      <!-- Volunteer -->
      ${s.volunteer.length > 0 ? `${heading('Volunteer Experience')}
        ${s.volunteer.map(v => `<div style="margin-bottom:14px;break-inside:avoid;">
          <div style="display:flex;justify-content:space-between;margin-bottom:2px;">
            <span style="font-size:13px;color:#555;">${v.organization}</span>
            <span style="font-size:12px;color:#555;">${v.startDate} to ${v.endDate}</span>
          </div>
          <p style="font-size:13px;color:${accent};margin:0 0 4px;">${v.position}</p>
          ${v.summary ? `<p style="font-size:12px;color:#333;line-height:1.6;margin:0;">${v.summary}</p>` : ''}
          ${v.highlights.length > 0 ? `<ul style="list-style:disc;padding-left:20px;margin:4px 0 0;">${v.highlights.map(h => `<li style="font-size:12px;color:#333;line-height:1.6;margin-bottom:2px;">${h}</li>`).join('')}</ul>` : ''}
        </div>`).join('')}` : ''}

      <!-- Awards -->
      ${s.awards.length > 0 ? `${heading('Awards')}
        ${s.awards.map(a => `<div style="margin-bottom:8px;break-inside:avoid;">
          <p style="font-size:13px;font-weight:600;margin:0;">${a.title}</p>
          <p style="font-size:12px;color:#555;margin:0;">${a.awarder}${a.date ? ' — ' + a.date : ''}</p>
          ${a.summary ? `<p style="font-size:12px;color:#444;line-height:1.5;margin:2px 0 0;">${a.summary}</p>` : ''}
        </div>`).join('')}` : ''}

      <!-- Languages -->
      ${s.languages.length > 0 ? `${heading('Languages')}
        <p style="font-size:12px;color:#333;margin:0;">${s.languages.map(l => `${l.name} (${l.proficiency})`).join('&nbsp;&nbsp;&nbsp;&#8226;&nbsp;&nbsp;&nbsp;')}</p>` : ''}

      <!-- Interests -->
      ${s.interests.length > 0 ? `${heading('Interests')}
        <p style="font-size:12px;color:#333;margin:0;">${s.interests.map(int => int.name + (int.keywords.length > 0 ? ': ' + int.keywords.join(', ') : '')).join('&nbsp;&nbsp;&nbsp;&#8226;&nbsp;&nbsp;&nbsp;')}</p>` : ''}

      <!-- Publications -->
      ${s.publications.length > 0 ? `${heading('Publications')}
        ${s.publications.map(p => `<div style="margin-bottom:6px;break-inside:avoid;">
          <p style="font-size:12px;font-weight:600;font-style:italic;margin:0;">${p.title}</p>
          <p style="font-size:11px;color:#555;margin:0;">${p.publisher}${p.date ? ' — ' + p.date : ''}</p>
        </div>`).join('')}` : ''}

      <!-- References -->
      ${s.references.length > 0 ? `${heading('References')}
        ${s.references.map(r => `<div style="margin-bottom:8px;break-inside:avoid;">
          <p style="font-size:12px;font-weight:600;margin:0;">${r.name}</p>
          <p style="font-size:11px;color:#555;margin:0;">${r.position}${r.company ? ', ' + r.company : ''}</p>
          <p style="font-size:11px;color:#777;margin:0;">${[r.email, r.phone].filter(Boolean).join(' | ')}</p>
        </div>`).join('')}` : ''}

      <!-- Custom Sections -->
      ${s.customSections.map(sec => `${heading(sec.title)}
        ${sec.items.map(item => `<div style="margin-bottom:8px;break-inside:avoid;">
          <p style="font-size:12px;font-weight:600;margin:0;">${item.title}</p>
          ${item.subtitle ? `<p style="font-size:11px;color:#555;margin:0;">${item.subtitle}</p>` : ''}
          ${item.date ? `<p style="font-size:11px;color:#777;margin:0;">${item.date}</p>` : ''}
          ${item.description ? `<p style="font-size:11px;color:#444;line-height:1.5;margin:2px 0 0;">${item.description}</p>` : ''}
        </div>`).join('')}`).join('')}
    </div>`;
}

/* ─── PURE ATS ─── */
function renderPureAts(pi: PI, s: Sections): string {
  const heading = (t: string) => `<h2 style="font-size:14px;font-weight:400;color:#333;margin:16px 0 4px;padding-bottom:3px;border-bottom:1px solid #999;">${t}</h2>`;

  return `
    <div style="font-family:'Times New Roman',Georgia,serif;color:#000;max-width:800px;margin:0 auto;padding:24px 32px;">
      <!-- Header -->
      <div style="margin-bottom:4px;">
        <h1 style="font-size:22px;font-weight:700;margin:0;">${pi.fullName}</h1>
        <p style="font-size:12px;color:#444;margin:2px 0 0;">${[pi.location, pi.email, pi.phone].filter(v => v).join(' | ')}</p>
      </div>

      <!-- Profile -->
      ${s.summary ? `${heading('Profile')}<p style="font-size:12px;color:#000;line-height:1.5;margin:4px 0 0;">${s.summary}</p>` : ''}

      <!-- Skills -->
      ${s.skills.length > 0 ? `${heading('Areas of Expertise')}
        <div style="display:flex;flex-wrap:wrap;margin:4px 0 0;">
          ${s.skills.map(skill => `<span style="width:25%;box-sizing:border-box;font-size:12px;color:#000;padding:1px 0;">${skill}</span>`).join('')}
        </div>` : ''}

      <!-- Experience -->
      ${s.experience.length > 0 ? `${heading('Professional Experience')}
        ${s.experience.map(exp => `<div style="margin-bottom:14px;break-inside:avoid;">
          <p style="font-size:13px;font-weight:700;margin:0;">${exp.position}, ${exp.company}${exp.location ? ', ' + exp.location : ''}</p>
          <p style="font-size:11px;color:#666;margin:0 0 4px;">${exp.startDate} to ${exp.endDate}</p>
          ${exp.highlights.length > 0 ? `<ul style="list-style:disc;padding-left:20px;margin:2px 0 0;">${exp.highlights.map(h => `<li style="font-size:11px;color:#000;line-height:1.5;margin-bottom:2px;">${h}</li>`).join('')}</ul>` : (exp.description ? `<p style="font-size:11px;color:#000;line-height:1.5;margin:2px 0 0;">${exp.description}</p>` : '')}
        </div>`).join('')}` : ''}

      <!-- Education -->
      ${s.education.length > 0 ? `${heading('Education')}
        ${s.education.map(edu => `<div style="margin-bottom:10px;break-inside:avoid;">
          <p style="font-size:13px;font-weight:700;margin:0;">${edu.institution}</p>
          <p style="font-size:12px;color:#444;margin:0;">${edu.degree}${edu.period ? ', ' + edu.period : ''}</p>
          ${edu.description ? `<p style="font-size:11px;color:#000;margin:2px 0 0;">${edu.description}</p>` : ''}
        </div>`).join('')}` : ''}

      <!-- Projects -->
      ${s.projects.length > 0 ? `${heading('Projects')}
        ${s.projects.map(p => `<div style="margin-bottom:12px;break-inside:avoid;">
          <p style="font-size:13px;font-weight:700;margin:0;">${p.title}</p>
          ${(p.startDate || p.endDate) ? `<p style="font-size:11px;color:#666;margin:0;">${p.startDate}${p.endDate ? ' to ' + p.endDate : ''}</p>` : ''}
          <p style="font-size:11px;color:#000;line-height:1.5;margin:2px 0 0;">${p.description}</p>
          ${p.highlights.length > 0 ? `<ul style="list-style:disc;padding-left:20px;margin:2px 0 0;">${p.highlights.map(h => `<li style="font-size:11px;color:#000;line-height:1.5;margin-bottom:2px;">${h}</li>`).join('')}</ul>` : ''}
          ${p.technologies.length > 0 ? `<p style="font-size:10px;color:#666;margin:2px 0 0;">Tech: ${p.technologies.join(', ')}</p>` : ''}
        </div>`).join('')}` : ''}

      <!-- Certifications -->
      ${s.certifications.length > 0 ? `${heading('Certifications')}
        ${s.certifications.map(c => `<div style="margin-bottom:6px;break-inside:avoid;">
          <p style="font-size:12px;font-weight:600;margin:0;">${c.name}</p>
          <p style="font-size:11px;color:#444;margin:0;">${c.issuer}${c.date ? ', ' + c.date : ''}</p>
          ${c.description ? `<p style="font-size:11px;color:#000;line-height:1.5;margin:2px 0 0;">${c.description}</p>` : ''}
        </div>`).join('')}` : ''}

      <!-- Volunteer -->
      ${s.volunteer.length > 0 ? `${heading('Volunteer Experience')}
        ${s.volunteer.map(v => `<div style="margin-bottom:12px;break-inside:avoid;">
          <p style="font-size:13px;font-weight:700;margin:0;">${v.position}, ${v.organization}</p>
          <p style="font-size:11px;color:#666;margin:0 0 4px;">${v.startDate} to ${v.endDate}</p>
          ${v.summary ? `<p style="font-size:11px;color:#000;line-height:1.5;margin:0;">${v.summary}</p>` : ''}
          ${v.highlights.length > 0 ? `<ul style="list-style:disc;padding-left:20px;margin:2px 0 0;">${v.highlights.map(h => `<li style="font-size:11px;color:#000;line-height:1.5;margin-bottom:2px;">${h}</li>`).join('')}</ul>` : ''}
        </div>`).join('')}` : ''}

      <!-- Awards -->
      ${s.awards.length > 0 ? `${heading('Awards')}
        ${s.awards.map(a => `<div style="margin-bottom:6px;break-inside:avoid;">
          <p style="font-size:12px;font-weight:600;margin:0;">${a.title}${a.awarder ? ' — ' + a.awarder : ''}${a.date ? ', ' + a.date : ''}</p>
          ${a.summary ? `<p style="font-size:11px;color:#000;line-height:1.5;margin:2px 0 0;">${a.summary}</p>` : ''}
        </div>`).join('')}` : ''}

      <!-- Languages -->
      ${s.languages.length > 0 ? `${heading('Languages')}
        <p style="font-size:12px;color:#000;margin:4px 0 0;">${s.languages.map(l => l.name + (l.proficiency ? ' (' + l.proficiency + ')' : '')).join(', ')}</p>` : ''}

      <!-- Interests -->
      ${s.interests.length > 0 ? `${heading('Interests')}
        <p style="font-size:12px;color:#000;margin:4px 0 0;">${s.interests.map(int => int.name).join(', ')}</p>` : ''}

      <!-- Publications -->
      ${s.publications.length > 0 ? `${heading('Publications')}
        ${s.publications.map(p => `<div style="margin-bottom:6px;break-inside:avoid;">
          <p style="font-size:12px;font-weight:600;font-style:italic;margin:0;">${p.title}</p>
          <p style="font-size:11px;color:#444;margin:0;">${p.publisher}${p.date ? ', ' + p.date : ''}</p>
        </div>`).join('')}` : ''}

      <!-- References -->
      ${s.references.length > 0 ? `${heading('References')}
        ${s.references.map(r => `<div style="margin-bottom:6px;break-inside:avoid;">
          <p style="font-size:12px;font-weight:600;margin:0;">${r.name}</p>
          <p style="font-size:11px;color:#444;margin:0;">${r.position}${r.company ? ', ' + r.company : ''}</p>
          <p style="font-size:11px;color:#666;margin:0;">${[r.email, r.phone].filter(Boolean).join(' | ')}</p>
        </div>`).join('')}` : ''}

      <!-- Custom Sections -->
      ${s.customSections.map(sec => `${heading(sec.title)}
        ${sec.items.map(item => `<div style="margin-bottom:6px;break-inside:avoid;">
          <p style="font-size:12px;font-weight:600;margin:0;">${item.title}</p>
          ${item.subtitle ? `<p style="font-size:11px;color:#444;margin:0;">${item.subtitle}</p>` : ''}
          ${item.date ? `<p style="font-size:11px;color:#666;margin:0;">${item.date}</p>` : ''}
          ${item.description ? `<p style="font-size:11px;color:#000;line-height:1.5;margin:2px 0 0;">${item.description}</p>` : ''}
        </div>`).join('')}`).join('')}
    </div>`;
}

/* ─── TRADITIONAL ─── */
function renderTraditional(pi: PI, s: Sections): string {
  const banner = (t: string) => `<div style="background:#f0f0f0;padding:6px 0;text-align:center;margin:20px 0 10px;border-top:1px solid #999;border-bottom:1px solid #999;"><h2 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:3px;margin:0;color:#000;">${t}</h2></div>`;
  const lineSep = '<div style="border-bottom:1px solid #ccc;margin:8px 0;"></div>';

  return `
    <div style="font-family:Georgia,'Times New Roman',serif;color:#000;max-width:800px;margin:0 auto;padding:28px 40px;">
      <!-- Header -->
      <div style="text-align:center;margin-bottom:8px;">
        <h1 style="font-size:26px;font-weight:700;text-transform:uppercase;letter-spacing:4px;margin:0;">${pi.fullName}</h1>
        <p style="font-size:14px;font-weight:600;margin:4px 0 2px;">${pi.title}</p>
        <p style="font-size:12px;color:#444;margin:0;">${pi.location || ''}</p>
        <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:12px;">
          <span>${pi.phone || ''}</span>
          <span>${pi.email || ''}</span>
        </div>
        ${lineSep}
      </div>

      <!-- Profile -->
      ${s.summary ? `${banner('Profile')}<p style="font-size:12px;text-align:center;line-height:1.6;margin:0 20px;color:#333;">${s.summary}</p>` : ''}

      <!-- Skills -->
      ${s.skillGroups.length > 0 || s.skills.length > 0 ? `${banner('Skills')}
        <div style="display:flex;flex-wrap:wrap;margin:4px 0;">
          ${s.skillGroups.length > 0
            ? s.skillGroups.map(sg => sg.keywords.map(k => `<div style="width:50%;box-sizing:border-box;display:flex;justify-content:space-between;padding:2px 16px 2px 0;font-size:12px;"><span>${k}</span><span style="font-style:italic;color:#555;">${sg.level || ''}</span></div>`).join('')).join('')
            : s.skills.map(skill => `<div style="width:50%;box-sizing:border-box;padding:2px 16px 2px 0;font-size:12px;">${skill}</div>`).join('')}
        </div>` : ''}

      <!-- Experience -->
      ${s.experience.length > 0 ? `${banner('Employment History')}
        ${s.experience.map(exp => `<div style="margin-bottom:16px;break-inside:avoid;">
          <div style="display:flex;justify-content:space-between;align-items:baseline;">
            <p style="font-size:13px;font-weight:700;margin:0;"><span style="margin-right:6px;">&#10070;</span>${exp.position}, ${exp.company}</p>
            <span style="font-size:11px;color:#555;white-space:nowrap;">${exp.startDate} — ${exp.endDate}</span>
          </div>
          ${exp.location ? `<p style="font-size:11px;color:#555;margin:0;text-align:right;">${exp.location}</p>` : ''}
          ${exp.highlights.length > 0 ? `<ul style="list-style:disc;padding-left:28px;margin:4px 0 0;">${exp.highlights.map(h => `<li style="font-size:11px;color:#333;line-height:1.6;margin-bottom:2px;">${h}</li>`).join('')}</ul>` : (exp.description ? `<p style="font-size:11px;color:#333;line-height:1.6;margin:4px 0 0;padding-left:16px;">${exp.description}</p>` : '')}
        </div>`).join('')}` : ''}

      <!-- Education -->
      ${s.education.length > 0 ? `${banner('Education')}
        ${s.education.map(edu => `<div style="margin-bottom:10px;break-inside:avoid;">
          <p style="font-size:13px;font-weight:700;margin:0;">${edu.institution}</p>
          <p style="font-size:12px;color:#444;margin:0;">${edu.degree}${edu.period ? ', ' + edu.period : ''}</p>
          ${edu.description ? `<p style="font-size:11px;color:#333;margin:2px 0 0;">${edu.description}</p>` : ''}
        </div>`).join('')}` : ''}

      <!-- Projects -->
      ${s.projects.length > 0 ? `${banner('Projects')}
        ${s.projects.map(p => `<div style="margin-bottom:14px;break-inside:avoid;">
          <div style="display:flex;justify-content:space-between;align-items:baseline;">
            <p style="font-size:13px;font-weight:700;margin:0;"><span style="margin-right:6px;">&#10070;</span>${p.title}</p>
            ${(p.startDate || p.endDate) ? `<span style="font-size:11px;color:#555;white-space:nowrap;">${p.startDate}${p.endDate ? ' — ' + p.endDate : ''}</span>` : ''}
          </div>
          <p style="font-size:11px;color:#333;line-height:1.6;margin:4px 0 0;padding-left:16px;">${p.description}</p>
          ${p.highlights.length > 0 ? `<ul style="list-style:disc;padding-left:28px;margin:2px 0 0;">${p.highlights.map(h => `<li style="font-size:11px;color:#333;line-height:1.6;margin-bottom:2px;">${h}</li>`).join('')}</ul>` : ''}
          ${p.technologies.length > 0 ? `<p style="font-size:10px;color:#666;margin:2px 0 0;padding-left:16px;">Tech: ${p.technologies.join(', ')}</p>` : ''}
        </div>`).join('')}` : ''}

      <!-- Certifications -->
      ${s.certifications.length > 0 ? `${banner('Certifications')}
        ${s.certifications.map(c => `<div style="margin-bottom:8px;break-inside:avoid;">
          <p style="font-size:12px;font-weight:600;margin:0;">${c.name}</p>
          <p style="font-size:11px;color:#444;margin:0;">${c.issuer}${c.date ? ', ' + c.date : ''}</p>
          ${c.description ? `<p style="font-size:11px;color:#333;line-height:1.5;margin:2px 0 0;">${c.description}</p>` : ''}
        </div>`).join('')}` : ''}

      <!-- Volunteer -->
      ${s.volunteer.length > 0 ? `${banner('Volunteer')}
        ${s.volunteer.map(v => `<div style="margin-bottom:14px;break-inside:avoid;">
          <div style="display:flex;justify-content:space-between;align-items:baseline;">
            <p style="font-size:13px;font-weight:700;margin:0;"><span style="margin-right:6px;">&#10070;</span>${v.position}, ${v.organization}</p>
            <span style="font-size:11px;color:#555;white-space:nowrap;">${v.startDate} — ${v.endDate}</span>
          </div>
          ${v.summary ? `<p style="font-size:11px;color:#333;line-height:1.6;margin:4px 0 0;padding-left:16px;">${v.summary}</p>` : ''}
          ${v.highlights.length > 0 ? `<ul style="list-style:disc;padding-left:28px;margin:2px 0 0;">${v.highlights.map(h => `<li style="font-size:11px;color:#333;line-height:1.6;margin-bottom:2px;">${h}</li>`).join('')}</ul>` : ''}
        </div>`).join('')}` : ''}

      <!-- Awards -->
      ${s.awards.length > 0 ? `${banner('Awards')}
        ${s.awards.map(a => `<div style="margin-bottom:8px;break-inside:avoid;">
          <p style="font-size:12px;font-weight:600;margin:0;">${a.title}${a.awarder ? ' — ' + a.awarder : ''}${a.date ? ', ' + a.date : ''}</p>
          ${a.summary ? `<p style="font-size:11px;color:#333;line-height:1.5;margin:2px 0 0;">${a.summary}</p>` : ''}
        </div>`).join('')}` : ''}

      <!-- Languages -->
      ${s.languages.length > 0 ? `${banner('Languages')}
        <p style="font-size:12px;color:#000;margin:4px 0 0;">${s.languages.map(l => l.name + (l.proficiency ? ' (' + l.proficiency + ')' : '')).join(', ')}</p>` : ''}

      <!-- Interests -->
      ${s.interests.length > 0 ? `${banner('Interests')}
        <p style="font-size:12px;color:#000;margin:4px 0 0;">${s.interests.map(int => int.name + (int.keywords.length > 0 ? ': ' + int.keywords.join(', ') : '')).join('; ')}</p>` : ''}

      <!-- Publications -->
      ${s.publications.length > 0 ? `${banner('Publications')}
        ${s.publications.map(p => `<div style="margin-bottom:6px;break-inside:avoid;">
          <p style="font-size:12px;font-weight:600;font-style:italic;margin:0;">${p.title}</p>
          <p style="font-size:11px;color:#444;margin:0;">${p.publisher}${p.date ? ', ' + p.date : ''}</p>
        </div>`).join('')}` : ''}

      <!-- References -->
      ${s.references.length > 0 ? `${banner('References')}
        ${s.references.map(r => `<div style="margin-bottom:8px;break-inside:avoid;">
          <p style="font-size:12px;font-weight:600;margin:0;">${r.name}</p>
          <p style="font-size:11px;color:#444;margin:0;">${r.position}${r.company ? ', ' + r.company : ''}</p>
          <p style="font-size:11px;color:#666;margin:0;">${[r.email, r.phone].filter(Boolean).join(' | ')}</p>
        </div>`).join('')}` : ''}

      <!-- Custom Sections -->
      ${s.customSections.map(sec => `${banner(sec.title)}
        ${sec.items.map(item => `<div style="margin-bottom:8px;break-inside:avoid;">
          <p style="font-size:12px;font-weight:600;margin:0;">${item.title}</p>
          ${item.subtitle ? `<p style="font-size:11px;color:#444;margin:0;">${item.subtitle}</p>` : ''}
          ${item.date ? `<p style="font-size:11px;color:#666;margin:0;">${item.date}</p>` : ''}
          ${item.description ? `<p style="font-size:11px;color:#333;line-height:1.5;margin:2px 0 0;">${item.description}</p>` : ''}
        </div>`).join('')}`).join('')}
    </div>`;
}

/* ─── PDF SERVICE ─── */
export class PDFService {
  /**
   * Scan the middle 70% of a horizontal pixel row and return true only
   * if every sampled pixel is pure white. This ignores sidebars/accents
   * on the edges and won't be fooled by light background colors (#f9fafb etc).
   */
  private isRowBlank(ctx: CanvasRenderingContext2D, y: number, width: number): boolean {
    // Scan from 40% to 90% — clears sidebars (up to ~30%) and right-edge accents
    const left = Math.floor(width * 0.4);
    const scanWidth = Math.floor(width * 0.5);
    const data = ctx.getImageData(left, y, scanWidth, 1).data;
    // Sample every 8th pixel (stride 32 in RGBA), threshold 253 = only pure white
    for (let i = 0; i < data.length; i += 32) {
      if (data[i] < 253 || data[i + 1] < 253 || data[i + 2] < 253) return false;
    }
    return true;
  }

  /**
   * Near idealY, search backwards for a band of consecutive blank rows
   * (visual gap between content blocks). Returns the Y coordinate of
   * the middle of the first suitable gap found.
   */
  private findWhitespaceBreak(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    idealY: number,
    searchRange: number,
  ): number {
    const minBand = 10; // need a substantial gap (margins between sections are 16-40px at 2x scale)

    // Search backwards from idealY
    let y = Math.min(idealY, height - 1);
    const lowerBound = Math.max(0, idealY - searchRange);

    while (y > lowerBound) {
      if (this.isRowBlank(ctx, y, width)) {
        // Found a blank row — expand to find full band
        let bandEnd = y;
        let bandStart = y;
        while (bandStart > 0 && this.isRowBlank(ctx, bandStart - 1, width)) bandStart--;
        const bandSize = bandEnd - bandStart + 1;
        if (bandSize >= minBand) {
          return bandStart + Math.floor(bandSize / 2); // middle of gap
        }
        y = bandStart - 1; // skip past this small gap
      } else {
        y--;
      }
    }

    // Nothing found backwards — fallback to hard cut at idealY
    return Math.min(idealY, height);
  }

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
      const canvasScale = 2;
      const canvas = await html2canvas(container, {
        scale: canvasScale,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 794,
        windowWidth: 794,
      });

      const fullCtx = canvas.getContext('2d')!;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = 210;
      const pdfHeight = 297;
      const footerMargin = 10;
      const usableHeightMm = pdfHeight - footerMargin;

      const canvasToMm = pdfWidth / canvas.width;
      const pageHeightPx = Math.floor(usableHeightMm / canvasToMm);
      // How far back from the ideal cut to search for whitespace
      const searchRange = Math.floor(pageHeightPx * 0.25);

      // Build page list using pixel scanning
      const pages: Array<{ start: number; end: number }> = [];
      let start = 0;

      while (start < canvas.height) {
        const idealEnd = start + pageHeightPx;

        if (idealEnd >= canvas.height) {
          pages.push({ start, end: canvas.height });
          break;
        }

        const breakY = this.findWhitespaceBreak(fullCtx, canvas.width, canvas.height, idealEnd, searchRange);

        // Progress guard: always advance by at least half a page
        const end = breakY > start + pageHeightPx * 0.5 ? breakY : Math.min(idealEnd, canvas.height);

        pages.push({ start, end });
        start = end;
      }

      // Render each page
      const totalPages = pages.length;
      for (let index = 0; index < totalPages; index++) {
        if (index > 0) pdf.addPage();

        const page = pages[index];
        const segH = Math.max(1, page.end - page.start);

        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = Math.ceil(segH);

        const ctx = pageCanvas.getContext('2d');
        if (!ctx) continue;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        ctx.drawImage(canvas, 0, page.start, canvas.width, segH, 0, 0, canvas.width, segH);

        const segHeightMm = segH * canvasToMm;
        const topMargin = index > 0 ? 8 : 0; // 8mm top margin on continuation pages
        pdf.addImage(pageCanvas.toDataURL('image/png'), 'PNG', 0, topMargin, pdfWidth, segHeightMm);

        // Page number footer
        pdf.setFontSize(8);
        pdf.setTextColor(180, 180, 180);
        pdf.text(`Page ${index + 1} of ${totalPages}`, pdfWidth / 2, pdfHeight - 3, { align: 'center' });
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
