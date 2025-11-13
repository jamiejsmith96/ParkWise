/**
 * SEO utilities and metadata generation
 * Centralized SEO configuration for consistent metadata across the site
 */

export interface SEOMetadata {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  openGraph?: {
    title?: string
    description?: string
    type?: string
    image?: string
    url?: string
  }
  twitter?: {
    card?: string
    title?: string
    description?: string
    image?: string
  }
  schema?: any
}

const SITE_NAME = 'ParkWise'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://parkwise.co.uk'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`

// Primary keywords for the site
const PRIMARY_KEYWORDS = [
  'static caravans for sale',
  'static caravan parks uk',
  'holiday parks',
  'compare static caravans',
  'cheap static caravans',
  'static caravan prices',
]

/**
 * Generate complete SEO metadata for a page
 */
export function generateMetadata({
  title,
  description,
  keywords = [],
  canonical,
  openGraph,
  twitter,
  schema,
}: SEOMetadata) {
  const fullTitle = title.includes('|') ? title : `${title} | ${SITE_NAME}`
  const canonicalUrl = canonical || SITE_URL
  const allKeywords = [...PRIMARY_KEYWORDS, ...keywords]

  return {
    title: fullTitle,
    description,
    keywords: allKeywords.join(', '),
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: openGraph?.title || fullTitle,
      description: openGraph?.description || description,
      url: openGraph?.url || canonicalUrl,
      siteName: SITE_NAME,
      type: openGraph?.type || 'website',
      images: [
        {
          url: openGraph?.image || DEFAULT_IMAGE,
          width: 1200,
          height: 630,
          alt: openGraph?.title || title,
        },
      ],
      locale: 'en_GB',
    },
    twitter: {
      card: twitter?.card || 'summary_large_image',
      title: twitter?.title || fullTitle,
      description: twitter?.description || description,
      images: [twitter?.image || DEFAULT_IMAGE],
      creator: '@parkwiseuk',
      site: '@parkwiseuk',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }
}

/**
 * Generate structured data (Schema.org JSON-LD)
 */
export function generateSchema(type: string, data: any) {
  const schemas: Record<string, any> = {
    Organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      description: 'Independent static caravan comparison site helping UK buyers find their perfect holiday home',
      sameAs: [
        'https://facebook.com/parkwiseuk',
        'https://twitter.com/parkwiseuk',
        'https://instagram.com/parkwiseuk',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+44-20-1234-5678',
        contactType: 'Customer Service',
        email: 'hello@parkwise.co.uk',
        areaServed: 'GB',
        availableLanguage: 'English',
      },
    },
    WebSite: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/parks?search={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    BreadcrumbList: (items: Array<{ name: string; url: string }>) => ({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    }),
    LocalBusiness: (park: any) => ({
      '@context': 'https://schema.org',
      '@type': 'RVPark',
      name: park.name,
      description: park.description,
      image: park.images?.[0]?.url,
      address: {
        '@type': 'PostalAddress',
        streetAddress: park.address_line1,
        addressLocality: park.town,
        addressRegion: park.county,
        postalCode: park.postcode,
        addressCountry: 'GB',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: park.latitude,
        longitude: park.longitude,
      },
      telephone: park.contact_phone,
      priceRange: `£${park.min_caravan_price?.toLocaleString()} - £${park.max_caravan_price?.toLocaleString()}`,
      aggregateRating: park.google_rating ? {
        '@type': 'AggregateRating',
        ratingValue: park.google_rating,
        reviewCount: park.google_reviews_count,
        bestRating: 5,
        worstRating: 1,
      } : undefined,
      amenityFeature: park.features?.map((feature: string) => ({
        '@type': 'LocationFeatureSpecification',
        name: feature,
      })),
    }),
    Product: (park: any) => ({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `Static Caravan at ${park.name}`,
      description: park.short_description || park.description,
      image: park.images?.map((img: any) => img.url),
      brand: {
        '@type': 'Brand',
        name: park.operator,
      },
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'GBP',
        lowPrice: park.min_caravan_price,
        highPrice: park.max_caravan_price,
        offerCount: park.available_pitches || 1,
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/parks/${park.slug}`,
      },
      aggregateRating: park.google_rating ? {
        '@type': 'AggregateRating',
        ratingValue: park.google_rating,
        reviewCount: park.google_reviews_count,
      } : undefined,
    }),
    FAQPage: (faqs: Array<{ question: string; answer: string }>) => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    }),
    HowTo: (data: { name: string; description: string; steps: Array<{ name: string; text: string }> }) => ({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: data.name,
      description: data.description,
      step: data.steps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
      })),
    }),
  }

  if (type in schemas) {
    const schemaFn = schemas[type]
    return typeof schemaFn === 'function' ? schemaFn(data) : schemaFn
  }

  return null
}

/**
 * Pre-configured metadata for common pages
 */
export const PAGE_METADATA: Record<string, SEOMetadata> = {
  home: {
    title: 'Compare Static Caravan Parks UK | Find Your Perfect Holiday Home',
    description: 'Compare 500+ static caravan parks across the UK. Find the best deals on static caravans for sale. Independent advice, transparent pricing, and expert guides.',
    keywords: ['static caravans for sale uk', 'compare static caravan parks', 'holiday parks uk', 'cheap static caravans'],
  },
  parks: {
    title: 'Static Caravan Parks for Sale UK | 500+ Parks Compared',
    description: 'Browse 500+ static caravan parks across the UK. Compare prices, features, and locations. Find static caravans for sale from £15,000. Independent comparison.',
    keywords: ['static caravan parks uk', 'static caravans for sale', 'holiday parks', 'caravan parks near me'],
  },
  compare: {
    title: 'Compare Static Caravan Parks | Side-by-Side Comparison Tool',
    description: 'Compare static caravan parks side by side. See prices, site fees, features, and locations. Make an informed decision with our independent comparison tool.',
    keywords: ['compare static caravan parks', 'static caravan comparison', 'holiday park comparison'],
  },
  saved: {
    title: 'Saved Static Caravan Parks | Your Shortlist',
    description: 'View your saved static caravan parks. Compare your shortlist and find the perfect holiday home. Free, independent advice.',
    keywords: ['static caravan shortlist', 'saved parks', 'favourite caravan parks'],
  },
  buyersGuide: {
    title: 'Static Caravan Buyers Guide 2025 | Complete Guide',
    description: 'Complete guide to buying a static caravan in 2025. Learn about costs, financing, running expenses, and how to choose the perfect park. Expert advice.',
    keywords: ['buy static caravan', 'static caravan buyers guide', 'how to buy static caravan', 'static caravan advice'],
  },
  finance: {
    title: 'Static Caravan Finance Guide | Loans, Deals & Options 2025',
    description: 'Compare static caravan finance options. Dealer finance, personal loans, and secured loans explained. Get the best rates and repayment terms.',
    keywords: ['static caravan finance', 'caravan loans', 'static caravan payment plans', 'caravan finance deals'],
  },
  partExchange: {
    title: 'Static Caravan Part Exchange | Ultimate Guide 2025',
    description: 'How to part exchange your static caravan. Valuation tips, maximizing trade-in value, and what affects caravan prices. Expert guidance.',
    keywords: ['static caravan part exchange', 'trade in static caravan', 'caravan valuation', 'sell static caravan'],
  },
  runningCosts: {
    title: 'Static Caravan Running Costs 2025 | Complete Breakdown',
    description: 'Complete breakdown of static caravan running costs. Site fees, insurance, utilities, and hidden expenses. Calculate your annual costs.',
    keywords: ['static caravan running costs', 'site fees', 'caravan expenses', 'static caravan costs'],
  },
  budgetCalculator: {
    title: 'Static Caravan Budget Calculator | Total Cost Calculator',
    description: 'Calculate the total cost of owning a static caravan. Include purchase price, site fees, insurance, and running costs. Free calculator.',
    keywords: ['static caravan calculator', 'caravan cost calculator', 'budget calculator'],
  },
  trueCost: {
    title: 'Static Caravan True Cost Calculator | Hidden Costs Revealed',
    description: 'Calculate the true cost of static caravan ownership including hidden fees. Site fees, utilities, maintenance, and depreciation calculator.',
    keywords: ['true cost calculator', 'static caravan hidden costs', 'total ownership cost'],
  },
  valuation: {
    title: 'Static Caravan Valuation Calculator | Free Valuation Tool',
    description: 'Get an instant valuation for your static caravan. Free calculator considers age, condition, location, and features. Accurate market values.',
    keywords: ['static caravan valuation', 'caravan value calculator', 'what is my caravan worth'],
  },
}
