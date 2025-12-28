// GET /api/reports - Fetch all reports (with optional filtering)
// POST /api/reports - Create new report (admin only - will add auth later)

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl || '', supabaseKey || '');

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        try {
            const { category, search, sortBy = 'created_at', order = 'desc' } = req.query;

            let query = supabase.from('reports').select('*');

            // Apply category filter
            if (category) {
                query = query.eq('category', category);
            }

            // Apply search filter (search in title and description)
            if (search) {
                query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
            }

            // Apply sorting
            query = query.order(sortBy, { ascending: order === 'asc' });

            const { data, error, count } = await query;

            if (error) {
                console.error('Supabase error:', error);
                return res.status(500).json({ error: error.message });
            }

            return res.status(200).json({
                reports: data || [],
                total: count || data?.length || 0
            });
        } catch (error) {
            console.error('API error:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    if (req.method === 'POST') {
        try {
            const { title, description, category, date, file_url, file_size, author } = req.body;

            // Validation
            if (!title || !category) {
                return res.status(400).json({ error: 'Title and category are required' });
            }

            const { data, error } = await supabase
                .from('reports')
                .insert([
                    {
                        title,
                        description,
                        category,
                        date,
                        file_url,
                        file_size,
                        author
                    }
                ])
                .select()
                .single();

            if (error) {
                console.error('Supabase error:', error);
                return res.status(500).json({ error: error.message });
            }

            return res.status(201).json(data);
        } catch (error) {
            console.error('API error:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
