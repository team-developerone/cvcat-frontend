import React from 'react';

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  darkMode?: boolean;
}

export default function Logo({ className = "", size = "md", showText = true, darkMode = false }: LogoProps) {
  // Size mapping
  const sizeMap = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  // Text size mapping
  const textSizeMap = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const primaryColor = "#DAA520"; // Gold
  const accentColor = darkMode ? "#FFFFFF" : "#333333";
  const textColorClass = darkMode ? "text-white" : "text-black";

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${sizeMap[size]} mr-2`}>
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cat + Resume combined design */}
          
          {/* Document/CV outline */}
          <rect 
            x="10" 
            y="10" 
            width="30" 
            height="35" 
            rx="2"
            fill={primaryColor}
          />
          
          {/* Document lines */}
          <line 
            x1="15" y1="30" x2="35" y2="30" 
            stroke={accentColor} 
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
          <line 
            x1="15" y1="35" x2="35" y2="35" 
            stroke={accentColor} 
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
          <line 
            x1="15" y1="40" x2="27" y2="40" 
            stroke={accentColor} 
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
          
          {/* Cat ears emerging from top of document */}
          <path 
            d="M20 10L15 3L25 5L20 10Z" 
            fill={primaryColor}
          />
          <path 
            d="M30 10L35 3L25 5L30 10Z" 
            fill={primaryColor}
          />
          
          {/* Cat eyes */}
          <circle 
            cx="20" 
            cy="20" 
            r="2" 
            fill={accentColor}
          />
          <circle 
            cx="30" 
            cy="20" 
            r="2" 
            fill={accentColor}
          />
          
          {/* Cat nose */}
          <path 
            d="M23 24L25 26L27 24Z" 
            fill={accentColor}
          />
        </svg>
      </div>
      {showText && (
        <span className={`font-bold ${textSizeMap[size]}`}>
          <span className={textColorClass}>CV</span><span className="text-[#DAA520]">Cat</span>
        </span>
      )}
    </div>
  );
}