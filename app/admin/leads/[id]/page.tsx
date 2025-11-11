'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { formatDate, formatDateTime, formatCurrency } from '@/lib/utils'
import { Mail, Phone, MapPin, Calendar, TrendingUp, MessageSquare, Send } from 'lucide-react'

export default function LeadDetailPage() {
  const params = useParams()
  const [lead, setLead] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [note, setNote] = useState('')

  useEffect(() => {
    // Mock data - would fetch from API
    setTimeout(() => {
      setLead({
        id: params.id,
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '07700 900123',
        postcode: 'SW1A 1AA',
        score: 72,
        temperature: 'hot',
        status: 'qualified',
        budgetMin: 30000,
        budgetMax: 60000,
        depositAvailable: 12000,
        timeline: '3_months',
        hasPartExchange: true,
        partExchangeValue: 15000,
        preferredRegions: ['South West', 'South East'],
        mustHaveFeatures: ['Beach Access', 'Swimming Pool', 'Dog Friendly'],
        source: 'organic',
        medium: 'google',
        landingPage: '/parks',
        deviceType: 'desktop',
        marketingConsent: true,
        scoreBreakdown: {
          email: 3,
          phone: 10,
          fullName: 10,
          budget: 15,
          timeline: 15,
          parksViewed: 6,
          calculatorUsed: 5,
          partExchange: 10
        },
        interestedParks: [
          { id: '1', name: 'Seaside Haven', interestType: 'inquired', createdAt: new Date().toISOString() },
          { id: '2', name: 'Coastal Breeze', interestType: 'compared', createdAt: new Date().toISOString() }
        ],
        activities: [
          { type: 'park_view', page: '/parks/seaside-haven', createdAt: new Date().toISOString() },
          { type: 'calculator_use', createdAt: new Date(Date.now() - 3600000).toISOString() },
          { type: 'email_capture', createdAt: new Date(Date.now() - 7200000).toISOString() }
        ],
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        lastActivityAt: new Date().toISOString()
      })
      setLoading(false)
    }, 500)
  }, [params.id])

  if (loading || !lead) {
    return (
      <div className="p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto" />
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            {lead.firstName} {lead.lastName}
          </h1>
          <p className="text-gray-600">{lead.email}</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Mail className="mr-2 h-4 w-4" />
            Send Email
          </Button>
          <Button variant="outline">
            <Phone className="mr-2 h-4 w-4" />
            Call
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact & Score */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Lead Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-5xl font-bold text-emerald-600 mb-2">
                    {lead.score}
                  </div>
                  <Badge variant={
                    lead.temperature === 'immediate' ? 'destructive' :
                    lead.temperature === 'hot' ? 'warning' :
                    lead.temperature === 'warm' ? 'info' : 'secondary'
                  }>
                    {lead.temperature}
                  </Badge>
                  <div className="mt-4 text-left space-y-2">
                    {Object.entries(lead.scoreBreakdown).map(([key, value]: [string, any]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="font-medium">+{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start">
                  <Mail className="h-4 w-4 text-gray-400 mr-2 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <a href={`mailto:${lead.email}`} className="text-sm font-medium text-emerald-600 hover:underline">
                      {lead.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-4 w-4 text-gray-400 mr-2 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <a href={`tel:${lead.phone}`} className="text-sm font-medium">
                      {lead.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Postcode</p>
                    <p className="text-sm font-medium">{lead.postcode}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Timeline</p>
                    <p className="text-sm font-medium">{lead.timeline.replace('_', ' ')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Buyer Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm text-gray-600">Budget Range</dt>
                  <dd className="font-semibold">
                    {formatCurrency(lead.budgetMin)} - {formatCurrency(lead.budgetMax)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-600">Deposit Available</dt>
                  <dd className="font-semibold">{formatCurrency(lead.depositAvailable)}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-600">Part Exchange</dt>
                  <dd className="font-semibold">
                    {lead.hasPartExchange ? `Yes (${formatCurrency(lead.partExchangeValue)})` : 'No'}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-600">Preferred Regions</dt>
                  <dd className="flex flex-wrap gap-1">
                    {lead.preferredRegions.map((region: string) => (
                      <Badge key={region} variant="secondary">{region}</Badge>
                    ))}
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-sm text-gray-600 mb-2">Must-Have Features</dt>
                  <dd className="flex flex-wrap gap-1">
                    {lead.mustHaveFeatures.map((feature: string) => (
                      <Badge key={feature} variant="outline">{feature}</Badge>
                    ))}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {/* Interested Parks */}
          <Card>
            <CardHeader>
              <CardTitle>Interested Parks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lead.interestedParks.map((park: any) => (
                  <div key={park.id} className="flex items-center justify-between border-b pb-3">
                    <div>
                      <p className="font-medium">{park.name}</p>
                      <p className="text-sm text-gray-600">
                        {park.interestType} • {formatDate(park.createdAt)}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Assign Lead
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lead.activities.map((activity: any, idx: number) => (
                  <div key={idx} className="flex items-start">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mr-3">
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{activity.type.replace('_', ' ')}</p>
                      <p className="text-sm text-gray-600">{formatDateTime(activity.createdAt)}</p>
                      {activity.page && (
                        <p className="text-xs text-gray-500">{activity.page}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Management */}
          <Card>
            <CardHeader>
              <CardTitle>Status Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium block mb-1">Status</label>
                <Select value={lead.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="assigned">Assigned</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">Temperature</label>
                <Select value={lead.temperature}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="hot">Hot</SelectItem>
                    <SelectItem value="warm">Warm</SelectItem>
                    <SelectItem value="cold">Cold</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">
                Update Status
              </Button>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Add Note
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                placeholder="Add internal notes..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
              />
              <Button className="w-full" disabled={!note}>
                <Send className="mr-2 h-4 w-4" />
                Add Note
              </Button>
            </CardContent>
          </Card>

          {/* Attribution */}
          <Card>
            <CardHeader>
              <CardTitle>Attribution</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Source</dt>
                  <dd className="font-medium">{lead.source}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Medium</dt>
                  <dd className="font-medium">{lead.medium}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Landing Page</dt>
                  <dd className="font-medium">{lead.landingPage}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Device</dt>
                  <dd className="font-medium">{lead.deviceType}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Created</dt>
                  <dd className="font-medium">{formatDate(lead.createdAt)}</dd>
                </div>
              </dl>
            </Card>
          </Card>
        </div>
      </div>
    </div>
  )
}
