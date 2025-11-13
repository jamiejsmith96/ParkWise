import Link from 'next/link'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PoundSterling, TrendingUp, Calculator, AlertCircle, HelpCircle, ArrowRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { StructuredData } from '@/components/seo/StructuredData'
import { generateMetadata as genMeta, generateSchema } from '@/lib/seo'

export const metadata: Metadata = genMeta({
  title: 'Static Caravan Running Costs 2025 | Complete Breakdown',
  description: 'Complete breakdown of static caravan running costs. Site fees, insurance, utilities, and hidden expenses. Calculate your annual costs.',
  keywords: ['static caravan running costs', 'site fees', 'caravan expenses', 'static caravan costs'],
})

// FAQ Data for Schema
const faqs = [
  {
    question: 'What are typical site fees in the UK?',
    answer: 'Site fees (pitch fees) vary significantly by location. South coast and popular areas: £4,000-£5,500 per year. Wales and northern England: £2,500-£3,800 per year. Scotland: £2,500-£3,800 per year. Inland parks: typically £500-£1,000 less than coastal. Site fees usually include ground rent, water, sewage, refuse collection, park maintenance, and access to facilities. Always confirm what is included before purchasing.',
  },
  {
    question: 'Can site fees increase every year?',
    answer: 'Yes, parks can increase site fees annually. Typical increases are 3-8% per year, often linked to RPI (Retail Price Index) plus a percentage. Your pitch agreement should specify how increases are calculated. Some parks cap increases at RPI + 2%, others have no cap. Budget for at least 5% annual increases. Over 10 years, £3,000 site fees could become £4,500-£5,000. Check your contract carefully and factor this into long-term cost planning.',
  },
  {
    question: 'What happens if I can\'t pay site fees?',
    answer: 'Serious consequences: the park can repossess your caravan, you may lose your entire investment, legal fees could be added to your debt, your credit score will be damaged, and you could be sued for unpaid fees. Most parks offer payment plans if you contact them early. Some accept monthly rather than annual payments. If struggling financially, speak to the park manager immediately - they may be able to help before it reaches repossession stage.',
  },
  {
    question: 'Are static caravan running costs tax deductible?',
    answer: 'For personal use: No, running costs are not tax deductible. This includes site fees, insurance, maintenance, and utilities. For business use: If you rent out your caravan commercially, you can claim expenses including site fees, insurance, maintenance, utilities, advertising, and finance interest. You\'ll need proper accounting and must declare rental income. Consult an accountant for specific advice on your situation.',
  },
  {
    question: 'How much are static caravan utilities per year?',
    answer: 'Utilities vary greatly by usage: Light use (6-8 weeks/year): £300-£500 annually for gas, electric, and water. Moderate use (12-16 weeks/year): £500-£800 annually. Heavy use (20+ weeks/year): £800-£1,200 annually. Year-round use: £1,200-£1,800 annually. Gas for heating is the biggest cost. Consider efficient appliances, good insulation, and turning off heating when not in use to minimize costs.',
  },
  {
    question: 'What hidden costs should I budget for?',
    answer: 'Common unexpected expenses: Site fee annual increases (budget 5% rises), major repairs like roof leaks (£500-£3,000), boiler replacement (£800-£1,500), decking replacement every 10-15 years (£3,000-£6,000), white goods replacement (£400-£1,200 each), license renewal fees (£100-£500), park rule changes requiring updates, and emergency fund for unexpected issues. Keep £2,000-£5,000 emergency fund for peace of mind.',
  },
]

export default function RunningCostsGuidePage() {
  return (
    <>
      <StructuredData data={generateSchema('FAQPage', faqs)} />
      <Breadcrumbs
        items={[
          { name: 'Guides', url: '/guides' },
          { name: 'Running Costs', url: '/guides/running-costs' },
        ]}
      />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                <PoundSterling className="h-8 w-8 text-emerald-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Static Caravan Running Costs
              </h1>
              <p className="text-xl text-gray-600">
                The complete guide to ongoing expenses and budgeting
              </p>
            </div>

            <div className="space-y-8">
              {/* Summary Card */}
              <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 border-emerald-200">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Typical Annual Running Costs
                  </h3>
                  <div className="text-4xl font-bold text-emerald-600 mb-4">
                    £4,000 - £8,000
                  </div>
                  <p className="text-gray-700 mb-4">
                    This varies significantly by park, region, and how much you use your caravan
                  </p>
                  <Link href="/tools/true-cost">
                    <Button>
                      <Calculator className="mr-2 h-4 w-4" />
                      Calculate Your Costs
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Mandatory Costs */}
            <Card>
              <CardHeader>
                <CardTitle>Mandatory Annual Costs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">Pitch/Site Fees</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          The biggest ongoing cost. Covers ground rent, park facilities, and services.
                        </p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-xl font-bold text-emerald-600">£2,500 - £5,000</div>
                        <div className="text-sm text-gray-600">per year</div>
                      </div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                      <p className="text-sm text-gray-700">
                        <strong>Regional variation:</strong> South East and popular coastal areas charge premium rates (£4,000-£5,500).
                        Northern parks and inland locations are typically £2,500-£3,500.
                      </p>
                    </div>
                  </div>

                  <div className="border-b pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">Insurance</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Essential protection covering structure, contents, and public liability.
                        </p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-xl font-bold text-emerald-600">£350 - £650</div>
                        <div className="text-sm text-gray-600">per year</div>
                      </div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-3">
                      <p className="text-sm text-gray-700">
                        <strong>Tip:</strong> Shop around! Premiums vary significantly. Consider increasing excess to lower premiums.
                      </p>
                    </div>
                  </div>

                  <div className="border-b pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">Council Tax (if applicable)</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Some parks require council tax payment, others include it in site fees.
                        </p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-xl font-bold text-emerald-600">£800 - £1,500</div>
                        <div className="text-sm text-gray-600">per year (if applicable)</div>
                      </div>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mt-3">
                      <p className="text-sm text-gray-700">
                        <strong>Check before buying:</strong> Ask the park if council tax is payable and if so, which band applies.
                      </p>
                    </div>
                  </div>

                  <div className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">Utilities</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Gas, electricity, and water. Varies greatly based on usage.
                        </p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-xl font-bold text-emerald-600">£300 - £1,200</div>
                        <div className="text-sm text-gray-600">per year</div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 mt-3">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs font-semibold mb-1">Light Usage (6-8 weeks/year)</p>
                        <p className="text-sm text-gray-600">£300 - £500</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs font-semibold mb-1">Heavy Usage (20+ weeks/year)</p>
                        <p className="text-sm text-gray-600">£800 - £1,200</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Regular Maintenance */}
            <Card>
              <CardHeader>
                <CardTitle>Regular Maintenance Costs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { task: 'Annual Gas Safety Check', cost: '£80 - £120', freq: 'Mandatory annual' },
                    { task: 'Boiler Service', cost: '£100 - £150', freq: 'Annual (recommended)' },
                    { task: 'Professional Deep Clean', cost: '£150 - £300', freq: 'Annual' },
                    { task: 'External Cleaning & Sealing', cost: '£200 - £400', freq: 'Every 2 years' },
                    { task: 'Decking Treatment/Staining', cost: '£150 - £350', freq: 'Every 2-3 years' },
                    { task: 'Winterization Service', cost: '£200 - £400', freq: 'Annual (if closing)' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b pb-3">
                      <div>
                        <h5 className="font-medium">{item.task}</h5>
                        <p className="text-xs text-gray-600">{item.freq}</p>
                      </div>
                      <div className="text-right font-semibold">{item.cost}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mt-4">
                  <p className="text-sm font-semibold mb-1">Budget Recommendation</p>
                  <p className="text-sm text-gray-700">
                    Set aside <strong>£300-£800 per year</strong> for routine maintenance. This prevents costly repairs later.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Optional/Variable Costs */}
            <Card>
              <CardHeader>
                <CardTitle>Optional & Variable Costs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { item: 'Park amenities (pool, gym, etc.)', cost: 'Often included', note: 'Some parks charge extra' },
                    { item: 'WiFi/Internet', cost: '£100 - £300/year', note: 'If not included in site fees' },
                    { item: 'Sky/TV license', cost: '£160 - £400/year', note: 'If you watch live TV' },
                    { item: 'Replacement furniture/fixtures', cost: 'Variable', note: 'Budget £200-500/year' },
                    { item: 'Park social events', cost: '£50 - £200/year', note: 'Optional participation' },
                    { item: 'Travel to/from park', cost: 'Variable', note: 'Consider fuel costs' },
                  ].map((item, idx) => (
                    <div key={idx} className="border-b pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h5 className="font-medium">{item.item}</h5>
                          <p className="text-xs text-gray-600">{item.note}</p>
                        </div>
                        <div className="text-right font-semibold text-sm ml-4">{item.cost}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Hidden/Unexpected Costs */}
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                  Hidden & Unexpected Costs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Be prepared for these additional expenses that catch many owners by surprise:
                </p>
                <div className="space-y-3">
                  {[
                    {
                      title: 'Site Fee Increases',
                      desc: 'Parks typically increase site fees by 3-8% annually. Budget for this inflation.',
                    },
                    {
                      title: 'Major Repairs',
                      desc: 'Roof leaks, boiler replacement, window seals. Can cost £500-£3,000+ per incident.',
                    },
                    {
                      title: 'Decking Replacement',
                      desc: 'Timber decking lasts 10-15 years. Full replacement: £3,000-£6,000.',
                    },
                    {
                      title: 'White Goods Replacement',
                      desc: 'Fridge, oven, washing machine. £400-£1,200 each when they fail.',
                    },
                    {
                      title: 'License Renewal Fees',
                      desc: 'Some parks charge when renewing caravan licenses. £100-£500.',
                    },
                    {
                      title: 'Park Rule Changes',
                      desc: 'New requirements (e.g., mandatory inspections) can add unexpected costs.',
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-200 text-yellow-700 font-semibold text-xs mr-3 mt-0.5 flex-shrink-0">
                        !
                      </div>
                      <div>
                        <h5 className="font-semibold">{item.title}</h5>
                        <p className="text-sm text-gray-700">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-white border border-yellow-300 rounded-lg p-4 mt-4">
                  <p className="font-semibold mb-1">Emergency Fund Recommendation</p>
                  <p className="text-sm text-gray-700">
                    Keep an emergency fund of <strong>£2,000-£5,000</strong> for unexpected repairs and costs.
                    This prevents being caught out by surprise expenses.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Cost Comparison by Region */}
            <Card>
              <CardHeader>
                <CardTitle>Regional Cost Variations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3">Region</th>
                        <th className="text-right py-3">Avg Site Fees</th>
                        <th className="text-right py-3">Total Annual Costs</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="py-3">Cornwall/Devon</td>
                        <td className="text-right">£4,200 - £5,500</td>
                        <td className="text-right font-medium">£6,000 - £8,500</td>
                      </tr>
                      <tr>
                        <td className="py-3">South East Coast</td>
                        <td className="text-right">£3,800 - £5,000</td>
                        <td className="text-right font-medium">£5,500 - £7,800</td>
                      </tr>
                      <tr>
                        <td className="py-3">Wales</td>
                        <td className="text-right">£2,800 - £3,800</td>
                        <td className="text-right font-medium">£4,500 - £6,200</td>
                      </tr>
                      <tr>
                        <td className="py-3">North West</td>
                        <td className="text-right">£2,600 - £3,500</td>
                        <td className="text-right font-medium">£4,200 - £5,800</td>
                      </tr>
                      <tr>
                        <td className="py-3">Scotland</td>
                        <td className="text-right">£2,500 - £3,800</td>
                        <td className="text-right font-medium">£4,000 - £6,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Money-Saving Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Ways to Reduce Running Costs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    'Negotiate site fees - some parks offer discounts for upfront annual payment',
                    'Share WiFi with neighbors or use mobile hotspot',
                    'DIY maintenance where possible (cleaning, basic repairs)',
                    'Buy insurance in advance of renewal for better rates',
                    'Close caravan in winter if you don\'t use it to save utilities',
                    'Join park committees for potential fee reductions',
                    'Buy appliances during sales rather than emergency replacements',
                    'Regular maintenance prevents expensive repairs later',
                  ].map((tip, idx) => (
                    <div key={idx} className="flex items-start">
                      <TrendingUp className="h-5 w-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{tip}</span>
                    </div>
                  ))}
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
                <h3 className="text-2xl font-bold mb-4">Calculate Your True Costs</h3>
                <p className="mb-6 text-emerald-50">
                  Use our calculator to estimate total 5-year ownership costs
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/tools/true-cost">
                    <Button size="lg" variant="secondary">
                      <Calculator className="mr-2 h-4 w-4" />
                      True Cost Calculator
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                      Find Low-Cost Parks
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
