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
  const accentColor = darkMode ? "#222222" : "#FFFFFF";
  const textColorClass = darkMode ? "text-white" : "text-black";

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${sizeMap[size]} mr-2`}>
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Clean, flat cat with solid colors */}
          
          {/* Cat head - simple polygon */}
          <path 
            d="M10 33L15 15L25 8L35 15L40 33L25 40L10 33Z" 
            fill={primaryColor}
          />
          
          {/* Cat ears - triangular shapes */}
          <path 
            d="M15 15L8 5L20 12L15 15Z" 
            fill={primaryColor}
          />
          <path 
            d="M35 15L42 5L30 12L35 15Z" 
            fill={primaryColor}
          />
          
          {/* Cat eyes - clean circles */}
          <circle 
            cx="18" 
            cy="24" 
            r="3" 
            fill={accentColor}
          />
          <circle 
            cx="32" 
            cy="24" 
            r="3" 
            fill={accentColor}
          />
          
          {/* Cat nose - simple triangle */}
          <path 
            d="M22 30L25 33L28 30Z" 
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