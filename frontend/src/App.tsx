import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "./pages/Login";
import AccountCreate from "./pages/AccountCreate";
import Index from "./pages/Index";
import Congregations from "./pages/Congregations";
import Organization from "./pages/Organization";
import Statistics from "./pages/Statistics";
import Finance from "./pages/Finance";
import PrayerRequests from "./pages/PrayerRequests";
import NotFound from "./pages/NotFound";
import { getAuthUser } from "./lib/auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              getAuthUser() ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/accounts/new"
            element={
              getAuthUser() ? (
                <AccountCreate />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              getAuthUser() ? <Index /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/congregations"
            element={
              getAuthUser() ? (
                <Congregations />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/organization"
            element={
              getAuthUser() ? (
                <Organization />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/statistics"
            element={
              getAuthUser() ? <Statistics /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/finance"
            element={
              getAuthUser() ? <Finance /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/prayer-requests"
            element={
              getAuthUser() ? (
                <PrayerRequests />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="*"
            element={
              getAuthUser() ? <NotFound /> : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
