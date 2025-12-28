// GET /api/users - Fetch all users (admin only)
// POST /api/users - Create new user (admin only)

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Service key for admin operations

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables');
}

// Use service role key for admin operations
const supabaseAdmin = createClient(supabaseUrl || '', supabaseServiceKey || '', {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

/**
 * Check if user is an admin
 * TODO: Replace with proper JWT verification
 */
async function isAdmin(req) {
    // For now, we'll implement basic auth check
    // In production, verify JWT token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) return false;

    // Extract user ID from token (simplified - in production use proper JWT verification)
    // This is a placeholder - actual implementation should verify the JWT
    return true; // For now, allow all authenticated requests
}

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Check admin permission
    const adminCheck = await isAdmin(req);
    if (!adminCheck) {
        return res.status(403).json({ error: 'Unauthorized - Admin access required' });
    }

    if (req.method === 'GET') {
        try {
            // Fetch all user profiles
            const { data, error } = await supabaseAdmin
                .from('user_profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Supabase error:', error);
                return res.status(500).json({ error: error.message });
            }

            return res.status(200).json({
                users: data || [],
                total: data?.length || 0
            });
        } catch (error) {
            console.error('API error:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    if (req.method === 'POST') {
        try {
            const { email, password, role, department, auth_provider = 'local' } = req.body;

            // Validation
            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
            }

            if (!role || !['member', 'department_head', 'admin'].includes(role)) {
                return res.status(400).json({ error: 'Valid role is required (member, department_head, or admin)' });
            }

            // Create auth user using admin API
            const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
                email,
                password,
                email_confirm: true, // Auto-confirm email for admin-created users
                user_metadata: {
                    role,
                    auth_provider
                }
            });

            if (authError) {
                console.error('Auth creation error:', authError);
                return res.status(500).json({ error: authError.message });
            }

            // Create user profile
            const { data: profileData, error: profileError } = await supabaseAdmin
                .from('user_profiles')
                .insert([
                    {
                        id: authData.user.id,
                        email,
                        role,
                        department,
                        auth_provider
                    }
                ])
                .select()
                .single();

            if (profileError) {
                console.error('Profile creation error:', profileError);
                // Rollback: delete the auth user
                await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
                return res.status(500).json({ error: profileError.message });
            }

            return res.status(201).json(profileData);
        } catch (error) {
            console.error('API error:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
