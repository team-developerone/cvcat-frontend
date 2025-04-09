import Layout from "@/components/Layout";
import AuthForms from "@/components/AuthForms";
import { useLocation } from "wouter";

export default function AuthPage() {
  const [, navigate] = useLocation();
  
  const handleLoginSuccess = () => {
    navigate('/import-selection');
  };
  
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <AuthForms onLoginSuccess={handleLoginSuccess} />
      </div>
    </Layout>
  );
}
