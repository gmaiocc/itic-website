// Central export for all types
export * from './report';
export * from './contact';
export * from './gallery';

// Generic API types
export interface ApiError {
    message: string;
    code?: string;
    details?: unknown;
}

export interface ApiResponse<T> {
    data: T;
    error?: ApiError;
    success: boolean;
}
