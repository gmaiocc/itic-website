// GET /api/contact - Get all contacts (admin)
// POST /api/contact - Submit contact form

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl || '', supabaseKey || '');

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // GET - Fetch all contacts (for admin dashboard)
    if (req.method === 'GET') {
        try {
            const { data: contacts, error } = await supabase
                .from('contacts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Database error:', error);
                return res.status(500).json({
                    error: 'Failed to fetch contacts'
                });
            }

            return res.status(200).json({
                contacts: contacts || [],
                total: contacts?.length || 0
            });
        } catch (error) {
            console.error('API error:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    // POST - Submit new contact form
    if (req.method === 'POST') {
        try {
            const { name, email, subject, message } = req.body;

            // Validation
            if (!name || !email || !message) {
                return res.status(400).json({
                    success: false,
                    error: 'Name, email, and message are required'
                });
            }

            // Save to database
            const { data: contact, error: dbError } = await supabase
                .from('contacts')
                .insert([{ name, email, subject, message, status: 'new' }])
                .select()
                .single();

            if (dbError) {
                console.error('Database error:', dbError);
                return res.status(500).json({
                    success: false,
                    error: 'Failed to save contact submission'
                });
            }

            // Send email notification (only if RESEND_API_KEY is configured)
            if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'your-resend-key') {
                try {
                    await resend.emails.send({
                        from: 'ITIC Contact Form <onboarding@resend.dev>',
                        to: process.env.CONTACT_EMAIL || 'itic@iscte-iul.pt',
                        subject: `New Contact Form: ${subject || 'No Subject'}`,
                        html: `
              <h2>New Contact Form Submission</h2>
              <p><strong>From:</strong> ${name} (${email})</p>
              <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, '<br>')}</p>
              <hr>
              <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
            `
                    });
                } catch (emailError) {
                    console.error('Email error:', emailError);
                    // Don't fail the request if email fails - contact is already saved
                }
            }

            return res.status(201).json({
                success: true,
                message: 'Contact form submitted successfully',
                id: contact.id
            });

        } catch (error) {
            console.error('API error:', error);
            return res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}

