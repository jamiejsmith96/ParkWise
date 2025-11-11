'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Search, Filter, Download, Eye, Mail, Phone } from 'lucide-react'
import { formatDate, formatCurrency } from '@/lib/utils'

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    status: '',
    temperature: '',
    search: '',
    dateFrom: '',
    dateTo: ''
  })

  // Mock data - in production, this would fetch from API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLeads([
        {
          id: '1',
          email: 'john.doe@example.com',
          firstName: 'John',
          lastName: 'Doe',
          phone: '07700 900123',
          score: 72,
          temperature: 'hot',
          status: 'qualified',
          budgetMax: 60000,
          timeline: '3_months',
          interestedParks: [
            { id: '1', name: 'Seaside Haven' },
            { id: '2', name: 'Coastal Breeze' }
          ],
          createdAt: new Date().toISOString(),
          lastActivityAt: new Date().toISOString()
        },
        {
          id: '2',
          email: 'sarah.smith@example.com',
          firstName: 'Sarah',
          lastName: 'Smith',
          phone: '07700 900456',
          score: 85,
          temperature: 'immediate',
          status: 'qualified',
          budgetMax: 80000,
          timeline: '1_month',
          interestedParks: [
            { id: '3', name: 'Lakeside Retreat' }
          ],
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          lastActivityAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: '3',
          email: 'mike.jones@example.com',
          firstName: 'Mike',
          lastName: 'Jones',
          phone: null,
          score: 28,
          temperature: 'warm',
          status: 'new',
          budgetMax: 35000,
          timeline: 'researching',
          interestedParks: [
            { id: '4', name: 'Woodland Pines' }
          ],
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          lastActivityAt: new Date(Date.now() - 86400000).toISOString()
        }
      ])
      setLoading(false)
    }, 500)
  }, [filters])

  const getTemperatureBadge = (temp: string) => {
    const variants: Record<string, any> = {
      immediate: 'destructive',
      hot: 'warning',
      warm: 'info',
      cold: 'secondary'
    }
    return <Badge variant={variants[temp] || 'secondary'}>{temp}</Badge>
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      new: 'secondary',
      contacted: 'info',
      qualified: 'warning',
      assigned: 'default',
      converted: 'success',
      lost: 'destructive'
    }
    return <Badge variant={variants[status] || 'secondary'}>{status}</Badge>
  }

  const handleExport = () => {
    alert('Export functionality - would download CSV of filtered leads')
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Lead Management</h1>
          <p className="text-gray-600">Manage and track all your leads</p>
        </div>
        <Button onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export Leads
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">142</div>
            <p className="text-sm text-gray-600">Total Leads</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-emerald-600">23</div>
            <p className="text-sm text-gray-600">New Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-amber-600">45</div>
            <p className="text-sm text-gray-600">Need Follow-up</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">67</div>
            <p className="text-sm text-gray-600">Avg. Score</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by email or name..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={filters.status} onValueChange={(v) => setFilters({ ...filters, status: v })}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.temperature} onValueChange={(v) => setFilters({ ...filters, temperature: v })}>
              <SelectTrigger>
                <SelectValue placeholder="All Temperatures" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Temperatures</SelectItem>
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="hot">Hot</SelectItem>
                <SelectItem value="warm">Warm</SelectItem>
                <SelectItem value="cold">Cold</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardContent className="pt-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Lead</th>
                    <th className="text-left py-3 px-4 font-medium">Contact</th>
                    <th className="text-left py-3 px-4 font-medium">Score</th>
                    <th className="text-left py-3 px-4 font-medium">Budget</th>
                    <th className="text-left py-3 px-4 font-medium">Timeline</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Parks</th>
                    <th className="text-left py-3 px-4 font-medium">Created</th>
                    <th className="text-left py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium">
                            {lead.firstName} {lead.lastName}
                          </div>
                          <div className="text-sm text-gray-600">{lead.email}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          {lead.email && (
                            <a href={`mailto:${lead.email}`}>
                              <Button variant="ghost" size="icon">
                                <Mail className="h-4 w-4" />
                              </Button>
                            </a>
                          )}
                          {lead.phone && (
                            <a href={`tel:${lead.phone}`}>
                              <Button variant="ghost" size="icon">
                                <Phone className="h-4 w-4" />
                              </Button>
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-semibold">{lead.score}</div>
                          <div>{getTemperatureBadge(lead.temperature)}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {lead.budgetMax ? formatCurrency(lead.budgetMax) : 'N/A'}
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm">{lead.timeline.replace('_', ' ')}</span>
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(lead.status)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          {lead.interestedParks.length > 0 ? (
                            <span>{lead.interestedParks.length} park(s)</span>
                          ) : (
                            <span className="text-gray-400">None</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          {formatDate(lead.createdAt)}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Link href={`/admin/leads/${lead.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
