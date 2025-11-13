'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { generateSchema } from '@/lib/seo'
import { StructuredData } from './StructuredData'

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://parkwise.co.uk'

  // Always include home as first item
  const allItems = [
    { name: 'Home', url: SITE_URL },
    ...items
  ]

  // Generate structured data for breadcrumbs
  const schema = generateSchema('BreadcrumbList', allItems)

  return (
    <>
      {schema && <StructuredData data={schema} />}

      <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <Link
              href="/"
              className="flex items-center hover:text-emerald-600 transition-colors"
            >
              <Home className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={item.url} className="flex items-center space-x-2">
              <ChevronRight className="h-4 w-4 text-gray-400" />
              {index === items.length - 1 ? (
                <span className="font-medium text-gray-900" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="hover:text-emerald-600 transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
