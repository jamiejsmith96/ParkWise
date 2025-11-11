'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import posthog from 'posthog-js'

// Initialize PostHog
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug()
    }
  })
}

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Track page views
    if (pathname) {
      const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')

      // PostHog
      if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
        posthog.capture('$pageview', { path: url })
      }

      // Google Analytics 4
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
          page_path: url,
        })
      }
    }
  }, [pathname, searchParams])

  return null
}

// Custom event tracking helper
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  // PostHog
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.capture(eventName, properties)
  }

  // Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, properties)
  }

  // Facebook Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('trackCustom', eventName, properties)
  }
}

// Lead tracking
export function trackLeadEvent(eventType: 'email_captured' | 'phone_provided' | 'form_completed' | 'lead_qualified', properties?: Record<string, any>) {
  trackEvent(`lead_${eventType}`, {
    ...properties,
    timestamp: new Date().toISOString(),
  })
}

// E-commerce tracking (for conversions)
export function trackConversion(leadId: string, value: number, properties?: Record<string, any>) {
  trackEvent('conversion', {
    leadId,
    value,
    currency: 'GBP',
    ...properties,
  })

  // Facebook Pixel Lead event
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Lead', {
      value,
      currency: 'GBP',
    })
  }
}
