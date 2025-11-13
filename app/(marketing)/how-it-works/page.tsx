import Link from 'next/link'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Search, MessageSquare, HandshakeIcon, CheckCircle, ArrowRight, HelpCircle } from 'lucide-react'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { StructuredData } from '@/components/seo/StructuredData'
import { generateMetadata as genMeta, generateSchema } from '@/lib/seo'

export const metadata: Metadata = genMeta({
  title: 'How ParkWise Works | Simple 4-Step Process to Buy a Static Caravan',
  description: 'Learn how ParkWise helps you find and buy the perfect static caravan. Simple 4-step process: tell us what you want, get matched, we connect you, and complete your purchase with support.',
  keywords: ['how parkwise works', 'static caravan buying process', 'find static caravan', 'caravan comparison service'],
})

export default function HowItWorksPage() {
  const faqs = [
    {
      question: 'Is ParkWise really free?',
      answer: 'Yes, 100% free for buyers. We earn a referral fee from parks when you buy, but you never pay us anything. The price you pay for a caravan is the same whether you use ParkWise or contact the park directly.',
    },
    {
      question: 'Do you work with all parks?',
      answer: 'We list parks from all major operators and independents across the UK. If a park exists, we aim to include it in our database. We don\'t play favorites - our matching algorithm prioritizes your needs, not commission rates.',
    },
    {
      question: 'Can I still browse without the questionnaire?',
      answer: 'Absolutely! The questionnaire gives better personalized matches, but you can browse all parks, use our calculators, and compare options freely anytime without answering any questions.',
    },
    {
      question: 'What if I change my mind?',
      answer: 'No pressure, ever. You\'re free to explore, compare, and decide at your own pace. There\'s no obligation to purchase through ParkWise, and you can stop the process at any time.',
    },
    {
      question: 'How long does the process take?',
      answer: 'The questionnaire takes just 2 minutes, and you\'ll see matches instantly. From first search to purchase typically takes 2-6 weeks depending on your timeline, but we work at your pace.',
    },
    {
      question: 'Do you help with financing?',
      answer: 'Yes! We provide guidance on finance options, help you compare rates, and can connect you with lenders. Our finance guide explains all your options from dealer finance to personal loans.',
    },
  ]

  return (
    <div>
      <StructuredData data={generateSchema('FAQPage', faqs)} />
      <Breadcrumbs items={[{ name: 'How It Works', url: '/how-it-works' }]} />
      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-emerald-600 to-blue-600 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How ParkWise Works
              </h1>
              <p className="text-xl text-emerald-50">
                Finding your perfect static caravan is simple with our 4-step process
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-5xl mx-auto">
            {/* Steps */}
            <div className="space-y-12">
              {/* Step 1 */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mb-4">
                    <span className="text-emerald-600 font-bold text-xl">1</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Tell Us What You Want</h2>
                  <p className="text-gray-700 mb-4">
                    Answer a few quick questions about your budget, preferred location, timeline, and must-have features. Our smart questionnaire takes just 2 minutes.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Choose your region and budget range</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Select important park features</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Tell us your timeline and preferences</span>
                    </li>
                  </ul>
                </div>
                <div className="order-1 md:order-2">
                  <Card className="bg-gradient-to-br from-emerald-50 to-blue-50">
                    <CardContent className="p-8 text-center">
                      <Search className="h-20 w-20 text-emerald-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Quick Questionnaire</h3>
                      <p className="text-gray-600">2 minutes • 5 questions</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Step 2 */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
                    <CardContent className="p-8 text-center">
                      <MessageSquare className="h-20 w-20 text-purple-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
                      <p className="text-gray-600">Instant personalized results</p>
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                    <span className="text-purple-600 font-bold text-xl">2</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Matched with Parks</h2>
                  <p className="text-gray-700 mb-4">
                    Our algorithm instantly matches you with parks that fit your criteria. We score each match based on your specific needs, not commission rates.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>See parks ranked by your preferences</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Compare features side-by-side</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Use our calculators to understand true costs</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 3 */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                    <span className="text-blue-600 font-bold text-xl">3</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">We Connect You</h2>
                  <p className="text-gray-700 mb-4">
                    When you're ready, we introduce you to your top matches. Our team pre-qualifies you to park operators, giving you negotiating power.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Direct introduction to park sales teams</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Schedule viewings at multiple parks</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Get exclusive deals we've negotiated</span>
                    </li>
                  </ul>
                </div>
                <div className="order-1 md:order-2">
                  <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
                    <CardContent className="p-8 text-center">
                      <HandshakeIcon className="h-20 w-20 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Personal Introduction</h3>
                      <p className="text-gray-600">Warm handoff to parks</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Step 4 */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardContent className="p-8 text-center">
                      <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Buy with Confidence</h3>
                      <p className="text-gray-600">Ongoing support included</p>
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                    <span className="text-green-600 font-bold text-xl">4</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Your Purchase</h2>
                  <p className="text-gray-700 mb-4">
                    We stay with you through the buying process. Get help with negotiations, paperwork, and financing. We're here until you get the keys.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Negotiation tips and support</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Finance comparison and advice</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Help understanding contracts</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <section className="mt-20">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Common Questions</h2>
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
            <section className="mt-16">
              <Card className="bg-gradient-to-br from-emerald-600 to-blue-600 text-white">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                  <p className="mb-6 text-emerald-50">
                    Answer 5 quick questions and we'll find your perfect match
                  </p>
                  <Link href="/">
                    <Button size="lg" variant="secondary">
                      Start Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
