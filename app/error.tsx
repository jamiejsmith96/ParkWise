'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-center text-2xl">Something Went Wrong</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-gray-700 text-center">
              We encountered an unexpected error while loading this page. Our team has been notified.
            </p>
            {error.digest && (
              <p className="text-xs text-gray-500 text-center mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>

          {process.env.NODE_ENV === 'development' && (
            <details className="bg-gray-100 rounded-lg p-4">
              <summary className="cursor-pointer font-semibold text-sm text-gray-700 mb-2">
                Error Details (Development Only)
              </summary>
              <pre className="text-xs text-gray-600 overflow-auto mt-2">
                {error.message}
                {'\n\n'}
                {error.stack}
              </pre>
            </details>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={reset} variant="default" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2 w-full">
                <Home className="h-4 w-4" />
                Go Home
              </Button>
            </Link>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-900 mb-3">What you can try:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                Refresh the page using the button above
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                Clear your browser cache and cookies
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                Try accessing the page in a private/incognito window
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">•</span>
                <span>
                  If the problem persists, <Link href="/contact" className="text-emerald-600 hover:underline">contact our support team</Link>
                </span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
