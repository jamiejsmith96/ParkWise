'use client'

import { Suspense } from 'react'
import ParkCompareContent from './ParkCompareContent'

export default function ParkComparePage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600" />
      </div>
    }>
      <ParkCompareContent />
    </Suspense>
  )
}
