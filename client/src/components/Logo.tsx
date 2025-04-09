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

  const primaryColor = "#DAA520";
  const secondaryColor = darkMode ? "#FFFFFF" : "#333333";
  const textColorClass = darkMode ? "text-white" : "text-black";
  const bgColor = darkMode ? "#222" : "#FFFFFF";

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${sizeMap[size]} mr-2`}>
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Minimal but clearly recognizable cat face */}
          
          {/* Cat head */}
          <path 
            d="M15 15H35V35C35 40 30 45 25 45C20 45 15 40 15 35V15Z" 
            fill={primaryColor}
          />
          
          {/* Cat ears */}
          <path 
            d="M15 15L8 5L15 12V15Z" 
            fill={primaryColor}
          />
          <path 
            d="M35 15L42 5L35 12V15Z" 
            fill={primaryColor}
          />
          
          {/* Cat eyes */}
          <circle 
            cx="20" 
            cy="25" 
            r="2.5" 
            fill={bgColor}
          />
          <circle 
            cx="30" 
            cy="25" 
            r="2.5" 
            fill={bgColor}
          />
          
          {/* Cat pupils */}
          <circle 
            cx="21" 
            cy="24" 
            r="1" 
            fill={secondaryColor}
          />
          <circle 
            cx="29" 
            cy="24" 
            r="1" 
            fill={secondaryColor}
          />
          
          {/* Cat nose */}
          <path 
            d="M23 31L25 33L27 31L25 35L23 31Z" 
            fill={bgColor}
          />
          
          {/* Cat whiskers - very minimal */}
          <line 
            x1="15" y1="30" x2="8" y2="28" 
            stroke={secondaryColor} 
            strokeWidth="0.8" 
            opacity="0.6"
            strokeLinecap="round"
          />
          <line 
            x1="15" y1="32" x2="8" y2="34" 
            stroke={secondaryColor} 
            strokeWidth="0.8" 
            opacity="0.6"
            strokeLinecap="round"
          />
          <line 
            x1="35" y1="30" x2="42" y2="28" 
            stroke={secondaryColor} 
            strokeWidth="0.8" 
            opacity="0.6"
            strokeLinecap="round"
          />
          <line 
            x1="35" y1="32" x2="42" y2="34" 
            stroke={secondaryColor} 
            strokeWidth="0.8" 
            opacity="0.6"
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