'use client'

import { useState, useEffect } from 'react'
import { ParkCard } from '@/components/parks/ParkCard'
import { ParkFilters } from '@/components/parks/ParkFilters'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2 } from 'lucide-react'

interface FilterState {
  region?: string
  county?: string
  features: string[]
  minPrice?: number
  maxPrice?: number
  partExchange?: boolean
  subletting?: boolean
  postcode?: string
}

export default function ParksPage() {
  const [parks, setParks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  const [filters, setFilters] = useState<FilterState>({
    features: [],
  })
  const [sortBy, setSortBy] = useState('name')
  const [page, setPage] = useState(0)
  const limit = 20

  useEffect(() => {
    fetchParks()
  }, [filters, sortBy, page])

  const fetchParks = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        offset: (page * limit).toString(),
        limit: limit.toString(),
        sortBy,
      })

      if (filters.region) params.append('region', filters.region)
      if (filters.minPrice) params.append('minPrice', filters.minPrice.toString())
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString())
      if (filters.partExchange) params.append('partExchange', 'true')
      if (filters.subletting) params.append('subletting', 'true')
      if (filters.postcode) params.append('postcode', filters.postcode)
      if (filters.features.length > 0) {
        params.append('features', filters.features.join(','))
      }

      const response = await fetch(`/api/parks?${params}`)
      const data = await response.json()

      setParks(data.parks)
      setTotal(data.total)
    } catch (error) {
      console.error('Failed to fetch parks:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Your Perfect Holiday Park</h1>
        <p className="text-gray-600">
          Browse {total.toLocaleString()} parks across the UK
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <ParkFilters
              filters={filters}
              onChange={setFilters}
              onReset={() => setFilters({ features: [] })}
            />
          </div>
        </div>

        {/* Parks Grid */}
        <div className="lg:col-span-3">
          {/* Sort and Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-600">
              {loading ? 'Loading...' : `${total} parks found`}
            </p>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="price">Price (Low-High)</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  {filters.postcode && (
                    <SelectItem value="distance">Distance</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            </div>
          )}

          {/* Parks Grid */}
          {!loading && parks.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {parks.map((park) => (
                  <ParkCard
                    key={park.id}
                    park={park}
                  />
                ))}
              </div>

              {/* Pagination */}
              {total > limit && (
                <div className="flex justify-center items-center space-x-4 mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setPage(p => Math.max(0, p - 1))}
                    disabled={page === 0}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-gray-600">
                    Page {page + 1} of {Math.ceil(total / limit)}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setPage(p => p + 1)}
                    disabled={(page + 1) * limit >= total}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Empty State */}
          {!loading && parks.length === 0 && (
            <div className="text-center py-20">
              <p className="text-lg text-gray-600 mb-4">
                No parks found matching your criteria
              </p>
              <Button onClick={() => setFilters({ features: [] })}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
