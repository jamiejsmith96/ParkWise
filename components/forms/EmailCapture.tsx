'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface EmailCaptureProps {
  trigger: 'exit_intent' | 'time_based' | 'scroll' | 'engagement'
  delay?: number
  valueProposition?: string
  onCapture: (email: string) => Promise<void>
  onDismiss: () => void
}

export function EmailCapture({
  trigger,
  delay = 30000,
  valueProposition = "Save your research and get exclusive park deals",
  onCapture,
  onDismiss
}: EmailCaptureProps) {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if already dismissed
    const dismissed = localStorage.getItem('email_capture_dismissed')
    if (dismissed) return

    // Trigger logic based on type
    if (trigger === 'time_based') {
      const timer = setTimeout(() => setShow(true), delay)
      return () => clearTimeout(timer)
    }

    if (trigger === 'exit_intent') {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0 && !show) {
          setShow(true)
        }
      }
      document.addEventListener('mouseleave', handleMouseLeave)
      return () => document.removeEventListener('mouseleave', handleMouseLeave)
    }

    if (trigger === 'scroll') {
      const handleScroll = () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        if (scrollPercent > 50 && !show) {
          setShow(true)
        }
      }
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }

    if (trigger === 'engagement') {
      // Show after 3 page views
      const pageViews = parseInt(localStorage.getItem('page_views') || '0')
      if (pageViews >= 3) {
        setTimeout(() => setShow(true), 2000)
      }
    }
  }, [trigger, delay, show])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await onCapture(email)
      setShow(false)
      localStorage.setItem('email_captured', 'true')
    } catch (err) {
      setError('Failed to save email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDismiss = () => {
    setShow(false)
    localStorage.setItem('email_capture_dismissed', 'true')
    onDismiss()
  }

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={handleDismiss}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-white rounded-lg shadow-xl p-6 mx-4">
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <Gift className="h-6 w-6 text-emerald-600" />
                </div>
              </div>

              <h3 className="text-xl font-semibold text-center mb-2">
                Don't Miss Out!
              </h3>
              <p className="text-sm text-gray-600 text-center mb-6">
                {valueProposition}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full"
                  />
                  {error && (
                    <p className="text-sm text-red-600 mt-1">{error}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? 'Saving...' : 'Get Exclusive Deals'}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  No spam, unsubscribe anytime. We respect your privacy.
                </p>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
