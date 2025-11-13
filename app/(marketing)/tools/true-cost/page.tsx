'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import { TrendingUp, DollarSign, Calendar, ArrowRight, FileText, Calculator as CalculatorIcon } from 'lucide-react'
import Link from 'next/link'

export default function TrueCostCalculatorPage() {
  const [caravanPrice, setCaravanPrice] = useState(35000)
  const [parkId, setParkId] = useState('')
  const [usage, setUsage] = useState<'occasional' | 'regular' | 'frequent'>('regular')
  const [customSiteFees, setCustomSiteFees] = useState(3500)

  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    calculateCosts()
  }, [caravanPrice, parkId, usage, customSiteFees])

  const calculateCosts = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/tools/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'true_cost',
          inputs: {
            caravanPrice,
            parkId: parkId || undefined,
            usage,
          },
        }),
      })

      const data = await response.json()
      setResults(data.results)

      // Track calculator use
      trackCalculatorUse()
    } catch (error) {
      console.error('Calculation failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const trackCalculatorUse = () => {
    const sessionId = getSessionId()
    fetch('/api/leads/activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        activities: [{
          type: 'calculator_use',
          data: { calculator: 'true_cost', caravanPrice, usage },
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

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center mb-4">
          <DollarSign className="h-8 w-8 text-emerald-600 mr-3" />
          <h1 className="text-3xl font-bold">True Cost Calculator</h1>
        </div>
        <p className="text-lg text-gray-600">
          Understand the real cost of caravan ownership over 5 years
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Caravan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="price">Purchase Price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={caravanPrice}
                    onChange={(e) => setCaravanPrice(parseInt(e.target.value))}
                    step={1000}
                  />
                </div>

                <div>
                  <Label htmlFor="usage">Expected Usage</Label>
                  <Select value={usage} onValueChange={(v: any) => setUsage(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="occasional">
                        Occasional (2-3 weekends/month)
                      </SelectItem>
                      <SelectItem value="regular">
                        Regular (Most weekends)
                      </SelectItem>
                      <SelectItem value="frequent">
                        Frequent (Extended stays)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">
                    Higher usage = higher utility costs
                  </p>
                </div>

                <div>
                  <Label htmlFor="siteFees">Annual Site Fees</Label>
                  <Input
                    id="siteFees"
                    type="number"
                    value={customSiteFees}
                    onChange={(e) => setCustomSiteFees(parseInt(e.target.value))}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Typical range: £2,500 - £5,000
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">
                  Why Calculate True Cost?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-blue-900 space-y-2">
                <p>
                  Many buyers focus only on the purchase price, but ongoing costs
                  can add up significantly.
                </p>
                <p className="font-medium">
                  Over 5 years, you might spend:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>£15,000 - £25,000 in site fees</li>
                  <li>£2,500 - £3,500 in insurance</li>
                  <li>£6,000 - £9,000 in utilities</li>
                  <li>Plus maintenance, winterization, and more</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {results && (
              <>
                <Card className="bg-emerald-50 border-emerald-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-emerald-900">
                      <TrendingUp className="mr-2 h-5 w-5" />
                      Cost Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Monthly Cost</span>
                        <span className="text-2xl font-bold text-emerald-600">
                          {formatCurrency(results.monthlyCost)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-emerald-300">
                        <span className="text-gray-700">Annual Cost</span>
                        <span className="text-xl font-semibold text-emerald-700">
                          {formatCurrency(results.annualCost)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">5-Year Total</span>
                        <span className="text-xl font-bold text-emerald-900">
                          {formatCurrency(results.fiveYearCost)}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 pt-3 border-t border-emerald-300">
                      Includes purchase price plus all running costs
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Annual Cost Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {results.breakdown && Object.entries(results.breakdown).map(([key, value]: [string, any]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-sm text-gray-700 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="font-medium">
                            {formatCurrency(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5" />
                      5-Year Projection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Purchase Price</span>
                        <span className="font-medium">{formatCurrency(caravanPrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Running Costs (5 yrs)</span>
                        <span className="font-medium">
                          {formatCurrency(results.annualCost * 5)}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t font-semibold">
                        <span>Total Investment</span>
                        <span className="text-emerald-600">
                          {formatCurrency(results.fiveYearCost)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 pt-2">
                        Depreciation: Your caravan will likely be worth 40-60% of
                        purchase price after 5 years
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Next Steps */}
                <Card className="border-emerald-200 bg-emerald-50">
                  <CardHeader>
                    <CardTitle className="text-emerald-900">Next Steps</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-emerald-900">
                      Understanding your true costs helps you make an informed decision. Here's what to do next:
                    </p>
                    <div className="space-y-3">
                      <Link href="/parks">
                        <Button variant="outline" className="w-full justify-between bg-white hover:bg-emerald-100">
                          <span>Find Parks Within Your Budget</span>
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href="/guides/running-costs">
                        <Button variant="outline" className="w-full justify-between bg-white hover:bg-emerald-100">
                          <span>Read Full Running Costs Guide</span>
                          <FileText className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href="/tools/budget-calculator">
                        <Button variant="outline" className="w-full justify-between bg-white hover:bg-emerald-100">
                          <span>Calculate Finance Payments</span>
                          <CalculatorIcon className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href="/parks/compare">
                        <Button variant="outline" className="w-full justify-between bg-white hover:bg-emerald-100">
                          <span>Compare Parks</span>
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>

        {/* Comparison with Alternatives */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Compare with Alternatives</CardTitle>
          </CardHeader>
          <CardContent>
            {results && (
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Your Caravan (5 years)</p>
                  <p className="text-2xl font-bold text-emerald-600">
                    {formatCurrency(results.fiveYearCost)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    ≈ {formatCurrency(results.fiveYearCost / 260)}/night
                  </p>
                </div>

                <div className="text-center p-4 border rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Holiday Rentals (5 years)</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(80000)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    ≈ £150/night × 100 nights/year
                  </p>
                </div>

                <div className="text-center p-4 border rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Hotels (5 years)</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(100000)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    ≈ £200/night × 100 nights/year
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
