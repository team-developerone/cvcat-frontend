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
          {/* GitLab-inspired minimal cat logo */}
          
          {/* Top triangular ear section */}
          <path 
            d="M15 15L25 5L35 15H15Z" 
            fill={primaryColor}
          />
          
          {/* Right triangle section */}
          <path 
            d="M35 15L25 42L25 25L35 15Z" 
            fill={secondaryColor}
          />
          
          {/* Left triangle section */}
          <path 
            d="M15 15L25 42L25 25L15 15Z" 
            fill={secondaryColor}
          />
          
          {/* Bottom triangle section */}
          <path 
            d="M15 15L35 15L25 25L15 15Z" 
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