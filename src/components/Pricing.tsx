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
    name: "Pro",
    price: "₹150",
    duration: "2 weeks",
    description: "For active job seekers",
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
    name: "Premium",
    price: "₹500",
    duration: "1 year",
    description: "For serious professionals",
    features: [
      "Multiple Core CVs",
      "Unlimited tailored versions",
      "Custom branding",
      "Advanced AI features",
      "Career coaching session",
      "24/7 VIP support"
    ],
    ctaText: "Go Premium"
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-12 px-4 md:px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold mb-2 text-black">Pricing</h2>
          <p className="text-xs text-gray-700 max-w-md mx-auto">
            Simple plans for every stage of your career
          </p>
          
          {/* Minimal cat paw icon */}
          <div className="mt-2 mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
              <path d="M8 9C9.10457 9 10 8.10457 10 7C10 5.89543 9.10457 5 8 5C6.89543 5 6 5.89543 6 7C6 8.10457 6.89543 9 8 9Z" fill="#DAA520" fillOpacity="0.3"/>
              <path d="M16 9C17.1046 9 18 8.10457 18 7C18 5.89543 17.1046 5 16 5C14.8954 5 14 5.89543 14 7C14 8.10457 14.8954 9 16 9Z" fill="#DAA520" fillOpacity="0.3"/>
              <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" fill="#DAA520" fillOpacity="0.3"/>
              <path d="M5 15C6.10457 15 7 14.1046 7 13C7 11.8954 6.10457 11 5 11C3.89543 11 3 11.8954 3 13C3 14.1046 3.89543 15 5 15Z" fill="#DAA520" fillOpacity="0.3"/>
              <path d="M19 15C20.1046 15 21 14.1046 21 13C21 11.8954 20.1046 11 19 11C17.8954 11 17 11.8954 17 13C17 14.1046 17.8954 15 19 15Z" fill="#DAA520" fillOpacity="0.3"/>
            </svg>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-5">
          {pricingTiers.map((tier, index) => (
            <div 
              key={index} 
              className={`bg-white shadow-md ${
                tier.isPopular 
                  ? 'border-2 border-[#DAA520]' 
                  : 'border-2 border-gray-300'
              } p-5 relative hover:shadow-lg transition-all rounded-md`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 right-0 bg-[#DAA520] text-white text-[10px] font-medium px-2 py-0.5">
                  POPULAR
                </div>
              )}
              
              <h3 className="text-base font-semibold text-black">{tier.name}</h3>
              <p className="text-xs text-gray-600 mb-2">{tier.description}</p>
              
              <div className="text-xl font-bold mb-4 text-black">
                {tier.price}
                {tier.price !== "Free" && (
                  <span className="text-xs font-normal text-gray-400">
                    {tier.duration ? ` for ${tier.duration}` : "/month"}
                  </span>
                )}
              </div>
              
              <ul className="space-y-2 mb-5">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start text-xs">
                    <div className="mt-0.5 mr-2 flex-shrink-0">
                      {/* Simplified checkmark */}
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12L10 17L19 8" stroke="#DAA520" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/auth">
                <Button 
                  className={`w-full text-xs font-medium py-2 ${
                    tier.isPopular 
                      ? 'bg-black hover:bg-[#DAA520] text-white'
                      : 'bg-white border-2 border-gray-300 hover:border-[#DAA520] text-gray-700 hover:text-[#DAA520]'
                  } rounded shadow-sm transition-all`}
                >
                  {tier.ctaText}
                </Button>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center text-gray-500 text-xs flex items-center justify-center">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#DAA520" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16V12" stroke="#DAA520" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8H12.01" stroke="#DAA520" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p>100% refund available within 7 days of purchase. No questions asked.</p>
        </div>
      </div>
    </section>
  );
}
