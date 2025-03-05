import { FaCookieBite } from "react-icons/fa";

export default function CookiePolicyPage() {
  const lastUpdated = "June 15, 2023";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaCookieBite className="inline-block text-5xl mb-4" />
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Learn how and why we use cookies and similar technologies on our platform.
          </p>
          <p className="mt-4 text-blue-100">Last Updated: {lastUpdated}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="prose prose-lg max-w-none">
            <h2>1. What Are Cookies?</h2>
            <p>
              Cookies are small pieces of text sent to your browser when you visit our website. They serve a variety of functions, like enabling us to remember certain information about your session and preferences, enhancing your browsing experience, and helping us to improve our service.
            </p>

            <h2>2. Types of Cookies We Use</h2>
            <p>We use the following types of cookies on our website:</p>
            
            <h3>Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account authentication. You may disable these by changing your browser settings, but this may affect how the website functions.
            </p>
            
            <h3>Performance and Analytics Cookies</h3>
            <p>
              These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.
            </p>
            
            <h3>Functionality Cookies</h3>
            <p>
              These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
            </p>
            
            <h3>Targeting/Advertising Cookies</h3>
            <p>
              These cookies are used to deliver advertisements more relevant to you and your interests. They are also used to limit the number of times you see an advertisement as well as help measure the effectiveness of the advertising campaign.
            </p>

            <h2>3. Cookie Management</h2>
            <p>
              Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.allaboutcookies.org" className="text-blue-600 hover:underline">www.allaboutcookies.org</a>.
            </p>
            <p>You can manage your cookie preferences in various ways, depending on your browser:</p>
            <ul>
              <li><strong>Chrome:</strong> Settings &gt; Privacy and security &gt; Cookies and other site data</li>
              <li><strong>Firefox:</strong> Options &gt; Privacy & Security &gt; Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Cookies and website data</li>
              <li><strong>Edge:</strong> Settings &gt; Cookies and site permissions &gt; Cookies</li>
            </ul>
            <p>
              Please note that restricting cookies may impact your experience on our website, as some features may not function properly.
            </p>

            <h2>4. Third-Party Cookies</h2>
            <p>
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and so on. These cookies may be placed when you visit our website or when you open emails from us, and are sometimes used to track when you have opened or clicked on a link in an email.
            </p>
            <p>
              Third-party providers we use may include Google Analytics, HubSpot, Intercom, and social media platforms for sharing and engagement.
            </p>

            <h2>5. Specific Cookies We Use</h2>
            <table className="border-collapse border border-gray-200 w-full mb-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Provider</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Purpose</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Expiry</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">session_id</td>
                  <td className="border border-gray-300 px-4 py-2">qaflow.com</td>
                  <td className="border border-gray-300 px-4 py-2">Authentication and session management</td>
                  <td className="border border-gray-300 px-4 py-2">Session</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">_ga</td>
                  <td className="border border-gray-300 px-4 py-2">Google Analytics</td>
                  <td className="border border-gray-300 px-4 py-2">Usage statistics</td>
                  <td className="border border-gray-300 px-4 py-2">2 years</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">_gid</td>
                  <td className="border border-gray-300 px-4 py-2">Google Analytics</td>
                  <td className="border border-gray-300 px-4 py-2">Usage statistics</td>
                  <td className="border border-gray-300 px-4 py-2">24 hours</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">preference</td>
                  <td className="border border-gray-300 px-4 py-2">qaflow.com</td>
                  <td className="border border-gray-300 px-4 py-2">User preferences</td>
                  <td className="border border-gray-300 px-4 py-2">1 year</td>
                </tr>
              </tbody>
            </table>

            <h2>6. Changes to This Cookie Policy</h2>
            <p>
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last Updated" date at the top of this policy.
            </p>
            <p>
              We encourage you to review this Cookie Policy periodically to stay informed about our use of cookies.
            </p>

            <h2>7. Contact Us</h2>
            <p>
              If you have any questions about our Cookie Policy, please contact us at:
            </p>
            <p>Email: support@qaflow.com</p>
          </div>
        </div>
      </div>
    </div>
  );
} 