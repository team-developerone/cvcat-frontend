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
  const bgColor = darkMode ? "#222" : "transparent";
  const textColorClass = darkMode ? "text-white" : "text-black";

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${sizeMap[size]} mr-2`}>
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Extremely minimal symbol - just a stylized "C" that resembles a cat */}
          <path 
            d="M10 25C10 15 20 10 25 10C30 10 40 15 40 25C40 35 30 40 25 40C20 40 10 35 10 25Z" 
            stroke={primaryColor}
            strokeWidth="3"
            fill={bgColor}
          />
          
          {/* Two tiny pointed tips for ears */}
          <path 
            d="M25 10L20 5L25 7.5L30 5L25 10Z" 
            fill={primaryColor}
          />
          
          {/* Two diagonal lines for eyes */}
          <line 
            x1="20" y1="22" x2="23" y2="25" 
            stroke={primaryColor} 
            strokeWidth="1.5" 
            strokeLinecap="round"
          />
          <line 
            x1="30" y1="22" x2="27" y2="25" 
            stroke={primaryColor} 
            strokeWidth="1.5" 
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