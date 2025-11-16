# Supabase Setup Guide for Cover Me

This guide will walk you through setting up Supabase for the Cover Me project on your shared VPS instance.

## Table of Contents
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [Storage Buckets](#storage-buckets)
- [Row Level Security (RLS)](#row-level-security-rls)
- [Testing the Connection](#testing-the-connection)

---

## Environment Variables

### Step 1: Create `.env.local` file

Copy the `.env.local.example` file to `.env.local`:

```bash
cp .env.local.example .env.local
```

### Step 2: Fill in your Supabase credentials

Based on the credentials you provided, your `.env.local` should contain:

```env
# Supabase URL (your VPS instance)
NEXT_PUBLIC_SUPABASE_URL=https://api.supabase.smartcamp.ai

# Supabase Anonymous Key (Public)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzUxNzk0MzAwLCJleHAiOjIwNjcxNTQzMDB9.OuEL1wHusMc323PhIe_pjbme3DSstlWn5DB0m9uorTc

# Supabase Service Role Key (Private - server-side only)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaXNzIjoic3VwYWJhc2UiLCJpYXQiOjE3NTE3OTQzMDAsImV4cCI6MjA2NzE1NDMwMH0.YInoydQJtOb2cst7sAjLcHbWcx6evVf3Gy-j5x5ZgsE
```

**Important:** Make sure `.env.local` is in your `.gitignore` file (it should be by default in Next.js projects).

---

## Database Schema

All tables and buckets for the Cover Me project use the `coverme_` prefix to avoid conflicts with other projects on your shared Supabase instance.

### 1. Newsletter Signup Table

**Table name:** `coverme_newsletter_signup`

Execute this SQL in your Supabase SQL Editor:

```sql
-- Create newsletter signup table
CREATE TABLE IF NOT EXISTS "coverme_newsletter_signup" (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  source VARCHAR(100) DEFAULT 'cover-me',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_coverme_newsletter_email ON "coverme_newsletter_signup"(email);

-- Add comment to identify project
COMMENT ON TABLE "coverme_newsletter_signup" IS 'Cover Me project - Newsletter signup emails';
```

### 2. Future Tables (for reference)

As you develop the Cover Me project, you'll need these additional tables. **Do not create them yet** - they're here for reference:

#### User Cover Letter History
```sql
CREATE TABLE IF NOT EXISTS "coverme_cover_letters" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  cv_file_path TEXT NOT NULL,
  job_url TEXT NOT NULL,
  cover_letter_content TEXT NOT NULL,
  cover_letter_file_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_coverme_cover_letters_user ON "coverme_cover_letters"(user_id);
COMMENT ON TABLE "coverme_cover_letters" IS 'Cover Me project - Generated cover letters history';
```

#### User Usage Tracking (for freemium model)
```sql
CREATE TABLE IF NOT EXISTS "coverme_user_usage" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  generations_this_month INT DEFAULT 0,
  total_generations INT DEFAULT 0,
  subscription_tier VARCHAR(50) DEFAULT 'free',
  subscription_expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_coverme_usage_user ON "coverme_user_usage"(user_id);
COMMENT ON TABLE "coverme_user_usage" IS 'Cover Me project - User usage tracking for freemium model';
```

---

## Storage Buckets

Create storage buckets for file uploads. Execute in Supabase dashboard or via SQL:

### 1. CV Uploads Bucket

**Bucket name:** `coverme-cv-uploads`

```sql
-- Create bucket for CV uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('coverme-cv-uploads', 'coverme-cv-uploads', false)
ON CONFLICT (id) DO NOTHING;
```

### 2. Generated Cover Letters Bucket

**Bucket name:** `coverme-cover-letters`

```sql
-- Create bucket for generated cover letters
INSERT INTO storage.buckets (id, name, public)
VALUES ('coverme-cover-letters', 'coverme-cover-letters', false)
ON CONFLICT (id) DO NOTHING;
```

**Note:** Both buckets are set to `public = false` for privacy. Access will be controlled via RLS policies.

---

## Row Level Security (RLS)

Enable RLS on all tables and create appropriate policies.

### Newsletter Signup Table Policies

```sql
-- Enable RLS
ALTER TABLE "coverme_newsletter_signup" ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for newsletter signup)
CREATE POLICY "Allow public newsletter signup"
  ON "coverme_newsletter_signup"
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only service role can select/update/delete
CREATE POLICY "Service role full access"
  ON "coverme_newsletter_signup"
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
```

### Future: Cover Letters Table Policies

```sql
-- Enable RLS on cover letters table
ALTER TABLE "coverme_cover_letters" ENABLE ROW LEVEL SECURITY;

-- Users can only see their own cover letters
CREATE POLICY "Users can view own cover letters"
  ON "coverme_cover_letters"
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own cover letters
CREATE POLICY "Users can create own cover letters"
  ON "coverme_cover_letters"
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own cover letters
CREATE POLICY "Users can update own cover letters"
  ON "coverme_cover_letters"
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own cover letters
CREATE POLICY "Users can delete own cover letters"
  ON "coverme_cover_letters"
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
```

### Future: Storage Bucket Policies

For CV uploads bucket (`coverme-cv-uploads`):

```sql
-- Users can upload their own CVs
CREATE POLICY "Users can upload own CVs"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'coverme-cv-uploads'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Users can view their own CVs
CREATE POLICY "Users can view own CVs"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'coverme-cv-uploads'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Users can delete their own CVs
CREATE POLICY "Users can delete own CVs"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'coverme-cv-uploads'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
```

Apply similar policies for `coverme-cover-letters` bucket.

---

## Testing the Connection

### Method 1: Using the Test Script

Run the included test script:

```bash
node scripts/test-supabase.js
```

This will:
1. Test the database connection
2. Check if the `coverme_newsletter_signup` table exists
3. Perform a test insert operation
4. Clean up test data

### Method 2: Using the API Route

Start the development server and access the test endpoint:

```bash
pnpm dev
```

Then visit: `http://localhost:3000/api/newsletter`

This GET endpoint will test the connection and return the current count of newsletter signups.

### Method 3: Manual SQL Query

In your Supabase SQL Editor, run:

```sql
SELECT COUNT(*) FROM coverme_newsletter_signup;
```

If the table exists and is accessible, you'll see a count (even if it's 0).

---

## Summary Checklist

- [ ] Created `.env.local` file with your Supabase credentials
- [ ] Created `coverme_newsletter_signup` table
- [ ] Enabled RLS on `coverme_newsletter_signup` table
- [ ] Created RLS policies for newsletter signup
- [ ] Tested connection using test script or API endpoint
- [ ] (Future) Created storage buckets for CV uploads and cover letters
- [ ] (Future) Created additional tables as needed
- [ ] (Future) Set up storage bucket policies

---

## Naming Convention Reference

**All Cover Me project resources use the `coverme_` prefix:**

- **Tables:** `coverme_newsletter_signup`, `coverme_cover_letters`, `coverme_user_usage`
- **Buckets:** `coverme-cv-uploads`, `coverme-cover-letters`
- **Indexes:** `idx_coverme_*`
- **Source field:** `'cover-me'` (for newsletter signups)

This ensures easy identification and prevents conflicts with other projects on your shared Supabase instance.

---

## Troubleshooting

### Error: "Missing Supabase environment variables"

- Make sure `.env.local` exists and contains all required variables
- Restart your development server after creating/updating `.env.local`

### Error: "relation 'coverme_newsletter_signup' does not exist"

- Run the SQL query to create the table in your Supabase SQL Editor
- Make sure you're connected to the correct database

### Error: "new row violates row-level security policy"

- Check that RLS policies are correctly set up
- Verify you're using the correct Supabase key (anon key vs service role key)

### Connection timeout or network errors

- Verify your Supabase URL is correct
- Check that your VPS firewall allows connections from your development machine
- Ensure Supabase instance is running on your VPS

---

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Documentation](https://supabase.com/docs/guides/storage)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
