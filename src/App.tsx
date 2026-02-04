import { Toaster } from "@/components/ui/toaster";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Events from "./pages/Events";
import Participants from "./pages/Participants";
import About from "./pages/About";
import Services from "./pages/Services";
import Documents from "./pages/Documents";
import Policy from "./pages/Policy";
import NotFound from "./pages/NotFound";
import PilotProjectsPage from "./pages/PilotProjectsPage";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/events" element={<Events />} />
          <Route path="/participants" element={<Participants />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/docs" element={<Documents />} />
          <Route path="/join" element={<Index />} />
          <Route path="/policy" element={<Policy/>} />
          <Route path="*" element={<NotFound />} />
          <Route path="/PilotProjectsPage" element={<PilotProjectsPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
