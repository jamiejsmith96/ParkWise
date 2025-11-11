/**
 * Email template system for ParkWise
 * Uses Resend for email delivery
 */

interface EmailParams {
  to: string
  subject: string
  html: string
  from?: string
}

export async function sendEmail({ to, subject, html, from }: EmailParams) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY

  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured')
    return { success: false, error: 'Email not configured' }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: from || process.env.EMAIL_FROM || 'ParkWise <hello@parkwise.co.uk>',
        to: [to],
        subject,
        html,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send email')
    }

    return { success: true, id: data.id }
  } catch (error: any) {
    console.error('Email sending failed:', error)
    return { success: false, error: error.message }
  }
}

// Email Templates

export function getWelcomeEmailTemplate(firstName: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #10B981; color: white; padding: 30px; text-align: center; }
    .content { padding: 30px; background: #f9f9f9; }
    .button { display: inline-block; padding: 12px 30px; background: #10B981; color: white; text-decoration: none; border-radius: 5px; }
    .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to ParkWise!</h1>
    </div>
    <div class="content">
      <p>Hi ${firstName},</p>
      <p>Thank you for joining ParkWise - the UK's leading independent static caravan comparison site.</p>
      <p>We've saved your preferences and will help you find the perfect holiday park for your needs.</p>

      <h3>What happens next?</h3>
      <ul>
        <li>We'll send you personalized park recommendations based on your budget and preferences</li>
        <li>You'll get exclusive deals not available to the public</li>
        <li>We'll help you negotiate the best price with park operators</li>
      </ul>

      <p style="text-align: center; margin: 30px 0;">
        <a href="https://parkwise.co.uk/parks" class="button">Browse Parks</a>
      </p>

      <p>If you have any questions, just reply to this email - we're here to help!</p>

      <p>Best regards,<br>The ParkWise Team</p>
    </div>
    <div class="footer">
      <p>ParkWise - Independent Static Caravan Comparison</p>
      <p>You're receiving this because you signed up at parkwise.co.uk</p>
      <p><a href="#">Unsubscribe</a> | <a href="#">Update Preferences</a></p>
    </div>
  </div>
</body>
</html>
  `
}

export function getParkMatchEmailTemplate(firstName: string, parks: any[]): string {
  const parksList = parks.map(park => `
    <div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin: 10px 0;">
      <h3 style="margin: 0 0 10px 0;">${park.name}</h3>
      <p style="color: #666; margin: 5px 0;">${park.county}, ${park.region}</p>
      <p style="margin: 10px 0;"><strong>From £${park.minPrice.toLocaleString()}</strong></p>
      <p style="margin: 10px 0;">${park.features.slice(0, 3).join(' • ')}</p>
      <a href="https://parkwise.co.uk/parks/${park.slug}" style="display: inline-block; padding: 8px 20px; background: #10B981; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px;">View Details</a>
    </div>
  `).join('')

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #10B981; color: white; padding: 30px; text-align: center; }
    .content { padding: 30px; background: #f9f9f9; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Perfect Parks for You!</h1>
    </div>
    <div class="content">
      <p>Hi ${firstName},</p>
      <p>Based on your preferences, we've found ${parks.length} parks that match what you're looking for:</p>

      ${parksList}

      <p style="margin-top: 30px;">Want to visit these parks? We can arrange viewings and help you negotiate the best deal.</p>
      <p style="text-align: center; margin: 20px 0;">
        <a href="mailto:hello@parkwise.co.uk" style="display: inline-block; padding: 12px 30px; background: #10B981; color: white; text-decoration: none; border-radius: 5px;">Get in Touch</a>
      </p>
    </div>
  </div>
</body>
</html>
  `
}

export function getLeadAssignmentEmailTemplate(parkOperator: string, leadInfo: any): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #10B981; color: white; padding: 20px; }
    .content { padding: 20px; background: #fff; border: 1px solid #ddd; }
    .lead-score { background: #10B981; color: white; padding: 10px; border-radius: 5px; text-align: center; font-size: 24px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Qualified Lead</h2>
    </div>
    <div class="content">
      <p>Hi ${parkOperator},</p>
      <p>We have a new qualified buyer interested in your park:</p>

      <div class="lead-score">
        Lead Score: ${leadInfo.score}/100
        <div style="font-size: 14px; margin-top: 5px;">${leadInfo.temperature.toUpperCase()}</div>
      </div>

      <h3>Contact Information:</h3>
      <ul>
        <li><strong>Name:</strong> ${leadInfo.name}</li>
        <li><strong>Email:</strong> ${leadInfo.email}</li>
        <li><strong>Phone:</strong> ${leadInfo.phone || 'Not provided'}</li>
      </ul>

      <h3>Buyer Details:</h3>
      <ul>
        <li><strong>Budget:</strong> £${leadInfo.budgetMin?.toLocaleString()} - £${leadInfo.budgetMax?.toLocaleString()}</li>
        <li><strong>Timeline:</strong> ${leadInfo.timeline}</li>
        <li><strong>Part Exchange:</strong> ${leadInfo.hasPartExchange ? 'Yes' : 'No'}</li>
      </ul>

      <p><strong>Action Required:</strong> Please contact this buyer within 24 hours for best results.</p>
    </div>
  </div>
</body>
</html>
  `
}

// Helper functions to send specific emails
export async function sendWelcomeEmail(to: string, firstName: string) {
  return sendEmail({
    to,
    subject: 'Welcome to ParkWise - Your Static Caravan Journey Starts Here',
    html: getWelcomeEmailTemplate(firstName),
  })
}

export async function sendParkMatchEmail(to: string, firstName: string, parks: any[]) {
  return sendEmail({
    to,
    subject: `${parks.length} Perfect Parks Matched to Your Preferences`,
    html: getParkMatchEmailTemplate(firstName, parks),
  })
}

export async function sendLeadAssignmentEmail(to: string, parkOperator: string, leadInfo: any) {
  return sendEmail({
    to,
    subject: `New ${leadInfo.temperature.toUpperCase()} Lead for Your Park`,
    html: getLeadAssignmentEmailTemplate(parkOperator, leadInfo),
  })
}
