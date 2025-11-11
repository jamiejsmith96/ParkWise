// Database types matching the schema

export interface Park {
  id: string
  name: string
  slug: string
  operator: string | null
  operator_group: string | null

  // Location
  address_line1: string | null
  address_line2: string | null
  town: string | null
  county: string | null
  region: string | null
  postcode: string | null
  country: string
  latitude: number | null
  longitude: number | null

  // Commission settings
  is_partner: boolean
  commission_type: 'per_lead' | 'per_sale' | 'hybrid'
  commission_per_lead: number
  commission_per_sale: number
  commission_percentage: number | null

  // Features and amenities
  features: string[]
  facilities: Record<string, boolean>

  // Caravan details
  total_pitches: number | null
  available_pitches: number | null
  min_caravan_price: number | null
  max_caravan_price: number | null
  finance_available: boolean
  part_exchange_accepted: boolean

  // Costs
  site_fees: {
    annual?: number
    includes?: string[]
    excludes?: string[]
  }
  additional_costs: Record<string, number>

  // Rules and restrictions
  season_length: number
  subletting_allowed: boolean
  residential_use: boolean
  pet_friendly: boolean
  age_limit: number | null

  // Content
  description: string | null
  short_description: string | null
  unique_selling_points: string[]
  images: Array<{ url: string; caption: string; order: number }>
  virtual_tour_url: string | null
  brochure_url: string | null

  // Reviews and ratings
  google_rating: number | null
  google_reviews_count: number | null
  internal_rating: number | null
  internal_reviews_count: number | null

  // SEO
  meta_title: string | null
  meta_description: string | null

  // Status and settings
  status: 'active' | 'inactive' | 'pending'
  priority_order: number
  lead_cap_daily: number | null
  lead_cap_monthly: number | null

  // Timestamps
  created_at: string
  updated_at: string
  last_verified_at: string | null

  // Computed fields (not in database)
  distance?: number
}

export interface Lead {
  id: string

  // Progressive contact information
  email: string | null
  email_verified: boolean
  phone: string | null
  phone_verified: boolean
  first_name: string | null
  last_name: string | null

  // Location
  postcode: string | null
  town: string | null
  distance_willing_to_travel: number | null

  // Lead qualification data
  lead_type: 'buyer' | 'part_exchange' | 'finance'
  budget_min: number | null
  budget_max: number | null
  deposit_available: number | null
  finance_required: boolean
  finance_pre_approved: boolean

  // Timeline and urgency
  timeline: 'immediate' | '1_month' | '3_months' | '6_months' | 'researching' | null
  viewing_availability: string | null

  // Part exchange details
  has_part_exchange: boolean
  part_exchange_make: string | null
  part_exchange_model: string | null
  part_exchange_year: number | null
  part_exchange_value: number | null
  current_park: string | null

  // Preferences
  preferred_regions: string[]
  must_have_features: string[]
  caravan_type_preference: 'new' | 'used' | 'either' | null
  number_of_bedrooms: number | null

  // Lead scoring
  score: number
  score_breakdown: Record<string, number>
  temperature: 'cold' | 'warm' | 'hot' | 'immediate'
  quality_notes: string | null

  // Attribution and tracking
  source: string | null
  medium: string | null
  campaign: string | null
  keyword: string | null
  landing_page: string | null
  referrer: string | null

  // Device and browser
  ip_address: string | null
  user_agent: string | null
  device_type: 'desktop' | 'mobile' | 'tablet' | null
  browser: string | null

  // Consent and preferences
  marketing_consent: boolean
  marketing_consent_date: string | null
  privacy_accepted: boolean
  privacy_accepted_date: string | null

  // Internal status
  status: 'new' | 'contacted' | 'qualified' | 'assigned' | 'converted' | 'lost'
  duplicate_of: string | null
  merged_into: string | null

  // Timestamps
  created_at: string
  updated_at: string
  last_activity_at: string
}

export interface LeadParkInterest {
  id: string
  lead_id: string
  park_id: string

  // Interest tracking
  interest_type: 'viewed' | 'saved' | 'compared' | 'inquired' | 'contacted'
  interest_level: number
  specific_caravan: string | null

  // Assignment to park
  assigned_to_park: boolean
  assigned_at: string | null
  assignment_method: 'manual' | 'automatic' | 'requested' | null

  // Park response
  park_contacted_at: string | null
  park_response: 'accepted' | 'rejected' | 'no_response' | null
  park_response_at: string | null
  park_notes: string | null

  // Outcome tracking
  outcome: 'pending' | 'contacted' | 'viewing_booked' | 'viewing_completed' | 'offer_made' | 'sold' | 'lost' | null
  outcome_date: string | null
  outcome_notes: string | null

  // Financial
  sale_value: number | null
  commission_due: number | null
  commission_paid: boolean
  commission_paid_date: string | null
  invoice_number: string | null

  // Timestamps
  created_at: string
  updated_at: string
}

export interface LeadActivity {
  id: string
  lead_id: string | null
  session_id: string

  // Activity details
  activity_type: string
  activity_category: 'engagement' | 'interest' | 'intent' | 'conversion' | null

  // Context
  page_url: string | null
  page_title: string | null
  park_id: string | null

  // Activity data
  activity_data: Record<string, any>
  duration_seconds: number | null

  // Scoring impact
  score_impact: number

  created_at: string
}

export interface EmailCapture {
  id: string
  lead_id: string | null
  email: string

  // Capture context
  capture_point: 'exit_intent' | 'value_exchange' | 'calculator' | 'comparison' | null
  capture_page: string | null
  value_proposition: string | null

  // Verification
  verification_sent: boolean
  verification_sent_at: string | null
  verified: boolean
  verified_at: string | null

  created_at: string
}

export interface AdminUser {
  id: string
  email: string
  password_hash: string
  name: string | null
  role: 'admin' | 'super_admin' | 'viewer'

  // Permissions
  can_view_leads: boolean
  can_edit_leads: boolean
  can_export_leads: boolean
  can_manage_parks: boolean

  // Status
  is_active: boolean
  last_login_at: string | null

  created_at: string
  updated_at: string
}

export interface Session {
  id: string
  lead_id: string | null

  // Session data
  started_at: string
  last_activity_at: string
  page_views: number
  total_duration_seconds: number

  // Attribution
  source: string | null
  medium: string | null
  campaign: string | null

  // Device info
  ip_address: string | null
  user_agent: string | null

  data: Record<string, any>
}

// API Request/Response types

export interface ParksListRequest {
  region?: string
  county?: string
  features?: string[]
  minPrice?: number
  maxPrice?: number
  partExchange?: boolean
  subletting?: boolean
  limit?: number
  offset?: number
  sortBy?: 'price' | 'rating' | 'distance' | 'name'
  sortOrder?: 'asc' | 'desc'
  postcode?: string
  radius?: number
}

export interface ParksListResponse {
  parks: Array<{
    id: string
    name: string
    slug: string
    operator: string
    county: string
    region: string
    minPrice: number
    maxPrice: number
    rating: number
    imageUrl: string
    features: string[]
    distance?: number
  }>
  total: number
  hasMore: boolean
}

export interface LeadCaptureRequest {
  stage: 'email' | 'preferences' | 'contact' | 'full'
  sessionId: string
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
  budgetMin?: number
  budgetMax?: number
  timeline?: string
  preferredRegions?: string[]
  hasPartExchange?: boolean
  partExchangeDetails?: {
    make: string
    model: string
    year: number
    estimatedValue: number
  }
  financeRequired?: boolean
  source?: string
  medium?: string
  campaign?: string
}

export interface LeadCaptureResponse {
  success: boolean
  leadId: string
  nextStage?: string
  message?: string
}

export interface ActivityTrackRequest {
  leadId?: string
  sessionId: string
  activities: Array<{
    type: string
    page?: string
    parkId?: string
    data?: Record<string, any>
    duration?: number
  }>
}

export interface CalculateRequest {
  type: 'budget' | 'true_cost' | 'valuation'
  inputs: {
    caravanPrice?: number
    deposit?: number
    termYears?: number
    interestRate?: number
    parkId?: string
    usage?: 'occasional' | 'regular' | 'frequent'
    make?: string
    model?: string
    year?: number
    condition?: 'excellent' | 'good' | 'fair' | 'poor'
    currentPark?: string
  }
}

export interface CalculateResponse {
  type: string
  results: {
    monthlyPayment?: number
    totalInterest?: number
    totalCost?: number
    monthlyCost?: number
    annualCost?: number
    fiveYearCost?: number
    breakdown?: Record<string, number>
    estimatedValue?: number
    rangeMin?: number
    rangeMax?: number
    tradeInValue?: number
  }
}

// Lead scoring types
export interface ScoreResult {
  score: number
  temperature: 'cold' | 'warm' | 'hot' | 'immediate'
  breakdown: Record<string, number>
  recommendations: string[]
}

export interface ScoringWeights {
  email: number
  emailVerified: number
  phone: number
  phoneVerified: number
  fullName: number
  budgetRanges: {
    under20k: number
    '20k-40k': number
    '40k-60k': number
    '60k-100k': number
    over100k: number
  }
  hasDeposit: number
  timelines: {
    immediate: number
    oneMonth: number
    threeMonths: number
    sixMonths: number
    researching: number
  }
  behaviors: {
    parksViewed: number
    calculatorUsed: number
    comparisonUsed: number
    returnVisit: number
    timeOnSite: number
    downloadsGuide: number
  }
  highIntent: {
    requestedCallback: number
    bookedViewing: number
    specificCaravanInquiry: number
    partExchangeValue: number
    preApprovedFinance: number
  }
}
