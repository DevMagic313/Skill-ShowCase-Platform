
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Projects from "./pages/Projects";
import Discover from "./pages/Discover";
import Resources from "./pages/Resources";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";
import AddProject from "./pages/AddProject";
import Messages from "./pages/Messages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          <Route path="/projects" element={<Layout><Projects /></Layout>} />
          <Route path="/projects/:projectId" element={<Layout><ProjectDetail /></Layout>} />
          <Route path="/add-project" element={<Layout><AddProject /></Layout>} />
          <Route path="/discover" element={<Layout><Discover /></Layout>} />
          <Route path="/resources" element={<Layout><Resources /></Layout>} />
          <Route path="/faq" element={<Layout><FAQ /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
          <Route path="/terms" element={<Layout><Terms /></Layout>} />
          <Route path="/messages" element={<Layout><Messages /></Layout>} />
          <Route path="/messages/:userId" element={<Layout><Messages /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
