import { FaFileContract } from "react-icons/fa";

export default function TermsOfServicePage() {
  const lastUpdated = "June 15, 2023";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaFileContract className="inline-block text-5xl mb-4" />
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Please read these terms and conditions carefully before using our service.
          </p>
          <p className="mt-4 text-blue-100">Last Updated: {lastUpdated}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="prose prose-lg max-w-none">
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using QA Flow&apos;s platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>

            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily use QA Flow&apos;s platform for personal, educational, or commercial purposes, subject to the following restrictions:
            </p>
            <ul>
              <li>You must not modify or copy the materials outside of normal platform usage</li>
              <li>You must not use the materials for any commercial purpose outside the scope of your subscription</li>
              <li>You must not attempt to decompile or reverse engineer any software contained on QA Flow&apos;s platform</li>
              <li>You must not remove any copyright or other proprietary notations from the materials</li>
              <li>You must not transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>

            <h2>3. Accounts</h2>
            <p>
              When you create an account with us, you must provide accurate, complete, and up-to-date information. You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.
            </p>
            <p>
              You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
            </p>

            <h2>4. Subscriptions</h2>
            <p>
              Some parts of the service are billed on a subscription basis. You will be billed in advance on a recurring basis, depending on the type of subscription plan you select.
            </p>
            <p>
              At the end of each billing period, your subscription will automatically renew under the same conditions unless you cancel it or QA Flow cancels it. You may cancel your subscription either through your online account management or by contacting our customer support team.
            </p>

            <h2>5. Content</h2>
            <p>
              Our service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post to the service, including its legality, reliability, and appropriateness.
            </p>
            <p>
              By posting content to the service, you grant us the right to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the service. You retain any and all of your rights to any content you submit, post or display on or through the service and you are responsible for protecting those rights.
            </p>

            <h2>6. Prohibited Uses</h2>
            <p>You agree not to use the Service:</p>
            <ul>
              <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation</li>
              <li>To impersonate or attempt to impersonate QA Flow, a QA Flow employee, another user, or any other person or entity</li>
              <li>To engage in any other conduct that restricts or inhibits anyone&apos;s use or enjoyment of the Service, or which may harm QA Flow or users of the Service</li>
            </ul>

            <h2>7. Intellectual Property</h2>
            <p>
              The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of QA Flow and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
            </p>
            <p>
              Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of QA Flow.
            </p>

            <h2>8. Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
            <p>
              Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or contact us to delete your account.
            </p>

            <h2>9. Limitation of Liability</h2>
            <p>
              In no event shall QA Flow, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>

            <h2>10. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>Email: legal@qaflow.com</p>
            <p>Mail: QA Flow, 123 Testing Street, rancisco, CA 94103</p>
          </div>
        </div>

        {/* Contact Box */}
        <div className="bg-blue-50 rounded-lg shadow-md p-6 mt-8 text-center">
          <h3 className="text-xl font-bold mb-3 text-gray-800">Questions about our terms?</h3>
          <p className="text-gray-600 mb-6">
            If you have any questions about our terms of service, please don&apos;t hesitate to reach out.
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
} 