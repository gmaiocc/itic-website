// Protected Route Component
// Redirects unauthenticated users to login page
// Optionally checks for specific roles

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: 'member' | 'department_head' | 'admin';
    allowedRoles?: Array<'member' | 'department_head' | 'admin'>;
}

/**
 * Wraps routes that require authentication
 * 
 * @example
 * // Require any authenticated user
 * <ProtectedRoute>
 *   <MemberPage />
 * </ProtectedRoute>
 * 
 * @example
 * // Require admin role
 * <ProtectedRoute requiredRole="admin">
 *   <AdminPage />
 * </ProtectedRoute>
 * 
 * @example
 * // Allow multiple roles
 * <ProtectedRoute allowedRoles={['admin', 'department_head']}>
 *   <ManagementPage />
 * </ProtectedRoute>
 */
export function ProtectedRoute({
    children,
    requiredRole,
    allowedRoles
}: ProtectedRouteProps) {
    const { isAuthenticated, isLoading, userProfile } = useAuth();
    const location = useLocation();

    // Show loading state while checking auth
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        // Save the attempted URL for redirecting after login
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    // Check role requirements
    if (requiredRole && userProfile?.role !== requiredRole) {
        // Admin role has access to everything
        if (userProfile?.role !== 'admin') {
            return <Navigate to="/unauthorized" replace />;
        }
    }

    // Check allowed roles list
    if (allowedRoles && allowedRoles.length > 0) {
        const hasAllowedRole = userProfile?.role && allowedRoles.includes(userProfile.role);
        // Admin always has access
        if (!hasAllowedRole && userProfile?.role !== 'admin') {
            return <Navigate to="/unauthorized" replace />;
        }
    }

    return <>{children}</>;
}

/**
 * Simple wrapper that only requires admin role
 */
export function AdminRoute({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute allowedRoles={['admin']}>
            {children}
        </ProtectedRoute>
    );
}

export default ProtectedRoute;
