'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TIMELINE_OPTIONS } from '@/lib/constants'

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  budgetMax: z.string().min(1, 'Budget is required'),
  timeline: z.string().min(1, 'Timeline is required'),
})

type FormData = z.infer<typeof formSchema>

interface QuickContactFormProps {
  onSubmit: (data: FormData) => Promise<void>
  parkId?: string
}

export function QuickContactForm({ onSubmit, parkId }: QuickContactFormProps) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const timeline = watch('timeline')

  const handleFormSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await onSubmit(data)
      setSuccess(true)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white">
            ✓
          </div>
        </div>
        <h3 className="text-lg font-semibold text-emerald-900 mb-2">
          Thank You!
        </h3>
        <p className="text-sm text-emerald-700">
          We'll be in touch shortly with personalized recommendations.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">
        Get Matched with Perfect Parks
      </h3>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="budgetMax">Maximum Budget</Label>
          <Select onValueChange={(value) => setValue('budgetMax', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="20000">Up to £20,000</SelectItem>
              <SelectItem value="40000">£20,000 - £40,000</SelectItem>
              <SelectItem value="60000">£40,000 - £60,000</SelectItem>
              <SelectItem value="80000">£60,000 - £80,000</SelectItem>
              <SelectItem value="100000">£80,000 - £100,000</SelectItem>
              <SelectItem value="150000">Over £100,000</SelectItem>
            </SelectContent>
          </Select>
          {errors.budgetMax && (
            <p className="text-sm text-red-600 mt-1">{errors.budgetMax.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="timeline">When are you looking to buy?</Label>
          <Select onValueChange={(value) => setValue('timeline', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              {TIMELINE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.timeline && (
            <p className="text-sm text-red-600 mt-1">{errors.timeline.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Get My Matches'}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Free service. No obligation. We'll connect you with the best parks for your needs.
        </p>
      </form>
    </div>
  )
}
