# ⚡ Quick Start - Get ParkWise Running in 10 Minutes

## What You Need to Do

The platform is **100% built** but needs **2 things configured**:

### 1️⃣ Database (Supabase) - 5 minutes

```bash
# 1. Sign up at https://supabase.com
# 2. Create a new project
# 3. Copy 3 values from Settings → API:
#    - Project URL
#    - anon public key
#    - service_role key

# 4. Paste into .env.local:
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# 5. In Supabase dashboard → SQL Editor, run these 2 files:
#    - supabase/migrations/001_initial_schema.sql
#    - supabase/migrations/002_saved_parks.sql

# 6. Seed the database:
node scripts/seed.js
```

### 2️⃣ Email (Resend) - 3 minutes

```bash
# 1. Sign up at https://resend.com (free tier: 100 emails/day)
# 2. Get API key from dashboard
# 3. Paste into .env.local:
RESEND_API_KEY=re_xxxxx
EMAIL_FROM=hello@parkwise.co.uk
```

### 3️⃣ Test It Works - 2 minutes

```bash
npm run dev

# Visit:
# - http://localhost:3000 (homepage with questionnaire)
# - http://localhost:3000/parks (should show 15 parks)
# - http://localhost:3000/admin/leads (admin dashboard)
```

---

## Why Are Things Failing Now?

Currently your `.env.local` has **placeholder values**:

```bash
SUPABASE_URL=https://placeholder.supabase.co  # ❌ This doesn't exist!
RESEND_API_KEY=re_placeholder                  # ❌ This doesn't work!
```

When the app tries to fetch parks, it fails because:
- Placeholder Supabase URL doesn't respond
- No real database exists

---

## What Happens After Setup?

✅ **Find Parks** - Shows 15 real UK holiday parks
✅ **Save Parks** - Bookmark functionality works
✅ **Lead Capture** - Questionnaire saves to database
✅ **Welcome Emails** - Sent automatically via Resend
✅ **Admin Dashboard** - View and assign leads
✅ **All Pages** - Everything works, no errors

---

## Full Details

See **SETUP_GUIDE.md** for detailed step-by-step instructions.

---

## Already Have Supabase/Resend?

Just update `.env.local` with your credentials and you're done!
