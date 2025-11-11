'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import { X, Check, ExternalLink } from 'lucide-react'

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
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">No Parks to Compare</h1>
        <p className="text-gray-600 mb-6">
          Start by browsing parks and adding them to comparison
        </p>
        <Link href="/parks">
          <Button>Browse Parks</Button>
        </Link>
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
