// User types for user management

export type UserRole = 'member' | 'department_head' | 'admin';
export type AuthProvider = 'local' | 'sso' | 'azure' | 'google' | 'github';

export interface User {
    id: string;
    email: string;
    role: UserRole;
    auth_provider: AuthProvider;
    department?: string | null;
    created_at: string;
}

export interface CreateUserRequest {
    email: string;
    password: string;
    role: UserRole;
    department?: string;
    auth_provider?: AuthProvider;
}

export interface UpdateUserRequest {
    email?: string;
    role?: UserRole;
    department?: string;
    password?: string; // Optional password update
}

export interface UsersResponse {
    users: User[];
    total: number;
}
