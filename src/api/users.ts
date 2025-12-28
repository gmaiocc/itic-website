// User Management API - Admin Only
// Endpoints for creating, listing, updating, and deleting users

import { supabase } from '../lib/supabase';
import type { User, CreateUserRequest, UpdateUserRequest, UsersResponse } from '../types/user';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Get all users (Admin only)
 */
export async function getUsers(): Promise<UsersResponse> {
    const response = await fetch(`${API_URL}/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch users');
    }

    return response.json();
}

/**
 * Get a single user by ID (Admin only)
 */
export async function getUser(id: string): Promise<User> {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch user');
    }

    return response.json();
}

/**
 * Create a new user (Admin only)
 * Creates both auth user and user profile
 */
export async function createUser(data: CreateUserRequest): Promise<User> {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create user');
    }

    return response.json();
}

/**
 * Update an existing user (Admin only)
 */
export async function updateUser(id: string, data: UpdateUserRequest): Promise<User> {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update user');
    }

    return response.json();
}

/**
 * Delete a user (Admin only)
 * Deletes both auth user and user profile
 */
export async function deleteUser(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete user');
    }
}

/**
 * Check if current user is an admin
 */
export async function isAdmin(): Promise<boolean> {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return false;

        const { data: profile } = await supabase
            .from('user_profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        return profile?.role === 'admin';
    } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
    }
}
