import Layout from "@/components/Layout";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: February 15, 2026</p>

        <div className="prose prose-sm max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-black mt-8 mb-3">1. Introduction</h2>
            <p>
              CVCat ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our CV management platform, including our website and services (collectively, the "Service").
            </p>
            <p>
              By using the Service, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mt-8 mb-3">2. Information We Collect</h2>

            <h3 className="text-base font-medium text-black mt-4 mb-2">2.1 Information You Provide</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Account Information:</strong> When you sign in using Google OAuth, we receive your name, email address, and Google profile identifier.</li>
              <li><strong>CV Data:</strong> Personal information, work experience, education, skills, projects, certifications, languages, references, publications, and any custom sections you add to your CV.</li>
              <li><strong>Uploaded Files:</strong> PDF, Word, or text documents you upload for CV import and parsing.</li>
              <li><strong>Job Details:</strong> Job titles, descriptions, and company names you provide when tailoring a CV.</li>
            </ul>

            <h3 className="text-base font-medium text-black mt-4 mb-2">2.2 Information Collected Automatically</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Usage Data:</strong> Pages visited, features used, and interactions within the Service.</li>
              <li><strong>Device Information:</strong> Browser type, operating system, and screen resolution.</li>
              <li><strong>Authentication Tokens:</strong> JSON Web Tokens (JWT) stored in your browser's local storage for session management.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mt-8 mb-3">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide, operate, and maintain the Service.</li>
              <li>Authenticate your identity and manage your account.</li>
              <li>Store and manage your CVs and related data.</li>
              <li>Parse uploaded documents using AI to extract CV content.</li>
              <li>Generate tailored CVs based on job descriptions you provide.</li>
              <li>Render and export your CV as PDF in your chosen template.</li>
              <li>Improve and optimize the Service.</li>
              <li>Communicate with you regarding your account or the Service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mt-8 mb-3">4. AI Processing</h2>
            <p>
              When you upload a CV for import, the document is sent to Google Gemini AI for parsing and content extraction. The AI processes your file to extract structured data (name, experience, education, skills, etc.) and returns it in a structured format. We do not use your CV data to train AI models.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mt-8 mb-3">5. Data Storage & Security</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Database:</strong> Your CV data and account information are stored in MongoDB.</li>
              <li><strong>File Storage:</strong> Uploaded CV files are stored in Amazon Web Services (AWS) S3 with access controls.</li>
              <li><strong>Authentication:</strong> We use Firebase for Google OAuth verification and issue custom JWT tokens for API authorization. Tokens expire after 24 hours.</li>
              <li><strong>Encryption:</strong> All data in transit is encrypted using HTTPS/TLS.</li>
            </ul>
            <p>
              While we implement commercially reasonable security measures, no method of electronic storage or transmission is 100% secure. We cannot guarantee absolute security of your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mt-8 mb-3">6. Third-Party Services</h2>
            <p>We use the following third-party services to operate the platform:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Google Firebase:</strong> Authentication (Google sign-in).</li>
              <li><strong>Google Gemini AI:</strong> CV document parsing and content extraction.</li>
              <li><strong>Amazon Web Services (S3):</strong> File storage for uploaded documents.</li>
              <li><strong>MongoDB Atlas:</strong> Database hosting for user and CV data.</li>
            </ul>
            <p>
              Each of these services has its own privacy policy governing how they handle your data. We recommend reviewing their respective policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mt-8 mb-3">7. Data Retention</h2>
            <p>
              We retain your account data and CVs for as long as your account is active. You may delete individual CVs at any time through the CV Management page. If you wish to delete your entire account and all associated data, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mt-8 mb-3">8. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your data.</li>
              <li>Export your CV data.</li>
              <li>Object to or restrict certain processing of your data.</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at the email address provided below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mt-8 mb-3">9. Cookies & Local Storage</h2>
            <p>
              We use browser local storage to persist your authentication session (JWT token and user profile). We do not use tracking cookies. The PDF generation feature renders content entirely in your browser and does not transmit your CV data to any external service for that purpose.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mt-8 mb-3">10. Children's Privacy</h2>
            <p>
              The Service is not intended for individuals under the age of 16. We do not knowingly collect personal information from children. If we learn that we have collected data from a child under 16, we will take steps to delete that information promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mt-8 mb-3">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Last updated" date at the top of this page. Continued use of the Service after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-black mt-8 mb-3">12. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
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
