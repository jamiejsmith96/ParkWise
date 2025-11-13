import { AlertCircle, AlertTriangle, XCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export interface ErrorAlertProps {
  title?: string
  message: string
  variant?: 'error' | 'warning' | 'info'
  onRetry?: () => void
}

export function ErrorAlert({
  title,
  message,
  variant = 'error',
  onRetry
}: ErrorAlertProps) {
  const config = {
    error: {
      icon: XCircle,
      className: 'border-red-200 bg-red-50 text-red-900',
      iconClassName: 'text-red-600',
      defaultTitle: 'Error',
    },
    warning: {
      icon: AlertTriangle,
      className: 'border-orange-200 bg-orange-50 text-orange-900',
      iconClassName: 'text-orange-600',
      defaultTitle: 'Warning',
    },
    info: {
      icon: AlertCircle,
      className: 'border-blue-200 bg-blue-50 text-blue-900',
      iconClassName: 'text-blue-600',
      defaultTitle: 'Notice',
    },
  }

  const { icon: Icon, className, iconClassName, defaultTitle } = config[variant]

  return (
    <Alert className={className}>
      <Icon className={`h-4 w-4 ${iconClassName}`} />
      <AlertTitle>{title || defaultTitle}</AlertTitle>
      <AlertDescription className="mt-2">
        {message}
        {onRetry && (
          <button
            onClick={onRetry}
            className="ml-2 underline hover:no-underline font-medium"
          >
            Try again
          </button>
        )}
      </AlertDescription>
    </Alert>
  )
}

// Common error messages
export const ERROR_MESSAGES = {
  NETWORK: 'Unable to connect. Please check your internet connection.',
  SERVER: 'Our servers are experiencing issues. Please try again later.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  UNAUTHORIZED: 'You need to be logged in to perform this action.',
  RATE_LIMIT: 'Too many requests. Please wait a moment and try again.',
  UNKNOWN: 'An unexpected error occurred. Please try again.',
}

// Helper to get user-friendly error message
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    // Check for specific error types
    if (error.message.includes('fetch') || error.message.includes('network')) {
      return ERROR_MESSAGES.NETWORK
    }
    if (error.message.includes('404')) {
      return ERROR_MESSAGES.NOT_FOUND
    }
    if (error.message.includes('401') || error.message.includes('403')) {
      return ERROR_MESSAGES.UNAUTHORIZED
    }
    if (error.message.includes('429')) {
      return ERROR_MESSAGES.RATE_LIMIT
    }
    if (error.message.includes('500') || error.message.includes('503')) {
      return ERROR_MESSAGES.SERVER
    }

    // Return the actual error message in development
    if (process.env.NODE_ENV === 'development') {
      return error.message
    }
  }

  return ERROR_MESSAGES.UNKNOWN
}
