'use client'

import { useState } from 'react'
import { Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSavedParks } from '@/hooks/useSavedParks'
import { cn } from '@/lib/utils'

interface SaveParkButtonProps {
  parkId: string
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  showText?: boolean
}

export function SaveParkButton({
  parkId,
  variant = 'ghost',
  size = 'icon',
  className,
  showText = false
}: SaveParkButtonProps) {
  const { isSaved, toggleSave } = useSavedParks()
  const [isLoading, setIsLoading] = useState(false)
  const saved = isSaved(parkId)

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault() // Prevent link navigation if button is inside a link
    e.stopPropagation()

    setIsLoading(true)
    await toggleSave(parkId, window.location.pathname)
    setIsLoading(false)
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        'transition-all',
        saved && 'text-emerald-600 hover:text-emerald-700',
        className
      )}
      title={saved ? 'Remove from saved parks' : 'Save park for later'}
    >
      <Bookmark
        className={cn(
          'h-5 w-5',
          saved && 'fill-current'
        )}
      />
      {showText && (
        <span className="ml-2">
          {saved ? 'Saved' : 'Save'}
        </span>
      )}
    </Button>
  )
}
