'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import { Calculator, TrendingUp, AlertCircle } from 'lucide-react'

export default function BudgetCalculatorPage() {
  const [values, setValues] = useState({
    caravanPrice: 35000,
    deposit: 7000,
    termYears: 7,
    interestRate: 6.9,
    parkFees: 3500,
    insurance: 500,
    utilities: 1200,
  })

  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalInterest: 0,
    monthlyTotal: 0,
    annualTotal: 0,
  })

  const [emailCaptured, setEmailCaptured] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    calculateResults()
    trackCalculatorUse()
  }, [values])

  const calculateResults = () => {
    const principal = values.caravanPrice - values.deposit
    const monthlyRate = values.interestRate / 100 / 12
    const numPayments = values.termYears * 12

    const monthlyPayment = principal *
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)

    const totalInterest = (monthlyPayment * numPayments) - principal

    const monthlyFees = values.parkFees / 12
    const monthlyInsurance = values.insurance / 12
    const monthlyUtilities = values.utilities / 12
    const monthlyTotal = monthlyPayment + monthlyFees + monthlyInsurance + monthlyUtilities

    setResults({
      monthlyPayment,
      totalInterest,
      monthlyTotal,
      annualTotal: monthlyTotal * 12,
    })
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
          data: { calculator: 'budget', ...values },
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

  const handleEmailCapture = async () => {
    const sessionId = getSessionId()
    await fetch('/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        stage: 'email',
        sessionId,
        email,
        source: 'calculator',
      }),
    })
    setEmailCaptured(true)
  }

  const depositPercentage = (values.deposit / values.caravanPrice) * 100

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center mb-4">
          <Calculator className="h-8 w-8 text-emerald-600 mr-3" />
          <h1 className="text-3xl font-bold">Budget Calculator</h1>
        </div>
        <p className="text-lg text-gray-600">
          Calculate your monthly payments and true costs of owning a static caravan
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Purchase Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Caravan Price */}
                <div>
                  <Label className="flex justify-between text-sm font-medium mb-2">
                    <span>Caravan Price</span>
                    <span className="text-emerald-600 font-semibold">
                      {formatCurrency(values.caravanPrice)}
                    </span>
                  </Label>
                  <Slider
                    value={[values.caravanPrice]}
                    onValueChange={([v]) => setValues({ ...values, caravanPrice: v })}
                    min={10000}
                    max={150000}
                    step={1000}
                  />
                </div>

                {/* Deposit */}
                <div>
                  <Label className="flex justify-between text-sm font-medium mb-2">
                    <span>Deposit ({depositPercentage.toFixed(0)}%)</span>
                    <span className="text-emerald-600 font-semibold">
                      {formatCurrency(values.deposit)}
                    </span>
                  </Label>
                  <Slider
                    value={[values.deposit]}
                    onValueChange={([v]) => setValues({ ...values, deposit: v })}
                    min={0}
                    max={values.caravanPrice}
                    step={500}
                  />
                  {depositPercentage < 20 && (
                    <p className="text-xs text-amber-600 mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      20% deposit recommended for best rates
                    </p>
                  )}
                </div>

                {/* Finance Term */}
                <div>
                  <Label className="flex justify-between text-sm font-medium mb-2">
                    <span>Finance Term</span>
                    <span className="text-emerald-600 font-semibold">
                      {values.termYears} years
                    </span>
                  </Label>
                  <Slider
                    value={[values.termYears]}
                    onValueChange={([v]) => setValues({ ...values, termYears: v })}
                    min={1}
                    max={10}
                    step={1}
                  />
                </div>

                {/* Interest Rate */}
                <div>
                  <Label className="flex justify-between text-sm font-medium mb-2">
                    <span>Interest Rate (APR)</span>
                    <span className="text-emerald-600 font-semibold">
                      {values.interestRate}%
                    </span>
                  </Label>
                  <Slider
                    value={[values.interestRate]}
                    onValueChange={([v]) => setValues({ ...values, interestRate: v })}
                    min={2}
                    max={15}
                    step={0.1}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Typical rates: 6.9% - 9.9% with good credit
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Annual Running Costs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="parkFees">Site Fees</Label>
                  <Input
                    id="parkFees"
                    type="number"
                    value={values.parkFees}
                    onChange={(e) => setValues({ ...values, parkFees: parseInt(e.target.value) })}
                  />
                </div>

                <div>
                  <Label htmlFor="insurance">Insurance</Label>
                  <Input
                    id="insurance"
                    type="number"
                    value={values.insurance}
                    onChange={(e) => setValues({ ...values, insurance: parseInt(e.target.value) })}
                  />
                </div>

                <div>
                  <Label htmlFor="utilities">Utilities (Gas, Electric, Water)</Label>
                  <Input
                    id="utilities"
                    type="number"
                    value={values.utilities}
                    onChange={(e) => setValues({ ...values, utilities: parseInt(e.target.value) })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Column */}
          <div className="space-y-6">
            <Card className="bg-emerald-50 border-emerald-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-emerald-600" />
                  Your Monthly Costs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Finance Payment</span>
                    <span className="font-semibold">
                      {formatCurrency(results.monthlyPayment)}/mo
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Site Fees</span>
                    <span>{formatCurrency(values.parkFees / 12)}/mo</span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Insurance</span>
                    <span>{formatCurrency(values.insurance / 12)}/mo</span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Utilities</span>
                    <span>{formatCurrency(values.utilities / 12)}/mo</span>
                  </div>

                  <div className="pt-3 border-t border-emerald-300">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-emerald-900">
                        Total Monthly
                      </span>
                      <span className="text-2xl font-bold text-emerald-600">
                        {formatCurrency(results.monthlyTotal)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Interest</span>
                    <span className="font-medium">{formatCurrency(results.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Annual Total</span>
                    <span className="font-medium">{formatCurrency(results.annualTotal)}</span>
                  </div>
                </div>

                {!emailCaptured ? (
                  <div className="pt-4 border-t border-emerald-300">
                    <p className="text-sm text-gray-700 mb-3">
                      Save your calculation and get personalized finance quotes
                    </p>
                    <Input
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mb-2"
                    />
                    <Button
                      onClick={handleEmailCapture}
                      className="w-full"
                      disabled={!email}
                    >
                      Save & Get Finance Quotes
                    </Button>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-emerald-300 text-center">
                    <p className="text-emerald-700 font-medium mb-3">
                      ✓ Calculation Saved!
                    </p>
                    <Button className="w-full">
                      Find Caravans in Your Budget
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Hidden Costs Warning */}
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="text-amber-900 flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5" />
                  Don't Forget Hidden Costs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-amber-900">
                  <li className="flex justify-between">
                    <span>• Winterization</span>
                    <span>£300-500/year</span>
                  </li>
                  <li className="flex justify-between">
                    <span>• Gas safety certificate</span>
                    <span>£80/year</span>
                  </li>
                  <li className="flex justify-between">
                    <span>• Decking maintenance</span>
                    <span>£200-500/year</span>
                  </li>
                  <li className="flex justify-between">
                    <span>• Connection/disconnection</span>
                    <span>£150-300</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Money-Saving Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ Aim for 20% deposit to get the best interest rates</li>
                  <li>✓ Compare multiple parks - site fees vary significantly</li>
                  <li>✓ Consider pre-owned caravans for better value</li>
                  <li>✓ Negotiate on price and annual fee increases</li>
                  <li>✓ Get quotes from multiple insurance providers</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
