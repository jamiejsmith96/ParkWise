'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import { X, Check, ExternalLink, Search, Eye, Scale } from 'lucide-react'

export default function ParkCompareContent() {
  const searchParams = useSearchParams()
  const [parks, setParks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const parkIds = searchParams.get('parks')?.split(',') || []
    if (parkIds.length > 0) {
      fetchParks(parkIds)
    } else {
      setLoading(false)
    }
  }, [searchParams])

  const fetchParks = async (parkIds: string[]) => {
    try {
      const response = await fetch('/api/parks/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ parkIds }),
      })
      const data = await response.json()
      setParks(data.parks)

      // Track comparison use
      trackActivity()
    } catch (error) {
      console.error('Failed to fetch parks:', error)
    } finally {
      setLoading(false)
    }
  }

  const trackActivity = () => {
    const sessionId = getSessionId()
    fetch('/api/leads/activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        activities: [{
          type: 'comparison_use',
          data: { parkCount: parks.length },
        }],
      }),
    })
  }

  const getSessionId = () => {
    let sessionId = localStorage.getItem('session_id')
    if (!sessionId) {
      sessionId = `session-${Math.random().toString(36).substring(2)}`
      localStorage.setItem('session_id', sessionId)
    }
    return sessionId
  }

  const removePark = (parkId: string) => {
    const remaining = parks.filter(p => p.id !== parkId).map(p => p.id)
    const params = new URLSearchParams({ parks: remaining.join(',') })
    window.location.href = `/parks/compare?${params}`
  }

  const ComparisonRow = ({ label, values, type = 'text' }: any) => (
    <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${parks.length}, 1fr)` }}>
      <div className="font-medium text-gray-700 py-3">{label}</div>
      {values.map((value: any, idx: number) => (
        <div key={idx} className="py-3 text-center">
          {type === 'boolean' ? (
            value ? (
              <Check className="h-5 w-5 text-green-600 mx-auto" />
            ) : (
              <X className="h-5 w-5 text-gray-400 mx-auto" />
            )
          ) : type === 'currency' ? (
            <span className="font-medium">{formatCurrency(value)}</span>
          ) : (
            <span>{value}</span>
          )}
        </div>
      ))}
    </div>
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600" />
      </div>
    )
  }

  if (parks.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-emerald-100 rounded-full">
                <Scale className="h-12 w-12 text-emerald-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-4">Compare Static Caravan Parks</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Compare up to 4 parks side-by-side to find the perfect match for your needs. See prices, features, and amenities at a glance.
            </p>
          </div>

          {/* How it Works */}
          <Card className="mb-8">
            <div className="p-8">
              <h2 className="text-xl font-semibold mb-6 text-center">How to Compare Parks</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Search className="h-6 w-6 text-emerald-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">1. Browse Parks</h3>
                  <p className="text-sm text-gray-600">
                    Search through 500+ parks across the UK. Filter by location, price, and features.
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Eye className="h-6 w-6 text-emerald-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">2. Add to Compare</h3>
                  <p className="text-sm text-gray-600">
                    Click "Add to Compare" on any park page. You can add up to 4 parks at once.
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Scale className="h-6 w-6 text-emerald-600" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">3. Compare & Decide</h3>
                  <p className="text-sm text-gray-600">
                    View side-by-side comparisons of prices, facilities, rules, and reviews.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* What You Can Compare */}
          <Card className="mb-8">
            <div className="p-8">
              <h2 className="text-xl font-semibold mb-4">What You Can Compare</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-emerald-600 mb-3">Costs</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Purchase prices (min & max)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Annual site fees</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Finance and part-exchange availability</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-600 mb-3">Features & Amenities</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Swimming pool, bar, restaurant</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Beach access and location</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Entertainment and facilities</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-600 mb-3">Park Rules</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Season length (9-12 months)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Pet policies</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Subletting permissions</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-600 mb-3">Reviews & Ratings</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Overall park ratings</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Number of verified reviews</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Customer satisfaction scores</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Link href="/parks">
              <Button size="lg" className="px-8">
                <Search className="mr-2 h-5 w-5" />
                Start Browsing Parks
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              Or explore parks by region: <Link href="/parks/location/cornwall" className="text-emerald-600 hover:underline">Cornwall</Link>, <Link href="/parks/location/devon" className="text-emerald-600 hover:underline">Devon</Link>, <Link href="/parks/location/lake-district" className="text-emerald-600 hover:underline">Lake District</Link>, <Link href="/parks/location/wales" className="text-emerald-600 hover:underline">Wales</Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Compare Parks</h1>
        <p className="text-gray-600">
          Side-by-side comparison of {parks.length} parks
        </p>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        {/* Park Headers with Images */}
        <div className="sticky top-16 z-10 bg-white border-b">
          <div className="grid gap-4 p-4" style={{ gridTemplateColumns: `200px repeat(${parks.length}, 1fr)` }}>
            <div className="font-semibold text-gray-900">Park</div>
            {parks.map((park) => (
              <div key={park.id} className="relative">
                <button
                  onClick={() => removePark(park.id)}
                  className="absolute top-2 right-2 p-1 rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-red-600 z-10"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="relative h-32 rounded-lg overflow-hidden mb-2">
                  <Image
                    src={park.imageUrl}
                    alt={park.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold text-center mb-1">{park.name}</h3>
                <p className="text-xs text-gray-600 text-center">{park.operator}</p>
                <div className="text-center mt-2">
                  <Link href={`/parks/${park.slug || park.id}`}>
                    <Button variant="outline" size="sm" className="text-xs">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Costs Section */}
        <div className="p-4 bg-gray-50 border-b">
          <h3 className="font-semibold mb-4">Costs</h3>
          <div className="space-y-2">
            <ComparisonRow
              label="Min Price"
              values={parks.map(p => p.minPrice)}
              type="currency"
            />
            <ComparisonRow
              label="Max Price"
              values={parks.map(p => p.maxPrice)}
              type="currency"
            />
            <ComparisonRow
              label="Annual Fees"
              values={parks.map(p => p.annualFees)}
              type="currency"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="p-4 border-b">
          <h3 className="font-semibold mb-4">Features</h3>
          <div className="space-y-2">
            <ComparisonRow
              label="Swimming Pool"
              values={parks.map(p => p.pool)}
              type="boolean"
            />
            <ComparisonRow
              label="Beach Access"
              values={parks.map(p => p.beach)}
              type="boolean"
            />
            <ComparisonRow
              label="Restaurant"
              values={parks.map(p => p.restaurant)}
              type="boolean"
            />
            <ComparisonRow
              label="Bar"
              values={parks.map(p => p.bar)}
              type="boolean"
            />
          </div>
        </div>

        {/* Rules Section */}
        <div className="p-4 border-b">
          <h3 className="font-semibold mb-4">Park Rules</h3>
          <div className="space-y-2">
            <ComparisonRow
              label="Season Length"
              values={parks.map(p => `${p.seasonLength} months`)}
            />
            <ComparisonRow
              label="Subletting"
              values={parks.map(p => p.subletting)}
              type="boolean"
            />
            <ComparisonRow
              label="Pets"
              values={parks.map(p => p.pets)}
              type="boolean"
            />
            <ComparisonRow
              label="Part Exchange"
              values={parks.map(p => p.partExchange)}
              type="boolean"
            />
            <ComparisonRow
              label="Finance Available"
              values={parks.map(p => p.finance)}
              type="boolean"
            />
          </div>
        </div>

        {/* Reviews Section */}
        <div className="p-4 bg-gray-50">
          <h3 className="font-semibold mb-4">Reviews</h3>
          <div className="space-y-2">
            <ComparisonRow
              label="Rating"
              values={parks.map(p => p.rating ? `${p.rating.toFixed(1)} ` : 'N/A')}
            />
            <ComparisonRow
              label="Review Count"
              values={parks.map(p => p.reviewCount || 0)}
            />
          </div>
        </div>
      </div>

      {/* CTA */}
      <Card className="mt-8 p-6 bg-emerald-50 border-emerald-200">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Ready to Visit?</h3>
          <p className="text-gray-600 mb-4">
            Get personalized recommendations and exclusive deals from these parks
          </p>
          <Button size="lg">
            Contact These Parks
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            Free service - we'll introduce you and help negotiate the best price
          </p>
        </div>
      </Card>
    </div>
  )
}
