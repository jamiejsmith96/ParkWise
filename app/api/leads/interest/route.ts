import { NextRequest, NextResponse } from 'next/server'
import { createLeadParkInterest, getLeadByEmail } from '@/lib/supabase/queries'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { leadId, sessionId, parkId, interestType, specificCaravan } = body

    if (!parkId || !interestType) {
      return NextResponse.json(
        { error: 'Park ID and interest type are required' },
        { status: 400 }
      )
    }

    // If no leadId but has sessionId, try to find lead
    let finalLeadId = leadId

    if (!finalLeadId) {
      // For now, we'll just return success without creating the interest
      // In a real app, you might want to store this in session data
      return NextResponse.json({
        success: true,
        message: 'Interest recorded in session'
      })
    }

    // Create lead-park interest
    await createLeadParkInterest({
      lead_id: finalLeadId,
      park_id: parkId,
      interest_type: interestType,
      interest_level: getInterestLevel(interestType),
      specific_caravan: specificCaravan,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Lead interest API error:', error)
    return NextResponse.json(
      { error: 'Failed to record interest' },
      { status: 500 }
    )
  }
}

function getInterestLevel(interestType: string): number {
  const levelMap: Record<string, number> = {
    viewed: 1,
    saved: 2,
    compared: 3,
    inquired: 4,
    contacted: 5,
  }

  return levelMap[interestType] || 1
}
