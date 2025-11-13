import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { StructuredData } from '@/components/seo/StructuredData'
import { generateMetadata as genMeta, generateSchema } from '@/lib/seo'

// This would typically come from a CMS or MDX files
// For now, using static data as an example
const blogPosts: Record<string, any> = {
  'best-static-caravan-parks-uk-2025': {
    title: 'Top 10 Static Caravan Parks UK 2025 - Expert Comparison',
    description: 'Our experts have reviewed hundreds of parks across the UK. Here are the top 10 static caravan parks for 2025, based on value, facilities, and location.',
    category: 'Guides',
    date: '2025-01-15',
    author: 'ParkWise Editorial Team',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7',
    content: `
      <p>Finding the perfect static caravan park can be overwhelming with hundreds of options across the UK. We've done the hard work for you, reviewing and comparing parks based on value for money, facilities, location, and customer reviews.</p>

      <h2>1. St Ives Bay Holiday Park, Cornwall</h2>
      <p>Consistently rated as one of the UK's best static caravan parks, St Ives Bay offers premium facilities including a spa, multiple restaurants, and direct beach access. While prices start higher at £60,000, the 11-month season and exceptional facilities make it worth the investment.</p>

      <ul>
        <li><strong>Price range:</strong> £60,000 - £150,000</li>
        <li><strong>Site fees:</strong> £5,200 per year</li>
        <li><strong>Season length:</strong> 11 months</li>
        <li><strong>Best for:</strong> Families seeking luxury coastal living</li>
      </ul>

      <h2>2. New Forest Retreat, Hampshire</h2>
      <p>Located in the stunning New Forest National Park, this exclusive park offers a unique combination of countryside tranquility and easy access to the South Coast.</p>

      <h2>3. Highland Pines Resort, Fort William</h2>
      <p>For those seeking Scottish wilderness, Highland Pines offers breathtaking loch views near Ben Nevis. Perfect for outdoor enthusiasts.</p>

      <p><em>Read the full guide at <a href="/guides/buyers-guide">our comprehensive buyers guide</a> or use our <a href="/tools/budget-calculator">budget calculator</a> to work out your total costs.</em></p>

      <h2>How We Ranked These Parks</h2>
      <p>Our rankings are based on five key criteria:</p>
      <ol>
        <li><strong>Value for Money:</strong> Purchase price vs facilities offered</li>
        <li><strong>Site Fees:</strong> Annual running costs</li>
        <li><strong>Facilities:</strong> Swimming pools, restaurants, entertainment</li>
        <li><strong>Location:</strong> Access to beaches, towns, and attractions</li>
        <li><strong>Customer Reviews:</strong> Real buyer experiences</li>
      </ol>

      <h2>Next Steps</h2>
      <p>Ready to find your perfect static caravan park? <a href="/parks">Browse our complete database of 500+ parks</a> or get personalized recommendations by completing our quick questionnaire.</p>
    `,
  },
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts[params.slug]

  if (!post) {
    return genMeta({
      title: 'Post Not Found',
      description: 'The blog post you are looking for could not be found.',
    })
  }

  return genMeta({
    title: post.title,
    description: post.description,
    keywords: [
      'static caravans',
      'holiday parks',
      post.category.toLowerCase(),
    ],
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      image: post.image,
    },
  })
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug]

  if (!post) {
    notFound()
  }

  // Generate article schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ParkWise',
      logo: {
        '@type': 'ImageObject',
        url: 'https://parkwise.co.uk/logo.png',
      },
    },
  }

  return (
    <>
      <StructuredData data={articleSchema} />

      <Breadcrumbs
        items={[
          { name: 'Blog', url: '/blog' },
          { name: post.title, url: `/blog/${params.slug}` },
        ]}
      />

      <article className="min-h-screen bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Back button */}
            <Link href="/blog">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>

            {/* Category Badge */}
            <Badge className="mb-4 bg-emerald-600">
              {post.category}
            </Badge>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            {/* Meta information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>
                  {new Date(post.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-12">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Content */}
            <div
              className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Call to Action */}
            <div className="mt-12 p-8 bg-emerald-50 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Find Your Perfect Static Caravan?
              </h3>
              <p className="text-gray-700 mb-6">
                Browse our database of 500+ parks across the UK, compare prices, and get personalized recommendations.
              </p>
              <div className="flex gap-4">
                <Link href="/parks">
                  <Button size="lg">Browse Parks</Button>
                </Link>
                <Link href="/">
                  <Button size="lg" variant="outline">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>

            {/* Share buttons would go here */}
          </div>
        </div>
      </article>
    </>
  )
}
