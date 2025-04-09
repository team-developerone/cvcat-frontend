import React from 'react';

interface LogoShowcaseProps {
  className?: string;
  variant?: "default" | "minimal" | "sleek";
  showText?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function LogoShowcase({
  className = "",
  variant = "default",
  showText = true,
  size = "xl"
}: LogoShowcaseProps) {
  // Size mapping for larger display
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24"
  };

  // Text size mapping
  const textSizeMap = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl"
  };

  const accentColor = "#DAA520";
  const fillColor = variant === "minimal" ? "none" : "white";
  const strokeWidth = variant === "minimal" ? 2 : 0;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className={`${sizeMap[size]} relative`}>
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          {variant !== "minimal" && <rect width="50" height="50" rx="10" fill={fillColor} />}
          
          {variant === "minimal" ? (
            <path 
              d="M25 10C25 10 28 16 24 22C21 26 16 30 18 38C18 38 24 36 25 26C25 26 27 36 35 42C35 42 41 34 35 28C29 22 31 16 31 16C31 16 28 17 25 17C22 17 19 16 19 16C19 16 21 22 15 28C9 34 15 42 15 42C23 36 25 26 25 26C26 36 32 38 32 38C34 30 29 26 26 22C22 16 25 10 25 10Z" 
              stroke={accentColor} 
              strokeWidth={strokeWidth}
              fill={accentColor}
            />
          ) : (
            <path 
              d="M25 10C25 10 28 16 24 22C21 26 16 30 18 38C18 38 24 36 25 26C25 26 27 36 35 42C35 42 41 34 35 28C29 22 31 16 31 16C31 16 28 17 25 17C22 17 19 16 19 16C19 16 21 22 15 28C9 34 15 42 15 42C23 36 25 26 25 26C26 36 32 38 32 38C34 30 29 26 26 22C22 16 25 10 25 10Z" 
              fill={accentColor}
            />
          )}
          
          {variant !== "minimal" && (
            <>
              <rect x="20" y="18" width="2" height="2" rx="1" fill="#333"/>
              <rect x="28" y="18" width="2" height="2" rx="1" fill="#333"/>
              <path d="M23 24C24 25 26 25 27 24" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
            </>
          )}
        </svg>
        
        {variant === "sleek" && (
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#DAA520]/10 to-white/20 rounded-lg" />
        )}
      </div>
      
      {showText && (
        <span className={`font-bold ${textSizeMap[size]} mt-2`}>
          <span className="text-black">CV</span><span className="text-[#DAA520]">Cat</span>
        </span>
      )}
    </div>
  );
}