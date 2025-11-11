# ParkWise - Static Caravan Lead Generation Platform

ParkWise is a comprehensive lead generation platform for static caravan sales in the UK. It functions as an independent comparison site (similar to MoneySavingExpert for caravans) that connects potential buyers with holiday park operators through progressive disclosure and intelligent lead qualification.

## 🎯 Overview

- **Platform Type**: Lead generation for static caravan sales
- **Revenue Model**: Commission from park operators (£50-300 per lead, £500-2000 per sale)
- **Target Market**: UK consumers looking to buy static caravans
- **Positioning**: Independent, trusted comparison platform

## 🏗️ Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Components**: Shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form + Zod
- **Data Fetching**: React Query
- **Animations**: Framer Motion
- **Maps**: Mapbox GL / Leaflet

### Backend
- **API**: Next.js API Routes
- **Database**: PostgreSQL via Supabase
- **Authentication**: Supabase Auth (admin only)
- **Email**: Resend / SendGrid
- **File Storage**: Supabase Storage
- **Hosting**: Vercel

### Analytics
- PostHog (behavior tracking)
- Google Analytics 4
- Facebook Pixel
- Custom event tracking

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Supabase account
- Mapbox account (for maps)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/parkwise.git
cd parkwise
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required environment variables:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `NEXT_PUBLIC_MAPBOX_TOKEN` - Mapbox public token
- `RESEND_API_KEY` - Resend API key for emails

4. **Set up the database**

Run the database migration in your Supabase SQL editor:

```bash
# Copy contents of supabase/migrations/001_initial_schema.sql
# and run in Supabase SQL editor
```

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
parkwise/
├── app/
│   ├── (marketing)/          # Public-facing pages
│   │   ├── page.tsx          # Homepage
│   │   ├── parks/            # Park listing & details
│   │   └── tools/            # Calculators
│   ├── admin/                # Admin dashboard
│   ├── api/                  # API routes
│   │   ├── parks/           # Park endpoints
│   │   ├── leads/           # Lead capture & tracking
│   │   └── tools/           # Calculator endpoints
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # Shadcn components
│   ├── forms/               # Form components
│   ├── parks/               # Park-specific components
│   ├── calculators/         # Calculator components
│   └── layout/              # Layout components
├── lib/
│   ├── supabase/            # Database client & queries
│   ├── lead-scoring.ts      # Lead scoring engine
│   ├── utils.ts             # Utility functions
│   └── constants.ts         # App constants
├── types/
│   └── index.ts             # TypeScript types
└── supabase/
    └── migrations/          # Database migrations
```

## 🎨 Key Features

### Progressive Lead Capture
- Multi-stage form that gradually collects information
- Email capture with value exchange
- Preference gathering
- Full qualification with timeline and budget

### Lead Scoring Engine
- Intelligent scoring based on:
  - Contact information completeness
  - Financial qualification (budget, deposit)
  - Timeline urgency
  - Engagement behaviors
  - High-intent actions
- Temperature classification (Cold → Warm → Hot → Immediate)
- Automated recommendations

### Park Comparison
- Side-by-side park comparison
- Filter by region, features, price
- Distance-based search using postcodes
- Interactive UK map
- Virtual tours and brochures

### Smart Calculators
1. **Budget Calculator**: Monthly payments, interest, total cost
2. **True Cost Calculator**: Annual running costs by usage
3. **Valuation Tool**: Part-exchange valuations

### Analytics & Tracking
- Session tracking
- Activity monitoring
- Lead journey mapping
- Conversion funnel analysis
- UTM parameter tracking

## 🔌 API Endpoints

### Public APIs

#### Parks
- `GET /api/parks` - List parks with filters
- `GET /api/parks/[slug]` - Get park details
- `POST /api/parks/compare` - Compare multiple parks

#### Leads
- `POST /api/leads/capture` - Capture lead information
- `POST /api/leads/activity` - Track user activities
- `POST /api/leads/interest` - Record park interest

#### Tools
- `POST /api/tools/calculate` - Run calculations (budget, cost, valuation)

### Admin APIs (Protected)
- `GET /api/admin/leads` - List and filter leads
- `GET /api/admin/leads/[id]` - Get lead details
- `PATCH /api/admin/leads/[id]` - Update lead
- `POST /api/admin/leads/[id]/assign` - Assign to parks

## 🗄️ Database Schema

### Core Tables
- **parks** - Holiday park listings
- **leads** - Lead information (progressive capture)
- **lead_park_interests** - Lead-park relationships
- **lead_activities** - Activity tracking
- **email_captures** - Email capture events
- **sessions** - Session tracking
- **admin_users** - Admin accounts

See `supabase/migrations/001_initial_schema.sql` for complete schema.

## 🎯 Lead Scoring

The platform uses a sophisticated scoring algorithm (0-100 points):

- **Contact Information** (30 pts): Email, phone, name
- **Financial Qualification** (25 pts): Budget range, deposit
- **Timeline** (25 pts): Urgency (immediate → researching)
- **Engagement** (20 pts): Park views, calculator use, time on site
- **High Intent Actions** (bonus): Callbacks, viewings, specific inquiries

## 🔒 Security

- Row Level Security (RLS) policies in Supabase
- Service role key only used server-side
- Input validation with Zod
- CSRF protection
- Rate limiting on sensitive endpoints

## 🎨 UI Components

Built with Shadcn/ui for consistency:
- Button, Input, Label, Select
- Card, Badge, Slider
- Dialog, Dropdown, Tabs
- Custom form components
- Progressive disclosure widgets

## 📊 Lead Temperature Classification

- **Cold** (0-24 pts): Early research, minimal engagement
- **Warm** (25-49 pts): Interested, comparing options
- **Hot** (50-74 pts): Ready to move forward, high engagement
- **Immediate** (75-100 pts): Urgent buyer, viewing booked

## 🔧 Configuration

### Feature Flags (.env)
```bash
ENABLE_CHAT=false
ENABLE_PHONE_VERIFICATION=false
ENABLE_PART_EXCHANGE=true
```

### Map Settings
- Default center: 54.5°N, -2.5°W (UK center)
- Default zoom: 6
- Supports distance-based search

### Finance Defaults
- Default term: 7 years
- Recommended deposit: 20%
- APR range: 6.9% - 19.9%

## 📈 Conversion Funnel

1. **Landing** → Browse parks, use calculators
2. **Email Capture** → Save research, get deals
3. **Preference Gathering** → Budget, timeline, regions
4. **Contact Details** → Phone, full name
5. **Full Qualification** → Part exchange, finance needs
6. **Assignment** → Match with parks
7. **Conversion** → Viewing → Sale

## 🚢 Deployment

### Vercel (Recommended)

1. **Connect repository**
```bash
vercel link
```

2. **Add environment variables** in Vercel dashboard

3. **Deploy**
```bash
vercel --prod
```

### Database
- Supabase automatically handles migrations
- Set up connection pooling for production
- Enable backups

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Run build
npm run build
```

## 📝 License

Proprietary - All rights reserved

## 👥 Support

For questions or issues:
- Email: support@parkwise.co.uk
- Documentation: [link to docs]

---

Built with ❤️ for the UK static caravan industry
