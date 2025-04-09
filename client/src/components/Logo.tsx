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
  const secondaryColor = darkMode ? "#FFFFFF" : "#222222";
  const textColorClass = darkMode ? "text-white" : "text-black";

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${sizeMap[size]} mr-2`}>
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Refined ultra-minimal cat shape with cleaner angles */}
          <path 
            d="M10 36L10 26L5 20L10 12L15 15L25 15L35 15L40 12L45 20L40 26L40 36L25 42L10 36Z" 
            fill={primaryColor}
          />
          
          {/* Sharp modern eye slits */}
          <path 
            d="M18 24L18 30L22 27L18 24Z" 
            fill={secondaryColor}
          />
          <path 
            d="M32 24L32 30L28 27L32 24Z" 
            fill={secondaryColor}
          />
          
          {/* Super minimal whisker suggestion - just a hint */}
          <path 
            d="M25 34L20 36L30 36L25 34Z" 
            fill={secondaryColor}
            opacity="0.7"
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