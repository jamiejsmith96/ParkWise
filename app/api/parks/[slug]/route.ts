import { NextRequest, NextResponse } from 'next/server'
import { getParkBySlug } from '@/lib/supabase/queries'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const park = await getParkBySlug(params.slug)

    if (!park) {
      return NextResponse.json(
        { error: 'Park not found' },
        { status: 404 }
      )
    }

    // Format response
    const response = {
      id: park.id,
      name: park.name,
      operator: park.operator,
      description: park.description,
      location: {
        address: [
          park.address_line1,
          park.address_line2,
          park.town,
          park.county,
          park.postcode
        ].filter(Boolean).join(', '),
        county: park.county,
        region: park.region,
        postcode: park.postcode,
        coordinates: park.latitude && park.longitude
          ? { lat: park.latitude, lng: park.longitude }
          : null,
      },
      prices: {
        min: park.min_caravan_price,
        max: park.max_caravan_price,
        siteFeesAnnual: park.site_fees.annual || 0,
        additionalCosts: park.additional_costs,
      },
      features: park.features,
      facilities: park.facilities,
      images: park.images,
      rules: {
        seasonLength: park.season_length,
        sublettingAllowed: park.subletting_allowed,
        petFriendly: park.pet_friendly,
        ageLimit: park.age_limit,
      },
      reviews: {
        rating: park.google_rating || park.internal_rating,
        count: park.google_reviews_count || park.internal_reviews_count,
        breakdown: {}, // Can add detailed breakdown later
      },
      virtualTourUrl: park.virtual_tour_url,
      brochureUrl: park.brochure_url,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Park detail API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch park details' },
      { status: 500 }
    )
  }
}
