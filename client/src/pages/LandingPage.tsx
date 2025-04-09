import Layout from "@/components/Layout";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function LandingPage() {
  return (
    <Layout showFooter={true}>
      {/* Hero Section */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Your CV, <span className="text-[#DAA520]">Perfected</span>
              </h1>
              <p className="text-lg mb-6 max-w-lg text-gray-700">
                Create, manage, and tailor your CVs with ease. Let our AI-powered tools help you stand out in today's competitive job market.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8 md:justify-start justify-center">
                <Link href="/auth">
                  <Button
                    className="bg-black text-white px-6 py-3 rounded-md font-medium hover:bg-[#DAA520] transition-all"
                  >
                    Get Started
                  </Button>
                </Link>
                
                <Button
                  variant="outline"
                  className="border border-black px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-all"
                >
                  Learn More
                </Button>
              </div>
              
              <div className="flex gap-10 justify-center md:justify-start">
                <div className="text-center md:text-left">
                  <div className="text-xl font-semibold text-[#DAA520]">39%</div>
                  <div className="text-sm text-gray-600">more likely to get hired</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-xl font-semibold text-[#DAA520]">8%</div>
                  <div className="text-sm text-gray-600">better pay with your next job</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="relative bg-gray-50 rounded-lg p-6">
              {/* Flat vector cat */}
              <div className="absolute -top-6 -right-6 w-28 h-28">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 10C50 10 55 25 45 40C38 50 25 60 30 80C30 80 45 75 50 50C50 50 55 75 75 90C75 90 90 70 75 55C60 40 65 25 65 25C65 25 60 28 55 28C50 28 50 25 50 25C50 25 50 28 45 28C40 28 35 25 35 25C35 25 40 40 25 55C10 70 25 90 25 90C45 75 50 50 50 50C55 75 70 80 70 80C75 60 62 50 55 40C45 25 50 10 50 10Z" fill="#DAA520"/>
                  <circle cx="40" cy="35" r="2" fill="black"/>
                  <circle cx="60" cy="35" r="2" fill="black"/>
                  <path d="M45 45C45 45 50 46 55 45" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              
              {/* CV Preview */}
              <div className="rounded-lg border-2 border-gray-300 bg-white shadow-lg overflow-hidden">
                <div className="bg-gray-800 text-white p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold">Professional CV</h3>
                    <div className="flex space-x-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-4">
                    <div className="h-8 bg-gray-200 rounded-md mb-2 w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
                  </div>
                  <div className="mb-4">
                    <div className="h-4 bg-gray-200 rounded-md mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded-md mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
                  </div>
                  <div className="mb-4">
                    <div className="h-6 bg-gray-200 rounded-md mb-2 w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded-md mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded-md mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
                  </div>
                  <div>
                    <div className="h-6 bg-gray-200 rounded-md mb-2 w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded-md mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded-md w-2/3"></div>
                  </div>
                </div>
              </div>
              
              {/* Paw Print Decorations */}
              <div className="absolute top-1/4 left-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z" fill="#DAA520" fillOpacity="0.3"/>
                  <path d="M16 9C17.1046 9 18 8.10457 18 7C18 5.89543 17.1046 5 16 5C14.8954 5 14 5.89543 14 7C14 8.10457 14.8954 9 16 9Z" fill="#DAA520" fillOpacity="0.3"/>
                  <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="#DAA520" fillOpacity="0.3"/>
                  <path d="M5 15C6.10457 15 7 14.1046 7 13C7 11.8954 6.10457 11 5 11C3.89543 11 3 11.8954 3 13C3 14.1046 3.89543 15 5 15Z" fill="#DAA520" fillOpacity="0.3"/>
                  <path d="M19 15C20.1046 15 21 14.1046 21 13C21 11.8954 20.1046 11 19 11C17.8954 11 17 11.8954 17 13C17 14.1046 17.8954 15 19 15Z" fill="#DAA520" fillOpacity="0.3"/>
                </svg>
              </div>
              <div className="absolute bottom-10 right-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z" fill="#DAA520" fillOpacity="0.3"/>
                  <path d="M16 9C17.1046 9 18 8.10457 18 7C18 5.89543 17.1046 5 16 5C14.8954 5 14 5.89543 14 7C14 8.10457 14.8954 9 16 9Z" fill="#DAA520" fillOpacity="0.3"/>
                  <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="#DAA520" fillOpacity="0.3"/>
                  <path d="M5 15C6.10457 15 7 14.1046 7 13C7 11.8954 6.10457 11 5 11C3.89543 11 3 11.8954 3 13C3 14.1046 3.89543 15 5 15Z" fill="#DAA520" fillOpacity="0.3"/>
                  <path d="M19 15C20.1046 15 21 14.1046 21 13C21 11.8954 20.1046 11 19 11C17.8954 11 17 11.8954 17 13C17 14.1046 17.8954 15 19 15Z" fill="#DAA520" fillOpacity="0.3"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Counter Section */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#DAA520]/10 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z" stroke="#DAA520" strokeWidth="2"/>
              <path d="M7 7H17" stroke="#DAA520" strokeWidth="2" strokeLinecap="round"/>
              <path d="M7 12H17" stroke="#DAA520" strokeWidth="2" strokeLinecap="round"/>
              <path d="M7 17H13" stroke="#DAA520" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-800">12,548</span>
          <span className="text-gray-600">CVs created this week</span>
        </div>
      </section>
      
      {/* Features Section */}
      <Features />
      
      {/* Success Stories */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Our users land jobs at top companies</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-80">
            <div className="w-32 h-16 flex items-center justify-center">
              <svg viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M45 10H55M45 15H55M45 20H50" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                <rect x="10" y="5" width="30" height="20" rx="2" stroke="black" strokeWidth="2"/>
                <rect x="60" y="5" width="30" height="20" rx="10" stroke="black" strokeWidth="2"/>
              </svg>
            </div>
            <div className="w-32 h-16 flex items-center justify-center">
              <svg viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="15" r="10" stroke="black" strokeWidth="2"/>
                <path d="M20 5L30 25M30 5L20 25" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                <path d="M70 5V25M80 5V25M70 15H80" stroke="black" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="w-32 h-16 flex items-center justify-center">
              <svg viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 15C20 10 25 5 30 5H40C45 5 50 10 50 15C50 20 45 25 40 25H30C25 25 20 20 20 15Z" stroke="black" strokeWidth="2"/>
                <path d="M60 5H80L70 15L80 25H60" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="w-32 h-16 flex items-center justify-center">
              <svg viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="5" width="20" height="20" rx="2" stroke="black" strokeWidth="2"/>
                <path d="M50 5L60 15L50 25" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M60 5L70 15L60 25" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <Pricing />
    </Layout>
  );
}
