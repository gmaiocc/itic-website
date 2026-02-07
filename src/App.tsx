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
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import GalleryPage from "./pages/TeamPage";
import AlumniPage from "./pages/AlumniPage";
import FAQPage from "./pages/FAQPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/alumni" element={<AlumniPage />} />
            <Route path="/departments/trading" element={<TradingPage />} />
            <Route path="/departments/asset-management" element={<AssetManagementPage />} />
            <Route path="/departments/research" element={<ResearchPage />} />
            <Route path="/departments/human-resources" element={<HumanResourcesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider >
  </QueryClientProvider >
);

export default App;
