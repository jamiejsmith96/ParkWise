/**
 * Input validation utilities for forms and user input
 */

export interface ValidationResult {
  isValid: boolean
  error?: string
}

/**
 * Email validation
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim().length === 0) {
    return { isValid: false, error: 'Email is required' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' }
  }

  if (email.length > 254) {
    return { isValid: false, error: 'Email is too long' }
  }

  return { isValid: true }
}

/**
 * Phone number validation (UK format)
 */
export function validatePhone(phone: string): ValidationResult {
  if (!phone || phone.trim().length === 0) {
    return { isValid: false, error: 'Phone number is required' }
  }

  // Remove spaces, dashes, parentheses
  const cleaned = phone.replace(/[\s\-\(\)]/g, '')

  // Check for valid UK phone number format
  const ukPhoneRegex = /^(\+44|0)[1-9]\d{9}$/
  if (!ukPhoneRegex.test(cleaned)) {
    return { isValid: false, error: 'Please enter a valid UK phone number' }
  }

  return { isValid: true }
}

/**
 * Name validation
 */
export function validateName(name: string, fieldName: string = 'Name'): ValidationResult {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: `${fieldName} is required` }
  }

  if (name.trim().length < 2) {
    return { isValid: false, error: `${fieldName} must be at least 2 characters` }
  }

  if (name.length > 100) {
    return { isValid: false, error: `${fieldName} is too long` }
  }

  // Check for invalid characters
  const nameRegex = /^[a-zA-Z\s\-']+$/
  if (!nameRegex.test(name)) {
    return { isValid: false, error: `${fieldName} contains invalid characters` }
  }

  return { isValid: true }
}

/**
 * Budget validation
 */
export function validateBudget(budget: number): ValidationResult {
  if (!budget || isNaN(budget)) {
    return { isValid: false, error: 'Budget is required' }
  }

  if (budget < 0) {
    return { isValid: false, error: 'Budget must be positive' }
  }

  if (budget < 10000) {
    return { isValid: false, error: 'Minimum budget is £10,000' }
  }

  if (budget > 500000) {
    return { isValid: false, error: 'Budget exceeds maximum value' }
  }

  return { isValid: true }
}

/**
 * Message/text area validation
 */
export function validateMessage(message: string, minLength: number = 10): ValidationResult {
  if (!message || message.trim().length === 0) {
    return { isValid: false, error: 'Message is required' }
  }

  if (message.trim().length < minLength) {
    return { isValid: false, error: `Message must be at least ${minLength} characters` }
  }

  if (message.length > 2000) {
    return { isValid: false, error: 'Message is too long (max 2000 characters)' }
  }

  return { isValid: true }
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim()
}

/**
 * Rate limiting check (client-side)
 */
const requestCounts = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(key: string, maxRequests: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now()
  const record = requestCounts.get(key)

  if (!record || now > record.resetTime) {
    requestCounts.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

/**
 * Validate multiple fields at once
 */
export interface FieldValidation {
  name: string
  value: string | number
  validator: (value: any) => ValidationResult
}

export function validateFields(fields: FieldValidation[]): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {}

  for (const field of fields) {
    const result = field.validator(field.value)
    if (!result.isValid && result.error) {
      errors[field.name] = result.error
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
