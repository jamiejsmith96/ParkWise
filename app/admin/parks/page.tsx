'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, Edit, Eye } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default function AdminParksPage() {
  const [search, setSearch] = useState('')

  // Mock data
  const parks = [
    {
      id: '1',
      name: 'Seaside Haven Holiday Park',
      operator: 'Haven',
      region: 'South West',
      county: 'Dorset',
      status: 'active',
      isPartner: true,
      minPrice: 25000,
      maxPrice: 85000,
      totalPitches: 150,
      availablePitches: 12
    },
    {
      id: '2',
      name: 'Lakeside Retreat Park',
      operator: 'Parkdean Resorts',
      region: 'North West',
      county: 'Cumbria',
      status: 'active',
      isPartner: true,
      minPrice: 35000,
      maxPrice: 120000,
      totalPitches: 200,
      availablePitches: 8
    },
    {
      id: '3',
      name: 'Woodland Pines Holiday Village',
      operator: 'Independent',
      region: 'East Midlands',
      county: 'Nottinghamshire',
      status: 'active',
      isPartner: false,
      minPrice: 15000,
      maxPrice: 45000,
      totalPitches: 80,
      availablePitches: 25
    }
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Park Management</h1>
          <p className="text-gray-600">Manage holiday parks and listings</p>
        </div>
        <Link href="/admin/parks/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Park
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">127</div>
            <p className="text-sm text-gray-600">Total Parks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-emerald-600">89</div>
            <p className="text-sm text-gray-600">Partner Parks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">3,240</div>
            <p className="text-sm text-gray-600">Total Pitches</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-amber-600">456</div>
            <p className="text-sm text-gray-600">Available</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search parks by name, operator, or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Parks Table */}
      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Park Name</th>
                  <th className="text-left py-3 px-4 font-medium">Operator</th>
                  <th className="text-left py-3 px-4 font-medium">Location</th>
                  <th className="text-left py-3 px-4 font-medium">Price Range</th>
                  <th className="text-left py-3 px-4 font-medium">Pitches</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {parks.map((park) => (
                  <tr key={park.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium">{park.name}</div>
                        {park.isPartner && (
                          <Badge variant="success" className="mt-1">Partner</Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">{park.operator}</td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        <div>{park.county}</div>
                        <div className="text-gray-500">{park.region}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        {formatCurrency(park.minPrice)} - {formatCurrency(park.maxPrice)}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        <span className="font-medium">{park.availablePitches}</span> / {park.totalPitches}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={park.status === 'active' ? 'success' : 'secondary'}>
                        {park.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <Link href={`/parks/${park.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/parks/${park.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
