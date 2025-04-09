import { PricingTier } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

// Pricing tiers
const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      "Create 1 resume",
      "Basic templates",
      "PDF downloads",
      "14-day history"
    ],
    ctaText: "Get Started"
  },
  {
    name: "Premium",
    price: "$2.95",
    description: "Complete resume toolkit",
    features: [
      "Create unlimited resumes",
      "All premium templates",
      "All download formats",
      "Resume tracking analytics",
      "AI content suggestions",
      "Priority support"
    ],
    isPopular: true,
    ctaText: "Go Premium"
  },
  {
    name: "Ultimate",
    price: "$9.99",
    description: "For serious job seekers",
    features: [
      "Everything in Premium",
      "Cover letter builder",
      "LinkedIn profile optimization",
      "Interview preparation tool",
      "Direct employer sharing",
      "Dedicated career coach"
    ],
    ctaText: "Choose Ultimate"
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Choose the plan that works for you</h2>
        <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
          All plans include our core builder and downloads. Upgrade for premium features.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {pricingTiers.map((tier, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 relative ${
                tier.isPopular ? 'border-t-4 border-[#0d6efd]' : ''
              }`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 left-0 right-0 bg-[#0d6efd] text-white text-xs text-center py-1 font-medium">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <div className="mt-2 mb-4">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  {tier.name !== "Free" && <span className="text-gray-500 text-sm">/month</span>}
                </div>
                <p className="text-gray-600 text-sm mb-6">{tier.description}</p>
                
                <Link href="/auth">
                  <Button 
                    className={`w-full ${
                      tier.isPopular 
                        ? 'bg-[#0d6efd] hover:bg-[#0b5ed7] text-white' 
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    } mb-6`}
                  >
                    {tier.ctaText}
                  </Button>
                </Link>
                
                <div className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>All plans include a 14-day money-back guarantee. No questions asked.</p>
        </div>
      </div>
    </section>
  );
}
