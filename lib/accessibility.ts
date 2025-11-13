/**
 * Accessibility utilities and helpers
 */

/**
 * Trap focus within a modal or dialog
 */
export function trapFocus(element: HTMLElement) {
  const focusableElements = element.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )

  const firstFocusable = focusableElements[0]
  const lastFocusable = focusableElements[focusableElements.length - 1]

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus()
        e.preventDefault()
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus()
        e.preventDefault()
      }
    }
  }

  element.addEventListener('keydown', handleTabKey)

  // Focus first element
  firstFocusable?.focus()

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleTabKey)
  }
}

/**
 * Announce to screen readers
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcement = document.createElement('div')
  announcement.setAttribute('role', 'status')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message

  document.body.appendChild(announcement)

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

/**
 * Get accessible label from element
 */
export function getAccessibleLabel(element: HTMLElement): string {
  return (
    element.getAttribute('aria-label') ||
    element.getAttribute('aria-labelledby') ||
    element.textContent ||
    ''
  )
}

/**
 * Check if element is keyboard accessible
 */
export function isKeyboardAccessible(element: HTMLElement): boolean {
  const tabIndex = element.getAttribute('tabindex')
  const isInteractive = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(element.tagName)

  return isInteractive || (tabIndex !== null && parseInt(tabIndex) >= 0)
}

/**
 * Generate unique ID for aria-describedby
 */
let idCounter = 0
export function generateA11yId(prefix: string = 'a11y'): string {
  return `${prefix}-${++idCounter}`
}

/**
 * Check color contrast ratio (simplified)
 * For production, use a proper color contrast library
 */
export function hasGoodContrast(foreground: string, background: string): boolean {
  // This is a simplified check
  // In production, calculate actual luminance and contrast ratio
  // Minimum ratio: 4.5:1 for normal text, 3:1 for large text
  return true // Placeholder
}

/**
 * Ensure minimum touch target size (44x44px for WCAG compliance)
 */
export function meetsMinimumTouchTarget(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect()
  return rect.width >= 44 && rect.height >= 44
}

/**
 * Create visually hidden but screen-reader accessible text
 */
export function createScreenReaderText(text: string): HTMLSpanElement {
  const span = document.createElement('span')
  span.className = 'sr-only'
  span.textContent = text
  return span
}
