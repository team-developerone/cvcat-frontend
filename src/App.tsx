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
import TailorCVWizard from "@/pages/TailorCVWizard";
import TeamPage from "@/pages/TeamPage";
import LogoPage from "@/pages/LogoPage";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import ChatBot from "@/components/ChatBot";
import { CVProvider } from "@/lib/context";
import { AuthProvider } from "@/lib/auth-context";
import ProtectedRoute from "@/components/ProtectedRoute";

function Router() {
  return (
    <>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/team" component={TeamPage} />
        <Route path="/logo" component={LogoPage} />
        <Route path="/privacy" component={PrivacyPolicy} />
        <Route path="/terms" component={TermsOfService} />
        <Route path="/import-selection">
          <ProtectedRoute>
            <CVProvider>
              <ImportSelection />
            </CVProvider>
          </ProtectedRoute>
        </Route>
        <Route path="/cv-builder">
          <ProtectedRoute>
            <CVProvider>
              <CVBuilder />
            </CVProvider>
          </ProtectedRoute>
        </Route>
        <Route path="/cv-management">
          <ProtectedRoute>
            <CVProvider>
              <CVManagement />
            </CVProvider>
          </ProtectedRoute>
        </Route>
        <Route path="/tailor-cv">
          <ProtectedRoute>
            <CVProvider>
              <TailorCVWizard />
            </CVProvider>
          </ProtectedRoute>
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
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
