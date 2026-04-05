import fs from "fs/promises";
import path from "path";

const distDir = path.resolve("dist");
const indexPath = path.join(distDir, "index.html");

const routes = [
  {
    route: "/",
    title: "CVCat - AI-Powered CV Builder | Create Professional Resumes in Minutes",
    description:
      "Create stunning, professional CVs and resumes with CVCat's AI-powered builder. Choose from multiple templates, optimize for ATS, and land your dream job faster.",
    canonical: "https://cvcat.io/",
    body: `
<div id="root"><div class="min-h-screen flex flex-col bg-white"><nav class="bg-white py-3 px-4 md:px-6 border-b border-gray-100 flex justify-between items-center"><div class="flex items-center"><a href="/" class="flex items-center cursor-pointer" aria-label="CVCat home"><img src="/favicon.svg" alt="CVCat" class="h-8 w-8" /><span class="ml-2 text-lg font-bold text-black">CVCat</span></a></div><div class="flex items-center space-x-3"><a href="/auth" class="text-sm text-gray-700 font-medium hover:text-[#DAA520] cursor-pointer">Log in</a><a href="/auth" class="bg-black hover:bg-[#DAA520] text-white text-sm font-medium px-4 py-2 rounded">Get Started</a></div></nav><main class="flex-1"><section class="py-10 px-4 md:px-8 bg-white"><div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10"><div class="md:w-1/2"><span class="inline-flex items-center gap-2 bg-[#DAA520]/10 border border-[#DAA520]/30 px-3 py-1.5 rounded-full mb-4 text-xs font-bold text-[#DAA520]">100% FREE FOREVER</span><h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight">Stop Wrestling With <span class="text-[#DAA520]">Word Documents</span></h1><p class="text-lg mb-6 max-w-lg text-gray-700 leading-relaxed">Your entire career in one place. Update once, export anytime. Let AI handle the polish while you focus on landing that job.</p><ul class="space-y-3 text-sm text-gray-700"><li>AI suggestions to improve your CV and resume content</li><li>One master CV with reusable, ATS-friendly templates</li><li>Actually free exports with no surprise paywall</li></ul><div class="mt-6 flex flex-col sm:flex-row gap-4"><a href="/auth" class="bg-black text-white text-sm font-medium px-4 py-2 rounded">Get Started</a><a href="/team" class="border border-gray-300 text-sm font-medium px-4 py-2 rounded">Meet the Team</a></div></div><div class="md:w-1/2"><div class="rounded-2xl border border-gray-200 bg-gradient-to-b from-white to-gray-50 p-6 shadow-sm"><h2 class="text-2xl font-bold mb-4">Why job seekers use CVCat</h2><div class="space-y-4 text-gray-700"><div><h3 class="font-semibold text-black">AI-powered CV builder</h3><p>Create polished resumes faster with content suggestions and structured editing.</p></div><div><h3 class="font-semibold text-black">ATS-friendly templates</h3><p>Choose from multiple resume templates designed for readability and professional presentation.</p></div><div><h3 class="font-semibold text-black">Update once, export anytime</h3><p>Keep one source of truth for your experience, skills, projects, and education.</p></div></div></div></div></div></section><section class="py-16 px-4 md:px-8 bg-gray-50"><div class="max-w-6xl mx-auto"><h2 class="text-3xl font-bold mb-4">Choose from 9 Premium Templates</h2><p class="text-gray-600 max-w-3xl mb-8">Build a professional CV online, tailor it for the role, and export a clean, recruiter-friendly document without fighting formatting tools.</p><div class="grid md:grid-cols-3 gap-6"><div class="border rounded-xl p-5 bg-white"><h3 class="font-semibold mb-2">Modern</h3><p class="text-sm text-gray-600">Clean and balanced with subtle gold accents.</p></div><div class="border rounded-xl p-5 bg-white"><h3 class="font-semibold mb-2">Creative</h3><p class="text-sm text-gray-600">Expressive and bold for design-forward roles.</p></div><div class="border rounded-xl p-5 bg-white"><h3 class="font-semibold mb-2">Executive</h3><p class="text-sm text-gray-600">Structured and formal for senior leadership roles.</p></div></div></div></section></main><footer class="bg-gray-50 py-8 px-4 md:px-8 mt-auto border-t border-gray-100"><div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"><div class="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6"><a href="/team" class="text-sm text-gray-600">Team</a><a href="/privacy" class="text-sm text-gray-600">Privacy</a><a href="/terms" class="text-sm text-gray-600">Terms</a></div><p class="text-sm text-gray-600">© 2026 CVCat. All rights reserved.</p></div></footer></div></div>
`,
  },
  {
    route: "/team",
    title: "Meet the Team | CVCat",
    description: "Meet the founders behind CVCat and learn about the team building the AI-powered CV builder.",
    canonical: "https://cvcat.io/team",
    body: `
<div id="root"><div class="min-h-screen flex flex-col bg-white"><nav class="bg-white py-3 px-4 md:px-6 border-b border-gray-100 flex justify-between items-center"><div class="flex items-center"><a href="/" class="flex items-center cursor-pointer" aria-label="CVCat home"><img src="/favicon.svg" alt="CVCat" class="h-8 w-8" /><span class="ml-2 text-lg font-bold text-black">CVCat</span></a></div><div class="flex items-center space-x-3"><a href="/auth" class="text-sm text-gray-700 font-medium">Log in</a><a href="/auth" class="bg-black text-white text-sm font-medium px-4 py-2 rounded">Get Started</a></div></nav><main class="flex-1"><div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16"><div class="container mx-auto px-4 max-w-5xl"><div class="text-center mb-16"><h1 class="text-4xl md:text-5xl font-bold mb-3">Meet Our <span class="text-[#DAA520]">Team</span></h1><p class="text-gray-600 max-w-2xl mx-auto">The passionate founders behind CVCat, combining deep experience in backend systems, frontend product design, and full-stack delivery.</p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-10"><article class="bg-white rounded-md shadow-sm border border-gray-100 p-6"><h2 class="text-xl font-bold text-gray-900 mb-1">Sayan Chakrabarti</h2><p class="text-[#DAA520] font-medium text-sm mb-1">Founder & Backend Developer</p><p class="text-gray-700 text-sm leading-relaxed">Loves building systems that scale across databases, APIs, and cloud infrastructure.</p></article><article class="bg-white rounded-md shadow-sm border border-gray-100 p-6"><h2 class="text-xl font-bold text-gray-900 mb-1">Debojyoti Saha</h2><p class="text-[#DAA520] font-medium text-sm mb-1">Founder & Full-Stack Developer</p><p class="text-gray-700 text-sm leading-relaxed">Builds polished product experiences across React, TypeScript, Node.js, and responsive UI systems.</p></article></div></div></div></main><footer class="bg-gray-50 py-8 px-4 md:px-8 mt-auto border-t border-gray-100"><div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"><div class="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6"><a href="/team" class="text-sm text-gray-600">Team</a><a href="/privacy" class="text-sm text-gray-600">Privacy</a><a href="/terms" class="text-sm text-gray-600">Terms</a></div><p class="text-sm text-gray-600">© 2026 CVCat. All rights reserved.</p></div></footer></div></div>
`,
  },
  {
    route: "/privacy",
    title: "Privacy Policy | CVCat",
    description: "Read the CVCat privacy policy covering account data, CV uploads, AI processing, storage, and your rights.",
    canonical: "https://cvcat.io/privacy",
    body: `
<div id="root"><div class="min-h-screen flex flex-col bg-white"><nav class="bg-white py-3 px-4 md:px-6 border-b border-gray-100 flex justify-between items-center"><div class="flex items-center"><a href="/" class="flex items-center cursor-pointer" aria-label="CVCat home"><img src="/favicon.svg" alt="CVCat" class="h-8 w-8" /><span class="ml-2 text-lg font-bold text-black">CVCat</span></a></div><div class="flex items-center space-x-3"><a href="/auth" class="text-sm text-gray-700 font-medium">Log in</a><a href="/auth" class="bg-black text-white text-sm font-medium px-4 py-2 rounded">Get Started</a></div></nav><main class="flex-1"><div class="max-w-3xl mx-auto px-4 py-12 md:py-16"><h1 class="text-3xl font-bold mb-2">Privacy Policy</h1><p class="text-sm text-gray-500 mb-8">Last updated: February 15, 2026</p><div class="prose prose-sm max-w-none text-gray-700 space-y-6"><section><h2 class="text-xl font-semibold text-black mt-8 mb-3">1. Introduction</h2><p>CVCat is committed to protecting your privacy when you use our CV management platform and related services.</p></section><section><h2 class="text-xl font-semibold text-black mt-8 mb-3">2. Information We Collect</h2><p>We collect account information, CV data, uploaded files, job details, usage information, device information, and authentication tokens used for your session.</p></section><section><h2 class="text-xl font-semibold text-black mt-8 mb-3">3. How We Use Your Information</h2><p>We use your information to provide the service, authenticate your account, store your CVs, parse uploaded documents with AI, generate tailored CVs, and improve the platform.</p></section><section><h2 class="text-xl font-semibold text-black mt-8 mb-3">4. Third-Party Services</h2><p>CVCat uses Firebase, Google Gemini AI, AWS S3, and MongoDB Atlas to operate the product.</p></section><section><h2 class="text-xl font-semibold text-black mt-8 mb-3">5. Contact</h2><p>If you have questions about privacy or data practices, email <strong>support@cvcat.io</strong>.</p></section></div></div></main><footer class="bg-gray-50 py-8 px-4 md:px-8 mt-auto border-t border-gray-100"><div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"><div class="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6"><a href="/team" class="text-sm text-gray-600">Team</a><a href="/privacy" class="text-sm text-gray-600">Privacy</a><a href="/terms" class="text-sm text-gray-600">Terms</a></div><p class="text-sm text-gray-600">© 2026 CVCat. All rights reserved.</p></div></footer></div></div>
`,
  },
  {
    route: "/terms",
    title: "Terms of Service | CVCat",
    description: "Read the CVCat terms of service covering account usage, uploads, AI features, and platform restrictions.",
    canonical: "https://cvcat.io/terms",
    body: `
<div id="root"><div class="min-h-screen flex flex-col bg-white"><nav class="bg-white py-3 px-4 md:px-6 border-b border-gray-100 flex justify-between items-center"><div class="flex items-center"><a href="/" class="flex items-center cursor-pointer" aria-label="CVCat home"><img src="/favicon.svg" alt="CVCat" class="h-8 w-8" /><span class="ml-2 text-lg font-bold text-black">CVCat</span></a></div><div class="flex items-center space-x-3"><a href="/auth" class="text-sm text-gray-700 font-medium">Log in</a><a href="/auth" class="bg-black text-white text-sm font-medium px-4 py-2 rounded">Get Started</a></div></nav><main class="flex-1"><div class="max-w-3xl mx-auto px-4 py-12 md:py-16"><h1 class="text-3xl font-bold mb-2">Terms of Service</h1><p class="text-sm text-gray-500 mb-8">Last updated: February 15, 2026</p><div class="prose prose-sm max-w-none text-gray-700 space-y-6"><section><h2 class="text-xl font-semibold text-black mt-8 mb-3">1. Acceptance of Terms</h2><p>By accessing or using CVCat, you agree to be bound by these terms.</p></section><section><h2 class="text-xl font-semibold text-black mt-8 mb-3">2. Description of Service</h2><p>CVCat lets you create, edit, import, preview, tailor, and export CVs from a centralized dashboard.</p></section><section><h2 class="text-xl font-semibold text-black mt-8 mb-3">3. Account Registration</h2><p>You sign in with Google OAuth and are responsible for keeping your account secure.</p></section><section><h2 class="text-xl font-semibold text-black mt-8 mb-3">4. Prohibited Uses</h2><p>You may not use the service for unlawful access, malware uploads, scraping, or platform abuse.</p></section><section><h2 class="text-xl font-semibold text-black mt-8 mb-3">5. Contact</h2><p>If you have questions about these terms, email <strong>support@cvcat.io</strong>.</p></section></div></div></main><footer class="bg-gray-50 py-8 px-4 md:px-8 mt-auto border-t border-gray-100"><div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"><div class="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6"><a href="/team" class="text-sm text-gray-600">Team</a><a href="/privacy" class="text-sm text-gray-600">Privacy</a><a href="/terms" class="text-sm text-gray-600">Terms</a></div><p class="text-sm text-gray-600">© 2026 CVCat. All rights reserved.</p></div></footer></div></div>
`,
  },
];

function upsertMeta(html, selectorPattern, replacement, fallbackBefore = "</head>") {
  const re = new RegExp(selectorPattern, "i");
  if (re.test(html)) return html.replace(re, replacement);
  return html.replace(fallbackBefore, `  ${replacement}\n${fallbackBefore}`);
}

function injectPage(html, route) {
  let out = html;
  out = out.replace(/<title[^>]*>[\s\S]*?<\/title>/i, `<title>${route.title}</title>`);
  out = upsertMeta(out, '<meta[^>]+name="description"[^>]+content="[^"]*"[^>]*>', `<meta name="description" content="${route.description}" />`);
  out = upsertMeta(out, '<meta[^>]+property="og:title"[^>]+content="[^"]*"[^>]*>', `<meta property="og:title" content="${route.title}" />`);
  out = upsertMeta(out, '<meta[^>]+property="og:description"[^>]+content="[^"]*"[^>]*>', `<meta property="og:description" content="${route.description}" />`);
  out = upsertMeta(out, '<meta[^>]+property="og:url"[^>]+content="[^"]*"[^>]*>', `<meta property="og:url" content="${route.canonical}" />`);
  out = upsertMeta(out, '<meta[^>]+property="twitter:title"[^>]+content="[^"]*"[^>]*>', `<meta property="twitter:title" content="${route.title}" />`);
  out = upsertMeta(out, '<meta[^>]+property="twitter:description"[^>]+content="[^"]*"[^>]*>', `<meta property="twitter:description" content="${route.description}" />`);
  out = out.replace(/<link[^>]+rel="canonical"[^>]+href="[^"]*"[^>]*>/i, `<link rel="canonical" href="${route.canonical}" />`);
  out = out.replace(/<div id="root"><\/div>/i, route.body.trim());
  return out;
}

async function ensureRouteFile(route, html) {
  const routeDir = route.route === "/" ? distDir : path.join(distDir, route.route.replace(/^\//, ""));
  await fs.mkdir(routeDir, { recursive: true });
  await fs.writeFile(path.join(routeDir, "index.html"), injectPage(html, route), "utf8");
}

const indexHtml = await fs.readFile(indexPath, "utf8");
for (const route of routes) {
  await ensureRouteFile(route, indexHtml);
}
console.log(`Prerendered ${routes.length} public routes.`);
