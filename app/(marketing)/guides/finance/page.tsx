import Link from 'next/link'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calculator, CheckCircle, AlertCircle, HelpCircle, ArrowRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { StructuredData } from '@/components/seo/StructuredData'
import { generateMetadata as genMeta, generateSchema } from '@/lib/seo'

export const metadata: Metadata = genMeta({
  title: 'Static Caravan Finance Guide 2025 | Loans, Deals & Options',
  description: 'Compare static caravan finance options. Dealer finance, personal loans, and secured loans explained. Get the best rates and repayment terms.',
  keywords: ['static caravan finance', 'caravan loans', 'static caravan payment plans', 'caravan finance deals'],
})

// FAQ Data for Schema
const faqs = [
  {
    question: 'What credit score do I need for static caravan finance?',
    answer: 'For the best rates (6.9-9.9% APR), you typically need an excellent credit score of 750+. Good credit (700-749) gets 9.9-12.9% APR, fair credit (650-699) gets 12.9-16.9%, and poor credit (under 650) may get 16.9-24.9% or be declined. Some specialist lenders cater to lower credit scores but charge higher rates.',
  },
  {
    question: 'Can I get finance with bad credit?',
    answer: 'Yes, but it will be more expensive. Options include: specialist bad credit lenders (expect 18-25% APR), dealer finance through parks (may be more flexible), or secured loans against your home (lower rates but higher risk). Consider improving your credit score first, paying off debts, or saving a larger deposit to improve your chances.',
  },
  {
    question: 'How much deposit do I need for static caravan finance?',
    answer: 'Typical deposits range from 10-30% of the caravan price. A 10-15% deposit is minimum for most lenders, 20-30% will get you better interest rates and lower monthly payments. For a £50,000 caravan, expect to pay £5,000-£15,000 upfront. Larger deposits significantly reduce the total interest you\'ll pay over the loan term.',
  },
  {
    question: 'What\'s better - dealer finance or bank loan?',
    answer: 'Bank/personal loans often offer lower interest rates (5-10% APR) if you have good credit, give you stronger negotiating position as cash buyer, and have no dealer markup. Dealer finance offers convenience (one-stop shopping), quick approval, and sometimes special promotional rates. Always compare both options - the best deal depends on your credit score and the specific offers available.',
  },
  {
    question: 'Can I pay off my static caravan loan early?',
    answer: 'Most static caravan loans allow early repayment, but many charge early repayment fees (typically 1-2 months\' interest). Always check the loan agreement before signing. Some lenders offer penalty-free early repayment after a certain period. Calculate whether paying off early saves you money after fees - use our budget calculator to compare scenarios.',
  },
  {
    question: 'How long can I finance a static caravan for?',
    answer: 'Static caravan finance terms typically range from 5-10 years. Shorter terms (5-7 years) mean higher monthly payments but much less interest paid overall. Longer terms (8-10 years) reduce monthly payments but significantly increase total interest. Most lenders won\'t finance beyond the caravan\'s expected lifespan - a 15-year-old caravan might only get a 5-year loan.',
  },
]

export default function FinanceGuidePage() {
  return (
    <>
      <StructuredData data={generateSchema('FAQPage', faqs)} />
      <Breadcrumbs
        items={[
          { name: 'Guides', url: '/guides' },
          { name: 'Finance Guide', url: '/guides/finance' },
        ]}
      />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Static Caravan Finance Guide
              </h1>
              <p className="text-xl text-gray-600">
                Everything you need to know about financing your holiday home
              </p>
            </div>

            <div className="space-y-8">
              {/* Finance Types */}
              <Card>
              <CardHeader>
                <CardTitle>Finance Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">1. Dealer Finance</h3>
                  <p className="text-gray-700 mb-2">
                    Most park operators and dealers offer in-house financing or work with specialist lenders.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-2">Pros:</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>✓ Quick approval process</li>
                        <li>✓ One-stop shopping</li>
                        <li>✓ May include special offers</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-900 mb-2">Cons:</h4>
                      <ul className="text-sm text-red-800 space-y-1">
                        <li>✗ Often higher interest rates</li>
                        <li>✗ Less flexibility in terms</li>
                        <li>✗ May pressure to buy extras</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">2. Personal Loan</h3>
                  <p className="text-gray-700 mb-2">
                    Borrow from banks, building societies, or online lenders.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-2">Pros:</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>✓ Shop around for best rates</li>
                        <li>✓ Better negotiating position</li>
                        <li>✓ No dealer markup</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-900 mb-2">Cons:</h4>
                      <ul className="text-sm text-red-800 space-y-1">
                        <li>✗ Separate application process</li>
                        <li>✗ May require excellent credit</li>
                        <li>✗ Unsecured = higher rates</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">3. Secured Loan</h3>
                  <p className="text-gray-700 mb-2">
                    Borrow against your home or other assets.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-2">Pros:</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>✓ Lower interest rates</li>
                        <li>✓ Larger loan amounts</li>
                        <li>✓ Longer repayment terms</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-900 mb-2">Cons:</h4>
                      <ul className="text-sm text-red-800 space-y-1">
                        <li>✗ Your home is at risk</li>
                        <li>✗ Longer commitment</li>
                        <li>✗ More paperwork</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interest Rates */}
            <Card>
              <CardHeader>
                <CardTitle>Typical Interest Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3">Credit Score</th>
                      <th className="text-right py-3">APR Range</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-3">Excellent (750+)</td>
                      <td className="text-right font-medium text-green-600">6.9% - 9.9%</td>
                    </tr>
                    <tr>
                      <td className="py-3">Good (700-749)</td>
                      <td className="text-right font-medium">9.9% - 12.9%</td>
                    </tr>
                    <tr>
                      <td className="py-3">Fair (650-699)</td>
                      <td className="text-right font-medium">12.9% - 16.9%</td>
                    </tr>
                    <tr>
                      <td className="py-3">Poor (&lt;650)</td>
                      <td className="text-right font-medium text-red-600">16.9% - 24.9%</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-sm text-gray-600 mt-4">
                  Rates vary by lender, loan term, and individual circumstances. Always compare multiple offers.
                </p>
              </CardContent>
            </Card>

            {/* Example Calculation */}
            <Card>
              <CardHeader>
                <CardTitle>Example Monthly Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Based on a £50,000 loan over different terms:
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3">Term</th>
                          <th className="text-right py-3">APR 8%</th>
                          <th className="text-right py-3">APR 12%</th>
                          <th className="text-right py-3">APR 16%</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="py-3">5 years</td>
                          <td className="text-right font-medium">£1,013/month</td>
                          <td className="text-right font-medium">£1,112/month</td>
                          <td className="text-right font-medium">£1,217/month</td>
                        </tr>
                        <tr>
                          <td className="py-3">7 years</td>
                          <td className="text-right font-medium">£749/month</td>
                          <td className="text-right font-medium">£838/month</td>
                          <td className="text-right font-medium">£933/month</td>
                        </tr>
                        <tr>
                          <td className="py-3">10 years</td>
                          <td className="text-right font-medium">£607/month</td>
                          <td className="text-right font-medium">£717/month</td>
                          <td className="text-right font-medium">£833/month</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <Calculator className="h-5 w-5 text-emerald-600 mr-2 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-semibold mb-1">Calculate Your Own</p>
                        <p className="text-gray-700">
                          Use our <Link href="/tools/budget-calculator" className="text-emerald-600 hover:underline">Budget Calculator</Link> to estimate your monthly payments based on your specific situation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Top Tips for Getting the Best Finance Deal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: 'Check your credit score first', desc: 'Know where you stand before applying. Fix any errors on your credit report.' },
                    { title: 'Save a larger deposit', desc: '20-30% deposit typically gets better rates and lower monthly payments.' },
                    { title: 'Shop around', desc: 'Compare at least 3-4 lenders. Don\'t just accept the dealer\'s first offer.' },
                    { title: 'Consider shorter terms', desc: 'Pay less interest overall, even if monthly payments are higher.' },
                    { title: 'Read the fine print', desc: 'Check for early repayment fees, balloon payments, and other hidden costs.' },
                    { title: 'Don\'t borrow for extras', desc: 'Finance the caravan only. Pay cash for furniture, decking, etc.' },
                  ].map((tip, idx) => (
                    <div key={idx} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">{tip.title}</h4>
                        <p className="text-sm text-gray-600">{tip.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Warning */}
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <AlertCircle className="h-6 w-6 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Important Warning</h3>
                    <p className="text-gray-700 mb-2">
                      Static caravans are <strong>depreciating assets</strong>. Unlike property, they lose value over time. Consider:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Don't overextend yourself financially</li>
                      <li>Factor in all running costs, not just the loan payment</li>
                      <li>You may owe more than the caravan is worth if you need to sell early</li>
                      <li>Ensure you can afford payments even if circumstances change</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
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

            {/* CTA */}
            <Card className="bg-gradient-to-br from-emerald-600 to-blue-600 text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Calculate Your Budget?</h3>
                <p className="mb-6 text-emerald-50">
                  Use our free calculators to work out what you can afford
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/tools/budget-calculator">
                    <Button size="lg" variant="secondary">
                      Budget Calculator
                    </Button>
                  </Link>
                  <Link href="/tools/true-cost">
                    <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                      True Cost Calculator
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
