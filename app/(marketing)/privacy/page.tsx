export const metadata = {
  title: 'Privacy Policy | ParkWise',
  description: 'ParkWise privacy policy. Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString('en-GB')}</p>

          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Introduction</h2>
            <p className="mb-4">
              ParkWise ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.1 Information You Provide</h3>
            <p className="mb-4">We collect information that you voluntarily provide to us:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Contact information (name, email address, phone number)</li>
              <li>Preferences and requirements (budget, location, timeline, features)</li>
              <li>Communications with us</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.2 Automatically Collected Information</h3>
            <p className="mb-4">When you use our website, we automatically collect:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Device information (browser type, operating system)</li>
              <li>Usage data (pages viewed, time spent, clicks)</li>
              <li>IP address and general location</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Match you with suitable holiday parks</li>
              <li>Communicate with you about our services</li>
              <li>Connect you with park operators</li>
              <li>Improve our website and services</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Comply with legal obligations</li>
              <li>Prevent fraud and ensure security</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Sharing Your Information</h2>
            <p className="mb-4">We may share your information with:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Park Operators:</strong> We share your contact information and preferences with parks you're matched with or express interest in</li>
              <li><strong>Service Providers:</strong> Third-party companies that help us operate our business (hosting, analytics, email services)</li>
              <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, sale, or other business transaction</li>
            </ul>
            <p className="mb-4">
              <strong>We never sell your personal information to third parties.</strong>
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Cookies and Tracking</h2>
            <p className="mb-4">
              We use cookies and similar technologies to enhance your experience. You can control cookies through your browser settings. For more information, see our <a href="/cookies" className="text-emerald-600 hover:underline">Cookie Policy</a>.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Your Rights</h2>
            <p className="mb-4">Under UK GDPR, you have the right to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
              <li><strong>Erasure:</strong> Request deletion of your data</li>
              <li><strong>Restriction:</strong> Limit how we use your data</li>
              <li><strong>Portability:</strong> Receive your data in a structured format</li>
              <li><strong>Object:</strong> Object to processing of your data</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent at any time</li>
            </ul>
            <p className="mb-4">
              To exercise these rights, contact us at hello@parkwise.co.uk
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Data Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Data Retention</h2>
            <p className="mb-4">
              We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Typically, we retain data for:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Active leads: Until you make a purchase or request deletion</li>
              <li>Marketing data: Until you unsubscribe</li>
              <li>Transaction records: 7 years (for tax and legal purposes)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Children's Privacy</h2>
            <p className="mb-4">
              Our services are not directed to children under 18. We do not knowingly collect information from children under 18.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Third-Party Links</h2>
            <p className="mb-4">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of these websites.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated date.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">12. Contact Us</h2>
            <p className="mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="mb-2"><strong>Email:</strong> hello@parkwise.co.uk</p>
              <p className="mb-2"><strong>Phone:</strong> 0800 123 4567</p>
              <p><strong>Mail:</strong> ParkWise, Data Protection Officer, [Address]</p>
            </div>

            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm">
                <strong>Information Commissioner's Office (ICO):</strong> You have the right to lodge a complaint with the ICO if you believe we have not handled your data properly. Visit <a href="https://ico.org.uk" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">ico.org.uk</a> for more information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
