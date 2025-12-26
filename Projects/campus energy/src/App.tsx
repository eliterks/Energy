import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppLayout from "@/components/AppLayout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Monitoring from "./pages/Monitoring";
import Strategy from "./pages/Strategy";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected App Routes */}
            <Route path="/app" element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/app/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="monitoring" element={<Monitoring />} />
              <Route path="strategy" element={<Strategy />} />
              <Route path="reports" element={<Reports />} />
            </Route>

            {/* 404 Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
