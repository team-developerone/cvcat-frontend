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
          {/* Sleek, flat cat design */}
          
          {/* Main cat silhouette */}
          <path 
            d="M5 35L15 13L25 5L35 13L45 35L25 40L5 35Z" 
            fill={primaryColor}
          />
          
          {/* Eyes - simple cutouts */}
          <circle 
            cx="18" 
            cy="25" 
            r="3" 
            fill={darkMode ? "#222222" : "white"}
          />
          <circle 
            cx="32" 
            cy="25" 
            r="3" 
            fill={darkMode ? "#222222" : "white"}
          />
          
          {/* Nose - minimalist triangle */}
          <path 
            d="M22 30L25 33L28 30Z" 
            fill={darkMode ? "#222222" : "white"}
          />
          
          {/* Whisker accent marks - ultra minimal */}
          <line 
            x1="15" y1="30" x2="8" y2="28" 
            stroke={darkMode ? "#222222" : "white"} 
            strokeWidth="1.5" 
            strokeLinecap="round"
          />
          <line 
            x1="35" y1="30" x2="42" y2="28" 
            stroke={darkMode ? "#222222" : "white"} 
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