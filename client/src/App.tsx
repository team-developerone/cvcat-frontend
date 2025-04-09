import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/LandingPage";
import AuthPage from "@/pages/AuthPage";
import ImportSelection from "@/pages/ImportSelection";
import CVBuilder from "@/pages/CVBuilder";
import CVManagement from "@/pages/CVManagement";
import { useLocation } from "wouter";
import ChatBot from "@/components/ChatBot";
import { useEffect } from "react";

function Router() {
  const [location] = useLocation();
  
  // Determine if we should show the chatbot (only on authenticated routes)
  const showChatBot = !['/', '/auth'].includes(location);
  
  return (
    <>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/import-selection" component={ImportSelection} />
        <Route path="/cv-builder" component={CVBuilder} />
        <Route path="/cv-management" component={CVManagement} />
        <Route component={NotFound} />
      </Switch>
      
      {showChatBot && <ChatBot />}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
