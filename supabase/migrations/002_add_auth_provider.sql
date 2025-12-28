-- Migration: Add auth_provider to user_profiles
-- Run this in your Supabase SQL Editor

-- Add auth_provider column to track login method
-- This enables SSO integration later
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS auth_provider TEXT 
DEFAULT 'local' 
CHECK (auth_provider IN ('local', 'sso', 'azure', 'google', 'github'));

-- Add index for faster queries by provider
CREATE INDEX IF NOT EXISTS idx_user_profiles_auth_provider 
ON user_profiles(auth_provider);

-- Update existing users to 'local' provider
UPDATE user_profiles 
SET auth_provider = 'local' 
WHERE auth_provider IS NULL;

-- ============================================
-- Optional: Row Level Security Policies
-- These ensure users can only see their own profile
-- while admins can see all profiles
-- ============================================

-- Enable RLS on user_profiles if not already enabled
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY IF NOT EXISTS "Users can read own profile" 
ON user_profiles 
FOR SELECT 
USING (auth.uid() = id);

-- Policy: Admins can read all profiles
CREATE POLICY IF NOT EXISTS "Admins can read all profiles" 
ON user_profiles 
FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM user_profiles 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Policy: Users can update their own profile (excluding role)
CREATE POLICY IF NOT EXISTS "Users can update own profile" 
ON user_profiles 
FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Policy: Admins can update any profile
CREATE POLICY IF NOT EXISTS "Admins can update all profiles" 
ON user_profiles 
FOR UPDATE 
USING (
    EXISTS (
        SELECT 1 FROM user_profiles 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Policy: Only admins can delete profiles
CREATE POLICY IF NOT EXISTS "Admins can delete profiles" 
ON user_profiles 
FOR DELETE 
USING (
    EXISTS (
        SELECT 1 FROM user_profiles 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Policy: Allow insert for new users (auto-provisioning)
CREATE POLICY IF NOT EXISTS "Allow insert for authenticated users" 
ON user_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);
