const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('Testing Supabase connection...')
console.log('URL:', supabaseUrl)
console.log('Service Key (first 20 chars):', supabaseServiceKey?.substring(0, 20) + '...')

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function testConnection() {
  try {
    // Test basic connection
    console.log('\n1. Testing basic connection...')
    const { data, error } = await supabase
      .from('newsletter-signup')
      .select('*')
      .limit(1)

    if (error) {
      console.error('Connection test failed:', error.message)
      
      // Check if table exists
      if (error.code === '42P01' || error.message.includes('does not exist')) {
        console.log('\n2. Table "newsletter-signup" does not exist.')
        console.log('Please create the table in your Supabase dashboard with this SQL:')
        console.log(`
CREATE TABLE "newsletter-signup" (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  source VARCHAR(100) DEFAULT 'starter',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX idx_newsletter_email ON "newsletter-signup"(email);
        `)
        return
      }
    } else {
      console.log('✅ Connection successful!')
      console.log('Current newsletter signups:', data)
    }

    // Test insert operation
    console.log('\n3. Testing insert operation...')
    const testEmail = `test-${Date.now()}@example.com`
    
    const { data: insertData, error: insertError } = await supabase
      .from('newsletter-signup')
      .insert([
        {
          email: testEmail,
          source: 'starter'
        }
      ])
      .select()

    if (insertError) {
      console.error('Insert test failed:', insertError.message)
    } else {
      console.log('✅ Insert test successful!')
      console.log('Inserted data:', insertData)
      
      // Clean up test data
      await supabase
        .from('newsletter-signup')
        .delete()
        .eq('email', testEmail)
      
      console.log('🧹 Test data cleaned up')
    }

  } catch (error) {
    console.error('Unexpected error:', error)
  }
}

testConnection()