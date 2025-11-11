'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { UK_REGIONS, PARK_FEATURES } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'
import { SlidersHorizontal, X } from 'lucide-react'

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

interface ParkFiltersProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
  onReset: () => void
}

export function ParkFilters({ filters, onChange, onReset }: ParkFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  const updateFilter = (key: keyof FilterState, value: any) => {
    onChange({ ...filters, [key]: value })
  }

  const toggleFeature = (feature: string) => {
    const newFeatures = filters.features.includes(feature)
      ? filters.features.filter(f => f !== feature)
      : [...filters.features, feature]
    updateFilter('features', newFeatures)
  }

  const hasActiveFilters = Object.values(filters).some(val =>
    Array.isArray(val) ? val.length > 0 : val !== undefined
  )

  return (
    <div className="bg-white rounded-lg border p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center">
          <SlidersHorizontal className="mr-2 h-5 w-5" />
          Filters
        </h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            <X className="mr-1 h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>

      {/* Location Search */}
      <div>
        <Label htmlFor="postcode">Your Postcode (for distance)</Label>
        <Input
          id="postcode"
          placeholder="e.g. SW1A 1AA"
          value={filters.postcode || ''}
          onChange={(e) => updateFilter('postcode', e.target.value)}
        />
        <p className="text-xs text-gray-500 mt-1">
          Show parks by distance from your location
        </p>
      </div>

      {/* Region */}
      <div>
        <Label htmlFor="region">Region</Label>
        <Select
          value={filters.region}
          onValueChange={(value) => updateFilter('region', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All regions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All regions</SelectItem>
            {UK_REGIONS.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <Label>Price Range</Label>
        <div className="pt-2">
          <Slider
            value={[filters.minPrice || 0, filters.maxPrice || 150000]}
            onValueChange={([min, max]) => {
              updateFilter('minPrice', min)
              updateFilter('maxPrice', max)
            }}
            min={0}
            max={150000}
            step={5000}
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>{formatCurrency(filters.minPrice || 0)}</span>
            <span>{formatCurrency(filters.maxPrice || 150000)}</span>
          </div>
        </div>
      </div>

      {/* Popular Features */}
      <div>
        <Label>Must-Have Features</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {PARK_FEATURES.slice(0, 6).map((feature) => (
            <button
              key={feature}
              onClick={() => toggleFeature(feature)}
              className={`px-3 py-2 text-sm border rounded-md transition-colors ${
                filters.features.includes(feature)
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              {feature}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => setShowAdvanced(!showAdvanced)}
      >
        {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
      </Button>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="partExchange"
              checked={filters.partExchange || false}
              onChange={(e) => updateFilter('partExchange', e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="partExchange" className="font-normal cursor-pointer">
              Part exchange available
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="subletting"
              checked={filters.subletting || false}
              onChange={(e) => updateFilter('subletting', e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="subletting" className="font-normal cursor-pointer">
              Subletting allowed
            </Label>
          </div>

          {/* More Features */}
          <div>
            <Label className="mb-2 block">All Features</Label>
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
              {PARK_FEATURES.map((feature) => (
                <button
                  key={feature}
                  onClick={() => toggleFeature(feature)}
                  className={`px-2 py-1.5 text-xs border rounded-md transition-colors text-left ${
                    filters.features.includes(feature)
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  {feature}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Count */}
      {hasActiveFilters && (
        <div className="pt-4 border-t text-sm text-gray-600">
          {filters.features.length > 0 && (
            <p>{filters.features.length} feature(s) selected</p>
          )}
        </div>
      )}
    </div>
  )
}
