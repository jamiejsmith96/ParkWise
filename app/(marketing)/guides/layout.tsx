import type { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo'

export const metadata: Metadata = generateMetadata({
  title: 'Static Caravan Guides | Expert Advice & Tips',
  description: 'Expert guides to buying, financing, and owning a static caravan. Learn about costs, part exchange, running expenses, and how to find the best deals.',
  keywords: ['static caravan guide', 'buy static caravan', 'static caravan advice', 'caravan buying tips'],
})

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
