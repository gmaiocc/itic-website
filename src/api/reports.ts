// Reports API service
import { apiClient } from './client';
import type { Report, ReportsResponse, ReportFilters } from '@/types/report';

export const reportsApi = {
    /**
     * Fetch all reports with optional filters
     */
    async getReports(filters?: ReportFilters): Promise<ReportsResponse> {
        const params: Record<string, string> = {};

        if (filters?.category) params.category = filters.category;
        if (filters?.search) params.search = filters.search;
        if (filters?.sortBy) params.sortBy = filters.sortBy;
        if (filters?.order) params.order = filters.order;

        return apiClient.get<ReportsResponse>('/reports', params);
    },

    /**
     * Fetch a single report by ID
     */
    async getReport(id: string): Promise<Report> {
        return apiClient.get<Report>(`/reports/${id}`);
    },

    /**
     * Download a report file
     */
    async downloadReport(id: string): Promise<Blob> {
        const response = await fetch(`${apiClient['baseUrl']}/reports/${id}/download`);

        if (!response.ok) {
            throw new Error('Failed to download report');
        }

        return response.blob();
    },
};
