import type { Lead, LeadActivity, ScoringWeights, ScoreResult } from '@/types'

export class LeadScoringEngine {
  private weights: ScoringWeights = {
    // Contact Information (30 points max)
    email: 3,
    emailVerified: 2,
    phone: 10,
    phoneVerified: 5,
    fullName: 10,

    // Financial Qualification (25 points max)
    budgetRanges: {
      under20k: 0,
      '20k-40k': 8,
      '40k-60k': 15,
      '60k-100k': 20,
      over100k: 25,
    },
    hasDeposit: 5,

    // Timeline (25 points max)
    timelines: {
      immediate: 25,
      oneMonth: 20,
      threeMonths: 15,
      sixMonths: 8,
      researching: 3,
    },

    // Engagement (20 points max)
    behaviors: {
      parksViewed: 2, // per park
      calculatorUsed: 5,
      comparisonUsed: 5,
      returnVisit: 5,
      timeOnSite: 1, // per 5 minutes
      downloadsGuide: 3,
    },

    // Bonus Points
    highIntent: {
      requestedCallback: 15,
      bookedViewing: 20,
      specificCaravanInquiry: 10,
      partExchangeValue: 10, // if >£10k
      preApprovedFinance: 15,
    },
  }

  calculateScore(lead: Lead, activities: LeadActivity[]): ScoreResult {
    const breakdown: Record<string, number> = {}
    let totalScore = 0

    // Contact scoring
    if (lead.email) {
      breakdown.email = this.weights.email
      if (lead.email_verified) {
        breakdown.emailVerified = this.weights.emailVerified
      }
    }

    if (lead.phone) {
      breakdown.phone = this.weights.phone
      if (lead.phone_verified) {
        breakdown.phoneVerified = this.weights.phoneVerified
      }
    }

    if (lead.first_name && lead.last_name) {
      breakdown.fullName = this.weights.fullName
    }

    // Budget scoring
    if (lead.budget_max) {
      if (lead.budget_max >= 100000) {
        breakdown.budget = this.weights.budgetRanges.over100k
      } else if (lead.budget_max >= 60000) {
        breakdown.budget = this.weights.budgetRanges['60k-100k']
      } else if (lead.budget_max >= 40000) {
        breakdown.budget = this.weights.budgetRanges['40k-60k']
      } else if (lead.budget_max >= 20000) {
        breakdown.budget = this.weights.budgetRanges['20k-40k']
      } else {
        breakdown.budget = this.weights.budgetRanges.under20k
      }

      // Check for adequate deposit
      if (lead.deposit_available && lead.budget_max > 0) {
        const depositPercentage = (lead.deposit_available / lead.budget_max) * 100
        if (depositPercentage >= 20) {
          breakdown.hasDeposit = this.weights.hasDeposit
        }
      }
    }

    // Timeline scoring
    if (lead.timeline) {
      const timelineMap: Record<string, number> = {
        immediate: this.weights.timelines.immediate,
        '1_month': this.weights.timelines.oneMonth,
        '3_months': this.weights.timelines.threeMonths,
        '6_months': this.weights.timelines.sixMonths,
        researching: this.weights.timelines.researching,
      }
      breakdown.timeline = timelineMap[lead.timeline] || 0
    }

    // Activity scoring
    const parksViewed = activities.filter(
      (a) => a.activity_type === 'park_view'
    ).length
    if (parksViewed > 0) {
      breakdown.parksViewed = Math.min(
        parksViewed * this.weights.behaviors.parksViewed,
        10
      )
    }

    const calculatorUsed = activities.some(
      (a) => a.activity_type === 'calculator_use'
    )
    if (calculatorUsed) {
      breakdown.calculatorUsed = this.weights.behaviors.calculatorUsed
    }

    const comparisonUsed = activities.some(
      (a) => a.activity_type === 'comparison_use'
    )
    if (comparisonUsed) {
      breakdown.comparisonUsed = this.weights.behaviors.comparisonUsed
    }

    // Check for return visits (sessions on different days)
    const sessionDates = new Set(
      activities.map((a) => new Date(a.created_at).toDateString())
    )
    if (sessionDates.size > 1) {
      breakdown.returnVisit = this.weights.behaviors.returnVisit
    }

    // Time on site (in 5-minute increments)
    const totalMinutes = activities
      .filter((a) => a.duration_seconds)
      .reduce((sum, a) => sum + (a.duration_seconds! / 60), 0)
    if (totalMinutes > 0) {
      breakdown.timeOnSite = Math.min(
        Math.floor(totalMinutes / 5) * this.weights.behaviors.timeOnSite,
        5
      )
    }

    const guideDownloaded = activities.some(
      (a) => a.activity_type === 'guide_download'
    )
    if (guideDownloaded) {
      breakdown.downloadsGuide = this.weights.behaviors.downloadsGuide
    }

    // High intent actions
    if (activities.some((a) => a.activity_type === 'callback_requested')) {
      breakdown.requestedCallback = this.weights.highIntent.requestedCallback
    }

    if (activities.some((a) => a.activity_type === 'viewing_booked')) {
      breakdown.bookedViewing = this.weights.highIntent.bookedViewing
    }

    const specificInquiry = activities.some(
      (a) =>
        a.activity_type === 'park_inquire' &&
        a.activity_data?.specific_caravan
    )
    if (specificInquiry) {
      breakdown.specificCaravan = this.weights.highIntent.specificCaravanInquiry
    }

    if (
      lead.has_part_exchange &&
      lead.part_exchange_value &&
      lead.part_exchange_value >= 10000
    ) {
      breakdown.partExchange = this.weights.highIntent.partExchangeValue
    }

    if (lead.finance_pre_approved) {
      breakdown.preApprovedFinance = this.weights.highIntent.preApprovedFinance
    }

    // Calculate total
    totalScore = Object.values(breakdown).reduce((sum, score) => sum + score, 0)

    // Cap at 100
    totalScore = Math.min(totalScore, 100)

    return {
      score: totalScore,
      temperature: this.getTemperature(totalScore, lead, activities),
      breakdown,
      recommendations: this.getRecommendations(totalScore, breakdown, lead),
    }
  }

  private getTemperature(
    score: number,
    lead: Lead,
    activities: LeadActivity[]
  ): 'cold' | 'warm' | 'hot' | 'immediate' {
    // Override based on specific behaviors
    if (
      lead.timeline === 'immediate' ||
      activities.some((a) => a.activity_type === 'viewing_booked')
    ) {
      return 'immediate'
    }

    if (score >= 75) return 'immediate'
    if (score >= 50) return 'hot'
    if (score >= 25) return 'warm'
    return 'cold'
  }

  private getRecommendations(
    score: number,
    breakdown: Record<string, number>,
    lead: Lead
  ): string[] {
    const recommendations: string[] = []

    // Missing critical information
    if (!breakdown.phone) {
      recommendations.push('Get phone number for +10 points - critical for conversion')
    }

    if (!breakdown.fullName) {
      recommendations.push('Capture full name for +10 points')
    }

    // Missing engagement
    if (!breakdown.calculatorUsed) {
      recommendations.push('Encourage calculator use for +5 points - shows serious interest')
    }

    if (!breakdown.comparisonUsed && (breakdown.parksViewed || 0) >= 2) {
      recommendations.push('Suggest comparison tool for +5 points')
    }

    // Budget/qualification issues
    if (!lead.budget_max) {
      recommendations.push('Qualify budget to score financial capability')
    }

    if (!lead.deposit_available) {
      recommendations.push('Understand deposit availability for better qualification')
    }

    // Timeline concerns
    if (lead.timeline === 'researching') {
      recommendations.push('Nurture with content - timeline is long')
    }

    // High-value actions
    if (score >= 40 && !breakdown.requestedCallback) {
      recommendations.push('Offer callback for +15 points - lead is warming up')
    }

    if (score >= 60 && !breakdown.bookedViewing) {
      recommendations.push('Push for viewing booking (+20 points) - lead is hot')
    }

    // Part exchange opportunity
    if (lead.has_part_exchange && !lead.part_exchange_value) {
      recommendations.push('Get part-exchange valuation to increase urgency')
    }

    return recommendations
  }

  // Predict conversion likelihood (0-100%)
  predictConversion(lead: Lead, activities: LeadActivity[]): number {
    const scoreResult = this.calculateScore(lead, activities)
    const score = scoreResult.score

    // Base conversion rate on score
    let conversionProbability = score * 0.8 // Max 80% from score

    // Boost for specific indicators
    if (lead.phone) conversionProbability += 10
    if (lead.timeline === 'immediate') conversionProbability += 15
    if (lead.timeline === '1_month') conversionProbability += 10
    if (activities.some((a) => a.activity_type === 'viewing_booked'))
      conversionProbability += 20
    if (lead.finance_pre_approved) conversionProbability += 10

    // Reduce for concerning factors
    if (lead.timeline === 'researching') conversionProbability -= 20
    if (!lead.phone) conversionProbability -= 15
    if (!lead.budget_max) conversionProbability -= 10

    return Math.max(0, Math.min(100, conversionProbability))
  }

  // Suggest next best action for a lead
  suggestNextAction(lead: Lead, activities: LeadActivity[]): string {
    const scoreResult = this.calculateScore(lead, activities)

    // Immediate/Hot leads - push for viewing
    if (scoreResult.temperature === 'immediate' || scoreResult.temperature === 'hot') {
      if (!activities.some((a) => a.activity_type === 'viewing_booked')) {
        return 'Book a viewing - this lead is ready'
      }
      return 'Follow up on viewing arrangement'
    }

    // Warm leads - build relationship
    if (scoreResult.temperature === 'warm') {
      if (!lead.phone) {
        return 'Request phone number to discuss requirements'
      }
      if (!activities.some((a) => a.activity_type === 'calculator_use')) {
        return 'Send budget calculator to understand affordability'
      }
      return 'Provide personalized park recommendations'
    }

    // Cold leads - nurture
    if (!lead.email) {
      return 'Capture email for nurture campaign'
    }
    if (activities.length < 3) {
      return 'Encourage more engagement - send helpful content'
    }
    return 'Add to nurture sequence with valuable content'
  }
}

// Helper function to score and update a lead
export async function scoreLead(
  lead: Lead,
  activities: LeadActivity[]
): Promise<ScoreResult> {
  const scorer = new LeadScoringEngine()
  return scorer.calculateScore(lead, activities)
}

// Calculate lead quality for filtering/sorting
export function getLeadQuality(score: number): 'low' | 'medium' | 'high' | 'premium' {
  if (score >= 75) return 'premium'
  if (score >= 50) return 'high'
  if (score >= 25) return 'medium'
  return 'low'
}
