import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { sendLeadAssignmentEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'

// POST - Assign a lead to one or more parks
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { lead_id, park_ids, assignment_method = 'manual' } = body

    if (!lead_id || !park_ids || !Array.isArray(park_ids) || park_ids.length === 0) {
      return NextResponse.json(
        { error: 'lead_id and park_ids (array) are required' },
        { status: 400 }
      )
    }

    // Get lead details
    const { data: lead, error: leadError } = await supabaseAdmin
      .from('leads')
      .select('*')
      .eq('id', lead_id)
      .single()

    if (leadError || !lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      )
    }

    // Get parks details
    const { data: parks, error: parksError } = await supabaseAdmin
      .from('parks')
      .select('*')
      .in('id', park_ids)

    if (parksError || !parks || parks.length === 0) {
      return NextResponse.json(
        { error: 'No valid parks found' },
        { status: 404 }
      )
    }

    const assignments = []
    const emailResults = []

    // Create assignments for each park
    for (const park of parks) {
      // Check if interest record already exists
      const { data: existingInterest } = await supabaseAdmin
        .from('lead_park_interests')
        .select('id, assigned_to_park')
        .eq('lead_id', lead_id)
        .eq('park_id', park.id)
        .single()

      if (existingInterest) {
        // Update existing interest to mark as assigned
        if (!existingInterest.assigned_to_park) {
          const { data, error } = await supabaseAdmin
            .from('lead_park_interests')
            .update({
              assigned_to_park: true,
              assigned_at: new Date().toISOString(),
              assignment_method
            })
            .eq('id', existingInterest.id)
            .select()
            .single()

          if (!error && data) {
            assignments.push(data)
          }
        } else {
          // Already assigned
          assignments.push(existingInterest)
        }
      } else {
        // Create new interest and assignment
        const { data, error } = await supabaseAdmin
          .from('lead_park_interests')
          .insert({
            lead_id,
            park_id: park.id,
            interest_type: 'assigned',
            assigned_to_park: true,
            assigned_at: new Date().toISOString(),
            assignment_method
          })
          .select()
          .single()

        if (!error && data) {
          assignments.push(data)
        }
      }

      // Send lead assignment email to park operator if they are a partner
      if (park.is_partner) {
        // In a real implementation, you'd have park operator contact emails
        // For now, we'll use a placeholder or skip if no email
        const parkOperatorEmail = park.contact_email || null

        if (parkOperatorEmail) {
          try {
            const leadInfo = {
              name: `${lead.first_name || ''} ${lead.last_name || ''}`.trim() || 'Lead',
              email: lead.email,
              phone: lead.phone,
              budgetMin: lead.budget_min,
              budgetMax: lead.budget_max,
              timeline: lead.timeline || 'Not specified',
              hasPartExchange: lead.has_part_exchange || false,
              score: lead.score || 0,
              temperature: lead.temperature || 'warm'
            }

            await sendLeadAssignmentEmail(
              parkOperatorEmail,
              park.operator || park.name,
              leadInfo
            )

            emailResults.push({
              park_id: park.id,
              park_name: park.name,
              email_sent: true
            })
          } catch (error) {
            console.error(`Failed to send email to ${park.name}:`, error)
            emailResults.push({
              park_id: park.id,
              park_name: park.name,
              email_sent: false,
              error: error instanceof Error ? error.message : 'Unknown error'
            })
          }
        }
      }

      // Track this assignment as a lead activity
      await supabaseAdmin.from('lead_activities').insert({
        lead_id,
        session_id: 'admin',
        activity_type: 'lead_assigned',
        activity_category: 'assignment',
        park_id: park.id,
        activity_data: {
          park_name: park.name,
          assignment_method
        },
        score_impact: 10
      })
    }

    // Update lead status to 'assigned' if it was 'qualified'
    if (lead.status === 'qualified' || lead.status === 'new') {
      await supabaseAdmin
        .from('leads')
        .update({
          status: 'assigned',
          last_activity_at: new Date().toISOString()
        })
        .eq('id', lead_id)
    }

    return NextResponse.json({
      success: true,
      message: `Lead assigned to ${assignments.length} park(s)`,
      assignments,
      emails_sent: emailResults.filter(r => r.email_sent).length,
      email_results: emailResults
    })
  } catch (error) {
    console.error('Lead assignment error:', error)
    return NextResponse.json(
      { error: 'Failed to assign lead' },
      { status: 500 }
    )
  }
}

// GET - Get assignments for a lead
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const leadId = searchParams.get('lead_id')

    if (!leadId) {
      return NextResponse.json(
        { error: 'lead_id is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('lead_park_interests')
      .select(`
        *,
        parks:park_id (
          id,
          name,
          slug,
          operator,
          region,
          county
        )
      `)
      .eq('lead_id', leadId)
      .eq('assigned_to_park', true)
      .order('assigned_at', { ascending: false })

    if (error) {
      console.error('Error fetching assignments:', error)
      return NextResponse.json(
        { error: 'Failed to fetch assignments' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      assignments: data || [],
      count: data?.length || 0
    })
  } catch (error) {
    console.error('Error in GET /api/leads/assign:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
