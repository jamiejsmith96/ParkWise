import { NextRequest, NextResponse } from 'next/server'
import { getParkById } from '@/lib/supabase/queries'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { parkIds } = body

    if (!parkIds || !Array.isArray(parkIds) || parkIds.length === 0) {
      return NextResponse.json(
        { error: 'Park IDs are required' },
        { status: 400 }
      )
    }

    if (parkIds.length > 5) {
      return NextResponse.json(
        { error: 'Maximum 5 parks can be compared' },
        { status: 400 }
      )
    }

    // Fetch all parks
    const parksPromises = parkIds.map(id => getParkById(id))
    const parks = await Promise.all(parksPromises)

    // Format for comparison
    const response = {
      parks: parks.map(park => ({
        id: park.id,
        name: park.name,
        operator: park.operator,
        region: park.region,
        county: park.county,
        // Prices
        minPrice: park.min_caravan_price,
        maxPrice: park.max_caravan_price,
        annualFees: park.site_fees.annual || 0,
        insurance: park.additional_costs.insurance || 0,
        // Features
        pool: park.features.includes('Swimming Pool'),
        beach: park.features.includes('Beach Access'),
        restaurant: park.facilities.restaurant || false,
        bar: park.facilities.bar || false,
        // Rules
        seasonLength: park.season_length,
        subletting: park.subletting_allowed,
        pets: park.pet_friendly,
        partExchange: park.part_exchange_accepted,
        finance: park.finance_available,
        // Rating
        rating: park.google_rating || park.internal_rating,
        reviewCount: park.google_reviews_count || park.internal_reviews_count,
        // Image
        imageUrl: park.images[0]?.url || '/placeholder-park.jpg',
      })),
      categories: {
        costs: ['minPrice', 'maxPrice', 'annualFees', 'insurance'],
        features: ['pool', 'beach', 'restaurant', 'bar'],
        rules: ['seasonLength', 'subletting', 'pets', 'partExchange', 'finance'],
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Compare parks API error:', error)
    return NextResponse.json(
      { error: 'Failed to compare parks' },
      { status: 500 }
    )
  }
}
