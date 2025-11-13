import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, Users, Target, Zap, CheckCircle, Mail } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants'

export const metadata = {
  title: 'Partner With Us | ParkWise',
  description: 'Join ParkWise as a park operator partner. Access qualified leads, increase bookings, and grow your business.',
}

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Partner With ParkWise
            </h1>
            <p className="text-xl text-emerald-50 mb-8">
              Connect with thousands of qualified buyers actively searching for their perfect static caravan
            </p>
            <a href={`mailto:${CONTACT_INFO.email}?subject=Partnership Inquiry`}>
              <Button size="lg" variant="secondary">
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </Button>
            </a>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Stats */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '10,000+', label: 'Active Buyers' },
              { value: '500+', label: 'Partner Parks' },
              { value: '85%', label: 'Lead Quality' },
              { value: '4.8★', label: 'Avg Rating' },
            ].map((stat, idx) => (
              <Card key={idx}>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* Benefits */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Why Parks Choose ParkWise
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 mr-4 flex-shrink-0">
                      <Target className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Qualified Leads Only</h3>
                      <p className="text-gray-600">
                        Our smart questionnaire pre-qualifies buyers. You get serious prospects who match your park's offering and price range.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 mr-4 flex-shrink-0">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Increased Visibility</h3>
                      <p className="text-gray-600">
                        Featured listings, comparison tools, and smart matching ensure your park gets seen by the right buyers at the right time.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 mr-4 flex-shrink-0">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Buyer Insights</h3>
                      <p className="text-gray-600">
                        Know exactly what buyers are looking for before they contact you. Budget, timeline, features - all pre-qualified.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 mr-4 flex-shrink-0">
                      <Zap className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Performance-Based Pricing</h3>
                      <p className="text-gray-600">
                        Pay per lead or per sale. No upfront costs, no long-term contracts. Only pay when we deliver results.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* How It Works */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              How Partnership Works
            </h2>
            <div className="space-y-6">
              {[
                {
                  step: '1',
                  title: 'List Your Park',
                  desc: 'We create a comprehensive profile showcasing your park, facilities, and available caravans.',
                },
                {
                  step: '2',
                  title: 'Receive Qualified Leads',
                  desc: 'Our algorithm matches buyers to your park based on their preferences. You get warm, qualified leads.',
                },
                {
                  step: '3',
                  title: 'Close More Sales',
                  desc: 'Convert pre-qualified buyers faster. They already know your pitch fees, location, and facilities.',
                },
                {
                  step: '4',
                  title: 'Pay on Results',
                  desc: 'Simple pricing: pay per lead or per completed sale. No hidden fees or long contracts.',
                },
              ].map((item, idx) => (
                <Card key={idx} className="border-l-4 border-l-emerald-600">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white font-bold mr-4 flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Pricing */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Flexible Pricing Models
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-emerald-600">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">Pay Per Lead</h3>
                    <div className="text-4xl font-bold text-emerald-600 mb-2">£50 - £300</div>
                    <p className="text-gray-600">per qualified lead</p>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {[
                      'Only pay for qualified leads',
                      'Full buyer information provided',
                      'Lead scoring included',
                      'Cancel anytime',
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-600">
                    Best for parks with dedicated sales teams who can follow up quickly
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-600">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">Pay Per Sale</h3>
                    <div className="text-4xl font-bold text-blue-600 mb-2">£500 - £2,000</div>
                    <p className="text-gray-600">per completed sale</p>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {[
                      'Zero risk - only pay for results',
                      'Unlimited lead referrals',
                      'Full support included',
                      'Higher quality assurance',
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-600">
                    Best for parks wanting guaranteed ROI with no upfront costs
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Custom packages available for park groups and large operators.{' '}
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-emerald-600 hover:underline">
                  Contact us
                </a>{' '}
                to discuss.
              </p>
            </div>
          </section>

          {/* Testimonials */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              What Our Partners Say
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  quote: "ParkWise sends us better quality leads than any other source. Their questionnaire really filters out time-wasters.",
                  author: "Sarah M.",
                  role: "Sales Manager, South Coast Park",
                },
                {
                  quote: "We've increased caravan sales by 35% since partnering with ParkWise. The ROI is exceptional.",
                  author: "David T.",
                  role: "Owner, Lake District Park",
                },
                {
                  quote: "The buyer insights are invaluable. We know exactly what they want before the first call.",
                  author: "Emma L.",
                  role: "Sales Director, Cornwall Parks Group",
                },
              ].map((item, idx) => (
                <Card key={idx}>
                  <CardContent className="p-6">
                    <p className="text-gray-700 mb-4 italic">"{item.quote}"</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold">{item.author}</p>
                      <p className="text-sm text-gray-600">{item.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section>
            <Card className="bg-gradient-to-br from-emerald-600 to-blue-600 text-white">
              <CardContent className="p-12 text-center">
                <h3 className="text-3xl font-bold mb-4">Ready to Grow Your Business?</h3>
                <p className="text-xl mb-8 text-emerald-50">
                  Join 500+ park operators already benefiting from ParkWise
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href={`mailto:${CONTACT_INFO.email}?subject=Partnership Inquiry`}>
                    <Button size="lg" variant="secondary">
                      <Mail className="mr-2 h-5 w-5" />
                      Start Partnership Discussion
                    </Button>
                  </a>
                  <a href={`tel:${CONTACT_INFO.phone}`}>
                    <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                      Call {CONTACT_INFO.phone}
                    </Button>
                  </a>
                </div>
                <p className="text-sm text-emerald-100 mt-6">
                  No obligation. Let's discuss how ParkWise can help your park grow.
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}
