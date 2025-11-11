import { NextRequest, NextResponse } from 'next/server'
import { getParkById } from '@/lib/supabase/queries'
import { DEFAULT_COSTS, DEFAULT_SITE_FEES, FINANCE_RATES } from '@/lib/constants'
import type { CalculateRequest, CalculateResponse } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body: CalculateRequest = await request.json()
    const { type, inputs } = body

    if (!type || !inputs) {
      return NextResponse.json(
        { error: 'Type and inputs are required' },
        { status: 400 }
      )
    }

    let response: CalculateResponse

    switch (type) {
      case 'budget':
        response = await calculateBudget(inputs)
        break
      case 'true_cost':
        response = await calculateTrueCost(inputs)
        break
      case 'valuation':
        response = calculateValuation(inputs)
        break
      default:
        return NextResponse.json(
          { error: 'Invalid calculator type' },
          { status: 400 }
        )
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Calculator API error:', error)
    return NextResponse.json(
      { error: 'Calculation failed' },
      { status: 500 }
    )
  }
}

async function calculateBudget(inputs: any): Promise<CalculateResponse> {
  const {
    caravanPrice = 35000,
    deposit = 7000,
    termYears = 7,
    interestRate = FINANCE_RATES.good,
  } = inputs

  const principal = caravanPrice - deposit
  const monthlyRate = interestRate / 100 / 12
  const numPayments = termYears * 12

  // Calculate monthly payment using loan formula
  const monthlyPayment = principal *
    (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)

  const totalInterest = (monthlyPayment * numPayments) - principal
  const totalCost = monthlyPayment * numPayments + deposit

  return {
    type: 'budget',
    results: {
      monthlyPayment: Math.round(monthlyPayment),
      totalInterest: Math.round(totalInterest),
      totalCost: Math.round(totalCost),
    },
  }
}

async function calculateTrueCost(inputs: any): Promise<CalculateResponse> {
  const {
    parkId,
    caravanPrice = 35000,
    usage = 'regular',
  } = inputs

  let siteFees = 3500

  // If parkId provided, get actual site fees
  if (parkId) {
    try {
      const park = await getParkById(parkId)
      if (park.site_fees.annual) {
        siteFees = park.site_fees.annual
      }
    } catch (error) {
      console.error('Failed to fetch park:', error)
    }
  }

  // Calculate running costs based on usage
  const usageMultipliers = {
    occasional: 0.5,  // ~20 days/year
    regular: 1.0,     // ~40 days/year
    frequent: 1.5,    // ~60 days/year
  }

  const multiplier = usageMultipliers[usage as keyof typeof usageMultipliers] || 1

  const costs = {
    siteFees,
    insurance: DEFAULT_COSTS.insurance,
    utilities: Math.round(1200 * multiplier), // Gas, electric, water
    maintenance: Math.round(500 * multiplier),
    winterization: DEFAULT_COSTS.winterization,
    gasSafety: DEFAULT_COSTS.gasSafety,
  }

  const annualCost = Object.values(costs).reduce((sum, cost) => sum + cost, 0)
  const monthlyCost = Math.round(annualCost / 12)
  const fiveYearCost = annualCost * 5 + caravanPrice

  return {
    type: 'true_cost',
    results: {
      monthlyCost,
      annualCost,
      fiveYearCost,
      breakdown: costs,
    },
  }
}

function calculateValuation(inputs: any): CalculateResponse {
  const {
    make = '',
    model = '',
    year = 2020,
    condition = 'good',
  } = inputs

  // Simplified valuation logic
  // In production, this would use a proper valuation database
  const currentYear = new Date().getFullYear()
  const age = currentYear - year

  // Base depreciation: 15% per year for first 5 years, 5% thereafter
  let depreciationRate = 0
  if (age <= 5) {
    depreciationRate = age * 0.15
  } else {
    depreciationRate = 0.75 + ((age - 5) * 0.05)
  }

  // Cap depreciation at 80%
  depreciationRate = Math.min(depreciationRate, 0.80)

  // Condition adjustments
  const conditionAdjustments = {
    excellent: 1.1,
    good: 1.0,
    fair: 0.85,
    poor: 0.65,
  }

  const conditionMultiplier = conditionAdjustments[condition as keyof typeof conditionAdjustments] || 1

  // Estimate base value (simplified)
  const estimatedOriginalPrice = 40000 // Would be looked up by make/model
  const currentValue = estimatedOriginalPrice * (1 - depreciationRate) * conditionMultiplier

  const rangeMin = Math.round(currentValue * 0.9)
  const rangeMax = Math.round(currentValue * 1.1)
  const tradeInValue = Math.round(currentValue * 0.85) // Trade-in typically 85% of private value

  return {
    type: 'valuation',
    results: {
      estimatedValue: Math.round(currentValue),
      rangeMin,
      rangeMax,
      tradeInValue,
    },
  }
}
