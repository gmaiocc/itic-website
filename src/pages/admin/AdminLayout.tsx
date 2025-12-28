// Admin Panel Layout with Sidebar Navigation
import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    Image,
    MessageSquare,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronLeft,
    ChevronRight,
    Home,
    Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface NavItem {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    path: string;
    badge?: number;
}

const navItems: NavItem[] = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: FileText, label: 'Reports', path: '/admin/reports' },
    { icon: Image, label: 'Gallery', path: '/admin/gallery' },
    { icon: MessageSquare, label: 'Contacts', path: '/admin/contacts' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path: string) => {
        if (path === '/admin') {
            return location.pathname === '/admin';
        }
        return location.pathname.startsWith(path);
    };

    const handleLogout = () => {
        // TODO: Implement logout logic when auth is added
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Mobile Header */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 z-50 lg:hidden">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <img src="/apple-touch-icon.png" alt="ITIC" className="w-6 h-6" />
                        </div>
                        <span className="font-heading font-bold text-lg">ITIC Admin</span>
                    </div>
                </div>
            </header>

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 left-0 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 transition-all duration-300 ease-in-out",
                    // Mobile: slide in/out
                    mobileOpen ? "translate-x-0" : "-translate-x-full",
                    // Desktop: always visible
                    "lg:translate-x-0",
                    // Width based on collapsed state
                    collapsed ? "lg:w-20" : "lg:w-64",
                    "w-64"
                )}
            >
                {/* Sidebar Header */}
                <div className={cn(
                    "h-16 flex items-center border-b border-slate-200 dark:border-slate-800 px-4",
                    collapsed ? "lg:justify-center" : "justify-between"
                )}>
                    <Link
                        to="/admin"
                        className={cn(
                            "flex items-center gap-3 hover:opacity-80 transition-opacity",
                            collapsed && "lg:hidden"
                        )}
                    >
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
                            <img src="/apple-touch-icon.png" alt="ITIC" className="w-7 h-7" />
                        </div>
                        <div>
                            <h1 className="font-heading font-bold text-lg leading-tight">ITIC</h1>
                            <p className="text-[10px] text-muted-foreground leading-tight">Admin Panel</p>
                        </div>
                    </Link>

                    {/* Collapsed Logo */}
                    <Link
                        to="/admin"
                        className={cn(
                            "hidden",
                            collapsed && "lg:flex"
                        )}
                    >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
                            <img src="/apple-touch-icon.png" alt="ITIC" className="w-8 h-8" />
                        </div>
                    </Link>

                    {/* Collapse Toggle (Desktop only) */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setCollapsed(!collapsed)}
                        className={cn(
                            "hidden lg:flex h-8 w-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800",
                            collapsed && "absolute -right-3 top-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
                        )}
                    >
                        {collapsed ? (
                            <ChevronRight className="w-4 h-4" />
                        ) : (
                            <ChevronLeft className="w-4 h-4" />
                        )}
                    </Button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-3 space-y-1 overflow-y-auto h-[calc(100vh-8rem)]">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);

                        const navLink = (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                                    active
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100",
                                    collapsed && "lg:justify-center lg:px-2"
                                )}
                            >
                                <Icon className={cn("w-5 h-5 flex-shrink-0", active && "text-inherit")} />
                                <span className={cn(
                                    "font-medium text-sm",
                                    collapsed && "lg:hidden"
                                )}>
                                    {item.label}
                                </span>
                                {item.badge !== undefined && (
                                    <span className={cn(
                                        "ml-auto bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded-full",
                                        active && "bg-primary-foreground/20 text-primary-foreground",
                                        collapsed && "lg:hidden"
                                    )}>
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        );

                        // Wrap in tooltip when collapsed
                        if (collapsed) {
                            return (
                                <Tooltip key={item.path} delayDuration={0}>
                                    <TooltipTrigger asChild className="hidden lg:flex">
                                        {navLink}
                                    </TooltipTrigger>
                                    <TooltipContent side="right" className="hidden lg:block">
                                        {item.label}
                                    </TooltipContent>
                                </Tooltip>
                            );
                        }

                        return navLink;
                    })}
                </nav>

                {/* Sidebar Footer */}
                <div className="border-t border-slate-200 dark:border-slate-800 p-3 space-y-1">
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                            <Link
                                to="/"
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 transition-colors",
                                    collapsed && "lg:justify-center lg:px-2"
                                )}
                            >
                                <Home className="w-5 h-5 flex-shrink-0" />
                                <span className={cn("font-medium text-sm", collapsed && "lg:hidden")}>
                                    View Site
                                </span>
                            </Link>
                        </TooltipTrigger>
                        {collapsed && (
                            <TooltipContent side="right" className="hidden lg:block">
                                View Site
                            </TooltipContent>
                        )}
                    </Tooltip>

                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                            <button
                                onClick={handleLogout}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 transition-colors w-full",
                                    collapsed && "lg:justify-center lg:px-2"
                                )}
                            >
                                <LogOut className="w-5 h-5 flex-shrink-0" />
                                <span className={cn("font-medium text-sm", collapsed && "lg:hidden")}>
                                    Logout
                                </span>
                            </button>
                        </TooltipTrigger>
                        {collapsed && (
                            <TooltipContent side="right" className="hidden lg:block">
                                Logout
                            </TooltipContent>
                        )}
                    </Tooltip>
                </div>
            </aside>

            {/* Main Content */}
            <main
                className={cn(
                    "min-h-screen transition-all duration-300 ease-in-out pt-16 lg:pt-0",
                    collapsed ? "lg:pl-20" : "lg:pl-64"
                )}
            >
                <div className="p-4 lg:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
