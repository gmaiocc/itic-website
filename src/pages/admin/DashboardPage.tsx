// Admin Dashboard Page - Overview with stats and quick actions
import { Link } from 'react-router-dom';
import {
    FileText,
    Image,
    MessageSquare,
    TrendingUp,
    Clock,
    ArrowRight,
    Plus,
    Eye,
    Calendar,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/api/client';
import type { ReportsResponse } from '@/types/report';
import type { GalleryResponse } from '@/types/gallery';
import type { ContactsResponse } from '@/types/contact';



interface StatCardProps {
    title: string;
    value: string | number;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    trend?: { value: number; label: string };
    color: 'red' | 'blue' | 'green' | 'purple';
}

const colorClasses = {
    red: {
        bg: 'bg-red-50 dark:bg-red-950/30',
        icon: 'text-red-600 dark:text-red-400',
        iconBg: 'bg-red-100 dark:bg-red-900/50',
    },
    blue: {
        bg: 'bg-blue-50 dark:bg-blue-950/30',
        icon: 'text-blue-600 dark:text-blue-400',
        iconBg: 'bg-blue-100 dark:bg-blue-900/50',
    },
    green: {
        bg: 'bg-green-50 dark:bg-green-950/30',
        icon: 'text-green-600 dark:text-green-400',
        iconBg: 'bg-green-100 dark:bg-green-900/50',
    },
    purple: {
        bg: 'bg-purple-50 dark:bg-purple-950/30',
        icon: 'text-purple-600 dark:text-purple-400',
        iconBg: 'bg-purple-100 dark:bg-purple-900/50',
    },
};

const StatCard = ({ title, value, description, icon: Icon, trend, color }: StatCardProps) => {
    const colors = colorClasses[color];

    return (
        <Card className={`${colors.bg} border-0 shadow-sm hover:shadow-md transition-shadow`}>
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">{title}</p>
                        <p className="text-3xl font-bold tracking-tight">{value}</p>
                        <p className="text-xs text-muted-foreground">{description}</p>
                    </div>
                    <div className={`${colors.iconBg} p-3 rounded-xl`}>
                        <Icon className={`w-6 h-6 ${colors.icon}`} />
                    </div>
                </div>
                {trend && (
                    <div className="mt-4 flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                            +{trend.value}%
                        </span>
                        <span className="text-sm text-muted-foreground">{trend.label}</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

interface QuickActionProps {
    title: string;
    description: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
}

const QuickAction = ({ title, description, href, icon: Icon }: QuickActionProps) => (
    <Link to={href}>
        <Card className="group cursor-pointer border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
            <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-sm">{title}</h3>
                    <p className="text-xs text-muted-foreground">{description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </CardContent>
        </Card>
    </Link>
);

const DashboardPage = () => {
    // Fetch reports
    const { data: reportsData } = useQuery<ReportsResponse>({
        queryKey: ['admin', 'reports'],
        queryFn: () => apiClient.get('/reports'),
    });

    // Fetch gallery
    const { data: galleryData } = useQuery<GalleryResponse>({
        queryKey: ['admin', 'gallery'],
        queryFn: () => apiClient.get('/gallery'),
    });

    // Fetch contacts
    const { data: contactsData } = useQuery<ContactsResponse>({
        queryKey: ['admin', 'contacts'],
        queryFn: () => apiClient.get('/contacts'),
    });

    const stats = {
        reports: reportsData?.total ?? 0,
        gallery: galleryData?.total ?? 0,
        contacts: contactsData?.total ?? 0,
        newContacts: contactsData?.contacts?.filter(c => c.status === 'new').length ?? 0,
    };

    const recentContacts = contactsData?.contacts?.slice(0, 5) ?? [];

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-heading font-bold">Dashboard</h1>
                    <p className="text-muted-foreground mt-1">
                        Welcome back! Here's what's happening with ITIC.
                    </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Last updated: Just now</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Reports"
                    value={stats.reports}
                    description="Published reports"
                    icon={FileText}
                    color="red"
                />
                <StatCard
                    title="Gallery Photos"
                    value={stats.gallery}
                    description="Team memories"
                    icon={Image}
                    color="blue"
                />
                <StatCard
                    title="Contact Messages"
                    value={stats.contacts}
                    description="Total submissions"
                    icon={MessageSquare}
                    color="green"
                />
                <StatCard
                    title="New Messages"
                    value={stats.newContacts}
                    description="Awaiting response"
                    icon={MessageSquare}
                    color="purple"
                />
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Quick Actions */}
                <Card className="border-slate-200 dark:border-slate-800">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Plus className="w-5 h-5 text-primary" />
                            Quick Actions
                        </CardTitle>
                        <CardDescription>Common tasks and shortcuts</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <QuickAction
                            title="Add New Report"
                            description="Upload a new research report"
                            href="/admin/reports?action=new"
                            icon={FileText}
                        />
                        <QuickAction
                            title="Upload Photos"
                            description="Add photos to the gallery"
                            href="/admin/gallery?action=new"
                            icon={Image}
                        />
                        <QuickAction
                            title="View Messages"
                            description={`${stats.newContacts} unread messages`}
                            href="/admin/contacts"
                            icon={MessageSquare}
                        />
                    </CardContent>
                </Card>

                {/* Recent Contacts */}
                <Card className="border-slate-200 dark:border-slate-800">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 text-primary" />
                                    Recent Messages
                                </CardTitle>
                                <CardDescription>Latest contact submissions</CardDescription>
                            </div>
                            <Link to="/admin/contacts">
                                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                                    View All
                                    <ArrowRight className="w-4 h-4 ml-1" />
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {recentContacts.length > 0 ? (
                            <div className="space-y-3">
                                {recentContacts.map((contact) => (
                                    <div
                                        key={contact.id}
                                        className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                                    >
                                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <span className="text-sm font-semibold text-primary">
                                                {contact.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium text-sm truncate">{contact.name}</p>
                                                {contact.status === 'new' && (
                                                    <span className="px-1.5 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-semibold uppercase">
                                                        New
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-muted-foreground truncate">
                                                {contact.subject || 'No subject'}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(contact.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                <MessageSquare className="w-10 h-10 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">No messages yet</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Content Overview */}
            <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Eye className="w-5 h-5 text-primary" />
                        Content Overview
                    </CardTitle>
                    <CardDescription>Quick summary of your published content</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 sm:grid-cols-3">
                        <Link to="/admin/reports" className="group">
                            <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:bg-primary/5 transition-all">
                                <div className="flex items-center justify-between mb-3">
                                    <FileText className="w-8 h-8 text-primary" />
                                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                                <h3 className="font-semibold">{stats.reports} Reports</h3>
                                <p className="text-sm text-muted-foreground">Sunday Scans, Research & Analysis</p>
                            </div>
                        </Link>
                        <Link to="/admin/gallery" className="group">
                            <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:bg-primary/5 transition-all">
                                <div className="flex items-center justify-between mb-3">
                                    <Image className="w-8 h-8 text-blue-600" />
                                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                                <h3 className="font-semibold">{stats.gallery} Photos</h3>
                                <p className="text-sm text-muted-foreground">Events & team moments</p>
                            </div>
                        </Link>
                        <Link to="/admin/contacts" className="group">
                            <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:bg-primary/5 transition-all">
                                <div className="flex items-center justify-between mb-3">
                                    <MessageSquare className="w-8 h-8 text-green-600" />
                                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                                <h3 className="font-semibold">{stats.contacts} Messages</h3>
                                <p className="text-sm text-muted-foreground">{stats.newContacts} awaiting response</p>
                            </div>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DashboardPage;
