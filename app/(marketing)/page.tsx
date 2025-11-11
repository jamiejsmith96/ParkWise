import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Calculator, Search, TrendingUp, Shield, CheckCircle } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 to-blue-50 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Find Your Perfect
              <span className="text-emerald-600"> Static Caravan</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Compare holiday parks across the UK. Independent advice, best deals,
              and expert guidance to help you find your dream caravan.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/parks">
                <Button size="lg" className="w-full sm:w-auto">
                  <Search className="mr-2 h-5 w-5" />
                  Browse Parks
                </Button>
              </Link>
              <Link href="/tools/budget-calculator">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Calculator className="mr-2 h-5 w-5" />
                  Budget Calculator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose ParkWise?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Independent comparison site trusted by thousands of buyers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 mb-4">
                  <Shield className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle>100% Independent</CardTitle>
                <CardDescription>
                  Unbiased advice and comparisons. We're not owned by any park operator.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 mb-4">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>UK-Wide Coverage</CardTitle>
                <CardDescription>
                  Compare parks across all UK regions. From Cornwall to Scotland.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 mb-4">
                  <Calculator className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Smart Calculators</CardTitle>
                <CardDescription>
                  Budget, true cost, and valuation tools to make informed decisions.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600">
              Find your perfect caravan in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Search & Compare</h3>
              <p className="text-gray-600">
                Browse parks, use our calculators, and compare your favorites side-by-side.
              </p>
            </div>

            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Matched</h3>
              <p className="text-gray-600">
                Tell us your preferences and budget. We'll connect you with the best parks.
              </p>
            </div>

            <div className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Book & Save</h3>
              <p className="text-gray-600">
                Arrange viewings and get exclusive deals. We help negotiate the best price.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-emerald-100">Holiday Parks</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-emerald-100">Caravans Listed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">£2M+</div>
              <div className="text-emerald-100">Saved by Buyers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8★</div>
              <div className="text-emerald-100">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Find Your Perfect Caravan?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Start your search today and discover the best holiday parks across the UK
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/parks">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Searching
                </Button>
              </Link>
              <Link href="/guides/buyers-guide">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Read Buyer's Guide
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              What We Offer
            </h2>
            <div className="space-y-4">
              {[
                'Free, independent comparison of all UK holiday parks',
                'Budget calculators to understand true costs',
                'Part-exchange valuation service',
                'Finance comparison and pre-approval',
                'Expert guides and buying advice',
                'Exclusive deals and negotiation support',
                'No hidden fees - free for buyers',
              ].map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
