'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Star, Heart, ArrowRight } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface ParkCardProps {
  park: {
    id: string
    name: string
    slug: string
    operator: string
    county: string
    region: string
    minPrice: number
    maxPrice: number
    rating: number
    imageUrl: string
    features: string[]
    distance?: number
  }
  onSave?: (parkId: string) => void
  saved?: boolean
}

export function ParkCard({ park, onSave, saved = false }: ParkCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={park.imageUrl}
          alt={park.name}
          fill
          className="object-cover"
        />
        {onSave && (
          <button
            onClick={() => onSave(park.id)}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm ${
              saved
                ? 'bg-emerald-600 text-white'
                : 'bg-white/80 text-gray-600 hover:bg-white'
            }`}
          >
            <Heart className={`h-5 w-5 ${saved ? 'fill-current' : ''}`} />
          </button>
        )}
        {park.distance && (
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
            {park.distance.toFixed(1)} miles away
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* Title and Location */}
        <div className="mb-3">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">
            {park.name}
          </h3>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{park.county}, {park.region}</span>
          </div>
          {park.operator && (
            <p className="text-sm text-gray-500 mt-1">{park.operator}</p>
          )}
        </div>

        {/* Rating */}
        {park.rating > 0 && (
          <div className="flex items-center mb-3">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium ml-1">{park.rating.toFixed(1)}</span>
          </div>
        )}

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-3">
          {park.features.slice(0, 3).map((feature) => (
            <Badge key={feature} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))}
          {park.features.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{park.features.length - 3} more
            </Badge>
          )}
        </div>

        {/* Price */}
        <div className="pt-3 border-t">
          <p className="text-sm text-gray-600">Caravans from</p>
          <p className="text-xl font-bold text-emerald-600">
            {formatCurrency(park.minPrice)}
          </p>
          {park.maxPrice && (
            <p className="text-xs text-gray-500">
              Up to {formatCurrency(park.maxPrice)}
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link href={`/parks/${park.slug}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
