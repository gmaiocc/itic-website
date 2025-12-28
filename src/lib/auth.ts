// Authentication library using Supabase Auth
// SSO-Ready: Supabase supports OAuth providers (Azure AD, Google, SAML)
// which can be added later for university login integration

import { supabase } from './supabase';
import { User, Session, AuthChangeEvent } from '@supabase/supabase-js';

export interface AuthUser {
    id: string;
    email: string;
    role: 'member' | 'department_head' | 'admin';
    authProvider: 'local' | 'sso' | 'azure' | 'google' | 'github';
    createdAt: string;
}

export interface SignInCredentials {
    email: string;
    password: string;
}

export interface SignUpCredentials extends SignInCredentials {
    role?: AuthUser['role'];
}

// Type for auth state change callback
export type AuthStateChangeCallback = (event: AuthChangeEvent, session: Session | null) => void;

/**
 * Authentication service using Supabase Auth
 * Designed to be extensible for future SSO integration
 */
export const auth = {
    /**
     * Sign in with email and password
     */
    async signIn({ email, password }: SignInCredentials) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;
        return data;
    },

    /**
     * Sign out the current user
     */
    async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    /**
     * Get the current session
     */
    async getSession() {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        return session;
    },

    /**
     * Get the current user
     */
    async getUser() {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        return user;
    },

    /**
     * Subscribe to auth state changes
     */
    onAuthStateChange(callback: AuthStateChangeCallback) {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
        return subscription;
    },

    /**
     * Send password reset email
     */
    async resetPassword(email: string) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/reset-password`,
        });
        if (error) throw error;
    },

    /**
     * Update user password (requires user to be logged in)
     */
    async updatePassword(newPassword: string) {
        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });
        if (error) throw error;
    },

    // ============================================
    // SSO-READY: OAuth Provider Methods
    // These can be enabled when university SSO is configured
    // ============================================

    /**
     * Sign in with OAuth provider (e.g., Azure AD for university SSO)
     * Call this when "Login with University" button is clicked
     * 
     * @param provider - The OAuth provider ('azure', 'google', etc.)
     */
    async signInWithProvider(provider: 'azure' | 'google' | 'github') {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) throw error;
        return data;
    },

    /**
     * Get user's role from user_profiles table
     */
    async getUserProfile(userId: string): Promise<AuthUser | null> {
        const { data, error } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching user profile:', error);
            return null;
        }

        return {
            id: data.id,
            email: data.email || '',
            role: data.role || 'member',
            authProvider: data.auth_provider || 'local',
            createdAt: data.created_at,
        };
    },

    /**
     * Create or update user profile (called after auth events)
     */
    async upsertUserProfile(user: User, authProvider: AuthUser['authProvider'] = 'local') {
        const { error } = await supabase
            .from('user_profiles')
            .upsert({
                id: user.id,
                email: user.email,
                auth_provider: authProvider,
                // New users get 'member' role by default
                // Admins can upgrade roles later
            }, {
                onConflict: 'id',
            });

        if (error) {
            console.error('Error upserting user profile:', error);
            throw error;
        }
    },
};

export default auth;
