// Cloudinary upload utility
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload file to Cloudinary
 * @param {string} fileData - Base64 encoded file data
 * @param {object} options - Upload options
 * @returns {Promise<object>} Upload result with URL
 */
export async function uploadToCloudinary(fileData, options = {}) {
    const {
        folder = 'itic',
        resourceType = 'auto', // auto, image, video, raw
        maxFileSize = 10 * 1024 * 1024, // 10MB default
    } = options;

    try {
        const result = await cloudinary.uploader.upload(fileData, {
            folder,
            resource_type: resourceType,
            allowed_formats: resourceType === 'raw' ? ['pdf', 'doc', 'docx'] : undefined,
        });

        return {
            url: result.secure_url,
            publicId: result.public_id,
            format: result.format,
            size: result.bytes,
            width: result.width,
            height: result.height,
        };
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw new Error(`Upload failed: ${error.message}`);
    }
}

/**
 * Delete file from Cloudinary
 * @param {string} publicId - Cloudinary public ID
 * @param {string} resourceType - Type of resource
 */
export async function deleteFromCloudinary(publicId, resourceType = 'image') {
    try {
        await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        throw new Error(`Delete failed: ${error.message}`);
    }
}

export default cloudinary;
