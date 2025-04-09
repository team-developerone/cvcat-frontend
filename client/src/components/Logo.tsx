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
  const eyeColor = darkMode ? "#FFFFFF" : "#111111";
  const textColorClass = darkMode ? "text-white" : "text-black";

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${sizeMap[size]} mr-2`}>
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Clear, minimal cat face */}
          
          {/* Cat head - simple arc shape */}
          <path 
            d="M10 32C10 22 20 13 25 13C30 13 40 22 40 32" 
            stroke={primaryColor}
            strokeWidth="5"
            strokeLinecap="round"
          />
          
          {/* Left ear - clean triangle */}
          <path 
            d="M15 15L10 5L20 10Z" 
            fill={primaryColor}
          />
          
          {/* Right ear - clean triangle */}
          <path 
            d="M35 15L40 5L30 10Z" 
            fill={primaryColor}
          />
          
          {/* Left eye - simple dot */}
          <circle 
            cx="20" 
            cy="25" 
            r="2" 
            fill={eyeColor}
          />
          
          {/* Right eye - simple dot */}
          <circle 
            cx="30" 
            cy="25" 
            r="2" 
            fill={eyeColor}
          />
          
          {/* Nose - tiny triangle */}
          <path 
            d="M23 28L25 30L27 28Z" 
            fill={eyeColor}
          />
          
          {/* Whiskers - minimal lines */}
          <line 
            x1="18" y1="28" x2="10" y2="26" 
            stroke={eyeColor} 
            strokeWidth="0.8" 
            strokeLinecap="round"
          />
          <line 
            x1="18" y1="30" x2="10" y2="32" 
            stroke={eyeColor} 
            strokeWidth="0.8" 
            strokeLinecap="round"
          />
          <line 
            x1="32" y1="28" x2="40" y2="26" 
            stroke={eyeColor} 
            strokeWidth="0.8" 
            strokeLinecap="round"
          />
          <line 
            x1="32" y1="30" x2="40" y2="32" 
            stroke={eyeColor} 
            strokeWidth="0.8" 
            strokeLinecap="round"
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