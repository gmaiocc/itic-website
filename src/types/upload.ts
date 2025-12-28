// Upload service types

export type FileType = 'image' | 'pdf' | 'document' | 'auto';

export interface UploadOptions {
    folder?: string;
    fileType?: FileType;
    maxSizeMB?: number;
    generateThumbnail?: boolean;
}

export interface UploadResult {
    url: string;
    publicId?: string;
    size: number;
    type: string;
    thumbnailUrl?: string;
}

export interface ValidationResult {
    valid: boolean;
    error?: string;
}

export interface UploadProgress {
    loaded: number;
    total: number;
    percentage: number;
}
