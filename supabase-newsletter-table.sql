-- Create newsletter-signup table for SmartCamp starter project
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE "newsletter-signup" (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  source VARCHAR(100) DEFAULT 'starter',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX idx_newsletter_email ON "newsletter-signup"(email);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at column
CREATE TRIGGER update_newsletter_updated_at 
    BEFORE UPDATE ON "newsletter-signup" 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert a test record (optional)
INSERT INTO "newsletter-signup" (email, source) 
VALUES ('test@smartcamp.ai', 'starter') 
ON CONFLICT (email) DO NOTHING;

-- Verify table creation
SELECT * FROM "newsletter-signup" LIMIT 5;