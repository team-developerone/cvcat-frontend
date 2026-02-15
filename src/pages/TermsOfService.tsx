import Layout from "@/components/Layout";

export default function TermsOfService() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: February 15, 2026</p>

        <div className="prose prose-sm max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-black mt-8 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using CVCat ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Service. These Terms apply to all visitors, users, and others who access the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mt-8 mb-3">2. Description of Service</h2>
            <p>
              CVCat is a web-based CV/resume management platform that allows you to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Create and edit CVs using a structured form interface.</li>
              <li>Import existing CVs from PDF, Word, or text files using AI-powered parsing.</li>
              <li>Preview your CV in multiple professionally designed templates.</li>
              <li>Export and download your CV as a PDF document.</li>
              <li>Tailor your CV for specific job descriptions.</li>
              <li>Manage multiple CV versions from a centralized dashboard.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mt-8 mb-3">3. Account Registration</h2>
            <p>
              To use the Service, you must sign in using a Google account through our Google OAuth integration. By signing in, you authorize us to access your basic Google profile information (name and email address) for the purpose of creating and managing your account.
            </p>
            <p>
              You are responsible for maintaining the security of your Google account and for all activities that occur under your CVCat account. You must notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mt-8 mb-3">4. User Content</h2>

            <h3 className="text-base font-medium text-black mt-4 mb-2">4.1 Ownership</h3>
            <p>
              You retain full ownership of all content you create, upload, or store through the Service, including CV data, uploaded documents, and any information you provide ("User Content"). We do not claim any ownership rights over your User Content.
            </p>

            <h3 className="text-base font-medium text-black mt-4 mb-2">4.2 License to Us</h3>
            <p>
              By submitting User Content, you grant us a limited, non-exclusive, royalty-free license to use, store, process, and display your User Content solely for the purpose of providing and improving the Service. This license terminates when you delete your User Content or your account.
            </p>

            <h3 className="text-base font-medium text-black mt-4 mb-2">4.3 Your Responsibilities</h3>
            <p>You agree that your User Content will not:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Contain false or misleading information intended to deceive.</li>
              <li>Infringe on the intellectual property rights of any third party.</li>
              <li>Contain malicious code, viruses, or harmful content.</li>
              <li>Violate any applicable law or regulation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mt-8 mb-3">5. AI-Powered Features</h2>
            <p>
              The Service uses artificial intelligence (Google Gemini) to parse uploaded CV documents and extract structured data. You acknowledge and agree that:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>AI parsing may not be 100% accurate. You are responsible for reviewing and correcting any parsed content before saving or exporting your CV.</li>
              <li>Uploaded documents are transmitted to Google's AI services for processing. Google's terms and privacy policies apply to such processing.</li>
              <li>We do not use your CV data to train AI models.</li>
              <li>AI-generated suggestions or content should be reviewed for accuracy and appropriateness before use.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mt-8 mb-3">6. File Uploads</h2>
            <p>When uploading files to the Service, you agree to the following:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Accepted formats:</strong> PDF, DOC, DOCX, and TXT files only.</li>
              <li><strong>Maximum file size:</strong> 10MB per upload.</li>
              <li>You have the right to upload the document and its contents.</li>
              <li>Uploaded files are stored securely on AWS S3 and are accessible only to you through your authenticated session.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mt-8 mb-3">7. PDF Export</h2>
            <p>
              The PDF generation feature operates entirely within your browser. Your CV data is rendered into an HTML template, captured as an image, and converted to PDF locally. No CV data is transmitted to external servers for this purpose.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mt-8 mb-3">8. Prohibited Uses</h2>
            <p>You agree not to use the Service to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Attempt to gain unauthorized access to any part of the Service or its systems.</li>
              <li>Reverse-engineer, decompile, or disassemble any part of the Service.</li>
              <li>Use the Service for any unlawful purpose.</li>
              <li>Upload files containing malware, viruses, or other harmful content.</li>
              <li>Scrape, crawl, or otherwise extract data from the Service through automated means.</li>
              <li>Interfere with or disrupt the Service or its infrastructure.</li>
              <li>Create multiple accounts for the purpose of circumventing restrictions.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mt-8 mb-3">9. Service Availability</h2>
            <p>
              We strive to maintain the availability of the Service but do not guarantee uninterrupted access. The Service may be temporarily unavailable due to maintenance, updates, or circumstances beyond our control. We are not liable for any loss or damage resulting from Service downtime.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mt-8 mb-3">10. Intellectual Property</h2>
            <p>
              The Service, including its design, code, templates, logos, and other materials (excluding User Content), is the property of CVCat and is protected by intellectual property laws. The CV templates provided through the Service are licensed for your personal, non-commercial use in generating your own CVs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mt-8 mb-3">11. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p>
              We do not warrant that:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The Service will meet your specific requirements.</li>
              <li>The Service will be uninterrupted, timely, secure, or error-free.</li>
              <li>AI-parsed CV content will be accurate or complete.</li>
              <li>PDF exports will render identically across all devices and platforms.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mt-8 mb-3">12. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, CVCAT AND ITS TEAM MEMBERS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF DATA, LOSS OF PROFITS, OR LOSS OF EMPLOYMENT OPPORTUNITIES ARISING OUT OF YOUR USE OF THE SERVICE.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mt-8 mb-3">13. Termination</h2>
            <p>
              We may suspend or terminate your access to the Service at any time, with or without cause, and with or without notice. Upon termination, your right to use the Service ceases immediately. You may also stop using the Service at any time. Provisions that by their nature should survive termination shall remain in effect.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mt-8 mb-3">14. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective when posted on this page with an updated "Last updated" date. Your continued use of the Service after any changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mt-8 mb-3">15. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles. Any disputes arising from these Terms or the Service shall be resolved through good-faith negotiation or, if necessary, through binding arbitration.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mt-8 mb-3">16. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> support@cvcat.io
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
