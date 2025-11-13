/**
 * Structured Data (Schema.org JSON-LD) Component
 * Renders SEO-friendly structured data for search engines
 */

interface StructuredDataProps {
  data: any
}

export function StructuredData({ data }: StructuredDataProps) {
  if (!data) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
