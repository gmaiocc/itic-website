// GET /api/gallery/[id] - Fetch single photo
// PUT /api/gallery/[id] - Update photo (admin only)
// DELETE /api/gallery/[id] - Delete photo (admin only)

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl || '', supabaseKey || '');

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Photo ID is required' });
    }

    if (req.method === 'GET') {
        try {
            const { data, error } = await supabase
                .from('gallery')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                if (error.code === 'PGRST116') {
                    return res.status(404).json({ error: 'Photo not found' });
                }
                return res.status(500).json({ error: error.message });
            }

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    if (req.method === 'PUT') {
        try {
            const { title, description, image_url, thumbnail_url, category, date } = req.body;

            const { data, error } = await supabase
                .from('gallery')
                .update({ title, description, image_url, thumbnail_url, category, date })
                .eq('id', id)
                .select()
                .single();

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    if (req.method === 'DELETE') {
        try {
            const { error } = await supabase.from('gallery').delete().eq('id', id);

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            return res.status(204).end();
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
