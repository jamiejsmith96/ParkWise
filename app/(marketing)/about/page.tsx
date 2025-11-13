import Link from 'next/link'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Shield, Users, TrendingUp, Heart, CheckCircle, Award, Target, Lightbulb } from 'lucide-react'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { StructuredData } from '@/components/seo/StructuredData'
import { generateMetadata as genMeta } from '@/lib/seo'

export const metadata: Metadata = genMeta({
  title: 'About ParkWise | UK\'s Independent Static Caravan Comparison',
  description: 'Learn about ParkWise - the UK\'s first truly independent static caravan comparison service. Our mission, values, and commitment to helping buyers find their perfect holiday home.',
  keywords: ['about parkwise', 'static caravan comparison', 'independent caravan advice', 'caravan buying service'],
})

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ParkWise',
  description: 'Independent static caravan comparison service helping buyers find the perfect holiday home across the UK',
  url: 'https://parkwise.co.uk',
  foundingDate: '2024',
  areaServed: 'United Kingdom',
  knowsAbout: ['Static Caravans', 'Holiday Homes', 'Caravan Parks', 'Caravan Finance'],
}

export default function AboutPage() {
  return (
    <div>
      <StructuredData data={organizationSchema} />
      <Breadcrumbs items={[{ name: 'About', url: '/about' }]} />
      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-emerald-600 to-blue-600 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About ParkWise
              </h1>
              <p className="text-xl text-emerald-50">
                We're on a mission to make static caravan buying transparent, fair, and stress-free for everyone across the UK.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Our Story */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700">
                  ParkWise was founded by a team of industry experts who saw a gap in the market.
                  Buying a static caravan should be exciting, not overwhelming. Yet too many buyers
                  struggled to compare parks, understand true costs, and get independent advice.
                </p>
                <p className="text-gray-700">
                  We built ParkWise to change that. As the UK's first truly independent comparison
                  service, we help thousands of buyers find their perfect holiday home every year.
                  We're not owned by park operators, we don't favor certain brands, and we always
                  put your interests first.
                </p>
              </div>
            </section>

            {/* Mission & Values */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">What We Stand For</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 mr-4 flex-shrink-0">
                        <Shield className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">100% Independent</h3>
                        <p className="text-gray-600">
                          We're not owned by park operators or manufacturers. Our advice is unbiased and focused solely on your needs.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 mr-4 flex-shrink-0">
                        <Heart className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Buyer First</h3>
                        <p className="text-gray-600">
                          Every decision we make starts with one question: "Is this best for the buyer?" Your success is our success.
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
                        <h3 className="text-xl font-semibold mb-2">Transparency</h3>
                        <p className="text-gray-600">
                          No hidden fees, no surprises. We're clear about how we make money and how our service works.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 mr-4 flex-shrink-0">
                        <TrendingUp className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                        <p className="text-gray-600">
                          We use technology to make buying easier - from smart matching to cost calculators to instant comparisons.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Our Expertise */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Expertise</h2>
              <p className="text-gray-700 text-center max-w-3xl mx-auto mb-8">
                Our team combines decades of industry experience with modern technology to deliver the best caravan buying experience in the UK.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 mx-auto mb-4">
                      <Award className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Industry Veterans</h3>
                    <p className="text-gray-600">
                      Our team includes former park operators, sales directors, and caravan industry professionals with 50+ years combined experience.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 mx-auto mb-4">
                      <Target className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Market Knowledge</h3>
                    <p className="text-gray-600">
                      We track 500+ parks across the UK, monitoring pricing trends, facilities, and owner satisfaction to provide accurate recommendations.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 mx-auto mb-4">
                      <Lightbulb className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Tech Innovation</h3>
                    <p className="text-gray-600">
                      Our proprietary matching algorithm and cost calculators are built by engineers who understand both data and the caravan market.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* How We're Different */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How We're Different</h2>
              <Card>
                <CardContent className="p-8">
                  <div className="space-y-4">
                    {[
                      {
                        title: 'We don\'t sell caravans',
                        desc: 'We connect you with parks and provide information. This keeps us neutral and focused on your needs.',
                      },
                      {
                        title: 'Free for buyers, always',
                        desc: 'You never pay to use ParkWise. We earn a referral fee from parks when you buy, but this never affects our recommendations.',
                      },
                      {
                        title: 'Comprehensive coverage',
                        desc: 'We list parks from all operators, not just those who pay us. If it exists, we\'ll show it to you.',
                      },
                      {
                        title: 'Expert guidance',
                        desc: 'Our team includes industry veterans who\'ve been in the static caravan business for decades.',
                      },
                      {
                        title: 'Tools that actually help',
                        desc: 'Budget calculators, true cost estimators, and comparison tools that give you real insights.',
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-lg">{item.title}</h4>
                          <p className="text-gray-600">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Stats */}
            <section className="bg-gradient-to-br from-emerald-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Impact</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">500+</div>
                  <div className="text-emerald-100">Parks Listed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">10,000+</div>
                  <div className="text-emerald-100">Happy Buyers</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">£2M+</div>
                  <div className="text-emerald-100">Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">4.8★</div>
                  <div className="text-emerald-100">Average Rating</div>
                </div>
              </div>
            </section>

            {/* How We Make Money */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How We Make Money</h2>
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-4">
                    <strong>Transparency is important to us.</strong> Here's how our business works:
                  </p>
                  <div className="space-y-3 text-gray-700">
                    <p>
                      ✓ We earn a referral fee from park operators when you make a purchase through our service
                    </p>
                    <p>
                      ✓ The fee varies (typically £50-300 per lead or £500-2,000 per completed sale)
                    </p>
                    <p>
                      ✓ This <strong>never</strong> affects the price you pay - parks set their own prices
                    </p>
                    <p>
                      ✓ We list parks that don't pay us, ensuring comprehensive coverage
                    </p>
                    <p>
                      ✓ Our matching algorithm prioritizes your needs, not commission rates
                    </p>
                  </div>
                  <div className="bg-white border border-blue-300 rounded-lg p-4 mt-4">
                    <p className="text-sm font-semibold">
                      Bottom line: We only succeed when you find the right caravan at a fair price.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* CTA */}
            <section>
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
                  <p className="mb-6 text-gray-300">
                    Join thousands of buyers who've found their perfect caravan with ParkWise
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/">
                      <Button size="lg" variant="secondary">
                        Get Started
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                        Contact Us
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
