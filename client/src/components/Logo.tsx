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
  const accentColor = darkMode ? "#FFFFFF" : "#FFFFFF";
  const textColorClass = darkMode ? "text-white" : "text-black";

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${sizeMap[size]} mr-2`}>
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Refined triangular cat icon */}
          <g>
            {/* Main cat face - perfect isosceles triangle */}
            <path 
              d="M5 18L25 45L45 18H5Z" 
              fill={primaryColor}
            />
            
            {/* Sharper ear triangles with better positioning */}
            <path 
              d="M13 18L5 5L20 10L13 18Z" 
              fill={primaryColor}
            />
            <path 
              d="M37 18L30 10L45 5L37 18Z" 
              fill={primaryColor}
            />
            
            {/* Sleeker eyes - smaller ovals instead of circles */}
            <ellipse 
              cx="17" 
              cy="28" 
              rx="2.5" 
              ry="2" 
              fill={accentColor}
            />
            <ellipse 
              cx="33" 
              cy="28" 
              rx="2.5" 
              ry="2" 
              fill={accentColor}
            />
            
            {/* Minimalist nose - tiny triangle */}
            <path 
              d="M23 33L25 36L27 33Z" 
              fill={accentColor}
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