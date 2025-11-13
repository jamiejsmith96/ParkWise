import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

// GET - Retrieve all saved parks for the current user (by session or lead ID)
export async function GET(request: NextRequest) {
  try {
    const supabase = supabaseAdmin
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')
    const leadId = searchParams.get('lead_id')

    if (!sessionId && !leadId) {
      return NextResponse.json(
        { error: 'session_id or lead_id required' },
        { status: 400 }
      )
    }

    // Build query based on what identifier we have
    let query = supabase
      .from('saved_parks')
      .select(`
        id,
        park_id,
        notes,
        created_at,
        parks:park_id (
          id,
          name,
          slug,
          operator,
          region,
          county,
          town,
          short_description,
          min_caravan_price,
          max_caravan_price,
          features,
          images,
          google_rating,
          site_fees
        )
      `)
      .order('created_at', { ascending: false })

    if (leadId) {
      query = query.eq('lead_id', leadId)
    } else if (sessionId) {
      query = query.eq('session_id', sessionId)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching saved parks:', error)
      return NextResponse.json(
        { error: 'Failed to fetch saved parks' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      saved_parks: data,
      count: data?.length || 0
    })
  } catch (error) {
    console.error('Error in GET /api/parks/saved:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Save a park
export async function POST(request: NextRequest) {
  try {
    const supabase = supabaseAdmin
    const body = await request.json()
    const { park_id, session_id, lead_id, saved_from_page, notes } = body

    if (!park_id) {
      return NextResponse.json(
        { error: 'park_id is required' },
        { status: 400 }
      )
    }

    if (!session_id && !lead_id) {
      return NextResponse.json(
        { error: 'session_id or lead_id is required' },
        { status: 400 }
      )
    }

    // Check if park exists
    const { data: park, error: parkError } = await supabase
      .from('parks')
      .select('id, name')
      .eq('id', park_id)
      .single()

    if (parkError || !park) {
      return NextResponse.json(
        { error: 'Park not found' },
        { status: 404 }
      )
    }

    // Prepare saved park data
    const savedParkData: any = {
      park_id,
      saved_from_page,
      notes
    }

    if (lead_id) {
      savedParkData.lead_id = lead_id
    } else {
      savedParkData.session_id = session_id
    }

    // Insert saved park (will fail if already saved due to unique constraint)
    const { data, error } = await supabase
      .from('saved_parks')
      .insert(savedParkData)
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        // Unique constraint violation - already saved
        return NextResponse.json(
          { message: 'Park already saved', already_saved: true },
          { status: 200 }
        )
      }
      console.error('Error saving park:', error)
      return NextResponse.json(
        { error: 'Failed to save park' },
        { status: 500 }
      )
    }

    // Track this as a lead activity if we have a lead_id
    if (lead_id) {
      await supabase.from('lead_activities').insert({
        lead_id,
        session_id: session_id || 'unknown',
        activity_type: 'park_saved',
        activity_category: 'engagement',
        park_id,
        activity_data: { park_name: park.name },
        score_impact: 5
      })

      // Update lead's last_activity_at
      await supabase
        .from('leads')
        .update({ last_activity_at: new Date().toISOString() })
        .eq('id', lead_id)
    }

    return NextResponse.json({
      message: 'Park saved successfully',
      saved_park: data
    })
  } catch (error) {
    console.error('Error in POST /api/parks/saved:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Unsave a park
export async function DELETE(request: NextRequest) {
  try {
    const supabase = supabaseAdmin
    const { searchParams } = new URL(request.url)
    const parkId = searchParams.get('park_id')
    const sessionId = searchParams.get('session_id')
    const leadId = searchParams.get('lead_id')

    if (!parkId) {
      return NextResponse.json(
        { error: 'park_id is required' },
        { status: 400 }
      )
    }

    if (!sessionId && !leadId) {
      return NextResponse.json(
        { error: 'session_id or lead_id is required' },
        { status: 400 }
      )
    }

    // Build delete query
    let query = supabase
      .from('saved_parks')
      .delete()
      .eq('park_id', parkId)

    if (leadId) {
      query = query.eq('lead_id', leadId)
    } else if (sessionId) {
      query = query.eq('session_id', sessionId)
    }

    const { error } = await query

    if (error) {
      console.error('Error unsaving park:', error)
      return NextResponse.json(
        { error: 'Failed to unsave park' },
        { status: 500 }
      )
    }

    // Track this as a lead activity if we have a lead_id
    if (leadId) {
      await supabase.from('lead_activities').insert({
        lead_id: leadId,
        session_id: sessionId || 'unknown',
        activity_type: 'park_unsaved',
        activity_category: 'engagement',
        park_id: parkId,
        score_impact: -2
      })
    }

    return NextResponse.json({
      message: 'Park unsaved successfully'
    })
  } catch (error) {
    console.error('Error in DELETE /api/parks/saved:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
