'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu, Search, Calculator, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Find Parks', href: '/parks' },
  { name: 'Compare', href: '/parks/compare' },
  { name: 'Calculators', href: '/tools' },
  { name: 'Guides', href: '/guides' },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ParkWise</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-emerald-600",
                  pathname === item.href
                    ? "text-emerald-600"
                    : "text-gray-700"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
            </Button>

            <Link href="/tools/budget-calculator">
              <Button variant="outline" className="hidden lg:flex">
                <Calculator className="mr-2 h-4 w-4" />
                Budget Calculator
              </Button>
            </Link>

            <Button className="hidden sm:inline-flex">
              Get Started
            </Button>

            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}
