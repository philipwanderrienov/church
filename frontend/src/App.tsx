import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "./pages/Login";
import Index from "./pages/Index";
import PageLayout from "./components/PageLayout";
import Congregations from "./pages/Congregations";
import Organization from "./pages/Organization";
import Statistics from "./pages/Statistics";
import Finance from "./pages/Finance";
import PrayerRequests from "./pages/PrayerRequests";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Index />} />
          <Route
            path="/dashboard"
            element={<Index />}
          />
          <Route
            path="/congregations"
            element={<Congregations />}
          />
          <Route
            path="/organization"
            element={<Organization />}
          />
          <Route
            path="/statistics"
            element={<Statistics />}
          />
          <Route
            path="/finance"
            element={<Finance />}
          />
          <Route
            path="/prayer-requests"
            element={<PrayerRequests />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
