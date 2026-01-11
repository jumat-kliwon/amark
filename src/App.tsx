import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CourseOverview from "./pages/CourseOverview";
import CourseDetail from "./pages/CourseDetail";
import Subscription from "./pages/Subscription";
import Certificate from "./pages/Certificate";
import Affiliate from "./pages/Affiliate";
import EditProfile from "./pages/EditProfile";
import UpdatePassword from "./pages/UpdatePassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/course/:id" element={<CourseOverview />} />
          <Route path="/course/:id/lesson/:lessonId" element={<CourseDetail />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/affiliate" element={<Affiliate />} />
          <Route path="/settings/profile" element={<EditProfile />} />
          <Route path="/settings/password" element={<UpdatePassword />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
