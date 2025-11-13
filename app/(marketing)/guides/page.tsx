import Link from 'next/link'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, BookOpen, Calculator, RefreshCw, PiggyBank } from 'lucide-react'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { generateMetadata as genMeta } from '@/lib/seo'

export const metadata: Metadata = genMeta({
  title: 'Static Caravan Guides | Complete Resources for Buyers 2025',
  description: 'Comprehensive guides for buying a static caravan. Learn about costs, financing, part exchange, running expenses, and making the right choice.',
  keywords: ['static caravan guides', 'caravan buying guide', 'static caravan advice', 'holiday home guides'],
})

const guides = [
  {
    title: 'Complete Buyers Guide',
    description: 'Everything you need to know before buying your first static caravan. From understanding what a static caravan is to making your final purchase decision.',
    icon: BookOpen,
    href: '/guides/buyers-guide',
    topics: [
      'What is a static caravan?',
      'Initial purchase costs',
      'Choosing the right park',
      'New vs pre-owned caravans',
      'Legal considerations',
      'Common mistakes to avoid',
    ],
    readTime: '15 min read',
  },
  {
    title: 'Finance Guide',
    description: 'Compare static caravan financing options including dealer finance, personal loans, and secured loans. Understand APR rates, terms, and how to get the best deal.',
    icon: PiggyBank,
    href: '/guides/finance',
    topics: [
      'Dealer finance vs bank loans',
      'Typical interest rates (6-15% APR)',
      'Loan terms and deposits',
      'Credit score requirements',
      'How to compare finance deals',
      'Early repayment options',
    ],
    readTime: '10 min read',
  },
  {
    title: 'Part Exchange Guide',
    description: 'Learn how to part exchange your current static caravan for a new one. Understand valuations, negotiations, and whether part exchange is right for you.',
    icon: RefreshCw,
    href: '/guides/part-exchange',
    topics: [
      'How part exchange works',
      'Valuation process',
      'Part exchange vs private sale',
      'Dealing with caravans that have damp',
      'Maximizing your trade-in value',
      'Tax implications',
    ],
    readTime: '8 min read',
  },
  {
    title: 'Running Costs Guide',
    description: 'Detailed breakdown of annual static caravan running costs. Budget accurately for site fees, insurance, utilities, maintenance, and hidden costs.',
    icon: Calculator,
    href: '/guides/running-costs',
    topics: [
      'Annual site/pitch fees (£2,500-£5,000)',
      'Insurance costs',
      'Utilities and council tax',
      'Maintenance and repairs',
      'Hidden costs to watch for',
      'Cost-saving tips',
    ],
    readTime: '10 min read',
  },
]

export default function GuidesPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Guides', url: '/guides' },
        ]}
      />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Static Caravan Guides
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Expert guides to help you make informed decisions about buying, financing, and owning a static caravan. Everything you need to know in one place.
              </p>
            </div>

            {/* Quick Start CTA */}
            <Card className="mb-12 border-emerald-200 bg-emerald-50">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-center md:text-left">
                    <h3 className="font-semibold text-lg mb-2">Ready to start your search?</h3>
                    <p className="text-gray-700">
                      Answer a few questions and we'll match you with the best parks for your needs.
                    </p>
                  </div>
                  <Link href="/">
                    <Button size="lg" className="whitespace-nowrap">
                      Start Questionnaire
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Guides Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {guides.map((guide) => {
                const Icon = guide.icon
                return (
                  <Card key={guide.href} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start gap-3 mb-2">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                          <Icon className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-1">{guide.title}</CardTitle>
                          <p className="text-sm text-gray-500">{guide.readTime}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{guide.description}</p>
                      <div className="mb-6">
                        <h4 className="font-semibold text-sm mb-3 text-gray-900">What you'll learn:</h4>
                        <ul className="space-y-2">
                          {guide.topics.map((topic, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-700">
                              <span className="text-emerald-600 mr-2 flex-shrink-0">✓</span>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Link href={guide.href}>
                        <Button className="w-full">
                          Read Guide
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Additional Resources */}
            <Card className="bg-gray-100">
              <CardHeader>
                <CardTitle>Looking for More Resources?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Tools & Calculators</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Use our True Cost Calculator to estimate your total ownership costs.
                    </p>
                    <Link href="/tools/true-cost" className="text-emerald-600 hover:underline text-sm font-medium">
                      Try Calculator →
                    </Link>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Find Parks</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Browse holiday parks by location and find your perfect spot.
                    </p>
                    <Link href="/parks" className="text-emerald-600 hover:underline text-sm font-medium">
                      Browse Parks →
                    </Link>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">About ParkWise</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Learn how ParkWise helps you find the perfect static caravan park.
                    </p>
                    <Link href="/about" className="text-emerald-600 hover:underline text-sm font-medium">
                      Learn More →
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
