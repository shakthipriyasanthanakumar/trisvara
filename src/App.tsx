import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import InsuranceDashboard from "./pages/InsuranceDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Root redirect component
const RootRedirect = () => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  
  // Redirect to appropriate dashboard based on role
  switch (user.role) {
    case 'patient':
      return <Navigate to="/patient/dashboard" replace />;
    case 'doctor':
      return <Navigate to="/doctor/dashboard" replace />;
    case 'insurance':
      return <Navigate to="/insurance/dashboard" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Root redirect */}
            <Route path="/" element={<RootRedirect />} />
            
            {/* Login route */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected Patient Routes */}
            <Route 
              path="/patient/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <PatientDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Protected Doctor Routes */}
            <Route 
              path="/doctor/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DoctorDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Protected Insurance Routes */}
            <Route 
              path="/insurance/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['insurance']}>
                  <InsuranceDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
