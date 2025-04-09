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
      "PDF exports"
    ],
    ctaText: "Get Started"
  },
  {
    name: "Professional",
    price: "$9.99",
    description: "For career-focused individuals",
    features: [
      "1 Core CV",
      "5 Tailored versions",
      "Advanced templates",
      "AI suggestions",
      "All export formats"
    ],
    isPopular: true,
    ctaText: "Choose Plan"
  },
  {
    name: "Enterprise",
    price: "$24.99",
    description: "For teams and businesses",
    features: [
      "Multiple Core CVs",
      "Unlimited tailored versions",
      "Team collaboration",
      "Advanced AI features",
      "API access"
    ],
    ctaText: "Contact Sales"
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
        <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
          Choose the plan that works for your career needs, with flexible options for every stage of your professional journey.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <div 
              key={index} 
              className={`${
                tier.isPopular 
                  ? 'border-2 border-[#DAA520]' 
                  : 'border border-gray-200'
              } rounded-lg p-8 pricing-card transition-all relative hover:transform hover:-translate-y-1`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 right-0 bg-[#DAA520] text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg font-medium">
                  POPULAR
                </div>
              )}
              
              <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
              <p className="text-gray-600 mb-4">{tier.description}</p>
              
              <div className="text-3xl font-bold mb-6">
                {tier.price}
                {typeof tier.price !== 'string' && <span className="text-base font-normal">/month</span>}
              </div>
              
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <i className="fas fa-check text-[#DAA520] mt-1 mr-3"></i>
                    <span>{feature}</span>
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
      </div>
    </section>
  );
}
