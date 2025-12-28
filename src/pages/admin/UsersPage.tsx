// Admin Users Management Page
// Allows admins to create, view, edit, and delete users

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
} from '../../api/users';
import type { User, CreateUserRequest, UpdateUserRequest, UserRole, AuthProvider } from '../../types/user';
import './UsersPage.css';

interface UserFormData {
    email: string;
    password: string;
    role: UserRole;
    department: string;
    auth_provider: AuthProvider;
}

const INITIAL_FORM_DATA: UserFormData = {
    email: '',
    password: '',
    role: 'member',
    department: '',
    auth_provider: 'local',
};

export default function UsersPage() {
    const queryClient = useQueryClient();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [formData, setFormData] = useState<UserFormData>(INITIAL_FORM_DATA);
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

    // Fetch users
    const { data: usersResponse, isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    });

    // Create user mutation
    const createMutation = useMutation({
        mutationFn: (data: CreateUserRequest) => createUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            setIsCreateModalOpen(false);
            setFormData(INITIAL_FORM_DATA);
        },
    });

    // Update user mutation
    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateUserRequest }) =>
            updateUser(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            setEditingUser(null);
            setFormData(INITIAL_FORM_DATA);
        },
    });

    // Delete user mutation
    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            setDeleteConfirmId(null);
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingUser) {
            // Update existing user
            const updateData: UpdateUserRequest = {
                email: formData.email,
                role: formData.role,
                department: formData.department || undefined,
            };
            // Only include password if it's provided
            if (formData.password) {
                updateData.password = formData.password;
            }
            updateMutation.mutate({ id: editingUser.id, data: updateData });
        } else {
            // Create new user
            const createData: CreateUserRequest = {
                email: formData.email,
                password: formData.password,
                role: formData.role,
                department: formData.department || undefined,
                auth_provider: formData.auth_provider,
            };
            createMutation.mutate(createData);
        }
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setFormData({
            email: user.email,
            password: '', // Don't pre-fill password
            role: user.role,
            department: user.department || '',
            auth_provider: user.auth_provider,
        });
        setIsCreateModalOpen(true);
    };

    const handleDelete = (userId: string) => {
        setDeleteConfirmId(userId);
    };

    const confirmDelete = () => {
        if (deleteConfirmId) {
            deleteMutation.mutate(deleteConfirmId);
        }
    };

    const closeModal = () => {
        setIsCreateModalOpen(false);
        setEditingUser(null);
        setFormData(INITIAL_FORM_DATA);
    };

    const getRoleBadgeClass = (role: UserRole) => {
        switch (role) {
            case 'admin':
                return 'role-badge role-admin';
            case 'department_head':
                return 'role-badge role-department-head';
            case 'member':
                return 'role-badge role-member';
            default:
                return 'role-badge';
        }
    };

    const getProviderBadgeClass = (provider: AuthProvider) => {
        return `provider-badge provider-${provider}`;
    };

    if (isLoading) {
        return (
            <div className="users-page">
                <div className="loading">Loading users...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="users-page">
                <div className="error">Error loading users: {(error as Error).message}</div>
            </div>
        );
    }

    const users = usersResponse?.users || [];

    return (
        <div className="users-page">
            <div className="page-header">
                <div>
                    <h1>User Management</h1>
                    <p className="page-subtitle">
                        Manage user accounts and permissions
                    </p>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    <span className="icon">+</span>
                    Create User
                </button>
            </div>

            <div className="stats-bar">
                <div className="stat-card">
                    <div className="stat-value">{users.length}</div>
                    <div className="stat-label">Total Users</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">
                        {users.filter((u) => u.role === 'admin').length}
                    </div>
                    <div className="stat-label">Admins</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">
                        {users.filter((u) => u.role === 'department_head').length}
                    </div>
                    <div className="stat-label">Dept. Heads</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">
                        {users.filter((u) => u.role === 'member').length}
                    </div>
                    <div className="stat-label">Members</div>
                </div>
            </div>

            <div className="users-table-container">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Auth Provider</th>
                            <th>Department</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.email}</td>
                                <td>
                                    <span className={getRoleBadgeClass(user.role)}>
                                        {user.role.replace('_', ' ')}
                                    </span>
                                </td>
                                <td>
                                    <span className={getProviderBadgeClass(user.auth_provider)}>
                                        {user.auth_provider}
                                    </span>
                                </td>
                                <td>{user.department || '-'}</td>
                                <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                <td className="actions">
                                    <button
                                        className="btn-icon"
                                        onClick={() => handleEdit(user)}
                                        title="Edit user"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        className="btn-icon btn-danger"
                                        onClick={() => handleDelete(user.id)}
                                        title="Delete user"
                                    >
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {users.length === 0 && (
                    <div className="empty-state">
                        <p>No users found</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => setIsCreateModalOpen(true)}
                        >
                            Create First User
                        </button>
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            {isCreateModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingUser ? 'Edit User' : 'Create New User'}</h2>
                            <button className="close-btn" onClick={closeModal}>
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    required
                                    disabled={!!editingUser} // Can't change email
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">
                                    Password {editingUser ? '(leave blank to keep current)' : '*'}
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                    required={!editingUser}
                                    minLength={6}
                                    placeholder={editingUser ? 'Leave blank to keep current' : ''}
                                />
                                <small className="form-hint">Minimum 6 characters</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="role">Role *</label>
                                <select
                                    id="role"
                                    value={formData.role}
                                    onChange={(e) =>
                                        setFormData({ ...formData, role: e.target.value as UserRole })
                                    }
                                    required
                                >
                                    <option value="member">Member</option>
                                    <option value="department_head">Department Head</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="department">Department (Optional)</label>
                                <input
                                    type="text"
                                    id="department"
                                    value={formData.department}
                                    onChange={(e) =>
                                        setFormData({ ...formData, department: e.target.value })
                                    }
                                    placeholder="e.g., IT, Finance, Marketing"
                                />
                            </div>

                            {!editingUser && (
                                <div className="form-group">
                                    <label htmlFor="auth_provider">Auth Provider</label>
                                    <select
                                        id="auth_provider"
                                        value={formData.auth_provider}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                auth_provider: e.target.value as AuthProvider,
                                            })
                                        }
                                    >
                                        <option value="local">Local (Email/Password)</option>
                                        <option value="sso">SSO</option>
                                        <option value="azure">Azure AD</option>
                                        <option value="google">Google</option>
                                    </select>
                                    <small className="form-hint">
                                        For now, use 'local' for email/password authentication
                                    </small>
                                </div>
                            )}

                            <div className="modal-actions">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={createMutation.isPending || updateMutation.isPending}
                                >
                                    {createMutation.isPending || updateMutation.isPending
                                        ? 'Saving...'
                                        : editingUser
                                            ? 'Update User'
                                            : 'Create User'}
                                </button>
                            </div>

                            {(createMutation.isError || updateMutation.isError) && (
                                <div className="error">
                                    Error: {((createMutation.error || updateMutation.error) as Error)?.message}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirmId && (
                <div className="modal-overlay" onClick={() => setDeleteConfirmId(null)}>
                    <div className="modal modal-small" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Confirm Delete</h2>
                            <button className="close-btn" onClick={() => setDeleteConfirmId(null)}>
                                ×
                            </button>
                        </div>

                        <div className="modal-body">
                            <p>Are you sure you want to delete this user?</p>
                            <p className="warning-text">This action cannot be undone.</p>
                        </div>

                        <div className="modal-actions">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setDeleteConfirmId(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={confirmDelete}
                                disabled={deleteMutation.isPending}
                            >
                                {deleteMutation.isPending ? 'Deleting...' : 'Delete User'}
                            </button>
                        </div>

                        {deleteMutation.isError && (
                            <div className="error">
                                Error: {(deleteMutation.error as Error)?.message}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
