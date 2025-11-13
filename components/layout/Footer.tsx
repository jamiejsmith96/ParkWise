import Link from 'next/link'
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react'
import { CONTACT_INFO, SOCIAL_LINKS } from '@/lib/constants'

const footerNavigation = {
  parks: [
    { name: 'Find Parks', href: '/parks' },
    { name: 'Compare Parks', href: '/parks/compare' },
    { name: 'By Region', href: '/parks?by=region' },
    { name: 'Featured Parks', href: '/parks?featured=true' },
  ],
  tools: [
    { name: 'Budget Calculator', href: '/tools/budget-calculator' },
    { name: 'True Cost Calculator', href: '/tools/true-cost' },
    { name: 'Valuation Tool', href: '/tools/valuation' },
    { name: 'Finance Guide', href: '/guides/finance' },
  ],
  resources: [
    { name: 'All Guides', href: '/guides' },
    { name: 'Buyers Guide', href: '/guides/buyers-guide' },
    { name: 'Financing Options', href: '/guides/finance' },
    { name: 'Part Exchange', href: '/guides/part-exchange' },
    { name: 'Running Costs', href: '/guides/running-costs' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Contact', href: '/contact' },
    { name: 'Partner With Us', href: '/partners' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ParkWise</span>
            </Link>
            <p className="text-sm text-gray-600 mb-4">
              Independent comparison site helping you find the perfect static caravan across the UK.
            </p>
            <div className="flex space-x-4">
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                <Twitter className="h-5 w-5" />
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Parks */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Parks</h3>
            <ul className="space-y-3">
              {footerNavigation.parks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-600 hover:text-emerald-600">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Tools</h3>
            <ul className="space-y-3">
              {footerNavigation.tools.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-600 hover:text-emerald-600">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerNavigation.resources.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-600 hover:text-emerald-600">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-600 hover:text-emerald-600">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 border-t pt-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Email</p>
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-sm text-gray-600 hover:text-emerald-600">
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Phone</p>
                <a href={`tel:${CONTACT_INFO.phone}`} className="text-sm text-gray-600 hover:text-emerald-600">
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Coverage</p>
                <p className="text-sm text-gray-600">All UK Regions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} ParkWise. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {footerNavigation.legal.map((item) => (
              <Link key={item.name} href={item.href} className="text-sm text-gray-600 hover:text-emerald-600">
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 pt-6 border-t">
          <p className="text-xs text-gray-500 text-center">
            ParkWise is an independent comparison site. We may receive commission from park operators when you make a purchase,
            but this doesn't affect our rankings or advice. All information is provided for general guidance and should not be
            considered financial advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
