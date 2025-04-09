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

  const primaryColor = "#DAA520";
  const bgColor = "white";

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className={`${sizeMap[size]} relative`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {variant !== "minimal" && <rect width="100" height="100" rx="15" fill={bgColor} />}
          
          {/* Semi-circular frame */}
          {variant === "minimal" ? (
            <path 
              d="M10 50 A 40 40 0 1 0 90 50" 
              stroke={primaryColor}
              strokeWidth="6"
              fill="none"
            />
          ) : (
            <path 
              d="M15 50 A 35 35 0 1 0 85 50" 
              stroke={primaryColor}
              strokeWidth="5"
              fill="none"
            />
          )}
          
          {/* Cat head shape */}
          <path 
            d={variant === "minimal" ? 
                "M25 75 L 75 75 C 78 55 75 40 50 40 C 25 40 22 55 25 75 Z" : 
                "M30 75 L 70 75 C 73 55 70 40 50 40 C 30 40 27 55 30 75 Z"
            }
            fill={primaryColor}
          />
          
          {/* Left ear */}
          <path 
            d={variant === "minimal" ? 
                "M30 42 L 15 20 L 45 30 Z" : 
                "M35 42 L 20 20 L 45 30 Z"
            }
            fill={primaryColor}
          />
          
          {/* Right ear */}
          <path 
            d={variant === "minimal" ? 
                "M70 42 L 85 20 L 55 30 Z" : 
                "M65 42 L 80 20 L 55 30 Z"
            }
            fill={primaryColor}
          />
          
          {variant !== "minimal" && (
            <>
              {/* Left eye */}
              <ellipse 
                cx="40" 
                cy="55" 
                rx="4" 
                ry="5" 
                fill={bgColor}
              />
              
              {/* Right eye */}
              <ellipse 
                cx="60" 
                cy="55" 
                rx="4" 
                ry="5" 
                fill={bgColor}
              />
              
              {/* Nose */}
              <path 
                d="M47 64 L 50 67 L 53 64 Z" 
                fill={bgColor}
              />
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