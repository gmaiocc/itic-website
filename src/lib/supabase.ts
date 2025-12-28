// Supabase client for database operations
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing Supabase environment variables. API calls will fail.');
}

// Client for use in browser (uses anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test connection function
export async function testConnection() {
    try {
        const { data, error } = await supabase.from('reports').select('count');

        if (error) {
            console.error('Supabase connection error:', error);
            return false;
        }

        console.log('✅ Supabase connected successfully!');
        return true;
    } catch (err) {
        console.error('Failed to connect to Supabase:', err);
        return false;
    }
}
