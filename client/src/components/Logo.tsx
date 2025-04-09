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
          {/* Ultra-minimal cat icon using just two crescent shapes and dots */}
          
          {/* Main cat shape - just two half crescents */}
          <path 
            d="M15 38C15 30 20 24 25 24C30 24 35 30 35 38"
            stroke={primaryColor}
            strokeWidth="4"
            strokeLinecap="round"
          />
          
          {/* Two tiny triangles for ears */}
          <path 
            d="M20 24L15 15L25 20L20 24Z" 
            fill={primaryColor}
          />
          <path 
            d="M30 24L25 20L35 15L30 24Z" 
            fill={primaryColor}
          />
          
          {/* Eye dots */}
          <circle 
            cx="22" 
            cy="30" 
            r="1.5" 
            fill={primaryColor}
          />
          <circle 
            cx="28" 
            cy="30" 
            r="1.5" 
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