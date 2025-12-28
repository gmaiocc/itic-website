// Report types for the Reports page

export interface Report {
    id?: string;
    title: string;
    description: string;
    date: string;
    category: 'sundayscan' | 'research' | 'marketanalysis';
    downloadUrl?: string;
    file_url?: string;  // Database field name
    fileSize?: string;
    file_size?: string; // Database field name
    author?: string;
    created_at?: string;
}

export interface ReportsResponse {
    reports: Report[];
    total: number;
}

export interface ReportFilters {
    category?: Report['category'];
    search?: string;
    sortBy?: 'date' | 'title';
    order?: 'asc' | 'desc';
}
