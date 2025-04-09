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
          {/* Super clean, minimal abstract cat icon */}
          <g>
            {/* Main abstract cat form - just two triangles */}
            <path 
              d="M8 15L25 40L42 15H8Z" 
              fill={primaryColor}
            />
            
            {/* Ears - two simple triangles */}
            <path 
              d="M15 15L8 5L22 5L15 15Z" 
              fill={primaryColor}
            />
            <path 
              d="M35 15L28 5L42 5L35 15Z" 
              fill={primaryColor}
            />
            
            {/* Eyes - ultra minimal white spaces */}
            <circle 
              cx="18" 
              cy="23" 
              r="2" 
              fill={darkMode ? "#FFF" : "#FFF"}
            />
            <circle 
              cx="32" 
              cy="23" 
              r="2" 
              fill={darkMode ? "#FFF" : "#FFF"}
            />
          </g>
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