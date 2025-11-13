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
  norfolk: {
    name: 'Norfolk',
    title: 'Static Caravan Parks in Norfolk | Coast & Broads Holiday Homes',
    description: 'Discover static caravan parks in Norfolk. Compare 40+ parks across stunning coastline and Norfolk Broads. Excellent value and year-round accessibility.',
    keywords: ['norfolk static caravan parks', 'static caravans norfolk', 'norfolk broads caravans', 'great yarmouth holiday parks'],
    content: {
      intro: 'Norfolk offers exceptional value and diverse landscapes for static caravan owners. From the stunning North Norfolk Coast (AONB) to the unique Norfolk Broads waterways, and traditional seaside resorts like Great Yarmouth, Norfolk provides excellent accessibility from London and the East.',
      benefits: [
        'Outstanding value - 20-30% cheaper than Cornwall',
        'Easy access from London and East of England (2-3 hours)',
        'Beautiful North Norfolk Coast (Area of Outstanding Natural Beauty)',
        'Unique Norfolk Broads - ideal for boating enthusiasts',
        'Long sandy beaches and traditional seaside towns',
        'Excellent local produce and farmers markets',
      ],
      considerations: [
        'Can be windy on the coast',
        'Some areas prone to flooding (check park elevation)',
        'Site fees £2,500-£4,000 per year',
        'Peak season July-August gets busy',
        'Cooler than south coast locations',
      ],
      averagePrices: {
        budget: '£20,000 - £40,000',
        midRange: '£40,000 - £75,000',
        luxury: '£75,000 - £120,000',
      },
      popularAreas: [
        'Cromer - Traditional seaside town',
        'Great Yarmouth - Classic resort',
        'Hunstanton - Unique east-facing beach',
        'Wells-next-the-Sea - Charming harbour',
        'Wroxham - Gateway to the Broads',
      ],
    },
    parks: [],
  },
  dorset: {
    name: 'Dorset',
    title: 'Static Caravan Parks in Dorset | Jurassic Coast Holiday Homes',
    description: 'Find static caravan parks in Dorset. World Heritage Jurassic Coast, stunning beaches, and charming market towns. 50+ parks to compare.',
    keywords: ['dorset static caravan parks', 'static caravans dorset', 'jurassic coast caravans', 'weymouth holiday parks'],
    content: {
      intro: 'Dorset is home to the spectacular Jurassic Coast World Heritage Site and some of England\'s most beautiful beaches. With charming market towns, excellent local food, and a mild climate, Dorset offers an ideal location for static caravan ownership with slightly better value than neighboring Cornwall.',
      benefits: [
        'Stunning Jurassic Coast World Heritage Site',
        'Beautiful sandy beaches and dramatic cliffs',
        'Mild climate - one of the sunniest areas in the UK',
        'Charming towns like Lyme Regis and Swanage',
        'Good accessibility from London and South West',
        'Excellent local food scene and farmers markets',
      ],
      considerations: [
        'Popular destinations crowded in peak season',
        'Prices rising - catching up with Cornwall',
        'Site fees £3,200-£5,000 per year',
        'Some parks have age restrictions on caravans',
        'Parking can be limited in peak summer',
      ],
      averagePrices: {
        budget: '£32,000 - £52,000',
        midRange: '£52,000 - £90,000',
        luxury: '£90,000 - £145,000',
      },
      popularAreas: [
        'Weymouth - Olympic sailing venue',
        'Lyme Regis - Fossil hunting paradise',
        'Swanage - Traditional Victorian resort',
        'Poole - Large natural harbour',
        'Christchurch - Historic town',
      ],
    },
    parks: [],
  },
  kent: {
    name: 'Kent',
    title: 'Static Caravan Parks in Kent | Garden of England Coast',
    description: 'Browse static caravan parks in Kent. Stunning coastline, white cliffs, and easy access from London. Compare 35+ parks across the Garden of England.',
    keywords: ['kent static caravan parks', 'static caravans kent', 'kent coast holiday parks', 'whitstable caravan parks'],
    content: {
      intro: 'Kent, known as the Garden of England, offers exceptional accessibility for Londoners and those in the South East. With its stunning white cliffs, sandy beaches, and charming coastal towns, Kent provides excellent value static caravan ownership just an hour from London.',
      benefits: [
        'Excellent accessibility - under 2 hours from London',
        'Stunning White Cliffs and dramatic coastline',
        'Charming seaside towns like Whitstable and Broadstairs',
        'Good value compared to other southern regions',
        'Long season - many parks open 11-12 months',
        'Rich history with castles and historic sites',
      ],
      considerations: [
        'Can be busy with London day-trippers in summer',
        'Some areas have pebble beaches rather than sand',
        'Site fees £2,800-£4,800 per year',
        'M25/M2 traffic on peak weekends',
        'Less dramatic scenery than Devon/Cornwall',
      ],
      averagePrices: {
        budget: '£28,000 - £48,000',
        midRange: '£48,000 - £85,000',
        luxury: '£85,000 - £140,000',
      },
      popularAreas: [
        'Whitstable - Oysters and beach huts',
        'Broadstairs - Charles Dickens heritage',
        'Margate - Coastal regeneration',
        'Herne Bay - Traditional seaside',
        'Deal - Historic maritime town',
      ],
    },
    parks: [],
  },
  lincolnshire: {
    name: 'Lincolnshire',
    title: 'Static Caravan Parks in Lincolnshire | Coast & Countryside Value',
    description: 'Discover static caravan parks in Lincolnshire. Excellent value coastal parks, traditional resorts, and easy Midlands access. 30+ parks to browse.',
    keywords: ['lincolnshire static caravan parks', 'static caravans lincolnshire', 'skegness caravan parks', 'mablethorpe holiday parks'],
    content: {
      intro: 'Lincolnshire offers outstanding value for static caravan buyers, with its traditional English seaside resorts and easy accessibility from the Midlands and North. With golden sandy beaches, classic seaside entertainment, and significantly lower prices than southern resorts, Lincolnshire is perfect for budget-conscious buyers.',
      benefits: [
        'Excellent value - among the UK\'s most affordable regions',
        'Long sandy beaches at Skegness and Mablethorpe',
        'Easy access from Midlands (Nottingham, Leicester, Sheffield)',
        'Traditional seaside entertainment and attractions',
        'Low site fees £2,200-£3,500 per year',
        'Family-friendly atmosphere and theme parks',
      ],
      considerations: [
        'Can be cooler than southern coast',
        'Traditional resorts less trendy than Cornwall/Devon',
        'Some areas flood-prone (check park location)',
        'Shorter season at some parks (March-November)',
        'Wind can be strong on exposed coast',
      ],
      averagePrices: {
        budget: '£15,000 - £32,000',
        midRange: '£32,000 - £60,000',
        luxury: '£60,000 - £95,000',
      },
      popularAreas: [
        'Skegness - Classic seaside resort',
        'Mablethorpe - Golden beaches',
        'Chapel St Leonards - Quieter alternative',
        'Ingoldmells - Family entertainment',
        'Sutton-on-Sea - Peaceful retreat',
      ],
    },
    parks: [],
  },
  'north-wales': {
    name: 'North Wales',
    title: 'Static Caravan Parks in North Wales | Snowdonia & Coast',
    description: 'Find static caravan parks in North Wales. Stunning Snowdonia mountains, beautiful coastline, and excellent value. Compare 40+ parks.',
    keywords: ['north wales static caravan parks', 'static caravans north wales', 'snowdonia caravan parks', 'anglesey holiday parks'],
    content: {
      intro: 'North Wales combines the dramatic mountains of Snowdonia National Park with beautiful coastal locations and excellent value prices. From the sandy beaches of the Llŷn Peninsula to the Victorian seaside town of Llandudno, North Wales offers diverse landscapes and accessibility from North West England.',
      benefits: [
        'Stunning Snowdonia mountain scenery',
        'Beautiful sandy beaches and coastal paths',
        'Excellent value - 25-35% cheaper than English coast',
        'Good access from Manchester, Liverpool, Chester',
        'Rich Welsh culture and heritage',
        'Adventure activities - mountains, castles, zip lines',
      ],
      considerations: [
        'Weather can be wet, especially in mountains',
        'Some locations are remote',
        'Limited season in mountain locations (April-October)',
        'Welsh language prominent in some areas',
        'Winding mountain roads to some parks',
      ],
      averagePrices: {
        budget: '£18,000 - £38,000',
        midRange: '£38,000 - £70,000',
        luxury: '£70,000 - £110,000',
      },
      popularAreas: [
        'Llandudno - Victorian elegance',
        'Anglesey - Island beaches',
        'Abersoch - Watersports and sailing',
        'Pwllheli - Llŷn Peninsula',
        'Conwy - Medieval walled town',
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

            {/* Browse Other Regions */}
            <Card className="mb-12">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">
                  Browse Other Regions
                </h2>
                <p className="text-gray-700 mb-6">
                  Explore static caravan parks in other beautiful UK locations to compare options and find your perfect holiday home.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Object.entries(regions)
                    .filter(([slug]) => slug !== params.region)
                    .map(([slug, regionData]) => (
                      <Link key={slug} href={`/parks/location/${slug}`}>
                        <Card className="transition-all hover:shadow-lg hover:border-emerald-600 cursor-pointer h-full">
                          <CardContent className="p-4 flex items-center gap-3">
                            <MapPin className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                            <span className="font-medium text-sm">{regionData.name}</span>
                          </CardContent>
                        </Card>
                      </Link>
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
