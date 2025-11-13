'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Bookmark, ArrowLeft, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useSavedParks } from '@/hooks/useSavedParks'
import { formatCurrency } from '@/lib/utils'

export default function SavedParksPage() {
  const { savedParks, loading, unsavePark, count } = useSavedParks()
  const [removingId, setRemovingId] = useState<string | null>(null)

  const handleRemove = async (parkId: string) => {
    setRemovingId(parkId)
    await unsavePark(parkId)
    setRemovingId(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <p className="text-gray-600">Loading your saved parks...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/parks">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Parks
              </Button>
            </Link>
            <div className="flex items-center mb-2">
              <Bookmark className="h-8 w-8 text-emerald-600 mr-3" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Saved Parks
              </h1>
            </div>
            <p className="text-gray-600">
              {count === 0
                ? 'You haven\'t saved any parks yet'
                : `You have ${count} saved ${count === 1 ? 'park' : 'parks'}`}
            </p>
          </div>

          {/* Saved Parks List */}
          {savedParks.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Bookmark className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No saved parks yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start exploring parks and save your favorites for later
                </p>
                <Link href="/parks">
                  <Button>
                    Browse Parks
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {savedParks.map((savedPark) => {
                const park = savedPark.parks
                if (!park) return null

                return (
                  <Card key={savedPark.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        {/* Image */}
                        <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
                          <img
                            src={park.images?.[0]?.url || '/placeholder-park.jpg'}
                            alt={park.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                <Link href={`/parks/${park.slug}`} className="hover:text-emerald-600">
                                  {park.name}
                                </Link>
                              </h3>
                              <p className="text-sm text-gray-600">
                                {park.town}, {park.county}
                              </p>
                              {park.operator && (
                                <p className="text-sm text-gray-500 mt-1">
                                  {park.operator}
                                </p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemove(park.id)}
                              disabled={removingId === park.id}
                              className="text-gray-400 hover:text-red-600"
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>

                          {park.short_description && (
                            <p className="text-gray-700 mb-4 line-clamp-2">
                              {park.short_description}
                            </p>
                          )}

                          {/* Features */}
                          {park.features && park.features.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {park.features.slice(0, 4).map((feature: string) => (
                                <span
                                  key={feature}
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"
                                >
                                  {feature}
                                </span>
                              ))}
                              {park.features.length > 4 && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  +{park.features.length - 4} more
                                </span>
                              )}
                            </div>
                          )}

                          {/* Price and CTA */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t">
                            <div>
                              <p className="text-sm text-gray-600">Caravans from</p>
                              <p className="text-2xl font-bold text-emerald-600">
                                {formatCurrency(park.min_caravan_price)}
                              </p>
                              {park.max_caravan_price && (
                                <p className="text-xs text-gray-500">
                                  Up to {formatCurrency(park.max_caravan_price)}
                                </p>
                              )}
                            </div>
                            <Link href={`/parks/${park.slug}`}>
                              <Button>
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          {/* Action Buttons */}
          {savedParks.length > 0 && (
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/parks">
                <Button variant="outline" size="lg">
                  Browse More Parks
                </Button>
              </Link>
              <Link href="/parks/compare">
                <Button size="lg">
                  Compare Saved Parks
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
