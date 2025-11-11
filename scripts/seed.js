/**
 * Database seeding script for ParkWise
 * Populates the database with test data for development
 *
 * Usage: node scripts/seed.js
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const sampleParks = [
  {
    name: 'Seaside Haven Holiday Park',
    slug: 'seaside-haven-holiday-park',
    operator: 'Haven',
    operator_group: 'Haven Holidays',
    address_line1: 'Beach Road',
    town: 'Weymouth',
    county: 'Dorset',
    region: 'South West',
    postcode: 'DT4 7SX',
    latitude: 50.6089,
    longitude: -2.4525,
    is_partner: true,
    commission_per_lead: 150.00,
    commission_per_sale: 1500.00,
    features: ['Swimming Pool', 'Beach Access', 'Restaurant', 'Bar & Entertainment', 'Kids Club', 'Dog Friendly'],
    facilities: { restaurant: true, bar: true, shop: true, pool: true, gym: false },
    min_caravan_price: 25000,
    max_caravan_price: 85000,
    finance_available: true,
    part_exchange_accepted: true,
    site_fees: { annual: 3800, includes: ['water', 'waste'], excludes: ['electricity', 'gas'] },
    additional_costs: { insurance: 500, winterization: 350 },
    season_length: 10,
    subletting_allowed: false,
    pet_friendly: true,
    description: 'Beautiful coastal park with direct beach access. Perfect for families seeking sun, sea and sand. Our park features modern facilities including an indoor heated pool, entertainment complex, and a variety of dining options.',
    short_description: 'Stunning beachfront location with excellent facilities',
    unique_selling_points: ['Direct beach access', 'Award-winning facilities', '5-star rated entertainment'],
    images: [
      { url: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7', caption: 'Beach view', order: 1 },
      { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945', caption: 'Pool area', order: 2 }
    ],
    google_rating: 4.5,
    google_reviews_count: 284,
    status: 'active',
    priority_order: 10
  },
  {
    name: 'Lakeside Retreat Park',
    slug: 'lakeside-retreat-park',
    operator: 'Parkdean Resorts',
    operator_group: 'Parkdean Resorts',
    address_line1: 'Lake View',
    town: 'Windermere',
    county: 'Cumbria',
    region: 'North West',
    postcode: 'LA23 1LF',
    latitude: 54.3799,
    longitude: -2.9090,
    is_partner: true,
    commission_per_lead: 200.00,
    commission_per_sale: 2000.00,
    features: ['Lake Views', 'Fishing', 'Restaurant', 'Shop on Site', 'Dog Friendly', 'Wi-Fi'],
    facilities: { restaurant: true, bar: true, shop: true, pool: false, gym: false },
    min_caravan_price: 35000,
    max_caravan_price: 120000,
    finance_available: true,
    part_exchange_accepted: true,
    site_fees: { annual: 4200, includes: ['water', 'waste', 'wifi'], excludes: ['electricity'] },
    additional_costs: { insurance: 600, winterization: 400 },
    season_length: 11,
    subletting_allowed: true,
    pet_friendly: true,
    description: 'Peaceful lakeside setting in the heart of the Lake District. Perfect for nature lovers and those seeking tranquility. Enjoy fishing, walking, and stunning mountain views.',
    short_description: 'Tranquil Lake District location with beautiful views',
    unique_selling_points: ['Lake District National Park', 'Private fishing rights', 'Pet-friendly throughout'],
    images: [
      { url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4', caption: 'Lake view', order: 1 }
    ],
    google_rating: 4.7,
    google_reviews_count: 156,
    status: 'active',
    priority_order: 20
  },
  {
    name: 'Woodland Pines Holiday Village',
    slug: 'woodland-pines-holiday-village',
    operator: 'Independent',
    operator_group: 'Independent',
    address_line1: 'Forest Lane',
    town: 'Sherwood',
    county: 'Nottinghamshire',
    region: 'East Midlands',
    postcode: 'NG21 9RN',
    latitude: 53.1937,
    longitude: -1.0820,
    is_partner: false,
    commission_per_lead: 100.00,
    commission_per_sale: 1000.00,
    features: ['Play Area', 'Dog Friendly', 'Shop on Site', 'Laundry Facilities'],
    facilities: { restaurant: false, bar: false, shop: true, pool: false, gym: false },
    min_caravan_price: 15000,
    max_caravan_price: 45000,
    finance_available: true,
    part_exchange_accepted: true,
    site_fees: { annual: 2800, includes: ['water', 'waste'], excludes: ['electricity', 'gas'] },
    additional_costs: { insurance: 400, winterization: 300 },
    season_length: 9,
    subletting_allowed: false,
    pet_friendly: true,
    age_limit: 10,
    description: 'Family-run park nestled in beautiful woodland. Great value for money with a friendly, community atmosphere. Perfect for families and those on a budget.',
    short_description: 'Affordable woodland retreat with friendly atmosphere',
    unique_selling_points: ['Best value in the region', 'Family-owned', 'Community feel'],
    images: [
      { url: 'https://images.unsplash.com/photo-1478827536904-e0b413d4c155', caption: 'Woodland setting', order: 1 }
    ],
    google_rating: 4.2,
    google_reviews_count: 89,
    status: 'active',
    priority_order: 50
  },
  {
    name: 'Coastal Breeze Caravan Park',
    slug: 'coastal-breeze-caravan-park',
    operator: 'Park Holidays UK',
    operator_group: 'Park Holidays',
    address_line1: 'Cliff Top Road',
    town: 'Scarborough',
    county: 'North Yorkshire',
    region: 'Yorkshire and the Humber',
    postcode: 'YO11 3NU',
    latitude: 54.2797,
    longitude: -0.4044,
    is_partner: true,
    commission_per_lead: 175.00,
    commission_per_sale: 1750.00,
    features: ['Sea Views', 'Beach Access', 'Swimming Pool', 'Kids Club', 'Bar & Entertainment', 'Clubhouse'],
    facilities: { restaurant: true, bar: true, shop: true, pool: true, gym: false },
    min_caravan_price: 30000,
    max_caravan_price: 95000,
    finance_available: true,
    part_exchange_accepted: true,
    site_fees: { annual: 3600, includes: ['water', 'waste'], excludes: ['electricity', 'gas'] },
    additional_costs: { insurance: 550, winterization: 350 },
    season_length: 10,
    subletting_allowed: false,
    pet_friendly: false,
    description: 'Spectacular cliff-top location with panoramic sea views. Modern facilities and excellent entertainment make this a favorite for families. Close to Scarborough town center.',
    short_description: 'Cliff-top park with stunning sea views',
    unique_selling_points: ['Panoramic sea views', 'Indoor and outdoor pools', 'Award-winning entertainment'],
    images: [
      { url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19', caption: 'Sea view', order: 1 }
    ],
    google_rating: 4.4,
    google_reviews_count: 312,
    status: 'active',
    priority_order: 15
  },
  {
    name: 'Country Meadows Holiday Park',
    slug: 'country-meadows-holiday-park',
    operator: 'Independent',
    operator_group: 'Independent',
    address_line1: 'Meadow Lane',
    town: 'Stratford-upon-Avon',
    county: 'Warwickshire',
    region: 'West Midlands',
    postcode: 'CV37 8LS',
    latitude: 52.1917,
    longitude: -1.7081,
    is_partner: true,
    commission_per_lead: 125.00,
    commission_per_sale: 1250.00,
    features: ['Play Area', 'Fishing', 'Dog Friendly', 'Wi-Fi', 'Pitch Parking'],
    facilities: { restaurant: false, bar: false, shop: true, pool: false, gym: false },
    min_caravan_price: 20000,
    max_caravan_price: 60000,
    finance_available: true,
    part_exchange_accepted: true,
    site_fees: { annual: 3200, includes: ['water', 'waste', 'wifi'], excludes: ['electricity'] },
    additional_costs: { insurance: 450, winterization: 320 },
    season_length: 11,
    subletting_allowed: true,
    pet_friendly: true,
    description: 'Peaceful countryside setting near historic Stratford-upon-Avon. Perfect for exploring Shakespeare country. Family-friendly with fishing lake and play areas.',
    short_description: 'Rural retreat near Stratford-upon-Avon',
    unique_selling_points: ['Near Shakespeare attractions', 'Fishing lake', 'Quiet countryside location'],
    images: [
      { url: 'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904', caption: 'Country setting', order: 1 }
    ],
    google_rating: 4.3,
    google_reviews_count: 127,
    status: 'active',
    priority_order: 30
  }
]

async function seedDatabase() {
  console.log('🌱 Starting database seed...\n')

  try {
    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🗑️  Clearing existing parks...')
    const { error: deleteError } = await supabase
      .from('parks')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all

    if (deleteError && deleteError.code !== 'PGRST116') { // Ignore "no rows" error
      console.warn('⚠️  Warning clearing parks:', deleteError.message)
    }

    // Insert parks
    console.log('🏕️  Inserting sample parks...')
    const { data: parks, error: parksError } = await supabase
      .from('parks')
      .insert(sampleParks)
      .select()

    if (parksError) {
      throw new Error(`Failed to insert parks: ${parksError.message}`)
    }

    console.log(`✅ Inserted ${parks.length} parks`)

    // Create sample leads
    console.log('\n👥 Creating sample leads...')
    const sampleLeads = [
      {
        email: 'john.doe@example.com',
        first_name: 'John',
        last_name: 'Doe',
        phone: '07700 900123',
        postcode: 'SW1A 1AA',
        budget_min: 30000,
        budget_max: 60000,
        timeline: '3_months',
        preferred_regions: ['South West', 'South East'],
        must_have_features: ['Beach Access', 'Swimming Pool'],
        has_part_exchange: true,
        part_exchange_value: 15000,
        score: 72,
        temperature: 'hot',
        status: 'qualified',
        source: 'organic',
        marketing_consent: true
      },
      {
        email: 'sarah.smith@example.com',
        first_name: 'Sarah',
        last_name: 'Smith',
        phone: '07700 900456',
        postcode: 'M1 1AE',
        budget_min: 40000,
        budget_max: 80000,
        timeline: '1_month',
        preferred_regions: ['North West'],
        must_have_features: ['Lake Views', 'Dog Friendly'],
        score: 85,
        temperature: 'immediate',
        status: 'qualified',
        source: 'paid_search',
        marketing_consent: true
      },
      {
        email: 'mike.jones@example.com',
        first_name: 'Mike',
        last_name: 'Jones',
        budget_min: 15000,
        budget_max: 35000,
        timeline: 'researching',
        preferred_regions: ['East Midlands'],
        score: 28,
        temperature: 'warm',
        status: 'new',
        source: 'social',
        marketing_consent: false
      }
    ]

    const { data: leads, error: leadsError } = await supabase
      .from('leads')
      .insert(sampleLeads)
      .select()

    if (leadsError) {
      throw new Error(`Failed to insert leads: ${leadsError.message}`)
    }

    console.log(`✅ Created ${leads.length} sample leads`)

    // Create lead-park interests
    if (leads.length > 0 && parks.length > 0) {
      console.log('\n🔗 Creating lead-park interests...')
      const interests = [
        {
          lead_id: leads[0].id,
          park_id: parks[0].id,
          interest_type: 'inquired',
          interest_level: 4
        },
        {
          lead_id: leads[0].id,
          park_id: parks[3].id,
          interest_type: 'compared',
          interest_level: 3
        },
        {
          lead_id: leads[1].id,
          park_id: parks[1].id,
          interest_type: 'inquired',
          interest_level: 5
        }
      ]

      const { error: interestsError } = await supabase
        .from('lead_park_interests')
        .insert(interests)

      if (interestsError) {
        throw new Error(`Failed to create interests: ${interestsError.message}`)
      }

      console.log(`✅ Created ${interests.length} lead-park connections`)
    }

    console.log('\n✨ Database seeding completed successfully!')
    console.log('\n📊 Summary:')
    console.log(`   Parks: ${parks.length}`)
    console.log(`   Leads: ${leads.length}`)
    console.log('\n🚀 You can now run: npm run dev')

  } catch (error) {
    console.error('\n❌ Seeding failed:', error.message)
    process.exit(1)
  }
}

seedDatabase()
