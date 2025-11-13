# ParkWise Setup Guide

The platform is fully built but needs **database and email configuration** to work. Here's what you need to do:

---

## ⚠️ Current Status

**What's Working:**
- ✅ All 24 pages build successfully
- ✅ All code compiles without errors
- ✅ Navigation and UI components work
- ✅ Progressive disclosure questionnaire

**What Needs Setup:**
- ❌ Database (Supabase) - using placeholders
- ❌ Email (Resend) - using placeholders

---

## 🗄️ Step 1: Set Up Supabase Database

### 1.1 Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up/login and create a new project
3. Choose a name, database password, and region
4. Wait for project to be created (~2 minutes)

### 1.2 Get Your Credentials

From your Supabase project dashboard:

1. Go to **Project Settings** → **API**
2. Copy these values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys" → "anon public")
   - **service_role key** (under "Project API keys" → "service_role" - keep this secret!)

### 1.3 Update Environment Variables

Edit `.env.local` and replace the placeholder values:

```bash
# Replace these with your actual Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-actual-service-role-key-here
```

### 1.4 Run Database Migrations

1. Go to your Supabase dashboard → **SQL Editor**
2. Run each migration file in order:

**Migration 1** (`supabase/migrations/001_initial_schema.sql`):
- Copy the entire contents of this file
- Paste into SQL Editor
- Click "Run"

**Migration 2** (`supabase/migrations/002_saved_parks.sql`):
- Copy the entire contents of this file
- Paste into SQL Editor
- Click "Run"

### 1.5 Seed the Database

Install Supabase CLI (optional but recommended):

```bash
npm install -g supabase
```

OR run the seed script directly with Node.js:

```bash
node scripts/seed.js
```

This will populate your database with:
- 15 realistic UK holiday parks
- 3 sample leads
- Sample lead-park relationships

**Note:** Make sure your `.env.local` has real credentials before running the seed script!

---

## 📧 Step 2: Set Up Email (Resend)

### 2.1 Create Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (100 emails/day free)
3. Verify your email address

### 2.2 Get API Key

1. Go to **API Keys** in Resend dashboard
2. Click "Create API Key"
3. Give it a name (e.g., "ParkWise Development")
4. Copy the API key (starts with `re_`)

### 2.3 Configure Domain (Optional but Recommended)

For production, add your domain:
1. Go to **Domains** in Resend
2. Add your domain (e.g., `parkwise.co.uk`)
3. Add the DNS records they provide
4. Wait for verification

For development, you can skip this and use Resend's test domain.

### 2.4 Update Environment Variables

Edit `.env.local`:

```bash
# Replace with your actual Resend API key
RESEND_API_KEY=re_your_actual_api_key_here

# Update with your actual domain (or leave as is for testing)
EMAIL_FROM=hello@parkwise.co.uk
```

---

## 🚀 Step 3: Test Everything

### 3.1 Start Development Server

```bash
npm run dev
```

### 3.2 Test Key Features

1. **Homepage** - http://localhost:3000
   - Should load progressive disclosure questionnaire

2. **Find Parks** - http://localhost:3000/parks
   - Should show 15 parks (from seed data)
   - Should be able to filter and search

3. **Save a Park**
   - Click bookmark icon on any park card
   - Go to "Saved" in header
   - Should see your saved parks

4. **Lead Capture Flow**
   - Complete the homepage questionnaire
   - Provide email, then contact details
   - Should receive welcome email (check spam folder)

### 3.3 Test Admin Features

1. **Admin Dashboard** - http://localhost:3000/admin/leads
   - View captured leads

2. **Lead Assignment** - Use API to assign leads to parks:

```bash
curl -X POST http://localhost:3000/api/leads/assign \
  -H "Content-Type: application/json" \
  -d '{
    "lead_id": "your-lead-id-from-database",
    "park_ids": ["park-id-1", "park-id-2"],
    "assignment_method": "manual"
  }'
```

---

## 🔧 Troubleshooting

### Issue: "Find Parks" shows error

**Cause:** Database not configured
**Fix:** Complete Step 1 above (Supabase setup)

### Issue: Welcome email not sent

**Cause:** Resend API key not configured
**Fix:** Complete Step 2 above (Resend setup)

### Issue: Parks page is empty

**Cause:** Database is empty
**Fix:** Run the seed script (Step 1.5)

### Issue: Build errors

**Cause:** Missing dependencies
**Fix:**
```bash
npm install
npm run build
```

---

## 📊 What You Get After Setup

Once configured, you'll have:

✅ **15 Realistic UK Parks** across all regions
✅ **Progressive Disclosure Lead Capture** (5-step questionnaire)
✅ **Save/Bookmark Functionality** for users
✅ **Email Automation** (welcome emails to leads)
✅ **Lead Assignment System** (assign leads to parks)
✅ **Admin Dashboard** (view and manage leads)
✅ **3 Calculators** (budget, true cost, valuation)
✅ **11 Content Pages** (guides, company info, legal)
✅ **Full Navigation** (no dead ends)

---

## 🎯 Quick Start (TL;DR)

If you just want to see it working quickly:

1. **Database:** Create Supabase project → Copy credentials to `.env.local` → Run migrations → Run seed script
2. **Email:** Create Resend account → Copy API key to `.env.local`
3. **Test:** `npm run dev` → Visit http://localhost:3000/parks

---

## 📝 Optional: Deploy to Production

When ready to deploy:

1. **Update Environment Variables** in your hosting platform (Vercel, etc.)
2. **Use Production Supabase** credentials (not development ones)
3. **Configure Custom Domain** in Resend
4. **Add Analytics** (PostHog, Google Analytics keys)
5. **Enable RLS** (Row Level Security) in Supabase for security

---

## 💡 Need Help?

- **Supabase Docs:** https://supabase.com/docs
- **Resend Docs:** https://resend.com/docs
- **Next.js Docs:** https://nextjs.org/docs

The platform is production-ready once you complete the database and email setup!
