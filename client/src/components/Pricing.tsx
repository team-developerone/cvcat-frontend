import { PricingTier } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

// Pricing tiers
const pricingTiers: PricingTier[] = [
  {
    name: "Basic",
    price: "Free",
    description: "Perfect for getting started",
    features: [
      "1 Core CV",
      "Basic templates",
      "PDF exports",
      "Email support"
    ],
    ctaText: "Get Started"
  },
  {
    name: "Purrfessional",
    price: "$9.99",
    description: "For career-focused individuals",
    features: [
      "1 Core CV",
      "5 Tailored versions",
      "Advanced templates",
      "AI suggestions",
      "All export formats",
      "Priority support"
    ],
    isPopular: true,
    ctaText: "Choose Plan"
  },
  {
    name: "Purrfect",
    price: "$24.99",
    description: "For serious job seekers",
    features: [
      "Multiple Core CVs",
      "Unlimited tailored versions",
      "Custom branding",
      "Advanced AI features",
      "Career coaching session",
      "24/7 VIP support"
    ],
    ctaText: "Go Purrfect"
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 relative">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Simple, Transparent <span className="text-[#DAA520]">Pricing</span></h2>
          <p className="text-center text-gray-700 mb-4 max-w-2xl mx-auto">
            Choose the plan that works for your career needs.
          </p>
          
          {/* Cat Silhouette Decoration */}
          <div className="hidden md:block absolute -top-10 -right-10 opacity-10">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 10C50 10 55 25 45 40C38 50 25 60 30 80C30 80 45 75 50 50C50 50 55 75 75 90C75 90 90 70 75 55C60 40 65 25 65 25C65 25 60 28 55 28C50 28 50 25 50 25C50 25 50 28 45 28C40 28 35 25 35 25C35 25 40 40 25 55C10 70 25 90 25 90C45 75 50 50 50 50C55 75 70 80 70 80C75 60 62 50 55 40C45 25 50 10 50 10Z" fill="#000000"/>
            </svg>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <div 
              key={index} 
              className={`${
                tier.isPopular 
                  ? 'border-2 border-[#DAA520]' 
                  : 'border border-gray-200'
              } rounded-lg bg-white p-8 pricing-card transition-all relative hover:transform hover:-translate-y-1 hover:shadow-lg`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 right-0 bg-[#DAA520] text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg font-medium">
                  MOST POPULAR
                </div>
              )}
              
              <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
              <p className="text-gray-600 mb-4">{tier.description}</p>
              
              <div className="text-3xl font-bold mb-6">
                {tier.price}
                {tier.price !== "Free" && <span className="text-base font-normal text-gray-500">/month</span>}
              </div>
              
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <div className="mt-1 mr-3">
                      {/* Cat Paw Checkmark */}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z" fill="#DAA520"/>
                        <path d="M16 9C17.1046 9 18 8.10457 18 7C18 5.89543 17.1046 5 16 5C14.8954 5 14 5.89543 14 7C14 8.10457 14.8954 9 16 9Z" fill="#DAA520"/>
                        <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="#DAA520"/>
                        <path d="M5 15C6.10457 15 7 14.1046 7 13C7 11.8954 6.10457 11 5 11C3.89543 11 3 11.8954 3 13C3 14.1046 3.89543 15 5 15Z" fill="#DAA520"/>
                        <path d="M19 15C20.1046 15 21 14.1046 21 13C21 11.8954 20.1046 11 19 11C17.8954 11 17 11.8954 17 13C17 14.1046 17.8954 15 19 15Z" fill="#DAA520"/>
                      </svg>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/auth">
                <Button 
                  className={`w-full ${
                    tier.isPopular 
                      ? 'bg-black text-white hover:bg-[#DAA520]' 
                      : 'border border-black bg-white text-black hover:bg-black hover:text-white'
                  } transition-all`}
                >
                  {tier.ctaText}
                </Button>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center text-gray-500 text-sm flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#DAA520" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16V12" stroke="#DAA520" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8H12.01" stroke="#DAA520" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p>All plans include a 30-day money-back guarantee. No questions asked.</p>
        </div>
      </div>
    </section>
  );
}
