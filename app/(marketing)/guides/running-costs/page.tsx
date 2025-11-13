import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PoundSterling, TrendingUp, Calculator, AlertCircle } from 'lucide-react'

export const metadata = {
  title: 'Running Costs Guide | ParkWise',
  description: 'Complete breakdown of static caravan running costs. Annual fees, maintenance, utilities, and hidden expenses explained.',
}

export default function RunningCostsGuidePage() {
  return (
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
  )
}
