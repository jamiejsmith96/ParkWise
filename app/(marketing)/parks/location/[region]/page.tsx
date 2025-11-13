import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Star, Palmtree } from 'lucide-react'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { StructuredData } from '@/components/seo/StructuredData'
import { generateMetadata as genMeta } from '@/lib/seo'
import { formatCurrency } from '@/lib/utils'

// Region data - would typically come from CMS or database
const regions: Record<string, any> = {
  cornwall: {
    name: 'Cornwall',
    title: 'Static Caravan Parks in Cornwall | Seaside Holidays',
    description: 'Find the best static caravan parks in Cornwall. Compare prices, facilities, and locations across 50+ parks. Beautiful beaches, mild climate, and stunning coastline.',
    keywords: ['cornwall static caravan parks', 'static caravans cornwall', 'holiday parks cornwall', 'cornwall caravan sales'],
    content: {
      intro: 'Cornwall is one of the UK\'s most popular destinations for static caravan ownership. With over 400 miles of coastline, mild climate, and stunning beaches, it\'s perfect for year-round holidays.',
      benefits: [
        'Beautiful sandy beaches and dramatic cliffs',
        'Mild climate - warmest region in the UK',
        'Excellent surfing, sailing, and water sports',
        'Rich history and charming fishing villages',
        'Family attractions like the Eden Project',
        'Fresh seafood and local produce',
      ],
      considerations: [
        'Higher prices than other regions (£60k-£150k typical)',
        'Site fees £4,000-£6,000 per year',
        'Very popular - book viewings in advance',
        'Some parks have waiting lists',
        'Peak season can be crowded',
      ],
      averagePrices: {
        budget: '£40,000 - £60,000',
        midRange: '£60,000 - £100,000',
        luxury: '£100,000 - £200,000',
      },
      popularAreas: [
        'Newquay - Surfing capital',
        'St Ives - Artistic harbourside town',
        'Padstow - Food lovers paradise',
        'Looe - Traditional seaside charm',
        'Falmouth - Maritime heritage',
      ],
    },
    parks: [
      {
        name: 'St Ives Bay Holiday Park',
        slug: 'st-ives-bay-holiday-park',
        town: 'St Ives',
        minPrice: 60000,
        maxPrice: 150000,
        rating: 4.8,
        features: ['Beach Access', 'Swimming Pool', 'Spa'],
      },
      // More parks would be loaded from database
    ],
  },
  'lake-district': {
    name: 'Lake District',
    title: 'Static Caravan Parks in the Lake District | Scenic Mountain Retreats',
    description: 'Discover static caravan parks in the Lake District. Compare 30+ parks with stunning lake and mountain views. Perfect for outdoor enthusiasts.',
    keywords: ['lake district static caravan parks', 'static caravans lake district', 'cumbria caravan parks', 'lakeside static caravans'],
    content: {
      intro: 'The Lake District National Park offers some of the UK\'s most spectacular scenery for static caravan owners. With pristine lakes, dramatic mountains, and charming villages, it\'s a paradise for walkers and nature lovers.',
      benefits: [
        'Stunning mountain and lake views',
        'Excellent hiking and outdoor activities',
        'Peaceful, tranquil settings',
        'Charming market towns and villages',
        'Rich literary heritage (Beatrix Potter, Wordsworth)',
        'Quality local food and craft beer scene',
      ],
      considerations: [
        'Higher than average rainfall',
        'Can be chilly even in summer',
        'Winding roads and limited parking in peak season',
        'Some parks are remote',
        'Shorter season in some locations (9-10 months)',
      ],
      averagePrices: {
        budget: '£30,000 - £50,000',
        midRange: '£50,000 - £90,000',
        luxury: '£90,000 - £140,000',
      },
      popularAreas: [
        'Windermere - Largest lake',
        'Keswick - Outdoor activity hub',
        'Ambleside - Walkers paradise',
        'Grasmere - Village charm',
        'Ullswater - Quieter alternative',
      ],
    },
    parks: [],
  },
  wales: {
    name: 'Wales',
    title: 'Static Caravan Parks in Wales | Coastal & Mountain Retreats',
    description: 'Find static caravan parks across Wales. Compare parks in Pembrokeshire, Snowdonia, and beyond. Stunning coastline and dramatic mountains.',
    keywords: ['wales static caravan parks', 'static caravans wales', 'pembrokeshire caravan parks', 'welsh holiday parks'],
    content: {
      intro: 'Wales offers incredible value for static caravan buyers, with stunning coastlines, dramatic mountains, and rich culture. From the beaches of Pembrokeshire to the peaks of Snowdonia, Wales has something for everyone.',
      benefits: [
        'Excellent value - lower prices than England',
        'Less crowded than English hotspots',
        'Stunning Pembrokeshire Coast National Park',
        'Snowdonia National Park mountain views',
        'Rich Welsh culture and heritage',
        'Friendly communities and bilingual signs',
      ],
      considerations: [
        'Weather can be unpredictable',
        'Some areas are remote',
        'Longer travel from central/southern England',
        'Limited public transport in rural areas',
      ],
      averagePrices: {
        budget: '£22,000 - £45,000',
        midRange: '£45,000 - £80,000',
        luxury: '£80,000 - £120,000',
      },
      popularAreas: [
        'Tenby - Beautiful beaches',
        'Barmouth - Beach and mountains',
        'Abersoch - Watersports haven',
        'Saundersfoot - Family favorite',
        'Pwllheli - Llyn Peninsula',
      ],
    },
    parks: [],
  },
  devon: {
    name: 'Devon',
    title: 'Static Caravan Parks in Devon | Beautiful Beaches & Countryside',
    description: 'Discover static caravan parks in Devon. Compare 60+ parks with stunning coastline, sandy beaches, and countryside views. Perfect year-round destination.',
    keywords: ['devon static caravan parks', 'static caravans devon', 'holiday parks devon', 'devon caravan sales'],
    content: {
      intro: 'Devon offers the perfect blend of stunning coastline, rolling countryside, and charming market towns. With both north and south coasts, Devon provides diverse landscapes from dramatic cliffs to golden sandy beaches, making it ideal for static caravan ownership.',
      benefits: [
        'Two coastlines - rugged North Devon and sandy South Devon',
        'Excellent value compared to Cornwall',
        'Dartmoor National Park on your doorstep',
        'Mild climate with long seasons (often 11-12 months)',
        'Family attractions including zoos and adventure parks',
        'Renowned cream tea and local cider',
      ],
      considerations: [
        'Popular destinations can be busy in peak season',
        'Site fees £3,500-£5,500 per year',
        'North coast can be windier than south',
        'Some narrow country lanes to parks',
        'Prices rising due to increased demand',
      ],
      averagePrices: {
        budget: '£35,000 - £55,000',
        midRange: '£55,000 - £95,000',
        luxury: '£95,000 - £160,000',
      },
      popularAreas: [
        'Woolacombe - Award-winning beach',
        'Dawlish Warren - Sandy beaches',
        'Salcombe - Picturesque estuary',
        'Croyde - Surf and family friendly',
        'Torquay - English Riviera',
      ],
    },
    parks: [],
  },
  scotland: {
    name: 'Scotland',
    title: 'Static Caravan Parks in Scotland | Mountains, Lochs & Coast',
    description: 'Find static caravan parks across Scotland. Compare parks in the Highlands, Perthshire, Ayrshire and more. Breathtaking scenery and excellent value.',
    keywords: ['scotland static caravan parks', 'static caravans scotland', 'scottish holiday parks', 'highland caravan parks'],
    content: {
      intro: 'Scotland offers outstanding value and unparalleled natural beauty for static caravan owners. From the dramatic Highlands and pristine lochs to the stunning Ayrshire coast, Scottish parks provide a unique opportunity to own a holiday home in some of the UK\'s most spectacular landscapes.',
      benefits: [
        'Exceptional value - significantly lower prices than England',
        'Stunning Highland scenery and mountain views',
        'Beautiful lochs and dramatic coastlines',
        'Abundant wildlife and outdoor activities',
        'Less crowded than English destinations',
        'Rich history, castles, and whisky distilleries',
      ],
      considerations: [
        'Shorter season at Highland locations (April-October)',
        'Weather can be changeable year-round',
        'Longer travel distance from southern UK',
        'Midges in summer months (June-August)',
        'Some locations are very remote',
      ],
      averagePrices: {
        budget: '£18,000 - £35,000',
        midRange: '£35,000 - £70,000',
        luxury: '£70,000 - £110,000',
      },
      popularAreas: [
        'Loch Lomond - Scenic beauty',
        'Perthshire - Big Tree Country',
        'Ayrshire Coast - Sandy beaches',
        'Oban - Gateway to the Isles',
        'Aviemore - Year-round activities',
      ],
    },
    parks: [],
  },
  yorkshire: {
    name: 'Yorkshire',
    title: 'Static Caravan Parks in Yorkshire | Coast & Countryside Escapes',
    description: 'Browse static caravan parks in Yorkshire. Compare coastal and countryside parks. From Yorkshire Dales to stunning beaches - great value and accessibility.',
    keywords: ['yorkshire static caravan parks', 'static caravans yorkshire', 'yorkshire coast parks', 'north yorkshire caravans'],
    content: {
      intro: 'Yorkshire combines dramatic coastline, stunning national parks, and excellent accessibility, making it a top choice for static caravan buyers. With the Yorkshire Dales and North York Moors offering countryside retreats, and the Heritage Coast providing seaside locations, Yorkshire delivers outstanding variety and value.',
      benefits: [
        'Excellent value for money',
        'Easy access from major cities (Leeds, Sheffield, Manchester)',
        'Two National Parks - Yorkshire Dales and North York Moors',
        'Beautiful Heritage Coast with sandy beaches',
        'Historic towns like Whitby and Scarborough',
        'Strong local food and drink scene',
      ],
      considerations: [
        'Coastal areas can be cooler than south coast',
        'Popular parks book up quickly',
        'Site fees £2,800-£4,500 per year',
        'Some coastal locations prone to wind',
        'Season length varies (9-11 months typical)',
      ],
      averagePrices: {
        budget: '£25,000 - £45,000',
        midRange: '£45,000 - £80,000',
        luxury: '£80,000 - £130,000',
      },
      popularAreas: [
        'Whitby - Historic harbour town',
        'Scarborough - Classic resort',
        'Filey - Family-friendly beaches',
        'Robin Hood\'s Bay - Picturesque village',
        'Bridlington - Traditional seaside',
      ],
    },
    parks: [],
  },
}

export async function generateMetadata({ params }: { params: { region: string } }): Promise<Metadata> {
  const region = regions[params.region]

  if (!region) {
    return genMeta({
      title: 'Region Not Found',
      description: 'The region you are looking for could not be found.',
    })
  }

  return genMeta({
    title: region.title,
    description: region.description,
    keywords: region.keywords,
  })
}

export default function LocationPage({ params }: { params: { region: string } }) {
  const region = regions[params.region]

  if (!region) {
    return <div>Region not found</div>
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Parks', url: '/parks' },
          { name: region.name, url: `/parks/location/${params.region}` },
        ]}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-emerald-600 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-4">
                <MapPin className="h-12 w-12" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Static Caravan Parks in {region.name}
              </h1>
              <p className="text-xl text-emerald-100 mb-8">
                {region.description}
              </p>
              <Link href="/parks">
                <Button size="lg" variant="secondary">
                  View All {region.name} Parks
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-lg text-gray-700">
                {region.content.intro}
              </p>
            </div>

            {/* Benefits & Considerations */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Benefits */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Palmtree className="h-6 w-6 text-emerald-600" />
                    Why Choose {region.name}?
                  </h2>
                  <ul className="space-y-2">
                    {region.content.benefits.map((benefit: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-1">✓</span>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Considerations */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">
                    Things to Consider
                  </h2>
                  <ul className="space-y-2">
                    {region.content.considerations.map((consideration: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-gray-400 mt-1">•</span>
                        <span className="text-gray-700">{consideration}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Price Guide */}
            <Card className="mb-12">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">
                  {region.name} Static Caravan Price Guide
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Budget</h3>
                    <p className="text-2xl font-bold text-emerald-600">
                      {region.content.averagePrices.budget}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Older models, smaller parks
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Mid-Range</h3>
                    <p className="text-2xl font-bold text-emerald-600">
                      {region.content.averagePrices.midRange}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Modern vans, good facilities
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Luxury</h3>
                    <p className="text-2xl font-bold text-emerald-600">
                      {region.content.averagePrices.luxury}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Premium parks, top features
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Popular Areas */}
            <Card className="mb-12">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">
                  Popular Areas in {region.name}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {region.content.popularAreas.map((area: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="h-5 w-5 text-emerald-600" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <div className="text-center p-8 bg-emerald-50 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Find Your Perfect Park in {region.name}?
              </h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Browse all static caravan parks in {region.name}, compare prices and features, or get personalized recommendations.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href={`/parks?region=${region.name}`}>
                  <Button size="lg">Browse {region.name} Parks</Button>
                </Link>
                <Link href="/">
                  <Button size="lg" variant="outline">
                    Get Recommendations
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
