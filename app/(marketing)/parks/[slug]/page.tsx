'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { QuickContactForm } from '@/components/forms/QuickContactForm'
import { MapPin, Star, Phone, Mail, ExternalLink, Heart, Share2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default function ParkDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const [park, setPark] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetchPark()
  }, [slug])

  const fetchPark = async () => {
    try {
      const response = await fetch(`/api/parks/${slug}`)
      const data = await response.json()
      setPark(data)

      // Track park view
      trackActivity('park_view')
    } catch (error) {
      console.error('Failed to fetch park:', error)
    } finally {
      setLoading(false)
    }
  }

  const trackActivity = async (activityType: string) => {
    const sessionId = getSessionId()
    await fetch('/api/leads/activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        activities: [{
          type: activityType,
          parkId: park?.id,
          page: window.location.href,
        }],
      }),
    })
  }

  const getSessionId = () => {
    let sessionId = localStorage.getItem('session_id')
    if (!sessionId) {
      sessionId = `${Date.now()}-${Math.random().toString(36).substring(2)}`
      localStorage.setItem('session_id', sessionId)
    }
    return sessionId
  }

  const handleContactSubmit = async (data: any) => {
    const sessionId = getSessionId()

    // Capture email and preferences
    await fetch('/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        stage: 'preferences',
        sessionId,
        email: data.email,
        budgetMax: parseInt(data.budgetMax),
        timeline: data.timeline,
      }),
    })

    // Record interest in this park
    await fetch('/api/leads/interest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        parkId: park.id,
        interestType: 'inquired',
      }),
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600" />
      </div>
    )
  }

  if (!park) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Park Not Found</h1>
        <p className="text-gray-600">The park you're looking for doesn't exist.</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-50">
      {/* Image Gallery */}
      <div className="relative h-96 bg-gray-200">
        <Image
          src={park.images[0]?.url || '/placeholder-park.jpg'}
          alt={park.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{park.name}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{park.location.address}</span>
                  </div>
                  {park.operator && (
                    <p className="text-gray-600">Operated by {park.operator}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSaved(!saved)}
                  >
                    <Heart className={saved ? 'fill-current text-red-500' : ''} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 />
                  </Button>
                </div>
              </div>

              {/* Rating */}
              {park.reviews.rating > 0 && (
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-semibold">{park.reviews.rating}</span>
                  <span className="ml-1 text-gray-600">
                    ({park.reviews.count} reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Caravans from</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      {formatCurrency(park.prices.min)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Up to</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(park.prices.max)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Annual site fees</p>
                    <p className="text-lg font-semibold">
                      {formatCurrency(park.prices.siteFeesAnnual)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Park</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-line">
                  {park.description}
                </p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Features & Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {park.features.map((feature: string) => (
                    <div key={feature} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-emerald-600 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Park Rules */}
            <Card>
              <CardHeader>
                <CardTitle>Park Rules & Information</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm text-gray-600">Season Length</dt>
                    <dd className="font-semibold">{park.rules.seasonLength} months</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-600">Subletting</dt>
                    <dd className="font-semibold">
                      {park.rules.sublettingAllowed ? 'Allowed' : 'Not allowed'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-600">Pets</dt>
                    <dd className="font-semibold">
                      {park.rules.petFriendly ? 'Welcome' : 'Not allowed'}
                    </dd>
                  </div>
                  {park.rules.ageLimit && (
                    <div>
                      <dt className="text-sm text-gray-600">Minimum Age</dt>
                      <dd className="font-semibold">{park.rules.ageLimit} years</dd>
                    </div>
                  )}
                </dl>
              </CardContent>
            </Card>

            {/* Virtual Tour */}
            {park.virtualTourUrl && (
              <Card>
                <CardHeader>
                  <CardTitle>Virtual Tour</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <a href={park.virtualTourUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Take a Virtual Tour
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Contact Form */}
              <QuickContactForm
                onSubmit={handleContactSubmit}
                parkId={park.id}
              />

              {/* Quick Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Part Exchange</span>
                    <Badge variant={park.prices.partExchange ? 'success' : 'secondary'}>
                      {park.prices.partExchange ? 'Available' : 'Not Available'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Finance</span>
                    <Badge variant={park.prices.finance ? 'success' : 'secondary'}>
                      {park.prices.finance ? 'Available' : 'Not Available'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
