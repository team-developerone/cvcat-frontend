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
  const textColorClass = darkMode ? "text-white" : "text-black";

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${sizeMap[size]} mr-2`}>
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ultra minimalist cat icon - line art only */}
          
          {/* Cat face outline */}
          <path 
            d="M15 35C15 25 25 15 35 25C35 35 25 40 15 35Z" 
            stroke={primaryColor}
            strokeWidth="2"
            fill="none"
          />
          
          {/* Mirrored side */}
          <path 
            d="M35 35C35 25 25 15 15 25C15 35 25 40 35 35Z" 
            stroke={primaryColor}
            strokeWidth="2"
            fill="none"
          />
          
          {/* Ears */}
          <path 
            d="M15 25L10 10L20 20" 
            stroke={primaryColor}
            strokeWidth="2"
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path 
            d="M35 25L40 10L30 20" 
            stroke={primaryColor}
            strokeWidth="2"
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          
          {/* Eyes - simple dots */}
          <circle 
            cx="20" 
            cy="28" 
            r="1.5" 
            fill={primaryColor}
          />
          <circle 
            cx="30" 
            cy="28" 
            r="1.5" 
            fill={primaryColor}
          />
          
          {/* Nose - tiny triangle */}
          <path 
            d="M23 32L25 35L27 32Z" 
            fill={primaryColor}
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