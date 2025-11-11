-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Parks table (holiday park listings)
CREATE TABLE parks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Basic information
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  operator VARCHAR(255),
  operator_group VARCHAR(255),

  -- Location
  address_line1 VARCHAR(255),
  address_line2 VARCHAR(255),
  town VARCHAR(100),
  county VARCHAR(100),
  region VARCHAR(100),
  postcode VARCHAR(20),
  country VARCHAR(50) DEFAULT 'UK',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),

  -- Commission settings
  is_partner BOOLEAN DEFAULT false,
  commission_type VARCHAR(50) DEFAULT 'per_lead',
  commission_per_lead DECIMAL(10,2) DEFAULT 100.00,
  commission_per_sale DECIMAL(10,2) DEFAULT 1000.00,
  commission_percentage DECIMAL(5,2),

  -- Features and amenities
  features JSONB DEFAULT '[]',
  facilities JSONB DEFAULT '{}',

  -- Caravan details
  total_pitches INTEGER,
  available_pitches INTEGER,
  min_caravan_price INTEGER,
  max_caravan_price INTEGER,
  finance_available BOOLEAN DEFAULT true,
  part_exchange_accepted BOOLEAN DEFAULT true,

  -- Costs
  site_fees JSONB DEFAULT '{}',
  additional_costs JSONB DEFAULT '{}',

  -- Rules and restrictions
  season_length INTEGER DEFAULT 10,
  subletting_allowed BOOLEAN DEFAULT false,
  residential_use BOOLEAN DEFAULT false,
  pet_friendly BOOLEAN DEFAULT true,
  age_limit INTEGER,

  -- Content
  description TEXT,
  short_description VARCHAR(500),
  unique_selling_points TEXT[],
  images JSONB DEFAULT '[]',
  virtual_tour_url VARCHAR(500),
  brochure_url VARCHAR(500),

  -- Reviews and ratings
  google_rating DECIMAL(2,1),
  google_reviews_count INTEGER,
  internal_rating DECIMAL(2,1),
  internal_reviews_count INTEGER,

  -- SEO
  meta_title VARCHAR(255),
  meta_description VARCHAR(500),

  -- Status and settings
  status VARCHAR(50) DEFAULT 'active',
  priority_order INTEGER DEFAULT 100,
  lead_cap_daily INTEGER,
  lead_cap_monthly INTEGER,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  last_verified_at TIMESTAMPTZ
);

-- Leads table (progressive capture)
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Progressive contact information
  email VARCHAR(255),
  email_verified BOOLEAN DEFAULT false,
  phone VARCHAR(50),
  phone_verified BOOLEAN DEFAULT false,
  first_name VARCHAR(100),
  last_name VARCHAR(100),

  -- Location
  postcode VARCHAR(20),
  town VARCHAR(100),
  distance_willing_to_travel INTEGER,

  -- Lead qualification data
  lead_type VARCHAR(50) DEFAULT 'buyer',
  budget_min INTEGER,
  budget_max INTEGER,
  deposit_available INTEGER,
  finance_required BOOLEAN DEFAULT false,
  finance_pre_approved BOOLEAN DEFAULT false,

  -- Timeline and urgency
  timeline VARCHAR(50),
  viewing_availability VARCHAR(100),

  -- Part exchange details
  has_part_exchange BOOLEAN DEFAULT false,
  part_exchange_make VARCHAR(100),
  part_exchange_model VARCHAR(100),
  part_exchange_year INTEGER,
  part_exchange_value INTEGER,
  current_park VARCHAR(255),

  -- Preferences
  preferred_regions TEXT[],
  must_have_features TEXT[],
  caravan_type_preference VARCHAR(50),
  number_of_bedrooms INTEGER,

  -- Lead scoring
  score INTEGER DEFAULT 0,
  score_breakdown JSONB DEFAULT '{}',
  temperature VARCHAR(20) DEFAULT 'cold',
  quality_notes TEXT,

  -- Attribution and tracking
  source VARCHAR(100),
  medium VARCHAR(100),
  campaign VARCHAR(255),
  keyword VARCHAR(255),
  landing_page TEXT,
  referrer TEXT,

  -- Device and browser
  ip_address INET,
  user_agent TEXT,
  device_type VARCHAR(50),
  browser VARCHAR(50),

  -- Consent and preferences
  marketing_consent BOOLEAN DEFAULT false,
  marketing_consent_date TIMESTAMPTZ,
  privacy_accepted BOOLEAN DEFAULT true,
  privacy_accepted_date TIMESTAMPTZ,

  -- Internal status
  status VARCHAR(50) DEFAULT 'new',
  duplicate_of UUID REFERENCES leads(id),
  merged_into UUID REFERENCES leads(id),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  last_activity_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Lead-Park relationship
CREATE TABLE lead_park_interests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  park_id UUID NOT NULL REFERENCES parks(id) ON DELETE CASCADE,

  -- Interest tracking
  interest_type VARCHAR(50) NOT NULL,
  interest_level INTEGER DEFAULT 1,
  specific_caravan VARCHAR(255),

  -- Assignment to park
  assigned_to_park BOOLEAN DEFAULT false,
  assigned_at TIMESTAMPTZ,
  assignment_method VARCHAR(50),

  -- Park response
  park_contacted_at TIMESTAMPTZ,
  park_response VARCHAR(50),
  park_response_at TIMESTAMPTZ,
  park_notes TEXT,

  -- Outcome tracking
  outcome VARCHAR(50),
  outcome_date TIMESTAMPTZ,
  outcome_notes TEXT,

  -- Financial
  sale_value DECIMAL(12,2),
  commission_due DECIMAL(10,2),
  commission_paid BOOLEAN DEFAULT false,
  commission_paid_date DATE,
  invoice_number VARCHAR(50),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(lead_id, park_id)
);

-- Lead activities for scoring and tracking
CREATE TABLE lead_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  session_id VARCHAR(255) NOT NULL,

  -- Activity details
  activity_type VARCHAR(100) NOT NULL,
  activity_category VARCHAR(50),

  -- Context
  page_url TEXT,
  page_title VARCHAR(255),
  park_id UUID REFERENCES parks(id),

  -- Activity data
  activity_data JSONB DEFAULT '{}',
  duration_seconds INTEGER,

  -- Scoring impact
  score_impact INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Email capture events
CREATE TABLE email_captures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id),
  email VARCHAR(255) NOT NULL,

  -- Capture context
  capture_point VARCHAR(100),
  capture_page TEXT,
  value_proposition VARCHAR(255),

  -- Verification
  verification_sent BOOLEAN DEFAULT false,
  verification_sent_at TIMESTAMPTZ,
  verified BOOLEAN DEFAULT false,
  verified_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Admin users
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',

  -- Permissions
  can_view_leads BOOLEAN DEFAULT true,
  can_edit_leads BOOLEAN DEFAULT true,
  can_export_leads BOOLEAN DEFAULT true,
  can_manage_parks BOOLEAN DEFAULT true,

  -- Status
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Sessions for tracking
CREATE TABLE sessions (
  id VARCHAR(255) PRIMARY KEY,
  lead_id UUID REFERENCES leads(id),

  -- Session data
  started_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  last_activity_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  page_views INTEGER DEFAULT 0,
  total_duration_seconds INTEGER DEFAULT 0,

  -- Attribution
  source VARCHAR(100),
  medium VARCHAR(100),
  campaign VARCHAR(255),

  -- Device info
  ip_address INET,
  user_agent TEXT,

  data JSONB DEFAULT '{}'
);

-- Create indexes for performance
CREATE INDEX idx_parks_slug ON parks(slug);
CREATE INDEX idx_parks_status ON parks(status);
CREATE INDEX idx_parks_county_region ON parks(county, region);
CREATE INDEX idx_parks_lat_lng ON parks(latitude, longitude);

CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_phone ON leads(phone);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_temperature ON leads(temperature);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_timeline ON leads(timeline);

CREATE INDEX idx_lead_park_interests_lead ON lead_park_interests(lead_id);
CREATE INDEX idx_lead_park_interests_park ON lead_park_interests(park_id);
CREATE INDEX idx_lead_park_interests_assigned ON lead_park_interests(assigned_to_park);

CREATE INDEX idx_lead_activities_lead ON lead_activities(lead_id);
CREATE INDEX idx_lead_activities_session ON lead_activities(session_id);
CREATE INDEX idx_lead_activities_type ON lead_activities(activity_type);
CREATE INDEX idx_lead_activities_created ON lead_activities(created_at DESC);

-- Create update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_parks_updated_at BEFORE UPDATE ON parks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
