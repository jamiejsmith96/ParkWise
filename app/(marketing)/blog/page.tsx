import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, ArrowRight } from 'lucide-react'
import { generateMetadata as genMeta } from '@/lib/seo'

export const metadata: Metadata = genMeta({
  title: 'Static Caravan Blog | Expert Guides & Tips',
  description: 'Expert guides, tips, and advice on buying static caravans. Latest news, comparison guides, and money-saving tips for static caravan buyers.',
  keywords: ['static caravan blog', 'caravan buying tips', 'holiday park guides', 'static caravan advice'],
})

// Blog posts would come from MDX files or a CMS
// For now, using static data - replace with dynamic content later
const blogPosts = [
  {
    slug: 'best-static-caravan-parks-uk-2025',
    title: 'Top 10 Static Caravan Parks UK 2025 - Expert Comparison',
    excerpt: 'Our experts have reviewed hundreds of parks across the UK. Here are the top 10 static caravan parks for 2025, based on value, facilities, and location.',
    category: 'Guides',
    date: '2025-01-15',
    author: 'ParkWise Editorial Team',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7',
  },
  {
    slug: 'cheap-static-caravans-buying-guide',
    title: 'How to Find Cheap Static Caravans: Complete Guide',
    excerpt: 'Looking for a bargain? Learn where to find cheap static caravans, what to look for, and how to avoid common pitfalls when buying budget-friendly options.',
    category: 'Buying Guides',
    date: '2025-01-12',
    author: 'Sarah Mitchell',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
  },
  {
    slug: 'static-caravan-running-costs-2025',
    title: 'Static Caravan Running Costs 2025: Complete Breakdown',
    excerpt: 'What does it really cost to own a static caravan? We break down site fees, insurance, utilities, and hidden costs you need to budget for.',
    category: 'Finance',
    date: '2025-01-10',
    author: 'James Parker',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4',
  },
  {
    slug: 'cornwall-vs-devon-static-caravans',
    title: 'Cornwall vs Devon for Static Caravans: Which is Better?',
    excerpt: 'Comparing the two most popular regions for static caravans. Site fees, weather, beaches, and attractions compared.',
    category: 'Comparison',
    date: '2025-01-08',
    author: 'Emma Richardson',
    readTime: '15 min read',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Static Caravan Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert guides, buying tips, and latest news on static caravans and holiday parks across the UK
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow h-full">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-emerald-600">
                      {post.category}
                    </Badge>
                  </div>

                  <CardContent className="p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Author & CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        By {post.author}
                      </span>
                      <div className="flex items-center text-emerald-600 font-medium text-sm">
                        Read more
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Load More / Pagination would go here */}
          <div className="mt-12 text-center">
            <p className="text-gray-600">More articles coming soon!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
