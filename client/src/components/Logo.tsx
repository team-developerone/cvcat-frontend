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
          {/* Ultra-minimal flat cat silhouette */}
          <path 
            d="M15 35L15 28L8 20L8 12L18 20L25 20L32 20L42 12L42 20L35 28L35 35L25 40L15 35Z" 
            fill={primaryColor}
            stroke="none"
          />
          
          {/* Extremely minimal eyes - just two small triangles */}
          <path 
            d="M20 26L20 29L23 29Z" 
            fill={darkMode ? "#FFFFFF" : "#222222"}
          />
          <path 
            d="M30 26L30 29L27 29Z" 
            fill={darkMode ? "#FFFFFF" : "#222222"}
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