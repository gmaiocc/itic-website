// POST /api/upload - Upload files to Cloudinary

import { uploadToCloudinary } from '../../src/lib/cloudinary.js';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
};

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { file, type = 'image', folder = 'itic' } = req.body;

        if (!file) {
            return res.status(400).json({ error: 'No file provided' });
        }

        // Check if Cloudinary is configured
        if (!process.env.CLOUDINARY_CLOUD_NAME ||
            process.env.CLOUDINARY_CLOUD_NAME === 'your-cloud-name') {
            return res.status(503).json({
                error: 'Cloudinary not configured. Please add credentials to .env'
            });
        }

        // Determine resource type based on file type
        let resourceType = 'auto';
        if (type === 'pdf' || type === 'document') {
            resourceType = 'raw';
        } else if (type === 'image') {
            resourceType = 'image';
        }

        // Upload to Cloudinary
        const result = await uploadToCloudinary(file, {
            folder,
            resourceType,
        });

        return res.status(200).json({
            success: true,
            url: result.url,
            publicId: result.publicId,
            format: result.format,
            size: result.size,
        });

    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({
            error: error.message || 'Upload failed'
        });
    }
}
