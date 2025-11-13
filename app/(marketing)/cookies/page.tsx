export const metadata = {
  title: 'Cookie Policy | ParkWise',
  description: 'Learn about how ParkWise uses cookies and similar technologies.',
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString('en-GB')}</p>

          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. What Are Cookies?</h2>
              <p>
                Cookies are small text files stored on your device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Cookies</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-3">Essential Cookies</h3>
              <p className="mb-2">These cookies are necessary for the website to function:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Session management</li>
                <li>Security and fraud prevention</li>
                <li>Load balancing</li>
              </ul>
              <p className="text-sm text-gray-600 mt-2">You cannot opt out of essential cookies.</p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Performance Cookies</h3>
              <p className="mb-2">These help us understand how visitors use our site:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Google Analytics - tracks page views and user behavior</li>
                <li>PostHog - product analytics</li>
                <li>Pages visited and time spent</li>
                <li>Devices and browsers used</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Functional Cookies</h3>
              <p className="mb-2">These provide enhanced functionality:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Remembering your preferences</li>
                <li>Saved parks and comparisons</li>
                <li>Form autofill</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Marketing Cookies</h3>
              <p className="mb-2">These track your activity for advertising purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Facebook Pixel - tracks conversions</li>
                <li>Retargeting and remarketing</li>
                <li>Ad performance measurement</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Third-Party Cookies</h2>
              <p className="mb-4">We use services from third parties that may set their own cookies:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Google Analytics:</strong> Website analytics (Learn more at <a href="https://policies.google.com/technologies/cookies" className="text-emerald-600 hover:underline" target="_blank" rel="noopener noreferrer">Google's Cookie Policy</a>)</li>
                <li><strong>PostHog:</strong> Product analytics</li>
                <li><strong>Facebook:</strong> Ad tracking and conversion measurement</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Managing Cookies</h2>
              <p className="mb-4">You can control cookies through:</p>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-3">Browser Settings</h3>
              <p className="mb-2">Most browsers allow you to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>View and delete cookies</li>
                <li>Block third-party cookies</li>
                <li>Block all cookies</li>
                <li>Get notified before cookies are set</li>
              </ul>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <p className="text-sm">
                  <strong>Note:</strong> Blocking all cookies may prevent some features of our website from working properly.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Opt-Out Links</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" className="text-emerald-600 hover:underline" target="_blank" rel="noopener noreferrer">Browser Opt-out</a></li>
                <li>Facebook Ads: <a href="https://www.facebook.com/settings?tab=ads" className="text-emerald-600 hover:underline" target="_blank" rel="noopener noreferrer">Ad Settings</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Contact Us</h2>
              <p className="mb-4">
                If you have questions about our use of cookies, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="mb-2"><strong>Email:</strong> hello@parkwise.co.uk</p>
                <p><strong>Phone:</strong> 0800 123 4567</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
