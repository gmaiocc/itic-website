// Auth Context - Provides authentication state across the app
// SSO-Ready: Works with any auth provider configured in Supabase

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { auth, AuthUser } from '@/lib/auth';

interface AuthContextType {
    // State
    user: User | null;
    userProfile: AuthUser | null;
    session: Session | null;
    isLoading: boolean;
    isAuthenticated: boolean;

    // Actions
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    signInWithProvider: (provider: 'azure' | 'google' | 'github') => Promise<void>;

    // Role checks
    isAdmin: boolean;
    isDepartmentHead: boolean;
    isMember: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<AuthUser | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user profile when user changes
    const loadUserProfile = async (userId: string) => {
        const profile = await auth.getUserProfile(userId);
        setUserProfile(profile);
    };

    // Initialize auth state on mount
    useEffect(() => {
        const initAuth = async () => {
            try {
                const currentSession = await auth.getSession();
                setSession(currentSession);

                if (currentSession?.user) {
                    setUser(currentSession.user);
                    await loadUserProfile(currentSession.user.id);
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();

        // Subscribe to auth state changes
        const subscription = auth.onAuthStateChange(async (event, newSession) => {
            console.log('Auth state changed:', event);
            setSession(newSession);

            if (newSession?.user) {
                setUser(newSession.user);

                // On sign in, ensure user profile exists
                if (event === 'SIGNED_IN') {
                    // Determine auth provider from user metadata
                    // Supabase returns 'email' for email/password, map it to 'local'
                    let rawProvider = newSession.user.app_metadata?.provider || 'email';
                    let provider: AuthUser['authProvider'] = 'local';

                    // Map Supabase provider names to our internal names
                    if (rawProvider === 'email' || rawProvider === 'local') {
                        provider = 'local';
                    } else if (rawProvider === 'azure' || rawProvider === 'azure-ad') {
                        provider = 'azure';
                    } else if (rawProvider === 'google') {
                        provider = 'google';
                    } else if (rawProvider === 'github') {
                        provider = 'github';
                    } else {
                        // Any other SSO provider
                        provider = 'sso';
                    }

                    await auth.upsertUserProfile(newSession.user, provider);
                }

                await loadUserProfile(newSession.user.id);
            } else {
                setUser(null);
                setUserProfile(null);
            }
        });

        // Cleanup subscription on unmount
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    // Sign in with email/password
    const signIn = async (email: string, password: string) => {
        const { session: newSession, user: newUser } = await auth.signIn({ email, password });
        setSession(newSession);
        setUser(newUser);
        if (newUser) {
            await loadUserProfile(newUser.id);
        }
    };

    // Sign out
    const signOut = async () => {
        await auth.signOut();
        setSession(null);
        setUser(null);
        setUserProfile(null);
    };

    // Sign in with OAuth provider (SSO-ready)
    const signInWithProvider = async (provider: 'azure' | 'google' | 'github') => {
        await auth.signInWithProvider(provider);
        // User will be redirected to provider's login page
        // Auth state will update via onAuthStateChange when they return
    };

    // Role checks
    const isAdmin = userProfile?.role === 'admin';
    const isDepartmentHead = userProfile?.role === 'department_head';
    const isMember = userProfile?.role === 'member';

    const value: AuthContextType = {
        user,
        userProfile,
        session,
        isLoading,
        isAuthenticated: !!session,
        signIn,
        signOut,
        signInWithProvider,
        isAdmin,
        isDepartmentHead,
        isMember,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * Hook to access auth context
 * @throws Error if used outside of AuthProvider
 */
export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export default AuthContext;
