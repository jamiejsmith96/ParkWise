'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import { TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'

export default function ValuationToolPage() {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear() - 5,
    condition: 'good',
    currentPark: '',
    hasSiteFeesIncluded: false,
    hasDecking: false,
    hasVeranda: false,
  })

  const [valuation, setValuation] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/tools/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'valuation',
          inputs: formData,
        }),
      })

      const data = await response.json()
      setValuation(data.results)
    } catch (error) {
      console.error('Valuation failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center mb-4">
          <TrendingUp className="h-8 w-8 text-emerald-600 mr-3" />
          <h1 className="text-3xl font-bold">Part-Exchange Valuation</h1>
        </div>
        <p className="text-lg text-gray-600">
          Get an instant estimate of your current caravan's value for part-exchange
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Your Caravan Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="make">Make</Label>
                  <Input
                    id="make"
                    placeholder="e.g. ABI, Swift, Willerby"
                    value={formData.make}
                    onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    placeholder="e.g. Vista, Moselle, Winchester"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="year">Year</Label>
                  <Select
                    value={formData.year.toString()}
                    onValueChange={(v) => setFormData({ ...formData, year: parseInt(v) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map(year => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="condition">Condition</Label>
                  <Select
                    value={formData.condition}
                    onValueChange={(v) => setFormData({ ...formData, condition: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent - Like new</SelectItem>
                      <SelectItem value="good">Good - Well maintained</SelectItem>
                      <SelectItem value="fair">Fair - Some wear</SelectItem>
                      <SelectItem value="poor">Poor - Needs work</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="currentPark">Current Park (Optional)</Label>
                  <Input
                    id="currentPark"
                    placeholder="Where is it currently sited?"
                    value={formData.currentPark}
                    onChange={(e) => setFormData({ ...formData, currentPark: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.hasDecking}
                      onChange={(e) => setFormData({ ...formData, hasDecking: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">Includes Decking</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.hasVeranda}
                      onChange={(e) => setFormData({ ...formData, hasVeranda: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">Includes Veranda</span>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? 'Calculating...' : 'Get Valuation'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {valuation ? (
              <>
                <Card className="bg-emerald-50 border-emerald-200">
                  <CardHeader>
                    <CardTitle className="text-emerald-900">Your Valuation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <p className="text-sm text-gray-600 mb-2">Estimated Value</p>
                      <p className="text-4xl font-bold text-emerald-600 mb-4">
                        {formatCurrency(valuation.estimatedValue)}
                      </p>
                      <div className="flex justify-center items-center gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Range</p>
                          <p className="font-semibold">
                            {formatCurrency(valuation.rangeMin)} - {formatCurrency(valuation.rangeMax)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-600 mb-2">Trade-In Value</p>
                      <p className="text-2xl font-bold">{formatCurrency(valuation.tradeInValue)}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Typical part-exchange value at parks
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700">
                          This is an instant estimate based on typical market values
                        </p>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700">
                          Actual value may vary based on specific condition and park location
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Next Steps</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-700">
                      Ready to upgrade? We can help you:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-emerald-600 mr-2">•</span>
                        <span>Find parks that accept part-exchange</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-emerald-600 mr-2">•</span>
                        <span>Get professional valuations from parks</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-emerald-600 mr-2">•</span>
                        <span>Negotiate the best deal on your new caravan</span>
                      </li>
                    </ul>

                    <Button className="w-full mt-4">
                      Find Part-Exchange Parks
                    </Button>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
                    How It Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-gray-700">
                  <p>
                    Our valuation tool provides an instant estimate based on:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-2">✓</span>
                      <span>Make, model, and year of your caravan</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-2">✓</span>
                      <span>Current condition and maintenance</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-2">✓</span>
                      <span>Typical depreciation rates</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-2">✓</span>
                      <span>Current market demand</span>
                    </li>
                  </ul>

                  <div className="pt-4 border-t">
                    <p className="font-medium mb-2">Important Notes:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Valuations are estimates only</li>
                      <li>• Final trade-in value determined by park operators</li>
                      <li>• Condition assessment by park required</li>
                      <li>• Values may vary by location and demand</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
