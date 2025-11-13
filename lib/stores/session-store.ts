'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SessionState {
  sessionId: string | null
  leadId: string | null
  setSessionId: (sessionId: string) => void
  setLeadId: (leadId: string) => void
  clearSession: () => void
}

// Generate a session ID if one doesn't exist
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      sessionId: null,
      leadId: null,
      setSessionId: (sessionId: string) => set({ sessionId }),
      setLeadId: (leadId: string) => set({ leadId }),
      clearSession: () => set({ sessionId: null, leadId: null })
    }),
    {
      name: 'parkwise-session',
      onRehydrateStorage: () => (state) => {
        // Generate session ID if it doesn't exist
        if (state && !state.sessionId) {
          state.setSessionId(generateSessionId())
        }
      }
    }
  )
)

// Initialize session ID on first load
if (typeof window !== 'undefined') {
  const store = useSessionStore.getState()
  if (!store.sessionId) {
    store.setSessionId(generateSessionId())
  }
}
