// Contact API service
import { apiClient } from './client';
import type { ContactFormData, ContactSubmissionResponse, Contact, ContactsResponse } from '@/types/contact';

export const contactApi = {
    /**
     * Submit a contact form (public)
     */
    async submitContact(data: ContactFormData): Promise<ContactSubmissionResponse> {
        return apiClient.post<ContactSubmissionResponse, ContactFormData>('/contact', data);
    },

    /**
     * Fetch all contacts (admin)
     */
    async getContacts(): Promise<ContactsResponse> {
        return apiClient.get<ContactsResponse>('/contacts');
    },

    /**
     * Fetch a single contact by ID (admin)
     */
    async getContact(id: string): Promise<Contact> {
        return apiClient.get<Contact>(`/contacts/${id}`);
    },

    /**
     * Update contact status (admin)
     */
    async updateContactStatus(id: string, status: Contact['status']): Promise<Contact> {
        return apiClient.put<Contact>(`/contacts/${id}`, { status });
    },

    /**
     * Delete a contact (admin)
     */
    async deleteContact(id: string): Promise<void> {
        return apiClient.delete<void>(`/contacts/${id}`);
    },
};
