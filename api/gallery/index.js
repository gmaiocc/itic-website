// GET /api/gallery - Fetch all gallery photos
// POST /api/gallery - Add new photo (admin only)

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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
            const { category } = req.query;

            let query = supabase.from('gallery').select('*').order('created_at', { ascending: false });

            if (category) {
                query = query.eq('category', category);
            }

            const { data, error } = await query;

            if (error) {
                console.error('Supabase error:', error);
                return res.status(500).json({ error: error.message });
            }

            return res.status(200).json({
                photos: data || [],
                total: data?.length || 0
            });
        } catch (error) {
            console.error('API error:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    if (req.method === 'POST') {
        try {
            const { title, description, image_url, thumbnail_url, category, date } = req.body;

            if (!title || !image_url) {
                return res.status(400).json({ error: 'Title and image_url are required' });
            }

            const { data, error } = await supabase
                .from('gallery')
                .insert([{ title, description, image_url, thumbnail_url, category, date }])
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
