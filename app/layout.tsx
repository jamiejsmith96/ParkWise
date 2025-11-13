import type { Metadata } from "next"
import "./globals.css"
import { Suspense } from "react"
import { cn } from "@/lib/utils"
import { Analytics } from "@/components/tracking/Analytics"
import { StructuredData } from "@/components/seo/StructuredData"
import { SkipLink } from "@/components/accessibility/SkipLink"
import { generateMetadata, generateSchema } from "@/lib/seo"
import Script from "next/script"

export const metadata: Metadata = {
  ...generateMetadata({
    title: "Compare Static Caravan Parks UK | Find Your Perfect Holiday Home",
    description: "Compare 500+ static caravan parks across the UK. Find the best deals on static caravans for sale from £15,000. Independent advice, transparent pricing, and expert guides.",
    keywords: ["static caravans for sale uk", "compare static caravan parks", "holiday parks uk", "cheap static caravans", "static caravan prices"],
  }),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.svg', type: 'image/svg+xml', sizes: '180x180' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://parkwise.co.uk',
    siteName: 'ParkWise',
    title: 'ParkWise - Compare Static Caravan Parks UK',
    description: 'Compare 500+ static caravan parks across the UK. Find the best deals on static caravans for sale from £15,000.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'ParkWise - Compare Static Caravan Parks',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ParkWise - Compare Static Caravan Parks UK',
    description: 'Compare 500+ static caravan parks across the UK. Find the best deals on static caravans for sale from £15,000.',
    images: ['/og-image.svg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data - Organization & WebSite */}
        <StructuredData data={generateSchema('Organization', null)} />
        <StructuredData data={generateSchema('WebSite', null)} />

        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}

        {/* Facebook Pixel */}
        {process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID && (
          <Script id="facebook-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
      </head>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        <SkipLink />
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  )
}
