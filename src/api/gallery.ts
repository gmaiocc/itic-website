// Gallery API service
import { apiClient } from './client';
import type { GalleryPhoto, GalleryResponse } from '@/types/gallery';

export const galleryApi = {
    /**
     * Fetch all gallery photos
     */
    async getPhotos(): Promise<GalleryResponse> {
        return apiClient.get<GalleryResponse>('/gallery');
    },

    /**
     * Fetch a single photo by ID
     */
    async getPhoto(id: string): Promise<GalleryPhoto> {
        return apiClient.get<GalleryPhoto>(`/gallery/${id}`);
    },

    /**
     * Create a new gallery photo
     */
    async createPhoto(data: Omit<GalleryPhoto, 'id'>): Promise<GalleryPhoto> {
        return apiClient.post<GalleryPhoto>('/gallery', data);
    },

    /**
     * Update an existing gallery photo
     */
    async updatePhoto(id: string, data: Partial<GalleryPhoto>): Promise<GalleryPhoto> {
        return apiClient.put<GalleryPhoto>(`/gallery/${id}`, data);
    },

    /**
     * Delete a gallery photo
     */
    async deletePhoto(id: string): Promise<void> {
        return apiClient.delete<void>(`/gallery/${id}`);
    },
};
