'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSessionStore } from '@/lib/stores/session-store'

interface SavedPark {
  id: string
  park_id: string
  created_at: string
  parks?: any
}

export function useSavedParks() {
  const [savedParkIds, setSavedParkIds] = useState<Set<string>>(new Set())
  const [savedParks, setSavedParks] = useState<SavedPark[]>([])
  const [loading, setLoading] = useState(true)
  const { sessionId, leadId } = useSessionStore()

  // Load saved parks from API
  const loadSavedParks = useCallback(async () => {
    if (!sessionId && !leadId) {
      setLoading(false)
      return
    }

    try {
      const params = new URLSearchParams()
      if (leadId) {
        params.set('lead_id', leadId)
      } else if (sessionId) {
        params.set('session_id', sessionId)
      }

      const response = await fetch(`/api/parks/saved?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setSavedParks(data.saved_parks || [])
        setSavedParkIds(new Set(data.saved_parks?.map((sp: SavedPark) => sp.park_id) || []))
      }
    } catch (error) {
      console.error('Error loading saved parks:', error)
    } finally {
      setLoading(false)
    }
  }, [sessionId, leadId])

  // Load saved parks on mount and when session/lead changes
  useEffect(() => {
    loadSavedParks()
  }, [loadSavedParks])

  // Save a park
  const savePark = useCallback(async (parkId: string, savedFromPage?: string) => {
    if (!sessionId && !leadId) {
      console.warn('No session or lead ID available')
      return false
    }

    try {
      const response = await fetch('/api/parks/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          park_id: parkId,
          session_id: sessionId,
          lead_id: leadId,
          saved_from_page: savedFromPage
        })
      })

      if (response.ok) {
        setSavedParkIds(prev => new Set([...prev, parkId]))
        await loadSavedParks() // Reload to get full data
        return true
      }
    } catch (error) {
      console.error('Error saving park:', error)
    }
    return false
  }, [sessionId, leadId, loadSavedParks])

  // Unsave a park
  const unsavePark = useCallback(async (parkId: string) => {
    if (!sessionId && !leadId) {
      console.warn('No session or lead ID available')
      return false
    }

    try {
      const params = new URLSearchParams({
        park_id: parkId,
        ...(leadId ? { lead_id: leadId } : { session_id: sessionId || '' })
      })

      const response = await fetch(`/api/parks/saved?${params.toString()}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setSavedParkIds(prev => {
          const next = new Set(prev)
          next.delete(parkId)
          return next
        })
        await loadSavedParks() // Reload to sync
        return true
      }
    } catch (error) {
      console.error('Error unsaving park:', error)
    }
    return false
  }, [sessionId, leadId, loadSavedParks])

  // Toggle save state
  const toggleSave = useCallback(async (parkId: string, savedFromPage?: string) => {
    if (savedParkIds.has(parkId)) {
      return await unsavePark(parkId)
    } else {
      return await savePark(parkId, savedFromPage)
    }
  }, [savedParkIds, savePark, unsavePark])

  // Check if a park is saved
  const isSaved = useCallback((parkId: string) => {
    return savedParkIds.has(parkId)
  }, [savedParkIds])

  return {
    savedParks,
    savedParkIds,
    loading,
    savePark,
    unsavePark,
    toggleSave,
    isSaved,
    count: savedParkIds.size,
    reload: loadSavedParks
  }
}
