import type { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo'

export const metadata: Metadata = generateMetadata({
  title: 'Static Caravan Parks for Sale UK | 500+ Parks Compared',
  description: 'Browse 500+ static caravan parks across the UK. Compare prices, features, and locations. Find static caravans for sale from £15,000. Independent comparison with transparent pricing.',
  keywords: ['static caravan parks uk', 'static caravans for sale', 'holiday parks', 'caravan parks near me', 'buy static caravan'],
})

export default function ParksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
