'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, ArrowLeft, MapPin, PoundSterling, Calendar, Home, Mail, CheckCircle, Sparkles, Calculator } from 'lucide-react'
import { UK_REGIONS, BUDGET_RANGES, TIMELINE_OPTIONS, PARK_FEATURES } from '@/lib/constants'

type QuestionnaireData = {
  region?: string
  budgetRange?: string
  timeline?: string
  features?: string[]
  hasPartExchange?: boolean
  email?: string
  firstName?: string
  phone?: string
}

export default function HomePage() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<QuestionnaireData>({})
  const [matchedParks, setMatchedParks] = useState<any[]>([])
  const [sessionId, setSessionId] = useState<string>('')

  const updateData = (updates: Partial<QuestionnaireData>) => {
    setData(prev => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    setStep(prev => prev + 1)
    trackActivity()
  }

  const prevStep = () => setStep(prev => Math.max(0, prev - 1))

  const trackActivity = () => {
    // Track progression through questionnaire
    const sid = sessionId || `session-${Math.random().toString(36).substring(2)}`
    if (!sessionId) setSessionId(sid)

    fetch('/api/leads/activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: sid,
        activities: [{
          type: 'questionnaire_progress',
          data: { step, ...data },
        }],
      }),
    }).catch(() => {})
  }

  const submitQuestionnaire = async () => {
    try {
      // Submit lead capture
      await fetch('/api/leads/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stage: 'qualified',
          sessionId,
          email: data.email,
          firstName: data.firstName,
          phone: data.phone,
          budgetRange: data.budgetRange,
          timeline: data.timeline,
          preferredRegions: data.region ? [data.region] : [],
          mustHaveFeatures: data.features || [],
          hasPartExchange: data.hasPartExchange,
        }),
      })

      // Fetch matching parks
      const params = new URLSearchParams()
      if (data.region) params.append('region', data.region)
      const response = await fetch(`/api/parks?${params}`)
      const result = await response.json()
      setMatchedParks(result.parks?.slice(0, 3) || [])

      nextStep()
    } catch (error) {
      console.error('Failed to submit:', error)
    }
  }

  const toggleFeature = (feature: string) => {
    const current = data.features || []
    if (current.includes(feature)) {
      updateData({ features: current.filter(f => f !== feature) })
    } else {
      updateData({ features: [...current, feature] })
    }
  }

  // Step 0: Welcome / Hero
  if (step === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              Free Independent Comparison Service
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-6">
              Find Your Perfect
              <span className="text-emerald-600"> Static Caravan</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Answer a few quick questions and we'll match you with the best holiday parks across the UK
            </p>
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">500+</div>
                  <div className="text-gray-600">Holiday Parks</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">2 mins</div>
                  <div className="text-gray-600">To Complete</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">100%</div>
                  <div className="text-gray-600">Free Service</div>
                </div>
              </div>
              <Button size="lg" className="w-full sm:w-auto" onClick={nextStep}>
                Start Finding Your Caravan
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              No obligation • Independent advice • Trusted by thousands
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Step 1: Region Selection
  if (step === 1) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">Question 1 of 5</span>
                <div className="flex gap-1">
                  {[0,1,2,3,4].map(i => (
                    <div key={i} className={`h-2 w-12 rounded-full ${i === 0 ? 'bg-emerald-600' : 'bg-gray-200'}`} />
                  ))}
                </div>
              </div>
            </div>

            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <div className="flex items-start mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 mr-4">
                    <MapPin className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Where would you like to buy?
                    </h2>
                    <p className="text-gray-600">Choose your preferred region in the UK</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {UK_REGIONS.map(region => (
                    <button
                      key={region}
                      onClick={() => updateData({ region })}
                      className={`p-4 rounded-lg border-2 text-left transition-all hover:border-emerald-400 ${
                        data.region === region
                          ? 'border-emerald-600 bg-emerald-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="font-semibold">{region}</div>
                    </button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={nextStep}
                    disabled={!data.region}
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Step 2: Budget Range
  if (step === 2) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">Question 2 of 5</span>
                <div className="flex gap-1">
                  {[0,1,2,3,4].map(i => (
                    <div key={i} className={`h-2 w-12 rounded-full ${i <= 1 ? 'bg-emerald-600' : 'bg-gray-200'}`} />
                  ))}
                </div>
              </div>
            </div>

            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <div className="flex items-start mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 mr-4">
                    <PoundSterling className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      What's your budget?
                    </h2>
                    <p className="text-gray-600">Select your price range</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 mb-8">
                  {BUDGET_RANGES.map(range => (
                    <button
                      key={range.label}
                      onClick={() => updateData({ budgetRange: range.label })}
                      className={`p-4 rounded-lg border-2 text-left transition-all hover:border-emerald-400 ${
                        data.budgetRange === range.label
                          ? 'border-emerald-600 bg-emerald-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="font-semibold text-lg">{range.label}</div>
                      <div className="text-sm text-gray-600 mt-1">{range.description}</div>
                    </button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={nextStep}
                    disabled={!data.budgetRange}
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Step 3: Timeline
  if (step === 3) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">Question 3 of 5</span>
                <div className="flex gap-1">
                  {[0,1,2,3,4].map(i => (
                    <div key={i} className={`h-2 w-12 rounded-full ${i <= 2 ? 'bg-emerald-600' : 'bg-gray-200'}`} />
                  ))}
                </div>
              </div>
            </div>

            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <div className="flex items-start mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 mr-4">
                    <Calendar className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      When are you looking to buy?
                    </h2>
                    <p className="text-gray-600">This helps us prioritize the best matches</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 mb-8">
                  {TIMELINE_OPTIONS.map(option => (
                    <button
                      key={option.value}
                      onClick={() => updateData({ timeline: option.value })}
                      className={`p-4 rounded-lg border-2 text-left transition-all hover:border-emerald-400 ${
                        data.timeline === option.value
                          ? 'border-emerald-600 bg-emerald-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="font-semibold">{option.label}</div>
                      <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                    </button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={nextStep}
                    disabled={!data.timeline}
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Step 4: Features & Part Exchange
  if (step === 4) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">Question 4 of 5</span>
                <div className="flex gap-1">
                  {[0,1,2,3,4].map(i => (
                    <div key={i} className={`h-2 w-12 rounded-full ${i <= 3 ? 'bg-emerald-600' : 'bg-gray-200'}`} />
                  ))}
                </div>
              </div>
            </div>

            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <div className="flex items-start mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 mr-4">
                    <Home className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      What features are important to you?
                    </h2>
                    <p className="text-gray-600">Select all that apply (optional)</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  {PARK_FEATURES.map(feature => (
                    <button
                      key={feature}
                      onClick={() => toggleFeature(feature)}
                      className={`p-3 rounded-lg border-2 text-sm transition-all hover:border-emerald-400 ${
                        data.features?.includes(feature)
                          ? 'border-emerald-600 bg-emerald-50'
                          : 'border-gray-200'
                      }`}
                    >
                      {feature}
                    </button>
                  ))}
                </div>

                <div className="border-t pt-6 mb-8">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.hasPartExchange || false}
                      onChange={(e) => updateData({ hasPartExchange: e.target.checked })}
                      className="mt-1 h-5 w-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div className="ml-3">
                      <div className="font-semibold">I have a caravan to part-exchange</div>
                      <div className="text-sm text-gray-600">
                        We'll help you get the best value for your current caravan
                      </div>
                    </div>
                  </label>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button className="flex-1" onClick={nextStep}>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Step 5: Contact Information
  if (step === 5) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">Question 5 of 5</span>
                <div className="flex gap-1">
                  {[0,1,2,3,4].map(i => (
                    <div key={i} className={`h-2 w-12 rounded-full bg-emerald-600`} />
                  ))}
                </div>
              </div>
            </div>

            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <div className="flex items-start mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 mr-4">
                    <Mail className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Get your personalized matches
                    </h2>
                    <p className="text-gray-600">We'll send you parks that match your preferences</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={data.firstName || ''}
                      onChange={(e) => updateData({ firstName: e.target.value })}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={data.email || ''}
                      onChange={(e) => updateData({ email: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={data.phone || ''}
                      onChange={(e) => updateData({ phone: e.target.value })}
                      placeholder="07700 900000"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-900">
                      <div className="font-semibold mb-1">100% Free Service</div>
                      <div>No spam. We'll only send you relevant park matches and buying advice.</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={submitQuestionnaire}
                    disabled={!data.email || !data.firstName}
                  >
                    Show Me My Matches
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Step 6: Results
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Perfect! We've found {matchedParks.length > 0 ? matchedParks.length : 'some great'} matches for you
            </h1>
            <p className="text-gray-600">
              Based on your preferences in {data.region} with a budget of {data.budgetRange}
            </p>
          </div>

          <Card className="shadow-xl border-0 mb-8">
            <CardContent className="p-8">
              <h3 className="font-semibold text-lg mb-4">What happens next?</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-semibold text-sm mr-3 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <div className="font-medium">Check your email</div>
                    <div className="text-sm text-gray-600">We've sent you a detailed comparison of parks that match your criteria</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-semibold text-sm mr-3 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <div className="font-medium">Browse and compare</div>
                    <div className="text-sm text-gray-600">Use our tools to compare prices, features, and calculate true costs</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-semibold text-sm mr-3 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <div className="font-medium">We'll help you negotiate</div>
                    <div className="text-sm text-gray-600">Our team will introduce you to parks and help get the best deal</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/parks">
              <Button size="lg" className="w-full sm:w-auto">
                Browse All Parks
              </Button>
            </Link>
            <Link href="/tools/budget-calculator">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Calculator className="mr-2 h-4 w-4" />
                Budget Calculator
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
