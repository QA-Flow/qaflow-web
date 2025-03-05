import { FaShieldAlt } from "react-icons/fa";

export default function PrivacyPolicyPage() {
  const lastUpdated = "June 15, 2023";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaShieldAlt className="inline-block text-5xl mb-4" />
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We respect your privacy and are committed to protecting your personal data. 
            This privacy policy explains how we collect, use, and safeguard your information.
          </p>
          <p className="mt-4 text-blue-100">Last Updated: {lastUpdated}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="prose prose-lg max-w-none">
            <h2>1. Introduction</h2>
            <p>
              At QA Flow, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We collect information that you provide directly to us when you:</p>
            <ul>
              <li>Register for an account</li>
              <li>Use our services</li>
              <li>Participate in surveys or promotions</li>
              <li>Contact customer support</li>
              <li>Apply for a job</li>
            </ul>

            <p>This information may include:</p>
            <ul>
              <li>Name and contact details</li>
              <li>Billing information</li>
              <li>User credentials</li>
              <li>Profile information</li>
              <li>Usage data and preferences</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices, updates, and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Develop new products and services</li>
              <li>Monitor and analyze trends and usage</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              <li>Personalize your experience</li>
            </ul>

            <h2>4. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our platform and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>

            <h2>5. Information Sharing and Disclosure</h2>
            <p>We may share your information in the following situations:</p>
            <ul>
              <li>With third-party service providers to facilitate our services</li>
              <li>To comply with legal obligations</li>
              <li>To protect and defend our rights and property</li>
              <li>With business partners with your consent</li>
              <li>With your consent or at your direction</li>
            </ul>

            <h2>6. Data Security</h2>
            <p>
              We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please note that no electronic transmission or storage of information can be guaranteed to be 100% secure.
            </p>

            <h2>7. Your Data Protection Rights</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul>
              <li>Right to access the personal data we hold about you</li>
              <li>Right to request correction of your personal data</li>
              <li>Right to request deletion of your personal data</li>
              <li>Right to object to processing of your personal data</li>
              <li>Right to data portability</li>
              <li>Right to withdraw consent</li>
            </ul>

            <h2>8. Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal data from children under 18. If we become aware that we have collected personal data from a child under 18, we will take steps to delete such information.
            </p>

            <h2>9. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this policy.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>Email: support@qaflow.com</p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg shadow-md p-6 mt-8 text-center">
          <h3 className="text-xl font-bold mb-3 text-gray-800">Have questions about our privacy policy?</h3>
          <p className="text-gray-600 mb-6">
            Our team is here to help you understand how we protect your data.
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