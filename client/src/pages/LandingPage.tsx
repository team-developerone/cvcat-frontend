import Layout from "@/components/Layout";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function LandingPage() {
  return (
    <Layout showFooter={true}>
      {/* Hero Section */}
      <section className="py-16 px-4 md:px-8 flex-1 flex flex-col items-center justify-center text-center max-w-6xl mx-auto">
        <div className="section-container animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your CV, <span className="text-[#DAA520]">Perfected</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl">
            Create, manage, and tailor your CVs with ease. Let our AI-powered tools help you stand out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button
                className="bg-black text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-[#DAA520] transition-all"
              >
                Get Started
              </Button>
            </Link>
            
            <Button
              variant="outline"
              className="border border-black px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-100 transition-all"
            >
              Learn More
            </Button>
          </div>
        </div>
        
        <div className="mt-16 w-full max-w-5xl">
          <div className="w-full h-96 bg-gray-200 rounded-lg shadow-2xl flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2">CV Management Dashboard</h3>
              <p className="text-gray-600">Manage all your CVs in one place</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <Features />
      
      {/* Pricing Section */}
      <Pricing />
    </Layout>
  );
}
