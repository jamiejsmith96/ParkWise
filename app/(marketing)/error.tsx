'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle, ArrowLeft, Home } from 'lucide-react'
import Link from 'next/link'

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Marketing page error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Page Error
            </h2>

            <p className="text-gray-600 mb-6">
              We couldn't load this page. This has been logged and we'll investigate.
            </p>

            {error.digest && (
              <p className="text-xs text-gray-500 mb-6">
                Reference: {error.digest}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={reset} variant="default">
                Try Again
              </Button>
              <Button onClick={() => window.history.back()} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
              <Link href="/">
                <Button variant="outline">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              </Link>
            </div>

            <div className="mt-8 text-left bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Common solutions:</strong>
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Check your internet connection</li>
                <li>• Try refreshing the page</li>
                <li>• Clear your browser cache</li>
                <li>• <Link href="/contact" className="text-emerald-600 hover:underline">Contact support</Link> if this persists</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
