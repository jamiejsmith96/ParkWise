import { NextRequest, NextResponse } from 'next/server'
import {
  createLead,
  updateLead,
  getLeadByEmail,
  createEmailCapture,
  createSession,
  updateSession,
} from '@/lib/supabase/queries'
import { generateSessionId, parseUTMParams, getDeviceType, getBrowser } from '@/lib/utils'
import { sendWelcomeEmail } from '@/lib/email'
import { validateEmail, validatePhone, validateName, sanitizeInput } from '@/lib/validation'
import { rateLimitPresets, rateLimit } from '@/lib/rate-limit'
import type { LeadCaptureRequest } from '@/types'

export const dynamic = 'force-dynamic'

// Apply rate limiting
const limiter = rateLimit(rateLimitPresets.form)

export async function POST(request: NextRequest) {
  // Check rate limit
  const limitResponse = await limiter(request)
  if (limitResponse) {
    return limitResponse
  }
  try {
    const body: LeadCaptureRequest = await request.json()
    const {
      stage,
      sessionId,
      email,
      phone,
      firstName,
      lastName,
      budgetMin,
      budgetMax,
      timeline,
      preferredRegions,
      hasPartExchange,
      partExchangeDetails,
      financeRequired,
      source,
      medium,
      campaign,
    } = body

    // Get user agent and IP for tracking
    const userAgent = request.headers.get('user-agent') || ''
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
                request.headers.get('x-real-ip') || ''

    let leadId: string

    // Stage 1: Email capture
    if (stage === 'email' && email) {
      // Validate and sanitize email
      const emailValidation = validateEmail(email)
      if (!emailValidation.isValid) {
        return NextResponse.json(
          { error: emailValidation.error },
          { status: 400 }
        )
      }

      const sanitizedEmail = sanitizeInput(email.toLowerCase().trim())

      // Check if lead already exists
      const existingLead = await getLeadByEmail(sanitizedEmail)

      if (existingLead) {
        leadId = existingLead.id

        // Update session with lead ID
        await updateSession(sessionId, { lead_id: leadId })
      } else {
        // Create new lead
        const newLead = await createLead({
          email: sanitizedEmail,
          email_verified: false,
          source: source ? sanitizeInput(source) : undefined,
          medium: medium ? sanitizeInput(medium) : undefined,
          campaign: campaign ? sanitizeInput(campaign) : undefined,
          landing_page: request.headers.get('referer') || undefined,
          ip_address: ip,
          user_agent: userAgent,
          device_type: getDeviceType(userAgent),
          browser: getBrowser(userAgent),
          status: 'new',
          temperature: 'cold',
        })

        leadId = newLead.id

        // Create email capture record
        await createEmailCapture({
          email: sanitizedEmail,
          lead_id: leadId,
          capture_point: 'value_exchange',
          capture_page: request.headers.get('referer') || undefined,
        })

        // Update session
        await updateSession(sessionId, { lead_id: leadId })
      }

      return NextResponse.json({
        success: true,
        leadId,
        nextStage: 'preferences',
        message: 'Email captured successfully',
      })
    }

    // Stage 2: Preferences
    if (stage === 'preferences') {
      const updates: any = {}

      if (budgetMin) updates.budget_min = budgetMin
      if (budgetMax) updates.budget_max = budgetMax
      if (timeline) updates.timeline = timeline
      if (preferredRegions) updates.preferred_regions = preferredRegions

      // Find lead by session or email
      let lead
      if (email) {
        lead = await getLeadByEmail(email)
      }

      if (lead) {
        await updateLead(lead.id, updates)
        leadId = lead.id
      } else {
        return NextResponse.json(
          { error: 'Lead not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        leadId,
        nextStage: 'contact',
        message: 'Preferences saved',
      })
    }

    // Stage 3: Contact details
    if (stage === 'contact') {
      // Validate inputs
      if (firstName) {
        const nameValidation = validateName(firstName, 'First name')
        if (!nameValidation.isValid) {
          return NextResponse.json(
            { error: nameValidation.error },
            { status: 400 }
          )
        }
      }

      if (lastName) {
        const nameValidation = validateName(lastName, 'Last name')
        if (!nameValidation.isValid) {
          return NextResponse.json(
            { error: nameValidation.error },
            { status: 400 }
          )
        }
      }

      if (phone) {
        const phoneValidation = validatePhone(phone)
        if (!phoneValidation.isValid) {
          return NextResponse.json(
            { error: phoneValidation.error },
            { status: 400 }
          )
        }
      }

      const updates: any = {}

      if (firstName) updates.first_name = sanitizeInput(firstName)
      if (lastName) updates.last_name = sanitizeInput(lastName)
      if (phone) updates.phone = sanitizeInput(phone)

      if (email) {
        const lead = await getLeadByEmail(email)
        if (lead) {
          await updateLead(lead.id, updates)
          leadId = lead.id

          // Send welcome email if we have first name
          if (firstName && email) {
            try {
              await sendWelcomeEmail(email, firstName)
              console.log(`Welcome email sent to ${email}`)
            } catch (error) {
              console.error('Failed to send welcome email:', error)
              // Don't fail the request if email fails
            }
          }

          return NextResponse.json({
            success: true,
            leadId,
            nextStage: 'full',
            message: 'Contact details saved',
          })
        }
      }

      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      )
    }

    // Stage 4: Full qualification
    if (stage === 'full') {
      const updates: any = {
        has_part_exchange: hasPartExchange,
        finance_required: financeRequired,
      }

      if (partExchangeDetails) {
        updates.part_exchange_make = partExchangeDetails.make
        updates.part_exchange_model = partExchangeDetails.model
        updates.part_exchange_year = partExchangeDetails.year
        updates.part_exchange_value = partExchangeDetails.estimatedValue
      }

      if (email) {
        const lead = await getLeadByEmail(email)
        if (lead) {
          await updateLead(lead.id, {
            ...updates,
            status: 'qualified',
          })
          leadId = lead.id

          return NextResponse.json({
            success: true,
            leadId,
            message: 'Lead fully qualified',
          })
        }
      }

      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Invalid stage' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Lead capture API error:', error)
    return NextResponse.json(
      { error: 'Failed to capture lead' },
      { status: 500 }
    )
  }
}
