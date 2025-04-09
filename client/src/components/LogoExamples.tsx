import React from 'react';

interface LogoExampleProps {
  title: string;
  description: string;
}

const LogoExample: React.FC<LogoExampleProps & React.HTMLAttributes<HTMLDivElement>> = ({
  title,
  description,
  children,
  ...props
}) => {
  return (
    <div className="border rounded-lg p-6 bg-white" {...props}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      <div className="bg-gray-50 rounded-lg p-10 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default function LogoExamples() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Concept 1: Geometric Minimal Cat */}
      <LogoExample 
        title="Concept 1: Geometric Minimal Cat" 
        description="Clean geometric shapes forming an abstract cat with document lines"
      >
        <div className="flex items-center">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Cat face - triangle */}
            <path d="M50 20L75 60H25L50 20Z" fill="#DAA520" />
            
            {/* Cat ears */}
            <path d="M30 40L25 60L15 45L30 40Z" fill="#DAA520" />
            <path d="M70 40L75 60L85 45L70 40Z" fill="#DAA520" />
            
            {/* Cat body - semicircle */}
            <path d="M25 60C25 80 75 80 75 60H25Z" fill="#DAA520" />
            
            {/* Eyes */}
            <circle cx="40" cy="45" r="4" fill="black" />
            <circle cx="60" cy="45" r="4" fill="black" />
            
            {/* Document lines */}
            <rect x="35" y="65" width="30" height="2" rx="1" fill="white" />
            <rect x="40" y="70" width="20" height="1" rx="0.5" fill="white" />
          </svg>
          
          <div className="ml-3 text-2xl">
            <span className="font-light">cv</span>
            <span className="font-bold text-[#DAA520]">cat</span>
          </div>
        </div>
      </LogoExample>
      
      {/* Concept 2: Abstract Triangle Cat */}
      <LogoExample 
        title="Concept 2: Abstract Triangle Cat" 
        description="Highly abstract design based on a single triangle with subtle cat features"
      >
        <div className="flex items-center">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Main triangle */}
            <path 
              d="M50 15L85 75C85 75 75 85 50 85C25 85 15 75 15 75L50 15Z" 
              fill="#DAA520" 
            />
            
            {/* Eyes */}
            <circle cx="40" cy="50" r="3" fill="black" />
            <circle cx="60" cy="50" r="3" fill="black" />
            
            {/* Document lines */}
            <rect x="35" y="70" width="30" height="1.5" rx="0.75" fill="white" />
            <rect x="40" y="75" width="20" height="1" rx="0.5" fill="white" />
            <rect x="42" y="79" width="16" height="1" rx="0.5" fill="white" />
          </svg>
          
          <div className="ml-4 text-2xl font-[system-ui]">
            <span className="font-extralight tracking-tight">cv</span>
            <span className="font-medium text-[#DAA520]">cat</span>
          </div>
        </div>
      </LogoExample>
      
      {/* Concept 3: Circle-Based Minimal Cat */}
      <LogoExample 
        title="Concept 3: Circle-Based Minimal Cat" 
        description="Rounded approach with circular base and minimalist details"
      >
        <div className="flex items-center">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Main circle */}
            <circle cx="50" cy="55" r="35" fill="#DAA520" />
            
            {/* Ears */}
            <path d="M30 30L40 45L20 45L30 30Z" fill="#DAA520" />
            <path d="M70 30L80 45L60 45L70 30Z" fill="#DAA520" />
            
            {/* Eyes */}
            <circle cx="35" cy="50" r="4" fill="black" />
            <circle cx="65" cy="50" r="4" fill="black" />
            
            {/* Document lines */}
            <rect x="30" y="70" width="40" height="2" rx="1" fill="white" />
            <rect x="35" y="75" width="30" height="1.5" rx="0.75" fill="white" />
          </svg>
          
          <div className="ml-3 text-2xl" style={{ fontFamily: 'Nunito, sans-serif' }}>
            <span className="font-light">cv</span>
            <span className="font-bold text-[#DAA520]">cat</span>
          </div>
        </div>
      </LogoExample>
      
      {/* Concept 4: Negative Space Cat */}
      <LogoExample 
        title="Concept 4: Negative Space Cat" 
        description="Minimal design using negative space to create the cat silhouette"
      >
        <div className="flex items-center">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Rounded square background */}
            <rect x="15" y="15" width="70" height="70" rx="20" fill="#DAA520" />
            
            {/* Ears - negative space */}
            <path d="M30 15L40 35H20L30 15Z" fill="white" />
            <path d="M70 15L80 35H60L70 15Z" fill="white" />
            
            {/* Eyes - negative space */}
            <circle cx="35" cy="45" r="7" fill="white" />
            <circle cx="65" cy="45" r="7" fill="white" />
            <circle cx="35" cy="45" r="3" fill="black" />
            <circle cx="65" cy="45" r="3" fill="black" />
            
            {/* Document line */}
            <path d="M30 65C30 65 40 75 50 75C60 75 70 65 70 65" stroke="white" strokeWidth="2" />
          </svg>
          
          <div className="ml-4 text-2xl font-[Montserrat]">
            <span className="font-light tracking-wide">cv</span>
            <span className="font-semibold tracking-tight text-[#DAA520]">cat</span>
          </div>
        </div>
      </LogoExample>
      
      {/* Concept 5: Dot Grid Cat */}
      <LogoExample 
        title="Concept 5: Dot Grid Cat" 
        description="Contemporary tech-focused approach with a dot matrix pattern"
      >
        <div className="flex items-center">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Top row */}
            <circle cx="30" cy="25" r="5" stroke="#DAA520" strokeWidth="2" />
            <circle cx="50" cy="25" r="5" fill="#DAA520" />
            <circle cx="70" cy="25" r="5" stroke="#DAA520" strokeWidth="2" />
            
            {/* Second row - eyes */}
            <circle cx="30" cy="45" r="5" fill="#DAA520" />
            <circle cx="50" cy="45" r="5" stroke="#DAA520" strokeWidth="2" />
            <circle cx="70" cy="45" r="5" fill="#DAA520" />
            
            {/* Third row */}
            <circle cx="30" cy="65" r="5" stroke="#DAA520" strokeWidth="2" />
            <circle cx="50" cy="65" r="5" fill="#DAA520" />
            <circle cx="70" cy="65" r="5" stroke="#DAA520" strokeWidth="2" />
            
            {/* Bottom row - document */}
            <circle cx="30" cy="85" r="5" fill="#DAA520" />
            <circle cx="50" cy="85" r="5" fill="#DAA520" />
            <circle cx="70" cy="85" r="5" fill="#DAA520" />
          </svg>
          
          <div className="ml-4 text-2xl font-mono">
            <span className="font-light">cv</span>
            <span className="text-[#DAA520]">·</span>
            <span className="font-medium text-[#DAA520]">cat</span>
          </div>
        </div>
      </LogoExample>
      
      {/* Bonus Concept: Ultra-Minimal Abstract Cat */}
      <LogoExample 
        title="Concept 6: Ultra-Minimal Abstract Cat" 
        description="Extremely simplified with the bare minimum needed to suggest a cat"
      >
        <div className="flex items-center">
          <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Abstract cat shape */}
            <path 
              d="M50 20L20 60L50 80L80 60L50 20Z" 
              fill="#DAA520" 
            />
            
            {/* Minimal eyes */}
            <circle cx="40" cy="50" r="3" fill="black" />
            <circle cx="60" cy="50" r="3" fill="black" />
            
            {/* Minimalist whiskers */}
            <line x1="30" y1="55" x2="15" y2="50" stroke="black" strokeWidth="1" />
            <line x1="30" y1="60" x2="15" y2="65" stroke="black" strokeWidth="1" />
            <line x1="70" y1="55" x2="85" y2="50" stroke="black" strokeWidth="1" />
            <line x1="70" y1="60" x2="85" y2="65" stroke="black" strokeWidth="1" />
          </svg>
          
          <div className="ml-4 text-3xl">
            <span className="font-extralight tracking-tighter">cv</span>
            <span className="font-bold tracking-tight text-[#DAA520]">cat</span>
          </div>
        </div>
      </LogoExample>
    </div>
  );
}