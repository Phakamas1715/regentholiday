import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import BookingPage from "./pages/BookingPage.tsx";
import PackagesPage from "./pages/PackagesPage.tsx";
import ItineraryPage from "./pages/ItineraryPage.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import CustomerDashboard from "./pages/CustomerDashboard.tsx";
import AnalyticsDashboard from "./pages/AnalyticsDashboard.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/my-bookings" element={<CustomerDashboard />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
