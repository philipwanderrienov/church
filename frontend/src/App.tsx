import { useEffect, useMemo, useState } from "react";
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
import { getAuthUser, type AuthUser } from "./lib/auth";

const queryClient = new QueryClient();

const AUTH_STORAGE_KEY = "church_current_user";

function readAuthUser(): AuthUser | null {
  return getAuthUser();
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return readAuthUser() ? children : <Navigate to="/login" replace />;
}

function RootRedirect() {
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => readAuthUser());

  useEffect(() => {
    const syncAuth = () => {
      setAuthUser(readAuthUser());
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === AUTH_STORAGE_KEY) {
        syncAuth();
      }
    };

    syncAuth();
    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", syncAuth);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", syncAuth);
    };
  }, []);

  const target = useMemo(
    () => (authUser ? "/dashboard" : "/login"),
    [authUser],
  );

  return <Navigate to={target} replace />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RootRedirect />} />
          <Route
            path="/accounts/new"
            element={
              <ProtectedRoute>
                <AccountCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            }
          />
          <Route
            path="/congregations"
            element={
              <ProtectedRoute>
                <Congregations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organization"
            element={
              <ProtectedRoute>
                <Organization />
              </ProtectedRoute>
            }
          />
          <Route
            path="/statistics"
            element={
              <ProtectedRoute>
                <Statistics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/finance"
            element={
              <ProtectedRoute>
                <Finance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/prayer-requests"
            element={
              <ProtectedRoute>
                <PrayerRequests />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <NotFound />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;