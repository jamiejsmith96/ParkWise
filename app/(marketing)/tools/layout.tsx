import type { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo'

export const metadata: Metadata = generateMetadata({
  title: 'Static Caravan Calculators | Free Budget & Cost Tools',
  description: 'Free calculators for static caravan buyers. Calculate total ownership costs, budget planning, true running expenses, and caravan valuations. Get accurate cost estimates.',
  keywords: ['static caravan calculator', 'caravan cost calculator', 'budget calculator', 'static caravan valuation', 'running costs calculator'],
})

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
