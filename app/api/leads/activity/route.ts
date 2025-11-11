import { NextRequest, NextResponse } from 'next/server'
import { createLeadActivity, getLeadByEmail, updateSession } from '@/lib/supabase/queries'
import type { ActivityTrackRequest } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body: ActivityTrackRequest = await request.json()
    const { leadId, sessionId, activities } = body

    if (!sessionId || !activities || activities.length === 0) {
      return NextResponse.json(
        { error: 'Session ID and activities are required' },
        { status: 400 }
      )
    }

    // Create activity records
    const activityPromises = activities.map(activity =>
      createLeadActivity({
        lead_id: leadId,
        session_id: sessionId,
        activity_type: activity.type,
        activity_category: getCategoryForActivity(activity.type),
        page_url: activity.page,
        park_id: activity.parkId,
        activity_data: activity.data || {},
        duration_seconds: activity.duration,
        score_impact: getScoreImpactForActivity(activity.type),
      })
    )

    await Promise.all(activityPromises)

    // Update session activity
    await updateSession(sessionId, {
      page_views: activities.filter(a => a.type === 'page_view').length,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Activity tracking API error:', error)
    return NextResponse.json(
      { error: 'Failed to track activity' },
      { status: 500 }
    )
  }
}

function getCategoryForActivity(activityType: string): string {
  const categoryMap: Record<string, string> = {
    page_view: 'engagement',
    park_view: 'interest',
    park_save: 'interest',
    park_compare: 'interest',
    calculator_use: 'intent',
    form_start: 'intent',
    form_complete: 'conversion',
    email_capture: 'conversion',
    phone_provided: 'conversion',
    callback_requested: 'conversion',
    viewing_booked: 'conversion',
  }

  return categoryMap[activityType] || 'engagement'
}

function getScoreImpactForActivity(activityType: string): number {
  const scoreMap: Record<string, number> = {
    page_view: 1,
    park_view: 2,
    park_save: 3,
    park_compare: 5,
    calculator_use: 5,
    map_interaction: 2,
    form_start: 3,
    form_complete: 10,
    email_capture: 3,
    phone_provided: 10,
    callback_requested: 15,
    viewing_booked: 20,
    guide_download: 3,
  }

  return scoreMap[activityType] || 0
}
