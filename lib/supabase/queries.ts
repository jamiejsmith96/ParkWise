import { supabase } from './client'
import { supabaseAdmin } from './admin'
import type { Park, Lead, ParksListRequest } from '@/types'

// Parks queries
export async function getParks(params: ParksListRequest = {}) {
  const {
    region,
    county,
    features = [],
    minPrice,
    maxPrice,
    partExchange,
    subletting,
    limit = 20,
    offset = 0,
    sortBy = 'name',
    sortOrder = 'asc'
  } = params

  let query = supabase
    .from('parks')
    .select('*', { count: 'exact' })
    .eq('status', 'active')

  if (region) query = query.eq('region', region)
  if (county) query = query.eq('county', county)
  if (minPrice) query = query.gte('min_caravan_price', minPrice)
  if (maxPrice) query = query.lte('max_caravan_price', maxPrice)
  if (partExchange) query = query.eq('part_exchange_accepted', true)
  if (subletting) query = query.eq('subletting_allowed', true)

  // Filter by features (JSONB array contains)
  if (features.length > 0) {
    features.forEach(feature => {
      query = query.contains('features', [feature])
    })
  }

  // Sorting
  const sortColumn = sortBy === 'price' ? 'min_caravan_price' : sortBy
  query = query.order(sortColumn, { ascending: sortOrder === 'asc' })

  // Pagination
  query = query.range(offset, offset + limit - 1)

  const { data, error, count } = await query

  if (error) throw error

  return {
    parks: data as Park[],
    total: count || 0,
    hasMore: (count || 0) > offset + limit
  }
}

export async function getParkBySlug(slug: string) {
  const { data, error } = await supabase
    .from('parks')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'active')
    .single()

  if (error) throw error
  return data as Park
}

export async function getParkById(id: string) {
  const { data, error } = await supabase
    .from('parks')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Park
}

// Lead queries (admin only)
export async function createLead(leadData: Partial<Lead>) {
  const { data, error } = await supabaseAdmin
    .from('leads')
    .insert(leadData)
    .select()
    .single()

  if (error) throw error
  return data as Lead
}

export async function updateLead(leadId: string, updates: Partial<Lead>) {
  const { data, error } = await supabaseAdmin
    .from('leads')
    .update(updates)
    .eq('id', leadId)
    .select()
    .single()

  if (error) throw error
  return data as Lead
}

export async function getLeadById(leadId: string) {
  const { data, error } = await supabaseAdmin
    .from('leads')
    .select('*')
    .eq('id', leadId)
    .single()

  if (error) throw error
  return data as Lead
}

export async function getLeadByEmail(email: string) {
  const { data, error } = await supabaseAdmin
    .from('leads')
    .select('*')
    .eq('email', email)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows returned
  return data as Lead | null
}

// Lead activities
export async function createLeadActivity(activity: {
  lead_id?: string
  session_id: string
  activity_type: string
  activity_category?: string
  page_url?: string
  page_title?: string
  park_id?: string
  activity_data?: Record<string, any>
  duration_seconds?: number
  score_impact?: number
}) {
  const { data, error } = await supabaseAdmin
    .from('lead_activities')
    .insert(activity)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getLeadActivities(leadId: string) {
  const { data, error } = await supabaseAdmin
    .from('lead_activities')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// Lead-Park interests
export async function createLeadParkInterest(interest: {
  lead_id: string
  park_id: string
  interest_type: string
  interest_level?: number
  specific_caravan?: string
}) {
  const { data, error } = await supabaseAdmin
    .from('lead_park_interests')
    .insert(interest)
    .select()
    .single()

  if (error) {
    // If unique constraint violation, update instead
    if (error.code === '23505') {
      return updateLeadParkInterest(interest.lead_id, interest.park_id, interest)
    }
    throw error
  }
  return data
}

export async function updateLeadParkInterest(
  leadId: string,
  parkId: string,
  updates: Partial<{
    interest_type: string
    interest_level: number
    assigned_to_park: boolean
    outcome: string
  }>
) {
  const { data, error } = await supabaseAdmin
    .from('lead_park_interests')
    .update(updates)
    .eq('lead_id', leadId)
    .eq('park_id', parkId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getLeadParkInterests(leadId: string) {
  const { data, error } = await supabaseAdmin
    .from('lead_park_interests')
    .select(`
      *,
      park:parks(name, slug, operator)
    `)
    .eq('lead_id', leadId)

  if (error) throw error
  return data
}

// Session management
export async function createSession(sessionData: {
  id: string
  lead_id?: string
  source?: string
  medium?: string
  campaign?: string
  ip_address?: string
  user_agent?: string
}) {
  const { data, error } = await supabaseAdmin
    .from('sessions')
    .insert(sessionData)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateSession(sessionId: string, updates: {
  page_views?: number
  total_duration_seconds?: number
  lead_id?: string
  data?: Record<string, any>
}) {
  const { data, error } = await supabaseAdmin
    .from('sessions')
    .update({
      ...updates,
      last_activity_at: new Date().toISOString()
    })
    .eq('id', sessionId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Email captures
export async function createEmailCapture(capture: {
  email: string
  lead_id?: string
  capture_point?: string
  capture_page?: string
  value_proposition?: string
}) {
  const { data, error } = await supabaseAdmin
    .from('email_captures')
    .insert(capture)
    .select()
    .single()

  if (error) throw error
  return data
}
