import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardOverviewPage } from './pages/DashboardOverviewPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Card, CardHeader, CardTitle, CardContent } from './components/common/Card';
import { Badge } from './components/common/Badge';
import { Sparkles, Construction } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Sprint 2 Feature Module Placeholder Component
const Sprint2FeaturePlaceholder = ({ title, moduleName }) => (
  <div className="max-w-3xl mx-auto py-12 space-y-6 text-center">
    <div className="w-16 h-16 rounded-2xl bg-medical-950/80 border border-medical-600/50 flex items-center justify-center mx-auto text-medical-400 shadow-glow-blue">
      <Construction className="w-8 h-8 animate-pulse" />
    </div>
    <div className="space-y-2">
      <Badge variant="medical">Sprint 2 Feature Module</Badge>
      <h2 className="text-3xl font-extrabold text-slate-100">{title}</h2>
      <p className="text-sm text-slate-400 max-w-md mx-auto">
        The foundation for {moduleName} is configured in Sprint 1 architecture. Data models & backend APIs for this module will be connected in Sprint 2.
      </p>
    </div>
  </div>
);

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardOverviewPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="users" element={<Sprint2FeaturePlaceholder title="User Directory & Role Management" moduleName="User Directory" />} />
            <Route path="inventory" element={<Sprint2FeaturePlaceholder title="Blood Stock & Inventory Management" moduleName="Inventory Tracking" />} />
            <Route path="requests" element={<Sprint2FeaturePlaceholder title="Hospital Emergency Requisitions" moduleName="Blood Request Orders" />} />
            <Route path="donations" element={<Sprint2FeaturePlaceholder title="Donor Appointment & Donation Sessions" moduleName="Donor Management" />} />
            <Route path="blood-banks" element={<Sprint2FeaturePlaceholder title="Regional Blood Bank Facilities" moduleName="Blood Bank Hubs" />} />
            <Route path="analytics" element={<Sprint2FeaturePlaceholder title="Predictive Supply Analytics" moduleName="Analytics Engine" />} />
            <Route path="audit-logs" element={<Sprint2FeaturePlaceholder title="Enterprise Audit & Telemetry Logs" moduleName="Audit Logs" />} />
            <Route path="reports" element={<Sprint2FeaturePlaceholder title="Quality Assurance Reports" moduleName="QA Reports" />} />
            <Route path="transfusions" element={<Sprint2FeaturePlaceholder title="Hospital Transfusion Records" moduleName="Transfusion Logs" />} />
            <Route path="appointments" element={<Sprint2FeaturePlaceholder title="Schedule Donation Session" moduleName="Appointments" />} />
            <Route path="eligibility" element={<Sprint2FeaturePlaceholder title="Donor Health Passport" moduleName="Eligibility Check" />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
