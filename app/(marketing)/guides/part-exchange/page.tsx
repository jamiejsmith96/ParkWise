import Link from 'next/link'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RefreshCw, CheckCircle, XCircle, Calculator, HelpCircle, ArrowRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { StructuredData } from '@/components/seo/StructuredData'
import { generateMetadata as genMeta, generateSchema } from '@/lib/seo'

export const metadata: Metadata = genMeta({
  title: 'Static Caravan Part Exchange | Ultimate Guide 2025',
  description: 'How to part exchange your static caravan. Valuation tips, maximizing trade-in value, and what affects caravan prices. Expert guidance.',
  keywords: ['static caravan part exchange', 'trade in static caravan', 'caravan valuation', 'sell static caravan'],
})

// FAQ Data for Schema
const faqs = [
  {
    question: 'How is part exchange value calculated?',
    answer: 'Part exchange value is based on several factors: age and condition of your caravan, current market demand, location and desirability of the park, quality of fixtures and fittings, any upgrades or improvements made, and comparison to similar caravans for sale. Dealers typically offer 10-20% less than private sale prices because they need to make a profit when reselling and factor in reconditioning costs.',
  },
  {
    question: 'Should I part exchange or sell privately?',
    answer: 'Part exchange is best if: you value convenience over maximum money, your caravan is in average condition, you don\'t want the hassle of advertising and viewings, or the dealer offers a fair price. Sell privately if: you have time and patience, your caravan is in excellent condition, the part exchange offer is very low, or you could get £3,000-£5,000+ more privately. Consider that private sales can take 2-6 months.',
  },
  {
    question: 'Can I part exchange a caravan with damp?',
    answer: 'Yes, but the value will be significantly reduced. Minor damp might reduce value by £2,000-£5,000. Major damp issues could reduce value by £5,000-£10,000+ or make it unsellable. Some dealers won\'t accept caravans with serious damp. Be honest about damp - dealers will inspect thoroughly. Getting professional damp treatment before part exchange might increase value more than it costs.',
  },
  {
    question: 'Do I pay tax on part exchange?',
    answer: 'No, in the UK there is no capital gains tax or VAT payable on part-exchanging a static caravan used for personal holidays. You only pay tax on the difference between your part exchange value and the new caravan price. For example: if your £30,000 trade-in is worth £30,000 and your new caravan costs £70,000, you only pay £40,000. This is one advantage over selling privately then buying separately.',
  },
  {
    question: 'How can I maximize my part exchange value?',
    answer: 'Deep clean inside and out (professional valet recommended), fix minor issues (broken handles, cracked seals, scuffed walls), provide all service records and gas certificates, time it right (spring/summer is peak demand), get multiple dealer valuations to compare, negotiate new caravan price separately from trade-in value, and present your caravan well - first impressions matter significantly.',
  },
]

export default function PartExchangeGuidePage() {
  return (
    <>
      <StructuredData data={generateSchema('FAQPage', faqs)} />
      <Breadcrumbs
        items={[
          { name: 'Guides', url: '/guides' },
          { name: 'Part Exchange', url: '/guides/part-exchange' },
        ]}
      />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                <RefreshCw className="h-8 w-8 text-emerald-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Part Exchange Guide
              </h1>
              <p className="text-xl text-gray-600">
                Trade in your current caravan towards a new one
              </p>
            </div>

            <div className="space-y-8">
              {/* How it Works */}
              <Card>
              <CardHeader>
                <CardTitle>How Part Exchange Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Part exchange allows you to trade in your current static caravan as part payment towards a new or newer model. The dealer values your old caravan and deducts this from the price of your new one.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mb-3">
                      <span className="text-emerald-600 font-bold">1</span>
                    </div>
                    <h4 className="font-semibold mb-2">Valuation</h4>
                    <p className="text-sm text-gray-600">
                      Dealer inspects and values your current caravan
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mb-3">
                      <span className="text-emerald-600 font-bold">2</span>
                    </div>
                    <h4 className="font-semibold mb-2">Negotiation</h4>
                    <p className="text-sm text-gray-600">
                      Agree on trade-in value and new caravan price
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mb-3">
                      <span className="text-emerald-600 font-bold">3</span>
                    </div>
                    <h4 className="font-semibold mb-2">Complete</h4>
                    <p className="text-sm text-gray-600">
                      Pay the difference and move into your new home
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pros and Cons */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Advantages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      'Convenient one-stop process',
                      'No need to advertise and sell privately',
                      'Immediate certainty of value',
                      'Reduces cash needed upfront',
                      'Dealer handles removal and disposal',
                      'Can be included in finance deal',
                    ].map((item) => (
                      <li key={item} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <XCircle className="h-5 w-5 text-red-600 mr-2" />
                    Disadvantages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      'Usually lower than private sale value',
                      'Dealer needs to make profit on resale',
                      'Less negotiating power',
                      'Limited to caravans dealer can resell',
                      'May push you to buy more expensive model',
                      'Trade-in value often negotiable',
                    ].map((item) => (
                      <li key={item} className="flex items-start">
                        <XCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Valuation Factors */}
            <Card>
              <CardHeader>
                <CardTitle>What Affects Your Trade-In Value?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Positive Factors</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Well-maintained interior and exterior</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Recent upgrades (decking, heating, etc.)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Popular make and model</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Located on desirable park</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Included furnishings and appliances</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Good pitch location</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Negative Factors</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">✗</span>
                        <span>Visible wear and damage</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">✗</span>
                        <span>Outdated fixtures and fittings</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">✗</span>
                        <span>Approaching end of park license</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">✗</span>
                        <span>High site fees</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">✗</span>
                        <span>Damp or structural issues</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">✗</span>
                        <span>Poor pitch location</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Typical Values */}
            <Card>
              <CardHeader>
                <CardTitle>Typical Part Exchange Values</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Part exchange values are typically 10-20% lower than private sale prices. Here's what you might expect:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3">Age</th>
                        <th className="text-right py-3">Private Sale</th>
                        <th className="text-right py-3">Part Exchange</th>
                        <th className="text-right py-3">Difference</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="py-3">2-3 years</td>
                        <td className="text-right">£45,000</td>
                        <td className="text-right font-medium">£38,000 - £40,000</td>
                        <td className="text-right text-red-600">-£5-7k</td>
                      </tr>
                      <tr>
                        <td className="py-3">5-7 years</td>
                        <td className="text-right">£32,000</td>
                        <td className="text-right font-medium">£26,000 - £29,000</td>
                        <td className="text-right text-red-600">-£3-6k</td>
                      </tr>
                      <tr>
                        <td className="py-3">8-10 years</td>
                        <td className="text-right">£22,000</td>
                        <td className="text-right font-medium">£17,000 - £20,000</td>
                        <td className="text-right text-red-600">-£2-5k</td>
                      </tr>
                      <tr>
                        <td className="py-3">10+ years</td>
                        <td className="text-right">£15,000</td>
                        <td className="text-right font-medium">£11,000 - £13,000</td>
                        <td className="text-right text-red-600">-£2-4k</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <div className="flex items-start">
                    <Calculator className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold mb-1">Get an Estimate</p>
                      <p className="text-gray-700">
                        Use our <Link href="/tools/valuation" className="text-blue-600 hover:underline">Valuation Tool</Link> to get an estimated value for your caravan.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Top Tips for Maximizing Your Trade-In Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Clean and present well',
                      desc: 'Deep clean inside and out. First impressions matter. A £200 professional valet could add £1,000 to your valuation.',
                    },
                    {
                      title: 'Make minor repairs',
                      desc: 'Fix obvious issues like broken fixtures, cracked windows, or damaged seals. Small investments yield big returns.',
                    },
                    {
                      title: 'Get multiple valuations',
                      desc: 'Visit at least 2-3 dealers. Trade-in values can vary significantly between parks.',
                    },
                    {
                      title: 'Know your caravan\'s worth',
                      desc: 'Research similar caravans for sale privately. This gives you leverage in negotiations.',
                    },
                    {
                      title: 'Timing matters',
                      desc: 'Spring and early summer are peak buying times. Dealers may offer more when stock is needed.',
                    },
                    {
                      title: 'Negotiate separately',
                      desc: 'Agree on your new caravan price first, then negotiate the trade-in value separately.',
                    },
                    {
                      title: 'Document everything',
                      desc: 'Receipts for improvements, gas certificates, and maintenance records add value.',
                    },
                    {
                      title: 'Consider selling privately',
                      desc: 'If the trade-in offer is very low, selling privately might be worth the extra effort.',
                    },
                  ].map((tip, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-semibold text-sm mr-3 mt-0.5 flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold">{tip.title}</h4>
                        <p className="text-sm text-gray-600">{tip.desc}</p>
                      </div>
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
                <h3 className="text-2xl font-bold mb-4">Ready to Upgrade?</h3>
                <p className="mb-6 text-emerald-50">
                  Find parks that accept part-exchange and get matched with your ideal new caravan
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/">
                    <Button size="lg" variant="secondary">
                      Start Questionnaire
                    </Button>
                  </Link>
                  <Link href="/tools/valuation">
                    <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                      Value My Caravan
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
