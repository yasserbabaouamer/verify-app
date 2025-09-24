import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import NewsContentAnalysis from "./pages/NewsContentAnalysis";
import SourceVerification from "./pages/SourceVerification";
import CrossVerification from "./pages/CrossCheck";
import AnalysisDashboard from "./pages/AnalysisDashboard";
import { ScrollToTop } from "./utils/ScrollToTop";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/analysis" element={<AnalysisDashboard />} />
        <Route path="/analysis/content" element={<NewsContentAnalysis />} />
        <Route path="/analysis/source" element={<SourceVerification />} />
        <Route path="/analysis/cross-check" element={<CrossVerification />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
