import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import TradingPage from "./pages/TradingPage";
import AssetManagementPage from "./pages/AssetManagementPage";
import ResearchPage from "./pages/ResearchPage";
import HumanResourcesPage from "./pages/HumanResourcesPage";
import TeamPage from "./pages/TeamPage";
import ReportsPage from "./pages/ReportsPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
// Auth
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import LoginPage from "./pages/auth/LoginPage";
import SetupPage from "./pages/auth/SetupPage";
// Admin Panel
import AdminLayout from "./pages/admin/AdminLayout";
import AdminReportsPage from "./pages/admin/ReportsPage";
import AdminGalleryPage from "./pages/admin/GalleryPage";
import AdminContactsPage from "./pages/admin/ContactsPage";
import AdminUsersPage from "./pages/admin/UsersPage";
import DashboardPage from "./pages/admin/DashboardPage";
import {
  AdminReportsPlaceholder,
  AdminGalleryPlaceholder,
  AdminContactsPlaceholder,
  AdminSettingsPlaceholder,
} from "./pages/admin/AdminPlaceholder";

const queryClient = new QueryClient();

// Placeholder pages for auth routes
const AuthCallback = () => <div className="min-h-screen flex items-center justify-center"><p>Processing login...</p></div>;
const UnauthorizedPage = () => <div className="min-h-screen flex items-center justify-center"><p>You don't have permission to access this page.</p></div>;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/departments/trading" element={<TradingPage />} />
            <Route path="/departments/asset-management" element={<AssetManagementPage />} />
            <Route path="/departments/research" element={<ResearchPage />} />
            <Route path="/departments/human-resources" element={<HumanResourcesPage />} />
            <Route path="/gallery" element={<TeamPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Auth Routes */}
            <Route path="/auth/setup" element={<SetupPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* Admin Panel Routes - Protected */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardPage />} />
              <Route path="reports" element={<AdminReportsPage />} />
              <Route path="gallery" element={<AdminGalleryPage />} />
              <Route path="contacts" element={<AdminContactsPage />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="settings" element={<AdminSettingsPlaceholder />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

