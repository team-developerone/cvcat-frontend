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
import ChatBot from "@/components/ChatBot";
import { CVProvider } from "@/lib/context";

function Router() {
  return (
    <>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/import-selection">
          <CVProvider>
            <ImportSelection />
          </CVProvider>
        </Route>
        <Route path="/cv-builder">
          <CVProvider>
            <CVBuilder />
          </CVProvider>
        </Route>
        <Route path="/cv-management">
          <CVProvider>
            <CVManagement />
          </CVProvider>
        </Route>
        <Route component={NotFound} />
      </Switch>
      
      {/* Chat bot is now visible on all routes */}
      <ChatBot />
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
