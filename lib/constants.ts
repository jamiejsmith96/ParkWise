// UK regions for filtering
export const UK_REGIONS = [
  'South West',
  'South East',
  'East of England',
  'West Midlands',
  'East Midlands',
  'Yorkshire and the Humber',
  'North West',
  'North East',
  'Wales',
  'Scotland',
  'Northern Ireland',
] as const

// Common caravan park features
export const PARK_FEATURES = [
  'Swimming Pool',
  'Beach Access',
  'Sea Views',
  'Restaurant',
  'Bar & Entertainment',
  'Kids Club',
  'Play Area',
  'Dog Friendly',
  'Gym & Spa',
  'Shop on Site',
  'Laundry Facilities',
  'Pitch Parking',
  'Wi-Fi',
  'Clubhouse',
  'Fishing',
  'Golf Course',
  'Tennis Courts',
] as const

// Budget ranges for filters
export const BUDGET_RANGES = [
  { label: 'Under £20k', min: 0, max: 20000, description: 'Pre-owned, smaller models' },
  { label: '£20k - £40k', min: 20000, max: 40000, description: 'Good quality pre-owned caravans' },
  { label: '£40k - £60k', min: 40000, max: 60000, description: 'Nearly new or mid-range new' },
  { label: '£60k - £80k', min: 60000, max: 80000, description: 'Premium new caravans' },
  { label: '£80k - £100k', min: 80000, max: 100000, description: 'Luxury models with extras' },
  { label: 'Over £100k', min: 100000, max: 999999, description: 'Top-end luxury caravans' },
] as const

// Timeline options for lead qualification
export const TIMELINE_OPTIONS = [
  { value: 'immediate', label: 'Ready to Buy Now', days: 0, description: "I'm ready to make a purchase decision" },
  { value: '1_month', label: 'Within 1 Month', days: 30, description: 'Looking to buy very soon' },
  { value: '3_months', label: 'Within 3 Months', days: 90, description: 'Planning to buy this season' },
  { value: '6_months', label: 'Within 6 Months', days: 180, description: 'Actively searching and comparing' },
  { value: 'researching', label: 'Just Researching', days: 365, description: 'Early stages, gathering information' },
] as const

// Lead status options
export const LEAD_STATUSES = [
  { value: 'new', label: 'New', color: 'gray' },
  { value: 'contacted', label: 'Contacted', color: 'blue' },
  { value: 'qualified', label: 'Qualified', color: 'yellow' },
  { value: 'assigned', label: 'Assigned', color: 'purple' },
  { value: 'converted', label: 'Converted', color: 'green' },
  { value: 'lost', label: 'Lost', color: 'red' },
] as const

// Lead temperature
export const LEAD_TEMPERATURES = [
  { value: 'cold', label: 'Cold', color: 'blue', description: 'Early research stage' },
  { value: 'warm', label: 'Warm', color: 'yellow', description: 'Interested and engaged' },
  { value: 'hot', label: 'Hot', color: 'orange', description: 'Ready to move forward' },
  { value: 'immediate', label: 'Immediate', color: 'red', description: 'Urgent buyer' },
] as const

// Interest types
export const INTEREST_TYPES = [
  { value: 'viewed', label: 'Viewed' },
  { value: 'saved', label: 'Saved' },
  { value: 'compared', label: 'Compared' },
  { value: 'inquired', label: 'Inquired' },
  { value: 'contacted', label: 'Contacted' },
] as const

// Activity types for tracking
export const ACTIVITY_TYPES = {
  PAGE_VIEW: 'page_view',
  PARK_VIEW: 'park_view',
  PARK_SAVE: 'park_save',
  PARK_COMPARE: 'park_compare',
  CALCULATOR_USE: 'calculator_use',
  MAP_INTERACTION: 'map_interaction',
  FORM_START: 'form_start',
  FORM_COMPLETE: 'form_complete',
  EMAIL_CAPTURE: 'email_capture',
  PHONE_PROVIDED: 'phone_provided',
  CALLBACK_REQUEST: 'callback_requested',
  VIEWING_BOOKED: 'viewing_booked',
  GUIDE_DOWNLOAD: 'guide_download',
} as const

// Email capture points
export const CAPTURE_POINTS = {
  EXIT_INTENT: 'exit_intent',
  VALUE_EXCHANGE: 'value_exchange',
  CALCULATOR: 'calculator',
  COMPARISON: 'comparison',
  GUIDE_DOWNLOAD: 'guide_download',
  PARK_INQUIRY: 'park_inquiry',
} as const

// Default site fees by region (for calculator)
export const DEFAULT_SITE_FEES: Record<string, number> = {
  'South West': 3800,
  'South East': 4200,
  'East of England': 3600,
  'West Midlands': 3200,
  'East Midlands': 3000,
  'Yorkshire and the Humber': 3000,
  'North West': 3200,
  'North East': 2800,
  'Wales': 3000,
  'Scotland': 3400,
  'Northern Ireland': 2600,
}

// Default additional costs for calculators
export const DEFAULT_COSTS = {
  insurance: 500,
  winterization: 350,
  gasSafety: 80,
  deckingMaintenance: 300,
  connection: 200,
}

// Finance rates (typical APR ranges)
export const FINANCE_RATES = {
  excellent: 6.9, // 700+ credit score
  good: 9.9, // 650-699 credit score
  fair: 14.9, // 600-649 credit score
  poor: 19.9, // <600 credit score
}

// Default finance terms
export const DEFAULT_FINANCE_TERM = 7 // years
export const MAX_FINANCE_TERM = 10 // years
export const MIN_DEPOSIT_PERCENTAGE = 10 // %
export const RECOMMENDED_DEPOSIT_PERCENTAGE = 20 // %

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100

// Map defaults (centered on UK)
export const MAP_DEFAULTS = {
  center: { lat: 54.5, lng: -2.5 } as const,
  zoom: 6,
  maxZoom: 18,
  minZoom: 5,
}

// Contact information
export const CONTACT_INFO = {
  email: 'hello@parkwise.co.uk',
  phone: '0800 123 4567',
  supportEmail: 'support@parkwise.co.uk',
} as const

// Social media links
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/parkwise',
  twitter: 'https://twitter.com/parkwise',
  instagram: 'https://instagram.com/parkwise',
  youtube: 'https://youtube.com/@parkwise',
} as const
