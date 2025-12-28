// Unified Upload Service
// Works in both development (Vite + Supabase Storage) and production (Vercel + Cloudinary)

import { supabase } from './supabase';
import config from '@/config';
import type { UploadOptions, UploadResult, ValidationResult } from '@/types/upload';

/**
 * Detect environment
 */
const isDevelopment = config.isDevelopment;
const SUPABASE_STORAGE_URL = import.meta.env.VITE_SUPABASE_URL;

/**
 * Unified upload service
 * - In development: Uses Supabase Storage
 * - In production: Can use Cloudinary via API or Supabase Storage
 */
class UploadService {
    /**
     * Upload a file
     * @param file - File to upload
     * @param options - Upload options
     * @returns Upload result with URL
     */
    async uploadFile(file: File, options: UploadOptions = {}): Promise<UploadResult> {
        const {
            folder = 'general',
            fileType = 'auto',
            maxSizeMB = 10,
            generateThumbnail = false,
        } = options;

        // Validate file
        const validation = this.validateFile(file, fileType, maxSizeMB);
        if (!validation.valid) {
            throw new Error(validation.error || 'File validation failed');
        }

        // In development or always use Supabase Storage (simpler)
        // You can switch to Cloudinary in production if needed
        return this.uploadToSupabase(file, folder, fileType);
    }

    /**
     * Upload to Supabase Storage
     */
    private async uploadToSupabase(
        file: File,
        folder: string,
        fileType: string
    ): Promise<UploadResult> {
        try {
            // Determine bucket based on file type
            const bucket = this.getBucketName(fileType);

            // Generate unique file name
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = folder ? `${folder}/${fileName}` : fileName;

            // Upload to Supabase Storage
            const { data, error } = await supabase.storage
                .from(bucket)
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (error) {
                throw error;
            }

            // Get public URL
            const { data: urlData } = supabase.storage
                .from(bucket)
                .getPublicUrl(data.path);

            return {
                url: urlData.publicUrl,
                publicId: data.path,
                size: file.size,
                type: file.type,
            };
        } catch (error: any) {
            console.error('Supabase upload error:', error);
            throw new Error(`Upload failed: ${error.message}`);
        }
    }

    /**
     * Upload via Cloudinary API (production fallback)
     * This requires the /api/upload endpoint to be available (Vercel)
     */
    private async uploadToCloudinary(
        file: File,
        folder: string,
        fileType: string
    ): Promise<UploadResult> {
        try {
            // Convert file to base64
            const base64 = await this.fileToBase64(file);

            // Call API endpoint
            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    file: base64,
                    type: fileType,
                    folder,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Upload failed');
            }

            const data = await response.json();

            return {
                url: data.url,
                publicId: data.publicId,
                size: data.size,
                type: file.type,
            };
        } catch (error: any) {
            console.error('Cloudinary upload error:', error);
            throw new Error(`Upload failed: ${error.message}`);
        }
    }

    /**
     * Delete a file
     * @param filePath - Public ID or path of the file
     * @param bucket - Storage bucket name
     */
    async deleteFile(filePath: string, bucket: string = 'general'): Promise<void> {
        try {
            const { error } = await supabase.storage
                .from(bucket)
                .remove([filePath]);

            if (error) {
                throw error;
            }
        } catch (error: any) {
            console.error('Delete error:', error);
            throw new Error(`Delete failed: ${error.message}`);
        }
    }

    /**
     * Validate file
     */
    validateFile(file: File, fileType: string, maxSizeMB: number): ValidationResult {
        // Check file size
        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        if (file.size > maxSizeBytes) {
            return {
                valid: false,
                error: `File size exceeds ${maxSizeMB}MB limit`,
            };
        }

        // Check file type
        if (fileType === 'image') {
            if (!file.type.startsWith('image/')) {
                return {
                    valid: false,
                    error: 'File must be an image',
                };
            }
        } else if (fileType === 'pdf') {
            if (file.type !== 'application/pdf') {
                return {
                    valid: false,
                    error: 'File must be a PDF',
                };
            }
        } else if (fileType === 'document') {
            const allowedTypes = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ];
            if (!allowedTypes.includes(file.type)) {
                return {
                    valid: false,
                    error: 'File must be a PDF or Word document',
                };
            }
        }

        return { valid: true };
    }

    /**
     * Get bucket name based on file type
     */
    private getBucketName(fileType: string): string {
        switch (fileType) {
            case 'image':
                return 'gallery';
            case 'pdf':
            case 'document':
                return 'reports';
            default:
                return 'general';
        }
    }

    /**
     * Convert file to base64
     */
    private fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    }
}

// Export singleton instance
export const uploadService = new UploadService();

// Export helper functions
export async function uploadReport(file: File): Promise<UploadResult> {
    return uploadService.uploadFile(file, {
        folder: 'reports',
        fileType: 'pdf',
        maxSizeMB: 25,
    });
}

export async function uploadImage(file: File): Promise<UploadResult> {
    return uploadService.uploadFile(file, {
        folder: 'gallery',
        fileType: 'image',
        maxSizeMB: 10,
    });
}

export async function deleteUpload(filePath: string, bucket: string): Promise<void> {
    return uploadService.deleteFile(filePath, bucket);
}
