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
  const secondaryColor = darkMode ? "#FFD966" : "#C19015"; // Lighter/darker gold
  const textColorClass = darkMode ? "text-white" : "text-black";
  const bgColor = darkMode ? "#222222" : "#FFFFFF";

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${sizeMap[size]} mr-2`}>
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Clean cat face - modern flat design */}
          
          {/* Cat head base */}
          <path 
            d="M8 25L20 10H30L42 25L30 40H20L8 25Z" 
            fill={primaryColor}
          />
          
          {/* Cat ears */}
          <path 
            d="M20 10L14 3L25 6L20 10Z" 
            fill={secondaryColor}
          />
          <path 
            d="M30 10L36 3L25 6L30 10Z" 
            fill={secondaryColor}
          />
          
          {/* Cat eyes */}
          <circle 
            cx="19" 
            cy="22" 
            r="3" 
            fill={bgColor}
          />
          <circle 
            cx="31" 
            cy="22" 
            r="3" 
            fill={bgColor}
          />
          
          {/* Cat nose */}
          <path 
            d="M23 28L25 32L27 28Z" 
            fill={bgColor}
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