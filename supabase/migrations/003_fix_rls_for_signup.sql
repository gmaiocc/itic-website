-- Migration: Fix RLS policies for user signup/setup
-- This allows users to create their own profile during signup

-- Drop the existing insert policy
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON user_profiles;

-- Create a more permissive insert policy for signup
-- This allows any authenticated user to insert their own profile
CREATE POLICY "Users can insert own profile on signup" 
ON user_profiles 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = id);

-- Also add a policy for unauthenticated inserts (for service role)
-- This is needed for admin-created users via the API
CREATE POLICY "Service role can insert any profile" 
ON user_profiles 
FOR INSERT 
TO service_role
WITH CHECK (true);

-- Update policy: Allow users to update their own profile
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;

CREATE POLICY "Users can update own profile" 
ON user_profiles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);
