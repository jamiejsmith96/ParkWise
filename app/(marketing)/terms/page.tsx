export const metadata = {
  title: 'Terms of Service | ParkWise',
  description: 'ParkWise terms of service. Read our terms and conditions for using our comparison service.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString('en-GB')}</p>

          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing or using ParkWise, you agree to be bound by these Terms of Service and our Privacy Policy. 
                If you do not agree, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Our Service</h2>
              <p>ParkWise provides:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Comparison of static caravan parks across the UK</li>
                <li>Matching services to connect buyers with suitable parks</li>
                <li>Calculators and tools to estimate costs</li>
                <li>Information and guidance about buying static caravans</li>
              </ul>
              <p className="mt-4">
                <strong>We are not:</strong> Estate agents, financial advisors, or sellers of caravans. 
                We provide information and introductions only.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
              <p>You agree to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Provide accurate and truthful information</li>
                <li>Use our services only for lawful purposes</li>
                <li>Not impersonate others or provide false information</li>
                <li>Conduct your own due diligence before making any purchase</li>
                <li>Not use our site to spam, harass, or abuse others</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Disclaimer of Warranties</h2>
              <p>
                Our service is provided "as is" without warranties of any kind. We do not guarantee:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>The accuracy or completeness of park information</li>
                <li>That you will find a suitable caravan</li>
                <li>The quality or condition of any caravan or park</li>
                <li>Uninterrupted or error-free service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Limitation of Liability</h2>
              <p>
                ParkWise is not liable for any direct, indirect, incidental, or consequential damages arising from:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Use or inability to use our services</li>
                <li>Decisions made based on our information</li>
                <li>Transactions with park operators</li>
                <li>Errors or omissions in our content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Third-Party Services</h2>
              <p>
                When you contact park operators through our service, you enter into a direct relationship with them. 
                We are not party to these transactions and have no liability for the quality, timing, or fulfillment of any purchase.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property</h2>
              <p>
                All content on ParkWise (text, graphics, logos, software) is our property or licensed to us. 
                You may not copy, reproduce, or distribute our content without permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Information</h2>
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
