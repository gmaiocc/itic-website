// Contact form types

export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface ContactSubmissionResponse {
    success: boolean;
    message?: string;
    id?: string;
}

// Contact type for admin panel (includes id and status)
export interface Contact {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: 'new' | 'read' | 'replied';
    created_at: string;
}

export interface ContactsResponse {
    contacts: Contact[];
    total: number;
}
