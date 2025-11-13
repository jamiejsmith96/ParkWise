import Link from 'next/link'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, AlertTriangle, ArrowRight, HelpCircle } from 'lucide-react'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { StructuredData } from '@/components/seo/StructuredData'
import { generateMetadata as genMeta, generateSchema } from '@/lib/seo'

export const metadata: Metadata = genMeta({
  title: 'Static Caravan Buyers Guide 2025 | Complete Guide',
  description: 'Complete guide to buying a static caravan in 2025. Learn about costs, financing, running expenses, and how to choose the perfect park. Expert advice.',
  keywords: ['buy static caravan', 'static caravan buyers guide', 'how to buy static caravan', 'static caravan advice'],
})

// FAQ Data for Schema
const faqs = [
  {
    question: 'How much does it cost to buy a static caravan?',
    answer: 'Static caravan prices range from £10,000 for older pre-owned models to £150,000+ for luxury new caravans. Budget buyers typically spend £25,000-£45,000, mid-range buyers £45,000-£70,000, and luxury buyers £80,000-£150,000. Additional costs include delivery (£1,500-£3,000), decking (£2,000-£5,000), and connection fees (£500-£1,000).',
  },
  {
    question: 'What are the annual running costs of a static caravan?',
    answer: 'Annual running costs typically range from £4,000-£8,000 per year. This includes pitch/site fees (£2,500-£5,000), insurance (£350-£600), utilities (£500-£1,200), and maintenance (£300-£800). Some parks also charge council tax (£800-£1,500) depending on location.',
  },
  {
    question: 'Can I live in a static caravan permanently?',
    answer: 'No, you cannot live permanently in a static caravan on a holiday park. Most holiday parks have seasonal licenses (typically 10-11 months). However, you can live permanently in a static caravan on residential parks, which are specifically licensed for permanent occupation.',
  },
  {
    question: 'How long does a static caravan last?',
    answer: 'With proper maintenance, a static caravan typically lasts 15-25 years. The lifespan depends on build quality, weather conditions, and maintenance. Modern caravans with residential specification can last 20-25 years, while budget models may only last 12-15 years. Regular servicing and winterization extend the lifespan significantly.',
  },
  {
    question: 'Should I buy a new or used static caravan?',
    answer: 'New caravans offer warranties, modern features, and 20+ year lifespan, but cost £50,000-£150,000. Used caravans (5-10 years old) cost £25,000-£45,000 and offer better value, but check for dampness and structural issues. Consider your budget, planned usage frequency, and whether you want latest features.',
  },
  {
    question: 'What are site fees and what do they include?',
    answer: 'Site fees (or pitch fees) are annual charges paid to the park owner, typically £2,500-£5,000 per year. They usually include ground rent, water supply, sewage disposal, refuse collection, park maintenance, and access to facilities like swimming pools and clubhouses. Some parks include electricity, while others charge separately.',
  },
  {
    question: 'Can I get finance to buy a static caravan?',
    answer: 'Yes, most buyers use finance. Options include dealer finance (6-12% APR, 7-10 year terms), personal loans from banks (5-10% APR), or secured loans if you own property. Typical deposits are 10-20%. Some parks offer finance packages. Always compare rates and check the total cost including interest.',
  },
  {
    question: 'Do static caravans depreciate in value?',
    answer: 'Yes, static caravans depreciate similarly to cars. New caravans lose 10-15% in the first year, then 5-10% annually. After 10 years, a caravan may be worth 30-40% of original value. However, well-maintained caravans in premium locations may hold value better. Static caravans are not typically considered investments.',
  },
]

export default function BuyersGuidePage() {
  return (
    <>
      <StructuredData data={generateSchema('FAQPage', faqs)} />
      <Breadcrumbs
        items={[
          { name: 'Guides', url: '/guides' },
          { name: 'Buyers Guide', url: '/guides/buyers-guide' },
        ]}
      />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Complete Static Caravan Buyers Guide
              </h1>
              <p className="text-xl text-gray-600">
                Everything you need to know before buying your holiday home
              </p>
            </div>

            {/* Quick Start */}
            <Card className="mb-8 border-emerald-200 bg-emerald-50">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">New to static caravans?</h3>
                    <p className="text-gray-700 mb-4">
                      Start with our quick questionnaire to get personalized park recommendations based on your budget and preferences.
                    </p>
                    <Link href="/">
                      <Button>
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Table of Contents */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>In This Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    'What is a Static Caravan?',
                    'Initial Purchase Costs',
                    'Running Costs & Fees',
                    'Financing Options',
                    'Choosing the Right Park',
                    'New vs Pre-Owned',
                    'Part Exchange Process',
                    'Legal Considerations',
                    'Common Mistakes to Avoid',
                    'Next Steps',
                  ].map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-emerald-600 hover:text-emerald-700 hover:underline"
                    >
                      {item}
                    </a>
                  ))}
                </nav>
              </CardContent>
            </Card>

            {/* Content Sections */}
            <div className="space-y-12">
              {/* What is a Static Caravan */}
              <section id="what-is-a-static-caravan">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">What is a Static Caravan?</h2>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <p className="text-gray-700">
                      A static caravan (also called a holiday home or lodge) is a prefabricated structure designed for seasonal or holiday use. Unlike touring caravans, static caravans are permanently sited on licensed holiday parks.
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Key Features:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Typically 35-45 feet long by 12-14 feet wide</li>
                        <li>1-3 bedrooms with full kitchen and bathroom</li>
                        <li>Central heating and double glazing</li>
                        <li>Lifespan of 15-25 years with proper maintenance</li>
                        <li>Cannot be used as a permanent residence (except on residential parks)</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Initial Purchase Costs */}
              <section id="initial-purchase-costs">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Initial Purchase Costs</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3">Category</th>
                            <th className="text-right py-3">Price Range</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr>
                            <td className="py-3">Pre-owned (10+ years)</td>
                            <td className="text-right font-medium">£10,000 - £25,000</td>
                          </tr>
                          <tr>
                            <td className="py-3">Pre-owned (5-10 years)</td>
                            <td className="text-right font-medium">£25,000 - £45,000</td>
                          </tr>
                          <tr>
                            <td className="py-3">Nearly new (1-5 years)</td>
                            <td className="text-right font-medium">£45,000 - £70,000</td>
                          </tr>
                          <tr>
                            <td className="py-3">Brand new (standard)</td>
                            <td className="text-right font-medium">£50,000 - £80,000</td>
                          </tr>
                          <tr>
                            <td className="py-3">Brand new (luxury)</td>
                            <td className="text-right font-medium">£80,000 - £150,000+</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-1">Additional Costs to Consider:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                            <li>Delivery and siting: £1,500 - £3,000</li>
                            <li>Decking and steps: £2,000 - £5,000</li>
                            <li>Gas and electrical connection: £500 - £1,000</li>
                            <li>Furniture package (if not included): £2,000 - £5,000</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Running Costs */}
              <section id="running-costs-&-fees">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Running Costs & Fees</h2>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <p className="text-gray-700">
                    Annual costs vary significantly by park and region. Budget carefully for these ongoing expenses:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold mb-3">Annual Costs</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>Pitch/Site Fees</span>
                          <span className="font-medium">£2,500 - £5,000</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Insurance</span>
                          <span className="font-medium">£350 - £600</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Council Tax (if applicable)</span>
                          <span className="font-medium">£800 - £1,500</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Utilities (gas/electric)</span>
                          <span className="font-medium">£500 - £1,200</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Maintenance/Repairs</span>
                          <span className="font-medium">£300 - £800</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold mb-3">One-off Costs</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>Annual gas safety check</span>
                          <span className="font-medium">£80 - £120</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Winterization service</span>
                          <span className="font-medium">£200 - £400</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Decking maintenance</span>
                          <span className="font-medium">£200 - £500</span>
                        </li>
                        <li className="flex justify-between">
                          <span>External cleaning/sealing</span>
                          <span className="font-medium">£150 - £300</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mt-4">
                    <p className="text-sm font-medium">
                      <strong>Typical Total Annual Cost: £4,000 - £8,000</strong>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Use our <Link href="/tools/true-cost" className="text-emerald-600 hover:underline">True Cost Calculator</Link> to estimate your specific running costs.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Financing Options */}
            <section id="financing-options">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Financing Options</h2>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Cash Purchase</h4>
                      <p className="text-sm text-gray-600 mb-3">Pay in full upfront</p>
                      <div className="text-xs space-y-1">
                        <p className="text-green-600">✓ No interest charges</p>
                        <p className="text-green-600">✓ Stronger negotiating position</p>
                        <p className="text-red-600">✗ Large upfront cost</p>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Finance Loan</h4>
                      <p className="text-sm text-gray-600 mb-3">7-10 year terms typical</p>
                      <div className="text-xs space-y-1">
                        <p className="text-green-600">✓ Spread the cost</p>
                        <p className="text-green-600">✓ Keep savings intact</p>
                        <p className="text-red-600">✗ Interest 6-15% APR</p>
                        <p className="text-red-600">✗ Credit check required</p>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Part Exchange</h4>
                      <p className="text-sm text-gray-600 mb-3">Trade in your current caravan</p>
                      <div className="text-xs space-y-1">
                        <p className="text-green-600">✓ Reduces cash needed</p>
                        <p className="text-green-600">✓ No selling hassle</p>
                        <p className="text-red-600">✗ May get less than private sale</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Learn more: <Link href="/guides/finance" className="text-emerald-600 hover:underline">Finance Guide</Link> |
                    <Link href="/guides/part-exchange" className="text-emerald-600 hover:underline ml-2">Part Exchange Guide</Link>
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* FAQ Section */}
            <section id="frequently-asked-questions">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {faqs.map((faq, index) => (
                      <details
                        key={index}
                        className="group border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
                      >
                        <summary className="cursor-pointer list-none">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <HelpCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                              <h3 className="font-semibold text-gray-900 group-open:text-emerald-600 transition-colors">
                                {faq.question}
                              </h3>
                            </div>
                            <ArrowRight className="h-5 w-5 text-gray-400 transform group-open:rotate-90 transition-transform flex-shrink-0 mt-0.5" />
                          </div>
                        </summary>
                        <div className="mt-3 ml-8 text-gray-700 leading-relaxed">
                          {faq.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* CTA */}
            <Card className="bg-gradient-to-br from-emerald-600 to-blue-600 text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Find Your Perfect Caravan?</h3>
                <p className="mb-6 text-emerald-50">
                  Answer a few questions and we'll match you with the best parks for your needs
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/">
                    <Button size="lg" variant="secondary">
                      Start Questionnaire
                    </Button>
                  </Link>
                  <Link href="/parks">
                    <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                      Browse Parks
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
