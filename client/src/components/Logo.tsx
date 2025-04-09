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
  const tertiaryColor = darkMode ? "#FFF2CC" : "#8C6B0B"; // Even lighter/darker gold
  const textColorClass = darkMode ? "text-white" : "text-black";

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${sizeMap[size]} mr-2`}>
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Wider, more balanced fox-inspired logo */}
          
          {/* Top triangular ear section */}
          <path 
            d="M10 18L25 5L40 18H10Z" 
            fill={primaryColor}
          />
          
          {/* Right triangle section */}
          <path 
            d="M40 18L25 40L25 28L40 18Z" 
            fill={secondaryColor}
          />
          
          {/* Left triangle section */}
          <path 
            d="M10 18L25 40L25 28L10 18Z" 
            fill={secondaryColor}
          />
          
          {/* Bottom triangle section connecting the face */}
          <path 
            d="M10 18L40 18L25 28L10 18Z" 
            fill={tertiaryColor}
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