import { NextRequest, NextResponse } from 'next/server'
import { getParks } from '@/lib/supabase/queries'
import { geocodePostcode, calculateDistance } from '@/lib/utils'
import type { ParksListRequest } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    // Parse query parameters
    const params: ParksListRequest = {
      region: searchParams.get('region') || undefined,
      county: searchParams.get('county') || undefined,
      features: searchParams.get('features')?.split(',') || undefined,
      minPrice: searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined,
      maxPrice: searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined,
      partExchange: searchParams.get('partExchange') === 'true',
      subletting: searchParams.get('subletting') === 'true',
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20,
      offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0,
      sortBy: (searchParams.get('sortBy') as any) || 'name',
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'asc',
      postcode: searchParams.get('postcode') || undefined,
      radius: searchParams.get('radius') ? parseInt(searchParams.get('radius')!) : undefined,
    }

    // Get parks from database
    let result = await getParks(params)

    // If postcode provided, calculate distances
    if (params.postcode && result.parks.length > 0) {
      const coords = await geocodePostcode(params.postcode)

      if (coords) {
        // Add distance to each park
        result.parks = result.parks.map(park => ({
          ...park,
          distance: park.latitude && park.longitude
            ? calculateDistance(coords.lat, coords.lng, park.latitude, park.longitude)
            : undefined
        }))

        // Filter by radius if specified
        if (params.radius) {
          result.parks = result.parks.filter(park =>
            park.distance !== undefined && park.distance <= params.radius!
          )
          result.total = result.parks.length
        }

        // Re-sort by distance if that's the sort option
        if (params.sortBy === 'distance') {
          result.parks.sort((a, b) => {
            const distA = a.distance ?? Infinity
            const distB = b.distance ?? Infinity
            return params.sortOrder === 'asc' ? distA - distB : distB - distA
          })
        }
      }
    }

    // Format response
    const response = {
      parks: result.parks.map(park => ({
        id: park.id,
        name: park.name,
        slug: park.slug,
        operator: park.operator || '',
        county: park.county || '',
        region: park.region || '',
        minPrice: park.min_caravan_price || 0,
        maxPrice: park.max_caravan_price || 0,
        rating: park.google_rating || park.internal_rating || 0,
        imageUrl: park.images[0]?.url || '/placeholder-park.jpg',
        features: park.features,
        distance: park.distance,
      })),
      total: result.total,
      hasMore: result.hasMore,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Parks API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch parks' },
      { status: 500 }
    )
  }
}
