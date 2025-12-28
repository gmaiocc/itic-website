// GET /api/users/[id] - Fetch single user
// PUT /api/users/[id] - Update user
// DELETE /api/users/[id] - Delete user

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables');
}

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
    const authHeader = req.headers.authorization;
    if (!authHeader) return false;
    return true; // For now, allow all authenticated requests
}

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Check admin permission
    const adminCheck = await isAdmin(req);
    if (!adminCheck) {
        return res.status(403).json({ error: 'Unauthorized - Admin access required' });
    }

    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    if (req.method === 'GET') {
        try {
            const { data, error } = await supabaseAdmin
                .from('user_profiles')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                if (error.code === 'PGRST116') {
                    return res.status(404).json({ error: 'User not found' });
                }
                console.error('Supabase error:', error);
                return res.status(500).json({ error: error.message });
            }

            return res.status(200).json(data);
        } catch (error) {
            console.error('API error:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    if (req.method === 'PUT') {
        try {
            const { email, role, department, password } = req.body;

            const updateData = {};

            // Only update fields that are provided
            if (email !== undefined) updateData.email = email;
            if (role !== undefined) {
                if (!['member', 'department_head', 'admin'].includes(role)) {
                    return res.status(400).json({ error: 'Invalid role' });
                }
                updateData.role = role;
            }
            if (department !== undefined) updateData.department = department;

            // Update user profile
            const { data, error } = await supabaseAdmin
                .from('user_profiles')
                .update(updateData)
                .eq('id', id)
                .select()
                .single();

            if (error) {
                console.error('Profile update error:', error);
                return res.status(500).json({ error: error.message });
            }

            // Update auth user if email or password changed
            if (email || password) {
                const authUpdate = {};
                if (email) authUpdate.email = email;
                if (password) authUpdate.password = password;

                const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(
                    id,
                    authUpdate
                );

                if (authError) {
                    console.error('Auth update error:', authError);
                    // Note: Profile is already updated, might want to handle this differently
                    return res.status(500).json({
                        error: 'User profile updated but auth update failed: ' + authError.message
                    });
                }
            }

            return res.status(200).json(data);
        } catch (error) {
            console.error('API error:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    if (req.method === 'DELETE') {
        try {
            // Delete auth user (this will cascade to profile if RLS is configured properly)
            const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);

            if (authError) {
                console.error('Auth deletion error:', authError);
                return res.status(500).json({ error: authError.message });
            }

            // Delete user profile (in case cascade didn't work or isn't configured)
            const { error: profileError } = await supabaseAdmin
                .from('user_profiles')
                .delete()
                .eq('id', id);

            if (profileError) {
                console.error('Profile deletion error:', profileError);
                // Auth user is already deleted, log but don't fail
                console.error('Note: Auth user deleted but profile deletion failed');
            }

            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('API error:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
