
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { LoginPage } from "@/pages/auth/LoginPage";
import { SignupPage } from "@/pages/auth/SignupPage"; 
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { MachinesPage } from "@/pages/machines/MachinesPage";
import MachineDetailPage from "./pages/machines/MachineDetailPage";
import AddMachinePage from "./pages/machines/AddMachinePage";
import EditMachinePage from "./pages/machines/EditMachinePage";
import MaintenancePage from "./pages/maintenance/MaintenancePage";
import MaintenanceTasksPage from "./pages/maintenance/MaintenanceTasksPage";
import MaintenanceSchedulesPage from "./pages/maintenance/MaintenanceSchedulesPage";
import CreateTaskPage from "./pages/maintenance/CreateTaskPage";
import CreateSchedulePage from "./pages/maintenance/CreateSchedulePage";
import InventoryPage from "./pages/inventory/InventoryPage";
import AddPartPage from "./pages/inventory/AddPartPage";
import EditPartPage from "./pages/inventory/EditPartPage";
import ReportsPage from "./pages/reports/ReportsPage";
import GenerateReportPage from "./pages/reports/GenerateReportPage";
import AlertsPage from "./pages/alerts/AlertsPage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import UsersPage from "./pages/users/UsersPage";
import AddUserPage from "./pages/users/AddUserPage";
import SettingsPage from "./pages/settings/SettingsPage";
import HelpPage from "./pages/help/HelpPage";
import ProfilePage from "./pages/profile/ProfilePage";
import NotFound from "./pages/NotFound";
import AdminRoute from './routes/AdminRoute';
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              
              {/* Protected routes */}
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                
                {/* Machine routes */}
                <Route path="/machines" element={<MachinesPage />} />
                <Route path="/machines/add" element={<AddMachinePage />} />
                <Route path="/machines/:id" element={<MachineDetailPage />} />
                <Route path="/machines/:id/edit" element={<EditMachinePage />} />
                
                {/* Maintenance routes */}
                <Route path="/maintenance" element={<MaintenancePage />} />
                <Route path="/maintenance/tasks" element={<MaintenanceTasksPage />} />
                <Route path="/maintenance/tasks/create" element={<CreateTaskPage />} />
                <Route path="/maintenance/schedules" element={<MaintenanceSchedulesPage />} />
                <Route path="/maintenance/schedules/create" element={<CreateSchedulePage />} />
                
                {/* Inventory routes */}
                <Route path="/inventory" element={<InventoryPage />} />
                <Route path="/inventory/add" element={<AddPartPage />} />
                <Route path="/inventory/edit/:id" element={<EditPartPage />} />
                
                {/* Reports routes */}
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/reports/generate" element={<GenerateReportPage />} />
                
                {/* Other routes */}
                <Route path="/alerts" element={<AlertsPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/users/add" element={<AddUserPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
              
              {/* Redirect to dashboard if accessing root */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />

              <Route path="/admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
              } />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
