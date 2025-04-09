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
  const textColorClass = darkMode ? "text-white" : "text-black";

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${sizeMap[size]} mr-2`}>
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Single abstract paw shape resembling "c" and cat */}
          <path 
            d="M25 10L10 25L25 40L40 25L25 10Z" 
            fill={primaryColor}
            transform="rotate(45, 25, 25)"
          />
          
          {/* Negative space cutout */}
          <path 
            d="M25 18L18 25L25 32L32 25L25 18Z" 
            fill={darkMode ? "#222" : "#FFFFFF"}
            transform="rotate(45, 25, 25)"
          />
          
          {/* Simple dot accent */}
          <circle 
            cx="25" 
            cy="25" 
            r="2" 
            fill={darkMode ? "#FFFFFF" : "#333333"}
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